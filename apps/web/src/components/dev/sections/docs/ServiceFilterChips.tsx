import React from 'react';
import { Server, Database, Layout, Cpu, Layers } from 'lucide-react';
import { ServiceTier } from './types.js';

interface ServiceFilterChipsProps {
  activeTier: ServiceTier;
  onSelectTier: (tier: ServiceTier) => void;
  tierCounts: Record<ServiceTier, number>;
}

export const ServiceFilterChips: React.FC<ServiceFilterChipsProps> = ({
  activeTier,
  onSelectTier,
  tierCounts
}) => {
  const options: Array<{ id: ServiceTier; label: string; icon: React.ReactNode }> = [
    { id: 'ALL', label: 'Todos os Serviços', icon: <Layers size={13} /> },
    { id: 'BACKEND', label: 'Backend (Fastify)', icon: <Server size={13} /> },
    { id: 'DATABASE', label: 'Database (Prisma/SQLite)', icon: <Database size={13} /> },
    { id: 'FRONTEND', label: 'Frontend Subsystems', icon: <Layout size={13} /> },
    { id: 'CONTRACTS', label: 'Shared Contracts', icon: <Cpu size={13} /> }
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        overflowX: 'auto',
        paddingBottom: '0.25rem'
      }}
    >
      {options.map((opt) => {
        const isSelected = activeTier === opt.id;
        const count = tierCounts[opt.id] ?? 0;

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelectTier(opt.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.7rem',
              backgroundColor: isSelected ? 'var(--accent)' : 'var(--bg-surface)',
              color: isSelected ? '#ffffff' : 'var(--text-secondary)',
              border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              fontWeight: isSelected ? 600 : 400,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.12s ease'
            }}
          >
            {opt.icon}
            <span>{opt.label}</span>
            <span
              style={{
                fontSize: '0.6875rem',
                fontFamily: 'var(--font-mono)',
                backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.25)' : 'var(--bg-subtle)',
                color: isSelected ? '#ffffff' : 'var(--text-tertiary)',
                padding: '0.05rem 0.35rem',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
