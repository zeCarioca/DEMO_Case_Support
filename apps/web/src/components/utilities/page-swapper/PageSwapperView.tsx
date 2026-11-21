import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { LoadedDocState, SwapExecutionResult } from './types.js';
import { PageSwapperHeader } from './components/PageSwapperHeader.js';
import { DocumentPanel } from './components/DocumentPanel.js';
import { ActionBridge } from './components/ActionBridge.js';
import { SwappedSuccessBanner } from './components/SwappedSuccessBanner.js';
import { executePageSwap } from './utils/swap-engine.js';
import { useSwapperDemo } from './hooks/useSwapperDemo.js';

interface PageSwapperViewProps {
  onBackToHub: () => void;
  initialDemo?: boolean;
}

export const PageSwapperView: React.FC<PageSwapperViewProps> = ({ onBackToHub, initialDemo = false }) => {
  const [sigDoc, setSigDoc] = useState<LoadedDocState | null>(null);
  const [targetDoc, setTargetDoc] = useState<LoadedDocState | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapResult, setSwapResult] = useState<SwapExecutionResult | null>(null);
  const [isSwapCompleted, setIsSwapCompleted] = useState(false);

  // Demo auto-runner hook
  const { isDemoLoading, runDemo } = useSwapperDemo({
    setSigDoc,
    setTargetDoc,
    setIsSwapCompleted,
    setSwapResult,
    initialDemo
  });

  // Load and parse signature file (PDF or PNG/JPG)
  const handleSignatureFileSelected = async (file: File) => {
    const isImage = file.type.startsWith('image/') || /\.(png|jpe?g)$/i.test(file.name);
    const buffer = await file.arrayBuffer();

    let totalPages = 1;
    if (!isImage) {
      try {
        const doc = await PDFDocument.load(buffer);
        totalPages = doc.getPageCount();
      } catch (err: any) {
        alert(`Erro ao ler PDF de assinatura: ${err?.message || 'Arquivo corrompido ou protegido.'}`);
        return;
      }
    }

    setSigDoc({
      file,
      name: file.name,
      size: file.size,
      kind: isImage ? 'image' : 'pdf',
      arrayBuffer: buffer,
      totalPages,
      currentPage: 1
    });
  };

  // Load and parse target document file (PDF only)
  const handleTargetFileSelected = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      alert('O documento principal deve ser um arquivo PDF válido (.pdf).');
      return;
    }

    const buffer = await file.arrayBuffer();
    try {
      const doc = await PDFDocument.load(buffer);
      const totalPages = doc.getPageCount();

      setTargetDoc({
        file,
        name: file.name,
        size: file.size,
        kind: 'pdf',
        arrayBuffer: buffer,
        totalPages,
        currentPage: 1
      });
      // Reset swap state on new target file
      setIsSwapCompleted(false);
      setSwapResult(null);
    } catch (err: any) {
      alert(`Erro ao ler documento principal: ${err?.message || 'Arquivo corrompido ou protegido.'}`);
    }
  };

  const handleExecuteSwap = async () => {
    if (!sigDoc || !targetDoc || isSwapping) return;

    setIsSwapping(true);
    try {
      const result = await executePageSwap({
        sigBuffer: sigDoc.arrayBuffer.slice(0),
        sigKind: sigDoc.kind,
        sigPage: sigDoc.currentPage,
        docBuffer: targetDoc.arrayBuffer.slice(0),
        docPage: targetDoc.currentPage
      });

      setSwapResult(result);
      setIsSwapCompleted(true);

      // In-place update: update targetDoc buffer with new swapped PDF
      // and keep view focused on the swapped page
      const updatedBuffer = result.pdfBytes.buffer.slice(
        result.pdfBytes.byteOffset,
        result.pdfBytes.byteOffset + result.pdfBytes.byteLength
      ) as ArrayBuffer;

      setTargetDoc((prev) =>
        prev
          ? {
              ...prev,
              arrayBuffer: updatedBuffer,
              size: result.pdfBytes.byteLength,
              totalPages: result.totalPages,
              currentPage: result.swappedTargetPage
            }
          : null
      );
    } catch (err: any) {
      alert(`Falha ao executar a substituição da página: ${err?.message || 'Erro desconhecido'}`);
    } finally {
      setIsSwapping(false);
    }
  };

  const handleDownload = (filename: string) => {
    if (!swapResult) return;
    const blob = new Blob([swapResult.pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleResetSession = () => {
    setSigDoc(null);
    setTargetDoc(null);
    setSwapResult(null);
    setIsSwapCompleted(false);
  };

  const getDefaultOutputFilename = (): string => {
    if (!targetDoc) return 'documento-assinado.pdf';
    const base = targetDoc.name.replace(/\.[^/.]+$/, '');
    return `${base}-signed.pdf`;
  };

  const canSwap = Boolean(sigDoc && targetDoc && !isSwapCompleted);

  return (
    <div
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}
    >
      <PageSwapperHeader
        onBackToHub={onBackToHub}
        onRunDemo={runDemo}
        isDemoLoading={isDemoLoading}
      />

      {/* Success banner shown post-swap */}
      {isSwapCompleted && swapResult && (
        <SwappedSuccessBanner
          defaultFilename={getDefaultOutputFilename()}
          swappedPage={swapResult.swappedTargetPage}
          totalPages={swapResult.totalPages}
          onDownload={handleDownload}
          onResetSession={handleResetSession}
        />
      )}

      {/* Split Panel Layout with Center Action Bridge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '1rem',
          minHeight: '560px',
          flexWrap: 'wrap'
        }}
      >
        {/* Left Panel: Signature Goes Here */}
        <DocumentPanel
          panelTitle="Folha de Assinatura"
          panelRole="signature"
          badgeText="signature goes here"
          docState={sigDoc}
          accept=".pdf,image/png,image/jpeg"
          onFileSelected={handleSignatureFileSelected}
          onClearFile={() => setSigDoc(null)}
          onPageChange={(page) => setSigDoc((prev) => (prev ? { ...prev, currentPage: page } : null))}
        />

        {/* Center Action Bridge */}
        <ActionBridge
          canSwap={canSwap}
          isSwapping={isSwapping}
          sigPage={sigDoc?.currentPage}
          docPage={targetDoc?.currentPage}
          onExecuteSwap={handleExecuteSwap}
        />

        {/* Right Panel: Document Goes Here */}
        <DocumentPanel
          panelTitle="Documento Principal"
          panelRole="target"
          badgeText="document goes here"
          docState={targetDoc}
          accept=".pdf"
          onFileSelected={handleTargetFileSelected}
          onClearFile={() => {
            setTargetDoc(null);
            setIsSwapCompleted(false);
            setSwapResult(null);
          }}
          onPageChange={(page) =>
            setTargetDoc((prev) => (prev ? { ...prev, currentPage: page } : null))
          }
          isSwapCompleted={isSwapCompleted}
        />
      </div>
    </div>
  );
};
