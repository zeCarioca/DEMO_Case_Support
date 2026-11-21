import { PDFDocument } from 'pdf-lib';
import { SwapExecutionPayload, SwapExecutionResult } from '../types.js';
import { convertImageToSinglePagePdf } from './image-to-pdf.js';

/**
 * Replaces a single specified page in the target document with the specified
 * page from the signature document. Preserves original signature dimensions.
 */
export async function executePageSwap(
  payload: SwapExecutionPayload
): Promise<SwapExecutionResult> {
  const { sigBuffer, sigKind, sigPage, docBuffer, docPage } = payload;

  // 1. Resolve signature document buffer (convert image if necessary)
  let actualSigBuffer = sigBuffer;
  let resolvedSigPage = sigPage;

  if (sigKind === 'image') {
    actualSigBuffer = await convertImageToSinglePagePdf(sigBuffer);
    resolvedSigPage = 1; // Images are always 1-page documents
  }

  // 2. Load both PDF documents
  const sigDoc = await PDFDocument.load(actualSigBuffer);
  const targetDoc = await PDFDocument.load(docBuffer);

  const sigTotal = sigDoc.getPageCount();
  const docTotal = targetDoc.getPageCount();

  const sigIndex = resolvedSigPage - 1;
  const docIndex = docPage - 1;

  if (sigIndex < 0 || sigIndex >= sigTotal) {
    throw new Error(
      `Página de assinatura inválida: ${resolvedSigPage}. O documento de assinatura tem ${sigTotal} página(s).`
    );
  }

  if (docIndex < 0 || docIndex >= docTotal) {
    throw new Error(
      `Página de documento inválida: ${docPage}. O documento principal tem ${docTotal} página(s).`
    );
  }

  // 3. Copy the selected signature page into target document
  // copyPages preserves original width, height and orientation
  const [copiedPage] = await targetDoc.copyPages(sigDoc, [sigIndex]);

  // 4. Remove the old page from target document
  targetDoc.removePage(docIndex);

  // 5. Insert the new signature page at the exact same index
  targetDoc.insertPage(docIndex, copiedPage);

  // 6. Save modified document
  const pdfBytes = await targetDoc.save();

  return {
    pdfBytes,
    totalPages: targetDoc.getPageCount(),
    swappedTargetPage: docPage
  };
}
