import { NodeStepItem } from './nodeStepsData.js';

export const OFFICE_ACTION_STEPS: NodeStepItem[] = [
  { code: 'OA-01', title: 'Download and review official USPTO Office Action notice', role: 'DOCKETING', criticalNote: 'Strict 3-month statutory response window applies under TMA', detail: 'Calculate non-extendable or statutory deadline (3 months under Trademark Modernization Act).' },
  { code: 'OA-02', title: 'Docket statutory response deadline and 30-day internal review cutoff', role: 'DOCKETING', detail: 'Enter deadlines into primary calendar and cross-verify with docketing specialist.' },
  { code: 'OA-03', title: 'Substantive analysis of refusals (Section 2(d), 2(e), disclaimers)', role: 'LEGAL', requiresApproval: 'LEGAL', detail: 'Classify issues into procedural amendments vs substantive refusals.' },
  { code: 'OA-04', title: 'If § 2(d) Likelihood of Confusion: perform DuPont factors comparison', role: 'LEGAL', detail: 'Analyze differences in marks, trade channels, sophistication of purchasers, and coexistence.' },
  { code: 'OA-05', title: 'Client consultation and strategy roadmap memorandum', role: 'LEGAL', detail: 'Present options: response brief, goods/services narrowing, consent agreement, or letter of protest.' },
  { code: 'OA-06', title: 'Investigate cited third-party marks for non-use / cancellation', role: 'TRADEMARK_ANALYST', detail: 'Check whether cited registrations are vulnerable to § 8 cancellation or expungement under TMA.' },
  { code: 'OA-07', title: 'Draft substantive response brief and legal arguments', role: 'LEGAL', detail: 'Draft argument citing TTAB and Federal Circuit precedents overcoming cited refusals.' },
  { code: 'OA-08', title: 'Draft procedural amendments (disclaimers, identification edits)', role: 'TRADEMARK_ANALYST', detail: 'Incorporate standard USPTO disclaimers or refine goods/services descriptions.' },
  { code: 'OA-09', title: 'Compile supporting evidence exhibits and declarations', role: 'PARALEGAL', detail: 'Assemble third-party registrations, dictionary definitions, marketing materials, and declarations.' },
  { code: 'OA-10', title: 'Senior Attorney approval and final signature on response', role: 'LEGAL', requiresApproval: 'LEGAL', detail: 'Sarah Jenkins, Esq. reviews full response package and signs declaration.' },
  { code: 'OA-11', title: 'Optional: file timely 3-month extension request if needed', role: 'DOCKETING', detail: 'File TEAS Request for Extension of Time if complex evidence gathering is pending.' },
  { code: 'OA-12', title: 'Submit TEAS Response to Office Action electronically', role: 'DOCKETING', detail: 'Transmit response to USPTO with all exhibits and confirmation verification.' },
  { code: 'OA-13', title: 'Archive submission receipt and track examining attorney docket', role: 'DOCKETING', detail: 'Verify filing appears in TSDR and docket review turnaround (typically 30-60 days).' },
  { code: 'OA-14', title: 'Monitor for Notice of Approval / Publication or Final Office Action', role: 'TRADEMARK_ANALYST', detail: 'Track subsequent action from Examining Attorney.' }
];

export const GAZETTE_STEPS: NodeStepItem[] = [
  { code: 'PUB-01', title: 'Review USPTO Notice of Publication and confirm date', role: 'DOCKETING', detail: 'Verify mark representation, class listing, and date in the Trademark Official Gazette.' },
  { code: 'PUB-02', title: 'Send publication confirmation and explanation to client', role: 'DOCKETING', detail: 'Notify client that mark will be published for 30-day opposition window.' },
  { code: 'PUB-03', title: 'Monitor 30-day opposition period via TTABVUE electronic docket', role: 'DOCKETING', criticalNote: 'Opposition must be filed within 30 days unless extension is granted', detail: 'Check for Notices of Opposition or Requests for Extension of Time to Oppose.' },
  { code: 'PUB-04', title: 'If potential opposer requests extension: review adverse party info', role: 'LEGAL', detail: 'Evaluate adverse party and determine whether settlement / coexistence discussion is warranted.' },
  { code: 'PUB-05', title: 'If no opposition filed: verify conclusion of publication period', role: 'DOCKETING', detail: 'Confirm completion of 30 days without adverse filings.' },
  { code: 'PUB-06', title: 'Track issuance of Notice of Allowance (for § 1(b) ITU applications)', role: 'DOCKETING', detail: 'Receive NOA from USPTO and trigger 6-month Statement of Use countdown.' },
  { code: 'PUB-07', title: 'Track issuance of Registration Certificate (for § 1(a) Use in Commerce)', role: 'DOCKETING', detail: 'For commercial use filings, skip SOU and receive final registration certificate directly.' }
];

export const SOU_STEPS: NodeStepItem[] = [
  { code: 'SOU-01', title: 'Docket 6-month statutory deadline from Notice of Allowance date', role: 'DOCKETING', criticalNote: 'Failure to file SOU or Extension within 6 months results in abandonment', detail: 'Enter primary deadline and 60-day warning alert in docketing calendar.' },
  { code: 'SOU-02', title: 'Client commercial use consultation and specimen requisition', role: 'DOCKETING', detail: 'Request proof of commercial sales and marketing materials demonstrating trademark use.' },
  { code: 'SOU-03', title: 'Rigorous commercial specimen compliance audit', role: 'TRADEMARK_ANALYST', detail: 'Ensure specimen shows mark on physical goods, tags, labels, or point-of-sale checkout website.' },
  { code: 'SOU-04', title: 'Verify dates of first use (anywhere and in interstate commerce)', role: 'LEGAL', detail: 'Confirm dates align with applicant sales records and commercial documentation.' },
  { code: 'SOU-05', title: 'Draft TEAS Statement of Use (SOU) form and verified declaration', role: 'PARALEGAL', detail: 'Prepare SOU filing with goods/services confirmation (deleting any unused items).' },
  { code: 'SOU-06', title: 'If commercial use not yet established: draft 6-Month Extension Request', role: 'DOCKETING', detail: 'Prepare TEAS Request for Extension of Time with good cause statement.' },
  { code: 'SOU-07', title: 'Client electronic execution of SOU or Extension declaration', role: 'DOCKETING', detail: 'Obtain authorized officer signature under penalty of perjury.' },
  { code: 'SOU-08', title: 'Submit TEAS SOU or Extension Request with statutory USPTO fee', role: 'DOCKETING', detail: 'Transmit electronic filing and pay fee per class.' },
  { code: 'SOU-09', title: 'Archive filing receipt and update matter tracking status', role: 'DOCKETING', detail: 'Log filing into matter tracking and update client on status.' },
  { code: 'SOU-10', title: 'Monitor Examining Attorney specimen review and approval', role: 'TRADEMARK_ANALYST', detail: 'Confirm specimen acceptance and issuance of registration order.' }
];

export const MAINTENANCE_STEPS: NodeStepItem[] = [
  { code: 'MAINT-01', title: 'Receive and docket official USPTO Trademark Registration Certificate', role: 'DOCKETING', detail: 'Verify certificate accuracy (owner, mark, class, disclaimer notes) and log Reg Number.' },
  { code: 'MAINT-02', title: 'Calendar statutory Section 8 & 15 window (Years 5 to 6)', role: 'DOCKETING', criticalNote: 'Section 8 window opens on 5th anniversary and closes on 6th anniversary', detail: 'Calculate exact dates and set alerts starting at month 54 post-registration.' },
  { code: 'MAINT-03', title: 'Calendar Section 8 & 9 renewal window (every 10-year anniversary)', role: 'DOCKETING', detail: 'Calendar 10-year renewal deadline with 6-month grace period.' },
  { code: 'MAINT-04', title: 'Issue Registration Packet and proper trademark usage guidelines to client', role: 'LEGAL', detail: 'Advise client on proper ® symbol usage, domain policing, and licensing compliance.' },
  { code: 'MAINT-05', title: 'Year 5 Audit: verify continuous commercial use across all registered classes', role: 'TRADEMARK_ANALYST', detail: 'Request updated commercial specimens demonstrating active use in commerce.' },
  { code: 'MAINT-06', title: 'Draft Section 8 Declaration of Continued Use & Section 15 Incontestability', role: 'PARALEGAL', detail: 'Prepare combined § 8 & § 15 filing securing incontestable status under Lanham Act.' },
  { code: 'MAINT-07', title: 'Senior Attorney review and client signature verification', role: 'LEGAL', requiresApproval: 'LEGAL', detail: 'Sarah Jenkins, Esq. validates continued use declarations and signs submission.' },
  { code: 'MAINT-08', title: 'Submit maintenance declaration and archive USPTO Acceptance Notice', role: 'DOCKETING', detail: 'File via TEAS, verify acceptance notice, and update docket to next 10-year renewal.' }
];
