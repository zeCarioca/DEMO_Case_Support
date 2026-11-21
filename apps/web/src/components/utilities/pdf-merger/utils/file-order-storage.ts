import { QueueItem, SavedFileOrder, SavedOrderItem } from '../types.js';

export const FILE_ORDER_STORAGE_KEY = 'casesupport_pdf_merger_saved_order_v1';

/**
 * Loads the saved file order metadata from browser localStorage.
 */
export function loadSavedFileOrder(): SavedFileOrder | null {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  try {
    const raw = localStorage.getItem(FILE_ORDER_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.filenames) && Array.isArray(parsed.items)) {
      return parsed as SavedFileOrder;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Saves the current queue sequence into browser localStorage.
 */
export function saveFileOrderToLocalStorage(items: QueueItem[]): SavedFileOrder | null {
  if (typeof window === 'undefined' || !window.localStorage || !items || items.length === 0) {
    return null;
  }

  try {
    const filenames: string[] = [];
    const orderItems: SavedOrderItem[] = items.map((item) => {
      if (item.type === 'file') {
        filenames.push(item.name);
        return {
          type: 'file',
          name: item.name
        };
      }
      return {
        type: 'exhibit',
        customLabel: item.customLabel
      };
    });

    const savedOrder: SavedFileOrder = {
      timestamp: Date.now(),
      filenames,
      items: orderItems
    };

    localStorage.setItem(FILE_ORDER_STORAGE_KEY, JSON.stringify(savedOrder));
    return savedOrder;
  } catch (err) {
    console.warn('Erro ao salvar ordem dos arquivos no localStorage:', err);
    return null;
  }
}

/**
 * Clears the saved file order from browser localStorage.
 */
export function clearSavedFileOrderFromLocalStorage(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.removeItem(FILE_ORDER_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Reorders current items based on the saved order in localStorage.
 * Matched files/exhibits are placed in their saved sequence.
 * Any unrecognised/extra items are preserved at the end.
 */
export function applySavedOrderToItems(
  currentItems: QueueItem[],
  savedOrder: SavedFileOrder
): QueueItem[] {
  if (!savedOrder || currentItems.length === 0) {
    return currentItems;
  }

  const pool = [...currentItems];
  const reordered: QueueItem[] = [];

  for (const savedItem of savedOrder.items) {
    if (savedItem.type === 'file' && savedItem.name) {
      const targetName = savedItem.name.trim().toLowerCase();
      const matchIndex = pool.findIndex(
        (item) => item.type === 'file' && item.name.trim().toLowerCase() === targetName
      );
      if (matchIndex !== -1) {
        reordered.push(pool.splice(matchIndex, 1)[0]);
      }
    } else if (savedItem.type === 'exhibit') {
      const matchIndex = pool.findIndex(
        (item) => item.type === 'exhibit' && (savedItem.customLabel ? item.customLabel === savedItem.customLabel : true)
      );
      if (matchIndex !== -1) {
        reordered.push(pool.splice(matchIndex, 1)[0]);
      }
    }
  }

  // Append any extra or unmatched items preserving their relative order
  return [...reordered, ...pool];
}
