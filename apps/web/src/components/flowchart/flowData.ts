export interface FlowNode {
  id: string;
  title: string;
  phase: string;
  summary: string;
  responsibilities: string[];
  criticalChecks: string[];
  officialLinks: { label: string; url: string }[];
  requiredDocs?: string[];
  stepCount?: number;
}

export const FLOW_NODES: FlowNode[] = [
  {
    id: 'node-clearance',
    title: '1. Trademark Clearance & Conflict Search',
    phase: 'PHASE_A_CLEARANCE_FILING',
    summary: 'Comprehensive federal USPTO TESS search, state registries, common law databases, and domain audits to evaluate Likelihood of Confusion risks under Lanham Act § 2(d).',
    responsibilities: ['Trademark Analyst', 'Docketing Specialist', 'Sarah Jenkins, Esq.'],
    criticalChecks: [
      'Evaluate phonetic, visual, and conceptual similarity with active registrations',
      'Classify goods and services accurately under Nice Classification (Classes 001-045)',
      'Issue formal Attorney Clearance Opinion letter prior to expenditure of filing fees'
    ],
    requiredDocs: [
      'Full Comprehensive Clearance Search Report (TESS & Common Law)',
      'Mark Specimen / Proposed Drawing & Goods/Services Scope',
      'Client Engagement Letter & Representation Agreement'
    ],
    officialLinks: [
      { label: 'USPTO Trademark Search (TESS)', url: 'https://www.uspto.gov/trademarks/search' },
      { label: 'WIPO Madrid Monitor', url: 'https://www.wipo.int/madrid/monitor/en/' }
    ],
    stepCount: 8
  },
  {
    id: 'node-teas-filing',
    title: '2. TEAS Application Preparation & Filing',
    phase: 'PHASE_A_CLEARANCE_FILING',
    summary: 'Electronic filing via USPTO TEAS Plus or TEAS Standard. Prepares exact goods/services identification, drawing specifications, and verifies basis under § 1(a), § 1(b), or § 44(d).',
    responsibilities: ['Docketing Specialist', 'Paralegal', 'Sarah Jenkins, Esq.'],
    criticalChecks: [
      'Verify filing basis: § 1(a) (In Commerce) vs § 1(b) (Intent-to-Use) vs § 44(d) (Foreign Priority)',
      'Ensure goods/services match pre-approved descriptions in the USPTO ID Manual for TEAS Plus discount',
      'Collect verified electronic declaration signature from authorized applicant corporate officer'
    ],
    requiredDocs: [
      'TEAS Plus / Standard Application Draft',
      'Commercial Specimen of Use with verified dates (if § 1(a))',
      'Foreign Priority Filing Certificate with certified translation (if § 44(d))'
    ],
    officialLinks: [
      { label: 'USPTO TEAS Filing Portal', url: 'https://www.uspto.gov/trademarks/apply' },
      { label: 'USPTO ID Manual', url: 'https://idm-tmng.uspto.gov/' }
    ],
    stepCount: 12
  },
  {
    id: 'node-examination',
    title: '3. Examination & Docket Monitoring',
    phase: 'PHASE_B_EXAMINATION_PROSECUTION',
    summary: 'Continuous docket tracking while application awaits assignment to an Examining Attorney (approx. 6–8 month pendency). Tracks priority windows and applicant updates.',
    responsibilities: ['Docketing Specialist', 'Case Manager'],
    criticalChecks: [
      'Monitor TSDR status monthly for Examining Attorney assignment notice',
      'Keep applicant corporate address, domicile, and correspondence contact strictly updated',
      'Audit international Madrid Protocol extension notifications if applicable'
    ],
    requiredDocs: [
      'Official Filing Receipt with USPTO Serial Number confirmation',
      'Internal Docket Sheet with statutory milestone dates'
    ],
    officialLinks: [
      { label: 'USPTO TSDR Status Tracker', url: 'https://tsdr.uspto.gov/' }
    ],
    stepCount: 6
  },
  {
    id: 'node-office-action',
    title: '4. Office Action Response & Refusal Overcoming',
    phase: 'PHASE_B_EXAMINATION_PROSECUTION',
    summary: 'Substantive legal analysis and timely response to Non-Final and Final Office Actions within the strict statutory 3-month deadline (or timely request for 3-month extension).',
    responsibilities: ['Sarah Jenkins, Esq.', 'Senior Associate', 'Docketing Specialist'],
    criticalChecks: [
      'Calendar strict 3-month response deadline immediately upon receipt of Office Action',
      'Draft DuPont factor legal brief to overcome § 2(d) Likelihood of Confusion refusals',
      'Submit required disclaimers, specimen amendments, or identification narrowings'
    ],
    requiredDocs: [
      'USPTO Office Action Notice (TSDR PDF)',
      'Substantive Legal Response Brief with supporting exhibits',
      'Executed TEAS-OA Electronic Filing Submission'
    ],
    officialLinks: [
      { label: 'TMEP Manual of Examining Procedure', url: 'https://tmep.uspto.gov/' }
    ],
    stepCount: 14
  },
  {
    id: 'node-gazette',
    title: '5. Official Gazette Publication & Opposition',
    phase: 'PHASE_C_ALLOWANCE_MAINTENANCE',
    summary: '30-day statutory publication window in the USPTO Official Gazette for third-party opposition proceedings before the Trademark Trial and Appeal Board (TTAB).',
    responsibilities: ['Docketing Specialist', 'Litigation Paralegal'],
    criticalChecks: [
      'Review Notice of Publication and confirm target publication date',
      'Monitor TTAB electronic docket for 30-day opposition filings or extension requests',
      'Confirm issuance of Notice of Allowance (for § 1(b)) or Registration Certificate (for § 1(a))'
    ],
    requiredDocs: [
      'Notice of Publication (USPTO TMOG)',
      'TTAB Docket Status Check confirmation',
      'Notice of Allowance (NOA) document'
    ],
    officialLinks: [
      { label: 'USPTO Trademark Official Gazette (TMOG)', url: 'https://tmog.uspto.gov/' },
      { label: 'TTABVUE Proceeding Search', url: 'https://ttabvue.uspto.gov/' }
    ],
    stepCount: 7
  },
  {
    id: 'node-sou',
    title: '6. Statement of Use (SOU) & Specimen Audit',
    phase: 'PHASE_C_ALLOWANCE_MAINTENANCE',
    summary: 'For Section 1(b) ITU applications, conversion to registered status via verified commercial specimen of use or timely 6-month extension filings (up to 36 months total).',
    responsibilities: ['Specimen Specialist', 'Sarah Jenkins, Esq.'],
    criticalChecks: [
      'Audit specimen to ensure point-of-sale checkout or packaging connection',
      'Submit verified dates of first use anywhere and first use in interstate commerce',
      'File SOU within 6 months of NOA or file timely 6-month extension request'
    ],
    requiredDocs: [
      'High-resolution commercial specimen photographs or URL timestamped captures',
      'Declaration of First Use in Commerce dates signed by applicant officer',
      'TEAS SOU or Extension Request Filing Confirmation'
    ],
    officialLinks: [
      { label: 'USPTO Specimen Requirements Guide', url: 'https://www.uspto.gov/trademarks/apply/specimens' }
    ],
    stepCount: 10
  },
  {
    id: 'node-maintenance',
    title: '7. Registration & Post-Registration Maintenance',
    phase: 'PHASE_C_ALLOWANCE_MAINTENANCE',
    summary: 'Registration certificate docketing and statutory maintenance lifecycle under Section 8, Section 15, and Section 9.',
    responsibilities: ['Docketing Specialist', 'Sarah Jenkins, Esq.'],
    criticalChecks: [
      'Calendar Section 8 & 15 window (between 5th and 6th anniversary of registration)',
      'Calendar Section 8 & 9 renewal window (every 10th anniversary)',
      'Audit continued commercial use of mark for all registered classes before declaration'
    ],
    requiredDocs: [
      'Official Trademark Registration Certificate (Gold Seal / Digital PDF)',
      'Section 8 & 15 Declaration of Incontestability Draft',
      'Current Commercial Specimen of Continued Use'
    ],
    officialLinks: [
      { label: 'USPTO Post-Registration Timeline', url: 'https://www.uspto.gov/trademarks/maintain' }
    ],
    stepCount: 8
  }
];
