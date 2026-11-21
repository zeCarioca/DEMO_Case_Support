import React from 'react';
import { Loader2, CheckCircle2, AlertTriangle, Download, X } from 'lucide-react';
import { MergeProgress } from '../types.js';
import { formatBytes } from '../utils/formatters.js';

interface PdfMergeModalProps {
  isOpen: boolean;
  isMerging: boolean;
  isCompleted: boolean;
  progress: MergeProgress | null;
  error: { message: string; itemId?: string; canSkip?: boolean } | null;
  outputFilename: string;
  mergedBytes: Uint8Array | null;
  onDownload: () => void;
  onCancel: () => void;
  onClose: () => void;
  onSkipError?: () => void;
}

export const PdfMergeModal: React.FC<PdfMergeModalProps> = ({
  isOpen,
  isMerging,
  isCompleted,
  progress,
  error,
  outputFilename,
  mergedBytes,
  onDownload,
  onCancel,
  onClose,
  onSkipError
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem'
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          maxWidth: '520px',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {isCompleted ? 'Mesclagem Concluída' : error ? 'Atenção na Mesclagem' : 'Mesclando Documentos PDF'}
          </h2>
          {(isCompleted || !!error) && (
            <button
              type="button"
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '0.25rem' }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Merging in Progress */}
          {isMerging && !error && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Loader2 size={36} className="animate-spin" style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Processando: {progress?.itemName || 'Preparando documentos...'}
                </p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
                  Item {progress?.currentIndex || 0} de {progress?.totalItems || 0}
                </p>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress?.percent || 0}%`, backgroundColor: 'var(--accent)', borderRadius: 'var(--radius-full)', transition: 'width 0.2s ease-in-out' }} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                {progress?.percent || 0}% Concluído
              </span>
            </div>
          )}

          {/* Error View */}
          {error && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <AlertTriangle size={20} style={{ color: '#e11d48', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Erro no arquivo</span>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{error.message}</p>
              </div>
            </div>
          )}

          {/* Success / Completed View */}
          {isCompleted && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={28} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Documento unificado com sucesso!</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
                  Arquivo: <code style={{ color: 'var(--text-primary)' }}>{outputFilename}</code>
                  {mergedBytes && ` (${formatBytes(mergedBytes.byteLength)})`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '1rem 1.5rem', backgroundColor: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.625rem' }}>
          {isMerging && (
            <button type="button" onClick={onCancel} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
              Cancelar
            </button>
          )}

          {error && (
            <>
              <button type="button" onClick={onClose} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                Fechar
              </button>
              {error.canSkip && onSkipError && (
                <button type="button" onClick={onSkipError} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--accent)', border: '1px solid transparent', borderRadius: 'var(--radius-md)', color: '#ffffff', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                  Pular este Arquivo e Continuar
                </button>
              )}
            </>
          )}

          {isCompleted && (
            <>
              <button type="button" onClick={onClose} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                Concluir
              </button>
              <button type="button" onClick={onDownload} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1.25rem', backgroundColor: 'var(--accent)', border: '1px solid transparent', borderRadius: 'var(--radius-md)', color: '#ffffff', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                <Download size={15} />
                Baixar PDF Mesclado
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
