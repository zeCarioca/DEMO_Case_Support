import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from './LanguageContext.js';

export const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      title={t('nav.langToggle')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '0.28rem 0.55rem',
        cursor: 'pointer',
        color: 'var(--text-secondary)',
        fontFamily: 'inherit',
        fontSize: '0.75rem',
        fontWeight: 600,
        boxShadow: 'var(--shadow-level-0)',
        transition: 'all 0.15s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
        e.currentTarget.style.color = 'var(--text-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
        e.currentTarget.style.color = 'var(--text-secondary)';
      }}
    >
      <Languages size={14} color="var(--accent)" />
      <span style={{ letterSpacing: '0.04em' }}>{language.toUpperCase()}</span>
    </button>
  );
};
