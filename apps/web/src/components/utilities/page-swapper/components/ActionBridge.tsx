import React from 'react';
import { ArrowRight, Loader2, Replace } from 'lucide-react';

interface ActionBridgeProps {
  canSwap: boolean;
  isSwapping: boolean;
  sigPage?: number;
  docPage?: number;
  onExecuteSwap: () => void;
}

export const ActionBridge: React.FC<ActionBridgeProps> = ({
  canSwap,
  isSwapping,
  sigPage,
  docPage,
  onExecuteSwap
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '0 0.5rem',
        zIndex: 2
      }}
    >
      {/* Direction badge if both pages are known */}
      {sigPage !== undefined && docPage !== undefined && (
        <div
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums',
            color: 'var(--text-tertiary)',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-full)',
            padding: '0.25rem 0.625rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}
        >
          <span>Pág. {sigPage}</span>
          <ArrowRight size={12} />
          <span>Pág. {docPage}</span>
        </div>
      )}

      {/* Main Swap Button */}
      <button
        type="button"
        onClick={onExecuteSwap}
        disabled={!canSwap || isSwapping}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: canSwap && !isSwapping ? 'var(--accent)' : 'var(--bg-subtle)',
          color: canSwap && !isSwapping ? '#FFFFFF' : 'var(--text-tertiary)',
          border: '1px solid',
          borderColor: canSwap && !isSwapping ? 'var(--accent)' : 'var(--border)',
          fontSize: '0.875rem',
          fontWeight: 700,
          cursor: canSwap && !isSwapping ? 'pointer' : 'not-allowed',
          boxShadow:
            canSwap && !isSwapping
              ? '0 4px 12px rgba(28, 25, 23, 0.15)'
              : 'none',
          transition: 'all 0.15s ease',
          whiteSpace: 'nowrap'
        }}
      >
        {isSwapping ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Processando...</span>
          </>
        ) : (
          <>
            <Replace size={16} />
            <span>Swap Page →</span>
          </>
        )}
      </button>

      {/* Informative micro-copy */}
      <span
        style={{
          fontSize: '0.6875rem',
          color: 'var(--text-tertiary)',
          textAlign: 'center',
          maxWidth: '120px',
          lineHeight: 1.3
        }}
      >
        Substitui a página no documento
      </span>
    </div>
  );
};
