import React, { useState } from 'react';
import { Copy, Check, FileCheck, Info } from 'lucide-react';
import { GUIDANCE_CARDS, RAW_STANDARD_TEMPLATE } from './sampleData.js';

export const StandardTemplateTab: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(RAW_STANDARD_TEMPLATE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = RAW_STANDARD_TEMPLATE;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* 4 Guidance Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem'
        }}
      >
        {GUIDANCE_CARDS.map((card) => (
          <div
            key={card.step}
            className="notion-card"
            style={{
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              backgroundColor: 'var(--bg-surface)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  padding: '0.125rem 0.375rem',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--accent-ghost)',
                  border: '1px solid var(--accent-subtle)'
                }}
              >
                {card.step}
              </span>
              <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {card.title}
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Standard Template Reference Box */}
      <div
        className="notion-card"
        style={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: 'var(--bg-surface)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileCheck size={18} style={{ color: 'var(--accent)' }} />
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Universal Baseline Template (CMS Standard)
            </h3>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--sticker-yellow-bg)',
                color: 'var(--sticker-yellow-text)',
                border: '1px solid rgba(223, 171, 1, 0.25)'
              }}
            >
              Ready for CMS / MyCase
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="btn"
            style={{
              padding: '0.4375rem 0.875rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              backgroundColor: copied ? 'var(--sticker-green-bg)' : 'var(--bg-subtle)',
              color: copied ? 'var(--sticker-green-text)' : 'var(--text-primary)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Template Copied!' : 'Copy Template'}
          </button>
        </div>

        <pre
          style={{
            margin: 0,
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            lineHeight: 1.6,
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap',
            overflowX: 'auto'
          }}
        >
          {RAW_STANDARD_TEMPLATE}
        </pre>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          <Info size={14} />
          <span>
            Tip: Switch to the <strong>⚡ Interactive Case Generator</strong> tab to fill in fields with automatic line omission and generate your custom note.
          </span>
        </div>
      </div>
    </div>
  );
};
