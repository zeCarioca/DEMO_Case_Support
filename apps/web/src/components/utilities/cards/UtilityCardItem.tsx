import React from 'react';
import { ArrowRight, Sparkles, Clock } from 'lucide-react';
import { UtilityCardMeta } from '../types.js';
import { BreatheDemoButton } from '../demo/BreatheDemoButton.js';
import { useLanguage } from '../../i18n/LanguageContext.js';

interface UtilityCardItemProps {
  card: UtilityCardMeta;
  icon: React.ReactNode;
  onOpen: (id: UtilityCardMeta['id']) => void;
  onRunDemo?: (id: UtilityCardMeta['id']) => void;
}

export const UtilityCardItem: React.FC<UtilityCardItemProps> = ({
  card,
  icon,
  onOpen,
  onRunDemo
}) => {
  const { language } = useLanguage();
  const isActive = card.status === 'active';
  const hasDemo = card.id === 'pdf-merger' || card.id === 'page-swapper';

  return (
    <div
      onClick={() => isActive && onOpen(card.id)}
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--bg-surface)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: isActive ? 'pointer' : 'default',
        opacity: isActive ? 1 : 0.72,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
        boxShadow: 'var(--shadow-level-1)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        if (isActive) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-level-2)';
          e.currentTarget.style.borderColor = 'var(--accent)';
        }
      }}
      onMouseLeave={(e) => {
        if (isActive) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-level-1)';
          e.currentTarget.style.borderColor = 'var(--border)';
        }
      }}
    >
      <div>
        {/* Top Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: isActive ? 'var(--bg-subtle)' : 'var(--bg-page)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isActive ? 'var(--accent)' : 'var(--text-tertiary)'
            }}
          >
            {icon}
          </div>

          <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
            {hasDemo && (
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  padding: '0.1875rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  color: '#059669',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <Sparkles size={10} />
                {language === 'pt' ? 'Demonstração Interativa' : 'Interactive Demo'}
              </span>
            )}
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                padding: '0.1875rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: isActive ? 'var(--sticker-green-bg)' : 'var(--bg-subtle)',
                color: isActive ? 'var(--sticker-green-text)' : 'var(--text-tertiary)'
              }}
            >
              {isActive ? (language === 'pt' ? 'Disponível' : 'Available') : (language === 'pt' ? 'Em breve' : 'Coming soon')}
            </span>
          </div>
        </div>

        {/* Title & Category */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-ghost)', letterSpacing: '0.5px' }}>
            {card.category}
          </span>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {card.title}
          </h3>
          <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            {card.subtitle}
          </p>
        </div>

        {/* Description */}
        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-tertiary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          {card.description}
        </p>
      </div>

      {/* Card Footer */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '0.875rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        <span style={{ fontSize: '0.75rem', color: 'var(--text-ghost)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          {isActive ? (
            <>
              <Clock size={12} />
              {card.estimatedTime || (language === 'pt' ? 'SLA Oficial' : 'Official SLA')}
            </>
          ) : (
            <>
              <Sparkles size={12} />
              {language === 'pt' ? 'Em desenvolvimento' : 'In development'}
            </>
          )}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {hasDemo && onRunDemo && (
            <BreatheDemoButton
              size="sm"
              onClick={() => onRunDemo(card.id)}
            />
          )}

          <button
            type="button"
            disabled={!isActive}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.375rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
              backgroundColor: isActive ? 'var(--accent)' : 'transparent',
              color: isActive ? '#ffffff' : 'var(--text-ghost)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: isActive ? 'pointer' : 'not-allowed',
              transition: 'opacity 0.15s ease'
            }}
          >
            {isActive ? (language === 'pt' ? 'Abrir Utilitário' : 'Open Utility') : (language === 'pt' ? 'Indisponível' : 'Unavailable')}
            {isActive && <ArrowRight size={13} />}
          </button>
        </div>
      </div>
    </div>
  );
};
