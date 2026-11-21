import React, { useState } from 'react';
import { Copy, Check, RefreshCw, AlertCircle, Sparkles, History } from 'lucide-react';
import { SavedDraft } from './types.js';
import { HistoryDropdown } from './HistoryDropdown.js';

interface CaseTemplateEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  isManualOverride: boolean;
  onResync: () => void;
  draftHistory: SavedDraft[];
  onRestoreDraft: (draft: SavedDraft) => void;
  onDeleteDraft: (id: string) => void;
  onClearHistory: () => void;
}

export const CaseTemplateEditor: React.FC<CaseTemplateEditorProps> = ({
  value,
  onChange,
  isManualOverride,
  onResync,
  draftHistory,
  onRestoreDraft,
  onDeleteDraft,
  onClearHistory
}) => {
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lineCount = value ? value.split('\n').length : 0;
  const charCount = value ? value.length : 0;

  return (
    <div
      className="notion-card"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
        backgroundColor: 'var(--bg-surface)'
      }}
    >
      {/* Editor Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Generated Case Note (Editable)
          </h3>
          {isManualOverride && (
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--sticker-orange-bg)',
                color: 'var(--sticker-orange-text)',
                border: '1px solid rgba(217, 115, 13, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
              title="You edited the text directly. Form changes will not overwrite until you re-sync."
            >
              <AlertCircle size={11} />
              Manually Modified
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setShowHistory((prev) => !prev)}
            className="btn"
            title="View revision history"
            style={{
              padding: '0.375rem 0.625rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              backgroundColor: showHistory ? 'var(--bg-hover)' : 'var(--bg-subtle)',
              color: 'var(--text-secondary)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <History size={12} />
            History ({draftHistory.length})
          </button>

          {isManualOverride && (
            <button
              type="button"
              onClick={onResync}
              className="btn"
              title="Discard manual edits and re-sync from form fields"
              style={{
                padding: '0.375rem 0.625rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <RefreshCw size={12} />
              Re-sync from Form
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="btn"
            disabled={!value}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              backgroundColor: copied ? 'var(--sticker-green-bg)' : 'var(--accent)',
              color: copied ? 'var(--sticker-green-text)' : '#ffffff',
              fontSize: '0.8125rem',
              cursor: value ? 'pointer' : 'not-allowed',
              fontWeight: 500,
              opacity: value ? 1 : 0.6,
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Note Copied!' : 'Copy Generated Note'}
          </button>
        </div>
      </div>

      {/* Recent Drafts Dropdown / Drawer */}
      {showHistory && (
        <HistoryDropdown
          draftHistory={draftHistory}
          onRestoreDraft={onRestoreDraft}
          onDeleteDraft={onDeleteDraft}
          onClearAll={onClearHistory}
          onClose={() => setShowHistory(false)}
        />
      )}

      {/* Editable Text Area */}
      <div style={{ position: 'relative', flex: 1, minHeight: '340px', display: 'flex' }}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Fill in the fields on the left to generate the case note..."
          style={{
            width: '100%',
            minHeight: '340px',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: isManualOverride
              ? '1px solid var(--sticker-orange-text)'
              : '1px solid var(--border)',
            backgroundColor: 'var(--bg-subtle)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            lineHeight: 1.6,
            resize: 'vertical',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Footer stats & instructions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          fontSize: '0.75rem',
          color: 'var(--text-dim)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Sparkles size={12} style={{ color: 'var(--sticker-yellow-text)' }} />
          <span>Empty fields and their headers are automatically omitted.</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>
          <span>{lineCount} {lineCount === 1 ? 'line' : 'lines'}</span>
          <span>•</span>
          <span>{charCount} characters</span>
        </div>
      </div>
    </div>
  );
};
