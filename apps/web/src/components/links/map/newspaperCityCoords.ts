import { NewspaperCityMarker } from './types.js';

export const NEWSPAPER_CITY_MARKERS: NewspaperCityMarker[] = [
  // --- FLORIDA ---
  { id: 'miami-fl', city: 'Miami', stateCode: 'FL', newspaperId: 'miami-herald', newspaperName: 'The Miami Herald', x: 795, y: 545, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'ft-lauderdale-fl', city: 'Fort Lauderdale', stateCode: 'FL', newspaperId: 'sun-sentinel', newspaperName: 'Sun Sentinel', x: 798, y: 532, labelOffsetX: 14, labelOffsetY: -3 },
  { id: 'west-palm-fl', city: 'West Palm Beach', stateCode: 'FL', newspaperId: 'palm-beach-post', newspaperName: 'The Palm Beach Post', x: 802, y: 518, labelOffsetX: 14, labelOffsetY: -2 },
  { id: 'orlando-fl', city: 'Orlando', stateCode: 'FL', newspaperId: 'orlando-sentinel', newspaperName: 'Orlando Sentinel', x: 760, y: 482, labelOffsetX: 12, labelOffsetY: -4 },
  { id: 'tampa-fl', city: 'Tampa', stateCode: 'FL', newspaperId: 'tampa-bay-times', newspaperName: 'Tampa Bay Times', x: 735, y: 495, labelOffsetX: -16, labelOffsetY: 4 },
  { id: 'ft-myers-fl', city: 'Fort Myers', stateCode: 'FL', newspaperId: 'news-press-fl', newspaperName: 'The News-Press', x: 755, y: 528, labelOffsetX: -18, labelOffsetY: 4 },
  { id: 'jacksonville-fl', city: 'Jacksonville', stateCode: 'FL', newspaperId: 'fl-times-union', newspaperName: 'The Florida Times-Union', x: 765, y: 446, labelOffsetX: 14, labelOffsetY: 2 },

  // --- CALIFORNIA ---
  { id: 'la-times-ca', city: 'Los Angeles', stateCode: 'CA', newspaperId: 'la-times', newspaperName: 'Los Angeles Times', x: 108, y: 335, labelOffsetX: 16, labelOffsetY: 2 },
  { id: 'riverside-ca', city: 'Riverside', stateCode: 'CA', newspaperId: 'press-enterprise', newspaperName: 'The Press-Enterprise', x: 128, y: 338, labelOffsetX: 14, labelOffsetY: 2 },
  { id: 'sd-ca', city: 'San Diego', stateCode: 'CA', newspaperId: 'sd-union-tribune', newspaperName: 'The San Diego Union-Tribune', x: 124, y: 365, labelOffsetX: 16, labelOffsetY: 4 },
  { id: 'sf-ca', city: 'San Francisco', stateCode: 'CA', newspaperId: 'sf-chronicle', newspaperName: 'San Francisco Chronicle', x: 52, y: 235, labelOffsetX: -20, labelOffsetY: -6 },
  { id: 'sj-ca', city: 'San Jose', stateCode: 'CA', newspaperId: 'mercury-news', newspaperName: 'The Mercury News', x: 64, y: 252, labelOffsetX: 14, labelOffsetY: 4 },
  { id: 'sacramento-ca', city: 'Sacramento', stateCode: 'CA', newspaperId: 'sacramento-bee', newspaperName: 'The Sacramento Bee', x: 76, y: 205, labelOffsetX: 14, labelOffsetY: -4 },

  // --- TEXAS ---
  { id: 'dallas-tx', city: 'Dallas', stateCode: 'TX', newspaperId: 'dallas-morning-news', newspaperName: 'The Dallas Morning News', x: 452, y: 385, labelOffsetX: 14, labelOffsetY: -4 },
  { id: 'ft-worth-tx', city: 'Fort Worth', stateCode: 'TX', newspaperId: 'fw-star-telegram', newspaperName: 'Fort Worth Star-Telegram', x: 436, y: 388, labelOffsetX: -22, labelOffsetY: 4 },
  { id: 'houston-tx', city: 'Houston', stateCode: 'TX', newspaperId: 'houston-chronicle', newspaperName: 'Houston Chronicle', x: 482, y: 465, labelOffsetX: 14, labelOffsetY: 2 },
  { id: 'austin-tx', city: 'Austin', stateCode: 'TX', newspaperId: 'austin-statesman', newspaperName: 'Austin American-Statesman', x: 432, y: 445, labelOffsetX: -14, labelOffsetY: -6 },
  { id: 'san-antonio-tx', city: 'San Antonio', stateCode: 'TX', newspaperId: 'sa-express-news', newspaperName: 'San Antonio Express-News', x: 415, y: 472, labelOffsetX: -16, labelOffsetY: 6 },
  { id: 'el-paso-tx', city: 'El Paso', stateCode: 'TX', newspaperId: 'el-paso-times', newspaperName: 'El Paso Times', x: 275, y: 430, labelOffsetX: 12, labelOffsetY: 2 },

  // --- NEW YORK ---
  { id: 'nyc-ny', city: 'New York City', stateCode: 'NY', newspaperId: 'ny-times', newspaperName: 'The New York Times', x: 848, y: 198, labelOffsetX: 18, labelOffsetY: 2 },
  { id: 'buffalo-ny', city: 'Buffalo', stateCode: 'NY', newspaperId: 'buffalo-news', newspaperName: 'The Buffalo News', x: 768, y: 168, labelOffsetX: -16, labelOffsetY: -4 },

  // --- ILLINOIS ---
  { id: 'chicago-il', city: 'Chicago', stateCode: 'IL', newspaperId: 'chicago-tribune', newspaperName: 'Chicago Tribune', x: 612, y: 210, labelOffsetX: 14, labelOffsetY: 2 },

  // --- WASHINGTON ---
  { id: 'seattle-wa', city: 'Seattle', stateCode: 'WA', newspaperId: 'seattle-times', newspaperName: 'The Seattle Times', x: 112, y: 42, labelOffsetX: 14, labelOffsetY: 2 },
  { id: 'spokane-wa', city: 'Spokane', stateCode: 'WA', newspaperId: 'spokesman-review', newspaperName: 'The Spokesman-Review', x: 178, y: 55, labelOffsetX: 12, labelOffsetY: 2 },

  // --- GEORGIA ---
  { id: 'atlanta-ga', city: 'Atlanta', stateCode: 'GA', newspaperId: 'atlanta-ajc', newspaperName: 'The Atlanta Journal-Constitution', x: 705, y: 385, labelOffsetX: 14, labelOffsetY: 2 },

  // --- MASSACHUSETTS ---
  { id: 'boston-ma', city: 'Boston', stateCode: 'MA', newspaperId: 'boston-globe', newspaperName: 'The Boston Globe', x: 882, y: 154, labelOffsetX: 14, labelOffsetY: 2 },

  // --- DISTRICT OF COLUMBIA / DMV ---
  { id: 'dc-dmv', city: 'Washington DC', stateCode: 'DC', newspaperId: 'washington-post', newspaperName: 'The Washington Post', x: 805, y: 248, labelOffsetX: 16, labelOffsetY: -2 },

  // --- PENNSYLVANIA ---
  { id: 'philly-pa', city: 'Philadelphia', stateCode: 'PA', newspaperId: 'inquirer', newspaperName: 'The Philadelphia Inquirer', x: 825, y: 222, labelOffsetX: 16, labelOffsetY: 2 },
  { id: 'pittsburgh-pa', city: 'Pittsburgh', stateCode: 'PA', newspaperId: 'pittsburgh-pg', newspaperName: 'Pittsburgh Post-Gazette', x: 752, y: 212, labelOffsetX: -18, labelOffsetY: 2 },

  // --- NORTH CAROLINA ---
  { id: 'charlotte-nc', city: 'Charlotte', stateCode: 'NC', newspaperId: 'charlotte-observer', newspaperName: 'The Charlotte Observer', x: 755, y: 335, labelOffsetX: 14, labelOffsetY: 4 },
  { id: 'raleigh-nc', city: 'Raleigh', stateCode: 'NC', newspaperId: 'raleigh-no', newspaperName: 'The News & Observer', x: 790, y: 318, labelOffsetX: 14, labelOffsetY: -2 },

  // --- MICHIGAN ---
  { id: 'detroit-mi', city: 'Detroit', stateCode: 'MI', newspaperId: 'detroit-free-press', newspaperName: 'Detroit Free Press', x: 686, y: 202, labelOffsetX: 14, labelOffsetY: 2 },

  // --- MINNESOTA ---
  { id: 'minneapolis-mn', city: 'Minneapolis', stateCode: 'MN', newspaperId: 'star-tribune', newspaperName: 'Star Tribune', x: 532, y: 130, labelOffsetX: 14, labelOffsetY: 2 },

  // --- COLORADO ---
  { id: 'denver-co', city: 'Denver', stateCode: 'CO', newspaperId: 'denver-post', newspaperName: 'The Denver Post', x: 342, y: 260, labelOffsetX: 14, labelOffsetY: 2 },

  // --- ARIZONA ---
  { id: 'phoenix-az', city: 'Phoenix', stateCode: 'AZ', newspaperId: 'az-republic', newspaperName: 'The Arizona Republic', x: 195, y: 370, labelOffsetX: 14, labelOffsetY: 2 },

  // --- NEVADA ---
  { id: 'las-vegas-nv', city: 'Las Vegas', stateCode: 'NV', newspaperId: 'las-vegas-review-journal', newspaperName: 'Las Vegas Review-Journal', x: 160, y: 315, labelOffsetX: 14, labelOffsetY: 2 },
  { id: 'reno-nv', city: 'Reno', stateCode: 'NV', newspaperId: 'reno-gazette-journal', newspaperName: 'Reno Gazette-Journal', x: 92, y: 202, labelOffsetX: 12, labelOffsetY: -2 },

  // --- MISSOURI ---
  { id: 'st-louis-mo', city: 'St. Louis', stateCode: 'MO', newspaperId: 'st-louis-post-dispatch', newspaperName: 'St. Louis Post-Dispatch', x: 582, y: 282, labelOffsetX: 14, labelOffsetY: 2 },
  { id: 'kansas-city-mo', city: 'Kansas City', stateCode: 'MO', newspaperId: 'kc-star', newspaperName: 'The Kansas City Star', x: 508, y: 275, labelOffsetX: -18, labelOffsetY: -2 },

  // --- TENNESSEE ---
  { id: 'nashville-tn', city: 'Nashville', stateCode: 'TN', newspaperId: 'tennessean', newspaperName: 'The Tennessean', x: 658, y: 330, labelOffsetX: 14, labelOffsetY: -2 },
  { id: 'memphis-tn', city: 'Memphis', stateCode: 'TN', newspaperId: 'commercial-appeal', newspaperName: 'The Commercial Appeal', x: 608, y: 362, labelOffsetX: 12, labelOffsetY: -3 },

  // --- OHIO ---
  { id: 'columbus-oh', city: 'Columbus', stateCode: 'OH', newspaperId: 'columbus-dispatch', newspaperName: 'The Columbus Dispatch', x: 705, y: 235, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'cleveland-oh', city: 'Cleveland', stateCode: 'OH', newspaperId: 'cleveland-plain-dealer', newspaperName: 'The Plain Dealer', x: 725, y: 198, labelOffsetX: 12, labelOffsetY: -4 },
  { id: 'cincinnati-oh', city: 'Cincinnati', stateCode: 'OH', newspaperId: 'cincinnati-enquirer', newspaperName: 'The Cincinnati Enquirer', x: 680, y: 268, labelOffsetX: 12, labelOffsetY: 2 },

  // --- INDIANA ---
  { id: 'indianapolis-in', city: 'Indianapolis', stateCode: 'IN', newspaperId: 'indy-star', newspaperName: 'The Indianapolis Star', x: 648, y: 255, labelOffsetX: 14, labelOffsetY: 2 },

  // --- WISCONSIN ---
  { id: 'milwaukee-wi', city: 'Milwaukee', stateCode: 'WI', newspaperId: 'milwaukee-journal-sentinel', newspaperName: 'Milwaukee Journal Sentinel', x: 612, y: 178, labelOffsetX: 14, labelOffsetY: 2 },

  // --- LOUISIANA ---
  { id: 'new-orleans-la', city: 'New Orleans', stateCode: 'LA', newspaperId: 'times-picayune', newspaperName: 'The Times-Picayune', x: 602, y: 468, labelOffsetX: 14, labelOffsetY: 2 },

  // --- OREGON ---
  { id: 'portland-or', city: 'Portland', stateCode: 'OR', newspaperId: 'oregonian', newspaperName: 'The Sunday Oregonian', x: 98, y: 82, labelOffsetX: 14, labelOffsetY: 2 },

  // --- UTAH ---
  { id: 'salt-lake-ut', city: 'Salt Lake City', stateCode: 'UT', newspaperId: 'salt-lake-tribune', newspaperName: 'The Salt Lake Tribune', x: 228, y: 218, labelOffsetX: 14, labelOffsetY: 2 },

  // --- MONTANA, NORTH DAKOTA, WYOMING & REGIONAL HUBS ---
  { id: 'billings-mt', city: 'Billings', stateCode: 'MT', newspaperId: 'billings-gazette', newspaperName: 'Billings Gazette', x: 295, y: 108, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'fargo-nd', city: 'Fargo', stateCode: 'ND', newspaperId: 'forum-fargo', newspaperName: 'The Forum', x: 455, y: 95, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'casper-wy', city: 'Casper', stateCode: 'WY', newspaperId: 'casper-star-tribune', newspaperName: 'Casper Star-Tribune', x: 305, y: 175, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'omaha-ne', city: 'Omaha', stateCode: 'NE', newspaperId: 'omaha-world-herald', newspaperName: 'Omaha World-Herald', x: 480, y: 228, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'sioux-falls-sd', city: 'Sioux Falls', stateCode: 'SD', newspaperId: 'argus-leader', newspaperName: 'Argus Leader', x: 465, y: 175, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'albuquerque-nm', city: 'Albuquerque', stateCode: 'NM', newspaperId: 'abq-journal', newspaperName: 'Albuquerque Journal', x: 298, y: 360, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'oklahoma-city-ok', city: 'Oklahoma City', stateCode: 'OK', newspaperId: 'oklahoman', newspaperName: 'The Oklahoman', x: 448, y: 358, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'richmond-va', city: 'Richmond', stateCode: 'VA', newspaperId: 'richmond-times-dispatch', newspaperName: 'Richmond Times-Dispatch', x: 795, y: 275, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'baltimore-md', city: 'Baltimore', stateCode: 'MD', newspaperId: 'baltimore-sun', newspaperName: 'The Baltimore Sun', x: 818, y: 236, labelOffsetX: 12, labelOffsetY: -3 },
  { id: 'charleston-sc', city: 'Charleston', stateCode: 'SC', newspaperId: 'post-and-courier', newspaperName: 'The Post and Courier', x: 775, y: 390, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'charleston-wv', city: 'Charleston', stateCode: 'WV', newspaperId: 'charleston-gazette-mail', newspaperName: 'The Gazette-Mail', x: 740, y: 270, labelOffsetX: -16, labelOffsetY: 2 },
  { id: 'birmingham-al', city: 'Birmingham', stateCode: 'AL', newspaperId: 'birmingham-news', newspaperName: 'The Birmingham News / AL.com', x: 662, y: 395, labelOffsetX: -16, labelOffsetY: 2 },
  { id: 'jackson-ms', city: 'Jackson', stateCode: 'MS', newspaperId: 'clarion-ledger', newspaperName: 'The Clarion-Ledger', x: 605, y: 410, labelOffsetX: -16, labelOffsetY: 2 },
  { id: 'little-rock-ar', city: 'Little Rock', stateCode: 'AR', newspaperId: 'arkansas-democrat-gazette', newspaperName: 'Democrat-Gazette', x: 545, y: 365, labelOffsetX: -16, labelOffsetY: 2 },
  { id: 'boise-id', city: 'Boise', stateCode: 'ID', newspaperId: 'idaho-statesman', newspaperName: 'Idaho Statesman', x: 175, y: 145, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'des-moines-ia', city: 'Des Moines', stateCode: 'IA', newspaperId: 'des-moines-register', newspaperName: 'The Des Moines Register', x: 525, y: 215, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'wichita-ks', city: 'Wichita', stateCode: 'KS', newspaperId: 'wichita-eagle', newspaperName: 'The Wichita Eagle', x: 445, y: 305, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'louisville-ky', city: 'Louisville', stateCode: 'KY', newspaperId: 'courier-journal', newspaperName: 'The Courier-Journal', x: 668, y: 285, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'portland-me', city: 'Portland', stateCode: 'ME', newspaperId: 'portland-press-herald', newspaperName: 'Press Herald', x: 885, y: 125, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'hartford-ct', city: 'Hartford', stateCode: 'CT', newspaperId: 'hartford-courant', newspaperName: 'Hartford Courant', x: 856, y: 176, labelOffsetX: 10, labelOffsetY: -2 },
  { id: 'providence-ri', city: 'Providence', stateCode: 'RI', newspaperId: 'providence-journal', newspaperName: 'The Providence Journal', x: 878, y: 172, labelOffsetX: 10, labelOffsetY: 2 },
  { id: 'manchester-nh', city: 'Manchester', stateCode: 'NH', newspaperId: 'union-leader', newspaperName: 'Union Leader', x: 870, y: 135, labelOffsetX: 10, labelOffsetY: -2 },
  { id: 'burlington-vt', city: 'Burlington', stateCode: 'VT', newspaperId: 'burlington-free-press', newspaperName: 'Free Press', x: 844, y: 115, labelOffsetX: -16, labelOffsetY: -2 },
  { id: 'wilmington-de', city: 'Wilmington', stateCode: 'DE', newspaperId: 'news-journal', newspaperName: 'The News Journal', x: 832, y: 228, labelOffsetX: 10, labelOffsetY: 2 },
  { id: 'newark-nj', city: 'Newark', stateCode: 'NJ', newspaperId: 'star-ledger', newspaperName: 'The Star-Ledger', x: 838, y: 208, labelOffsetX: 10, labelOffsetY: -2 },
  { id: 'anchorage-ak', city: 'Anchorage', stateCode: 'AK', newspaperId: 'anchorage-daily-news', newspaperName: 'Daily News', x: 132, y: 532, labelOffsetX: 12, labelOffsetY: 2 },
  { id: 'honolulu-hi', city: 'Honolulu', stateCode: 'HI', newspaperId: 'star-advertiser', newspaperName: 'Star-Advertiser', x: 315, y: 540, labelOffsetX: 12, labelOffsetY: 2 }
];
