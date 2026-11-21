import { describe, it, expect } from 'vitest';
import { PDFDocument } from 'pdf-lib';
import {
  createMockPdf,
  generateMergerDemoFiles,
  generatePageSwapperDemoFiles
} from './demoPdfGenerator.js';

describe('Client-Side Demo PDF Generator', () => {
  it('creates a valid single-page mock PDF with brand headers and badges', async () => {
    const file = await createMockPdf(
      [
        {
          title: 'USPTO TRADEMARK SPECIMEN #1',
          subtitle: 'Digital Application Specimen',
          badge: 'CLASS 042: CLOUD COMPUTING',
          bodyLines: [
            'Applicant: Apex Technologies Inc.',
            'First Use in Commerce: 2024-01-15',
            'Current Status: Section 1(a) Actual Commercial Use'
          ]
        }
      ],
      'mock_specimen_test.pdf'
    );

    expect(file).toBeDefined();
    expect(file.name).toBe('mock_specimen_test.pdf');
    expect(file.size).toBeGreaterThan(500);

    // Verify PDF structure with pdf-lib
    const arrayBuffer = await file.arrayBuffer();
    const doc = await PDFDocument.load(arrayBuffer);
    expect(doc.getPageCount()).toBe(1);
  });

  it('generates multi-page demo files for the Batch PDF Merger', async () => {
    const files = await generateMergerDemoFiles();

    expect(files.length).toBe(3);
    expect(files.map((f) => f.name)).toEqual([
      'Apex-IP-Trademark-Application-Form-TEAS.pdf',
      'Apex-IP-Specimen-of-Use-Checkout-Proof.pdf',
      'Apex-IP-Declaration-of-Use-Power-of-Attorney.pdf'
    ]);

    // Inspect Exhibit A (should have 2 pages)
    const bufA = await files[0].arrayBuffer();
    const docA = await PDFDocument.load(bufA);
    expect(docA.getPageCount()).toBe(2);

    // Inspect Exhibit B (should have 1 page)
    const bufB = await files[1].arrayBuffer();
    const docB = await PDFDocument.load(bufB);
    expect(docB.getPageCount()).toBe(1);

    // Inspect Exhibit C (should have 1 page)
    const bufC = await files[2].arrayBuffer();
    const docC = await PDFDocument.load(bufC);
    expect(docC.getPageCount()).toBe(1);
  });

  it('generates paired target and replacement pages for the Page Swapper utility', async () => {
    const { targetFile, sigFile } = await generatePageSwapperDemoFiles();

    expect(targetFile.name).toBe('Apex-IP-Trademark-License-Agreement-v2.pdf');
    expect(sigFile.name).toBe('Apex-IP-Executed-Signature-Page-Signed.pdf');

    const targetBuf = await targetFile.arrayBuffer();
    const targetDoc = await PDFDocument.load(targetBuf);
    expect(targetDoc.getPageCount()).toBe(3);

    const sigBuf = await sigFile.arrayBuffer();
    const sigDoc = await PDFDocument.load(sigBuf);
    expect(sigDoc.getPageCount()).toBe(1);
  });
});
