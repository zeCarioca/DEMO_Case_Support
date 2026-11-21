import {
  BatchHistoryEntry,
  BatchHistoryItemMetadata,
  MAX_HISTORY_BATCHES,
  MAX_BATCH_STORAGE_BYTES,
  QueueItem,
  StoredBatchFileRecord,
  StoredBatchRecord
} from '../types.js';

const DB_NAME = 'casesupport_pdf_merger_db';
const DB_VERSION = 1;
const STORE_NAME = 'batch_history';
const LOCAL_STORAGE_KEY = 'casesupport_pdf_merger_batch_metadata_v1';

function openDB(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !window.indexedDB) return Promise.resolve(null);

  return new Promise((resolve) => {
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export function loadMetadataFromLocalStorage(): BatchHistoryEntry[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveMetadataToLocalStorage(entries: BatchHistoryEntry[]): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_HISTORY_BATCHES)));
  } catch {
    // Ignore storage quota errors
  }
}

export async function fetchAllBatches(): Promise<BatchHistoryEntry[]> {
  const localList = loadMetadataFromLocalStorage();
  const db = await openDB();
  if (!db) return localList;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).getAll();
      req.onsuccess = () => {
        const records = (req.result as StoredBatchRecord[]) || [];
        records.sort((a, b) => b.timestamp - a.timestamp);
        const entries = records.slice(0, MAX_HISTORY_BATCHES).map((r) => r.entry);
        saveMetadataToLocalStorage(entries);
        resolve(entries);
      };
      req.onerror = () => resolve(localList);
    } catch {
      resolve(localList);
    }
  });
}

export async function saveBatchToStorage(
  items: QueueItem[],
  outputFilename: string,
  addBookmarks: boolean,
  normalizeA4 = true
): Promise<BatchHistoryEntry> {
  const now = Date.now();
  const batchId = `batch-${now}-${Math.random().toString(36).slice(2, 7)}`;
  let totalFiles = 0;
  let totalExhibits = 0;
  let totalBytes = 0;

  const metadataItems: BatchHistoryItemMetadata[] = [];
  const filesRecordMap: Record<string, StoredBatchFileRecord> = {};

  for (const item of items) {
    if (item.type === 'file') {
      totalFiles++;
      totalBytes += item.size;
      metadataItems.push({ id: item.id, type: 'file', fileKind: item.fileKind, name: item.name, size: item.size });
      filesRecordMap[item.id] = {
        id: item.id,
        name: item.name,
        size: item.size,
        type: item.file.type || 'application/pdf',
        fileKind: item.fileKind,
        blob: item.file,
        lastModified: item.file.lastModified
      };
    } else {
      totalExhibits++;
      metadataItems.push({ id: item.id, type: 'exhibit', customLabel: item.customLabel });
    }
  }

  // Safe memory budget: only store raw blobs if under 50MB
  const shouldStoreFiles = totalBytes <= MAX_BATCH_STORAGE_BYTES;

  const entry: BatchHistoryEntry = {
    id: batchId,
    timestamp: now,
    outputFilename,
    addBookmarks,
    normalizeA4,
    totalFiles,
    totalExhibits,
    totalBytes,
    hasStoredFiles: shouldStoreFiles,
    items: metadataItems
  };

  const db = await openDB();
  if (db) {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({ id: batchId, timestamp: now, entry, files: shouldStoreFiles ? filesRecordMap : undefined });

      // Enforce FIFO: Purge batches exceeding MAX_HISTORY_BATCHES (N = 5)
      const allReq = store.getAll();
      allReq.onsuccess = () => {
        const records = (allReq.result as StoredBatchRecord[]) || [];
        if (records.length > MAX_HISTORY_BATCHES) {
          records.sort((a, b) => a.timestamp - b.timestamp);
          const toDelete = records.slice(0, records.length - MAX_HISTORY_BATCHES);
          toDelete.forEach((r) => store.delete(r.id));
        }
      };
    } catch (err) {
      console.warn('Erro IndexedDB:', err);
    }
  }

  const currentLocal = loadMetadataFromLocalStorage().filter((b) => b.id !== batchId);
  const updatedLocal = [entry, ...currentLocal].slice(0, MAX_HISTORY_BATCHES);
  saveMetadataToLocalStorage(updatedLocal);
  return entry;
}

export async function restoreBatchFromStorage(
  batchId: string
): Promise<{ items: QueueItem[]; outputFilename: string; addBookmarks: boolean; normalizeA4?: boolean } | null> {
  const db = await openDB();
  if (!db) return null;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(batchId);

      req.onsuccess = () => {
        const record = req.result as StoredBatchRecord | undefined;
        if (!record) return resolve(null);

        const restoredItems: QueueItem[] = record.entry.items.map((meta) => {
          if (meta.type === 'file') {
            const fileData = record.files ? record.files[meta.id] : undefined;
            const blob = fileData?.blob || new Blob([], { type: 'application/pdf' });
            const fileObj = new File([blob], fileData?.name || meta.name || 'documento.pdf', {
              type: fileData?.type || 'application/pdf',
              lastModified: fileData?.lastModified || Date.now()
            });

            return {
              id: meta.id,
              type: 'file',
              fileKind: meta.fileKind || 'pdf',
              file: fileObj,
              name: meta.name || fileObj.name,
              size: meta.size || fileObj.size,
              addedAt: Date.now()
            };
          }

          return {
            id: meta.id,
            type: 'exhibit',
            customLabel: meta.customLabel,
            addedAt: Date.now()
          };
        });

        resolve({
          items: restoredItems,
          outputFilename: record.entry.outputFilename,
          addBookmarks: record.entry.addBookmarks,
          normalizeA4: record.entry.normalizeA4 ?? true
        });
      };

      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function deleteBatchFromStorage(batchId: string): Promise<BatchHistoryEntry[]> {
  const db = await openDB();
  if (db) {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(batchId);
    } catch {
      // ignore
    }
  }

  const current = loadMetadataFromLocalStorage().filter((b) => b.id !== batchId);
  saveMetadataToLocalStorage(current);
  return current;
}

export async function clearAllBatchesFromStorage(): Promise<void> {
  const db = await openDB();
  if (db) {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).clear();
    } catch {
      // ignore
    }
  }

  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}
