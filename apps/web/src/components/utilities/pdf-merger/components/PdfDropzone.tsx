import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, FileText } from 'lucide-react';
import { isSupportedImageFile } from '../utils/image-helper.js';

interface PdfDropzoneProps {
  onFilesAdded: (files: File[]) => void;
  disabled?: boolean;
}

export const PdfDropzone: React.FC<PdfDropzoneProps> = ({ onFilesAdded, disabled }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filterAcceptedFiles = (fileList: FileList | null): File[] => {
    if (!fileList) return [];
    return Array.from(fileList).filter((file) => {
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      const isImage = isSupportedImageFile(file);
      return isPdf || isImage;
    });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;

    const acceptedFiles = filterAcceptedFiles(e.dataTransfer.files);
    if (acceptedFiles.length > 0) {
      onFilesAdded(acceptedFiles);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const acceptedFiles = filterAcceptedFiles(e.target.files);
    if (acceptedFiles.length > 0) {
      onFilesAdded(acceptedFiles);
    }
    // Reset file input value so same files can be re-selected if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && fileInputRef.current?.click()}
      style={{
        border: `2px dashed ${isDragOver ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)',
        backgroundColor: isDragOver ? 'var(--accent-subtle)' : 'var(--bg-surface)',
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.875rem'
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,application/pdf,image/png,image/jpeg,image/jpg,.png,.jpg,.jpeg"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />

      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: isDragOver ? 'var(--accent)' : 'var(--bg-subtle)',
          color: isDragOver ? '#ffffff' : 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.15s ease-in-out'
        }}
      >
        {isDragOver ? <FileText size={24} /> : <UploadCloud size={24} />}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          Drop PDF files or images (PNG, JPG) here, or{' '}
          <span style={{ color: 'var(--accent)', textDecoration: 'underline' }}>click to browse</span>
        </p>
        <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
          Supports PDF documents and image files (PNG, JPG). 100% private, processed in-browser.
        </p>
      </div>
    </div>
  );
};


