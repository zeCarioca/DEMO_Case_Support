import React from 'react';
import { Calendar, UserCheck, Shield, Target, Compass } from 'lucide-react';
import { PolicyDocument } from './data/policyTypes.js';

interface PolicyMetaCardProps {
  policy: PolicyDocument;
}

export const PolicyMetaCard: React.FC<PolicyMetaCardProps> = ({ policy }) => {
  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--bg-surface)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        boxShadow: 'var(--shadow-level-1)'
      }}
    >
      {/* Title & Metadata Badges */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          {policy.code && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.1875rem 0.5rem',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'var(--sticker-blue-bg)',
                color: '#0070f3'
              }}
            >
              {policy.code}
            </span>
          )}
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.1875rem 0.5rem',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-secondary)'
            }}
          >
            {policy.area}
          </span>
          {policy.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.6875rem',
                color: 'var(--text-ghost)',
                border: '1px solid var(--border-subtle)',
                padding: '0.125rem 0.375rem',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          {policy.title}
        </h2>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8125rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
          Original: {policy.originalTitle}
        </p>
      </div>

      {/* Audit & Responsibility Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.875rem',
          padding: '0.875rem 1rem',
          backgroundColor: 'var(--bg-page)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={15} style={{ color: 'var(--text-tertiary)' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-ghost)', textTransform: 'uppercase' }}>
              Data de Vigência
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {policy.creationDate} {policy.revisionDate && `(Rev. ${policy.revisionDate})`}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserCheck size={15} style={{ color: 'var(--text-tertiary)' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-ghost)', textTransform: 'uppercase' }}>
              Elaborado por
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {policy.createdBy}
            </span>
          </div>
        </div>

        {policy.reviewedBy && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={15} style={{ color: 'var(--text-tertiary)' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-ghost)', textTransform: 'uppercase' }}>
                Revisado por
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {policy.reviewedBy}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Objective & Scope Blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
          <Target size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Objetivo:
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {policy.objective}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
          <Compass size={16} style={{ color: 'var(--text-tertiary)', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Escopo de Aplicação:
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {policy.scope}
            </span>
          </div>
        </div>

        {policy.concept && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-subtle)',
              borderLeft: '3px solid var(--accent)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5
            }}
          >
            <strong>Conceito Institucional:</strong> {policy.concept}
          </div>
        )}
      </div>
    </div>
  );
};
