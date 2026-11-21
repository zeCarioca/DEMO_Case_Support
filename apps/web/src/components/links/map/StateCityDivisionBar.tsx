import React from 'react';
import { MapPin, Building2, ChevronRight } from 'lucide-react';
import { SundayNewspaperInfo } from './types.js';

interface StateCityDivisionBarProps {
  stateCode: string;
  stateName: string;
  papersInState: SundayNewspaperInfo[];
  selectedPaperId: string | null | undefined;
  onSelectPaper: (paper: SundayNewspaperInfo) => void;
}

export const StateCityDivisionBar: React.FC<StateCityDivisionBarProps> = ({
  stateCode,
  stateName,
  papersInState,
  selectedPaperId,
  onSelectPaper
}) => {
  if (papersInState.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-page)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--accent)',
        padding: '0.65rem 0.85rem',
        marginTop: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.6rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Building2 size={13} color="var(--accent)" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--text-primary)'
            }}
          >
            Divisão por Cidades ({stateCode} — {stateName}):
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
          {papersInState.map((paper) => {
            const isSelected = selectedPaperId === paper.id;
            return (
              <button
                key={paper.id}
                type="button"
                onClick={() => onSelectPaper(paper)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  backgroundColor: isSelected ? 'var(--accent)' : 'var(--bg-subtle)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
                  padding: '0.25rem 0.6rem',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 600 : 400,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.12s ease'
                }}
              >
                <MapPin size={11} color={isSelected ? '#ffffff' : 'var(--text-tertiary)'} />
                <span>{paper.primaryCity}</span>
                <span style={{ fontSize: '0.625rem', opacity: isSelected ? 0.9 : 0.65, fontFamily: 'var(--font-mono)' }}>
                  ({paper.name})
                </span>
                {isSelected && <ChevronRight size={11} />}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
        {papersInState.length} {papersInState.length === 1 ? 'praça' : 'praças'} dominicais
      </div>
    </div>
  );
};
