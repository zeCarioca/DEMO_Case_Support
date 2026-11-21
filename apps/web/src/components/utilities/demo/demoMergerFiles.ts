import { createMockPdf } from './demoPdfBase.js';

/**
 * Generates 3 mock files for the PDF Batch Merger demo.
 */
export async function generateMergerDemoFiles(): Promise<File[]> {
  const file1 = await createMockPdf(
    [
      {
        badge: 'USPTO TEAS PLUS',
        title: 'Initial Trademark Application (TEAS Plus)',
        subtitle: 'Applicant: Apex Technologies Inc.  •  Serial No: 98/765,432',
        bodyLines: [
          '## 1. APPLICANT & MARK INFORMATION',
          'Mark Name: NEXUS AI (Standard Character Mark)',
          'Filing Basis: Section 1(b) - Intent to Use in Interstate Commerce',
          'Owner: Apex Technologies Inc. (Delaware C-Corp, EIN 12-3456789)',
          'Domestic Representative & Attorney of Record: Sarah Jenkins, Esq. (NY BAR #1234567)',
          '',
          '## 2. IDENTIFICATION OF GOODS AND SERVICES',
          'Class 009: Downloadable artificial intelligence computer software for predictive legal analytics.',
          'Class 042: Software as a service (SaaS) featuring AI tools for trademark clearance and docketing.',
          '',
          '## 3. STATUTORY FILING FEES',
          'TEAS Plus Rate: $350.00 per class  x  2 Classes = $700.00 (Paid electronically).'
        ]
      },
      {
        badge: 'USPTO DECLARATION',
        title: 'Formal Declaration & Signature Block',
        subtitle: 'Lanham Act § 1(b)  •  37 C.F.R. § 2.20 & § 2.33',
        bodyLines: [
          '## VERIFICATION UNDER PENALTY OF PERJURY',
          'The signatory being warned that willful false statements and the like are punishable by',
          'fine or imprisonment under 18 U.S.C. § 1001, declares that all statements are true.',
          '',
          'The applicant has a bona fide intention to use the mark in commerce on or in connection',
          'with the specified goods/services as of the application filing date.'
        ],
        isSignaturePage: true,
        isSigned: true
      }
    ],
    'Apex-IP-Trademark-Application-Form-TEAS.pdf'
  );

  const file2 = await createMockPdf(
    [
      {
        badge: 'SPECIMEN OF USE § 1(a)',
        title: 'Specimen of Use: Digital Checkout Proof',
        subtitle: 'Commerce Proof  •  Class 042 (Cloud SaaS Platform)',
        bodyLines: [
          '## SPECIMEN VERIFICATION DETAILS',
          'Mark Displayed: NEXUS AI (Top Navigation & Checkout Header)',
          'Specimen Type: Commercial Web Page Screen Capture with Point-of-Sale Checkout Capability',
          'URL: https://nexusai.cloud/pricing-checkout (Captured: 2026-11-20)',
          'Price Point: $149/month Enterprise License with Active Payment Gateway',
          '',
          '## TMEP § 904.03(i) COMPLIANCE AUDIT',
          '1. The mark appears directly associated with the online software service.',
          '2. Customer ordering / purchase interface is prominently provided.',
          '3. URL and date of access are embedded into the submission specimen.'
        ]
      }
    ],
    'Apex-IP-Specimen-of-Use-Checkout-Proof.pdf'
  );

  const file3 = await createMockPdf(
    [
      {
        badge: 'POWER OF ATTORNEY',
        title: 'Appointment of Attorney & Representation',
        subtitle: '37 C.F.R. § 2.17  •  Revocation of Prior Powers',
        bodyLines: [
          '## APPOINTMENT OF PRINCIPAL COUNSEL',
          'Apex Technologies Inc. hereby appoints Sarah Jenkins, Esq. and the attorneys of',
          'Apex IP & Tech Law Group as its exclusive attorneys to prosecute this application,',
          'to transact all relevant business in the United States Patent and Trademark Office,',
          'and to receive all official communications and the certificate of registration.'
        ],
        isSignaturePage: true,
        isSigned: true
      }
    ],
    'Apex-IP-Declaration-of-Use-Power-of-Attorney.pdf'
  );

  return [file1, file2, file3];
}
