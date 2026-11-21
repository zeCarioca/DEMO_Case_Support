import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.js';

interface BreatheDemoButtonProps {
  onClick: (e: React.MouseEvent) => void;
  isLoading?: boolean;
  label?: string;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

export const BreatheDemoButton: React.FC<BreatheDemoButtonProps> = ({
  onClick,
  isLoading = false,
  label,
  size = 'md',
  style
}) => {
  const { language } = useLanguage();
  const defaultLabel = language === 'pt' ? 'Executar demonstração' : 'Run demonstration';

  const isSmall = size === 'sm';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (!isLoading) {
          onClick(e);
        }
      }}
      disabled={isLoading}
      className="btn-breathe-emerald"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isSmall ? '0.35rem' : '0.45rem',
        padding: isSmall ? '0.35rem 0.65rem' : '0.45rem 0.95rem',
        fontSize: isSmall ? '0.75rem' : '0.8125rem',
        fontWeight: 600,
        borderRadius: 'var(--radius-full)',
        cursor: isLoading ? 'wait' : 'pointer',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        ...style
      }}
      title={
        language === 'pt'
          ? 'Carregar documentos USPTO realistas para demonstração imediata'
          : 'Load realistic USPTO documents for instant demonstration'
      }
    >
      {isLoading ? (
        <Loader2 size={isSmall ? 12 : 14} className="animate-spin" />
      ) : (
        <Sparkles size={isSmall ? 12 : 14} style={{ flexShrink: 0 }} />
      )}
      <span>{label || defaultLabel}</span>
    </button>
  );
};
