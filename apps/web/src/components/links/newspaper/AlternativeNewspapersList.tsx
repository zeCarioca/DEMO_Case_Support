import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { PermNewspaperResult } from '@case-support/shared-types';

interface AlternativeNewspapersListProps {
  alternatives: PermNewspaperResult[];
}

export const AlternativeNewspapersList: React.FC<AlternativeNewspapersListProps> = ({ alternatives }) => {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <div style={{ marginTop: '1.25rem' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
        Outras Publicações Avaliadas na Mesma Região ({alternatives.length})
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '0.75rem'
        }}
      >
        {alternatives.map((alt) => (
          <div
            key={alt.id}
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {alt.name}
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                Tiragem: {alt.sunday_circulation > 0 ? `${alt.sunday_circulation.toLocaleString()} ex.` : 'Periódico'} • {alt.headquarters_city || 'Local'}
              </div>
            </div>

            {alt.website_url && (
              <a
                href={alt.website_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--text-tertiary)',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title={`Visitar website de ${alt.name}`}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
