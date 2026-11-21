import React, { useState, useMemo } from 'react';
import { FileText, Clock, AlertCircle, Tag } from 'lucide-react';
import { ScheduleItem, ScheduleCategory } from '../types.js';
import { ALL_SCHEDULE_ITEMS } from './data/index.js';
import { WatermelonTableRow } from './WatermelonTableRow.js';
import { WatermelonTableFilterBar } from './WatermelonTableFilterBar.js';

interface WatermelonTable5Props {
  onAddItemToCalculator: (item: ScheduleItem) => void;
  addedItemIds: string[];
}

export const WatermelonTable5: React.FC<WatermelonTable5Props> = ({
  onAddItemToCalculator,
  addedItemIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ScheduleCategory>('all');

  const filteredItems = useMemo(() => {
    return ALL_SCHEDULE_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'forms' && item.category === 'forms') ||
        (selectedCategory === 'translations' && item.category === 'translations') ||
        (selectedCategory === 'foia_special' && item.category === 'foia_special');

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        item.code.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        (item.notes && item.notes.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      {/* Top Filter and Search Bar */}
      <WatermelonTableFilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Watermelon Table-5 Container */}
      <div
        style={{
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-surface)',
          boxShadow: 'var(--shadow-level-1)'
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            {/* Table Header matching Table-5 with Icon + Column Label */}
            <thead>
              <tr
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderBottom: '1px solid var(--border)'
                }}
              >
                <th style={{ padding: '0.875rem 1rem', width: '22%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    <FileText size={15} style={{ color: 'var(--text-tertiary)' }} />
                    Item / Formulário
                  </div>
                </th>

                <th style={{ padding: '0.875rem 1rem', width: '16%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    <Tag size={15} style={{ color: 'var(--text-tertiary)' }} />
                    Categoria & Unidade
                  </div>
                </th>

                <th style={{ padding: '0.875rem 1rem', width: '15%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    <Clock size={15} style={{ color: 'var(--text-tertiary)' }} />
                    Tempo Médio (SLA)
                  </div>
                </th>

                <th style={{ padding: '0.875rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    <AlertCircle size={15} style={{ color: 'var(--text-tertiary)' }} />
                    Condições & Observações
                  </div>
                </th>

                <th style={{ padding: '0.875rem 1rem', width: '110px', textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Ação
                  </span>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                    Nenhum formulário ou documento encontrado para "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <WatermelonTableRow
                    key={item.id}
                    item={item}
                    isAdded={addedItemIds.includes(item.id)}
                    onAddItem={onAddItemToCalculator}
                  />
                ))
              )}
            </tbody>

            {/* Table Footer */}
            <tfoot>
              <tr style={{ backgroundColor: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
                <td colSpan={3} style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  Exibindo {filteredItems.length} de {ALL_SCHEDULE_ITEMS.length} itens do SOP oficial
                </td>
                <td colSpan={2} style={{ padding: '0.75rem 1rem', textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  Valores médios pré-estabelecidos por beneficiário
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
