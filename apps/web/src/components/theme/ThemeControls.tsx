import React from 'react';
import { Sun, Moon, Contrast } from 'lucide-react';
import { ThemeMode } from './types.js';

interface ThemeControlsProps {
  mode: ThemeMode;
  highContrast: boolean;
  onToggleMode: () => void;
  onToggleHighContrast: () => void;
}

export const ThemeControls: React.FC<ThemeControlsProps> = ({
  mode,
  highContrast,
  onToggleMode,
  onToggleHighContrast
}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.35rem',
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '0.25rem 0.45rem',
      boxShadow: 'var(--shadow-level-0)'
    }}>
      {/* Light / Dark Mode Toggle */}
      <button
        onClick={onToggleMode}
        title={mode === 'dark' ? 'Mudar para Modo Claro (Notion Daylight)' : 'Mudar para Modo Escuro (Notion Dark)'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '0.3rem',
          borderRadius: 'var(--radius-xs)',
          fontFamily: 'inherit',
          transition: 'background 0.15s ease'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        {mode === 'dark' ? (
          <Sun size={15} color="var(--text-secondary)" />
        ) : (
          <Moon size={15} color="var(--text-secondary)" />
        )}
      </button>

      {/* High Contrast Mode Toggle */}
      <button
        onClick={onToggleHighContrast}
        title={highContrast ? 'Desativar Alto Contraste' : 'Ativar Alto Contraste (leitura técnica)'}
        style={{
          display: 'flex',
          alignItems: 'center',
          background: highContrast ? 'var(--accent-ghost)' : 'transparent',
          border: highContrast ? '1px solid var(--accent-subtle)' : '1px solid transparent',
          color: highContrast ? 'var(--accent)' : 'var(--text-tertiary)',
          cursor: 'pointer',
          padding: '0.3rem',
          borderRadius: 'var(--radius-xs)',
          transition: 'background 0.15s ease'
        }}
        onMouseEnter={(e) => { if (!highContrast) e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'; }}
        onMouseLeave={(e) => { if (!highContrast) e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <Contrast size={14} />
      </button>
    </div>
  );
};
