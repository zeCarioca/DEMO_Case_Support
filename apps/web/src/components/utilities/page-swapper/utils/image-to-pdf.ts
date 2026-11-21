import { PDFDocument } from 'pdf-lib';

/**
 * Checks if byte array starts with PNG magic numbers: 0x89, 0x50, 0x4E, 0x47
 */
function isPngBytes(bytes: Uint8Array): boolean {
  return (
    bytes.length > 4 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  );
}

/**
 * Converts a PNG or JPG image buffer into a single-page PDF document buffer
 * preserving the exact original image pixel dimensions.
 */
export async function convertImageToSinglePagePdf(
  imageBuffer: ArrayBuffer,
  filename?: string
): Promise<ArrayBuffer> {
  const pdfDoc = await PDFDocument.create();
  const bytes = new Uint8Array(imageBuffer);

  const isPng =
    isPngBytes(bytes) || (filename ? filename.toLowerCase().endsWith('.png') : false);

  let embeddedImage;
  if (isPng) {
    embeddedImage = await pdfDoc.embedPng(imageBuffer);
  } else {
    // Attempt JPG embed, fallback if needed
    try {
      embeddedImage = await pdfDoc.embedJpg(imageBuffer);
    } catch {
      // In case a PNG was mislabeled or vice versa
      embeddedImage = await pdfDoc.embedPng(imageBuffer);
    }
  }

  const { width, height } = embeddedImage;
  const page = pdfDoc.addPage([width, height]);

  page.drawImage(embeddedImage, {
    x: 0,
    y: 0,
    width,
    height
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes.buffer.slice(
    pdfBytes.byteOffset,
    pdfBytes.byteOffset + pdfBytes.byteLength
  ) as ArrayBuffer;
}
