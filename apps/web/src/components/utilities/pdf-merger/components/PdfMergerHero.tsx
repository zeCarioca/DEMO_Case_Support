import React from 'react';
import { ArrowLeft, Files, History } from 'lucide-react';
import { BreatheDemoButton } from '../../demo/BreatheDemoButton.js';
import { useLanguage } from '../../../i18n/LanguageContext.js';

interface PdfMergerHeroProps {
  onBackToHub: () => void;
  historyCount?: number;
  onOpenHistory?: () => void;
  onRunDemo?: () => void;
  isDemoLoading?: boolean;
}

export const PdfMergerHero: React.FC<PdfMergerHeroProps> = ({
  onBackToHub,
  historyCount = 0,
  onOpenHistory,
  onRunDemo,
  isDemoLoading = false
}) => {
  const { language } = useLanguage();
  const isPt = language === 'pt';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top action row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={onBackToHub}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.375rem 0.625rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--text-tertiary)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            cursor: 'pointer',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <ArrowLeft size={16} />
          {isPt ? 'Voltar para Central de Utilitários' : 'Back to Utilities Hub'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {onRunDemo && (
            <BreatheDemoButton
              size="sm"
              isLoading={isDemoLoading}
              onClick={onRunDemo}
            />
          )}

          {onOpenHistory && (
            <button
              type="button"
              onClick={onOpenHistory}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.375rem 0.625rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              <History size={14} style={{ color: 'var(--accent)' }} />
              {isPt ? 'Histórico' : 'History'} {historyCount > 0 ? `(${historyCount})` : ''}
            </button>
          )}
        </div>
      </div>

      {/* Hero Header */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          paddingBottom: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.375rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Files size={18} />
          </div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {isPt ? 'Mesclador de PDFs (Batch Merger)' : 'PDF Batch Merger & Exhibit Splitter'}
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-tertiary)', maxWidth: '780px' }}>
          {isPt
            ? 'Organize e junte múltiplos arquivos PDF e imagens (PNG, JPG) com divisores oficiais de Exhibit (A-D+). Os arquivos são mantidos apenas como referências na memória até a fusão final, garantindo velocidade máxima e privacidade total.'
            : 'Organize and merge multiple PDF files and images with official Exhibit dividers (A-D+). Files are kept in client-side memory with zero server uploads, delivering instant processing and total privacy.'}
        </p>
      </div>
    </div>
  );
};
