import { CatalogNewspaper } from './ruralPublications.js';

export const METRO_CATALOG_WEST: CatalogNewspaper[] = [
  // Los Angeles MSA
  {
    id: 'la-times',
    name: 'Los Angeles Times',
    headquarters_state: 'CA',
    headquarters_city: 'Los Angeles',
    cbsa_codes: ['31080'],
    county_fips_list: ['06037', '06059'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 400000,
    weekday_circulation: 210000,
    coordinates: { lat: 34.0522, lng: -118.2437 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 3:00 PM PST',
    website_url: 'https://www.latimes.com',
    classifieds_email: 'legals@latimes.com',
    counties_covered: ['Los Angeles', 'Orange']
  },

  // Riverside-San Bernardino (Inland Empire) MSA
  {
    id: 'press-enterprise',
    name: 'The Press-Enterprise',
    headquarters_state: 'CA',
    headquarters_city: 'Riverside',
    cbsa_codes: ['40140'],
    county_fips_list: ['06065', '06071'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 88000,
    weekday_circulation: 46000,
    coordinates: { lat: 33.9806, lng: -117.3755 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 12:00 PM PST',
    website_url: 'https://www.pe.com',
    classifieds_email: 'legals@scng.com',
    counties_covered: ['Riverside', 'San Bernardino']
  },

  // San Diego MSA
  {
    id: 'sd-union-tribune',
    name: 'The San Diego Union-Tribune',
    headquarters_state: 'CA',
    headquarters_city: 'San Diego',
    cbsa_codes: ['41740'],
    county_fips_list: ['06073'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 180000,
    weekday_circulation: 90000,
    coordinates: { lat: 32.7157, lng: -117.1611 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 2:00 PM PST',
    website_url: 'https://www.sandiegouniontribune.com',
    classifieds_email: 'legals@sduniontribune.com',
    counties_covered: ['San Diego']
  },

  // San Francisco MSA
  {
    id: 'sf-chronicle',
    name: 'San Francisco Chronicle',
    headquarters_state: 'CA',
    headquarters_city: 'San Francisco',
    cbsa_codes: ['41860'],
    county_fips_list: ['06075', '06001', '06013', '06041', '06081'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 160000,
    weekday_circulation: 80000,
    coordinates: { lat: 37.7749, lng: -122.4194 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 1:00 PM PST',
    website_url: 'https://www.sfchronicle.com',
    classifieds_email: 'legals@sfchronicle.com',
    counties_covered: ['San Francisco', 'Alameda', 'Contra Costa', 'Marin', 'San Mateo']
  },

  // San Jose (Silicon Valley) MSA
  {
    id: 'mercury-news',
    name: 'The Mercury News',
    headquarters_state: 'CA',
    headquarters_city: 'San Jose',
    cbsa_codes: ['41940'],
    county_fips_list: ['06085', '06069'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 145000,
    weekday_circulation: 72000,
    coordinates: { lat: 37.3382, lng: -121.8863 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 2:00 PM PST',
    website_url: 'https://www.mercurynews.com',
    classifieds_email: 'legals@bayareanewsgroup.com',
    counties_covered: ['Santa Clara', 'San Benito']
  },

  // Seattle MSA
  {
    id: 'seattle-times',
    name: 'The Seattle Times',
    headquarters_state: 'WA',
    headquarters_city: 'Seattle',
    cbsa_codes: ['42660'],
    county_fips_list: ['53033', '53061', '53053'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 165000,
    weekday_circulation: 80000,
    coordinates: { lat: 47.6062, lng: -122.3321 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 3:00 PM PST',
    website_url: 'https://www.seattletimes.com',
    classifieds_email: 'legals@seattletimes.com',
    counties_covered: ['King', 'Snohomish', 'Pierce']
  },

  // Spokane MSA
  {
    id: 'spokesman-review',
    name: 'The Spokesman-Review',
    headquarters_state: 'WA',
    headquarters_city: 'Spokane',
    cbsa_codes: ['44060'],
    county_fips_list: ['53063'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 55000,
    weekday_circulation: 32000,
    coordinates: { lat: 47.6588, lng: -117.4260 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Thursday 12:00 PM PST',
    website_url: 'https://www.spokesman.com',
    classifieds_email: 'legals@spokesman.com',
    counties_covered: ['Spokane']
  },

  // Portland MSA
  {
    id: 'oregonian',
    name: 'The Sunday Oregonian',
    headquarters_state: 'OR',
    headquarters_city: 'Portland',
    cbsa_codes: ['38900'],
    county_fips_list: ['41051', '41067', '41005', '53011'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 135000,
    weekday_circulation: 68000,
    coordinates: { lat: 45.5152, lng: -122.6784 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 3:00 PM PST',
    website_url: 'https://www.oregonlive.com',
    classifieds_email: 'legals@oregonian.com',
    counties_covered: ['Multnomah', 'Washington', 'Clackamas', 'Clark (WA)']
  },

  // Denver MSA
  {
    id: 'denver-post',
    name: 'The Denver Post',
    headquarters_state: 'CO',
    headquarters_city: 'Denver',
    cbsa_codes: ['19740'],
    county_fips_list: ['08031', '08005', '08059', '08001', '08035'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 170000,
    weekday_circulation: 85000,
    coordinates: { lat: 39.7392, lng: -104.9903 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 3:00 PM MST',
    website_url: 'https://www.denverpost.com',
    classifieds_email: 'legals@denverpost.com',
    counties_covered: ['Denver', 'Arapahoe', 'Jefferson', 'Adams', 'Douglas']
  },

  // Phoenix MSA
  {
    id: 'az-republic',
    name: 'The Arizona Republic',
    headquarters_state: 'AZ',
    headquarters_city: 'Phoenix',
    cbsa_codes: ['38060'],
    county_fips_list: ['04013', '04021'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 215000,
    weekday_circulation: 110000,
    coordinates: { lat: 33.4484, lng: -112.0740 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 2:00 PM MST',
    website_url: 'https://www.azcentral.com',
    classifieds_email: 'legals@azcentral.com',
    counties_covered: ['Maricopa', 'Pinal']
  },

  // Reno MSA
  {
    id: 'reno-gazette-journal',
    name: 'Reno Gazette-Journal',
    headquarters_state: 'NV',
    headquarters_city: 'Reno',
    cbsa_codes: ['39900'],
    county_fips_list: ['32031', '32029'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 35000,
    weekday_circulation: 20000,
    coordinates: { lat: 39.5296, lng: -119.8138 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Thursday 11:00 AM PST',
    website_url: 'https://www.rgj.com',
    classifieds_email: 'legals@rgj.com',
    counties_covered: ['Washoe', 'Storey']
  },

  // Salt Lake City MSA (Weekly physical print exception)
  {
    id: 'salt-lake-tribune',
    name: 'The Salt Lake Tribune',
    headquarters_state: 'UT',
    headquarters_city: 'Salt Lake City',
    cbsa_codes: ['41620'],
    county_fips_list: ['49035', '49045'],
    has_sunday_print_edition: false,
    is_primary_metro_daily: true,
    sunday_circulation: 0,
    weekday_circulation: 38000,
    coordinates: { lat: 40.7608, lng: -111.8910 },
    compliance_tier: 'REQUIRES_AFFIDAVIT',
    ad_deadline: 'Tuesday 5:00 PM MST',
    website_url: 'https://www.sltrib.com',
    classifieds_email: 'legals@sltrib.com',
    counties_covered: ['Salt Lake', 'Tooele']
  }
];
