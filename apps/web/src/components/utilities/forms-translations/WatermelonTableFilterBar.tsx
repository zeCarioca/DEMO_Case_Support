import React from 'react';
import { Filter, Search } from 'lucide-react';
import { ScheduleCategory } from '../types.js';

interface WatermelonTableFilterBarProps {
  selectedCategory: ScheduleCategory;
  onSelectCategory: (category: ScheduleCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const WatermelonTableFilterBar: React.FC<WatermelonTableFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}
    >
      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          backgroundColor: 'var(--bg-subtle)',
          padding: '0.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          flexWrap: 'wrap'
        }}
      >
        <Filter size={14} style={{ color: 'var(--text-tertiary)', marginLeft: '0.5rem' }} />
        {[
          { id: 'all', label: 'Todos' },
          { id: 'forms', label: 'Formulários (USCIS/EOIR)' },
          { id: 'translations', label: 'Traduções de Documentos' },
          { id: 'foia_special', label: 'FOIA & Procedimentos' }
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id as ScheduleCategory)}
            style={{
              border: 'none',
              background: selectedCategory === cat.id ? 'var(--bg-surface)' : 'transparent',
              color: selectedCategory === cat.id ? 'var(--text-primary)' : 'var(--text-tertiary)',
              padding: '0.375rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              fontWeight: selectedCategory === cat.id ? 600 : 500,
              cursor: 'pointer',
              boxShadow: selectedCategory === cat.id ? 'var(--shadow-level-1)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.375rem 0.75rem',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          minWidth: '260px'
        }}
      >
        <Search size={15} style={{ color: 'var(--text-tertiary)' }} />
        <input
          type="text"
          placeholder="Buscar por formulário, certidão, código..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '0.8125rem',
            color: 'var(--text-primary)',
            width: '100%'
          }}
        />
      </div>
    </div>
  );
};
