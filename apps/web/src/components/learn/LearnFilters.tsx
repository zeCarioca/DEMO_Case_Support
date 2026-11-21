import React from 'react';
import { Search, FileText, ScrollText, BookOpen, Layers } from 'lucide-react';
import { LearnCategory } from './types.js';

interface LearnFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: 'ALL' | LearnCategory;
  onSelectCategory: (cat: 'ALL' | LearnCategory) => void;
  counts: {
    total: number;
    forms: number;
    protocols: number;
    documents: number;
  };
}

export const LearnFilters: React.FC<LearnFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  counts
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '2rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onSelectCategory('ALL')}
            className="badge"
            style={{
              cursor: 'pointer',
              padding: '0.3rem 0.75rem',
              backgroundColor: selectedCategory === 'ALL' ? 'var(--accent)' : 'var(--bg-surface)',
              color: selectedCategory === 'ALL' ? '#ffffff' : 'var(--text-secondary)',
              borderColor: selectedCategory === 'ALL' ? 'var(--accent)' : 'var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Layers size={13} />
            <span>Todos ({counts.total})</span>
          </button>

          <button
            onClick={() => onSelectCategory('FORM')}
            className="badge"
            style={{
              cursor: 'pointer',
              padding: '0.3rem 0.75rem',
              backgroundColor: selectedCategory === 'FORM' ? 'var(--sticker-teal)' : 'var(--bg-surface)',
              color: selectedCategory === 'FORM' ? '#ffffff' : 'var(--sticker-teal)',
              borderColor: selectedCategory === 'FORM' ? 'var(--sticker-teal)' : 'rgba(42, 157, 153, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <FileText size={13} />
            <span>Formulários ({counts.forms})</span>
          </button>

          <button
            onClick={() => onSelectCategory('PROTOCOL')}
            className="badge"
            style={{
              cursor: 'pointer',
              padding: '0.3rem 0.75rem',
              backgroundColor: selectedCategory === 'PROTOCOL' ? 'var(--sticker-purple-deep)' : 'var(--bg-surface)',
              color: selectedCategory === 'PROTOCOL' ? '#ffffff' : 'var(--sticker-purple-deep)',
              borderColor: selectedCategory === 'PROTOCOL' ? 'var(--sticker-purple-deep)' : 'rgba(214, 182, 246, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <ScrollText size={13} />
            <span>Protocolos ({counts.protocols})</span>
          </button>

          <button
            onClick={() => onSelectCategory('DOCUMENT')}
            className="badge"
            style={{
              cursor: 'pointer',
              padding: '0.3rem 0.75rem',
              backgroundColor: selectedCategory === 'DOCUMENT' ? 'var(--sticker-orange)' : 'var(--bg-surface)',
              color: selectedCategory === 'DOCUMENT' ? '#ffffff' : 'var(--sticker-orange)',
              borderColor: selectedCategory === 'DOCUMENT' ? 'var(--sticker-orange)' : 'rgba(221, 91, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <BookOpen size={13} />
            <span>Documentos ({counts.documents})</span>
          </button>
        </div>

        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xs)',
          padding: '0.4rem 0.75rem',
          minWidth: '280px'
        }}>
          <Search size={14} color="var(--accent)" />
          <input
            type="text"
            placeholder="Filtrar formulários, protocolos ou leis…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.8125rem',
              width: '100%',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>
    </div>
  );
};
