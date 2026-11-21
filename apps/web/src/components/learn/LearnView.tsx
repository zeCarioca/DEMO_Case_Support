import React, { useState, useRef, useEffect } from 'react';
import { LEARN_ITEMS } from './learnData.js';
import { LearnItem, LearnCategory } from './types.js';
import { LearnCard } from './LearnCard.js';
import { LearnFilters } from './LearnFilters.js';
import { LearnDetailDrawer } from './LearnDetailDrawer.js';

const DEFAULT_DRAWER_WIDTH = 460;
const MIN_DRAWER_WIDTH = 340;
const MAX_DRAWER_WIDTH = 750;

interface LearnViewProps {
  onNavigateToPhase: (phaseId: string) => void;
  initialItemId?: string | null;
}

export const LearnView: React.FC<LearnViewProps> = ({ onNavigateToPhase, initialItemId }) => {
  const [selectedItem, setSelectedItem] = useState<LearnItem | null>(() => {
    if (initialItemId) {
      return LEARN_ITEMS.find((it) => it.id === initialItemId) || LEARN_ITEMS[0];
    }
    return LEARN_ITEMS[0];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | LearnCategory>('ALL');

  useEffect(() => {
    if (initialItemId) {
      const found = LEARN_ITEMS.find((it) => it.id === initialItemId);
      if (found) {
        setSelectedItem(found);
      }
    }
  }, [initialItemId]);

  const [drawerWidth, setDrawerWidth] = useState<number>(() => {
    const saved = localStorage.getItem('apex_learn_drawer_width');
    return saved ? Math.max(MIN_DRAWER_WIDTH, Math.min(MAX_DRAWER_WIDTH, Number(saved))) : DEFAULT_DRAWER_WIDTH;
  });
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(DEFAULT_DRAWER_WIDTH);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX;
    startWidthRef.current = drawerWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = startXRef.current - moveEvent.clientX;
      const nextWidth = Math.max(MIN_DRAWER_WIDTH, Math.min(MAX_DRAWER_WIDTH, startWidthRef.current + delta));
      setDrawerWidth(nextWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      setDrawerWidth((curr) => {
        localStorage.setItem('apex_learn_drawer_width', String(curr));
        return curr;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleSetPreset = (targetWidth: number) => {
    const clamped = Math.max(MIN_DRAWER_WIDTH, Math.min(MAX_DRAWER_WIDTH, targetWidth));
    setDrawerWidth(clamped);
    localStorage.setItem('apex_learn_drawer_width', String(clamped));
  };

  const counts = {
    total: LEARN_ITEMS.length,
    forms: LEARN_ITEMS.filter((i) => i.category === 'FORM').length,
    protocols: LEARN_ITEMS.filter((i) => i.category === 'PROTOCOL').length,
    documents: LEARN_ITEMS.filter((i) => i.category === 'DOCUMENT').length
  };

  const filteredItems = LEARN_ITEMS.filter((item) => {
    const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      item.code.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      (item.legalBasis && item.legalBasis.toLowerCase().includes(q));
    return matchCat && matchQuery;
  });

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem' }}>
      
      {/* Notion Section Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            color: 'var(--accent)',
            backgroundColor: 'var(--accent-ghost)',
            border: '1px solid var(--accent-subtle)',
            borderRadius: 'var(--radius-full)',
            padding: '2px 8px'
          }}>
            03. Learn Knowledge Base
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            Formulários & Protocolos Oficiais
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.8px', color: 'var(--text-primary)', lineHeight: 1.15 }}>
          Formulários, Protocolos & Evidências EB-3
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.35rem', maxWidth: '65ch', lineHeight: 1.5 }}>
          Consulte as regras fundamentais, regulamentos legais (20 CFR 656), formulários oficiais do DOL/USCIS e checklists operacionais exigidos na tramitação dos casos.
        </p>
      </div>

      {/* Filters Bar */}
      <LearnFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        counts={counts}
      />

      {/* Main Content Layout with Cards Grid and Right Resizable Drawer */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', position: 'relative' }}>
        
        {/* Cards Grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {filteredItems.length === 0 ? (
            <div className="swiss-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>
              Nenhum formulário, protocolo ou documento encontrado para a busca "{searchQuery}".
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {filteredItems.map((item) => (
                <LearnCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItem?.id === item.id}
                  onSelect={setSelectedItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Selected Learn Item Drawer */}
        {selectedItem && (
          <LearnDetailDrawer
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            width={drawerWidth}
            onResizeStart={handleResizeStart}
            isDragging={isDragging}
            onSetPreset={handleSetPreset}
            onResetWidth={() => handleSetPreset(DEFAULT_DRAWER_WIDTH)}
            onNavigateToPhase={onNavigateToPhase}
          />
        )}

      </div>

    </div>
  );
};
