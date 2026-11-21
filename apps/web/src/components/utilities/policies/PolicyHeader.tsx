import React from 'react';
import { ArrowLeft, BookOpen, ShieldCheck } from 'lucide-react';

interface PolicyHeaderProps {
  onBackToHub: () => void;
  policyCount: number;
}

export const PolicyHeader: React.FC<PolicyHeaderProps> = ({ onBackToHub, policyCount }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '1.25rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={onBackToHub}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.375rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-secondary)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.15s ease'
          }}
        >
          <ArrowLeft size={14} />
          Voltar aos Utilitários
        </button>

        <span style={{ color: 'var(--border)' }}>/</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={18} style={{ color: 'var(--accent)' }} />
          <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Políticas & Procedimentos Operacionais
          </h1>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span
          style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.625rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--sticker-purple-bg)',
            color: 'var(--sticker-purple-text)',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}
        >
          <ShieldCheck size={13} />
          {policyCount} Políticas Oficiais da Firma
        </span>
      </div>
    </div>
  );
};
