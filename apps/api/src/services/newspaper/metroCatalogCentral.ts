import { CatalogNewspaper } from './ruralPublications.js';

export const METRO_CATALOG_CENTRAL: CatalogNewspaper[] = [
  // Chicago MSA
  {
    id: 'chicago-tribune',
    name: 'Chicago Tribune',
    headquarters_state: 'IL',
    headquarters_city: 'Chicago',
    cbsa_codes: ['16980'],
    county_fips_list: ['17031', '17043', '17089', '17097', '17197'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 260000,
    weekday_circulation: 135000,
    coordinates: { lat: 41.8781, lng: -87.6298 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 4:00 PM CST',
    website_url: 'https://www.chicagotribune.com',
    classifieds_email: 'legals@chicagotribune.com',
    counties_covered: ['Cook', 'DuPage', 'Lake', 'Will', 'Kane']
  },

  // Dallas-Fort Worth MSA
  {
    id: 'dallas-morning-news',
    name: 'The Dallas Morning News',
    headquarters_state: 'TX',
    headquarters_city: 'Dallas',
    cbsa_codes: ['19100'],
    county_fips_list: ['48113', '48085', '48121', '48439'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 145000,
    weekday_circulation: 75000,
    coordinates: { lat: 32.7767, lng: -96.7970 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 5:00 PM CST',
    website_url: 'https://www.dallasnews.com',
    classifieds_email: 'legalnotices@dallasnews.com',
    counties_covered: ['Dallas', 'Collin', 'Denton', 'Rockwall', 'Tarrant']
  },
  {
    id: 'fort-worth-star-telegram',
    name: 'Fort Worth Star-Telegram',
    headquarters_state: 'TX',
    headquarters_city: 'Fort Worth',
    cbsa_codes: ['19100'],
    county_fips_list: ['48439', '48113'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: false,
    sunday_circulation: 78000,
    weekday_circulation: 42000,
    coordinates: { lat: 32.7555, lng: -97.3308 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Thursday 12:00 PM CST',
    website_url: 'https://www.star-telegram.com',
    classifieds_email: 'legals@star-telegram.com',
    counties_covered: ['Tarrant', 'Parker', 'Johnson', 'Dallas']
  },

  // Houston MSA
  {
    id: 'houston-chronicle',
    name: 'Houston Chronicle',
    headquarters_state: 'TX',
    headquarters_city: 'Houston',
    cbsa_codes: ['26420'],
    county_fips_list: ['48201', '48157', '48339', '48039', '48167'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 220000,
    weekday_circulation: 110000,
    coordinates: { lat: 29.7568, lng: -95.3657 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 5:00 PM CST',
    website_url: 'https://www.houstonchronicle.com',
    classifieds_email: 'legals@chron.com',
    counties_covered: ['Harris', 'Fort Bend', 'Montgomery', 'Brazoria', 'Galveston']
  },

  // Austin MSA
  {
    id: 'austin-american-statesman',
    name: 'Austin American-Statesman',
    headquarters_state: 'TX',
    headquarters_city: 'Austin',
    cbsa_codes: ['12420'],
    county_fips_list: ['48453', '48491', '48209', '48021'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 85000,
    weekday_circulation: 45000,
    coordinates: { lat: 30.2711, lng: -97.7437 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Thursday 3:00 PM CST',
    website_url: 'https://www.statesman.com',
    classifieds_email: 'legals@statesman.com',
    counties_covered: ['Travis', 'Williamson', 'Hays', 'Bastrop']
  },

  // El Paso MSA
  {
    id: 'el-paso-times',
    name: 'El Paso Times',
    headquarters_state: 'TX',
    headquarters_city: 'El Paso',
    cbsa_codes: ['21340'],
    county_fips_list: ['48141'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 45000,
    weekday_circulation: 28000,
    coordinates: { lat: 31.7587, lng: -106.4869 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 4:00 PM MST',
    website_url: 'https://www.elpasotimes.com',
    classifieds_email: 'legals@elpasotimes.com',
    counties_covered: ['El Paso County']
  },

  // Kansas City MSA (MO-KS)
  {
    id: 'kc-star',
    name: 'The Kansas City Star',
    headquarters_state: 'MO',
    headquarters_city: 'Kansas City',
    cbsa_codes: ['28140'],
    county_fips_list: ['29095', '29047', '29165', '29037', '20091', '20209'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 85000,
    weekday_circulation: 48000,
    coordinates: { lat: 39.0997, lng: -94.5786 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 3:00 PM CST',
    website_url: 'https://www.kansascity.com',
    classifieds_email: 'legals@kcstar.com',
    counties_covered: ['Jackson', 'Clay', 'Platte', 'Cass', 'Johnson (KS)', 'Wyandotte (KS)']
  },

  // St. Louis MSA (MO-IL)
  {
    id: 'st-louis-post-dispatch',
    name: 'St. Louis Post-Dispatch',
    headquarters_state: 'MO',
    headquarters_city: 'St. Louis',
    cbsa_codes: ['41180'],
    county_fips_list: ['29510', '29189', '29183', '29099', '29071', '17119', '17163'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 120000,
    weekday_circulation: 62000,
    coordinates: { lat: 38.6270, lng: -90.1994 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 5:00 PM CST',
    website_url: 'https://www.stltoday.com',
    classifieds_email: 'legals@post-dispatch.com',
    counties_covered: ['St. Louis City', 'St. Louis County', 'St. Charles', 'Jefferson', 'Franklin', 'Madison (IL)', 'St. Clair (IL)']
  },

  // Cleveland MSA
  {
    id: 'cleveland-plain-dealer',
    name: 'The Plain Dealer',
    headquarters_state: 'OH',
    headquarters_city: 'Cleveland',
    cbsa_codes: ['17460'],
    county_fips_list: ['39035', '39085', '39055', '39103', '39093'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 140000,
    weekday_circulation: 75000,
    coordinates: { lat: 41.5033, lng: -81.6881 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 4:00 PM EST',
    website_url: 'https://www.cleveland.com/plaindealer',
    classifieds_email: 'legals@cleveland.com',
    counties_covered: ['Cuyahoga', 'Lake', 'Geauga', 'Medina', 'Lorain']
  },

  // Cincinnati MSA (OH-KY-IN)
  {
    id: 'cincinnati-enquirer',
    name: 'The Cincinnati Enquirer',
    headquarters_state: 'OH',
    headquarters_city: 'Cincinnati',
    cbsa_codes: ['17140'],
    county_fips_list: ['39061', '39017', '39165', '39025', '21015', '21117', '21037'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 105000,
    weekday_circulation: 55000,
    coordinates: { lat: 39.1031, lng: -84.5120 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 3:00 PM EST',
    website_url: 'https://www.cincinnati.com',
    classifieds_email: 'legals@enquirer.com',
    counties_covered: ['Hamilton', 'Butler', 'Warren', 'Clermont', 'Boone (KY)', 'Kenton (KY)', 'Campbell (KY)']
  },

  // Memphis MSA (TN-MS-AR)
  {
    id: 'commercial-appeal',
    name: 'The Commercial Appeal',
    headquarters_state: 'TN',
    headquarters_city: 'Memphis',
    cbsa_codes: ['32820'],
    county_fips_list: ['47157', '47047', '47167', '28033'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 65000,
    weekday_circulation: 35000,
    coordinates: { lat: 35.1495, lng: -90.0490 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Thursday 11:00 AM CST',
    website_url: 'https://www.commercialappeal.com',
    classifieds_email: 'legals@commercialappeal.com',
    counties_covered: ['Shelby', 'Fayette', 'Tipton', 'DeSoto (MS)']
  },

  // Nashville MSA
  {
    id: 'tennessean',
    name: 'The Tennessean',
    headquarters_state: 'TN',
    headquarters_city: 'Nashville',
    cbsa_codes: ['34980'],
    county_fips_list: ['47037', '47187', '47149', '47189', '47165'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 95000,
    weekday_circulation: 52000,
    coordinates: { lat: 36.1627, lng: -86.7816 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 4:00 PM CST',
    website_url: 'https://www.tennessean.com',
    classifieds_email: 'legals@tennessean.com',
    counties_covered: ['Davidson', 'Williamson', 'Rutherford', 'Wilson', 'Sumner']
  },

  // Detroit MSA
  {
    id: 'detroit-free-press',
    name: 'Detroit Free Press',
    headquarters_state: 'MI',
    headquarters_city: 'Detroit',
    cbsa_codes: ['19820'],
    county_fips_list: ['26163', '26125', '26099'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 170000,
    weekday_circulation: 88000,
    coordinates: { lat: 42.3314, lng: -83.0458 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 4:00 PM EST',
    website_url: 'https://www.freep.com',
    classifieds_email: 'legals@freepress.com',
    counties_covered: ['Wayne', 'Oakland', 'Macomb']
  },

  // Minneapolis-St. Paul MSA
  {
    id: 'star-tribune',
    name: 'Star Tribune',
    headquarters_state: 'MN',
    headquarters_city: 'Minneapolis',
    cbsa_codes: ['33460'],
    county_fips_list: ['27053', '27123', '27037', '27003', '27163'],
    has_sunday_print_edition: true,
    is_primary_metro_daily: true,
    sunday_circulation: 210000,
    weekday_circulation: 115000,
    coordinates: { lat: 44.9778, lng: -93.2650 },
    compliance_tier: 'LOW_RISK',
    ad_deadline: 'Wednesday 3:00 PM CST',
    website_url: 'https://www.startribune.com',
    classifieds_email: 'legals@startribune.com',
    counties_covered: ['Hennepin', 'Ramsey', 'Dakota', 'Anoka', 'Washington']
  }
];
