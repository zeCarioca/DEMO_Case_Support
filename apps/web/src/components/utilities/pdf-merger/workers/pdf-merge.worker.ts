import { PDFDocument } from 'pdf-lib';
import { addPdfOutlines, OutlineEntry } from '../utils/pdf-outlines.js';
import { resolveExhibitBytes } from '../utils/exhibit-helper.js';
import { embedImagePage, isSupportedImageFile } from '../utils/image-helper.js';
import { normalizeDocumentToA4 } from '../utils/pdf-page-normalizer.js';
import { WorkerMessage, WorkerResponse } from '../types.js';

let isCancelled = false;

self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const message = event.data;

  if (message.type === 'CANCEL_MERGE') {
    isCancelled = true;
    return;
  }

  if (message.type === 'START_MERGE') {
    isCancelled = false;
    const { items, outputFilename, addBookmarks, normalizeA4 = true } = message.payload;

    try {
      const mergedDoc = await PDFDocument.create();
      const bookmarks: OutlineEntry[] = [];
      let currentPageOffset = 0;

      for (let i = 0; i < items.length; i++) {
        if (isCancelled) {
          return;
        }

        const item = items[i];
        const displayName =
          item.type === 'exhibit'
            ? `EXHIBIT ${item.exhibitLetter || 'A'}`
            : item.name || `Document ${i + 1}`;

        // Notify progress before loading
        const startProgress: WorkerResponse = {
          type: 'PROGRESS',
          payload: {
            currentIndex: i + 1,
            totalItems: items.length,
            itemName: displayName,
            percent: Math.round((i / items.length) * 100)
          }
        };
        self.postMessage(startProgress);

        if (item.type === 'exhibit') {
          // Resolve exhibit cover page bytes
          const letter = item.exhibitLetter || 'A';
          const exhibitBytes = await resolveExhibitBytes(letter);
          const exhibitDoc = await PDFDocument.load(exhibitBytes);
          const copiedPages = await mergedDoc.copyPages(exhibitDoc, exhibitDoc.getPageIndices());

          for (const page of copiedPages) {
            mergedDoc.addPage(page);
          }

          bookmarks.push({
            title: `EXHIBIT ${letter}`,
            pageIndex: currentPageOffset
          });

          currentPageOffset += copiedPages.length;
        } else if (item.type === 'file' && item.file) {
          let arrayBuffer: ArrayBuffer;
          try {
            arrayBuffer = await item.file.arrayBuffer();
          } catch (readErr) {
            const errResponse: WorkerResponse = {
              type: 'ERROR',
              payload: {
                message: `Não foi possível ler o arquivo: "${item.name}". Verifique se o arquivo ainda existe.`,
                itemId: item.id,
                canSkip: true
              }
            };
            (self as any).postMessage(errResponse);
            return;
          }

          const isImage = item.fileKind === 'image' || isSupportedImageFile(item.file);

          if (isImage) {
            try {
              const pagesAdded = await embedImagePage(mergedDoc, arrayBuffer, item.name || 'image.png');
              bookmarks.push({
                title: item.name || `Imagem ${i + 1}`,
                pageIndex: currentPageOffset
              });
              currentPageOffset += pagesAdded;
            } catch (imgErr: any) {
              const errResponse: WorkerResponse = {
                type: 'ERROR',
                payload: {
                  message: `Não foi possível incorporar a imagem "${item.name}": ${imgErr?.message || 'Formato incompatível'}.`,
                  itemId: item.id,
                  canSkip: true
                }
              };
              (self as any).postMessage(errResponse);
              return;
            }
          } else {
            let srcDoc: PDFDocument;
            try {
              // ignoreEncryption: true allows loading PDFs with permission/owner restrictions
              // (which open freely without a password in browsers and Acrobat), without throwing EncryptedPDFError.
              srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
            } catch (loadErr: any) {
              const isEncrypted = loadErr?.message?.toLowerCase().includes('encrypt') || false;
              const errText = isEncrypted
                ? `O arquivo "${item.name}" está protegido por senha de abertura. Remova a senha antes de mesclar.`
                : `O arquivo "${item.name}" é inválido ou está corrompido.`;

              const errResponse: WorkerResponse = {
                type: 'ERROR',
                payload: {
                  message: errText,
                  itemId: item.id,
                  canSkip: true
                }
              };
              (self as any).postMessage(errResponse);
              return;
            }

            try {
              const copiedPages = await mergedDoc.copyPages(srcDoc, srcDoc.getPageIndices());
              for (const page of copiedPages) {
                mergedDoc.addPage(page);
              }

              bookmarks.push({
                title: item.name || `Documento ${i + 1}`,
                pageIndex: currentPageOffset
              });

              currentPageOffset += copiedPages.length;
            } catch (copyErr: any) {
              const errText = `Não foi possível extrair as páginas de "${item.name}". Se o arquivo estiver protegido por senha de leitura, remova a proteção antes de mesclar.`;
              const errResponse: WorkerResponse = {
                type: 'ERROR',
                payload: {
                  message: errText,
                  itemId: item.id,
                  canSkip: true
                }
              };
              (self as any).postMessage(errResponse);
              return;
            }
          }
        }

        // Notify updated progress
        const finishProgress: WorkerResponse = {
          type: 'PROGRESS',
          payload: {
            currentIndex: i + 1,
            totalItems: items.length,
            itemName: displayName,
            percent: Math.round(((i + 1) / items.length) * 100)
          }
        };
        self.postMessage(finishProgress);
      }

      if (isCancelled) return;

      // Normalize all pages to A4 if option is enabled
      if (normalizeA4) {
        normalizeDocumentToA4(mergedDoc);
      }

      // Add hierarchical bookmarks if requested
      if (addBookmarks && bookmarks.length > 0) {
        addPdfOutlines(mergedDoc, bookmarks);
      }

      // Generate final PDF Uint8Array
      const pdfBytes = await mergedDoc.save();

      const completeMsg: WorkerResponse = {
        type: 'COMPLETE',
        payload: {
          pdfBytes,
          filename: outputFilename
        }
      };

      // Transfer the buffer for zero-copy efficiency
      (self as any).postMessage(completeMsg, [pdfBytes.buffer]);
    } catch (topErr: any) {
      const errorMsg: WorkerResponse = {
        type: 'ERROR',
        payload: {
          message: topErr?.message || 'Erro inesperado durante a mesclagem dos arquivos PDF.',
          canSkip: false
        }
      };
      self.postMessage(errorMsg);
    }
  }
};
