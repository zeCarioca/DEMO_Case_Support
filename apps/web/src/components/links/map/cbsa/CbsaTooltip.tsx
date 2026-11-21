import React from 'react';
import { Layers, Newspaper, ShieldCheck } from 'lucide-react';
import { CbsaPolygonFeature } from './cbsaTypes.js';
import { SundayNewspaperInfo } from '../types.js';

interface CbsaTooltipProps {
  cbsa: CbsaPolygonFeature;
  recommendedPaper?: SundayNewspaperInfo;
  x: number;
  y: number;
}

export const CbsaTooltip: React.FC<CbsaTooltipProps> = ({
  cbsa,
  recommendedPaper,
  x,
  y
}) => {
  const isInterstate = cbsa.states.length > 1;

  return (
    <div
      style={{
        position: 'fixed',
        left: x + 16,
        top: y - 24,
        pointerEvents: 'none',
        zIndex: 9999,
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-contrast)',
        padding: '0.75rem 0.95rem',
        minWidth: '260px',
        maxWidth: '360px',
        boxShadow: '0 8px 28px rgba(0, 0, 0, 0.45)',
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      {/* Header: CBSA Code + Tier 1 Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              fontWeight: 700,
              color: '#ffffff',
              backgroundColor: 'var(--accent)',
              padding: '0.12rem 0.4rem',
              letterSpacing: '0.04em'
            }}
          >
            CBSA {cbsa.code}
          </span>
          <span
            style={{
              fontSize: '0.625rem',
              fontWeight: 600,
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem'
            }}
          >
            <ShieldCheck size={11} /> Tier 1 PERM
          </span>
        </div>

        {isInterstate && (
          <span
            style={{
              fontSize: '0.5625rem',
              fontFamily: 'var(--font-mono)',
              backgroundColor: 'rgba(235, 94, 40, 0.12)',
              color: 'var(--accent)',
              padding: '0.1rem 0.35rem',
              border: '1px solid rgba(235, 94, 40, 0.3)'
            }}
          >
            Interestadual
          </span>
        )}
      </div>

      {/* Official Census Title */}
      <div
        style={{
          fontSize: '0.875rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.015em',
          lineHeight: 1.25,
          marginBottom: '0.35rem'
        }}
      >
        {cbsa.name}
      </div>

      {/* DOL PERM Legal Notice */}
      <div
        style={{
          fontSize: '0.6875rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.35rem',
          marginBottom: '0.5rem',
          lineHeight: 1.3
        }}
      >
        <Layers size={11} style={{ marginTop: '2px', flexShrink: 0, color: 'var(--accent)' }} />
        <span>
          Área de Emprego Pretendida unificada (20 CFR § 656.3). Fronteiras estaduais não fracionam este CBSA.
        </span>
      </div>

      {/* Recommended Sunday Newspaper */}
      {recommendedPaper ? (
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '0.45rem',
            marginTop: '0.25rem'
          }}
        >
          <div
            style={{
              fontSize: '0.625rem',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              marginBottom: '0.2rem'
            }}
          >
            Jornal Dominical PERM Recomendado
          </div>
          <div
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Newspaper size={12} color="var(--accent)" />
            <span>{recommendedPaper.name}</span>
          </div>
          {recommendedPaper.estimatedSundayCirculation && (
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
              Tiragem: {recommendedPaper.estimatedSundayCirculation}
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '0.35rem',
            fontSize: '0.6875rem',
            color: 'var(--text-tertiary)',
            fontStyle: 'italic'
          }}
        >
          Clique para resolver jornal e auditar conformidade PERM
        </div>
      )}
    </div>
  );
};
