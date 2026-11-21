import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { QueueItem, SortOption } from './types.js';
import { PdfMergerHero } from './components/PdfMergerHero.js';
import { PdfDropzone } from './components/PdfDropzone.js';
import { PdfQueueHeader } from './components/PdfQueueHeader.js';
import { PdfQueueList } from './components/PdfQueueList.js';
import { PdfMergerActionBar } from './components/PdfMergerActionBar.js';
import { PdfMergeModal } from './components/PdfMergeModal.js';
import { PdfBatchHistoryModal } from './components/PdfBatchHistoryModal.js';
import { PdfBatchHistoryBanner } from './components/PdfBatchHistoryBanner.js';
import { useBatchHistory } from './hooks/useBatchHistory.js';
import { usePdfMergerWorker } from './hooks/usePdfMergerWorker.js';
import { useSavedFileOrder } from './hooks/useSavedFileOrder.js';
import { sanitizePdfFilename } from './utils/formatters.js';
import { isSupportedImageFile } from './utils/image-helper.js';
import { useMergerDemo } from './hooks/useMergerDemo.js';

interface PdfMergerViewProps {
  onBackToHub: () => void;
  initialDemo?: boolean;
}

export const PdfMergerView: React.FC<PdfMergerViewProps> = ({ onBackToHub, initialDemo = false }) => {
  const [items, setItems] = useState<QueueItem[]>([]);
  const [outputFilename, setOutputFilename] = useState(() => {
    const today = new Date().toISOString().slice(0, 10);
    return `documento-consolidado-${today}.pdf`;
  });
  const [addBookmarks, setAddBookmarks] = useState(true);
  const [normalizeA4, setNormalizeA4] = useState(true);

  // Batch History state
  const { batches, saveBatch, restoreBatch, deleteBatch, clearHistory } = useBatchHistory();
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isSavingBatch, setIsSavingBatch] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Saved File Order state (in browser localStorage)
  const {
    hasSavedOrder,
    savedCount,
    isOrderSavedRecently,
    saveOrder,
    applyOrder
  } = useSavedFileOrder();

  // Demo auto-runner state
  const { isDemoLoading, runDemo } = useMergerDemo({
    setItems,
    setFeedbackMessage,
    initialDemo
  });

  // Merge Worker state
  const {
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
  } = usePdfMergerWorker();

  const totalFiles = items.filter((i) => i.type === 'file').length;
  const totalExhibits = items.filter((i) => i.type === 'exhibit').length;
  const totalBytes = items.reduce((acc, i) => (i.type === 'file' ? acc + i.size : acc), 0);

  const handleFilesAdded = (newFiles: File[]) => {
    const newItems: QueueItem[] = newFiles.map((file, idx) => ({
      id: `file-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
      type: 'file',
      fileKind: isSupportedImageFile(file) ? 'image' : 'pdf',
      file,
      name: file.name,
      size: file.size,
      addedAt: Date.now() + idx
    }));
    setItems((prev) => [...prev, ...newItems]);
  };

  const handleAddExhibit = () => {
    const exhibitItem: QueueItem = {
      id: `exhibit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type: 'exhibit',
      addedAt: Date.now()
    };
    setItems((prev) => [...prev, exhibitItem]);
  };

  const handleSort = (option: SortOption) => {
    if (option === 'saved-order') {
      handleApplySavedOrder();
      return;
    }

    if (option === 'original') {
      setItems((prev) => [...prev].sort((a, b) => a.addedAt - b.addedAt));
      return;
    }

    setItems((prev) => {
      return [...prev].sort((a, b) => {
        if (a.type !== 'file' || b.type !== 'file') return 0;
        if (option === 'name-asc') return a.name.localeCompare(b.name);
        if (option === 'name-desc') return b.name.localeCompare(a.name);
        if (option === 'size-asc') return a.size - b.size;
        if (option === 'size-desc') return b.size - a.size;
        return 0;
      });
    });
  };

  const handleSaveFileOrder = () => {
    if (items.length === 0) return;
    const ok = saveOrder(items);
    if (ok) {
      const fileCount = items.filter((i) => i.type === 'file').length;
      setFeedbackMessage(
        `Ordem dos arquivos salva na memória do navegador com sucesso (${fileCount} ${fileCount === 1 ? 'arquivo' : 'arquivos'})!`
      );
      setTimeout(() => setFeedbackMessage(null), 3500);
    }
  };

  const handleApplySavedOrder = () => {
    if (!hasSavedOrder || items.length === 0) return;
    const reordered = applyOrder(items);
    setItems(reordered);
    setFeedbackMessage('Ordem salva aplicada à fila com sucesso!');
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleManualSaveBatch = async () => {
    if (items.length === 0) return;
    setIsSavingBatch(true);
    await saveBatch(items, sanitizePdfFilename(outputFilename), addBookmarks, normalizeA4);
    setIsSavingBatch(false);
    setFeedbackMessage('Lote salvo no histórico local com sucesso!');
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleRestoreBatch = async (batchId: string) => {
    setIsRestoring(true);
    const result = await restoreBatch(batchId);
    setIsRestoring(false);
    if (result && result.items.length > 0) {
      setItems(result.items);
      setOutputFilename(result.outputFilename);
      setAddBookmarks(result.addBookmarks);
      if (typeof result.normalizeA4 === 'boolean') {
        setNormalizeA4(result.normalizeA4);
      }
      setIsHistoryModalOpen(false);
      setFeedbackMessage(`Lote restaurado com sucesso! (${result.items.length} itens na fila)`);
      setTimeout(() => setFeedbackMessage(null), 3500);
    }
  };

  const handleStartMerge = () => {
    if (items.length === 0) return;
    saveBatch(items, sanitizePdfFilename(outputFilename), addBookmarks, normalizeA4);
    startMerge(items, outputFilename, addBookmarks, normalizeA4);
  };

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem'
      }}
    >
      <PdfMergerHero
        onBackToHub={onBackToHub}
        historyCount={batches.length}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        onRunDemo={runDemo}
        isDemoLoading={isDemoLoading}
      />

      {feedbackMessage && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1rem',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#10b981',
            fontSize: '0.8125rem',
            fontWeight: 500
          }}
        >
          <Check size={16} />
          <span>{feedbackMessage}</span>
        </div>
      )}

      <PdfDropzone onFilesAdded={handleFilesAdded} disabled={isMerging} />

      {items.length === 0 && (
        <PdfBatchHistoryBanner
          batches={batches}
          onOpenHistory={() => setIsHistoryModalOpen(true)}
          onRestoreLatest={handleRestoreBatch}
          isRestoring={isRestoring}
        />
      )}

      {items.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <PdfQueueHeader
            totalFiles={totalFiles}
            totalExhibits={totalExhibits}
            totalBytes={totalBytes}
            onAddExhibit={handleAddExhibit}
            onSort={handleSort}
            onClearAll={() => setItems([])}
            historyCount={batches.length}
            onOpenHistory={() => setIsHistoryModalOpen(true)}
            onSaveBatch={handleManualSaveBatch}
            isSavingBatch={isSavingBatch}
            onSaveOrder={handleSaveFileOrder}
            isOrderSavedRecently={isOrderSavedRecently}
            hasSavedOrder={hasSavedOrder}
            savedOrderCount={savedCount}
            onApplySavedOrder={handleApplySavedOrder}
            disabled={isMerging}
          />

          <PdfQueueList
            items={items}
            onReorder={setItems}
            onRemoveItem={handleRemoveItem}
            disabled={isMerging}
          />

          <PdfMergerActionBar
            outputFilename={outputFilename}
            onOutputFilenameChange={setOutputFilename}
            addBookmarks={addBookmarks}
            onToggleBookmarks={() => setAddBookmarks((b) => !b)}
            normalizeA4={normalizeA4}
            onToggleNormalizeA4={() => setNormalizeA4((n) => !n)}
            onStartMerge={handleStartMerge}
            itemsCount={items.length}
            disabled={isMerging}
          />
        </div>
      )}

      <PdfMergeModal
        isOpen={isModalOpen}
        isMerging={isMerging}
        isCompleted={isCompleted}
        progress={progress}
        error={error}
        outputFilename={sanitizePdfFilename(outputFilename)}
        mergedBytes={mergedBytes}
        onDownload={() => downloadMergedPdf(outputFilename)}
        onCancel={cancelMerge}
        onClose={closeModal}
        onSkipError={() => skipError((id) => setItems((prev) => prev.filter((i) => i.id !== id)))}
      />

      <PdfBatchHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        batches={batches}
        onRestoreBatch={handleRestoreBatch}
        onDeleteBatch={deleteBatch}
        onClearHistory={clearHistory}
        isRestoring={isRestoring}
      />
    </div>
  );
};
