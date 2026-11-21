import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import { StateSwaInfo } from './types.js';

interface StateTooltipProps {
  state: StateSwaInfo;
  x: number;
  y: number;
}

export const StateTooltip: React.FC<StateTooltipProps> = ({ state, x, y }) => {
  return (
    <div
      style={{
        position: 'fixed',
        left: x + 14,
        top: y - 28,
        pointerEvents: 'none',
        zIndex: 9999,
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '0.65rem 0.85rem',
        minWidth: '220px',
        maxWidth: '300px',
        boxShadow: 'var(--shadow-level-2)',
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
              backgroundColor: 'var(--sticker-blue-bg)',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border)',
              padding: '0.1rem 0.4rem'
            }}
          >
            {state.code}
          </span>
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em'
            }}
          >
            {state.name}
          </span>
        </div>

        <span
          style={{
            fontSize: '0.5625rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)'
          }}
        >
          SWA Portal
        </span>
      </div>

      <div
        style={{
          fontSize: '0.75rem',
          fontWeight: 500,
          color: 'var(--text-primary)',
          marginBottom: '0.25rem'
        }}
      >
        {state.portalName}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: 'var(--color-primary)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        <Globe size={11} />
        <span>{state.displayUrl}</span>
      </div>

      {state.systemNote && (
        <div
          style={{
            marginTop: '0.35rem',
            paddingTop: '0.35rem',
            borderTop: '1px solid var(--border)',
            fontSize: '0.625rem',
            color: 'var(--text-tertiary)',
            fontStyle: 'italic'
          }}
        >
          • {state.systemNote}
        </div>
      )}

      <div
        style={{
          marginTop: '0.4rem',
          paddingTop: '0.35rem',
          borderTop: '1px solid var(--border)',
          fontSize: '0.5625rem',
          color: 'var(--text-tertiary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span>Clique para fixar detalhes</span>
        <ExternalLink size={10} />
      </div>
    </div>
  );
};
