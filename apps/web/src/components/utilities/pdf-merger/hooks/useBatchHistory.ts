import { useState, useEffect, useCallback } from 'react';
import { BatchHistoryEntry, QueueItem } from '../types.js';
import {
  fetchAllBatches,
  loadMetadataFromLocalStorage,
  saveBatchToStorage,
  restoreBatchFromStorage,
  deleteBatchFromStorage,
  clearAllBatchesFromStorage
} from '../utils/batch-history-storage.js';

export function useBatchHistory() {
  const [batches, setBatches] = useState<BatchHistoryEntry[]>(() => loadMetadataFromLocalStorage());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync with IndexedDB on mount
  useEffect(() => {
    let isMounted = true;
    fetchAllBatches().then((list) => {
      if (isMounted) {
        setBatches(list);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const saveBatch = useCallback(
    async (
      items: QueueItem[],
      outputFilename: string,
      addBookmarks: boolean,
      normalizeA4 = true
    ): Promise<BatchHistoryEntry | null> => {
      if (!items || items.length === 0) return null;
      try {
        const savedEntry = await saveBatchToStorage(items, outputFilename, addBookmarks, normalizeA4);
        setBatches((prev) => {
          const filtered = prev.filter((b) => b.id !== savedEntry.id);
          return [savedEntry, ...filtered];
        });
        return savedEntry;
      } catch (err) {
        console.warn('Erro ao salvar lote no histórico:', err);
        return null;
      }
    },
    []
  );

  const restoreBatch = useCallback(
    async (
      batchId: string
    ): Promise<{ items: QueueItem[]; outputFilename: string; addBookmarks: boolean; normalizeA4?: boolean } | null> => {
      try {
        const result = await restoreBatchFromStorage(batchId);
        return result;
      } catch (err) {
        console.warn('Erro ao restaurar lote do histórico:', err);
        return null;
      }
    },
    []
  );

  const deleteBatch = useCallback(async (batchId: string): Promise<void> => {
    try {
      const remaining = await deleteBatchFromStorage(batchId);
      setBatches(remaining);
    } catch (err) {
      console.warn('Erro ao excluir lote:', err);
    }
  }, []);

  const clearHistory = useCallback(async (): Promise<void> => {
    try {
      await clearAllBatchesFromStorage();
      setBatches([]);
    } catch (err) {
      console.warn('Erro ao limpar histórico:', err);
    }
  }, []);

  return {
    batches,
    isLoading,
    saveBatch,
    restoreBatch,
    deleteBatch,
    clearHistory
  };
}
