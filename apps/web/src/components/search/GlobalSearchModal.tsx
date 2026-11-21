import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Layers, ListOrdered, FileText, GraduationCap } from 'lucide-react';
import { SearchItem, SearchItemType, buildSearchIndex, searchAll } from './searchIndex.js';
import { SearchResultRow } from './SearchResultRow.js';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: SearchItem) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectItem
}) => {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | SearchItemType>('ALL');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const searchIndex = useMemo(() => buildSearchIndex(), []);
  const results = searchAll(query, typeFilter, searchIndex);

  const counts = useMemo(() => ({
    FASE: searchIndex.filter((i) => i.type === 'FASE').length,
    PASSO: searchIndex.filter((i) => i.type === 'PASSO').length,
    LEARN: searchIndex.filter((i) => i.type === 'LEARN').length,
    DOC: searchIndex.filter((i) => i.type === 'DOC').length
  }), [searchIndex]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setTypeFilter('ALL');
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, typeFilter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < results.length ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) onSelectItem(results[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, onSelectItem]);

  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(3px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="notion-card"
        style={{
          width: '740px',
          maxWidth: '92vw',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-level-2)',
          overflow: 'hidden'
        }}
      >
        {/* Search Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border)'
        }}>
          <Search size={18} color="var(--accent)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar por código (ex: PERM-PW-04, ETA-9089), termo ou fase..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              fontSize: '0.9375rem',
              color: 'var(--text-primary)',
              fontFamily: 'inherit'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: '0.2rem' }}
            >
              <X size={14} />
            </button>
          )}
          <kbd style={{ fontSize: '0.625rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--bg-subtle)', padding: '0.15rem 0.4rem', color: 'var(--text-tertiary)', fontFamily: 'inherit' }}>
            ESC
          </kbd>
        </div>

        {/* Category Filters with Sticker Highlights */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.55rem 1.25rem',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--bg-subtle)',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setTypeFilter('ALL')}
              className="badge"
              style={{
                cursor: 'pointer',
                backgroundColor: typeFilter === 'ALL' ? 'var(--accent)' : 'var(--bg-surface)',
                color: typeFilter === 'ALL' ? '#ffffff' : 'var(--text-tertiary)',
                borderColor: typeFilter === 'ALL' ? 'var(--accent)' : 'var(--border)'
              }}
            >
              Todos ({query ? results.length : searchIndex.length})
            </button>
            <button
              onClick={() => setTypeFilter('FASE')}
              className="badge"
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                backgroundColor: typeFilter === 'FASE' ? 'var(--sticker-teal)' : 'var(--bg-surface)',
                color: typeFilter === 'FASE' ? '#ffffff' : 'var(--sticker-teal)',
                borderColor: typeFilter === 'FASE' ? 'var(--sticker-teal)' : 'rgba(42, 157, 153, 0.3)'
              }}
            >
              <Layers size={11} />
              <span>Fases ({counts.FASE})</span>
            </button>
            <button
              onClick={() => setTypeFilter('PASSO')}
              className="badge"
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                backgroundColor: typeFilter === 'PASSO' ? 'var(--sticker-sky)' : 'var(--bg-surface)',
                color: typeFilter === 'PASSO' ? '#ffffff' : 'var(--sticker-sky)',
                borderColor: typeFilter === 'PASSO' ? 'var(--sticker-sky)' : 'rgba(98, 174, 240, 0.3)'
              }}
            >
              <ListOrdered size={11} />
              <span>Passos ({counts.PASSO})</span>
            </button>
            <button
              onClick={() => setTypeFilter('LEARN')}
              className="badge"
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                backgroundColor: typeFilter === 'LEARN' ? 'var(--sticker-purple-text)' : 'var(--bg-surface)',
                color: typeFilter === 'LEARN' ? '#ffffff' : 'var(--sticker-purple-text)',
                borderColor: typeFilter === 'LEARN' ? 'var(--sticker-purple-text)' : 'rgba(144, 101, 176, 0.35)'
              }}
            >
              <GraduationCap size={11} />
              <span>Learn ({counts.LEARN})</span>
            </button>
            <button
              onClick={() => setTypeFilter('DOC')}
              className="badge"
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                backgroundColor: typeFilter === 'DOC' ? 'var(--sticker-orange)' : 'var(--bg-surface)',
                color: typeFilter === 'DOC' ? '#ffffff' : 'var(--sticker-orange)',
                borderColor: typeFilter === 'DOC' ? 'var(--sticker-orange)' : 'rgba(221, 91, 0, 0.3)'
              }}
            >
              <FileText size={11} />
              <span>Documentos ({counts.DOC})</span>
            </button>
          </div>

          <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }} className="tabular">
            {results.length} resultados
          </span>
        </div>

        {/* Results Scroll List */}
        <div
          ref={listRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            minHeight: '260px',
            maxHeight: '460px'
          }}
        >
          {results.length === 0 ? (
            <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8125rem' }}>
              Nenhum item correspondente ao termo "{query}".
            </div>
          ) : (
            results.map((item, idx) => (
              <SearchResultRow
                key={`${item.type}-${item.id}`}
                item={item}
                isSelected={idx === selectedIndex}
                onSelect={() => onSelectItem(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
              />
            ))
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div style={{
          padding: '0.65rem 1.25rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.6875rem',
          color: 'var(--text-tertiary)',
          backgroundColor: 'var(--bg-subtle)'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span><kbd style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', padding: '0.1rem 0.3rem', background: 'var(--bg-surface)' }}>↑</kbd> <kbd style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', padding: '0.1rem 0.3rem', background: 'var(--bg-surface)' }}>↓</kbd> Navegar</span>
            <span><kbd style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', padding: '0.1rem 0.3rem', background: 'var(--bg-surface)' }}>Enter</kbd> Abrir</span>
            <span><kbd style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', padding: '0.1rem 0.3rem', background: 'var(--bg-surface)' }}>Esc</kbd> Fechar</span>
          </div>
          <span>Apex IP & Tech Law Hub</span>
        </div>

      </div>
    </div>
  );
};
