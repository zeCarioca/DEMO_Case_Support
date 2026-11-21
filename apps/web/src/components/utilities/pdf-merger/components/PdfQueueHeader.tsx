import React from 'react';
import {
  BookmarkPlus,
  BookmarkCheck,
  ArrowUpDown,
  Trash2,
  Layers,
  History,
  Save,
  Check,
  ListOrdered
} from 'lucide-react';
import { SortOption } from '../types.js';
import { formatBytes } from '../utils/formatters.js';

interface PdfQueueHeaderProps {
  totalFiles: number;
  totalExhibits: number;
  totalBytes: number;
  onAddExhibit: () => void;
  onSort: (option: SortOption) => void;
  onClearAll: () => void;
  historyCount?: number;
  onOpenHistory?: () => void;
  onSaveBatch?: () => void;
  isSavingBatch?: boolean;
  onSaveOrder?: () => void;
  isOrderSavedRecently?: boolean;
  hasSavedOrder?: boolean;
  savedOrderCount?: number;
  onApplySavedOrder?: () => void;
  disabled?: boolean;
}

export const PdfQueueHeader: React.FC<PdfQueueHeaderProps> = ({
  totalFiles,
  totalExhibits,
  totalBytes,
  onAddExhibit,
  onSort,
  onClearAll,
  historyCount = 0,
  onOpenHistory,
  onSaveBatch,
  isSavingBatch,
  onSaveOrder,
  isOrderSavedRecently,
  hasSavedOrder,
  savedOrderCount,
  onApplySavedOrder,
  disabled
}) => {
  const secondaryBtnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.375rem 0.625rem',
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-secondary)',
    fontSize: '0.75rem',
    fontWeight: 500,
    transition: 'all 0.15s ease'
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)'
      }}
    >
      {/* Counters & Summary */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-secondary)' }}>
          <Layers size={15} style={{ color: 'var(--accent)' }} />
          <span>
            <strong style={{ color: 'var(--text-primary)' }}>{totalFiles}</strong> {totalFiles === 1 ? 'arquivo' : 'arquivos'}
          </span>
        </div>

        {totalExhibits > 0 && (
          <>
            <span style={{ color: 'var(--border)' }}>•</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>{totalExhibits}</strong> {totalExhibits === 1 ? 'exhibit' : 'exhibits'}
            </span>
          </>
        )}

        {totalBytes > 0 && (
          <>
            <span style={{ color: 'var(--border)' }}>•</span>
            <span style={{ color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
              {formatBytes(totalBytes)}
            </span>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        {/* Adicionar Exhibit Button */}
        <button
          type="button"
          onClick={onAddExhibit}
          disabled={disabled}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.375rem 0.75rem',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--accent)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--accent)',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s ease'
          }}
          title="Insere uma linha divisória de Exhibit na fila para o documento final"
        >
          <BookmarkPlus size={14} />
          Adicionar Exhibit
        </button>

        {/* Salvar Ordem Button */}
        {onSaveOrder && (
          <button
            type="button"
            onClick={onSaveOrder}
            disabled={disabled || totalFiles === 0}
            style={{
              ...secondaryBtnStyle,
              backgroundColor: isOrderSavedRecently ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-surface)',
              borderColor: isOrderSavedRecently ? '#10b981' : 'var(--border)',
              color: isOrderSavedRecently ? '#10b981' : 'var(--text-secondary)',
              cursor: disabled || totalFiles === 0 ? 'not-allowed' : 'pointer'
            }}
            title="Salva a sequência atual dos arquivos na memória local do navegador (localStorage)"
          >
            {isOrderSavedRecently ? (
              <Check size={14} style={{ color: '#10b981' }} />
            ) : (
              <Save size={14} style={{ color: 'var(--accent)' }} />
            )}
            {isOrderSavedRecently ? 'Ordem Salva!' : 'Salvar Ordem'}
          </button>
        )}

        {/* Aplicar Ordem Salva Button */}
        {hasSavedOrder && onApplySavedOrder && (
          <button
            type="button"
            onClick={onApplySavedOrder}
            disabled={disabled || totalFiles === 0}
            style={{
              ...secondaryBtnStyle,
              cursor: disabled || totalFiles === 0 ? 'not-allowed' : 'pointer'
            }}
            title="Reorganiza os arquivos na fila de acordo com a ordem salva na memória local"
          >
            <ListOrdered size={14} style={{ color: 'var(--accent)' }} />
            Aplicar Ordem Salva {savedOrderCount ? `(${savedOrderCount})` : ''}
          </button>
        )}

        {/* Salvar Lote Button */}
        {onSaveBatch && (
          <button
            type="button"
            onClick={onSaveBatch}
            disabled={disabled || isSavingBatch || (totalFiles === 0 && totalExhibits === 0)}
            style={{
              ...secondaryBtnStyle,
              cursor: disabled || isSavingBatch ? 'not-allowed' : 'pointer'
            }}
            title="Salva a seleção atual como lote no histórico local"
          >
            <BookmarkCheck size={14} style={{ color: 'var(--accent)' }} />
            {isSavingBatch ? 'Salvando...' : 'Salvar Lote'}
          </button>
        )}

        {/* Histórico Button */}
        {onOpenHistory && (
          <button
            type="button"
            onClick={onOpenHistory}
            disabled={disabled}
            style={{
              ...secondaryBtnStyle,
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            title="Ver histórico dos últimos lotes selecionados"
          >
            <History size={14} style={{ color: 'var(--accent)' }} />
            Histórico {historyCount > 0 ? `(${historyCount})` : ''}
          </button>
        )}

        {/* Quick Sort Select */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <ArrowUpDown size={14} style={{ color: 'var(--text-tertiary)' }} />
          <select
            onChange={(e) => onSort(e.target.value as SortOption)}
            defaultValue="original"
            disabled={disabled || totalFiles <= 1}
            style={{
              padding: '0.375rem 0.5rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              fontSize: '0.75rem',
              cursor: disabled || totalFiles <= 1 ? 'not-allowed' : 'pointer',
              outline: 'none'
            }}
          >
            <option value="original">Ordem de Upload</option>
            {hasSavedOrder && (
              <option value="saved-order">Ordem Salva na Memória ({savedOrderCount})</option>
            )}
            <option value="name-asc">Nome (A → Z)</option>
            <option value="name-desc">Nome (Z → A)</option>
            <option value="size-asc">Tamanho (Menor → Maior)</option>
            <option value="size-desc">Tamanho (Maior → Menor)</option>
          </select>
        </div>

        {/* Clear All Button */}
        {(totalFiles > 0 || totalExhibits > 0) && (
          <button
            type="button"
            onClick={onClearAll}
            disabled={disabled}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.375rem 0.5rem',
              backgroundColor: 'transparent',
              border: '1px solid transparent',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-tertiary)',
              fontSize: '0.75rem',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'color 0.15s ease'
            }}
            title="Limpar todos os itens da fila"
          >
            <Trash2 size={14} />
            Limpar Fila
          </button>
        )}
      </div>
    </div>
  );
};

