import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Generates a clean, professional Swiss-style Exhibit cover page.
 */
export async function generateExhibitCoverPdf(letter: string): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  // Standard US Letter: 612 x 792 pt
  const page = doc.addPage([612, 792]);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);

  const title = `EXHIBIT ${letter.toUpperCase()}`;
  const titleSize = 42;
  const titleWidth = fontBold.widthOfTextAtSize(title, titleSize);

  // Outer border hairlines (Swiss minimalist style)
  page.drawRectangle({
    x: 36,
    y: 36,
    width: 612 - 72,
    height: 792 - 72,
    borderWidth: 1,
    borderColor: rgb(0.85, 0.85, 0.85),
    color: rgb(1, 1, 1)
  });

  // Top header label
  const headerText = 'APEX IP & TECH LAW GROUP — TRADEMARK SPECIMEN / EVIDENCE EXHIBIT';
  page.drawText(headerText, {
    x: 54,
    y: 792 - 60,
    size: 9,
    font: fontBold,
    color: rgb(0.45, 0.45, 0.45)
  });

  // Center Main Exhibit Letter
  page.drawText(title, {
    x: (612 - titleWidth) / 2,
    y: 430,
    size: titleSize,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.1)
  });

  // Decorative Accent bar under title
  page.drawLine({
    start: { x: (612 - 120) / 2, y: 405 },
    end: { x: (612 + 120) / 2, y: 405 },
    thickness: 2,
    color: rgb(0.2, 0.2, 0.2)
  });

  // Subtitle
  const subtitle = 'SUPPORTING DOCUMENTATION & EVIDENCE';
  const subWidth = fontRegular.widthOfTextAtSize(subtitle, 11);
  page.drawText(subtitle, {
    x: (612 - subWidth) / 2,
    y: 380,
    size: 11,
    font: fontRegular,
    color: rgb(0.4, 0.4, 0.4)
  });

  return await doc.save();
}

/**
 * Resolves an exhibit PDF buffer. For exhibits A, B, C, D, tries to fetch
 * the provided templates from /assets/exhibits/Exibit_[letter].pdf.
 * Falls back to dynamic generation if not found or for letters > D.
 */
export async function resolveExhibitBytes(letter: string): Promise<Uint8Array> {
  const normLetter = letter.trim().toLowerCase();
  const officialTemplates = ['a', 'b', 'c', 'd'];

  if (officialTemplates.includes(normLetter)) {
    try {
      const url = `/assets/exhibits/Exibit_${normLetter}.pdf`;
      const res = await fetch(url);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        if (buffer.byteLength > 0) {
          return new Uint8Array(buffer);
        }
      }
    } catch {
      // Fallback to dynamic generation below
    }
  }

  return generateExhibitCoverPdf(letter.toUpperCase());
}

