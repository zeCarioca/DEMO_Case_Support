import { CityLimitZone } from './types.js';

// Municipal boundary dividing lines separating city limits within multi-city states
export interface CityLimitDividingLine {
  id: string;
  stateCode: string;
  d: string;
  label?: string;
}

export const CITY_LIMIT_DIVIDING_LINES: CityLimitDividingLine[] = [
  // --- FLORIDA DIVISIONS ---
  // North FL (Jacksonville) vs Central FL (Orlando)
  { id: 'fl-div-jax-orl', stateCode: 'FL', d: 'M 720 460 Q 750 462 778 460', label: 'Limite Municipal Jacksonville / Orlando' },
  // Central East (Orlando) vs Central West (Tampa)
  { id: 'fl-div-orl-tpa', stateCode: 'FL', d: 'M 748 470 L 748 515', label: 'Limite Municipal Tampa / Orlando' },
  // Central FL vs South FL (Broward / Palm Beach)
  { id: 'fl-div-cen-sth', stateCode: 'FL', d: 'M 730 515 Q 765 515 802 518', label: 'Limite Regional Sul da Flórida' },
  // Fort Lauderdale (Broward) vs Miami (Miami-Dade)
  { id: 'fl-div-ftl-mia', stateCode: 'FL', d: 'M 780 538 L 806 538', label: 'Limite Municipal Miami / Ft. Lauderdale' },

  // --- TEXAS DIVISIONS ---
  // Dallas vs Fort Worth (DFW Metroplex Division)
  { id: 'tx-div-dal-ftw', stateCode: 'TX', d: 'M 444 370 L 444 402', label: 'Divisão Municipal Dallas / Fort Worth' },
  // DFW North vs Central TX (Austin / San Antonio)
  { id: 'tx-div-dfw-cen', stateCode: 'TX', d: 'M 390 415 Q 440 412 485 410', label: 'Limite DFW / Central Texas' },
  // Austin vs San Antonio
  { id: 'tx-div-atx-sat', stateCode: 'TX', d: 'M 400 458 L 440 458', label: 'Limite Municipal Austin / San Antonio' },
  // Central TX vs Houston (Gulf Coast)
  { id: 'tx-div-cen-hou', stateCode: 'TX', d: 'M 458 420 Q 462 460 465 490', label: 'Limite Municipal Central / Houston' },
  // West Texas (El Paso) Boundary
  { id: 'tx-div-west', stateCode: 'TX', d: 'M 360 365 L 375 440', label: 'Limite West Texas / Permian' },

  // --- CALIFORNIA DIVISIONS ---
  // Northern CA (Sacramento / Bay Area) vs Southern CA (LA / SD)
  { id: 'ca-div-nor-sth', stateCode: 'CA', d: 'M 50 280 Q 95 285 145 300', label: 'Divisão Norte / Sul da Califórnia' },
  // San Francisco vs San Jose (Bay Area Internal Limit)
  { id: 'ca-div-sfo-sjc', stateCode: 'CA', d: 'M 45 244 L 75 244', label: 'Limite Municipal SF / Silicon Valley' },
  // Bay Area vs Sacramento Valley
  { id: 'ca-div-bay-sac', stateCode: 'CA', d: 'M 55 218 Q 80 220 100 225', label: 'Limite Sacramento / Bay Area' },
  // Los Angeles Basin vs San Diego
  { id: 'ca-div-lax-san', stateCode: 'CA', d: 'M 98 350 L 140 350', label: 'Limite Municipal Los Angeles / San Diego' },

  // --- NEW YORK DIVISIONS ---
  // Western NY (Buffalo) vs NYC Metro
  { id: 'ny-div-buf-nyc', stateCode: 'NY', d: 'M 790 150 Q 800 185 810 215', label: 'Limite Upstate Buffalo / NYC Metro' },

  // --- PENNSYLVANIA DIVISIONS ---
  // Western PA (Pittsburgh) vs Eastern PA (Philadelphia)
  { id: 'pa-div-pit-phl', stateCode: 'PA', d: 'M 785 200 L 785 235', label: 'Divisão Municipal Pittsburgh / Philadelphia' },

  // --- MISSOURI DIVISIONS ---
  // Kansas City (West) vs St. Louis (East)
  { id: 'mo-div-kcm-stl', stateCode: 'MO', d: 'M 545 260 L 545 305', label: 'Limite Municipal Kansas City / St. Louis' },

  // --- NORTH CAROLINA DIVISIONS ---
  // Charlotte (Piedmont) vs Raleigh (Triangle)
  { id: 'nc-div-clt-ral', stateCode: 'NC', d: 'M 770 310 L 775 350', label: 'Limite Municipal Charlotte / Raleigh' }
];

// City limit area polygons representing municipal territories
export const CITY_LIMIT_ZONES: CityLimitZone[] = [
  // Florida Zones
  { id: 'miami-fl', city: 'Miami', stateCode: 'FL', newspaperId: 'miami-herald', center: { x: 795, y: 545 }, path: 'M 780 538 L 806 538 L 804 560 L 785 570 L 780 550 Z' },
  { id: 'ft-lauderdale-fl', city: 'Fort Lauderdale', stateCode: 'FL', newspaperId: 'sun-sentinel', center: { x: 798, y: 532 }, path: 'M 780 518 L 802 518 L 806 538 L 780 538 Z' },
  { id: 'orlando-fl', city: 'Orlando', stateCode: 'FL', newspaperId: 'orlando-sentinel', center: { x: 760, y: 482 }, path: 'M 748 460 L 778 460 L 795 495 L 775 518 L 748 515 Z' },
  { id: 'tampa-fl', city: 'Tampa', stateCode: 'FL', newspaperId: 'tampa-bay-times', center: { x: 735, y: 495 }, path: 'M 720 460 L 748 460 L 748 515 L 730 515 L 720 485 Z' },
  { id: 'jacksonville-fl', city: 'Jacksonville', stateCode: 'FL', newspaperId: 'fl-times-union', center: { x: 765, y: 446 }, path: 'M 700 420 L 778 420 L 778 460 L 720 460 Z' },

  // Texas Zones
  { id: 'dallas-tx', city: 'Dallas', stateCode: 'TX', newspaperId: 'dallas-morning-news', center: { x: 452, y: 385 }, path: 'M 444 370 L 485 370 L 485 410 L 444 402 Z' },
  { id: 'ft-worth-tx', city: 'Fort Worth', stateCode: 'TX', newspaperId: 'fw-star-telegram', center: { x: 436, y: 388 }, path: 'M 410 370 L 444 370 L 444 402 L 390 415 Z' },
  { id: 'houston-tx', city: 'Houston', stateCode: 'TX', newspaperId: 'houston-chronicle', center: { x: 482, y: 465 }, path: 'M 462 420 L 515 425 L 510 485 L 465 480 Z' },
  { id: 'austin-tx', city: 'Austin', stateCode: 'TX', newspaperId: 'austin-statesman', center: { x: 432, y: 445 }, path: 'M 410 415 L 460 415 L 458 458 L 415 458 Z' },
  { id: 'san-antonio-tx', city: 'San Antonio', stateCode: 'TX', newspaperId: 'sa-express-news', center: { x: 415, y: 472 }, path: 'M 390 458 L 458 458 L 450 500 L 385 495 Z' },

  // California Zones
  { id: 'la-ca', city: 'Los Angeles', stateCode: 'CA', newspaperId: 'la-times', center: { x: 108, y: 335 }, path: 'M 75 315 L 145 305 L 140 350 L 98 350 Z' },
  { id: 'sd-ca', city: 'San Diego', stateCode: 'CA', newspaperId: 'sd-union-tribune', center: { x: 124, y: 365 }, path: 'M 98 350 L 140 350 L 145 385 L 108 385 Z' },
  { id: 'sf-ca', city: 'San Francisco', stateCode: 'CA', newspaperId: 'sf-chronicle', center: { x: 52, y: 235 }, path: 'M 40 220 L 68 220 L 65 244 L 40 244 Z' },
  { id: 'sj-ca', city: 'San Jose', stateCode: 'CA', newspaperId: 'mercury-news', center: { x: 64, y: 252 }, path: 'M 40 244 L 75 244 L 85 280 L 50 280 Z' },
  { id: 'sacramento-ca', city: 'Sacramento', stateCode: 'CA', newspaperId: 'sacramento-bee', center: { x: 76, y: 205 }, path: 'M 45 180 L 105 180 L 100 225 L 55 218 Z' },

  // New York Zones
  { id: 'nyc-ny', city: 'New York City', stateCode: 'NY', newspaperId: 'ny-times', center: { x: 848, y: 198 }, path: 'M 810 185 L 870 185 L 870 215 L 815 215 Z' },
  { id: 'buffalo-ny', city: 'Buffalo', stateCode: 'NY', newspaperId: 'buffalo-news', center: { x: 768, y: 168 }, path: 'M 740 145 L 795 145 L 805 190 L 740 190 Z' },

  // Pennsylvania Zones
  { id: 'philly-pa', city: 'Philadelphia', stateCode: 'PA', newspaperId: 'inquirer', center: { x: 825, y: 222 }, path: 'M 785 200 L 845 200 L 845 240 L 785 240 Z' },
  { id: 'pittsburgh-pa', city: 'Pittsburgh', stateCode: 'PA', newspaperId: 'pittsburgh-pg', center: { x: 752, y: 212 }, path: 'M 725 195 L 785 195 L 785 235 L 725 235 Z' },

  // Illinois Zone (Chicago)
  { id: 'chicago-il', city: 'Chicago', stateCode: 'IL', newspaperId: 'chicago-tribune', center: { x: 612, y: 210 }, path: 'M 590 190 L 635 190 L 630 235 L 590 235 Z' },

  // Washington Zone (Seattle)
  { id: 'seattle-wa', city: 'Seattle', stateCode: 'WA', newspaperId: 'seattle-times', center: { x: 112, y: 42 }, path: 'M 85 25 L 140 25 L 135 65 L 85 65 Z' },

  // Georgia Zone (Atlanta)
  { id: 'atlanta-ga', city: 'Atlanta', stateCode: 'GA', newspaperId: 'atlanta-ajc', center: { x: 705, y: 385 }, path: 'M 680 365 L 730 365 L 730 415 L 680 415 Z' },

  // Massachusetts Zone (Boston)
  { id: 'boston-ma', city: 'Boston', stateCode: 'MA', newspaperId: 'boston-globe', center: { x: 882, y: 154 }, path: 'M 865 140 L 900 140 L 900 170 L 865 170 Z' },

  // DC / DMV Zone
  { id: 'dc-dmv', city: 'Washington DC', stateCode: 'DC', newspaperId: 'washington-post', center: { x: 805, y: 248 }, path: 'M 790 235 L 820 235 L 820 262 L 790 262 Z' }
];
