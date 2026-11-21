import React, { useState } from 'react';
import { Calculator, Trash2, Copy, Check, Clock, Sparkles } from 'lucide-react';
import { CalculatorEntry } from '../types.js';
import { CalculatorRow } from './CalculatorRow.js';

interface SchedulingCalculatorProps {
  entries: CalculatorEntry[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onSelectVariant: (id: string, variantId: string) => void;
  onRemoveEntry: (id: string) => void;
  onClearAll: () => void;
}

export const SchedulingCalculator: React.FC<SchedulingCalculatorProps> = ({
  entries,
  onUpdateQuantity,
  onSelectVariant,
  onRemoveEntry,
  onClearAll
}) => {
  const [copied, setCopied] = useState(false);

  const totalHours = entries.reduce((acc, entry) => {
    let itemHours = entry.item.defaultHours;
    if (entry.selectedVariantId && entry.item.variants) {
      const v = entry.item.variants.find((item) => item.id === entry.selectedVariantId);
      if (v) itemHours = v.hours;
    }
    return acc + itemHours * entry.quantity;
  }, 0);

  const hoursPart = Math.floor(totalHours);
  const minutesPart = Math.round((totalHours - hoursPart) * 60);

  const handleCopySummary = () => {
    if (entries.length === 0) return;

    let summary = '📋 Docketing & Translation Estimate — Apex IP & Tech Law Group\n';
    summary += '────────────────────────────────────────\n';

    entries.forEach((e) => {
      let hours = e.item.defaultHours;
      let label = e.item.name;

      if (e.selectedVariantId && e.item.variants) {
        const v = e.item.variants.find((item) => item.id === e.selectedVariantId);
        if (v) {
          hours = v.hours;
          label += ` (${v.label})`;
        }
      }

      const subtotal = (hours * e.quantity).toFixed(1);
      summary += `• ${e.item.code}: ${e.quantity}x (${hours}h) = ${subtotal}h — ${label}\n`;
    });

    summary += '────────────────────────────────────────\n';
    summary += `Tempo Total Estimado: ${totalHours.toFixed(1)}h (${hoursPart}h ${minutesPart.toString().padStart(2, '0')}m)\n`;
    summary += 'Obs: Estimativa operacional por classe/processo. Validar prazos no TSDR após agendar.';

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--bg-surface)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: 'var(--shadow-level-1)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calculator size={18} style={{ color: 'var(--accent)' }} />
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Calculadora de Agendamento SLA
          </h3>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.125rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-secondary)'
            }}
          >
            {entries.length} {entries.length === 1 ? 'item' : 'itens'}
          </span>
        </div>

        {entries.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleCopySummary}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.375rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: copied ? 'var(--sticker-green-bg)' : 'var(--accent)',
                color: copied ? 'var(--sticker-green-text)' : '#ffffff',
                border: copied ? '1px solid var(--sticker-green-text)' : 'none',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copiado para o Clipboard!' : 'Copiar Resumo'}
            </button>

            <button
              type="button"
              onClick={onClearAll}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.375rem 0.625rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'transparent',
                color: 'var(--text-tertiary)',
                border: '1px solid var(--border)',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              <Trash2 size={13} />
              Limpar
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {entries.length === 0 ? (
        <div
          style={{
            padding: '2rem 1rem',
            textAlign: 'center',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Clock size={28} style={{ color: 'var(--text-ghost)' }} />
          <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Nenhum item adicionado à estimativa
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', maxWidth: '440px' }}>
            Clique no botão <strong>"Calcular"</strong> na tabela do SOP para somar o tempo médio de formulários, certidões e traduções para este caso.
          </span>
        </div>
      ) : (
        /* Items List */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {entries.map((entry) => (
            <CalculatorRow
              key={entry.id}
              entry={entry}
              onUpdateQuantity={onUpdateQuantity}
              onSelectVariant={onSelectVariant}
              onRemoveEntry={onRemoveEntry}
            />
          ))}
        </div>
      )}

      {/* Summary Footer */}
      {entries.length > 0 && (
        <div
          style={{
            marginTop: '0.5rem',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} style={{ color: 'var(--sticker-yellow-text)' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Estimativa Total de Horas para Agendamento:
              </span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
                Tempo médio sugerido para alocação na agenda do especialista
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)'
              }}
            >
              {totalHours.toFixed(1)}h
            </span>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-tertiary)' }}>
              ({hoursPart}h {minutesPart.toString().padStart(2, '0')}min)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
