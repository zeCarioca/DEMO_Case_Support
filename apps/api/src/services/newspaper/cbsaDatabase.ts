import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { WorksiteLocation } from '@case-support/shared-types';
import type { KnownZipEntry } from './knownZipDatabase.js';
import { KNOWN_ZIP_DATABASE } from './knownZipDatabase.js';
import type { CbsaDefinition } from './cbsaRegistry.js';
import { CBSA_REGISTRY } from './cbsaRegistry.js';

const currentDir = dirname(fileURLToPath(import.meta.url));

function loadJsonSafe<T>(filename: string): T {
  const candidates = [
    join(currentDir, filename),
    join(currentDir, '../../../../apps/api/src/services/newspaper', filename),
    join(currentDir, '../../../../src/services/newspaper', filename),
    join(process.cwd(), 'apps/api/src/services/newspaper', filename),
    join(process.cwd(), 'apps/api/dist/services/newspaper', filename)
  ];
  for (const p of candidates) {
    if (existsSync(p)) {
      try {
        return JSON.parse(readFileSync(p, 'utf-8')) as T;
      } catch {
        // continue
      }
    }
  }
  return {} as T;
}

const CENSUS_ZCTA_MAP = loadJsonSafe<Record<string, [string | null, number | null, number | null]>>('censusZctaMap.json');
const CENSUS_CBSA_REGISTRY = loadJsonSafe<Record<string, { name: string; lsad: string; area_type: 'METROPOLITAN' | 'MICROPOLITAN' }>>('censusCbsaRegistry.json');

export { KNOWN_ZIP_DATABASE, CBSA_REGISTRY };
export type { KnownZipEntry, CbsaDefinition };

// Authoritative USPS 3-digit prefix to state mapping
export function getStateFromZipPrefix(zip: string): string | undefined {
  const clean = zip.trim().padStart(5, '0');
  const p = parseInt(clean.substring(0, 3), 10);
  if (p >= 10 && p <= 27) return 'MA';
  if (p >= 28 && p <= 29) return 'RI';
  if (p >= 30 && p <= 38) return 'NH';
  if (p >= 39 && p <= 49) return 'ME';
  if (p >= 50 && p <= 59) return 'VT';
  if (p >= 60 && p <= 69) return 'CT';
  if (p >= 70 && p <= 89) return 'NJ';
  if (p >= 100 && p <= 149) return 'NY';
  if (p >= 150 && p <= 196) return 'PA';
  if (p >= 197 && p <= 199) return 'DE';
  if (p >= 200 && p <= 205) return 'DC';
  if (p >= 206 && p <= 219) return 'MD';
  if (p >= 220 && p <= 246) return 'VA';
  if (p >= 247 && p <= 268) return 'WV';
  if (p >= 270 && p <= 289) return 'NC';
  if (p >= 290 && p <= 299) return 'SC';
  if (p >= 300 && p <= 319) return 'GA';
  if (p >= 320 && p <= 349) return 'FL';
  if (p >= 350 && p <= 369) return 'AL';
  if (p >= 370 && p <= 385) return 'TN';
  if (p >= 386 && p <= 397) return 'MS';
  if (p >= 400 && p <= 427) return 'KY';
  if (p >= 430 && p <= 459) return 'OH';
  if (p >= 460 && p <= 479) return 'IN';
  if (p >= 480 && p <= 499) return 'MI';
  if (p >= 500 && p <= 528) return 'IA';
  if (p >= 530 && p <= 549) return 'WI';
  if (p >= 550 && p <= 567) return 'MN';
  if (p >= 570 && p <= 577) return 'SD';
  if (p >= 580 && p <= 588) return 'ND';
  if (p >= 590 && p <= 599) return 'MT';
  if (p >= 600 && p <= 629) return 'IL';
  if (p >= 630 && p <= 658) return 'MO';
  if (p >= 660 && p <= 679) return 'KS';
  if (p >= 680 && p <= 693) return 'NE';
  if (p >= 700 && p <= 714) return 'LA';
  if (p >= 716 && p <= 729) return 'AR';
  if (p >= 730 && p <= 749) return 'OK';
  if (p >= 750 && p <= 799) return 'TX';
  if (p >= 800 && p <= 816) return 'CO';
  if (p >= 820 && p <= 831) return 'WY';
  if (p >= 832 && p <= 838) return 'ID';
  if (p >= 840 && p <= 847) return 'UT';
  if (p >= 850 && p <= 865) return 'AZ';
  if (p >= 870 && p <= 884) return 'NM';
  if (p >= 889 && p <= 898) return 'NV';
  if (p >= 900 && p <= 961) return 'CA';
  if (p >= 967 && p <= 968) return 'HI';
  if (p >= 970 && p <= 979) return 'OR';
  if (p >= 980 && p <= 994) return 'WA';
  if (p >= 995 && p <= 999) return 'AK';
  return undefined;
}

// Secondary PO Box & Unique Non-ZCTA Directory
const PO_BOX_CROSSWALK: Record<string, { parent_zcta: string; city: string; state: string }> = {
  '90213': { parent_zcta: '90210', city: 'Beverly Hills', state: 'CA' },
  '10008': { parent_zcta: '10001', city: 'New York', state: 'NY' },
  '33119': { parent_zcta: '33139', city: 'Miami Beach', state: 'FL' },
  '60690': { parent_zcta: '60601', city: 'Chicago', state: 'IL' },
  '75260': { parent_zcta: '75201', city: 'Dallas', state: 'TX' },
  '41310': { parent_zcta: '41858', city: 'Blackey', state: 'KY' },
  '85532': { parent_zcta: '85501', city: 'Claypool', state: 'AZ' }
};

export function lookupWorksiteLocation(params: {
  zip_code?: string;
  city?: string;
  state?: string;
  county_fips?: string;
  cbsa_code?: string;
  lat?: number;
  lng?: number;
}): WorksiteLocation {
  const { zip_code, city, state, county_fips, cbsa_code, lat, lng } = params;

  // 1. Census ZCTA & PO Box Spatial Resolution
  if (zip_code) {
    const cleanZip = zip_code.trim().padStart(5, '0');
    let targetZip = cleanZip;
    let isPoBox = false;

    // Check PO Box crosswalk
    if (PO_BOX_CROSSWALK[cleanZip]) {
      targetZip = PO_BOX_CROSSWALK[cleanZip].parent_zcta;
      isPoBox = true;
    }

    const prefixState = getStateFromZipPrefix(cleanZip);

    // Check Census ZCTA Pre-computed Data (33,144 national ZCTAs)
    if (CENSUS_ZCTA_MAP[targetZip]) {
      const [resolvedCbsaCode, zctaLat, zctaLng] = CENSUS_ZCTA_MAP[targetZip];
      const coords = zctaLat !== null && zctaLng !== null ? { lat: zctaLat, lng: zctaLng } : undefined;

      if (resolvedCbsaCode) {
        const cbsaMeta = CENSUS_CBSA_REGISTRY[resolvedCbsaCode];
        const legacyCbsa = CBSA_REGISTRY[resolvedCbsaCode];
        const knownCity = KNOWN_ZIP_DATABASE[cleanZip]?.city || PO_BOX_CROSSWALK[cleanZip]?.city || city;
        const knownState = KNOWN_ZIP_DATABASE[cleanZip]?.state || PO_BOX_CROSSWALK[cleanZip]?.state || state;
        const cbsaStateMatch = cbsaMeta?.name.split(',')[1]?.trim()?.split('-')[0];

        return {
          zip: cleanZip,
          resolved_zip: isPoBox ? targetZip : undefined,
          city: knownCity || cbsaMeta?.name.split(',')[0] || legacyCbsa?.cbsa_name.split(',')[0],
          state: knownState || prefixState || legacyCbsa?.states[0] || cbsaStateMatch,
          county_fips: KNOWN_ZIP_DATABASE[cleanZip]?.county_fips,
          county_name: KNOWN_ZIP_DATABASE[cleanZip]?.county_name,
          cbsa_code: resolvedCbsaCode,
          cbsa_name: cbsaMeta?.name || legacyCbsa?.cbsa_name,
          area_type: cbsaMeta?.area_type || (cbsaMeta?.lsad === 'M1' ? 'METROPOLITAN' : 'MICROPOLITAN'),
          lsad_code: cbsaMeta?.lsad || 'M1',
          is_po_box_fallback: isPoBox,
          coordinates: coords || (lat && lng ? { lat, lng } : undefined)
        };
      }

      // Rural / Non-CBSA ZCTA
      return {
        zip: cleanZip,
        resolved_zip: isPoBox ? targetZip : undefined,
        city: city || KNOWN_ZIP_DATABASE[cleanZip]?.city || PO_BOX_CROSSWALK[cleanZip]?.city || 'Rural Area',
        state: state || KNOWN_ZIP_DATABASE[cleanZip]?.state || PO_BOX_CROSSWALK[cleanZip]?.state || prefixState || 'US',
        county_fips: county_fips || KNOWN_ZIP_DATABASE[cleanZip]?.county_fips,
        county_name: KNOWN_ZIP_DATABASE[cleanZip]?.county_name,
        cbsa_code: undefined,
        area_type: 'RURAL_NON_CBSA',
        is_po_box_fallback: isPoBox,
        coordinates: coords || (lat && lng ? { lat, lng } : undefined)
      };
    }

    // Direct match in legacy known database
    if (KNOWN_ZIP_DATABASE[cleanZip]) {
      const entry = KNOWN_ZIP_DATABASE[cleanZip];
      const cbsa = entry.cbsa_code ? (CENSUS_CBSA_REGISTRY[entry.cbsa_code] || CBSA_REGISTRY[entry.cbsa_code]) : undefined;
      return {
        zip: entry.zip,
        city: entry.city,
        state: entry.state,
        county_fips: entry.county_fips,
        county_name: entry.county_name,
        cbsa_code: entry.cbsa_code,
        cbsa_name: (cbsa as any)?.name || (cbsa as any)?.cbsa_name,
        area_type: (cbsa as any)?.area_type || 'METROPOLITAN',
        coordinates: { lat: entry.lat, lng: entry.lng }
      };
    }
  }

  // 2. Direct CBSA code provided
  if (cbsa_code) {
    const cbsa = CENSUS_CBSA_REGISTRY[cbsa_code] || CBSA_REGISTRY[cbsa_code];
    const cbsaName = (cbsa as any)?.name || (cbsa as any)?.cbsa_name || `CBSA ${cbsa_code}`;
    const areaType = (cbsa as any)?.area_type || 'METROPOLITAN';
    return {
      zip: zip_code,
      city: city || cbsaName.split(',')[0],
      state: state || (cbsa as any)?.states?.[0] || 'US',
      county_fips: county_fips || (cbsa as any)?.primary_fips?.[0],
      cbsa_code,
      cbsa_name: cbsaName,
      area_type: areaType,
      lsad_code: (cbsa as any)?.lsad || 'M1',
      coordinates: lat && lng ? { lat, lng } : undefined
    };
  }

  // 3. Fallback default worksite
  const fallbackPrefixState = zip_code ? getStateFromZipPrefix(zip_code.trim().padStart(5, '0')) : undefined;
  return {
    zip: zip_code,
    city: city || 'Unknown City',
    state: state || fallbackPrefixState || 'US',
    county_fips,
    cbsa_code,
    coordinates: lat && lng ? { lat, lng } : undefined
  };
}
