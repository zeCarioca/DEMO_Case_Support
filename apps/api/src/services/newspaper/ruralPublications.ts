export interface CatalogNewspaper {
  id: string;
  name: string;
  headquarters_state: string;
  headquarters_city: string;
  cbsa_codes: string[];
  county_fips_list: string[];
  has_sunday_print_edition: boolean;
  is_primary_metro_daily: boolean;
  sunday_circulation: number;
  weekday_circulation: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  compliance_tier: 'LOW_RISK' | 'MEDIUM_RISK' | 'REQUIRES_AFFIDAVIT';
  ad_deadline: string;
  website_url: string;
  classifieds_email?: string;
  counties_covered: string[];
}

// Rural / Non-metro publications for Tier 2 and Tier 3 (20 CFR § 656.17(e)(1)(i)(B)(2))
export const RURAL_PUBLICATIONS: CatalogNewspaper[] = [
  // Alpine Avalanche (Brewster County, TX - Weekly, NO Sunday edition)
  {
    id: 'alpine-avalanche',
    name: 'The Alpine Avalanche',
    headquarters_state: 'TX',
    headquarters_city: 'Alpine',
    cbsa_codes: [],
    county_fips_list: ['48043'],
    has_sunday_print_edition: false,
    is_primary_metro_daily: false,
    sunday_circulation: 0,
    weekday_circulation: 2500,
    coordinates: { lat: 30.3585, lng: -103.6613 },
    compliance_tier: 'REQUIRES_AFFIDAVIT',
    ad_deadline: 'Monday 5:00 PM CST',
    website_url: 'https://www.alpineavalanche.com',
    classifieds_email: 'classifieds@alpineavalanche.com',
    counties_covered: ['Brewster County']
  },
  // Fort Stockton Pioneer (Pecos County, TX - 48 miles from Alpine, TX)
  {
    id: 'fort-stockton-pioneer',
    name: 'The Fort Stockton Pioneer',
    headquarters_state: 'TX',
    headquarters_city: 'Fort Stockton',
    cbsa_codes: [],
    county_fips_list: ['48371'],
    has_sunday_print_edition: false,
    is_primary_metro_daily: false,
    sunday_circulation: 0,
    weekday_circulation: 3200,
    coordinates: { lat: 30.8849, lng: -102.8793 },
    compliance_tier: 'REQUIRES_AFFIDAVIT',
    ad_deadline: 'Tuesday 12:00 PM CST',
    website_url: 'https://www.fortstocktonpioneer.com',
    classifieds_email: 'news@fortstocktonpioneer.com',
    counties_covered: ['Pecos County', 'Brewster County']
  },
  // Valentine Midland News (Cherry County, NE - Weekly, NO Sunday edition)
  {
    id: 'valentine-midland-news',
    name: 'Valentine Midland News',
    headquarters_state: 'NE',
    headquarters_city: 'Valentine',
    cbsa_codes: [],
    county_fips_list: ['31031'],
    has_sunday_print_edition: false,
    is_primary_metro_daily: false,
    sunday_circulation: 0,
    weekday_circulation: 2100,
    coordinates: { lat: 42.8728, lng: -100.5501 },
    compliance_tier: 'REQUIRES_AFFIDAVIT',
    ad_deadline: 'Monday 12:00 PM CST',
    website_url: 'https://www.valentinenews.com',
    classifieds_email: 'ads@valentinenews.com',
    counties_covered: ['Cherry County']
  }
];
