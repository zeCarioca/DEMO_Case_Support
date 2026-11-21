import React from 'react';
import { ArrowRight, FileText, ScrollText, BookOpen } from 'lucide-react';
import { LearnItem } from './types.js';

interface LearnCardProps {
  item: LearnItem;
  isSelected: boolean;
  onSelect: (item: LearnItem) => void;
}

export const LearnCard: React.FC<LearnCardProps> = ({
  item,
  isSelected,
  onSelect
}) => {
  const getCategoryBadge = () => {
    switch (item.category) {
      case 'FORM':
        return { label: 'Formulário Oficial', badgeClass: 'badge-accent' };
      case 'PROTOCOL':
        return { label: 'Protocolo Operacional', badgeClass: 'badge-neutral' };
      case 'DOCUMENT':
        return { label: 'Documento / Prova', badgeClass: 'badge-outline' };
    }
  };

  const getCategoryIcon = () => {
    switch (item.category) {
      case 'FORM':
        return <FileText size={13} />;
      case 'PROTOCOL':
        return <ScrollText size={13} />;
      case 'DOCUMENT':
        return <BookOpen size={13} />;
    }
  };

  const badge = getCategoryBadge();

  return (
    <div
      onClick={() => onSelect(item)}
      className="notion-card"
      style={{
        padding: '1.25rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: isSelected ? 'var(--bg-subtle)' : 'var(--bg-surface)',
        borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: isSelected ? 'var(--shadow-level-1)' : 'var(--shadow-level-0)',
        minHeight: '210px',
        transition: 'all 0.15s ease'
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.boxShadow = 'var(--shadow-level-1)';
          e.currentTarget.style.borderColor = 'var(--border-contrast)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.boxShadow = 'var(--shadow-level-0)';
          e.currentTarget.style.borderColor = 'var(--border)';
        }
      }}
    >
      <div>
        {/* Top Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span
              className="badge"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.6875rem',
                backgroundColor: item.category === 'FORM' ? 'rgba(42, 157, 153, 0.12)' : item.category === 'PROTOCOL' ? 'rgba(214, 182, 246, 0.2)' : 'rgba(221, 91, 0, 0.12)',
                color: item.category === 'FORM' ? 'var(--sticker-teal)' : item.category === 'PROTOCOL' ? 'var(--sticker-purple-deep)' : 'var(--sticker-orange)',
                borderColor: item.category === 'FORM' ? 'rgba(42, 157, 153, 0.3)' : item.category === 'PROTOCOL' ? 'rgba(214, 182, 246, 0.4)' : 'rgba(221, 91, 0, 0.3)'
              }}
            >
              {getCategoryIcon()}
              <span>{badge.label}</span>
            </span>
            <span className="badge" style={{ fontSize: '0.6875rem', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-tertiary)', borderColor: 'var(--border)' }}>
              {item.agency}
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }} className="tabular">
            {item.code}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem', letterSpacing: '-0.2px', lineHeight: '1.3' }}>
          {item.title}
        </h4>
        <div style={{ fontSize: '0.78125rem', color: 'var(--text-tertiary)', marginBottom: '0.75rem' }}>
          {item.subtitle}
        </div>

        {/* Summary Snippet */}
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem', maxWidth: '48ch' }}>
          {item.summary.slice(0, 105)}…
        </p>
      </div>

      {/* Footer link trigger */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: isSelected ? 'var(--accent)' : 'var(--text-tertiary)',
        fontWeight: 600,
        paddingTop: '0.6rem',
        borderTop: '1px solid var(--border)'
      }}>
        <span>Explorar guia & regras</span>
        <ArrowRight size={12} color={isSelected ? 'var(--accent)' : 'var(--text-tertiary)'} />
      </div>
    </div>
  );
};
