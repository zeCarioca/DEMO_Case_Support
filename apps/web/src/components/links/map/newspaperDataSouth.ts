import { SundayNewspaperInfo } from './types.js';

export const SUNDAY_NEWSPAPERS_SOUTH: SundayNewspaperInfo[] = [
  // --- TEXAS ---
  {
    id: 'dallas-morning-news',
    name: 'The Dallas Morning News',
    stateCode: 'TX',
    stateName: 'Texas',
    primaryCity: 'Dallas',
    metroArea: 'Dallas-Fort Worth Metroplex',
    countiesCovered: ['Dallas', 'Collin', 'Denton', 'Rockwall', 'Ellis', 'Kaufman'],
    zipPrefixes: ['750', '751', '752', '753'],
    circulationTier: 'Nacional / Major Metro',
    estimatedSundayCirculation: '~145.000',
    websiteUrl: 'https://www.dallasnews.com',
    classifiedsEmail: 'legalnotices@dallasnews.com',
    permNotes: 'Principal periódico dominical para o condado de Dallas e quadrante leste/norte do DFW.'
  },
  {
    id: 'fw-star-telegram',
    name: 'Fort Worth Star-Telegram',
    stateCode: 'TX',
    stateName: 'Texas',
    primaryCity: 'Fort Worth',
    metroArea: 'Fort Worth & Tarrant County',
    countiesCovered: ['Tarrant', 'Parker', 'Johnson', 'Wise', 'Hood'],
    zipPrefixes: ['760', '761', '762'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~78.000',
    websiteUrl: 'https://www.star-telegram.com',
    classifiedsEmail: 'legals@star-telegram.com',
    permNotes: 'Jornal dominante no lado oeste do Metroplex (condado de Tarrant e vizinhança).'
  },
  {
    id: 'houston-chronicle',
    name: 'Houston Chronicle',
    stateCode: 'TX',
    stateName: 'Texas',
    primaryCity: 'Houston',
    metroArea: 'Greater Houston Area',
    countiesCovered: ['Harris', 'Fort Bend', 'Montgomery', 'Brazoria', 'Galveston'],
    zipPrefixes: ['770', '772', '773', '774', '775'],
    circulationTier: 'Nacional / Major Metro',
    estimatedSundayCirculation: '~220.000',
    websiteUrl: 'https://www.houstonchronicle.com',
    classifiedsEmail: 'legals@chron.com',
    permNotes: 'Maior circulação do Texas. Cobre a maior concentração de empresas de energia e medicina do país.'
  },
  {
    id: 'austin-statesman',
    name: 'Austin American-Statesman',
    stateCode: 'TX',
    stateName: 'Texas',
    primaryCity: 'Austin',
    metroArea: 'Austin-Round Rock-San Marcos',
    countiesCovered: ['Travis', 'Williamson', 'Hays', 'Bastrop'],
    zipPrefixes: ['786', '787'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~85.000',
    websiteUrl: 'https://www.statesman.com',
    classifiedsEmail: 'legals@statesman.com',
    permNotes: 'Principal jornal dominical para a capital do Texas e polo de tecnologia (Silicon Hills).'
  },
  {
    id: 'sa-express-news',
    name: 'San Antonio Express-News',
    stateCode: 'TX',
    stateName: 'Texas',
    primaryCity: 'San Antonio',
    metroArea: 'Greater San Antonio',
    countiesCovered: ['Bexar', 'Comal', 'Guadalupe'],
    zipPrefixes: ['781', '782'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~95.000',
    websiteUrl: 'https://www.expressnews.com',
    classifiedsEmail: 'legals@express-news.net',
    permNotes: 'Jornal dominante do sul e centro-sul do Texas.'
  },
  {
    id: 'el-paso-times',
    name: 'El Paso Times',
    stateCode: 'TX',
    stateName: 'Texas',
    primaryCity: 'El Paso',
    metroArea: 'El Paso Metropolitan Area (CBSA 21340)',
    countiesCovered: ['El Paso', 'Hudspeth'],
    zipPrefixes: ['799'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~45.000',
    websiteUrl: 'https://www.elpasotimes.com',
    classifiedsEmail: 'legals@elpasotimes.com',
    permNotes: 'Jornal dominical mandatório para a região oeste do Texas (El Paso MSA / Borderplex). Protege contra indeferimento por anúncio fora da normal commuting distance (Austin fica a 550 milhas e Dallas a 630 milhas).'
  },

  // --- TENNESSEE ---
  {
    id: 'tennessean',
    name: 'The Tennessean',
    stateCode: 'TN',
    stateName: 'Tennessee',
    primaryCity: 'Nashville',
    metroArea: 'Nashville-Davidson-Murfreesboro (CBSA 34980)',
    countiesCovered: ['Davidson', 'Williamson', 'Rutherford', 'Wilson', 'Sumner'],
    zipPrefixes: ['370', '371', '372'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~95.000',
    websiteUrl: 'https://www.tennessean.com',
    classifiedsEmail: 'legals@tennessean.com',
    permNotes: 'Principal jornal dominical para a região de Middle Tennessee e capital do estado.'
  },
  {
    id: 'commercial-appeal',
    name: 'The Commercial Appeal',
    stateCode: 'TN',
    stateName: 'Tennessee',
    primaryCity: 'Memphis',
    metroArea: 'Greater Memphis / Mid-South (TN-MS-AR / CBSA 32820)',
    countiesCovered: ['Shelby', 'Fayette', 'Tipton'],
    zipPrefixes: ['380', '381'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~65.000',
    websiteUrl: 'https://www.commercialappeal.com',
    classifiedsEmail: 'legals@commercialappeal.com',
    permNotes: 'Diário dominical de maior circulação geral no oeste do Tennessee e conurbação de Memphis.'
  },

  // --- LOUISIANA ---
  {
    id: 'times-picayune',
    name: 'The Times-Picayune | The New Orleans Advocate',
    stateCode: 'LA',
    stateName: 'Louisiana',
    primaryCity: 'New Orleans',
    metroArea: 'New Orleans-Metairie (CBSA 35380)',
    countiesCovered: ['Orleans', 'Jefferson', 'St. Tammany', 'St. Bernard'],
    zipPrefixes: ['700', '701', '704'],
    circulationTier: 'Metropolitano Regional',
    estimatedSundayCirculation: '~85.000',
    websiteUrl: 'https://www.nola.com',
    classifiedsEmail: 'legals@theadvocate.com',
    permNotes: 'Principal periódico dominical de Greater New Orleans após a fusão de 2019 com o The Advocate. Mantém edição física impressa de domingo.'
  }
];
