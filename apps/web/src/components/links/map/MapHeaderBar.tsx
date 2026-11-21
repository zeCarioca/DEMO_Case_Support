import React from 'react';
import { MapMode } from './types.js';
import { MapModeSelector } from './MapModeSelector.js';

interface MapHeaderBarProps {
  mode: MapMode;
  onModeChange: (mode: MapMode) => void;
  showMetropolisRadius?: boolean;
  onToggleMetropolisRadius?: () => void;
}

export const MapHeaderBar: React.FC<MapHeaderBarProps> = ({
  mode,
  onModeChange,
  showMetropolisRadius = true,
  onToggleMetropolisRadius
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '1.25rem',
        marginBottom: '1.25rem'
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              backgroundColor: 'var(--sticker-blue-bg)',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border)',
              padding: '0.15rem 0.55rem'
            }}
          >
            06.1 Geoespacial
          </span>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>•</span>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
            {mode === 'SWA' ? '50 Estados & Agências SWA' : 'Hierarquia DOL PERM (2-Tier Engine)'}
          </span>
        </div>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0.2rem 0' }}>
          {mode === 'SWA' ? 'Mapa Interativo SWA (Job Orders Estaduais)' : 'Resolução PERM: Fronteira CBSA & Exceção Rural'}
        </h2>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.2rem', maxWidth: '680px' }}>
          {mode === 'SWA'
            ? 'Passe o mouse sobre qualquer estado para visualizar o portal oficial de emprego e clique para fixar detalhes de protocolo.'
            : 'Motor hierárquico em conformidade com 20 CFR § 656.3 e § 656.17(e). Precedência de fronteira CBSA / MSA e busca radial para condados rurais.'}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        {mode === 'NEWSPAPER' && onToggleMetropolisRadius && (
          <button
            type="button"
            onClick={onToggleMetropolisRadius}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: showMetropolisRadius ? 'var(--color-primary)' : 'var(--bg-subtle)',
              color: showMetropolisRadius ? '#ffffff' : 'var(--text-secondary)',
              border: showMetropolisRadius ? '1px solid var(--color-primary)' : '1px solid var(--border)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.4rem 0.85rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title="Alternar exibição do raio de 50 milhas das metrópoles (20 CFR § 656.3)"
          >
            <span>⊙</span>
            <span>Raio Metrópole (50 mi)</span>
          </button>
        )}
        <MapModeSelector mode={mode} onModeChange={onModeChange} />
      </div>
    </div>
  );
};
