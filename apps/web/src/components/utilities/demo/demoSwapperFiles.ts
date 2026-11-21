import { createMockPdf } from './demoPdfBase.js';

/**
 * Generates mock target agreement (3 pages) and signed execution page (1 page) for Page Swapper demo.
 */
export async function generatePageSwapperDemoFiles(): Promise<{ targetFile: File; sigFile: File }> {
  const targetFile = await createMockPdf(
    [
      {
        badge: 'AGREEMENT - PAGE 1',
        title: 'Master Trademark License Agreement',
        subtitle: 'Preamble, Recitals & Exclusive Grant',
        bodyLines: [
          '## 1. PARTIES & RECITALS',
          'This Master Trademark License Agreement is entered into by and between Apex Technologies Inc.',
          '("Licensor") and Global Retail Partners LLC ("Licensee").',
          '',
          '## 2. GRANT OF LICENSE',
          'Licensor grants to Licensee an exclusive, non-transferable license to use the trademark',
          '"NEXUS AI" in the United States and Canada in connection with Class 009 & 042 solutions.'
        ]
      },
      {
        badge: 'AGREEMENT - PAGE 2',
        title: 'Royalties, Quality Control & Audits',
        subtitle: 'Section 4 through Section 8',
        bodyLines: [
          '## 3. QUALITY CONTROL & AUDIT RIGHTS',
          'Licensee agrees to maintain strict quality standards complying with Licensor guidelines.',
          'Licensor reserves the right to inspect sample materials upon ten (10) business days notice.',
          '',
          '## 4. ROYALTY PAYMENTS & SETTLEMENT',
          'Licensee shall pay a running royalty of 4.5% of Net Sales, payable on a quarterly basis.'
        ]
      },
      {
        badge: 'AGREEMENT - PAGE 3 (DRAFT)',
        title: 'Signature & Execution Page',
        subtitle: 'Unexecuted Draft  •  Awaiting Executed Replacement',
        bodyLines: [
          '## IN WITNESS WHEREOF',
          'The parties have caused this Trademark License Agreement to be executed by authorized officers.',
          '',
          '[ Note: This page is currently unexecuted. Use Page Swapper to replace this page with the signed copy ]'
        ],
        isSignaturePage: true,
        isSigned: false
      }
    ],
    'Apex-IP-Trademark-License-Agreement-v2.pdf'
  );

  const sigFile = await createMockPdf(
    [
      {
        badge: 'EXECUTED SIGNATURE PAGE',
        title: 'Signature & Execution Page (Executed)',
        subtitle: 'Fully Executed & Attested  •  Ready for Swap',
        bodyLines: [
          '## IN WITNESS WHEREOF',
          'The parties have caused this Master Trademark License Agreement to be executed by their',
          'duly authorized legal representatives as of the effective date.',
          '',
          'Accepted and Agreed by Licensor and Licensee.'
        ],
        isSignaturePage: true,
        isSigned: true
      }
    ],
    'Apex-IP-Executed-Signature-Page-Signed.pdf'
  );

  return { targetFile, sigFile };
}
