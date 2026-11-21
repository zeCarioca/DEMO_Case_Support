export type MapMode = 'SWA' | 'NEWSPAPER';

export interface StateSwaInfo {
  code: string;
  name: string;
  portalName: string;
  url: string;
  displayUrl: string;
  systemNote?: string;
}

export interface SundayNewspaperInfo {
  id: string;
  name: string;
  stateCode: string;
  stateName: string;
  primaryCity: string;
  metroArea: string;
  countiesCovered: string[];
  zipPrefixes: string[];
  circulationTier: 'Nacional / Major Metro' | 'Metropolitano Regional' | 'Estadual / Local';
  estimatedSundayCirculation?: string;
  websiteUrl: string;
  classifiedsEmail?: string;
  classifiedsUrl?: string;
  permNotes: string;
  alternativePapers?: string[];
}

export interface NewspaperCityMarker {
  id: string;
  city: string;
  stateCode: string;
  newspaperId: string;
  newspaperName: string;
  x: number;
  y: number;
  labelOffsetX?: number;
  labelOffsetY?: number;
  isPrimary?: boolean;
  isMetropolis?: boolean;
  metroRadius?: number;
}

export interface CityLimitZone {
  id: string;
  city: string;
  stateCode: string;
  newspaperId: string;
  path: string;
  center: { x: number; y: number };
}

export interface HoveredStateCoord {
  code: string;
  name: string;
  city?: string;
  swa?: StateSwaInfo;
  newspaper?: SundayNewspaperInfo;
  x: number;
  y: number;
}

import { PermResolutionResponse } from '@case-support/shared-types';

export interface NewspaperSearchResult {
  query: string;
  matchType: 'ZIP' | 'CITY' | 'ADDRESS' | 'STATE';
  matchedLocation: string;
  newspaper: SundayNewspaperInfo;
  allStatePapers?: SundayNewspaperInfo[];
  permResolution?: PermResolutionResponse;
}

