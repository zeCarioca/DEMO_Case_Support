import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PanelTopControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  disabled?: boolean;
}

export const PanelTopControls: React.FC<PanelTopControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false
}) => {
  if (totalPages <= 1) {
    return (
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--text-tertiary)',
          backgroundColor: 'var(--bg-subtle)',
          padding: '0.25rem 0.5rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)'
        }}
      >
        Pág. 1 de 1
      </span>
    );
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        backgroundColor: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '0.1875rem'
      }}
    >
      <button
        type="button"
        onClick={handlePrev}
        disabled={disabled || currentPage <= 1}
        title="Página Anterior"
        style={{
          border: 'none',
          background: 'none',
          cursor: disabled || currentPage <= 1 ? 'not-allowed' : 'pointer',
          opacity: disabled || currentPage <= 1 ? 0.35 : 1,
          padding: '0.25rem',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Selector Dropdown */}
      <select
        value={currentPage}
        disabled={disabled}
        onChange={(e) => onPageChange(Number(e.target.value))}
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          fontSize: '0.8125rem',
          fontWeight: 600,
          fontVariantNumeric: 'tabular-nums',
          color: 'var(--text-primary)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          padding: '0.125rem 0.375rem',
          outline: 'none'
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <option key={p} value={p}>
            Página {p} de {totalPages}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleNext}
        disabled={disabled || currentPage >= totalPages}
        title="Próxima Página"
        style={{
          border: 'none',
          background: 'none',
          cursor: disabled || currentPage >= totalPages ? 'not-allowed' : 'pointer',
          opacity: disabled || currentPage >= totalPages ? 0.35 : 1,
          padding: '0.25rem',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
