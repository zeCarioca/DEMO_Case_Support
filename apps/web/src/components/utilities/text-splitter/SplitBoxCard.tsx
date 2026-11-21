import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { SplitBoxItem } from './textSplitter.js';

interface SplitBoxCardProps {
  item: SplitBoxItem;
  maxChars: number;
}

export const SplitBoxCard: React.FC<SplitBoxCardProps> = ({ item, maxChars }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = item.text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isExactMax = item.charCount === maxChars;

  return (
    <div
      className="notion-card"
      style={{
        padding: '0.875rem 1rem',
        borderRadius: 'var(--radius-md)',
        backgroundColor: copied ? 'rgba(35, 134, 54, 0.08)' : 'var(--bg-surface)',
        borderColor: copied ? 'var(--sticker-green-text)' : 'var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.625rem',
        transition: 'all 0.15s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            className="badge"
            style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-secondary)',
              borderColor: 'var(--border)'
            }}
          >
            #{String(item.index).padStart(2, '0')}
          </span>

          <span
            className="badge"
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              backgroundColor: isExactMax ? 'rgba(42, 157, 153, 0.12)' : 'var(--bg-subtle)',
              color: isExactMax ? 'var(--sticker-teal)' : 'var(--text-tertiary)',
              borderColor: isExactMax ? 'rgba(42, 157, 153, 0.3)' : 'var(--border)'
            }}
          >
            {item.charCount} / {maxChars} chars
          </span>

          {item.isHyphenated && (
            <span
              className="badge"
              style={{
                fontSize: '0.6875rem',
                backgroundColor: 'rgba(214, 182, 246, 0.2)',
                color: 'var(--sticker-purple-deep)',
                borderColor: 'rgba(214, 182, 246, 0.4)'
              }}
              title="Palavra dividida com hífen (-)"
            >
              Hifenizado (-)
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="btn"
          style={{
            padding: '0.25rem 0.625rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            borderRadius: 'var(--radius-sm)',
            backgroundColor: copied ? 'var(--sticker-green-text)' : 'var(--bg-subtle)',
            color: copied ? '#ffffff' : 'var(--text-secondary)',
            borderColor: copied ? 'var(--sticker-green-text)' : 'var(--border)',
            gap: '0.35rem'
          }}
          title="Copiar este bloco"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span>{copied ? 'Copiado!' : 'Copiar'}</span>
        </button>
      </div>

      <div
        onClick={handleCopy}
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.875rem',
          color: 'var(--text-primary)',
          backgroundColor: 'var(--bg-subtle)',
          padding: '0.625rem 0.75rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          cursor: 'pointer',
          lineHeight: '1.4'
        }}
        title="Clique para copiar"
      >
        {item.text}
      </div>
    </div>
  );
};
