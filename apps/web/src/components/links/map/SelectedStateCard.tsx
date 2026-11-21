import React, { useState } from 'react';
import { ExternalLink, Copy, Check, X, ShieldAlert, Globe } from 'lucide-react';
import { StateSwaInfo } from './types.js';

interface SelectedStateCardProps {
  state: StateSwaInfo;
  onClose: () => void;
}

export const SelectedStateCard: React.FC<SelectedStateCardProps> = ({ state, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(state.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className="notion-card"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        marginTop: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        boxShadow: 'var(--shadow-level-2)',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                backgroundColor: 'var(--sticker-blue-bg)',
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border)'
              }}
            >
              {state.code}
            </span>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                margin: 0
              }}
            >
              {state.name} — Agência SWA Oficial
            </h3>
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Portal Estadual: <strong style={{ color: 'var(--text-primary)' }}>{state.portalName}</strong>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-tertiary)',
            cursor: 'pointer',
            padding: '0.2rem'
          }}
          title="Fechar painel de estado"
        >
          <X size={16} />
        </button>
      </div>

      {/* Regulatory Reminder */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.55rem',
          backgroundColor: 'var(--sticker-yellow-bg)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 0.85rem',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--color-warning)'
        }}
      >
        <ShieldAlert size={16} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.75rem', color: 'var(--sticker-yellow-text)', lineHeight: 1.45 }}>
          <strong>Requisito 20 CFR 656 (Job Order SWA):</strong> O anúncio nesta agência estadual deve permanecer ativo por no mínimo{' '}
          <strong>30 dias corridos</strong> consecutivos. Salvar print com timestamp de abertura e encerramento antes de computar o Quiet Period.
        </div>
      </div>

      {/* Action Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid var(--border)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
          <Globe size={13} />
          <span>{state.displayUrl}</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.35rem 0.65rem',
              fontSize: '0.75rem',
              color: copied ? 'var(--color-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.15s ease'
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? 'Copiado!' : 'Copiar URL'}</span>
          </button>

          <a
            href={state.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              padding: '0.35rem 0.85rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.15s ease'
            }}
          >
            <span>Acessar {state.portalName}</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};
