export interface KnownZipEntry {
  zip: string;
  city: string;
  state: string;
  county_fips: string;
  county_name: string;
  cbsa_code?: string;
  lat: number;
  lng: number;
}

export const KNOWN_ZIP_DATABASE: Record<string, KnownZipEntry> = {
  // New York City MSA & Northern NJ (CBSA 35620)
  '10001': { zip: '10001', city: 'New York', state: 'NY', county_fips: '36061', county_name: 'New York County', cbsa_code: '35620', lat: 40.7501, lng: -73.9996 },
  '07302': { zip: '07302', city: 'Jersey City', state: 'NJ', county_fips: '34017', county_name: 'Hudson County', cbsa_code: '35620', lat: 40.7178, lng: -74.0431 },
  '07030': { zip: '07030', city: 'Hoboken', state: 'NJ', county_fips: '34017', county_name: 'Hudson County', cbsa_code: '35620', lat: 40.7439, lng: -74.0323 },
  '07102': { zip: '07102', city: 'Newark', state: 'NJ', county_fips: '34013', county_name: 'Essex County', cbsa_code: '35620', lat: 40.7357, lng: -74.1724 },

  // Texas MSAs
  '75201': { zip: '75201', city: 'Dallas', state: 'TX', county_fips: '48113', county_name: 'Dallas County', cbsa_code: '19100', lat: 32.7874, lng: -96.7994 },
  '75001': { zip: '75001', city: 'Addison', state: 'TX', county_fips: '48113', county_name: 'Dallas County', cbsa_code: '19100', lat: 32.9618, lng: -96.8292 },
  '76102': { zip: '76102', city: 'Fort Worth', state: 'TX', county_fips: '48439', county_name: 'Tarrant County', cbsa_code: '19100', lat: 32.7555, lng: -97.3308 },
  '77002': { zip: '77002', city: 'Houston', state: 'TX', county_fips: '48201', county_name: 'Harris County', cbsa_code: '26420', lat: 29.7568, lng: -95.3657 },
  '78701': { zip: '78701', city: 'Austin', state: 'TX', county_fips: '48453', county_name: 'Travis County', cbsa_code: '12420', lat: 30.2711, lng: -97.7437 },
  '78205': { zip: '78205', city: 'San Antonio', state: 'TX', county_fips: '48029', county_name: 'Bexar County', cbsa_code: '41700', lat: 29.4241, lng: -98.4936 },
  '79901': { zip: '79901', city: 'El Paso', state: 'TX', county_fips: '48141', county_name: 'El Paso County', cbsa_code: '21340', lat: 31.7587, lng: -106.4869 },

  // Washington DC MSA (CBSA 47900)
  '20001': { zip: '20001', city: 'Washington', state: 'DC', county_fips: '11001', county_name: 'District of Columbia', cbsa_code: '47900', lat: 38.9108, lng: -77.0163 },
  '22201': { zip: '22201', city: 'Arlington', state: 'VA', county_fips: '51013', county_name: 'Arlington County', cbsa_code: '47900', lat: 38.8872, lng: -77.0931 },

  // Florida MSAs
  '33139': { zip: '33139', city: 'Miami Beach', state: 'FL', county_fips: '12086', county_name: 'Miami-Dade County', cbsa_code: '33100', lat: 25.7907, lng: -80.1300 },
  '33131': { zip: '33131', city: 'Miami', state: 'FL', county_fips: '12086', county_name: 'Miami-Dade County', cbsa_code: '33100', lat: 25.7678, lng: -80.1887 },
  '33301': { zip: '33301', city: 'Fort Lauderdale', state: 'FL', county_fips: '12011', county_name: 'Broward County', cbsa_code: '33100', lat: 26.1224, lng: -80.1373 },
  '33401': { zip: '33401', city: 'West Palm Beach', state: 'FL', county_fips: '12099', county_name: 'Palm Beach County', cbsa_code: '33100', lat: 26.7153, lng: -80.0534 },
  '32801': { zip: '32801', city: 'Orlando', state: 'FL', county_fips: '12095', county_name: 'Orange County', cbsa_code: '36740', lat: 28.5383, lng: -81.3792 },
  '33602': { zip: '33602', city: 'Tampa', state: 'FL', county_fips: '12057', county_name: 'Hillsborough County', cbsa_code: '45300', lat: 27.9506, lng: -82.4572 },
  '33901': { zip: '33901', city: 'Fort Myers', state: 'FL', county_fips: '12071', county_name: 'Lee County', cbsa_code: '15980', lat: 26.6406, lng: -81.8723 },

  // California MSAs
  '90210': { zip: '90210', city: 'Beverly Hills', state: 'CA', county_fips: '06037', county_name: 'Los Angeles County', cbsa_code: '31080', lat: 34.0901, lng: -118.4065 },
  '90001': { zip: '90001', city: 'Los Angeles', state: 'CA', county_fips: '06037', county_name: 'Los Angeles County', cbsa_code: '31080', lat: 33.9731, lng: -118.2479 },
  '92501': { zip: '92501', city: 'Riverside', state: 'CA', county_fips: '06065', county_name: 'Riverside County', cbsa_code: '40140', lat: 33.9806, lng: -117.3755 },
  '92101': { zip: '92101', city: 'San Diego', state: 'CA', county_fips: '06073', county_name: 'San Diego County', cbsa_code: '41740', lat: 32.7157, lng: -117.1611 },
  '94102': { zip: '94102', city: 'San Francisco', state: 'CA', county_fips: '06075', county_name: 'San Francisco County', cbsa_code: '41860', lat: 37.7749, lng: -122.4194 },
  '95113': { zip: '95113', city: 'San Jose', state: 'CA', county_fips: '06085', county_name: 'Santa Clara County', cbsa_code: '41940', lat: 37.3382, lng: -121.8863 },

  // Midwest & Central MSAs
  '60601': { zip: '60601', city: 'Chicago', state: 'IL', county_fips: '17031', county_name: 'Cook County', cbsa_code: '16980', lat: 41.8864, lng: -87.6237 },
  '64106': { zip: '64106', city: 'Kansas City', state: 'MO', county_fips: '29095', county_name: 'Jackson County', cbsa_code: '28140', lat: 39.0997, lng: -94.5786 },
  '63101': { zip: '63101', city: 'St. Louis', state: 'MO', county_fips: '29510', county_name: 'St. Louis City', cbsa_code: '41180', lat: 38.6270, lng: -90.1994 },
  '44114': { zip: '44114', city: 'Cleveland', state: 'OH', county_fips: '39035', county_name: 'Cuyahoga County', cbsa_code: '17460', lat: 41.5033, lng: -81.6881 },
  '45202': { zip: '45202', city: 'Cincinnati', state: 'OH', county_fips: '39061', county_name: 'Hamilton County', cbsa_code: '17140', lat: 39.1031, lng: -84.5120 },
  '38103': { zip: '38103', city: 'Memphis', state: 'TN', county_fips: '47157', county_name: 'Shelby County', cbsa_code: '32820', lat: 35.1495, lng: -90.0490 },
  '37201': { zip: '37201', city: 'Nashville', state: 'TN', county_fips: '47037', county_name: 'Davidson County', cbsa_code: '34980', lat: 36.1627, lng: -86.7816 },
  '48226': { zip: '48226', city: 'Detroit', state: 'MI', county_fips: '26163', county_name: 'Wayne County', cbsa_code: '19820', lat: 42.3314, lng: -83.0458 },
  '55401': { zip: '55401', city: 'Minneapolis', state: 'MN', county_fips: '27053', county_name: 'Hennepin County', cbsa_code: '33460', lat: 44.9778, lng: -93.2650 },

  // Northwest & Mountain MSAs
  '98101': { zip: '98101', city: 'Seattle', state: 'WA', county_fips: '53033', county_name: 'King County', cbsa_code: '42660', lat: 47.6101, lng: -122.3344 },
  '99201': { zip: '99201', city: 'Spokane', state: 'WA', county_fips: '53063', county_name: 'Spokane County', cbsa_code: '44060', lat: 47.6588, lng: -117.4260 },
  '97201': { zip: '97201', city: 'Portland', state: 'OR', county_fips: '41051', county_name: 'Multnomah County', cbsa_code: '38900', lat: 45.5152, lng: -122.6784 },
  '80202': { zip: '80202', city: 'Denver', state: 'CO', county_fips: '08031', county_name: 'Denver County', cbsa_code: '19740', lat: 39.7392, lng: -104.9903 },
  '85001': { zip: '85001', city: 'Phoenix', state: 'AZ', county_fips: '04013', county_name: 'Maricopa County', cbsa_code: '38060', lat: 33.4484, lng: -112.0740 },
  '89501': { zip: '89501', city: 'Reno', state: 'NV', county_fips: '32031', county_name: 'Washoe County', cbsa_code: '39900', lat: 39.5296, lng: -119.8138 },
  '84101': { zip: '84101', city: 'Salt Lake City', state: 'UT', county_fips: '49035', county_name: 'Salt Lake County', cbsa_code: '41620', lat: 40.7608, lng: -111.8910 },

  // East & Mid-Atlantic MSAs
  '30303': { zip: '30303', city: 'Atlanta', state: 'GA', county_fips: '13121', county_name: 'Fulton County', cbsa_code: '12060', lat: 33.7490, lng: -84.3880 },
  '02108': { zip: '02108', city: 'Boston', state: 'MA', county_fips: '25025', county_name: 'Suffolk County', cbsa_code: '14460', lat: 42.3601, lng: -71.0589 },
  '19102': { zip: '19102', city: 'Philadelphia', state: 'PA', county_fips: '42101', county_name: 'Philadelphia County', cbsa_code: '37980', lat: 39.9526, lng: -75.1652 },

  // --- RURAL / NON-METRO TEST CASES (No CBSA) ---
  '79830': { zip: '79830', city: 'Alpine', state: 'TX', county_fips: '48043', county_name: 'Brewster County', lat: 30.3585, lng: -103.6613 },
  '69201': { zip: '69201', city: 'Valentine', state: 'NE', county_fips: '31031', county_name: 'Cherry County', lat: 42.8728, lng: -100.5501 },
  '84532': { zip: '84532', city: 'Moab', state: 'UT', county_fips: '49019', county_name: 'Grand County', lat: 38.5733, lng: -109.5498 }
};
