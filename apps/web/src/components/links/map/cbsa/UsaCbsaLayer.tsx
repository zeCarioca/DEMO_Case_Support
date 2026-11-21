import React from 'react';
import { CBSA_POLYGONS, CbsaPolygonFeature } from './cbsaPolygonData.js';

interface UsaCbsaLayerProps {
  activeCbsaCode: string | null | undefined;
  hoveredCbsaCode: string | null | undefined;
  onCbsaClick: (cbsa: CbsaPolygonFeature) => void;
  onCbsaMouseEnter: (cbsa: CbsaPolygonFeature, e: React.MouseEvent) => void;
  onCbsaMouseMove: (cbsa: CbsaPolygonFeature, e: React.MouseEvent) => void;
  onCbsaMouseLeave: () => void;
}

export const UsaCbsaLayer: React.FC<UsaCbsaLayerProps> = ({
  activeCbsaCode,
  hoveredCbsaCode,
  onCbsaClick,
  onCbsaMouseEnter,
  onCbsaMouseMove,
  onCbsaMouseLeave
}) => {
  const activeFeature = activeCbsaCode
    ? CBSA_POLYGONS.find((c) => c.code === activeCbsaCode)
    : undefined;

  const hoveredFeature = hoveredCbsaCode && hoveredCbsaCode !== activeCbsaCode
    ? CBSA_POLYGONS.find((c) => c.code === hoveredCbsaCode)
    : undefined;

  return (
    <g className="cbsa-msa-vector-layer">
      {/* 1. Base MSA Polygons */}
      {CBSA_POLYGONS.map((cbsa) => {
        const isActive = activeCbsaCode === cbsa.code;
        const isHovered = hoveredCbsaCode === cbsa.code;

        // Active and hovered items are rendered in an overlay pass for top z-index
        if (isActive || isHovered) return null;

        return (
          <path
            key={`cbsa-${cbsa.code}`}
            id={`cbsa-${cbsa.code}`}
            d={cbsa.path}
            fill="rgba(235, 94, 40, 0.05)"
            stroke="rgba(235, 94, 40, 0.32)"
            strokeWidth="0.7"
            strokeDasharray="2.5 1.5"
            style={{
              cursor: 'pointer',
              transition: 'fill 0.12s ease, stroke 0.12s ease'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onCbsaClick(cbsa);
            }}
            onMouseEnter={(e) => onCbsaMouseEnter(cbsa, e)}
            onMouseMove={(e) => onCbsaMouseMove(cbsa, e)}
            onMouseLeave={onCbsaMouseLeave}
          >
            <title>{`${cbsa.name} (CBSA ${cbsa.code})`}</title>
          </path>
        );
      })}

      {/* 2. Hovered Overlay (Elevated) */}
      {hoveredFeature && (
        <path
          id={`cbsa-hovered-${hoveredFeature.code}`}
          d={hoveredFeature.path}
          fill="rgba(235, 94, 40, 0.18)"
          stroke="var(--accent)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          style={{
            cursor: 'pointer',
            filter: 'drop-shadow(0 0 2px rgba(235, 94, 40, 0.4))',
            transition: 'all 0.12s ease'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onCbsaClick(hoveredFeature);
          }}
          onMouseMove={(e) => onCbsaMouseMove(hoveredFeature, e)}
          onMouseLeave={onCbsaMouseLeave}
        />
      )}

      {/* 3. Active / Selected Overlay (Top Z-Index) */}
      {activeFeature && (
        <path
          id={`cbsa-active-${activeFeature.code}`}
          d={activeFeature.path}
          fill="rgba(235, 94, 40, 0.28)"
          stroke="var(--accent)"
          strokeWidth="2.2"
          strokeLinejoin="round"
          style={{
            cursor: 'pointer',
            filter: 'drop-shadow(0 0 4px rgba(235, 94, 40, 0.75))',
            transition: 'all 0.15s ease'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onCbsaClick(activeFeature);
          }}
          onMouseMove={(e) => onCbsaMouseMove(activeFeature, e)}
          onMouseLeave={onCbsaMouseLeave}
        />
      )}
    </g>
  );
};
