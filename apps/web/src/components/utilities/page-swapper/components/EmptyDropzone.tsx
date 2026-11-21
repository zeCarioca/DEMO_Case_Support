import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface EmptyDropzoneProps {
  title: string;
  subtitle: string;
  accept: string;
  icon?: React.ReactNode;
  onFileSelected: (file: File) => void;
}

export const EmptyDropzone: React.FC<EmptyDropzoneProps> = ({
  title,
  subtitle,
  accept,
  icon,
  onFileSelected
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onFileSelected(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onFileSelected(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.875rem',
        padding: '3rem 2rem',
        borderRadius: 'var(--radius-lg)',
        border: isDragOver
          ? '2px dashed var(--accent)'
          : '2px dashed var(--border-strong, #D6D3D1)',
        backgroundColor: isDragOver ? '#F5F5F4' : 'var(--bg-subtle)',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        minHeight: '380px',
        textAlign: 'center'
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
        }}
      >
        {icon || <UploadCloud size={24} />}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <span
          style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'var(--text-primary)'
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: '0.8125rem',
            color: 'var(--text-tertiary)',
            maxWidth: '280px',
            lineHeight: 1.4
          }}
        >
          {subtitle}
        </span>
      </div>

      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--accent)',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border)',
          padding: '0.375rem 0.875rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
        }}
      >
        Selecionar Arquivo
      </span>
    </div>
  );
};
