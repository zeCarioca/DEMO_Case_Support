import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';
import { NodeStepItem } from './nodeStepsData.js';

interface NodeStepsExplorerProps {
  steps: NodeStepItem[];
  phaseTitle: string;
  highlightStepCode?: string | null;
}

export const NodeStepsExplorer: React.FC<NodeStepsExplorerProps> = ({
  steps,
  highlightStepCode
}) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [expandedCode, setExpandedCode] = useState<string | null>(highlightStepCode || steps[0]?.code || null);

  React.useEffect(() => {
    if (highlightStepCode) {
      setExpandedCode(highlightStepCode);
    }
  }, [highlightStepCode]);

  const filtered = steps.filter((s) => {
    const matchesRole = roleFilter === 'ALL' || s.role === roleFilter;
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
                          s.code.toLowerCase().includes(search.toLowerCase()) ||
                          (s.detail && s.detail.toLowerCase().includes(search.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  const uniqueRoles = Array.from(new Set(steps.map((s) => s.role)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      
      {/* Search & Filter Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--bg-surface)',
          padding: '0.4rem 0.65rem',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xs)'
        }}>
          <Search size={13} color="var(--accent)" />
          <input
            type="text"
            placeholder="Filtrar passos da fase…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.78125rem',
              width: '100%',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Role Pills */}
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setRoleFilter('ALL')}
            className="badge"
            style={{
              cursor: 'pointer',
              padding: '0.15rem 0.55rem',
              backgroundColor: roleFilter === 'ALL' ? 'var(--accent)' : 'var(--bg-subtle)',
              color: roleFilter === 'ALL' ? '#ffffff' : 'var(--text-secondary)',
              borderColor: roleFilter === 'ALL' ? 'var(--accent)' : 'var(--border)'
            }}
          >
            Todos ({steps.length})
          </button>
          {uniqueRoles.map((r) => {
            const isSelected = roleFilter === r;
            return (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className="badge"
                style={{
                  cursor: 'pointer',
                  padding: '0.15rem 0.55rem',
                  backgroundColor: isSelected ? 'var(--accent)' : 'var(--bg-subtle)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  borderColor: isSelected ? 'var(--accent)' : 'var(--border)'
                }}
              >
                {r.replace(/_/g, ' ')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Steps List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        maxHeight: 'calc(100vh - 270px)',
        minHeight: '380px',
        overflowY: 'auto',
        paddingRight: '0.25rem'
      }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '2rem 1.5rem', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
            Nenhum passo encontrado com os filtros selecionados.
          </div>
        ) : (
          filtered.map((item) => {
            const isExpanded = expandedCode === item.code;
            return (
              <div
                key={item.code}
                style={{
                  border: isExpanded ? '1px solid var(--border-contrast)' : '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isExpanded ? 'var(--bg-subtle)' : 'var(--bg-surface)',
                  padding: '0.65rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  boxShadow: isExpanded ? 'var(--shadow-level-1)' : 'none',
                  transition: 'all 0.15s ease'
                }}
                onClick={() => setExpandedCode(isExpanded ? null : item.code)}
              >
                {/* Step Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    {isExpanded ? <ChevronDown size={14} color="var(--accent)" /> : <ChevronRight size={14} color="var(--text-tertiary)" />}
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)' }} className="tabular">
                      {item.code}
                    </span>
                    <span className="badge badge-neutral" style={{ fontSize: '0.6875rem', padding: '0.1rem 0.45rem' }}>
                      {item.role.replace(/_/g, ' ')}
                    </span>
                  </div>

                  {item.requiresApproval && (
                    <span className="badge badge-accent" style={{ fontSize: '0.6875rem', padding: '0.1rem 0.45rem' }}>
                      Requer {item.requiresApproval.replace(/_/g, ' ')}
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 500, paddingLeft: '1.25rem' }}>
                  {item.title}
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{
                    marginTop: '0.35rem',
                    paddingLeft: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    fontSize: '0.78125rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    borderTop: '1px solid var(--border)',
                    paddingTop: '0.5rem'
                  }}>
                    {item.detail && <div>{item.detail}</div>}

                    {item.criticalNote && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        color: 'var(--sticker-orange)',
                        backgroundColor: 'rgba(221, 91, 0, 0.08)',
                        borderRadius: 'var(--radius-xs)',
                        padding: '0.4rem 0.6rem',
                        borderLeft: '3px solid var(--sticker-orange)'
                      }}>
                        <AlertTriangle size={13} color="var(--sticker-orange)" style={{ flexShrink: 0 }} />
                        <span><strong>Nota Crítica:</strong> {item.criticalNote}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
