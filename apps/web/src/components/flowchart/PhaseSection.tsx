import React from 'react';

interface PhaseSectionProps {
  title: string;
  subtitle: string;
  isActive: boolean;
  isDimmed: boolean;
  activeStepLabel?: string;
  children: React.ReactNode;
}

export const PhaseSection: React.FC<PhaseSectionProps> = ({
  title,
  subtitle,
  isActive,
  isDimmed,
  activeStepLabel,
  children
}) => {
  return (
    <div
      style={{
        marginBottom: '2rem',
        padding: '1.25rem',
        backgroundColor: isActive ? 'var(--accent-ghost)' : 'transparent',
        border: isActive ? '1px solid var(--accent-subtle)' : '1px solid transparent',
        borderLeft: isActive ? '4px solid var(--accent)' : '4px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        opacity: isDimmed ? 0.45 : 1,
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1rem',
          borderBottom: isActive ? '1px solid var(--accent-subtle)' : '1px solid var(--border)',
          paddingBottom: '0.625rem',
          transition: 'all 0.2s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '-0.2px',
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              transition: 'color 0.2s ease'
            }}
          >
            {title}
          </span>
          {isActive && (
            <span
              className="badge badge-accent"
              style={{
                fontSize: '0.6875rem',
                padding: '0.15rem 0.55rem'
              }}
            >
              Fase Ativa
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isActive && activeStepLabel && (
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--accent)',
                fontWeight: 500
              }}
            >
              {activeStepLabel}
            </span>
          )}
          <span
            style={{
              fontSize: '0.75rem',
              color: isActive ? 'var(--text-secondary)' : 'var(--text-tertiary)'
            }}
            className="tabular"
          >
            {subtitle}
          </span>
        </div>
      </div>

      {children}
    </div>
  );
};
