import { SundayNewspaperInfo } from './types.js';

export const SUNDAY_NEWSPAPERS_CENTRAL: SundayNewspaperInfo[] = [
  // --- ILLINOIS ---
  {
    id: 'chicago-tribune',
    name: 'Chicago Tribune',
    stateCode: 'IL',
    stateName: 'Illinois',
    primaryCity: 'Chicago',
    metroArea: 'Chicagoland / Cook County',
    countiesCovered: ['Cook', 'DuPage', 'Lake', 'Will', 'Kane', 'McHenry'],
    zipPrefixes: ['600', '601', '602', '603', '604', '605', '606', '607', '608'],
    circulationTier: 'Nacional / Major Metro',
    estimatedSundayCirculation: '~320.000',
    websiteUrl: 'https://www.chicagotribune.com',
    classifiedsEmail: 'legals@chicagotribune.com',
    permNotes: 'Jornal de maior circulação geral do Meio-Oeste. Referência oficial para Chicagoland.',
    alternativePapers: ['Chicago Sun-Times']
  },

  // --- MISSOURI ---
  {
    id: 'st-louis-post-dispatch',
    name: 'St. Louis Post-Dispatch',
    stateCode: 'MO',
    stateName: 'Missouri',
    primaryCity: 'St. Louis',
    metroArea: 'Greater St. Louis (MO-IL / CBSA 41180)',
    countiesCovered: ['St. Louis City', 'St. Louis County', 'St. Charles', 'Jefferson', 'Franklin'],
    zipPrefixes: ['630', '631', '633'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~120.000',
    websiteUrl: 'https://www.stltoday.com',
    classifiedsEmail: 'legals@post-dispatch.com',
    permNotes: 'Principal periódico dominical para St. Louis e condados vizinhos do Missouri e Illinois Metro East.'
  },
  {
    id: 'kc-star',
    name: 'The Kansas City Star',
    stateCode: 'MO',
    stateName: 'Missouri',
    primaryCity: 'Kansas City',
    metroArea: 'Kansas City Metropolitan Area (MO-KS / CBSA 28140)',
    countiesCovered: ['Jackson', 'Clay', 'Platte', 'Cass'],
    zipPrefixes: ['640', '641'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~85.000',
    websiteUrl: 'https://www.kansascity.com',
    classifiedsEmail: 'legals@kcstar.com',
    permNotes: 'Principal publicação dominical de circulação geral na região metropolitana bistadual de Kansas City (Missouri e subúrbios de Johnson/Wyandotte no Kansas).'
  },

  // --- MICHIGAN & MINNESOTA ---
  {
    id: 'detroit-free-press',
    name: 'Detroit Free Press',
    stateCode: 'MI',
    stateName: 'Michigan',
    primaryCity: 'Detroit',
    metroArea: 'Metro Detroit & Southeast Michigan',
    countiesCovered: ['Wayne', 'Oakland', 'Macomb', 'Washtenaw'],
    zipPrefixes: ['480', '481', '482', '483'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~170.000',
    websiteUrl: 'https://www.freep.com',
    classifiedsEmail: 'legals@freepress.com',
    permNotes: 'Maior circulação dominical de Michigan; edição conjunta dominical com o The Detroit News.',
    alternativePapers: ['The Detroit News']
  },
  {
    id: 'star-tribune',
    name: 'Star Tribune',
    stateCode: 'MN',
    stateName: 'Minnesota',
    primaryCity: 'Minneapolis',
    metroArea: 'Twin Cities (Minneapolis-St. Paul)',
    countiesCovered: ['Hennepin', 'Ramsey', 'Dakota', 'Anoka', 'Washington'],
    zipPrefixes: ['550', '551', '553', '554'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~210.000',
    websiteUrl: 'https://www.startribune.com',
    classifiedsEmail: 'legals@startribune.com',
    permNotes: 'Periódico dominical dominante para todo o estado de Minnesota e polo das Twin Cities.',
    alternativePapers: ['St. Paul Pioneer Press']
  },

  // --- OHIO ---
  {
    id: 'columbus-dispatch',
    name: 'The Columbus Dispatch',
    stateCode: 'OH',
    stateName: 'Ohio',
    primaryCity: 'Columbus',
    metroArea: 'Columbus Metropolitan Area (CBSA 18140)',
    countiesCovered: ['Franklin', 'Delaware', 'Licking', 'Fairfield', 'Union'],
    zipPrefixes: ['430', '431', '432'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~95.000',
    websiteUrl: 'https://www.dispatch.com',
    classifiedsEmail: 'legals@dispatch.com',
    permNotes: 'Principal periódico dominical de circulação geral para a capital de Ohio e região central.'
  },
  {
    id: 'cleveland-plain-dealer',
    name: 'The Plain Dealer',
    stateCode: 'OH',
    stateName: 'Ohio',
    primaryCity: 'Cleveland',
    metroArea: 'Greater Cleveland / Northeast Ohio (CBSA 17460)',
    countiesCovered: ['Cuyahoga', 'Lake', 'Geauga', 'Medina', 'Lorain'],
    zipPrefixes: ['440', '441'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~140.000',
    websiteUrl: 'https://www.cleveland.com/plaindealer',
    classifiedsEmail: 'legals@cleveland.com',
    permNotes: 'Maior jornal dominical impresso do nordeste de Ohio. Mantém circulação geral física ampla em todo o condado de Cuyahoga e condados adjacentes.'
  },
  {
    id: 'cincinnati-enquirer',
    name: 'The Cincinnati Enquirer',
    stateCode: 'OH',
    stateName: 'Ohio',
    primaryCity: 'Cincinnati',
    metroArea: 'Cincinnati Tristate Area (OH-KY-IN / CBSA 17140)',
    countiesCovered: ['Hamilton', 'Butler', 'Warren', 'Clermont'],
    zipPrefixes: ['450', '451', '452'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~105.000',
    websiteUrl: 'https://www.cincinnati.com',
    classifiedsEmail: 'legals@enquirer.com',
    permNotes: 'Jornal dominical obrigatório para a região metropolitana tristadual de Cincinnati (OH-KY-IN) dentro da normal commuting distance.'
  },

  // --- INDIANA & WISCONSIN ---
  {
    id: 'indy-star',
    name: 'The Indianapolis Star',
    stateCode: 'IN',
    stateName: 'Indiana',
    primaryCity: 'Indianapolis',
    metroArea: 'Indianapolis-Carmel-Anderson (CBSA 26900)',
    countiesCovered: ['Marion', 'Hamilton', 'Hendricks', 'Johnson', 'Boone'],
    zipPrefixes: ['460', '461', '462'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~115.000',
    websiteUrl: 'https://www.indystar.com',
    classifiedsEmail: 'legals@indystar.com',
    permNotes: 'Jornal dominical dominante para toda a região central de Indiana e capital do estado.'
  },
  {
    id: 'milwaukee-journal-sentinel',
    name: 'Milwaukee Journal Sentinel',
    stateCode: 'WI',
    stateName: 'Wisconsin',
    primaryCity: 'Milwaukee',
    metroArea: 'Milwaukee-Waukesha (CBSA 33340)',
    countiesCovered: ['Milwaukee', 'Waukesha', 'Ozaukee', 'Washington'],
    zipPrefixes: ['530', '531', '532'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~125.000',
    websiteUrl: 'https://www.jsonline.com',
    classifiedsEmail: 'legals@journalsentinel.com',
    permNotes: 'Principal jornal dominical de circulação geral de Wisconsin.'
  }
];
