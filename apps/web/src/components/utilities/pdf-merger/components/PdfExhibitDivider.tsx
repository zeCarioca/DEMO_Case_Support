import React, { DragEvent } from 'react';
import { GripVertical, ChevronUp, ChevronDown, X, Bookmark } from 'lucide-react';
import { PdfExhibitItem } from '../types.js';

interface PdfExhibitDividerProps {
  item: PdfExhibitItem;
  index: number;
  letter: string;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onDragStart: (e: DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>, index: number) => void;
  onDrop: (e: DragEvent<HTMLDivElement>, index: number) => void;
  disabled?: boolean;
}

export const PdfExhibitDivider: React.FC<PdfExhibitDividerProps> = ({
  index,
  letter,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
  disabled
}) => {
  return (
    <div
      draggable={!disabled}
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.625rem 0.875rem',
        backgroundColor: 'var(--bg-subtle)',
        border: '1.5px solid var(--accent)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        cursor: disabled ? 'default' : 'grab',
        transition: 'all 0.15s ease'
      }}
    >
      {/* Drag Grip Handle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          color: 'var(--text-tertiary)',
          cursor: disabled ? 'default' : 'grab'
        }}
        title="Arraste para reposicionar o Exhibit"
      >
        <GripVertical size={16} />
      </div>

      {/* Exhibit Badge with Icon */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
          padding: '0.25rem 0.625rem',
          backgroundColor: 'var(--accent)',
          color: '#ffffff',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase'
        }}
      >
        <Bookmark size={13} />
        EXHIBIT {letter}
      </div>

      {/* Visual Line Divider */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <div
          style={{
            flex: 1,
            height: '2px',
            backgroundColor: 'var(--border)'
          }}
        />
        <span
          style={{
            fontSize: '0.6875rem',
            color: 'var(--text-tertiary)',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            letterSpacing: '0.03em'
          }}
        >
          Separador Oficial de Evidência
        </span>
        <div
          style={{
            flex: 1,
            height: '2px',
            backgroundColor: 'var(--border)'
          }}
        />
      </div>

      {/* Position and Remove Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        <button
          type="button"
          onClick={onMoveUp}
          disabled={disabled || isFirst}
          style={{
            padding: '0.25rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: isFirst ? 'var(--border)' : 'var(--text-secondary)',
            cursor: isFirst || disabled ? 'not-allowed' : 'pointer',
            borderRadius: 'var(--radius-sm)'
          }}
          title="Mover Exhibit para cima"
        >
          <ChevronUp size={16} />
        </button>

        <button
          type="button"
          onClick={onMoveDown}
          disabled={disabled || isLast}
          style={{
            padding: '0.25rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: isLast ? 'var(--border)' : 'var(--text-secondary)',
            cursor: isLast || disabled ? 'not-allowed' : 'pointer',
            borderRadius: 'var(--radius-sm)'
          }}
          title="Mover Exhibit para baixo"
        >
          <ChevronDown size={16} />
        </button>

        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          style={{
            padding: '0.25rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--text-tertiary)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            borderRadius: 'var(--radius-sm)',
            marginLeft: '0.25rem'
          }}
          title="Remover Exhibit da fila"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

