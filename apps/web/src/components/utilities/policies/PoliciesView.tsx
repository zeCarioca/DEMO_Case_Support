import React, { useState, useMemo } from 'react';
import { FIRM_POLICIES } from './data/index.js';
import { PolicyHeader } from './PolicyHeader.js';
import { PolicySelectorTabs } from './PolicySelectorTabs.js';
import { PolicyMetaCard } from './PolicyMetaCard.js';
import { PolicySectionCard } from './PolicySectionCard.js';
import { PolicySnippetsCard } from './PolicySnippetsCard.js';

interface PoliciesViewProps {
  onBackToHub: () => void;
}

export const PoliciesView: React.FC<PoliciesViewProps> = ({ onBackToHub }) => {
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>(FIRM_POLICIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const activePolicy = useMemo(() => {
    return FIRM_POLICIES.find((p) => p.id === selectedPolicyId) || FIRM_POLICIES[0];
  }, [selectedPolicyId]);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return activePolicy.sections;

    const q = searchQuery.toLowerCase();
    return activePolicy.sections.filter((s) => {
      const titleMatch = s.title.toLowerCase().includes(q);
      const subtitleMatch = s.subtitle ? s.subtitle.toLowerCase().includes(q) : false;
      const contentMatch = s.content.some((c) => c.toLowerCase().includes(q));
      const substepsMatch = s.substeps
        ? s.substeps.some(
            (sub) =>
              sub.title.toLowerCase().includes(q) ||
              sub.description.toLowerCase().includes(q) ||
              (sub.subitems && sub.subitems.some((item) => item.toLowerCase().includes(q)))
          )
        : false;

      return titleMatch || subtitleMatch || contentMatch || substepsMatch;
    });
  }, [activePolicy, searchQuery]);

  return (
    <div
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '1.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}
    >
      {/* Breadcrumb Header */}
      <PolicyHeader onBackToHub={onBackToHub} policyCount={FIRM_POLICIES.length} />

      {/* Policy Selector & Search */}
      <PolicySelectorTabs
        policies={FIRM_POLICIES}
        selectedPolicyId={selectedPolicyId}
        onSelectPolicy={setSelectedPolicyId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Policy Metadata Card */}
      <PolicyMetaCard policy={activePolicy} />

      {/* Sections List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredSections.length === 0 ? (
          <div
            style={{
              padding: '3rem',
              textAlign: 'center',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed var(--border)',
              color: 'var(--text-tertiary)',
              fontSize: '0.875rem'
            }}
          >
            Nenhuma diretriz ou seção encontrada para "{searchQuery}".
          </div>
        ) : (
          filteredSections.map((section, idx) => (
            <PolicySectionCard key={section.title} section={section} index={idx} />
          ))
        )}
      </div>

      {/* Optional Snippets (Voicemail/SMS scripts) */}
      {activePolicy.snippets && activePolicy.snippets.length > 0 && (
        <PolicySnippetsCard snippets={activePolicy.snippets} />
      )}
    </div>
  );
};
