import { PDFDocument, PDFName, PDFString, PDFHexString } from 'pdf-lib';

export interface OutlineEntry {
  title: string;
  pageIndex: number;
}

/**
 * Encodes text properly for PDF outline titles, using hex string if non-ascii.
 */
function createPdfString(title: string) {
  // If string contains non-ASCII characters, PDFHexString with UTF-16BE BOM is required by PDF spec
  const isAscii = /^[\x20-\x7E]*$/.test(title);
  if (isAscii) {
    return PDFString.of(title);
  }
  return PDFHexString.fromText(title);
}

/**
 * Builds and attaches a native PDF Bookmarks / Outline tree to a PDFDocument.
 */
export function addPdfOutlines(doc: PDFDocument, bookmarks: OutlineEntry[]): void {
  if (bookmarks.length === 0) return;

  const pages = doc.getPages();
  if (pages.length === 0) return;

  const ctx = doc.context;
  const outlinesDictRef = ctx.nextRef();
  const itemRefs = bookmarks.map(() => ctx.nextRef());

  bookmarks.forEach((entry, idx) => {
    // Clamp pageIndex to valid range
    const validPageIndex = Math.max(0, Math.min(entry.pageIndex, pages.length - 1));
    const targetPage = pages[validPageIndex];
    if (!targetPage) return;

    const itemDict: Record<string, any> = {
      Title: createPdfString(entry.title),
      Parent: outlinesDictRef,
      Dest: [targetPage.ref, PDFName.of('Fit')]
    };

    if (idx > 0) {
      itemDict.Prev = itemRefs[idx - 1];
    }
    if (idx < bookmarks.length - 1) {
      itemDict.Next = itemRefs[idx + 1];
    }

    ctx.assign(itemRefs[idx], ctx.obj(itemDict));
  });

  const outlinesDict = ctx.obj({
    Type: PDFName.of('Outlines'),
    First: itemRefs[0],
    Last: itemRefs[itemRefs.length - 1],
    Count: bookmarks.length
  });

  ctx.assign(outlinesDictRef, outlinesDict);
  doc.catalog.set(PDFName.of('Outlines'), outlinesDictRef);
}

