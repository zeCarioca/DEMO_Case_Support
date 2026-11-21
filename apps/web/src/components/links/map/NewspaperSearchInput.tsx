import React from 'react';
import { Search, X, MapPin } from 'lucide-react';

interface NewspaperSearchInputProps {
  query: string;
  onQueryChange: (q: string) => void;
  onSearch: (q: string) => void;
  onClear: () => void;
  hasResult: boolean;
}

const QUICK_SEARCH_EXAMPLES = [
  { label: '07302 (Jersey City - Cross-State)', value: '07302' },
  { label: '79901 (El Paso - Metro Daily)', value: '79901' },
  { label: '79830 (Alpine - Rural Exception)', value: '79830' },
  { label: '75201 (Dallas - Metro Daily)', value: '75201' },
  { label: '22201 (Arlington - DC MSA)', value: '22201' },
  { label: '33139 (Miami, FL)', value: '33139' },
  { label: '10001 (New York, NY)', value: '10001' }
];


export const NewspaperSearchInput: React.FC<NewspaperSearchInputProps> = ({
  query,
  onQueryChange,
  onSearch,
  onClear,
  hasResult
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
      {/* Search Input Bar */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-page)',
          border: hasResult ? '1px solid var(--accent)' : '1px solid var(--border)',
          padding: '0.45rem 0.85rem',
          gap: '0.5rem',
          transition: 'border-color 0.15s ease'
        }}
      >
        <MapPin size={15} color={hasResult ? 'var(--accent)' : 'var(--text-tertiary)'} />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            onQueryChange(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Digite CEP (ex: 33139), endereço completo ou nome da cidade..."
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '0.875rem',
            fontFamily: 'inherit',
            width: '100%'
          }}
        />

        {query && (
          <button
            type="button"
            onClick={onClear}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-tertiary)',
              padding: '0.2rem',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Limpar busca"
          >
            <X size={14} />
          </button>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: 'var(--accent)',
            color: '#ffffff',
            border: 'none',
            padding: '0.3rem 0.75rem',
            fontSize: '0.75rem',
            fontFamily: 'inherit',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Search size={12} />
          <span>Buscar</span>
        </button>
      </form>

      {/* Suggestion Chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
        <span
          style={{
            fontSize: '0.625rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)'
          }}
        >
          Sugestões rápidas:
        </span>
        {QUICK_SEARCH_EXAMPLES.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => {
              onQueryChange(item.value);
              onSearch(item.value);
            }}
            style={{
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              fontSize: '0.6875rem',
              padding: '0.2rem 0.5rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.12s ease'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
