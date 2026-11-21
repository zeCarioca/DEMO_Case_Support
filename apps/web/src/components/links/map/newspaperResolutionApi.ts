import { PermResolutionResponse, PermResolutionRequest } from '@case-support/shared-types';
import { SundayNewspaperInfo, NewspaperSearchResult } from './types.js';
import { getNewspapersByState } from './newspaperSearchUtils.js';
import { USA_SWA_STATES } from './usaSwaData.js';

export function convertResolutionToSearchResult(
  query: string,
  res: PermResolutionResponse
): NewspaperSearchResult {
  const paper: SundayNewspaperInfo = {
    id: res.recommended_newspaper.id,
    name: res.recommended_newspaper.name,
    stateCode: res.recommended_newspaper.headquarters_state,
    stateName: USA_SWA_STATES[res.recommended_newspaper.headquarters_state]?.name || res.recommended_newspaper.headquarters_state,
    primaryCity: res.recommended_newspaper.headquarters_city || res.worksite.city || '',
    metroArea: res.worksite.cbsa_name || res.recommended_newspaper.headquarters_city || '',
    countiesCovered: res.recommended_newspaper.counties_covered || [res.worksite.county_name || ''].filter(Boolean),
    zipPrefixes: res.worksite.zip ? [res.worksite.zip.slice(0, 3)] : [],
    circulationTier: res.recommended_newspaper.is_primary_metro_daily
      ? 'Nacional / Major Metro'
      : res.recommended_newspaper.has_sunday_print_edition
      ? 'Metropolitano Regional'
      : 'Estadual / Local',
    estimatedSundayCirculation: res.recommended_newspaper.sunday_circulation > 0
      ? `${res.recommended_newspaper.sunday_circulation.toLocaleString()} exemplares`
      : 'Publicação local periódica (Sem edição de domingo)',
    websiteUrl: res.recommended_newspaper.website_url,
    classifiedsEmail: res.recommended_newspaper.classifieds_email,
    classifiedsUrl: res.recommended_newspaper.website_url,
    permNotes: res.resolution_strategy.compliance_note,
    alternativePapers: res.alternatives.map((a) => a.name)
  };

  const locationDisplay = res.worksite.city && res.worksite.state
    ? `${res.worksite.city}, ${res.worksite.state}${res.worksite.zip ? ` (${res.worksite.zip})` : ''}`
    : res.worksite.zip ? `CEP ${res.worksite.zip}` : query;

  return {
    query,
    matchType: res.worksite.zip ? 'ZIP' : 'CITY',
    matchedLocation: locationDisplay,
    newspaper: paper,
    allStatePapers: getNewspapersByState(res.recommended_newspaper.headquarters_state),
    permResolution: res
  };
}

export async function resolvePermNewspaperApi(
  query: string
): Promise<NewspaperSearchResult | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const payload: PermResolutionRequest = {};

  const zipMatch = trimmed.match(/\b\d{5}\b/) || trimmed.match(/^\d{3,5}$/);
  if (zipMatch) {
    payload.zip_code = zipMatch[0];
  } else if (trimmed.includes(',')) {
    const parts = trimmed.split(',').map((p) => p.trim());
    payload.city = parts[0];
    if (parts[1]) {
      payload.state = parts[1].slice(0, 2).toUpperCase();
    }
  } else {
    payload.city = trimmed;
  }

  try {
    const res = await fetch('/api/newspapers/resolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data: PermResolutionResponse = await res.json();
      return convertResolutionToSearchResult(trimmed, data);
    }
  } catch {
    // API unavailable - return null to let local fallback handle
  }

  return null;
}

export async function resolvePermNewspaperByCbsa(
  cbsaCode: string,
  cbsaName: string,
  primaryCity?: string,
  state?: string
): Promise<NewspaperSearchResult | null> {
  const payload: PermResolutionRequest = {
    cbsa_code: cbsaCode,
    city: primaryCity,
    state: state
  };

  try {
    const res = await fetch('/api/newspapers/resolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data: PermResolutionResponse = await res.json();
      return convertResolutionToSearchResult(`CBSA ${cbsaCode} (${cbsaName})`, data);
    }
  } catch {
    // API unavailable
  }

  return null;
}

