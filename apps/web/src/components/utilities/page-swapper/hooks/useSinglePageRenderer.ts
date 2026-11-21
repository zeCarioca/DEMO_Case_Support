import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Initialize PDF.js worker once
if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
}

interface UseSinglePageRendererProps {
  arrayBuffer: ArrayBuffer | null;
  pageNumber: number;
  zoom: number;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

interface UseSinglePageRendererReturn {
  isLoading: boolean;
  error: string | null;
  pageDimensions: { width: number; height: number } | null;
}

export function useSinglePageRenderer({
  arrayBuffer,
  pageNumber,
  zoom,
  canvasRef
}: UseSinglePageRendererProps): UseSinglePageRendererReturn {
  const [doc, setDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageDimensions, setPageDimensions] = useState<{ width: number; height: number } | null>(null);

  const currentRenderTaskRef = useRef<pdfjsLib.RenderTask | null>(null);
  const activePageRef = useRef<pdfjsLib.PDFPageProxy | null>(null);

  // 1. Load PDF Document instance when arrayBuffer changes
  useEffect(() => {
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      setDoc(null);
      return;
    }

    let isSubscribed = true;
    setIsLoading(true);
    setError(null);

    // CRITICAL: Clone the slice so PDF.js worker transfer never detaches the original arrayBuffer
    const clonedData = new Uint8Array(arrayBuffer.slice(0));
    const loadingTask = pdfjsLib.getDocument({
      data: clonedData
    });

    loadingTask.promise
      .then((loadedDoc) => {
        if (!isSubscribed) {
          loadedDoc.destroy();
          return;
        }
        setDoc((prev) => {
          if (prev) {
            prev.destroy();
          }
          return loadedDoc;
        });
      })
      .catch((err: any) => {
        if (!isSubscribed) return;
        setError(err?.message || 'Falha ao carregar o arquivo PDF');
        setIsLoading(false);
      });

    return () => {
      isSubscribed = false;
      loadingTask.destroy();
      setDoc((prev) => {
        if (prev) {
          prev.destroy();
        }
        return null;
      });
    };
  }, [arrayBuffer]);

  // 2. Render ONLY the selected page on canvas and immediately clean up previous page
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!doc || !canvas) return;

    let isCurrentEffect = true;
    setIsLoading(true);
    setError(null);

    // Cancel any active render task before starting a new one
    if (currentRenderTaskRef.current) {
      currentRenderTaskRef.current.cancel();
      currentRenderTaskRef.current = null;
    }

    // Clean up previous page proxy to free memory immediately
    if (activePageRef.current) {
      activePageRef.current.cleanup();
      activePageRef.current = null;
    }

    const renderPage = async () => {
      try {
        if (pageNumber < 1 || pageNumber > doc.numPages) {
          setIsLoading(false);
          return;
        }

        // Fetch strictly the requested single page
        const page = await doc.getPage(pageNumber);
        if (!isCurrentEffect) {
          page.cleanup();
          return;
        }
        activePageRef.current = page;

        // Base viewport at scale 1.0 for dimensions
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        setPageDimensions({
          width: Math.round(unscaledViewport.width),
          height: Math.round(unscaledViewport.height)
        });

        // Compute scaled viewport
        const viewport = page.getViewport({ scale: zoom });
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        // HiDPI support
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        const renderContext = {
          canvasContext: ctx,
          viewport
        };

        const renderTask = page.render(renderContext);
        currentRenderTaskRef.current = renderTask;

        await renderTask.promise;
        if (isCurrentEffect) {
          setIsLoading(false);
        }
      } catch (renderErr: any) {
        if (renderErr?.name === 'RenderingCancelledException') {
          // Expected when switching pages quickly
          return;
        }
        if (isCurrentEffect) {
          setError(renderErr?.message || 'Erro ao renderizar a página');
          setIsLoading(false);
        }
      }
    };

    renderPage();

    return () => {
      isCurrentEffect = false;
      if (currentRenderTaskRef.current) {
        currentRenderTaskRef.current.cancel();
        currentRenderTaskRef.current = null;
      }
      if (activePageRef.current) {
        activePageRef.current.cleanup();
        activePageRef.current = null;
      }
    };
  }, [doc, pageNumber, zoom, canvasRef]);

  return { isLoading, error, pageDimensions };
}
