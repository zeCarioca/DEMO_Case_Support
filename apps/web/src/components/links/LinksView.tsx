import React, { useState, useMemo } from 'react';
import { Search, Globe, ShieldCheck, X } from 'lucide-react';
import { CATEGORY_FILTER_OPTIONS, GOVERNMENT_LINKS } from './linksData.js';
import { GovLinkCategory } from './types.js';
import { LinkCard } from './LinkCard.js';
import { UsaInteractiveMap } from './map/UsaInteractiveMap.js';
import { CensusNewspaperResolver } from './newspaper/CensusNewspaperResolver.js';

export const LinksView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | GovLinkCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLinks = useMemo(() => {
    return GOVERNMENT_LINKS.filter((item) => {
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.badge.toLowerCase().includes(query) ||
        item.agency.toLowerCase().includes(query) ||
        item.url.toLowerCase().includes(query)
      );
    });
  }, [selectedCategory, searchQuery]);

  const officialGovCount = useMemo(() => {
    return GOVERNMENT_LINKS.filter((l) => l.isOfficialGov).length;
  }, []);

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem' }}>
      {/* Notion Header Bar */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          paddingBottom: '1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                backgroundColor: 'var(--sticker-blue-bg)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border)'
              }}
            >
              PORTAIS & DIRETÓRIO SWA
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>•</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Áreas de Interesse & Portais Oficiais
            </span>
          </div>
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              margin: '0.4rem 0 0.2rem'
            }}
          >
            Portais Governamentais & Fontes Oficiais
          </h1>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginTop: '0.35rem',
              maxWidth: '720px'
            }}
          >
            Acesso unificado aos sistemas do DOL (FLAG/O*NET), USCIS (Receipts/Taxas), Departamento de Estado (Visa Bulletin/CEAC) e Agências Estaduais de Emprego (SWA).
          </p>
        </div>

        {/* Quick Stats Badges */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.75rem 1.1rem',
              minWidth: '130px',
              boxShadow: 'var(--shadow-level-1)'
            }}
          >
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>
              Portais Listados
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {GOVERNMENT_LINKS.length}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.75rem 1.1rem',
              minWidth: '130px',
              boxShadow: 'var(--shadow-level-1)'
            }}
          >
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>
              Domínios .gov
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-primary)', marginTop: '0.2rem' }}>
              {officialGovCount}
            </div>
          </div>
        </div>
      </div>

      {/* Census CBSA / ZCTA Newspaper Resolution Engine (20 CFR § 656) */}
      <CensusNewspaperResolver />

      {/* Interactive Map of the USA (50 States & SWA Job Orders) */}
      <UsaInteractiveMap />

      {/* Filters & Search Toolbar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {CATEGORY_FILTER_OPTIONS.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--bg-surface)',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                    border: isSelected ? '1px solid var(--color-primary)' : '1px solid var(--border)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '0.35rem 0.8rem',
                    fontSize: '0.75rem',
                    fontWeight: isSelected ? 600 : 500,
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    boxShadow: isSelected ? 'var(--shadow-level-1)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.4rem 0.85rem',
              gap: '0.5rem',
              minWidth: '280px',
              boxShadow: 'var(--shadow-level-1)'
            }}
          >
            <Search size={14} color="var(--text-tertiary)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome, sigla ou serviço..."
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.8125rem',
                fontFamily: 'inherit',
                width: '100%'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <X size={13} color="var(--text-tertiary)" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Link Cards */}
      {filteredLinks.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1rem'
          }}
        >
          {filteredLinks.map((link) => (
            <LinkCard key={link.id} item={link} />
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-level-1)'
          }}
        >
          <Globe size={24} color="var(--text-tertiary)" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Nenhum portal encontrado para "{searchQuery}".
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
            }}
            style={{
              marginTop: '0.75rem',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-pill)',
              color: 'var(--text-primary)',
              padding: '0.4rem 0.85rem',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
};
