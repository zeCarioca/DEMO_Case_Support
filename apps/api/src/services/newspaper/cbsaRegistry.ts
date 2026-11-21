export interface CbsaDefinition {
  cbsa_code: string;
  cbsa_name: string;
  type: 'METROPOLITAN' | 'MICROPOLITAN';
  states: string[];
  primary_fips: string[];
}

export const CBSA_REGISTRY: Record<string, CbsaDefinition> = {
  // New York-Newark-Jersey City, NY-NJ-PA (Includes Jersey City, NJ)
  '35620': {
    cbsa_code: '35620',
    cbsa_name: 'New York-Newark-Jersey City, NY-NJ-PA',
    type: 'METROPOLITAN',
    states: ['NY', 'NJ', 'PA'],
    primary_fips: ['36061', '36047', '36081', '36005', '36085', '34017', '34013', '34003', '34039']
  },
  // Dallas-Fort Worth-Arlington, TX
  '19100': {
    cbsa_code: '19100',
    cbsa_name: 'Dallas-Fort Worth-Arlington, TX',
    type: 'METROPOLITAN',
    states: ['TX'],
    primary_fips: ['48113', '48439', '48085', '48121']
  },
  // El Paso, TX (Distinct from Austin)
  '21340': {
    cbsa_code: '21340',
    cbsa_name: 'El Paso, TX',
    type: 'METROPOLITAN',
    states: ['TX'],
    primary_fips: ['48141']
  },
  // Houston-The Woodlands-Sugar Land, TX
  '26420': {
    cbsa_code: '26420',
    cbsa_name: 'Houston-The Woodlands-Sugar Land, TX',
    type: 'METROPOLITAN',
    states: ['TX'],
    primary_fips: ['48201', '48157', '48339', '48039', '48167']
  },
  // Austin-Round Rock-Georgetown, TX
  '12420': {
    cbsa_code: '12420',
    cbsa_name: 'Austin-Round Rock-Georgetown, TX',
    type: 'METROPOLITAN',
    states: ['TX'],
    primary_fips: ['48453', '48491', '48209', '48021']
  },
  // Washington-Arlington-Alexandria, DC-VA-MD-WV (Cross-State DMV)
  '47900': {
    cbsa_code: '47900',
    cbsa_name: 'Washington-Arlington-Alexandria, DC-VA-MD-WV',
    type: 'METROPOLITAN',
    states: ['DC', 'VA', 'MD', 'WV'],
    primary_fips: ['11001', '51013', '51510', '51059', '24031', '24033']
  },
  // Miami-Fort Lauderdale-Pompano Beach, FL
  '33100': {
    cbsa_code: '33100',
    cbsa_name: 'Miami-Fort Lauderdale-Pompano Beach, FL',
    type: 'METROPOLITAN',
    states: ['FL'],
    primary_fips: ['12086', '12011', '12099']
  },
  // Tampa-St. Petersburg-Clearwater, FL
  '45300': {
    cbsa_code: '45300',
    cbsa_name: 'Tampa-St. Petersburg-Clearwater, FL',
    type: 'METROPOLITAN',
    states: ['FL'],
    primary_fips: ['12057', '12103', '12101', '12053']
  },
  // Orlando-Kissimmee-Sanford, FL
  '36740': {
    cbsa_code: '36740',
    cbsa_name: 'Orlando-Kissimmee-Sanford, FL',
    type: 'METROPOLITAN',
    states: ['FL'],
    primary_fips: ['12095', '12117', '12097', '12069']
  },
  // Cape Coral-Fort Myers, FL
  '15980': {
    cbsa_code: '15980',
    cbsa_name: 'Cape Coral-Fort Myers, FL',
    type: 'METROPOLITAN',
    states: ['FL'],
    primary_fips: ['12071']
  },
  // Los Angeles-Long Beach-Anaheim, CA
  '31080': {
    cbsa_code: '31080',
    cbsa_name: 'Los Angeles-Long Beach-Anaheim, CA',
    type: 'METROPOLITAN',
    states: ['CA'],
    primary_fips: ['06037', '06059']
  },
  // Riverside-San Bernardino-Ontario, CA (Inland Empire)
  '40140': {
    cbsa_code: '40140',
    cbsa_name: 'Riverside-San Bernardino-Ontario, CA',
    type: 'METROPOLITAN',
    states: ['CA'],
    primary_fips: ['06065', '06071']
  },
  // San Diego-Chula Vista-Carlsbad, CA
  '41740': {
    cbsa_code: '41740',
    cbsa_name: 'San Diego-Chula Vista-Carlsbad, CA',
    type: 'METROPOLITAN',
    states: ['CA'],
    primary_fips: ['06073']
  },
  // San Francisco-Oakland-Berkeley, CA
  '41860': {
    cbsa_code: '41860',
    cbsa_name: 'San Francisco-Oakland-Berkeley, CA',
    type: 'METROPOLITAN',
    states: ['CA'],
    primary_fips: ['06075', '06001', '06013', '06041', '06081']
  },
  // San Jose-Sunnyvale-Santa Clara, CA
  '41940': {
    cbsa_code: '41940',
    cbsa_name: 'San Jose-Sunnyvale-Santa Clara, CA',
    type: 'METROPOLITAN',
    states: ['CA'],
    primary_fips: ['06085', '06069']
  },
  // Chicago-Naperville-Elgin, IL-IN-WI
  '16980': {
    cbsa_code: '16980',
    cbsa_name: 'Chicago-Naperville-Elgin, IL-IN-WI',
    type: 'METROPOLITAN',
    states: ['IL', 'IN', 'WI'],
    primary_fips: ['17031', '17043', '17089', '17097', '17197']
  },
  // Kansas City, MO-KS
  '28140': {
    cbsa_code: '28140',
    cbsa_name: 'Kansas City, MO-KS',
    type: 'METROPOLITAN',
    states: ['MO', 'KS'],
    primary_fips: ['29095', '29047', '29165', '29037', '20091', '20209']
  },
  // St. Louis, MO-IL
  '41180': {
    cbsa_code: '41180',
    cbsa_name: 'St. Louis, MO-IL',
    type: 'METROPOLITAN',
    states: ['MO', 'IL'],
    primary_fips: ['29510', '29189', '29183', '29099', '29071', '17119', '17163']
  },
  // Cleveland-Elyria, OH
  '17460': {
    cbsa_code: '17460',
    cbsa_name: 'Cleveland-Elyria, OH',
    type: 'METROPOLITAN',
    states: ['OH'],
    primary_fips: ['39035', '39085', '39055', '39103', '39093']
  },
  // Cincinnati, OH-KY-IN
  '17140': {
    cbsa_code: '17140',
    cbsa_name: 'Cincinnati, OH-KY-IN',
    type: 'METROPOLITAN',
    states: ['OH', 'KY', 'IN'],
    primary_fips: ['39061', '39017', '39165', '39025', '21015', '21117', '21037']
  },
  // Memphis, TN-MS-AR
  '32820': {
    cbsa_code: '32820',
    cbsa_name: 'Memphis, TN-MS-AR',
    type: 'METROPOLITAN',
    states: ['TN', 'MS', 'AR'],
    primary_fips: ['47157', '47047', '47167', '28033']
  },
  // Nashville-Davidson-Murfreesboro-Franklin, TN
  '34980': {
    cbsa_code: '34980',
    cbsa_name: 'Nashville-Davidson-Murfreesboro-Franklin, TN',
    type: 'METROPOLITAN',
    states: ['TN'],
    primary_fips: ['47037', '47187', '47149', '47189', '47165']
  },
  // Seattle-Tacoma-Bellevue, WA
  '42660': {
    cbsa_code: '42660',
    cbsa_name: 'Seattle-Tacoma-Bellevue, WA',
    type: 'METROPOLITAN',
    states: ['WA'],
    primary_fips: ['53033', '53061', '53053']
  },
  // Spokane-Spokane Valley, WA
  '44060': {
    cbsa_code: '44060',
    cbsa_name: 'Spokane-Spokane Valley, WA',
    type: 'METROPOLITAN',
    states: ['WA'],
    primary_fips: ['53063']
  },
  // Portland-Vancouver-Hillsboro, OR-WA
  '38900': {
    cbsa_code: '38900',
    cbsa_name: 'Portland-Vancouver-Hillsboro, OR-WA',
    type: 'METROPOLITAN',
    states: ['OR', 'WA'],
    primary_fips: ['41051', '41067', '41005', '53011']
  },
  // Denver-Aurora-Lakewood, CO
  '19740': {
    cbsa_code: '19740',
    cbsa_name: 'Denver-Aurora-Lakewood, CO',
    type: 'METROPOLITAN',
    states: ['CO'],
    primary_fips: ['08031', '08005', '08059', '08001', '08035']
  },
  // Phoenix-Mesa-Chandler, AZ
  '38060': {
    cbsa_code: '38060',
    cbsa_name: 'Phoenix-Mesa-Chandler, AZ',
    type: 'METROPOLITAN',
    states: ['AZ'],
    primary_fips: ['04013', '04021']
  },
  // Reno, NV
  '39900': {
    cbsa_code: '39900',
    cbsa_name: 'Reno, NV',
    type: 'METROPOLITAN',
    states: ['NV'],
    primary_fips: ['32031', '32029']
  },
  // Salt Lake City, UT
  '41620': {
    cbsa_code: '41620',
    cbsa_name: 'Salt Lake City, UT',
    type: 'METROPOLITAN',
    states: ['UT'],
    primary_fips: ['49035', '49045']
  },
  // Atlanta-Sandy Springs-Alpharetta, GA
  '12060': {
    cbsa_code: '12060',
    cbsa_name: 'Atlanta-Sandy Springs-Alpharetta, GA',
    type: 'METROPOLITAN',
    states: ['GA'],
    primary_fips: ['13121', '13089', '13067', '13135', '13063']
  },
  // Boston-Cambridge-Newton, MA-NH
  '14460': {
    cbsa_code: '14460',
    cbsa_name: 'Boston-Cambridge-Newton, MA-NH',
    type: 'METROPOLITAN',
    states: ['MA', 'NH'],
    primary_fips: ['25025', '25017', '25021', '25009']
  },
  // Philadelphia-Camden-Wilmington, PA-NJ-DE-MD
  '37980': {
    cbsa_code: '37980',
    cbsa_name: 'Philadelphia-Camden-Wilmington, PA-NJ-DE-MD',
    type: 'METROPOLITAN',
    states: ['PA', 'NJ', 'DE', 'MD'],
    primary_fips: ['42101', '42091', '42017', '42045', '42029', '34007', '10003']
  }
};
