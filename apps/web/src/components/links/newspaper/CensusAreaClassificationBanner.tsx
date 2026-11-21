import React from 'react';
import { Building2, Trees } from 'lucide-react';
import { WorksiteLocation } from '@case-support/shared-types';

interface CensusAreaClassificationBannerProps {
  worksite: WorksiteLocation;
}

export const CensusAreaClassificationBanner: React.FC<CensusAreaClassificationBannerProps> = ({
  worksite
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        backgroundColor: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '0.85rem 1.1rem',
        marginBottom: '1rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        {worksite.area_type === 'METROPOLITAN' ? (
          <Building2 size={18} color="var(--color-primary)" />
        ) : worksite.area_type === 'MICROPOLITAN' ? (
          <Building2 size={18} color="var(--accent-purple, #9c27b0)" />
        ) : (
          <Trees size={18} color="var(--color-warning, #dd5b00)" />
        )}
        <div>
          <div
            style={{
              fontSize: '0.6875rem',
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              fontWeight: 600
            }}
          >
            Área Estatística Censitária (U.S. Census Bureau)
          </div>
          <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {worksite.cbsa_name || 'Região Não-Metropolitana / Condado Rural'}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        {worksite.cbsa_code && (
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              fontFamily: 'var(--font-mono, monospace)',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)'
            }}
          >
            CBSA: {worksite.cbsa_code} ({worksite.lsad_code || 'M1'})
          </span>
        )}
        {worksite.is_po_box_fallback && (
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'rgba(221, 91, 0, 0.1)',
              border: '1px solid rgba(221, 91, 0, 0.3)',
              color: 'var(--color-warning, #dd5b00)'
            }}
          >
            PO Box ➔ ZCTA Físico {worksite.resolved_zip}
          </span>
        )}
      </div>
    </div>
  );
};
