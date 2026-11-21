import React, { useState, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { ServiceTier, ServiceItem } from './types.js';
import { SERVICES_CATALOG } from './servicesData.js';
import { ServiceSearchBar } from './ServiceSearchBar.js';
import { ServiceFilterChips } from './ServiceFilterChips.js';
import { ServiceCard } from './ServiceCard.js';
import { ServiceEnvDrawer } from './ServiceEnvDrawer.js';

export const DevServicesDocsSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeTier, setActiveTier] = useState<ServiceTier>('ALL');
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Compute tier counts
  const tierCounts = useMemo(() => {
    const counts: Record<ServiceTier, number> = {
      ALL: SERVICES_CATALOG.length,
      BACKEND: 0,
      DATABASE: 0,
      FRONTEND: 0,
      CONTRACTS: 0
    };
    SERVICES_CATALOG.forEach((item) => {
      counts[item.tier] = (counts[item.tier] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter services by query, tier, and tag
  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();

    return SERVICES_CATALOG.filter((item) => {
      // 1. Tier filter
      if (activeTier !== 'ALL' && item.tier !== activeTier) {
        return false;
      }

      // 2. Tag filter
      if (activeTag && !item.tags.includes(activeTag)) {
        return false;
      }

      // 3. Search query filter (matches name, summary, description, entryPoint, envVars, routes, tags)
      if (q) {
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesEntryPoint = item.entryPoint.toLowerCase().includes(q);
        const matchesPackage = item.package.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchesEnvVars = item.envVars.some((ev) => ev.name.toLowerCase().includes(q));
        const matchesRoutes = item.routes ? item.routes.some((r) => r.toLowerCase().includes(q)) : false;

        if (
          !matchesName &&
          !matchesSummary &&
          !matchesEntryPoint &&
          !matchesPackage &&
          !matchesTags &&
          !matchesEnvVars &&
          !matchesRoutes
        ) {
          return false;
        }
      }

      return true;
    });
  }, [query, activeTier, activeTag]);

  const handleTagClick = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? undefined : tag));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Intro Banner */}
      <div
        style={{
          backgroundColor: 'var(--bg-page)',
          border: '1px solid var(--border)',
          borderLeft: '4px solid var(--accent)',
          padding: '1rem 1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <BookOpen size={16} color="var(--accent)" />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Guia Interativo de Serviços & Interação com o Ambiente
          </h3>
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
          Catálogo canônico dos 14 serviços e subsistemas do CaseSupport. Cada ficha documenta variáveis de ambiente (.env),
          portas, rotas, persistência no navegador e comportamentos de fallback para agentes de IA e desenvolvedores.
        </p>
      </div>

      {/* Search Input Bar */}
      <ServiceSearchBar
        query={query}
        onQueryChange={setQuery}
        totalMatches={filteredServices.length}
        totalServices={SERVICES_CATALOG.length}
      />

      {/* Filter Chips by Tier */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <ServiceFilterChips
          activeTier={activeTier}
          onSelectTier={(tier) => {
            setActiveTier(tier);
            setActiveTag(undefined);
          }}
          tierCounts={tierCounts}
        />

        {activeTag && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <span>Filtro de tag ativo:</span>
            <strong style={{ color: 'var(--accent)' }}>#{activeTag}</strong>
            <button
              type="button"
              onClick={() => setActiveTag(undefined)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-tertiary)',
                cursor: 'pointer',
                fontSize: '0.6875rem',
                textDecoration: 'underline'
              }}
            >
              (remover)
            </button>
          </div>
        )}
      </div>

      {/* Service Cards Grid */}
      {filteredServices.length === 0 ? (
        <div
          style={{
            padding: '3rem 1rem',
            textAlign: 'center',
            backgroundColor: 'var(--bg-surface)',
            border: '1px dashed var(--border)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
            Nenhum serviço encontrado
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', margin: '0 0 1rem 0' }}>
            Nenhum serviço corresponde à pesquisa "{query}" no filtro selecionado.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setActiveTier('ALL');
              setActiveTag(undefined);
            }}
            style={{
              padding: '0.4rem 0.85rem',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
          >
            Limpar todos os filtros
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1rem'
          }}
        >
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onOpenDetails={setSelectedService}
              onTagClick={handleTagClick}
              activeTag={activeTag}
            />
          ))}
        </div>
      )}

      {/* Details Drawer / Modal */}
      <ServiceEnvDrawer
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
};
