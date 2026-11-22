export type LearnCategory = 'FORM' | 'PROTOCOL' | 'DOCUMENT';

export interface LearnItem {
  id: string;
  category: LearnCategory;
  code: string;
  title: string;
  subtitle: string;
  agency: 'USPTO' | 'TTAB' | 'WIPO' | 'USCO' | 'INTERNAL';
  summary: string;
  legalBasis?: string;
  responsibleRoles: string[];
  criticalRules: string[];
  submissionChecklist: string[];
  officialUrl?: string;
  relatedPhaseId: string;
  relatedPhaseName: string;
}
