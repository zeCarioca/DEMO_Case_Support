import React, { useState } from 'react';
import { USA_SWA_STATES } from './usaSwaData.js';
import { HoveredStateCoord, StateSwaInfo } from './types.js';
import { StateTooltip } from './StateTooltip.js';
import { SelectedStateCard } from './SelectedStateCard.js';
import { SwaToolbar } from './SwaToolbar.js';
import { UsaSvgMap } from './UsaSvgMap.js';

export const UsaInteractiveMap: React.FC = () => {
  const [hovered, setHovered] = useState<HoveredStateCoord | null>(null);
  const [selectedSwa, setSelectedSwa] = useState<StateSwaInfo | null>(null);
  const [swaDropdown, setSwaDropdown] = useState<string>('');

  const handleStateMouseEnter = (code: string, e: React.MouseEvent) => {
    const swaInfo = USA_SWA_STATES[code];
    setHovered({
      code,
      name: swaInfo?.name || code,
      swa: swaInfo,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleStateClick = (code: string) => {
    const swaInfo = USA_SWA_STATES[code];
    if (swaInfo) {
      setSelectedSwa(swaInfo);
      setSwaDropdown(code);
    }
  };

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-level-1)'
      }}
    >
      {/* SWA Map Header */}
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
              Recrutamento PERM • SWA Job Order
            </span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>•</span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
              50 Estados & Agências Estaduais de Emprego
            </span>
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0.2rem 0' }}>
            Mapa Interativo SWA (Job Orders Estaduais)
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.2rem', maxWidth: '680px' }}>
            Passe o mouse sobre qualquer estado para visualizar a agência responsável e clique para abrir os links diretos de publicação de Job Order sob 20 CFR § 656.17(e)(1)(i)(A).
          </p>
        </div>

        <SwaToolbar
          swaDropdown={swaDropdown}
          selectedSwa={selectedSwa}
          onSelectSwa={(code) => {
            setSwaDropdown(code);
            setSelectedSwa(code ? USA_SWA_STATES[code] || null : null);
          }}
          onClearSwa={() => {
            setSelectedSwa(null);
            setSwaDropdown('');
          }}
        />
      </div>

      {/* SVG Map of the 50 States */}
      <UsaSvgMap
        mode="SWA"
        activeHighlightedState={selectedSwa?.code}
        hoveredCode={hovered?.code}
        onStateMouseEnter={handleStateMouseEnter}
        onStateMouseMove={(code, e) => {
          if (hovered && hovered.code === code) {
            setHovered({ ...hovered, x: e.clientX, y: e.clientY });
          }
        }}
        onStateMouseLeave={() => setHovered(null)}
        onStateClick={handleStateClick}
      />

      {/* Tooltip on Hover */}
      {hovered && hovered.swa && (
        <StateTooltip state={hovered.swa} x={hovered.x} y={hovered.y} />
      )}

      {/* Selected SWA Card on Click */}
      {selectedSwa && (
        <SelectedStateCard state={selectedSwa} onClose={() => setSelectedSwa(null)} />
      )}
    </section>
  );
};
