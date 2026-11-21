import React from 'react';
import { X, ShieldCheck, History, Trash2, Cpu } from 'lucide-react';
import { BatchHistoryEntry, MAX_HISTORY_BATCHES } from '../types.js';
import { PdfBatchHistoryCard } from './PdfBatchHistoryCard.js';

interface PdfBatchHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  batches: BatchHistoryEntry[];
  onRestoreBatch: (batchId: string) => void;
  onDeleteBatch: (batchId: string) => void;
  onClearHistory: () => void;
  isRestoring?: boolean;
}

export const PdfBatchHistoryModal: React.FC<PdfBatchHistoryModalProps> = ({
  isOpen,
  onClose,
  batches,
  onRestoreBatch,
  onDeleteBatch,
  onClearHistory,
  isRestoring
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
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          maxWidth: '640px',
          width: '100%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <History size={16} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Histórico de Lotes
              </h2>
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '0.15rem 0.5rem',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600
                }}
              >
                {batches.length} de {MAX_HISTORY_BATCHES} lotes
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--text-tertiary)',
              cursor: 'pointer',
              padding: '0.25rem'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Informative Security & Privacy Banners */}
        <div
          style={{
            padding: '0.875rem 1.5rem',
            backgroundColor: 'var(--bg-subtle)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#10b981' }}>
            <ShieldCheck size={16} style={{ flexShrink: 0 }} />
            <span>
              <strong>100% Local & Seguro:</strong> Os lotes são armazenados exclusivamente na memória do seu navegador. Nenhum arquivo é transferido para a rede.
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            <Cpu size={15} style={{ flexShrink: 0 }} />
            <span>
              Limite fixado nos últimos <strong>{MAX_HISTORY_BATCHES} lotes</strong> para prevenir saturação de memória e assegurar alto desempenho.
            </span>
          </div>
        </div>

        {/* Batches Content List */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.875rem',
            flex: 1
          }}
        >
          {batches.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem 1rem',
                textAlign: 'center',
                gap: '0.75rem'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <History size={22} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Nenhum lote recente salvo
                </p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8125rem', color: 'var(--text-tertiary)', maxWidth: '340px' }}>
                  Quando você selecionar arquivos ou mesclar um lote, ele será salvo localmente e aparecerá aqui.
                </p>
              </div>
            </div>
          ) : (
            batches.map((batch) => (
              <PdfBatchHistoryCard
                key={batch.id}
                batch={batch}
                onRestore={onRestoreBatch}
                onDelete={onDeleteBatch}
                isRestoring={isRestoring}
              />
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.5rem',
            backgroundColor: 'var(--bg-subtle)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {batches.length > 0 ? (
            <button
              type="button"
              onClick={onClearHistory}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.375rem 0.625rem',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--text-tertiary)',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              <Trash2 size={13} />
              Limpar todo o histórico
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.5rem 1.25rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

