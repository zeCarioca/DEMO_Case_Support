import React from 'react';
import { History, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import { BatchHistoryEntry } from '../types.js';
import { formatBytes } from '../utils/formatters.js';

interface PdfBatchHistoryBannerProps {
  batches: BatchHistoryEntry[];
  onOpenHistory: () => void;
  onRestoreLatest: (batchId: string) => void;
  isRestoring?: boolean;
}

export const PdfBatchHistoryBanner: React.FC<PdfBatchHistoryBannerProps> = ({
  batches,
  onOpenHistory,
  onRestoreLatest,
  isRestoring
}) => {
  if (batches.length === 0) return null;

  const latestBatch = batches[0];
  const formattedDate = new Date(latestBatch.timestamp).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        padding: '0.875rem 1.25rem',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-subtle)',
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <History size={16} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Último lote selecionado:
            </span>
            <strong
              style={{
                fontSize: '0.8125rem',
                color: 'var(--text-primary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {latestBatch.outputFilename}
            </strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            <span>{latestBatch.totalFiles} arquivos</span>
            <span>•</span>
            <span>{formatBytes(latestBatch.totalBytes)}</span>
            <span>•</span>
            <span>{formattedDate}</span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: '#10b981' }}>
              <ShieldCheck size={12} /> Local
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {latestBatch.hasStoredFiles && (
          <button
            type="button"
            onClick={() => onRestoreLatest(latestBatch.id)}
            disabled={isRestoring}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.375rem 0.75rem',
              backgroundColor: 'var(--accent)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: isRestoring ? 'not-allowed' : 'pointer'
            }}
          >
            <RotateCcw size={13} />
            {isRestoring ? 'Restaurando...' : 'Restaurar Este Lote'}
          </button>
        )}

        <button
          type="button"
          onClick={onOpenHistory}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.375rem 0.625rem',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-secondary)',
            fontSize: '0.75rem',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          <span>Ver Histórico ({batches.length})</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};

