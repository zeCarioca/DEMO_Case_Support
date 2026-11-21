import React, { DragEvent } from 'react';
import { GripVertical, FileText, Image as ImageIcon, ChevronUp, ChevronDown, X } from 'lucide-react';
import { PdfFileItem } from '../types.js';
import { formatBytes } from '../utils/formatters.js';
import { isSupportedImageFile } from '../utils/image-helper.js';

interface PdfQueueItemProps {
  item: PdfFileItem;
  index: number;
  positionNumber: number;
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

export const PdfQueueItem: React.FC<PdfQueueItemProps> = ({
  item,
  index,
  positionNumber,
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
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
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
        title="Arraste para reposicionar o arquivo"
      >
        <GripVertical size={16} />
      </div>

      {/* Position Number Pill */}
      <span
        style={{
          fontSize: '0.6875rem',
          fontWeight: 700,
          color: 'var(--text-tertiary)',
          minWidth: '1.25rem',
          textAlign: 'center',
          fontVariantNumeric: 'tabular-nums'
        }}
      >
        #{positionNumber}
      </span>

      {/* File Icon */}
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--bg-subtle)',
          color: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isSupportedImageFile(item.file) ? <ImageIcon size={16} /> : <FileText size={16} />}
      </div>

      {/* File Name & Size */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.125rem'
        }}
      >
        <div
          title={item.name}
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {item.name}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)',
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          <span>{formatBytes(item.size)}</span>
          <span style={{ color: 'var(--border)' }}>•</span>
          <span
            style={{
              fontSize: '0.625rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              padding: '0.0625rem 0.25rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)'
            }}
          >
            {item.name.split('.').pop() || 'FILE'}
          </span>
        </div>
      </div>

      {/* Step Buttons & Remove Button */}
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
          title="Mover arquivo para cima"
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
          title="Mover arquivo para baixo"
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
          title="Remover arquivo da fila"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

