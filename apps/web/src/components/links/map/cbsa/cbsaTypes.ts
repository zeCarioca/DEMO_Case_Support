import { SundayNewspaperInfo } from '../types.js';

export interface CbsaPolygonFeature {
  code: string;
  name: string;
  states: string[];
  primaryCity: string;
  cx: number;
  cy: number;
  path: string;
}

export interface CbsaHoverInfo {
  feature: CbsaPolygonFeature;
  x: number;
  y: number;
  recommendedPaper?: SundayNewspaperInfo;
}
