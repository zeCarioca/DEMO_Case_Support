import { useState, useRef, useEffect, useCallback } from 'react';
import { QueueItem, MergeProgress, WorkerResponse, WorkerStartPayload } from '../types.js';
import { sanitizePdfFilename, getExhibitLetter } from '../utils/formatters.js';

export function usePdfMergerWorker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState<MergeProgress | null>(null);
  const [error, setError] = useState<{ message: string; itemId?: string; canSkip?: boolean } | null>(null);
  const [mergedBytes, setMergedBytes] = useState<Uint8Array | null>(null);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const startMerge = useCallback((items: QueueItem[], outputFilename: string, addBookmarks: boolean, normalizeA4 = true) => {
    if (items.length === 0) return;

    setIsModalOpen(true);
    setIsMerging(true);
    setIsCompleted(false);
    setError(null);
    setMergedBytes(null);
    setProgress({ currentIndex: 0, totalItems: items.length, itemName: 'Iniciando...', percent: 0 });

    if (workerRef.current) {
      workerRef.current.terminate();
    }

    const worker = new Worker(new URL('../workers/pdf-merge.worker.ts', import.meta.url), {
      type: 'module'
    });
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const msg = e.data;
      if (msg.type === 'PROGRESS') {
        setProgress(msg.payload);
      } else if (msg.type === 'COMPLETE') {
        setIsMerging(false);
        setIsCompleted(true);
        setMergedBytes(msg.payload.pdfBytes);
      } else if (msg.type === 'ERROR') {
        setIsMerging(false);
        setError(msg.payload);
      }
    };

    worker.onerror = (err) => {
      setIsMerging(false);
      setError({
        message: err.message || 'Falha no Web Worker de processamento.',
        canSkip: false
      });
    };

    let exCount = 0;
    const workerItems: WorkerStartPayload['items'] = items.map((item) => {
      if (item.type === 'exhibit') {
        const letter = getExhibitLetter(exCount++);
        return { id: item.id, type: 'exhibit', exhibitLetter: letter };
      }
      return {
        id: item.id,
        type: 'file',
        fileKind: item.fileKind,
        file: item.file,
        name: item.name
      };
    });

    const payload: WorkerStartPayload = {
      items: workerItems,
      outputFilename: sanitizePdfFilename(outputFilename),
      addBookmarks,
      normalizeA4
    };

    worker.postMessage({ type: 'START_MERGE', payload });
  }, []);

  const downloadMergedPdf = useCallback((outputFilename: string) => {
    if (!mergedBytes) return;
    const blob = new Blob([mergedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = sanitizePdfFilename(outputFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [mergedBytes]);

  const cancelMerge = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: 'CANCEL_MERGE' });
      workerRef.current.terminate();
      workerRef.current = null;
    }
    setIsMerging(false);
    setIsModalOpen(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const skipError = useCallback((onRemove: (id: string) => void) => {
    if (!error?.itemId) return;
    onRemove(error.itemId);
    setError(null);
    setIsModalOpen(false);
  }, [error]);

  return {
    isModalOpen,
    isMerging,
    isCompleted,
    progress,
    error,
    mergedBytes,
    startMerge,
    downloadMergedPdf,
    cancelMerge,
    closeModal,
    skipError
  };
}
