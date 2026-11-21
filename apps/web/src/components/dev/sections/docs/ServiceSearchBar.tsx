import React, { useRef, useEffect } from 'react';
import { Search, X, Terminal } from 'lucide-react';

interface ServiceSearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  totalMatches: number;
  totalServices: number;
}

export const ServiceSearchBar: React.FC<ServiceSearchBarProps> = ({
  query,
  onQueryChange,
  totalMatches,
  totalServices
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus shortcut: press "/" anywhere to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-sm)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: '260px' }}>
        <Search size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Pesquisar por serviço, variável .env, rota, arquivo ou tag (Pressione '/' para focar)..."
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '0.8125rem',
            color: 'var(--text-primary)',
            fontFamily: 'inherit'
          }}
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-tertiary)',
              padding: '0.2rem'
            }}
            title="Limpar pesquisa"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-secondary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Terminal size={12} style={{ color: 'var(--accent)' }} />
          <span>
            Exibindo <strong>{totalMatches}</strong> de {totalServices} serviços
          </span>
        </div>
      </div>
    </div>
  );
};
