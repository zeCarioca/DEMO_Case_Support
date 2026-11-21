import React, { useState } from 'react';
import { ArrowLeft, FileText, Sparkles } from 'lucide-react';
import { CaseTemplateTab } from './types.js';
import { StandardTemplateTab } from './StandardTemplateTab.js';
import { InteractiveGeneratorTab } from './InteractiveGeneratorTab.js';
import { useLanguage } from '../../i18n/LanguageContext.js';

interface CaseTemplateViewProps {
  onBackToHub: () => void;
}

export const CaseTemplateView: React.FC<CaseTemplateViewProps> = ({ onBackToHub }) => {
  const [activeTab, setActiveTab] = useState<CaseTemplateTab>('generator');
  const { language, t } = useLanguage();
  const isPt = language === 'pt';

  return (
    <div
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '1.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}
    >
      {/* Navigation & Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onBackToHub}
            className="btn"
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              gap: '0.375rem',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={14} />
            {t('hub.back')}
          </button>

          <span style={{ color: 'var(--border)' }}>/</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} style={{ color: 'var(--accent)' }} />
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {isPt ? 'Gerador de Notas de Docketing (USPTO)' : 'Trademark Docketing Note Generator (USPTO)'}
            </h1>
          </div>
        </div>

        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '0.25rem 0.625rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}
        >
          <Sparkles size={13} style={{ color: 'var(--sticker-yellow-text)' }} />
          {isPt ? 'Padrão Apex IP' : 'Apex IP Standard'}
        </span>
      </div>

      {/* Sub-Tabs: Standard Template vs Interactive Generator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '0.75rem',
          flexWrap: 'wrap'
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('standard')}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            backgroundColor: activeTab === 'standard' ? 'var(--accent)' : 'transparent',
            color: activeTab === 'standard' ? '#ffffff' : 'var(--text-secondary)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          {isPt ? '01. Template Estático' : '01. Standard Template'}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('generator')}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            backgroundColor: activeTab === 'generator' ? 'var(--accent)' : 'transparent',
            color: activeTab === 'generator' ? '#ffffff' : 'var(--text-secondary)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          {isPt ? '02. Gerador Interativo' : '02. Interactive Generator'}
        </button>

        <span
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            padding: '0.2rem 0.5rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--sticker-yellow-bg)',
            color: 'var(--sticker-yellow-text)',
            border: '1px solid rgba(223, 171, 1, 0.25)'
          }}
        >
          {isPt ? 'Pronto para Docketing' : 'Ready for Docketing'}
        </span>
      </div>

      {/* Main Tab Content */}
      <main>
        {activeTab === 'standard' && <StandardTemplateTab />}
        {activeTab === 'generator' && <InteractiveGeneratorTab />}
      </main>
    </div>
  );
};
