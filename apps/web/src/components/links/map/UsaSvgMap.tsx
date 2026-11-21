import React from 'react';
import { US_STATE_PATHS } from './usaMapPaths.js';
import { STATE_LABEL_COORDS } from './usaStateLabelCoords.js';

interface UsaSvgMapProps {
  mode?: 'SWA';
  activeHighlightedState?: string | null;
  hoveredCode?: string | null;
  onStateMouseEnter: (code: string, e: React.MouseEvent) => void;
  onStateMouseMove: (code: string, e: React.MouseEvent) => void;
  onStateMouseLeave: () => void;
  onStateClick: (code: string) => void;
}

export const UsaSvgMap: React.FC<UsaSvgMapProps> = ({
  activeHighlightedState,
  hoveredCode,
  onStateMouseEnter,
  onStateMouseMove,
  onStateMouseLeave,
  onStateClick
}) => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'var(--bg-page)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <svg
        viewBox="0 0 959 593"
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '520px',
          display: 'block'
        }}
      >
        {/* State Vector Outlines */}
        {Object.entries(US_STATE_PATHS).map(([code, pathData]) => {
          const isHovered = hoveredCode === code;
          const isSelected = activeHighlightedState === code;

          let fillColor = 'var(--bg-subtle)';
          let strokeColor = 'var(--border)';
          let strokeWidth = 1;

          if (isSelected) {
            fillColor = 'var(--color-primary)';
            strokeColor = 'var(--color-primary-active, #005bab)';
            strokeWidth = 2;
          } else if (isHovered) {
            fillColor = 'var(--sticker-blue-bg)';
            strokeColor = 'var(--color-primary)';
            strokeWidth = 1.5;
          }

          return (
            <path
              key={code}
              id={`state-${code}`}
              d={pathData}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              style={{
                cursor: 'pointer',
                transition: 'fill 0.15s ease, stroke 0.15s ease, stroke-width 0.15s ease'
              }}
              onMouseEnter={(e) => onStateMouseEnter(code, e)}
              onMouseMove={(e) => onStateMouseMove(code, e)}
              onMouseLeave={onStateMouseLeave}
              onClick={() => onStateClick(code)}
            />
          );
        })}

        {/* State Acronym Labels Layer */}
        <g className="state-acronym-labels" style={{ pointerEvents: 'none' }}>
          {Object.entries(STATE_LABEL_COORDS).map(([code, coord]) => {
            const isSelected = activeHighlightedState === code;
            const isHovered = hoveredCode === code;

            const textColor = isSelected ? '#ffffff' : isHovered ? 'var(--color-primary)' : 'var(--text-secondary)';

            return (
              <text
                key={`label-${code}`}
                x={coord.x}
                y={coord.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={coord.fontSize || 10}
                fontFamily="var(--font-mono, monospace)"
                fontWeight={isSelected || isHovered ? 700 : 500}
                fill={textColor}
                opacity={0.9}
                style={{
                  pointerEvents: 'none',
                  userSelect: 'none',
                  transition: 'fill 0.12s ease',
                  letterSpacing: '0.02em'
                }}
              >
                {code}
              </text>
            );
          })}
        </g>
      </svg>

      {/* SWA Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.85rem',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.35rem 0.65rem',
          fontSize: '0.6875rem',
          fontFamily: 'var(--font-mono, monospace)',
          color: 'var(--text-tertiary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }} />
          <span>Estado Disponível</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--color-primary)' }} />
          <span>Estado Selecionado</span>
        </div>
      </div>
    </div>
  );
};
