import React, { useState } from 'react';
import {
  FileText,
  RotateCcw,
  Trash2,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { BatchHistoryEntry } from '../types.js';
import { formatBytes } from '../utils/formatters.js';
import { PdfBatchItemList } from './PdfBatchItemList.js';

interface PdfBatchHistoryCardProps {
  batch: BatchHistoryEntry;
  onRestore: (batchId: string) => void;
  onDelete: (batchId: string) => void;
  isRestoring?: boolean;
}

export const PdfBatchHistoryCard: React.FC<PdfBatchHistoryCardProps> = ({
  batch,
  onRestore,
  onDelete,
  isRestoring
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = new Date(batch.timestamp).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-surface)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        transition: 'border-color 0.15s ease'
      }}
    >
      {/* Top row: Title and Date */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <strong
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
              title={batch.outputFilename}
            >
              {batch.outputFilename}
            </strong>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            Criado em {formattedDate}
          </span>
        </div>

        {/* Status pill */}
        {batch.hasStoredFiles ? (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.2rem 0.5rem',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              flexShrink: 0
            }}
          >
            <CheckCircle size={11} />
            Pronto p/ restaurar
          </span>
        ) : (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.2rem 0.5rem',
              backgroundColor: 'rgba(234, 179, 8, 0.1)',
              color: '#ca8a04',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              flexShrink: 0
            }}
          >
            <AlertCircle size={11} />
            Metadados salvos
          </span>
        )}
      </div>

      {/* Metrics Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)'
        }}
      >
        <span>
          <strong>{batch.totalFiles}</strong> {batch.totalFiles === 1 ? 'arquivo' : 'arquivos'}
        </span>
        {batch.totalExhibits > 0 && (
          <>
            <span style={{ color: 'var(--border)' }}>•</span>
            <span>
              <strong>{batch.totalExhibits}</strong> separadores
            </span>
          </>
        )}
        <span style={{ color: 'var(--border)' }}>•</span>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatBytes(batch.totalBytes)}</span>
      </div>

      {/* Collapsible File List Toggle */}
      {batch.items && batch.items.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              backgroundColor: 'transparent',
              border: 'none',
              padding: 0,
              fontSize: '0.75rem',
              color: 'var(--accent)',
              cursor: 'pointer',
              fontWeight: 500,
              width: 'fit-content'
            }}
          >
            {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            {isExpanded ? 'Ocultar detalhes dos itens' : `Ver ${batch.items.length} itens do lote`}
          </button>

          {isExpanded && <PdfBatchItemList items={batch.items} />}
        </div>
      )}

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '0.5rem',
          borderTop: '1px solid var(--border)',
          paddingTop: '0.625rem'
        }}
      >
        <button
          type="button"
          onClick={() => onDelete(batch.id)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.35rem 0.5rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--text-tertiary)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            borderRadius: 'var(--radius-sm)'
          }}
          title="Excluir este lote do histórico"
        >
          <Trash2 size={13} />
          Excluir
        </button>

        <button
          type="button"
          onClick={() => onRestore(batch.id)}
          disabled={!batch.hasStoredFiles || isRestoring}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.35rem 0.75rem',
            backgroundColor: batch.hasStoredFiles ? 'var(--accent)' : 'var(--bg-subtle)',
            color: batch.hasStoredFiles ? '#ffffff' : 'var(--text-tertiary)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: batch.hasStoredFiles && !isRestoring ? 'pointer' : 'not-allowed',
            opacity: !batch.hasStoredFiles || isRestoring ? 0.6 : 1
          }}
          title={
            batch.hasStoredFiles
              ? 'Carregar todos os arquivos e separadores deste lote de volta na fila'
              : 'Arquivos não foram armazenados localmente devido ao tamanho'
          }
        >
          <RotateCcw size={13} />
          {isRestoring ? 'Restaurando...' : 'Restaurar Lote'}
        </button>
      </div>
    </div>
  );
};
