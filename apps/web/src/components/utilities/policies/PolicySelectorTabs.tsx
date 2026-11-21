import React from 'react';
import { FileText, PhoneCall, FolderX, Search } from 'lucide-react';
import { PolicyDocument } from './data/policyTypes.js';

interface PolicySelectorTabsProps {
  policies: PolicyDocument[];
  selectedPolicyId: string;
  onSelectPolicy: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const PolicySelectorTabs: React.FC<PolicySelectorTabsProps> = ({
  policies,
  selectedPolicyId,
  onSelectPolicy,
  searchQuery,
  onSearchChange
}) => {
  const getPolicyIcon = (id: string) => {
    if (id === 'client-comm') return <PhoneCall size={15} />;
    if (id === 'fin-005') return <FolderX size={15} />;
    return <FileText size={15} />;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}
    >
      {/* Policy switcher buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          backgroundColor: 'var(--bg-subtle)',
          padding: '0.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          flexWrap: 'wrap'
        }}
      >
        {policies.map((policy) => {
          const isSelected = policy.id === selectedPolicyId;

          return (
            <button
              key={policy.id}
              type="button"
              onClick={() => onSelectPolicy(policy.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: 'none',
                background: isSelected ? 'var(--bg-surface)' : 'transparent',
                color: isSelected ? 'var(--text-primary)' : 'var(--text-tertiary)',
                padding: '0.5rem 0.875rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 600 : 500,
                cursor: 'pointer',
                boxShadow: isSelected ? 'var(--shadow-level-1)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ color: isSelected ? 'var(--accent)' : 'inherit' }}>
                {getPolicyIcon(policy.id)}
              </span>
              <span>{policy.code || policy.title}</span>
              <span
                style={{
                  fontSize: '0.625rem',
                  padding: '0.125rem 0.375rem',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: isSelected ? 'var(--bg-subtle)' : 'var(--bg-page)',
                  color: 'var(--text-ghost)',
                  fontWeight: 600
                }}
              >
                {policy.area.split('&')[0].trim()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Search */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.375rem 0.75rem',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          minWidth: '240px'
        }}
      >
        <Search size={15} style={{ color: 'var(--text-tertiary)' }} />
        <input
          type="text"
          placeholder="Buscar nas diretrizes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '0.8125rem',
            color: 'var(--text-primary)',
            width: '100%'
          }}
        />
      </div>
    </div>
  );
};
