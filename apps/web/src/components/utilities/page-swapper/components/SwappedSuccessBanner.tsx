import React, { useState } from 'react';
import { CheckCircle2, Download, RotateCcw, FileCheck } from 'lucide-react';

interface SwappedSuccessBannerProps {
  defaultFilename: string;
  swappedPage: number;
  totalPages: number;
  onDownload: (filename: string) => void;
  onResetSession: () => void;
}

export const SwappedSuccessBanner: React.FC<SwappedSuccessBannerProps> = ({
  defaultFilename,
  swappedPage,
  totalPages,
  onDownload,
  onResetSession
}) => {
  const [filename, setFilename] = useState(defaultFilename);

  const handleDownloadClick = () => {
    const finalName = filename.trim().endsWith('.pdf')
      ? filename.trim()
      : `${filename.trim()}.pdf`;
    onDownload(finalName);
  };

  return (
    <div
      style={{
        backgroundColor: '#F0FDF4',
        border: '1px solid #BBF7D0',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: '0 2px 8px rgba(22, 101, 52, 0.06)'
      }}
    >
      {/* Top Status Line */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#DCFCE7',
              color: '#15803D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <CheckCircle2 size={18} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#14532D' }}>
              Página {swappedPage} substituída com sucesso!
            </span>
            <span style={{ fontSize: '0.8125rem', color: '#166534' }}>
              A folha de assinatura foi incorporada preservando a integridade das {totalPages} páginas do documento.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onResetSession}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid #BBF7D0',
            borderRadius: 'var(--radius-md)',
            padding: '0.375rem 0.75rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#166534',
            cursor: 'pointer'
          }}
        >
          <RotateCcw size={13} />
          Nova Sessão
        </button>
      </div>

      {/* Action Row: Filename input + Download Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          borderTop: '1px solid #DCFCE7',
          paddingTop: '0.875rem'
        }}
      >
        <div style={{ flex: 1, minWidth: '260px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label
            htmlFor="output-pdf-name"
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#14532D',
              whiteSpace: 'nowrap'
            }}
          >
            Nome do Arquivo:
          </label>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              border: '1px solid #86EFAC',
              borderRadius: 'var(--radius-md)',
              padding: '0.375rem 0.625rem',
              gap: '0.375rem'
            }}
          >
            <FileCheck size={15} style={{ color: '#15803D' }} />
            <input
              id="output-pdf-name"
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.8125rem',
                color: '#14532D',
                fontWeight: 500,
                backgroundColor: 'transparent'
              }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownloadClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#15803D',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            padding: '0.5rem 1.25rem',
            fontSize: '0.875rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(21, 128, 61, 0.25)',
            transition: 'background-color 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#166534')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#15803D')}
        >
          <Download size={16} />
          <span>Baixar PDF com Assinatura</span>
        </button>
      </div>
    </div>
  );
};
