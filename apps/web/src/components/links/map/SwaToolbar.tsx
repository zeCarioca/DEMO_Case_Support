import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { ALL_SWA_LIST } from './usaSwaData.js';
import { StateSwaInfo } from './types.js';

interface SwaToolbarProps {
  swaDropdown: string;
  selectedSwa: StateSwaInfo | null;
  onSelectSwa: (code: string) => void;
  onClearSwa: () => void;
}

export const SwaToolbar: React.FC<SwaToolbarProps> = ({
  swaDropdown,
  selectedSwa,
  onSelectSwa,
  onClearSwa
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: 'var(--bg-page)',
          border: '1px solid var(--border)',
          padding: '0.35rem 0.65rem'
        }}
      >
        <Search size={13} color="var(--text-tertiary)" />
        <select
          value={swaDropdown}
          onChange={(e) => onSelectSwa(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '0.8125rem',
            fontFamily: 'inherit',
            cursor: 'pointer'
          }}
        >
          <option value="" style={{ background: '#1c1917', color: '#fafaf9' }}>
            Selecionar Estado (50 estados)...
          </option>
          {ALL_SWA_LIST.map((s) => (
            <option key={s.code} value={s.code} style={{ background: '#1c1917', color: '#fafaf9' }}>
              {s.name} ({s.code}) — {s.portalName}
            </option>
          ))}
        </select>
      </div>

      {selectedSwa && (
        <button
          onClick={onClearSwa}
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            padding: '0.35rem 0.6rem',
            color: 'var(--text-secondary)',
            fontSize: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <RotateCcw size={12} />
          <span>Limpar</span>
        </button>
      )}
    </div>
  );
};
