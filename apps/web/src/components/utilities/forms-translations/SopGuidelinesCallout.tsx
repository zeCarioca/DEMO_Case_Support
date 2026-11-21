import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, Globe2, ShieldAlert } from 'lucide-react';
import { SOP_RULES } from './data/teamData.js';

export const SopGuidelinesCallout: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-surface)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-level-1)'
      }}
    >
      {/* Banner Header with Toggle */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.875rem 1.25rem',
          backgroundColor: 'var(--bg-subtle)',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
          <ShieldAlert size={18} style={{ color: 'var(--sticker-orange-text)' }} />
          <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
            Importante Antes de Qualquer Agendamento (Diretrizes Operacionais de Forms & Traduções)
          </span>
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              padding: '0.125rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--sticker-yellow-bg)',
              color: 'var(--sticker-yellow-text)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <Globe2 size={12} />
            Idiomas: PT • EN • ES
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-tertiary)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>
            {isExpanded ? 'Ocultar Diretrizes' : 'Ver 6 Diretrizes'}
          </span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Rules Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '0.875rem'
            }}
          >
            {SOP_RULES.map((rule, idx) => (
              <div
                key={rule.title}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.625rem',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-page)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div
                  style={{
                    minWidth: '20px',
                    height: '20px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px'
                  }}
                >
                  {idx + 1}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {rule.title}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', lineHeight: 1.45 }}>
                    {rule.text}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 0.875rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--sticker-orange-bg)',
              color: 'var(--sticker-orange-text)',
              fontSize: '0.75rem'
            }}
          >
            <AlertCircle size={15} style={{ flexShrink: 0 }} />
            <span>
              <strong>Nota sobre Prazos Fatais:</strong> Prazos de Office Action perante o USPTO (3 meses) e janelas de oposição perante o TTAB (30 dias) são peremptórios. Para prorrogações de SOU e renovações Section 8/9, use o tempo padrão dos formulários TEAS.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
