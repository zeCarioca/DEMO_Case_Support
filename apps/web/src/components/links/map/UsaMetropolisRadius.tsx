import React from 'react';
import { NewspaperCityMarker } from './types.js';
import { NEWSPAPER_CITY_MARKERS } from './newspaperCityCoords.js';

interface UsaMetropolisRadiusProps {
  activeCityId: string | null | undefined;
  hoveredCityId: string | null | undefined;
  showAllRadii?: boolean;
}

// Major Metropolises with defined commuting radius (in map px, roughly 50 miles)
const METROPOLIS_RADII_MAP: Record<string, number> = {
  'nyc-ny': 36,
  'la-ca': 38,
  'chicago-il': 34,
  'dallas-tx': 34,
  'ft-worth-tx': 30,
  'houston-tx': 34,
  'atlanta-ga': 32,
  'dc-dmv': 32,
  'miami-fl': 30,
  'sf-ca': 32,
  'sj-ca': 28,
  'seattle-wa': 30,
  'boston-ma': 30,
  'philly-pa': 32,
  'phoenix-az': 30,
  'denver-co': 30,
  'detroit-mi': 28,
  'minneapolis-mn': 28
};

export const UsaMetropolisRadius: React.FC<UsaMetropolisRadiusProps> = ({
  activeCityId,
  hoveredCityId,
  showAllRadii = true
}) => {
  return (
    <g className="metropolis-radius-layer" style={{ pointerEvents: 'none' }}>
      {NEWSPAPER_CITY_MARKERS.map((marker) => {
        const radius = METROPOLIS_RADII_MAP[marker.id] || 28;
        const isMetropolis = Boolean(METROPOLIS_RADII_MAP[marker.id]);
        const isActive = activeCityId === marker.id;
        const isHovered = hoveredCityId === marker.id;

        // Render if active, hovered, or if showAllRadii is enabled for major metropolises
        if (!isActive && !isHovered && (!showAllRadii || !isMetropolis)) {
          return null;
        }

        const strokeColor = isActive
          ? 'var(--accent)'
          : isHovered
          ? 'var(--accent)'
          : 'var(--text-tertiary)';

        const fillColor = isActive
          ? 'rgba(235, 94, 40, 0.12)'
          : isHovered
          ? 'rgba(235, 94, 40, 0.08)'
          : 'rgba(255, 255, 255, 0.02)';

        return (
          <g key={`metro-radius-${marker.id}`} id={`metro-radius-${marker.id}`}>
            {/* Shaded Commuting Area Circle */}
            <circle
              cx={marker.x}
              cy={marker.y}
              r={radius}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={isActive ? 1.5 : isHovered ? 1.2 : 0.8}
              strokeDasharray={isActive ? '4 3' : '3 3'}
              opacity={isActive ? 0.95 : isHovered ? 0.85 : 0.35}
              style={{ transition: 'all 0.15s ease' }}
            />

            {/* Active Ripple Animation on Selected Metropolis */}
            {isActive && (
              <circle
                cx={marker.x}
                cy={marker.y}
                r={radius}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.2"
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  values={`${radius - 2};${radius + 6};${radius - 2}`}
                  dur="3s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0.1;0.6"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Radius Badge / Indicator for Active or Hovered Metropolis */}
            {(isActive || isHovered) && (
              <g transform={`translate(${marker.x + radius - 4}, ${marker.y - radius + 8})`}>
                <rect
                  x="-2"
                  y="-8"
                  width="36"
                  height="12"
                  fill="var(--bg-surface)"
                  stroke="var(--accent)"
                  strokeWidth="0.8"
                  rx="2"
                />
                <text
                  x="16"
                  y="-1"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="6.5"
                  fontFamily="var(--font-mono)"
                  fontWeight="700"
                  fill="var(--accent-text)"
                >
                  50 mi
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};
