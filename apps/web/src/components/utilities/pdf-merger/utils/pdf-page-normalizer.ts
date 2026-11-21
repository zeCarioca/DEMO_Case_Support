import { PDFDocument, PDFPage, PageSizes } from 'pdf-lib';

export const A4_WIDTH = PageSizes.A4[0]; // 595.28 pt
export const A4_HEIGHT = PageSizes.A4[1]; // 841.89 pt

/**
 * Normalizes a single PDFPage to standard A4 dimensions, preserving
 * the original orientation (portrait or landscape) and centering the content.
 */
export function normalizePageToA4(page: PDFPage): void {
  const { width, height } = page.getSize();
  const rotation = page.getRotation().angle;
  const isRotated = rotation === 90 || rotation === 270;

  const visualWidth = isRotated ? height : width;
  const visualHeight = isRotated ? width : height;

  const isLandscape = visualWidth > visualHeight;
  const targetVisualW = isLandscape ? A4_HEIGHT : A4_WIDTH;
  const targetVisualH = isLandscape ? A4_WIDTH : A4_HEIGHT;

  const targetW = isRotated ? targetVisualH : targetVisualW;
  const targetH = isRotated ? targetVisualW : targetVisualH;

  // Skip transformation if already A4 (within 0.5pt tolerance)
  if (Math.abs(width - targetW) < 0.5 && Math.abs(height - targetH) < 0.5) {
    return;
  }

  const scale = Math.min(targetW / width, targetH / height);
  const scaledW = width * scale;
  const scaledH = height * scale;

  const offsetX = (targetW - scaledW) / 2;
  const offsetY = (targetH - scaledH) / 2;

  page.scaleContent(scale, scale);
  page.translateContent(offsetX, offsetY);
  page.setSize(targetW, targetH);
}

/**
 * Normalizes every page in a PDFDocument to standard A4 size.
 */
export function normalizeDocumentToA4(doc: PDFDocument): void {
  const pages = doc.getPages();
  for (const page of pages) {
    normalizePageToA4(page);
  }
}

