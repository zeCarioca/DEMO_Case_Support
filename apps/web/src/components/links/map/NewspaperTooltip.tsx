import React from 'react';
import { Newspaper, MapPin } from 'lucide-react';
import { SundayNewspaperInfo } from './types.js';

interface NewspaperTooltipProps {
  newspaper: SundayNewspaperInfo;
  cityName?: string;
  x: number;
  y: number;
}

export const NewspaperTooltip: React.FC<NewspaperTooltipProps> = ({
  newspaper,
  cityName,
  x,
  y
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        left: x + 14,
        top: y - 28,
        pointerEvents: 'none',
        zIndex: 9999,
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-contrast)',
        padding: '0.65rem 0.85rem',
        minWidth: '240px',
        maxWidth: '330px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
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
              color: '#ffffff',
              backgroundColor: 'var(--accent)',
              padding: '0.1rem 0.35rem'
            }}
          >
            {newspaper.stateCode}
          </span>
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em'
            }}
          >
            {newspaper.stateName}
          </span>
          {cityName && (
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--accent-text)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem'
              }}
            >
              • <MapPin size={10} /> {cityName}
            </span>
          )}
        </div>

        <span
          style={{
            fontSize: '0.5625rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)'
          }}
        >
          {cityName ? 'Cidade' : 'Estado'}
        </span>
      </div>

      <div
        style={{
          fontSize: '0.8125rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          marginBottom: '0.2rem'
        }}
      >
        <Newspaper size={12} color="var(--accent)" />
        <span>{newspaper.name}</span>
      </div>

      <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
        AIE: {newspaper.metroArea} ({newspaper.primaryCity})
      </div>

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
        <span>Clique para fixar praça</span>
        <span style={{ fontFamily: 'var(--font-mono)' }}>20 CFR 656</span>
      </div>
    </div>
  );
};
