import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PolicySection } from './data/policyTypes.js';

interface PolicySectionCardProps {
  section: PolicySection;
  index: number;
}

export const PolicySectionCard: React.FC<PolicySectionCardProps> = ({ section, index }) => {
  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--bg-surface)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: 'var(--shadow-level-0)'
      }}
    >
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <div
          style={{
            minWidth: '24px',
            height: '24px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            marginTop: '2px'
          }}
        >
          {index + 1}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {section.title}
          </h3>
          {section.subtitle && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>
              {section.subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Main Content Paragraphs */}
      {section.content.map((paragraph, i) => (
        <p key={i} style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {paragraph}
        </p>
      ))}

      {/* Substeps if present */}
      {section.substeps && section.substeps.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.25rem' }}>
          {section.substeps.map((substep, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.875rem 1rem',
                backgroundColor: 'var(--bg-page)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div
                style={{
                  minWidth: '32px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  paddingTop: '2px'
                }}
              >
                {substep.code || `${index + 1}.${i + 1}`}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {substep.title}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {substep.description}
                </span>

                {/* Subitems */}
                {substep.subitems && substep.subitems.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginTop: '0.5rem', paddingLeft: '0.25rem' }}>
                    {substep.subitems.map((sub, sIdx) => (
                      <div key={sIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.375rem' }}>
                        <CheckCircle2 size={13} style={{ color: 'var(--sticker-green-text)', marginTop: '2px', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', lineHeight: 1.45 }}>
                          {sub}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Warning Callout */}
      {section.warning && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.625rem',
            padding: '0.875rem 1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--sticker-red-bg)',
            border: '1px solid rgba(224, 62, 62, 0.25)',
            color: 'var(--sticker-red-text)',
            fontSize: '0.75rem',
            lineHeight: 1.5
          }}
        >
          <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{section.warning}</span>
        </div>
      )}
    </div>
  );
};
