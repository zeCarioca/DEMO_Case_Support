import React, { useState } from 'react';
import { ArrowLeft, Clock, FileCheck2 } from 'lucide-react';
import { ScheduleItem, CalculatorEntry } from '../types.js';
import { SopGuidelinesCallout } from './SopGuidelinesCallout.js';
import { WatermelonTable5 } from './WatermelonTable5.js';
import { SchedulingCalculator } from './SchedulingCalculator.js';
import { useLanguage } from '../../i18n/LanguageContext.js';

interface FormsTranslationsViewProps {
  onBackToHub: () => void;
}

export const FormsTranslationsView: React.FC<FormsTranslationsViewProps> = ({ onBackToHub }) => {
  const [calculatorEntries, setCalculatorEntries] = useState<CalculatorEntry[]>([]);
  const { language, t } = useLanguage();
  const isPt = language === 'pt';

  const handleAddItemToCalculator = (item: ScheduleItem) => {
    setCalculatorEntries((prev) => {
      const existing = prev.find((e) => e.item.id === item.id);
      if (existing) {
        return prev.map((e) =>
          e.item.id === item.id ? { ...e, quantity: e.quantity + 1 } : e
        );
      }
      return [
        ...prev,
        {
          id: `${item.id}-${Date.now()}`,
          item,
          quantity: 1,
          selectedVariantId: item.variants ? item.variants[0].id : undefined
        }
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCalculatorEntries((prev) =>
      prev
        .map((e) => {
          if (e.id === id) {
            const newQty = e.quantity + delta;
            return newQty > 0 ? { ...e, quantity: newQty } : null;
          }
          return e;
        })
        .filter(Boolean) as CalculatorEntry[]
    );
  };

  const handleSelectVariant = (id: string, variantId: string) => {
    setCalculatorEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, selectedVariantId: variantId } : e))
    );
  };

  const handleRemoveEntry = (id: string) => {
    setCalculatorEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const handleClearAll = () => {
    setCalculatorEntries([]);
  };

  const addedItemIds = calculatorEntries.map((e) => e.item.id);

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Navigation & Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onBackToHub}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.375rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
          >
            <ArrowLeft size={14} />
            {t('hub.back')}
          </button>

          <span style={{ color: 'var(--border)' }}>/</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileCheck2 size={18} style={{ color: 'var(--accent)' }} />
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {isPt ? 'Equipe de Prazos, Docketing & Traduções' : 'Docketing & Foreign Filings Translation SLA'}
            </h1>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.25rem 0.625rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--sticker-green-bg)',
              color: 'var(--sticker-green-text)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <Clock size={12} />
            {isPt ? 'SLA Oficial de Docketing' : 'Official Docketing SLA'}
          </span>
        </div>
      </div>

      {/* Guidelines Callout (Page 1 of PDF) */}
      <SopGuidelinesCallout />

      {/* Interactive Scheduling Calculator */}
      <SchedulingCalculator
        entries={calculatorEntries}
        onUpdateQuantity={handleUpdateQuantity}
        onSelectVariant={handleSelectVariant}
        onRemoveEntry={handleRemoveEntry}
        onClearAll={handleClearAll}
      />

      {/* Watermelon Table 5 Layout */}
      <WatermelonTable5
        onAddItemToCalculator={handleAddItemToCalculator}
        addedItemIds={addedItemIds}
      />
    </div>
  );
};
