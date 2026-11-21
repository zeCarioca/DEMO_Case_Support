import React from 'react';
import { Users, Crown } from 'lucide-react';
import { FORMS_TRANSLATIONS_TEAM } from './data/teamData.js';

export const TeamRosterBar: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1.25rem',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        flexWrap: 'wrap',
        boxShadow: 'var(--shadow-level-0)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '0.5rem' }}>
        <Users size={16} style={{ color: 'var(--text-tertiary)' }} />
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          Equipe de Forms / Translations:
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        {FORMS_TRANSLATIONS_TEAM.map((member) => (
          <div
            key={member.name}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.25rem 0.625rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: member.isLeader ? 'var(--sticker-purple-bg)' : 'var(--bg-page)',
              border: `1px solid ${member.isLeader ? 'var(--sticker-purple-text)' : 'var(--border)'}`,
              color: member.isLeader ? 'var(--sticker-purple-text)' : 'var(--text-secondary)',
              fontSize: '0.75rem',
              fontWeight: member.isLeader ? 600 : 500
            }}
          >
            {member.isLeader && <Crown size={12} style={{ color: 'var(--sticker-purple-text)' }} />}
            <span>{member.name}</span>
            {member.isLeader && (
              <span
                style={{
                  fontSize: '0.625rem',
                  textTransform: 'uppercase',
                  opacity: 0.85,
                  marginLeft: '2px',
                  fontWeight: 700
                }}
              >
                (Liderança)
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
