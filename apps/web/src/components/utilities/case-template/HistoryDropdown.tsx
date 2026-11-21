import React, { useState } from 'react';
import { Search, Trash2, ArrowDownLeft, X, Clock } from 'lucide-react';
import { SavedDraft } from './types.js';

interface HistoryDropdownProps {
  draftHistory: SavedDraft[];
  onRestoreDraft: (draft: SavedDraft) => void;
  onDeleteDraft: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export const HistoryDropdown: React.FC<HistoryDropdownProps> = ({
  draftHistory,
  onRestoreDraft,
  onDeleteDraft,
  onClearAll,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = draftHistory.filter((draft) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      draft.label.toLowerCase().includes(term) ||
      draft.formattedText.toLowerCase().includes(term)
    );
  });

  return (
    <div
      style={{
        padding: '0.75rem',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.625rem',
        boxShadow: 'var(--shadow-md)'
      }}
    >
      {/* Header with Search and Clear Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Clock size={13} style={{ color: 'var(--text-secondary)' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Revision History ({draftHistory.length} / 100)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          {draftHistory.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all saved revision history?')) {
                  onClearAll();
                }
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--sticker-red-text)',
                fontSize: '0.6875rem',
                cursor: 'pointer',
                padding: '0.2rem 0.4rem',
                borderRadius: 'var(--radius-xs)'
              }}
              title="Clear all stored drafts"
            >
              Clear All
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-dim)',
              cursor: 'pointer',
              padding: '0.15rem'
            }}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Search Filter Input */}
      {draftHistory.length > 3 && (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={13} style={{ position: 'absolute', left: '0.5rem', color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search by petitioner, category, or note contents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.35rem 0.5rem 0.35rem 1.75rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontSize: '0.75rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>
      )}

      {/* Scrollable Drafts List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.375rem',
          maxHeight: '260px',
          overflowY: 'auto',
          paddingRight: '0.25rem'
        }}
      >
        {filtered.length === 0 ? (
          <div style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            No drafts match your search.
          </div>
        ) : (
          filtered.map((draft) => (
            <div
              key={draft.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.4rem 0.5rem',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                gap: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1 }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {draft.label}
                </span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-dim)' }}>
                  {new Date(draft.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}{' '}
                  {new Date(draft.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    onRestoreDraft(draft);
                    onClose();
                  }}
                  className="btn"
                  title="Restore this draft into editor & form"
                  style={{
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.6875rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--accent)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}
                >
                  <ArrowDownLeft size={11} />
                  Restore
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteDraft(draft.id)}
                  style={{
                    padding: '0.2rem 0.35rem',
                    fontSize: '0.6875rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-dim)',
                    cursor: 'pointer'
                  }}
                  title="Delete this revision"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

