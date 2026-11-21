import React from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import { ScheduleItem } from '../types.js';

interface WatermelonTableRowProps {
  item: ScheduleItem;
  isAdded: boolean;
  onAddItem: (item: ScheduleItem) => void;
}

export const WatermelonTableRow: React.FC<WatermelonTableRowProps> = ({
  item,
  isAdded,
  onAddItem
}) => {
  return (
    <tr
      style={{
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background-color 0.1s ease',
        backgroundColor: isAdded ? 'var(--sticker-yellow-bg)' : 'transparent'
      }}
    >
      {/* Name & Code */}
      <td style={{ padding: '0.875rem 1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
          <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
            {item.code}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            {item.name}
          </span>
        </div>
      </td>

      {/* Category & Unit */}
      <td style={{ padding: '0.875rem 1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span
            style={{
              display: 'inline-block',
              width: 'fit-content',
              fontSize: '0.6875rem',
              fontWeight: 600,
              padding: '0.125rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor:
                item.category === 'forms'
                  ? 'var(--sticker-blue-bg)'
                  : item.category === 'translations'
                    ? 'var(--sticker-green-bg)'
                    : 'var(--sticker-purple-bg)',
              color:
                item.category === 'forms'
                  ? '#0070f3'
                  : item.category === 'translations'
                    ? 'var(--sticker-green-text)'
                    : 'var(--sticker-purple-text)'
            }}
          >
            {item.category === 'forms'
              ? 'Formulário'
              : item.category === 'translations'
                ? 'Tradução'
                : 'FOIA / Especial'}
          </span>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-ghost)' }}>
            {item.unit}
          </span>
        </div>
      </td>

      {/* Estimated Time */}
      <td style={{ padding: '0.875rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem' }}>
          <span
            style={{
              fontSize: '1.0625rem',
              fontWeight: 700,
              fontFamily: 'var(--font-primary)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)'
            }}
          >
            {item.defaultHours.toFixed(1)}h
          </span>
          {item.variableRange && (
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--text-tertiary)',
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              ({item.variableRange})
            </span>
          )}
        </div>
      </td>

      {/* Notes / Conditions */}
      <td style={{ padding: '0.875rem 1rem' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          {item.notes || '—'}
        </p>
      </td>

      {/* Action to Calculator */}
      <td style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>
        <button
          type="button"
          onClick={() => onAddItem(item)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.375rem 0.625rem',
            borderRadius: 'var(--radius-sm)',
            border: `1px solid ${isAdded ? 'var(--sticker-green-text)' : 'var(--border)'}`,
            backgroundColor: isAdded ? 'var(--sticker-green-bg)' : 'var(--bg-page)',
            color: isAdded ? 'var(--sticker-green-text)' : 'var(--text-primary)',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          {isAdded ? (
            <>
              <CheckCircle2 size={13} />
              +1 Item
            </>
          ) : (
            <>
              <Plus size={13} />
              Calcular
            </>
          )}
        </button>
      </td>
    </tr>
  );
};
