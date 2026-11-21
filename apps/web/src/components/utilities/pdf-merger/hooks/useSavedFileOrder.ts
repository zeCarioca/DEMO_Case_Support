import { useState, useEffect, useCallback } from 'react';
import { QueueItem, SavedFileOrder } from '../types.js';
import {
  loadSavedFileOrder,
  saveFileOrderToLocalStorage,
  clearSavedFileOrderFromLocalStorage,
  applySavedOrderToItems
} from '../utils/file-order-storage.js';

export function useSavedFileOrder() {
  const [savedOrder, setSavedOrder] = useState<SavedFileOrder | null>(() => loadSavedFileOrder());
  const [isOrderSavedRecently, setIsOrderSavedRecently] = useState<boolean>(false);

  useEffect(() => {
    const loaded = loadSavedFileOrder();
    if (loaded) {
      setSavedOrder(loaded);
    }
  }, []);

  const saveOrder = useCallback((items: QueueItem[]): boolean => {
    if (!items || items.length === 0) return false;
    const result = saveFileOrderToLocalStorage(items);
    if (result) {
      setSavedOrder(result);
      setIsOrderSavedRecently(true);
      setTimeout(() => setIsOrderSavedRecently(false), 3000);
      return true;
    }
    return false;
  }, []);

  const applyOrder = useCallback(
    (currentItems: QueueItem[]): QueueItem[] => {
      if (!savedOrder) return currentItems;
      return applySavedOrderToItems(currentItems, savedOrder);
    },
    [savedOrder]
  );

  const clearSavedOrder = useCallback(() => {
    clearSavedFileOrderFromLocalStorage();
    setSavedOrder(null);
  }, []);

  return {
    savedOrder,
    hasSavedOrder: savedOrder !== null && (savedOrder.filenames.length > 0 || savedOrder.items.length > 0),
    savedCount: savedOrder ? savedOrder.filenames.length : 0,
    isOrderSavedRecently,
    saveOrder,
    applyOrder,
    clearSavedOrder
  };
}
