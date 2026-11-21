import { CbsaPolygonFeature } from './cbsaTypes.js';
import { CBSA_DATA_PART_1 } from './cbsaDataPart1.js';
import { CBSA_DATA_PART_2 } from './cbsaDataPart2.js';
import { CBSA_DATA_PART_3 } from './cbsaDataPart3.js';
import { CBSA_DATA_PART_4 } from './cbsaDataPart4.js';

export * from './cbsaTypes.js';

// All 382 Official Census Metropolitan Statistical Areas (LSAD = 'M1')
export const CBSA_POLYGONS: CbsaPolygonFeature[] = [
  ...CBSA_DATA_PART_1,
  ...CBSA_DATA_PART_2,
  ...CBSA_DATA_PART_3,
  ...CBSA_DATA_PART_4
];

export const CBSA_MAP: Record<string, CbsaPolygonFeature> = CBSA_POLYGONS.reduce(
  (acc, item) => {
    acc[item.code] = item;
    return acc;
  },
  {} as Record<string, CbsaPolygonFeature>
);

// High-confidence ZIP to CBSA lookup for major cross-state and key metro hubs
export const KNOWN_ZIP_TO_CBSA: Record<string, string> = {
  // NYC MSA (35620) - NY, NJ, PA
  '07302': '35620', // Jersey City, NJ
  '07030': '35620', // Hoboken, NJ
  '07102': '35620', // Newark, NJ
  '10001': '35620', // New York, NY
  '11201': '35620', // Brooklyn, NY
  '18360': '35620', // Stroudsburg, PA (Pike County)
  // DMV MSA (47900) - DC, VA, MD, WV
  '20001': '47900', // Washington, DC
  '22201': '47900', // Arlington, VA
  '22314': '47900', // Alexandria, VA
  '20850': '47900', // Rockville, MD
  // Philadelphia MSA (37980) - PA, NJ, DE, MD
  '19104': '37980', // Philadelphia, PA
  '08102': '37980', // Camden, NJ
  '19801': '37980', // Wilmington, DE
  // Chicago MSA (16980) - IL, IN, WI
  '60601': '16980', // Chicago, IL
  '46320': '16980', // Hammond, IN
  '53140': '16980', // Kenosha, WI
  // Texas Metros
  '79901': '21340', // El Paso, TX
  '75201': '19100', // Dallas, TX
  '76102': '19100', // Fort Worth, TX
  '77002': '26420', // Houston, TX
  '78701': '12420', // Austin, TX
  '78205': '41700'  // San Antonio, TX
};

/**
 * Searches for a CBSA polygon matching a user search term (ZIP, City, or Metro Name)
 */
export function findCbsaForQuery(query: string): CbsaPolygonFeature | undefined {
  const trimmed = query.trim();
  if (!trimmed) return undefined;

  // 1. Direct 5-digit ZIP lookup
  const zipMatch = trimmed.match(/\b\d{5}\b/);
  if (zipMatch && KNOWN_ZIP_TO_CBSA[zipMatch[0]]) {
    const code = KNOWN_ZIP_TO_CBSA[zipMatch[0]];
    return CBSA_MAP[code];
  }

  // 2. Direct CBSA Code match (e.g. "35620")
  if (CBSA_MAP[trimmed]) {
    return CBSA_MAP[trimmed];
  }

  // 3. Name or City matching
  const cleanQ = trimmed.toLowerCase();
  
  // Exact primary city match
  const exactCity = CBSA_POLYGONS.find(
    (c) => c.primaryCity.toLowerCase() === cleanQ
  );
  if (exactCity) return exactCity;

  // Substring match in primary city or official census name
  return CBSA_POLYGONS.find((c) => {
    const cName = c.name.toLowerCase();
    const pCity = c.primaryCity.toLowerCase();
    return cName.includes(cleanQ) || cleanQ.includes(pCity);
  });
}

/**
 * Finds all CBSA polygons touching a specific state
 */
export function getCbsasForState(stateCode: string): CbsaPolygonFeature[] {
  const upper = stateCode.toUpperCase();
  return CBSA_POLYGONS.filter((c) => c.states.includes(upper));
}
