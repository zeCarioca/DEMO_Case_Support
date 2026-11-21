export type TrademarkStage =
  | 'Clearance & Search'
  | 'Pending Examination'
  | 'Office Action (Response Due)'
  | 'Published for Opposition'
  | 'Notice of Allowance (SOU Due)'
  | 'Registered (Active Maintenance)';

export type MarkType =
  | 'Standard Character (Word Mark)'
  | 'Special Form (Stylized Logo)'
  | 'Sound / Non-Traditional Mark';

export type FilingBasis =
  | 'Section 1(b) Intent-to-Use'
  | 'Section 1(a) Use in Commerce'
  | 'Section 44(d) Foreign Priority'
  | 'Section 44(e) Foreign Registration'
  | 'Section 66(a) Madrid Protocol';

export interface CaseTemplateData {
  stage: TrademarkStage;
  markName: string;
  markType: MarkType;
  filingBasis: FilingBasis;
  applicant: string;
  classes: string;
  serialNumber: string;
  registrationNumber?: string;
  statutoryDeadline?: string;
  notes: string;
}

export type CaseTemplateTab = 'standard' | 'generator';

export interface SavedDraft {
  id: string;
  timestamp: number;
  label: string;
  data: CaseTemplateData;
  formattedText: string;
}

export interface CasePreset {
  id: string;
  label: string;
  description: string;
  data: CaseTemplateData;
}
