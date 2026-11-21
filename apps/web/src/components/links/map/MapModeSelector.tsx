import React from 'react';
import { Layers, Newspaper, Landmark } from 'lucide-react';
import { MapMode } from './types.js';

interface MapModeSelectorProps {
  mode: MapMode;
  onModeChange: (newMode: MapMode) => void;
}

export const MapModeSelector: React.FC<MapModeSelectorProps> = ({ mode, onModeChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-pill)',
          padding: '0.35rem 0.75rem',
          boxShadow: 'var(--shadow-level-1)'
        }}
      >
        <Layers size={13} color="var(--text-tertiary)" />
        <label
          htmlFor="map-mode-select"
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--text-tertiary)',
            marginRight: '0.2rem'
          }}
        >
          Camada:
        </label>
        <select
          id="map-mode-select"
          value={mode}
          onChange={(e) => onModeChange(e.target.value as MapMode)}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            fontFamily: 'inherit',
            cursor: 'pointer'
          }}
        >
          <option value="SWA">
            Agências SWA (State Workforce Agency)
          </option>
          <option value="NEWSPAPER">
            Jornais de Domingo (PERM Sunday Newspaper)
          </option>
        </select>
      </div>

      {/* Quick visual toggle pills */}
      <div
        style={{
          display: 'inline-flex',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-pill)',
          padding: '3px',
          boxShadow: 'var(--shadow-level-1)'
        }}
      >
        <button
          onClick={() => onModeChange('SWA')}
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.3rem 0.75rem',
            fontSize: '0.75rem',
            border: 'none',
            borderRadius: 'var(--radius-pill)',
            cursor: 'pointer',
            backgroundColor: mode === 'SWA' ? 'var(--color-primary)' : 'transparent',
            color: mode === 'SWA' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: mode === 'SWA' ? 600 : 500,
            transition: 'all 0.15s ease'
          }}
          title="Modo SWA: Portais estaduais de Job Order para PERM"
        >
          <Landmark size={12} />
          <span>SWA</span>
        </button>

        <button
          onClick={() => onModeChange('NEWSPAPER')}
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.3rem 0.75rem',
            fontSize: '0.75rem',
            border: 'none',
            borderRadius: 'var(--radius-pill)',
            cursor: 'pointer',
            backgroundColor: mode === 'NEWSPAPER' ? 'var(--color-primary)' : 'transparent',
            color: mode === 'NEWSPAPER' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: mode === 'NEWSPAPER' ? 600 : 500,
            transition: 'all 0.15s ease'
          }}
          title="Modo Jornais: Encontrar jornal dominical por CEP, endereço ou cidade"
        >
          <Newspaper size={12} />
          <span>Jornais PERM</span>
        </button>
      </div>
    </div>
  );
};
