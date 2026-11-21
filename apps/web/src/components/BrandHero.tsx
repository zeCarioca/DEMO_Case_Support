import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from './i18n/LanguageContext.js';

export const BrandHero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div
      style={{
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--bg-surface)',
        padding: '1.25rem 2rem'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '-0.5px',
              flexShrink: 0
            }}
          >
            A
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <h1
                style={{
                  margin: 0,
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  letterSpacing: '-0.5px',
                  color: 'var(--text-primary)',
                  lineHeight: 1.2
                }}
              >
                {t('brand.title')}
              </h1>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--accent)',
                  backgroundColor: 'var(--accent-ghost)',
                  border: '1px solid var(--accent-subtle)',
                  borderRadius: 'var(--radius-full)',
                  padding: '2px 8px'
                }}
              >
                {t('brand.badge')}
              </span>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  color: '#10b981',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: 'var(--radius-full)',
                  padding: '2px 8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <Sparkles size={11} />
                {t('brand.demoBadge')}
              </span>
            </div>
            <div
              style={{
                fontSize: '0.8125rem',
                color: 'var(--text-tertiary)',
                marginTop: '0.2rem'
              }}
            >
              {t('brand.tagline')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
