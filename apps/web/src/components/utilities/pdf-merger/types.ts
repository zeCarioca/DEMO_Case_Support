export interface PdfFileItem {
  id: string;
  type: 'file';
  fileKind?: 'pdf' | 'image';
  file: File;
  name: string;
  size: number;
  addedAt: number;
}

export interface PdfExhibitItem {
  id: string;
  type: 'exhibit';
  addedAt: number;
  customLabel?: string;
}

export type QueueItem = PdfFileItem | PdfExhibitItem;

export type SortOption =
  | 'original'
  | 'name-asc'
  | 'name-desc'
  | 'size-asc'
  | 'size-desc'
  | 'saved-order';

export interface MergeProgress {
  currentIndex: number;
  totalItems: number;
  itemName: string;
  percent: number;
}

export interface WorkerStartPayload {
  items: Array<{
    id: string;
    type: 'file' | 'exhibit';
    fileKind?: 'pdf' | 'image';
    file?: File;
    name?: string;
    exhibitLetter?: string;
  }>;
  outputFilename: string;
  addBookmarks: boolean;
  normalizeA4?: boolean;
}

export type WorkerMessage =
  | { type: 'START_MERGE'; payload: WorkerStartPayload }
  | { type: 'CANCEL_MERGE' };

export type WorkerResponse =
  | { type: 'PROGRESS'; payload: MergeProgress }
  | { type: 'COMPLETE'; payload: { pdfBytes: Uint8Array; filename: string } }
  | { type: 'ERROR'; payload: { message: string; itemId?: string; canSkip?: boolean } };

// Batch History Constants & Types
export const MAX_HISTORY_BATCHES = 5;
export const MAX_BATCH_STORAGE_BYTES = 50 * 1024 * 1024; // 50MB limit per batch to preserve browser memory

export interface BatchHistoryItemMetadata {
  id: string;
  type: 'file' | 'exhibit';
  fileKind?: 'pdf' | 'image';
  name?: string;
  size?: number;
  customLabel?: string;
  exhibitLetter?: string;
}

export interface BatchHistoryEntry {
  id: string;
  timestamp: number;
  outputFilename: string;
  addBookmarks: boolean;
  normalizeA4?: boolean;
  totalFiles: number;
  totalExhibits: number;
  totalBytes: number;
  hasStoredFiles: boolean;
  items: BatchHistoryItemMetadata[];
}

export interface StoredBatchFileRecord {
  id: string;
  name: string;
  size: number;
  type: string;
  fileKind?: 'pdf' | 'image';
  blob?: Blob;
  lastModified?: number;
}

export interface StoredBatchRecord {
  id: string;
  timestamp: number;
  entry: BatchHistoryEntry;
  files?: Record<string, StoredBatchFileRecord>;
}

export interface SavedOrderItem {
  type: 'file' | 'exhibit';
  name?: string;
  customLabel?: string;
}

export interface SavedFileOrder {
  timestamp: number;
  filenames: string[];
  items: SavedOrderItem[];
}



