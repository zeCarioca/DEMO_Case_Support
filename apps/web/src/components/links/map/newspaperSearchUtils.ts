import { SundayNewspaperInfo, NewspaperSearchResult } from './types.js';
import { SUNDAY_NEWSPAPERS } from './newspaperData.js';
import { STATE_PRIMARY_NEWSPAPERS } from './newspaperStateFallbacks.js';
import { USA_SWA_STATES } from './usaSwaData.js';

// Rough state zip code ranges for 100% US coverage fallback
const ZIP_TO_STATE: Array<{ min: number; max: number; state: string }> = [
  { min: 1000, max: 2799, state: 'MA' },
  { min: 2800, max: 2999, state: 'RI' },
  { min: 3000, max: 3899, state: 'NH' },
  { min: 3900, max: 4999, state: 'ME' },
  { min: 5000, max: 5999, state: 'VT' },
  { min: 6000, max: 6999, state: 'CT' },
  { min: 7000, max: 8999, state: 'NJ' },
  { min: 10000, max: 14999, state: 'NY' },
  { min: 15000, max: 19699, state: 'PA' },
  { min: 19700, max: 19999, state: 'DE' },
  { min: 20000, max: 20599, state: 'DC' },
  { min: 20600, max: 21999, state: 'MD' },
  { min: 22000, max: 24699, state: 'VA' },
  { min: 24700, max: 26999, state: 'WV' },
  { min: 27000, max: 28999, state: 'NC' },
  { min: 29000, max: 29999, state: 'SC' },
  { min: 30000, max: 31999, state: 'GA' },
  { min: 32000, max: 34999, state: 'FL' },
  { min: 35000, max: 36999, state: 'AL' },
  { min: 37000, max: 38599, state: 'TN' },
  { min: 38600, max: 39999, state: 'MS' },
  { min: 40000, max: 42799, state: 'KY' },
  { min: 43000, max: 45999, state: 'OH' },
  { min: 46000, max: 47999, state: 'IN' },
  { min: 48000, max: 49999, state: 'MI' },
  { min: 50000, max: 52999, state: 'IA' },
  { min: 53000, max: 54999, state: 'WI' },
  { min: 55000, max: 56799, state: 'MN' },
  { min: 57000, max: 57799, state: 'SD' },
  { min: 58000, max: 58999, state: 'ND' },
  { min: 59000, max: 59999, state: 'MT' },
  { min: 60000, max: 62999, state: 'IL' },
  { min: 63000, max: 65999, state: 'MO' },
  { min: 66000, max: 67999, state: 'KS' },
  { min: 68000, max: 69999, state: 'NE' },
  { min: 70000, max: 71599, state: 'LA' },
  { min: 71600, max: 72999, state: 'AR' },
  { min: 73000, max: 74999, state: 'OK' },
  { min: 75000, max: 79999, state: 'TX' },
  { min: 80000, max: 81699, state: 'CO' },
  { min: 82000, max: 83199, state: 'WY' },
  { min: 83200, max: 83999, state: 'ID' },
  { min: 84000, max: 84799, state: 'UT' },
  { min: 85000, max: 86599, state: 'AZ' },
  { min: 87000, max: 88499, state: 'NM' },
  { min: 88900, max: 89899, state: 'NV' },
  { min: 90000, max: 96199, state: 'CA' },
  { min: 96700, max: 96899, state: 'HI' },
  { min: 97000, max: 97999, state: 'OR' },
  { min: 98000, max: 99499, state: 'WA' },
  { min: 99500, max: 99999, state: 'AK' }
];

export function getNewspapersByState(stateCode: string): SundayNewspaperInfo[] {
  const primaryPapers = SUNDAY_NEWSPAPERS.filter((p) => p.stateCode === stateCode);
  if (primaryPapers.length > 0) return primaryPapers;

  const fallback = STATE_PRIMARY_NEWSPAPERS[stateCode];
  const stateMeta = USA_SWA_STATES[stateCode];
  if (fallback && stateMeta) {
    return [
      {
        ...fallback,
        stateCode,
        stateName: stateMeta.name
      }
    ];
  }
  return [];
}

export function searchSundayNewspaper(rawQuery: string): NewspaperSearchResult | null {
  const query = rawQuery.trim();
  if (!query) return null;

  // 1. Check for 5-digit or 3-digit Zip Code in string
  const zipMatch = query.match(/\b\d{5}\b/) || query.match(/^\d{3,5}$/);
  if (zipMatch) {
    const zipStr = zipMatch[0];
    const zipPrefix3 = zipStr.slice(0, 3);

    // Look for exact zipPrefix match in curated database
    const directPaper = SUNDAY_NEWSPAPERS.find((p) => p.zipPrefixes.includes(zipPrefix3));
    if (directPaper) {
      return {
        query,
        matchType: 'ZIP',
        matchedLocation: `CEP ${zipStr} (${directPaper.primaryCity}, ${directPaper.stateCode})`,
        newspaper: directPaper,
        allStatePapers: getNewspapersByState(directPaper.stateCode)
      };
    }

    // Fallback by numeric range
    const zipNum = parseInt(zipStr, 10);
    const rangeEntry = ZIP_TO_STATE.find((r) => zipNum >= r.min && zipNum <= r.max);
    if (rangeEntry) {
      const statePapers = getNewspapersByState(rangeEntry.state);
      if (statePapers.length > 0) {
        return {
          query,
          matchType: 'ZIP',
          matchedLocation: `CEP ${zipStr} (${rangeEntry.state})`,
          newspaper: statePapers[0],
          allStatePapers: statePapers
        };
      }
    }
  }

  const queryLower = query.toLowerCase();

  // 2. City or County Match
  const cityMatch = SUNDAY_NEWSPAPERS.find(
    (p) =>
      p.primaryCity.toLowerCase().includes(queryLower) ||
      queryLower.includes(p.primaryCity.toLowerCase()) ||
      p.countiesCovered.some((c) => queryLower.includes(c.toLowerCase()) || c.toLowerCase().includes(queryLower)) ||
      p.metroArea.toLowerCase().includes(queryLower)
  );

  if (cityMatch) {
    return {
      query,
      matchType: query.includes(',') || query.length > 25 ? 'ADDRESS' : 'CITY',
      matchedLocation: `${cityMatch.primaryCity}, ${cityMatch.stateCode}`,
      newspaper: cityMatch,
      allStatePapers: getNewspapersByState(cityMatch.stateCode)
    };
  }

  // 3. State Code or State Name Match
  const upperQuery = query.toUpperCase();
  const matchedStateEntry = Object.values(USA_SWA_STATES).find(
    (s) => s.code === upperQuery || s.name.toLowerCase() === queryLower || queryLower.includes(s.name.toLowerCase())
  );

  if (matchedStateEntry) {
    const statePapers = getNewspapersByState(matchedStateEntry.code);
    if (statePapers.length > 0) {
      return {
        query,
        matchType: 'STATE',
        matchedLocation: `${matchedStateEntry.name} (${matchedStateEntry.code})`,
        newspaper: statePapers[0],
        allStatePapers: statePapers
      };
    }
  }

  return null;
}
