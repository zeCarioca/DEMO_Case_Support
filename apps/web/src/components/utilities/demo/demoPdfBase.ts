import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface PageDefinition {
  title: string;
  subtitle?: string;
  badge?: string;
  bodyLines: string[];
  isSignaturePage?: boolean;
  isSigned?: boolean;
}

/**
 * Procedurally generates a clean, valid PDF file using pdf-lib.
 * 100% client-side, zero network overhead.
 */
export async function createMockPdf(pages: PageDefinition[], filename: string): Promise<File> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 595.28; // A4 standard width
  const pageHeight = 841.89; // A4 standard height

  pages.forEach((p, pageIdx) => {
    const page = doc.addPage([pageWidth, pageHeight]);

    // Top Brand Bar
    page.drawRectangle({
      x: 36,
      y: pageHeight - 56,
      width: pageWidth - 72,
      height: 24,
      color: rgb(0.07, 0.22, 0.42)
    });

    page.drawText('APEX IP & TECH LAW GROUP  •  USPTO & WIPO DOCKETING REPOSITORY', {
      x: 48,
      y: pageHeight - 42,
      size: 8,
      font: boldFont,
      color: rgb(1, 1, 1)
    });

    // Page badge
    if (p.badge) {
      page.drawRectangle({
        x: 36,
        y: pageHeight - 88,
        width: 140,
        height: 18,
        color: rgb(0.9, 0.94, 0.98),
        borderColor: rgb(0.2, 0.45, 0.8),
        borderWidth: 1
      });
      page.drawText(p.badge, {
        x: 44,
        y: pageHeight - 76,
        size: 8,
        font: boldFont,
        color: rgb(0.1, 0.35, 0.7)
      });
    }

    // Title & Subtitle
    page.drawText(p.title, {
      x: 36,
      y: pageHeight - 116,
      size: 15,
      font: boldFont,
      color: rgb(0.12, 0.15, 0.2)
    });

    if (p.subtitle) {
      page.drawText(p.subtitle, {
        x: 36,
        y: pageHeight - 134,
        size: 9.5,
        font,
        color: rgb(0.35, 0.4, 0.45)
      });
    }

    // Divider line
    page.drawLine({
      start: { x: 36, y: pageHeight - 146 },
      end: { x: pageWidth - 36, y: pageHeight - 146 },
      thickness: 1,
      color: rgb(0.85, 0.88, 0.92)
    });

    // Body content lines
    let currentY = pageHeight - 170;
    for (const line of p.bodyLines) {
      if (line.startsWith('## ')) {
        currentY -= 8;
        page.drawText(line.replace('## ', ''), {
          x: 36,
          y: currentY,
          size: 10.5,
          font: boldFont,
          color: rgb(0.15, 0.2, 0.3)
        });
        currentY -= 16;
      } else {
        page.drawText(line, {
          x: 40,
          y: currentY,
          size: 9,
          font,
          color: rgb(0.25, 0.28, 0.32)
        });
        currentY -= 14;
      }
    }

    // Signature Box
    if (p.isSignaturePage) {
      const boxY = 110;
      const boxHeight = 90;
      const boxWidth = pageWidth - 72;

      if (p.isSigned) {
        page.drawRectangle({
          x: 36,
          y: boxY,
          width: boxWidth,
          height: boxHeight,
          color: rgb(0.94, 0.99, 0.96),
          borderColor: rgb(0.1, 0.65, 0.4),
          borderWidth: 1.5
        });

        page.drawText('VERIFIED DIGITAL SIGNATURE & NOTARIAL ATTESTATION', {
          x: 50,
          y: boxY + boxHeight - 20,
          size: 9,
          font: boldFont,
          color: rgb(0.08, 0.55, 0.35)
        });

        page.drawText('Signed by: Sarah Jenkins, Esq.  (NY BAR #1234567)', {
          x: 50,
          y: boxY + boxHeight - 38,
          size: 10,
          font: boldFont,
          color: rgb(0.1, 0.15, 0.2)
        });

        page.drawText('Title: Lead Trademark Counsel  •  Apex IP & Tech Law Group', {
          x: 50,
          y: boxY + boxHeight - 54,
          size: 8.5,
          font,
          color: rgb(0.3, 0.35, 0.4)
        });

        page.drawText('Hash: SHA256:7f9b84a2...98c  •  Audit ID: APX-SIG-2026-98421  •  Signed: 2026-11-21', {
          x: 50,
          y: boxY + boxHeight - 70,
          size: 7.5,
          font,
          color: rgb(0.4, 0.6, 0.45)
        });
      } else {
        page.drawRectangle({
          x: 36,
          y: boxY,
          width: boxWidth,
          height: boxHeight,
          color: rgb(1, 0.96, 0.95),
          borderColor: rgb(0.85, 0.3, 0.2),
          borderWidth: 1.5
        });

        page.drawText('SIGNATURE PENDING  •  UNEXECUTED DRAFT', {
          x: 50,
          y: boxY + boxHeight - 24,
          size: 10,
          font: boldFont,
          color: rgb(0.8, 0.2, 0.15)
        });

        page.drawText('[ Action Required: Replace this execution page with signed signature page ]', {
          x: 50,
          y: boxY + boxHeight - 48,
          size: 8.5,
          font,
          color: rgb(0.5, 0.2, 0.15)
        });
      }
    }

    // Page footer
    page.drawText(`Apex IP & Tech Law Group  •  Page ${pageIdx + 1} of ${pages.length}`, {
      x: 36,
      y: 36,
      size: 7.5,
      font,
      color: rgb(0.6, 0.65, 0.7)
    });
  });

  const pdfBytes = await doc.save();
  return new File([pdfBytes.buffer as ArrayBuffer], filename, { type: 'application/pdf' });
}
