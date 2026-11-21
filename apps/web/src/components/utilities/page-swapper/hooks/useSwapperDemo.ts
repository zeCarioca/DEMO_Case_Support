import { useState, useEffect, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { LoadedDocState, SwapExecutionResult } from '../types.js';
import { generatePageSwapperDemoFiles } from '../../demo/demoPdfGenerator.js';

interface UseSwapperDemoProps {
  setSigDoc: React.Dispatch<React.SetStateAction<LoadedDocState | null>>;
  setTargetDoc: React.Dispatch<React.SetStateAction<LoadedDocState | null>>;
  setIsSwapCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  setSwapResult: React.Dispatch<React.SetStateAction<SwapExecutionResult | null>>;
  initialDemo?: boolean;
}

export function useSwapperDemo({
  setSigDoc,
  setTargetDoc,
  setIsSwapCompleted,
  setSwapResult,
  initialDemo = false
}: UseSwapperDemoProps) {
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const hasAutoRunRef = useRef(false);

  const runDemo = async () => {
    setIsDemoLoading(true);
    try {
      const { targetFile, sigFile } = await generatePageSwapperDemoFiles();

      const [targetBuffer, sigBuffer] = await Promise.all([
        targetFile.arrayBuffer(),
        sigFile.arrayBuffer()
      ]);

      const [targetPdf, sigPdf] = await Promise.all([
        PDFDocument.load(targetBuffer),
        PDFDocument.load(sigBuffer)
      ]);

      setTargetDoc({
        file: targetFile,
        name: targetFile.name,
        size: targetFile.size,
        kind: 'pdf',
        arrayBuffer: targetBuffer,
        totalPages: targetPdf.getPageCount(),
        currentPage: 3 // Focus directly on the unsigned execution page
      });

      setSigDoc({
        file: sigFile,
        name: sigFile.name,
        size: sigFile.size,
        kind: 'pdf',
        arrayBuffer: sigBuffer,
        totalPages: sigPdf.getPageCount(),
        currentPage: 1
      });

      setIsSwapCompleted(false);
      setSwapResult(null);
    } catch (err) {
      console.error('Failed to run Page Swapper demo', err);
    } finally {
      setIsDemoLoading(false);
    }
  };

  useEffect(() => {
    if (initialDemo && !hasAutoRunRef.current) {
      hasAutoRunRef.current = true;
      runDemo();
    }
  }, [initialDemo]);

  return {
    isDemoLoading,
    runDemo
  };
}
