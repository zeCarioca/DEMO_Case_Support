import React from 'react';
import { FileText, PenTool, X, FileCheck } from 'lucide-react';
import { LoadedDocState } from '../types.js';
import { PanelTopControls } from './PanelTopControls.js';
import { EmptyDropzone } from './EmptyDropzone.js';
import { CanvasPagePreview } from './CanvasPagePreview.js';

interface DocumentPanelProps {
  panelTitle: string;
  panelRole: 'signature' | 'target';
  badgeText: string;
  docState: LoadedDocState | null;
  accept: string;
  onFileSelected: (file: File) => void;
  onClearFile: () => void;
  onPageChange: (newPage: number) => void;
  isSwapCompleted?: boolean;
}

export const DocumentPanel: React.FC<DocumentPanelProps> = ({
  panelTitle,
  panelRole,
  badgeText,
  docState,
  accept,
  onFileSelected,
  onClearFile,
  onPageChange,
  isSwapCompleted = false
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden'
      }}
    >
      {/* Panel Header */}
      <div
        style={{
          padding: '0.875rem 1.25rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          backgroundColor: 'var(--bg-subtle)'
        }}
      >
        {/* Title & Identification */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0 }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: panelRole === 'signature' ? '#EEF2FF' : '#F4F4F5',
              color: panelRole === 'signature' ? '#4F46E5' : 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {panelRole === 'signature' ? <PenTool size={15} /> : <FileText size={15} />}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)'
                }}
              >
                {panelTitle}
              </span>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  padding: '0.125rem 0.375rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)',
                  color: 'var(--text-tertiary)'
                }}
              >
                {badgeText}
              </span>
              {isSwapCompleted && panelRole === 'target' && (
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: '#15803D',
                    backgroundColor: '#DCFCE7',
                    padding: '0.125rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <FileCheck size={12} />
                  Página Atualizada
                </span>
              )}
            </div>

            {docState && (
              <span
                title={docState.name}
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-tertiary)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '220px'
                }}
              >
                {docState.name} ({formatFileSize(docState.size)})
              </span>
            )}
          </div>
        </div>

        {/* Top-Right Page Selector Controls & Clear */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          {docState && (
            <>
              <PanelTopControls
                currentPage={docState.currentPage}
                totalPages={docState.totalPages}
                onPageChange={onPageChange}
              />

              <button
                type="button"
                onClick={onClearFile}
                title="Remover arquivo e carregar outro"
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: '0.375rem',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#DC2626')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
              >
                <X size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Panel Body */}
      <div style={{ flex: 1, padding: '1rem', minHeight: '480px', display: 'flex' }}>
        {!docState ? (
          <EmptyDropzone
            title={
              panelRole === 'signature'
                ? 'Carregar Página de Assinatura'
                : 'Carregar Documento Original'
            }
            subtitle={
              panelRole === 'signature'
                ? 'Arraste a folha assinada (.pdf, .png, .jpg) para este painel'
                : 'Arraste o PDF completo (.pdf) no qual a folha será inserida'
            }
            accept={accept}
            icon={panelRole === 'signature' ? <PenTool size={22} /> : <FileText size={22} />}
            onFileSelected={onFileSelected}
          />
        ) : (
          <CanvasPagePreview
            arrayBuffer={docState.arrayBuffer}
            kind={docState.kind}
            imageFile={docState.file}
            pageNumber={docState.currentPage}
          />
        )}
      </div>
    </div>
  );
};
