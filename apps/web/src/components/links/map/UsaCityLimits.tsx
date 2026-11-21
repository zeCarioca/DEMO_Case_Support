import React from 'react';
import { CITY_LIMIT_DIVIDING_LINES, CITY_LIMIT_ZONES } from './cityLimitsData.js';
import { NewspaperCityMarker } from './types.js';
import { NEWSPAPER_CITY_MARKERS } from './newspaperCityCoords.js';

interface UsaCityLimitsProps {
  activeStateCode: string | null | undefined;
  activeCityId: string | null | undefined;
  hoveredCityId: string | null | undefined;
  onCityClick: (marker: NewspaperCityMarker) => void;
  onCityMouseEnter: (marker: NewspaperCityMarker, e: React.MouseEvent) => void;
  onCityMouseMove: (marker: NewspaperCityMarker, e: React.MouseEvent) => void;
  onCityMouseLeave: () => void;
}

export const UsaCityLimits: React.FC<UsaCityLimitsProps> = ({
  activeStateCode,
  activeCityId,
  hoveredCityId,
  onCityClick,
  onCityMouseEnter,
  onCityMouseMove,
  onCityMouseLeave
}) => {
  return (
    <g className="city-limits-division-layer">
      {/* 1. City Limit Municipal Boundary Zones */}
      {CITY_LIMIT_ZONES.map((zone) => {
        const isSelectedState = activeStateCode === zone.stateCode;
        const isActiveCity = activeCityId === zone.id;
        const isHovered = hoveredCityId === zone.id;

        // If a state is selected, only focus on its city limits or highlight them
        const isVisible = !activeStateCode || isSelectedState;
        if (!isVisible) return null;

        const marker = NEWSPAPER_CITY_MARKERS.find((m) => m.id === zone.id);
        if (!marker) return null;

        const fillColor = isActiveCity
          ? 'rgba(235, 94, 40, 0.22)'
          : isHovered
          ? 'rgba(235, 94, 40, 0.14)'
          : isSelectedState
          ? 'rgba(255, 255, 255, 0.05)'
          : 'transparent';

        const strokeColor = isActiveCity
          ? 'var(--accent)'
          : isHovered
          ? 'var(--accent)'
          : isSelectedState
          ? 'var(--border-contrast)'
          : 'var(--border)';

        return (
          <path
            key={`city-limit-zone-${zone.id}`}
            id={`city-limit-${zone.id}`}
            d={zone.path}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={isActiveCity || isHovered ? 1.5 : 0.8}
            strokeDasharray={isActiveCity ? undefined : '3 2'}
            style={{
              cursor: 'pointer',
              transition: 'all 0.12s ease'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onCityClick(marker);
            }}
            onMouseEnter={(e) => onCityMouseEnter(marker, e)}
            onMouseMove={(e) => onCityMouseMove(marker, e)}
            onMouseLeave={onCityMouseLeave}
          >
            <title>{`${zone.city} City Limits (${zone.stateCode})`}</title>
          </path>
        );
      })}

      {/* 2. Boundary Dividing Lines separating city limits */}
      {CITY_LIMIT_DIVIDING_LINES.map((line) => {
        const isSelectedState = activeStateCode === line.stateCode;
        const isVisible = !activeStateCode || isSelectedState;
        if (!isVisible) return null;

        return (
          <path
            key={`div-line-${line.id}`}
            d={line.d}
            fill="none"
            stroke={isSelectedState ? 'var(--accent)' : 'var(--text-tertiary)'}
            strokeWidth={isSelectedState ? 1.4 : 1.0}
            strokeDasharray="4 3"
            opacity={isSelectedState ? 0.85 : 0.45}
            style={{ pointerEvents: 'none', transition: 'stroke 0.15s ease' }}
          />
        );
      })}
    </g>
  );
};
