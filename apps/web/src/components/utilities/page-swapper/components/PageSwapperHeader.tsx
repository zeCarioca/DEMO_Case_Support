import React from 'react';
import { ArrowLeft, ShieldCheck, Cpu } from 'lucide-react';
import { BreatheDemoButton } from '../../demo/BreatheDemoButton.js';
import { useLanguage } from '../../../i18n/LanguageContext.js';

interface PageSwapperHeaderProps {
  onBackToHub: () => void;
  onRunDemo?: () => void;
  isDemoLoading?: boolean;
}

export const PageSwapperHeader: React.FC<PageSwapperHeaderProps> = ({
  onBackToHub,
  onRunDemo,
  isDemoLoading = false
}) => {
  const { language } = useLanguage();
  const isPt = language === 'pt';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '1.25rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          type="button"
          onClick={onBackToHub}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: 0
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <ArrowLeft size={16} />
          <span>{isPt ? 'Voltar para Central de Utilitários' : 'Back to Utilities Hub'}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {onRunDemo && (
            <BreatheDemoButton
              size="sm"
              isLoading={isDemoLoading}
              onClick={onRunDemo}
            />
          )}

          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              color: '#065F46',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
          >
            <ShieldCheck size={13} />
            {isPt ? 'Processamento 100% Local' : '100% Client-Side'}
          </span>
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              color: 'var(--text-tertiary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
          >
            <Cpu size={13} />
            Single-Page Memory
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <h1
          style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em'
          }}
        >
          {isPt ? 'Page Swapper (Substituidor de Páginas)' : 'Page Swapper & Signature Replacement'}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: '0.875rem',
            color: 'var(--text-tertiary)',
            maxWidth: '680px'
          }}
        >
          {isPt
            ? 'Substitua com precisão a página de assinatura de petições ou contratos mantendo as demais páginas intactas com validação visual imediata.'
            : 'Accurately replace the signature or declaration page of filings and agreements while preserving all other pages intact with instant side-by-side verification.'}
        </p>
      </div>
    </div>
  );
};
