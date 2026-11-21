import React from 'react';
import { ArrowRight, AlertTriangle, ShieldCheck, FileText, GraduationCap } from 'lucide-react';
import { SearchItem } from './searchIndex.js';

interface SearchResultRowProps {
  item: SearchItem;
  isSelected: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
}

export const SearchResultRow: React.FC<SearchResultRowProps> = ({
  item,
  isSelected,
  onSelect,
  onMouseEnter
}) => {
  const isFase = item.type === 'FASE';
  const isDoc = item.type === 'DOC';
  const isLearn = item.type === 'LEARN';

  const getBadgeStyle = () => {
    if (isFase) {
      return { bg: 'rgba(42, 157, 153, 0.12)', color: 'var(--sticker-teal)', border: 'rgba(42, 157, 153, 0.3)' };
    }
    if (isDoc) {
      return { bg: 'rgba(221, 91, 0, 0.12)', color: 'var(--sticker-orange)', border: 'rgba(221, 91, 0, 0.3)' };
    }
    if (isLearn) {
      return { bg: 'var(--sticker-purple-bg)', color: 'var(--sticker-purple-text)', border: 'rgba(144, 101, 176, 0.3)' };
    }
    return { bg: 'var(--bg-subtle)', color: 'var(--text-secondary)', border: 'var(--border)' };
  };

  const badgeStyle = getBadgeStyle();

  const getBadgeLabel = () => {
    if (isDoc) return 'DOC OFICIAL';
    if (isLearn) return `LEARN • ${item.code}`;
    return item.code;
  };

  return (
    <div
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      style={{
        padding: '0.65rem 0.85rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3rem',
        backgroundColor: isSelected ? 'var(--bg-subtle)' : 'transparent',
        borderRadius: 'var(--radius-sm)',
        borderLeft: isSelected ? '3px solid var(--accent)' : '3px solid transparent',
        transition: 'background-color 0.1s ease'
      }}
    >
      {/* Meta Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span
            className="badge"
            style={{
              fontSize: '0.6875rem',
              backgroundColor: badgeStyle.bg,
              color: badgeStyle.color,
              borderColor: badgeStyle.border
            }}
          >
            {getBadgeLabel()}
          </span>

          {item.role && (
            <span
              className="badge"
              style={{
                fontSize: '0.6875rem',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-tertiary)',
                borderColor: 'var(--border)'
              }}
            >
              {item.role.replace(/_/g, ' ')}
            </span>
          )}

          {isDoc ? (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <FileText size={12} color="var(--sticker-orange)" />
              <span>{item.nodeTitle}</span>
            </span>
          ) : isLearn ? (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <GraduationCap size={12} color="var(--sticker-purple-text)" />
              <span>{item.nodeTitle}</span>
            </span>
          ) : (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
              {item.nodeTitle}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {item.requiresApproval && (
            <span style={{
              fontSize: '0.6875rem',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontWeight: 500
            }}>
              <ShieldCheck size={12} />
              <span>Requer {item.requiresApproval}</span>
            </span>
          )}
          {item.stepCount && (
            <span className="badge tabular" style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', background: 'transparent' }}>
              {item.stepCount} passos
            </span>
          )}
        </div>
      </div>

      {/* Title & Detail */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.1px' }}>
            {item.title}
          </div>
          {item.detail && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem', lineHeight: '1.4' }}>
              {item.detail.slice(0, 110)}{item.detail.length > 110 ? '…' : ''}
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          color: isSelected ? 'var(--accent)' : 'var(--text-tertiary)',
          fontSize: '0.75rem',
          fontWeight: 500,
          flexShrink: 0,
          paddingTop: '0.15rem'
        }}>
          <span>Abrir</span>
          <ArrowRight size={12} />
        </div>
      </div>

      {/* Critical Warning Flag */}
      {item.criticalNote && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.75rem',
          color: 'var(--sticker-orange)',
          fontWeight: 500,
          marginTop: '0.15rem'
        }}>
          <AlertTriangle size={12} />
          <span>{item.criticalNote}</span>
        </div>
      )}
    </div>
  );
};
