import React from 'react';
import { Play, CheckSquare, Square } from 'lucide-react';

interface PdfMergerActionBarProps {
  outputFilename: string;
  onOutputFilenameChange: (name: string) => void;
  addBookmarks: boolean;
  onToggleBookmarks: () => void;
  normalizeA4: boolean;
  onToggleNormalizeA4: () => void;
  onStartMerge: () => void;
  itemsCount: number;
  disabled?: boolean;
}

export const PdfMergerActionBar: React.FC<PdfMergerActionBarProps> = ({
  outputFilename,
  onOutputFilenameChange,
  addBookmarks,
  onToggleBookmarks,
  normalizeA4,
  onToggleNormalizeA4,
  onStartMerge,
  itemsCount,
  disabled
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1.25rem',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', flex: 1 }}>
        {/* Output Filename Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '260px', flex: 1 }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Nome do Arquivo Consolidado
          </label>
          <input
            type="text"
            value={outputFilename}
            onChange={(e) => onOutputFilenameChange(e.target.value)}
            placeholder="ex: peticao-consolidada.pdf"
            disabled={disabled}
            style={{
              padding: '0.5rem 0.75rem',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Bookmarks Toggle Checkbox */}
        <button
          type="button"
          onClick={onToggleBookmarks}
          disabled={disabled}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '0.8125rem',
            cursor: disabled ? 'not-allowed' : 'pointer',
            padding: 0
          }}
        >
          {addBookmarks ? (
            <CheckSquare size={18} style={{ color: 'var(--accent)' }} />
          ) : (
            <Square size={18} style={{ color: 'var(--text-tertiary)' }} />
          )}
          <span>Gerar Marcadores / Bookmarks de PDF</span>
        </button>

        {/* Normalize A4 Toggle Checkbox */}
        <button
          type="button"
          onClick={onToggleNormalizeA4}
          disabled={disabled}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '0.8125rem',
            cursor: disabled ? 'not-allowed' : 'pointer',
            padding: 0
          }}
          title="Padroniza todas as páginas para o formato padrão A4 (595 x 842 pt), redimensionando o conteúdo sem cortes"
        >
          {normalizeA4 ? (
            <CheckSquare size={18} style={{ color: 'var(--accent)' }} />
          ) : (
            <Square size={18} style={{ color: 'var(--text-tertiary)' }} />
          )}
          <span>Página em tamanho A4</span>
        </button>
      </div>

      {/* Merge Action Button */}
      <button
        type="button"
        onClick={onStartMerge}
        disabled={disabled || itemsCount === 0}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.625rem 1.5rem',
          backgroundColor: 'var(--accent)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          color: '#ffffff',
          fontSize: '0.875rem',
          fontWeight: 600,
          cursor: disabled || itemsCount === 0 ? 'not-allowed' : 'pointer',
          opacity: itemsCount === 0 ? 0.6 : 1,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)'
        }}
      >
        <Play size={16} />
        Iniciar Mesclagem ({itemsCount} {itemsCount === 1 ? 'item' : 'itens'})
      </button>
    </div>
  );
};

