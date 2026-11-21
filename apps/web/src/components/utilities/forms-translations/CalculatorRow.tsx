import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CalculatorEntry } from '../types.js';

interface CalculatorRowProps {
  entry: CalculatorEntry;
  onUpdateQuantity: (id: string, delta: number) => void;
  onSelectVariant: (id: string, variantId: string) => void;
  onRemoveEntry: (id: string) => void;
}

export const CalculatorRow: React.FC<CalculatorRowProps> = ({
  entry,
  onUpdateQuantity,
  onSelectVariant,
  onRemoveEntry
}) => {
  let activeHours = entry.item.defaultHours;
  if (entry.selectedVariantId && entry.item.variants) {
    const v = entry.item.variants.find((item) => item.id === entry.selectedVariantId);
    if (v) activeHours = v.hours;
  }
  const subtotal = activeHours * entry.quantity;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.625rem 0.875rem',
        backgroundColor: 'var(--bg-page)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-subtle)',
        flexWrap: 'wrap',
        gap: '0.625rem'
      }}
    >
      {/* Item Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '200px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
            {entry.item.code}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            ({entry.item.unit})
          </span>
        </div>

        {/* Variant Selection if available */}
        {entry.item.variants && (
          <select
            value={entry.selectedVariantId || entry.item.variants[0].id}
            onChange={(e) => onSelectVariant(entry.id, e.target.value)}
            style={{
              fontSize: '0.75rem',
              padding: '0.125rem 0.375rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-select, var(--bg-surface))',
              color: 'var(--text-primary)'
            }}
          >
            {entry.item.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label} ({v.hours.toFixed(1)}h)
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Quantity Controls & Hours */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Stepper */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-surface)',
            overflow: 'hidden'
          }}
        >
          <button
            type="button"
            onClick={() => onUpdateQuantity(entry.id, -1)}
            style={{
              padding: '0.25rem 0.5rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'var(--text-secondary)'
            }}
          >
            <Minus size={12} />
          </button>
          <span
            style={{
              padding: '0 0.5rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)'
            }}
          >
            {entry.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(entry.id, 1)}
            style={{
              padding: '0.25rem 0.5rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'var(--text-secondary)'
            }}
          >
            <Plus size={12} />
          </button>
        </div>

        {/* Subtotal */}
        <div style={{ minWidth: '70px', textAlign: 'right' }}>
          <span
            style={{
              fontSize: '0.9375rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-primary)'
            }}
          >
            {subtotal.toFixed(1)}h
          </span>
        </div>

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => onRemoveEntry(entry.id)}
          style={{
            border: 'none',
            background: 'transparent',
            color: 'var(--text-ghost)',
            cursor: 'pointer',
            padding: '0.25rem'
          }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};
