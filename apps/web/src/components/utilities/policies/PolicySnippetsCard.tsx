import React, { useState } from 'react';
import { Copy, Check, MessageSquareQuote, AlertTriangle } from 'lucide-react';
import { PolicySnippet } from './data/policyTypes.js';

interface PolicySnippetsCardProps {
  snippets: PolicySnippet[];
}

export const PolicySnippetsCard: React.FC<PolicySnippetsCardProps> = ({ snippets }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  if (!snippets || snippets.length === 0) return null;

  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--bg-surface)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: 'var(--shadow-level-0)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MessageSquareQuote size={18} style={{ color: 'var(--accent)' }} />
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          Modelos Textuais & Roteiros Oficiais de Abordagem
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
        {snippets.map((snippet, idx) => (
          <div
            key={idx}
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-page)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {snippet.title}
                </span>
                {snippet.badge && (
                  <span
                    style={{
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      padding: '0.125rem 0.375rem',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--bg-subtle)',
                      color: 'var(--text-tertiary)'
                    }}
                  >
                    {snippet.badge}
                  </span>
                )}
              </div>

              {snippet.warning && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: 'var(--sticker-red-text)',
                    backgroundColor: 'var(--sticker-red-bg)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: 'var(--radius-xs)'
                  }}
                >
                  <AlertTriangle size={12} style={{ flexShrink: 0 }} />
                  <span>{snippet.warning}</span>
                </div>
              )}

              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                  fontStyle: 'italic'
                }}
              >
                {snippet.text}
              </div>

              {snippet.note && (
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-ghost)' }}>
                  {snippet.note}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleCopy(snippet.text, idx)}
              style={{
                alignSelf: 'flex-start',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.3125rem 0.625rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                backgroundColor: copiedIdx === idx ? 'var(--sticker-green-bg)' : 'var(--bg-surface)',
                color: copiedIdx === idx ? 'var(--sticker-green-text)' : 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {copiedIdx === idx ? <Check size={13} /> : <Copy size={13} />}
              {copiedIdx === idx ? 'Copiado!' : 'Copiar Texto'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
