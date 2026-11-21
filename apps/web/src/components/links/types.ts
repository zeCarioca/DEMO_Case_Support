export type GovAgency = 'DOL' | 'USCIS' | 'DOS' | 'CBP' | 'SWA' | 'OTHER';

export type GovLinkCategory =
  | 'DOL_LABOR'
  | 'USCIS_IMMIGRATION'
  | 'DOS_CONSULAR'
  | 'CBP_LOGISTICS'
  | 'SWA_STATE_WORKFORCE';

export interface GovernmentLink {
  id: string;
  title: string;
  agency: GovAgency;
  category: GovLinkCategory;
  url: string;
  badge: string;
  description: string;
  isOfficialGov: boolean;
  criticalNote?: string;
}

export interface CategoryFilterOption {
  id: 'ALL' | GovLinkCategory;
  label: string;
}
