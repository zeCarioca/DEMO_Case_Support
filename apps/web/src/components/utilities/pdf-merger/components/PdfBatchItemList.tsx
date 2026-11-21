import React from 'react';
import { Bookmark } from 'lucide-react';
import { BatchHistoryItemMetadata } from '../types.js';
import { formatBytes } from '../utils/formatters.js';

interface PdfBatchItemListProps {
  items: BatchHistoryItemMetadata[];
}

export const PdfBatchItemList: React.FC<PdfBatchItemListProps> = ({ items }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.5rem 0.625rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.375rem',
        maxHeight: '140px',
        overflowY: 'auto',
        border: '1px solid var(--border)'
      }}
    >
      {items.map((item, idx) => (
        <div
          key={`${item.id}-${idx}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', minWidth: 0 }}>
            {item.type === 'file' ? (
              <>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>{idx + 1}.</span>
                <span
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: 'var(--text-primary)'
                  }}
                >
                  {item.name}
                </span>
              </>
            ) : (
              <>
                <Bookmark size={11} style={{ color: 'var(--accent)' }} />
                <span style={{ fontWeight: 600, color: 'var(--accent)' }}>
                  Separador Exhibit {item.customLabel ? `(${item.customLabel})` : ''}
                </span>
              </>
            )}
          </div>
          {item.size ? (
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', flexShrink: 0 }}>
              {formatBytes(item.size)}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
};

