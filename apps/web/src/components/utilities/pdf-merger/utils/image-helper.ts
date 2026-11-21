import { PDFDocument, PDFImage } from 'pdf-lib';

/**
 * Checks if a file or filename represents a supported image (PNG, JPG, JPEG).
 */
export function isSupportedImageFile(file: { name: string; type?: string }): boolean {
  if (file.type && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
    return true;
  }
  const name = file.name.toLowerCase();
  return name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg');
}

/**
 * Embeds an image buffer (PNG or JPEG) into a PDFDocument and appends a properly scaled page.
 */
export async function embedImagePage(
  doc: PDFDocument,
  arrayBuffer: ArrayBuffer,
  filename: string
): Promise<number> {
  const bytes = new Uint8Array(arrayBuffer);
  let image: PDFImage;

  const isPng =
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47;

  if (isPng || filename.toLowerCase().endsWith('.png')) {
    try {
      image = await doc.embedPng(arrayBuffer);
    } catch {
      image = await doc.embedJpg(arrayBuffer);
    }
  } else {
    try {
      image = await doc.embedJpg(arrayBuffer);
    } catch {
      image = await doc.embedPng(arrayBuffer);
    }
  }

  // Determine orientation (Standard A4: 595.28 x 841.89 pt)
  const isLandscape = image.width > image.height;
  const pageWidth = isLandscape ? 841.89 : 595.28;
  const pageHeight = isLandscape ? 595.28 : 841.89;
  const margin = 36; // 0.5 inch margins

  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2;

  // Scale down if larger than margins; otherwise scale to fit comfortably
  const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
  const renderWidth = image.width * scale;
  const renderHeight = image.height * scale;

  const x = (pageWidth - renderWidth) / 2;
  const y = (pageHeight - renderHeight) / 2;

  const page = doc.addPage([pageWidth, pageHeight]);
  page.drawImage(image, {
    x,
    y,
    width: renderWidth,
    height: renderHeight
  });

  return 1;
}

