import React from 'react';
import { Terminal, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.js';

interface RecruiterTerminalLauncherProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const RecruiterTerminalLauncher: React.FC<RecruiterTerminalLauncherProps> = ({
  isOpen,
  onOpen
}) => {
  const { language } = useLanguage();
  const isPt = language === 'pt';

  if (isOpen) return null;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="btn-breathe-emerald"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 45,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.625rem 1rem',
        borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
        userSelect: 'none'
      }}
      title={isPt ? 'Abrir Guia Arquitetural do Recrutador' : 'Open Recruiter Architecture Guide'}
    >
      <Terminal size={14} style={{ color: '#10b981' }} />
      <span>{isPt ? '> GUIA DO RECRUTADOR' : '> RECRUITER_GUIDE'}</span>
      <Sparkles size={12} style={{ color: '#34d399' }} />
    </button>
  );
};
