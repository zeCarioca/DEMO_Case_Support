import React from 'react';
import { NewspaperCityMarker } from './types.js';
import { NEWSPAPER_CITY_MARKERS } from './newspaperCityCoords.js';

interface UsaCityMarkersProps {
  activeStateCode: string | null | undefined;
  activeCityId: string | null | undefined;
  hoveredCityId: string | null | undefined;
  onCityClick: (marker: NewspaperCityMarker) => void;
  onCityMouseEnter: (marker: NewspaperCityMarker, e: React.MouseEvent) => void;
  onCityMouseMove: (marker: NewspaperCityMarker, e: React.MouseEvent) => void;
  onCityMouseLeave: () => void;
}

export const UsaCityMarkers: React.FC<UsaCityMarkersProps> = ({
  activeStateCode,
  activeCityId,
  hoveredCityId,
  onCityClick,
  onCityMouseEnter,
  onCityMouseMove,
  onCityMouseLeave
}) => {
  return (
    <g className="newspaper-city-subdivisions">
      {NEWSPAPER_CITY_MARKERS.map((marker) => {
        const isSelectedState = activeStateCode === marker.stateCode;
        const isActiveCity = activeCityId === marker.id;
        const isHovered = hoveredCityId === marker.id;

        // Visual prominence: if a state is selected, prioritize cities of that state
        let opacity = 0.85;
        if (activeStateCode && !isSelectedState) {
          opacity = 0.35;
        }

        const markerColor = isActiveCity || isHovered
          ? '#ffffff'
          : isSelectedState
          ? 'var(--accent)'
          : 'var(--text-secondary)';

        return (
          <g
            key={marker.id}
            id={`city-marker-${marker.id}`}
            opacity={opacity}
            style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
            onClick={(e) => {
              e.stopPropagation();
              onCityClick(marker);
            }}
            onMouseEnter={(e) => onCityMouseEnter(marker, e)}
            onMouseMove={(e) => onCityMouseMove(marker, e)}
            onMouseLeave={onCityMouseLeave}
          >
            {/* Outer halo / pulse for active city */}
            {isActiveCity && (
              <circle
                cx={marker.x}
                cy={marker.y}
                r="9"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                opacity="0.8"
              >
                <animate
                  attributeName="r"
                  values="6;12;6"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.9;0.2;0.9"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Hover halo ring */}
            {isHovered && !isActiveCity && (
              <circle
                cx={marker.x}
                cy={marker.y}
                r="7"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.2"
                opacity="0.75"
              />
            )}

            {/* Capital / City Dot */}
            <circle
              cx={marker.x}
              cy={marker.y}
              r={isActiveCity ? 5.0 : isHovered ? 4.5 : isSelectedState ? 3.8 : 3.0}
              fill={isActiveCity ? 'var(--accent)' : isHovered ? '#ffffff' : markerColor}
              stroke="var(--bg-page)"
              strokeWidth={isActiveCity || isHovered ? 1.5 : 1.0}
            />
          </g>
        );
      })}
    </g>
  );
};
