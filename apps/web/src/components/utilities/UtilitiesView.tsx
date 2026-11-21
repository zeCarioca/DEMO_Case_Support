import React, { useState } from 'react';
import { Wrench, Sparkles } from 'lucide-react';
import { UtilityId } from './types.js';
import { UtilityCardGrid } from './cards/UtilityCardGrid.js';
import { FormsTranslationsView } from './forms-translations/FormsTranslationsView.js';
import { PoliciesView } from './policies/PoliciesView.js';
import { TextSplitterView } from './text-splitter/TextSplitterView.js';
import { CaseTemplateView } from './case-template/CaseTemplateView.js';
import { PdfMergerView } from './pdf-merger/PdfMergerView.js';
import { PageSwapperView } from './page-swapper/PageSwapperView.js';
import { useLanguage } from '../i18n/LanguageContext.js';

export const UtilitiesView: React.FC = () => {
  const [selectedUtility, setSelectedUtility] = useState<UtilityId | null>(null);
  const [autoRunDemo, setAutoRunDemo] = useState<boolean>(false);
  const { t } = useLanguage();

  const handleBackToHub = () => {
    setSelectedUtility(null);
    setAutoRunDemo(false);
  };

  const handleLaunchDemo = (id: UtilityId) => {
    setAutoRunDemo(true);
    setSelectedUtility(id);
  };

  if (selectedUtility === 'pdf-merger') {
    return (
      <PdfMergerView
        onBackToHub={handleBackToHub}
        initialDemo={autoRunDemo}
      />
    );
  }

  if (selectedUtility === 'page-swapper') {
    return (
      <PageSwapperView
        onBackToHub={handleBackToHub}
        initialDemo={autoRunDemo}
      />
    );
  }

  if (selectedUtility === 'case-description-template') {
    return <CaseTemplateView onBackToHub={handleBackToHub} />;
  }

  if (selectedUtility === 'text-splitter') {
    return <TextSplitterView onBackToHub={handleBackToHub} />;
  }

  if (selectedUtility === 'forms-translations') {
    return <FormsTranslationsView onBackToHub={handleBackToHub} />;
  }

  if (selectedUtility === 'policies-procedures') {
    return <PoliciesView onBackToHub={handleBackToHub} />;
  }

  return (
    <div
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}
    >
      {/* Hub Hero Header */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          paddingBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
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
              <Wrench size={18} />
            </div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t('hub.title')}
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-tertiary)', maxWidth: '640px' }}>
            {t('hub.subtitle')}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
            {t('hub.badgeActive')}
          </span>
        </div>
      </div>

      {/* Grid of Utility Cards */}
      <UtilityCardGrid
        onSelectUtility={(id) => {
          setAutoRunDemo(false);
          setSelectedUtility(id);
        }}
        onRunDemo={handleLaunchDemo}
      />
    </div>
  );
};
