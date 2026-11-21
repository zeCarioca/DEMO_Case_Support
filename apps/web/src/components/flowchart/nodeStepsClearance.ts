import { NodeStepItem } from './nodeStepsData.js';

export const CLEARANCE_STEPS: NodeStepItem[] = [
  { code: 'CLR-01', title: 'Client intake and mark specification audit', role: 'DOCKETING', detail: 'Identify exact character string, logo artwork, and intended commercial goods/services.' },
  { code: 'CLR-02', title: 'USPTO TESS database direct phonetic and visual search', role: 'TRADEMARK_ANALYST', detail: 'Perform structured queries across live and dead federal trademark registrations.' },
  { code: 'CLR-03', title: 'Nice Classification assignment and cross-class search', role: 'TRADEMARK_ANALYST', detail: 'Map goods/services to primary and coordinated Nice classes (e.g. Class 009 & Class 042 for SaaS).' },
  { code: 'CLR-04', title: 'Common law database, corporate name, and domain audit', role: 'TRADEMARK_ANALYST', detail: 'Review state business registers, Crunchbase, active websites, and major social channels.' },
  { code: 'CLR-05', title: 'Assessment of descriptive, generic, or deceptive character', role: 'LEGAL', requiresApproval: 'LEGAL', detail: 'Analyze Lanham Act § 2(e)(1) merely descriptive risks and need for supplemental register fallback.' },
  { code: 'CLR-06', title: 'Draft comprehensive Clearance Opinion letter', role: 'LEGAL', detail: 'Detail likelihood of confusion risks, citation risks, and strategic filing recommendations.' },
  { code: 'CLR-07', title: 'Client strategy consultation and filing basis selection', role: 'LEGAL', detail: 'Review opinion letter with client and confirm § 1(a) vs § 1(b) filing basis.' },
  { code: 'CLR-08', title: 'Formal engagement execution and retainer verification', role: 'DOCKETING', detail: 'Execute power of attorney and confirm deposit of statutory USPTO filing fees.' }
];

export const TEAS_FILING_STEPS: NodeStepItem[] = [
  { code: 'TEAS-01', title: 'Create USPTO.gov verified account docket entry', role: 'DOCKETING', detail: 'Ensure applicant identity verification (USPTO ID.me / login.gov) is completed.' },
  { code: 'TEAS-02', title: 'Select application type (TEAS Plus vs TEAS Standard)', role: 'DOCKETING', detail: 'Evaluate whether goods/services match exact USPTO ID Manual entries to qualify for TEAS Plus.' },
  { code: 'TEAS-03', title: 'Enter applicant legal entity details and corporate domicile', role: 'DOCKETING', detail: 'Confirm exact corporate name, state of incorporation, and principal executive office.' },
  { code: 'TEAS-04', title: 'Upload standard character drawing or stylized logo JPG/PNG', role: 'TRADEMARK_ANALYST', detail: 'Verify mark drawing conforms strictly to USPTO resolution and black/white/color claim rules.' },
  { code: 'TEAS-05', title: 'Draft and refine goods and services descriptions', role: 'TRADEMARK_ANALYST', detail: 'Structure specifications cleanly without vague or overbroad terminology.' },
  { code: 'TEAS-06', title: 'Review foreign priority basis claim under Paris Convention § 44(d)', role: 'LEGAL', detail: 'If claiming foreign priority, verify home country filing date is within 6 months.' },
  { code: 'TEAS-07', title: 'Audit commercial specimen of use (for § 1(a) filings)', role: 'TRADEMARK_ANALYST', criticalNote: 'Mockups, printer proofs, or press releases are strictly rejected by USPTO', detail: 'Ensure specimen shows mark as used in commerce with direct purchase mechanism.' },
  { code: 'TEAS-08', title: 'Senior attorney legal review of complete application draft', role: 'LEGAL', requiresApproval: 'LEGAL', detail: 'Sarah Jenkins, Esq. reviews all claims, drawing, and goods/services scope.' },
  { code: 'TEAS-09', title: 'Transmit declaration for client electronic signature', role: 'DOCKETING', detail: 'Send TEAS electronic verification link to authorized corporate officer.' },
  { code: 'TEAS-10', title: 'Verify executed declaration and authorization', role: 'DOCKETING', detail: 'Confirm signature compliance under 37 CFR § 2.33 and § 2.193.' },
  { code: 'TEAS-11', title: 'Submit electronic application and pay statutory USPTO fees', role: 'DOCKETING', detail: 'Transmit submission via USPTO TEAS portal and process payment.' },
  { code: 'TEAS-12', title: 'Archive official filing receipt and calendar milestone dates', role: 'DOCKETING', detail: 'Download official TSDR filing receipt with assigned Serial Number and calendar review window.' }
];

export const EXAMINATION_STEPS: NodeStepItem[] = [
  { code: 'EXAM-01', title: 'Log assigned USPTO Serial Number into matter docket', role: 'DOCKETING', detail: 'Record serial number, law firm reference code, and client billing ID.' },
  { code: 'EXAM-02', title: 'Confirm USPTO correspondence email and attorney of record', role: 'DOCKETING', detail: 'Verify Sarah Jenkins, Esq. is recognized as attorney of record with USPTO.' },
  { code: 'EXAM-03', title: 'Monthly TSDR automated status check and docket audit', role: 'DOCKETING', detail: 'Monitor docket for assignment to Trademark Law Office and Examining Attorney.' },
  { code: 'EXAM-04', title: 'Review examining attorney assignment notice', role: 'TRADEMARK_ANALYST', detail: 'Note assigned Examining Attorney and law office branch upon assignment.' },
  { code: 'EXAM-05', title: 'Audit foreign registration certificate status (for § 44(e) track)', role: 'PARALEGAL', detail: 'Check whether certified foreign registration certificate is ready for submission.' },
  { code: 'EXAM-06', title: 'Perform pre-action client status update memo', role: 'DOCKETING', detail: 'Inform client of examination progress and prepare for potential Office Action.' }
];
