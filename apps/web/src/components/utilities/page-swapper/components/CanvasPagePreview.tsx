import React, { useRef, useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Loader2, AlertCircle } from 'lucide-react';
import { SupportedFileKind } from '../types.js';
import { useSinglePageRenderer } from '../hooks/useSinglePageRenderer.js';

interface CanvasPagePreviewProps {
  arrayBuffer: ArrayBuffer | null;
  kind: SupportedFileKind;
  imageFile?: File;
  pageNumber: number;
}

export const CanvasPagePreview: React.FC<CanvasPagePreviewProps> = ({
  arrayBuffer,
  kind,
  imageFile,
  pageNumber
}) => {
  const [zoom, setZoom] = useState(0.85);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { isLoading, error, pageDimensions } = useSinglePageRenderer({
    arrayBuffer: kind === 'pdf' ? arrayBuffer : null,
    pageNumber,
    zoom,
    canvasRef
  });

  const handleZoomIn = () => setZoom((z) => Math.min(2.0, Number((z + 0.15).toFixed(2))));
  const handleZoomOut = () => setZoom((z) => Math.max(0.4, Number((z - 0.15).toFixed(2))));
  const handleResetZoom = () => setZoom(0.85);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '440px',
        backgroundColor: '#F5F5F4',
        borderRadius: 'var(--radius-md)',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.5rem',
        border: '1px solid var(--border)'
      }}
    >
      {/* Zoom Controls Overlay */}
      <div
        style={{
          position: 'sticky',
          top: '0.5rem',
          alignSelf: 'flex-end',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(6px)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.25rem 0.375rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          zIndex: 10
        }}
      >
        <button
          type="button"
          onClick={handleZoomOut}
          title="Diminuir Zoom"
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: '0.25rem',
            borderRadius: '4px',
            color: 'var(--text-secondary)',
            display: 'flex'
          }}
        >
          <ZoomOut size={14} />
        </button>
        <span
          style={{
            fontSize: '0.6875rem',
            fontVariantNumeric: 'tabular-nums',
            color: 'var(--text-secondary)',
            minWidth: '38px',
            textAlign: 'center',
            fontWeight: 600
          }}
        >
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={handleZoomIn}
          title="Aumentar Zoom"
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: '0.25rem',
            borderRadius: '4px',
            color: 'var(--text-secondary)',
            display: 'flex'
          }}
        >
          <ZoomIn size={14} />
        </button>
        <button
          type="button"
          onClick={handleResetZoom}
          title="Ajustar Escala"
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: '0.25rem',
            borderRadius: '4px',
            color: 'var(--text-tertiary)',
            display: 'flex'
          }}
        >
          <RotateCcw size={12} />
        </button>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(250, 250, 249, 0.65)',
            zIndex: 5
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: 'var(--text-secondary)'
            }}
          >
            <Loader2 size={16} className="animate-spin" />
            <span>Renderizando página...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div
          style={{
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1.5rem',
            color: 'var(--color-danger, #DC2626)',
            fontSize: '0.8125rem',
            textAlign: 'center'
          }}
        >
          <AlertCircle size={24} />
          <span>{error}</span>
        </div>
      )}

      {/* Content Rendering: Image vs Canvas PDF */}
      <div
        style={{
          margin: 'auto 0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)',
          backgroundColor: '#FFFFFF',
          borderRadius: '2px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          transition: 'transform 0.15s ease'
        }}
      >
        {kind === 'image' && imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Página de assinatura escaneada"
            style={{
              maxWidth: `${Math.round(600 * zoom)}px`,
              maxHeight: `${Math.round(800 * zoom)}px`,
              objectFit: 'contain',
              display: 'block'
            }}
          />
        ) : (
          <canvas
            ref={canvasRef}
            style={{
              display: 'block',
              maxWidth: '100%'
            }}
          />
        )}
      </div>

      {/* Dimensions footer note */}
      {pageDimensions && (
        <div
          style={{
            marginTop: '0.75rem',
            fontSize: '0.6875rem',
            color: 'var(--text-tertiary)',
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          Dimensões: {pageDimensions.width} × {pageDimensions.height} pt
        </div>
      )}
    </div>
  );
};
