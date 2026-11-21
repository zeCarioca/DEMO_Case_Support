import { CaseTemplateData, CasePreset } from './types.js';

export const DEFAULT_SAMPLE_CASE: CaseTemplateData = {
  stage: 'Pending Examination',
  markName: 'NEXUS CLOUD',
  markType: 'Standard Character (Word Mark)',
  filingBasis: 'Section 1(b) Intent-to-Use',
  applicant: 'Apex Technologies Inc. (Delaware C-Corp)',
  classes: 'Class 009 (Downloadable Software), Class 042 (Cloud SaaS Platform)',
  serialNumber: '98/821,432 (Filed: 01/20/2026)',
  registrationNumber: '',
  statutoryDeadline: 'Examining Attorney Assignment expected: 07/2026',
  notes: 'TESS clearance completed with zero identical citations; ITU basis; Specimen checkout in active development'
};

export const EMPTY_CASE: CaseTemplateData = {
  stage: 'Clearance & Search',
  markName: '',
  markType: 'Standard Character (Word Mark)',
  filingBasis: 'Section 1(b) Intent-to-Use',
  applicant: '',
  classes: '',
  serialNumber: '',
  registrationNumber: '',
  statutoryDeadline: '',
  notes: ''
};

export const CASE_PRESETS: CasePreset[] = [
  {
    id: 'saas-dual-class',
    label: 'SaaS Platform (Classes 009/042 ITU)',
    description: 'Enterprise cloud software with dual-class Intent-to-Use filing basis',
    data: DEFAULT_SAMPLE_CASE
  },
  {
    id: 'hardware-commercial-use',
    label: 'Hardware & IoT (Class 009 In-Commerce)',
    description: 'Commercial IoT device with verified physical packaging specimen',
    data: {
      stage: 'Published for Opposition',
      markName: 'VELOX SENSOR',
      markType: 'Special Form (Stylized Logo)',
      filingBasis: 'Section 1(a) Use in Commerce',
      applicant: 'Velox Robotics Systems LLC (California LLC)',
      classes: 'Class 009 (Industrial IoT Sensors and Telemetry Hardware)',
      serialNumber: '97/912,845 (Filed: 08/10/2025)',
      registrationNumber: '',
      statutoryDeadline: 'Gazette Publication: 04/14/2026 (30-day opposition window)',
      notes: 'Physical packaging specimen approved by Examining Attorney; No § 2(d) citations; TMOG publication scheduled'
    }
  },
  {
    id: 'madrid-cross-border',
    label: 'Madrid Protocol Extension (§ 44d)',
    description: 'International priority claim under Paris Convention from EUIPO filing',
    data: {
      stage: 'Office Action (Response Due)',
      markName: 'AURA SOUNDWORKS',
      markType: 'Standard Character (Word Mark)',
      filingBasis: 'Section 44(d) Foreign Priority',
      applicant: 'Aura Soundworks Ltd. (UK Registered Company)',
      classes: 'Class 009 (Audio DSP Hardware), Class 038 (Audio Streaming)',
      serialNumber: '98/104,789 (Filed: 11/05/2025)',
      registrationNumber: '',
      statutoryDeadline: 'Office Action Response Deadline: 06/15/2026 (TMA 3-Month Window)',
      notes: 'Non-Final OA received: Disclaimer of "SOUNDWORKS" requested. Foreign certified priority copy deposited.'
    }
  },
  {
    id: 'portfolio-maintenance',
    label: 'Active Registration Maintenance (§ 8 & 15)',
    description: 'Registered brand approaching 5th-year post-registration maintenance window',
    data: {
      stage: 'Registered (Active Maintenance)',
      markName: 'QUANTUM LOGIC',
      markType: 'Standard Character (Word Mark)',
      filingBasis: 'Section 1(a) Use in Commerce',
      applicant: 'Quantum Logic Global Inc. (Delaware C-Corp)',
      classes: 'Class 042 (High-Performance Computing Infrastructure)',
      serialNumber: '90/123,456 (Filed: 05/12/2020)',
      registrationNumber: 'Reg. # 6,450,192 (Registered: 06/18/2021)',
      statutoryDeadline: 'Section 8 & 15 Window Opens: 06/18/2026 | Deadline: 06/18/2027',
      notes: 'Active commercial usage verified on live portal; Incontestability claim prepared for Section 15 declaration.'
    }
  }
];

export interface GuidanceCard {
  step: string;
  title: string;
  description: string;
}

export const GUIDANCE_CARDS: GuidanceCard[] = [
  {
    step: '01',
    title: 'Matter Stage & Filing Basis',
    description: 'Always specify the exact USPTO status (ITU, In-Commerce, Published, or Registered) on Line 1 for immediate docket triage.'
  },
  {
    step: '02',
    title: 'Mark Drawing & Classes',
    description: 'Record standard character wording or logo drawing type and exact Nice Classification classes (Classes 001-045).'
  },
  {
    step: '03',
    title: 'Serial Number & Deadlines',
    description: 'Record the 8-digit USPTO Serial # (98/xxx,xxx) and strict statutory deadlines (TMA 3-month Office Action or SOU window).'
  },
  {
    step: '04',
    title: 'Specimen Audit & Strategy',
    description: 'Document specimen compliance (e-commerce checkout proof vs packaging) and disclaimers agreed with the Examining Attorney.'
  }
];

export const RAW_STANDARD_TEMPLATE = `[TRADEMARK MATTER STAGE]: Pending Examination OR Office Action Due OR Published
MARK NAME: [Mark Character String or Logo Name]
MARK TYPE: Standard Character (Word Mark) OR Special Form (Stylized Logo)
FILING BASIS: Section 1(b) (Intent-to-Use) OR Section 1(a) (In-Commerce) OR Section 44(d) (Foreign Priority)
APPLICANT (OWNER): [Full Legal Corporate Entity & Domicile]

NICE CLASSIFICATION & SCOPE:
• International Class(es): Class [009 / 042 / 035...]
• Goods & Services: [Summary of core goods/services identified in application]

USPTO DOCKETING IDENTIFIERS & DEADLINES:
• Serial Number: [8-digit USPTO Serial # (e.g., 98/xxx,xxx)] (Filed: MM/DD/YYYY)
• Registration Number: [Optional: Reg. # x,xxx,xxx] (Registered: MM/DD/YYYY)
• Statutory Deadline: [Office Action Response / SOU Due / Gazette Opposition Cutoff]

SPECIMEN STATUS & DOCKET NOTES:
• Specimen Audit: Verified Point-of-Sale Checkout / Label / Packaging / Pending ITU
• Notes: [e.g., Disclaimer of terms, § 2(d) citation response, priority claim validated]`;
