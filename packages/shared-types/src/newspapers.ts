import { z } from 'zod';

export type ResolutionMatchedVia = 'CBSA_BOUNDARY' | 'COUNTY' | 'RURAL_FALLBACK_RADIUS';

export interface WorksiteLocation {
  zip?: string;
  resolved_zip?: string;
  city?: string;
  state?: string;
  county_fips?: string;
  county_name?: string;
  cbsa_code?: string;
  cbsa_name?: string;
  area_type?: 'METROPOLITAN' | 'MICROPOLITAN' | 'RURAL_NON_CBSA';
  lsad_code?: string;
  is_po_box_fallback?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ResolutionStrategy {
  matched_via: ResolutionMatchedVia;
  is_rural_exception: boolean;
  cross_state_notice: boolean;
  legal_basis: string;
  legal_citation: string;
  compliance_note: string;
  distance_miles?: number;
}

export interface PermNewspaperResult {
  id: string;
  name: string;
  sunday_circulation: number;
  is_primary_metro_daily: boolean;
  has_sunday_print_edition: boolean;
  compliance_tier: 'LOW_RISK' | 'MEDIUM_RISK' | 'REQUIRES_AFFIDAVIT';
  ad_deadline: string;
  website_url: string;
  classifieds_email?: string;
  headquarters_state: string;
  headquarters_city?: string;
  primary_cbsa_code?: string;
  counties_covered?: string[];
}

export type DolCommuteRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface CommuteAssessment {
  straight_line_miles: number;
  estimated_driving_miles: number;
  circuity_factor: number;
  risk_level: DolCommuteRiskLevel;
  dol_rationale: string;
}

export interface PermResolutionResponse {
  worksite: WorksiteLocation;
  resolution_strategy: ResolutionStrategy;
  recommended_newspaper: PermNewspaperResult;
  commute_assessment?: CommuteAssessment;
  closest_alternative_newspaper?: PermNewspaperResult;
  alternatives: PermNewspaperResult[];
}

export const PermResolutionRequestSchema = z.object({
  zip_code: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  county_fips: z.string().optional(),
  cbsa_code: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional()
});

export type PermResolutionRequest = z.infer<typeof PermResolutionRequestSchema>;
