import { CategoryFilterOption, GovernmentLink } from './types.js';

export const CATEGORY_FILTER_OPTIONS: CategoryFilterOption[] = [
  { id: 'ALL', label: 'Todos os Portais' },
  { id: 'DOL_LABOR', label: 'Trabalho (DOL & Salários)' },
  { id: 'USCIS_IMMIGRATION', label: 'Imigração (USCIS)' },
  { id: 'DOS_CONSULAR', label: 'Consular & Vistos (DOS)' },
  { id: 'CBP_LOGISTICS', label: 'I-94 & Logística' },
  { id: 'SWA_STATE_WORKFORCE', label: 'Agências Estaduais (SWA)' }
];

export const GOVERNMENT_LINKS: GovernmentLink[] = [
  // DOL
  {
    id: 'flag-dol',
    title: 'FLAG — Foreign Labor Application Gateway',
    agency: 'DOL',
    category: 'DOL_LABOR',
    url: 'https://flag.dol.gov',
    badge: 'ETA-9141 & ETA-9089',
    description: 'Portal oficial do Departamento de Trabalho para submissão de Determinação de Salário Prevalecente (PWD) e certificações PERM.',
    isOfficialGov: true,
    criticalNote: 'Contas vinculadas via login.gov do escritório para emissão do PWD antes da abertura do período de recrutamento.'
  },
  {
    id: 'flc-datacenter',
    title: 'FLC Data Center — Prevailing Wage Search',
    agency: 'DOL',
    category: 'DOL_LABOR',
    url: 'https://www.flcdatacenter.com',
    badge: 'Tabelas Salariais OES',
    description: 'Base de dados oficial de salários prevalecentes por código SOC e região geográfica (MSAs/Condados em vigor).',
    isOfficialGov: true
  },
  {
    id: 'onet-online',
    title: 'O*NET OnLine — Occupational Information Network',
    agency: 'DOL',
    category: 'DOL_LABOR',
    url: 'https://www.onetonline.org',
    badge: 'Códigos SOC & SVP',
    description: 'Catálogo de cargos, requisitos mínimos de escolaridade, faixas de Job Zone e pontuação SVP para embasamento do PERM.',
    isOfficialGov: true
  },
  {
    id: 'dol-processing-times',
    title: 'DOL Processing Times — Prazos Oficiais',
    agency: 'DOL',
    category: 'DOL_LABOR',
    url: 'https://flag.dol.gov/processingtimes',
    badge: 'Backlog PWD & PERM',
    description: 'Atualização mensal dos meses de prioridade em análise para PWD, PERM regulares e auditorias do Departamento de Trabalho.',
    isOfficialGov: true
  },

  // USCIS
  {
    id: 'uscis-case-status',
    title: 'USCIS Case Status Online',
    agency: 'USCIS',
    category: 'USCIS_IMMIGRATION',
    url: 'https://egov.uscis.gov',
    badge: 'Receipt I-140 & I-485',
    description: 'Consulta do status em tempo real de petições I-140, I-485, I-765 e I-131 através do número de protocolo oficial (Receipt #).',
    isOfficialGov: true,
    criticalNote: 'Verificar status antes de despachar cheques de taxas complementares ou respostas de RFE/NOID.'
  },
  {
    id: 'uscis-processing-times',
    title: 'USCIS Historical Processing Times',
    agency: 'USCIS',
    category: 'USCIS_IMMIGRATION',
    url: 'https://egov.uscis.gov/processing-times',
    badge: 'Centros de Serviço',
    description: 'Estimativas de tempo de processamento por formulário e Service Center (Texas, Nebraska, Potomac, California).',
    isOfficialGov: true
  },
  {
    id: 'uscis-fee-calculator',
    title: 'USCIS Fee Calculator Oficial',
    agency: 'USCIS',
    category: 'USCIS_IMMIGRATION',
    url: 'https://www.uscis.gov/feecalculator',
    badge: 'Taxas & Form G-1055',
    description: 'Calculadora oficial das taxas vigentes do USCIS, incluindo Asylum Program Fee ($300/$600) e Premium Processing ($2,805).',
    isOfficialGov: true
  },
  {
    id: 'uscis-policy-manual',
    title: 'USCIS Policy Manual & Guia de Decisões',
    agency: 'USCIS',
    category: 'USCIS_IMMIGRATION',
    url: 'https://www.uscis.gov/policy-manual',
    badge: 'Jurisprudência',
    description: 'Diretrizes oficiais de adjudicação de benefícios imigratórios, requisitos de Ability to Pay e regras de manutenção de status.',
    isOfficialGov: true
  },
  {
    id: 'uscis-civil-surgeons',
    title: 'USCIS Civil Surgeons Locator — Exame I-693',
    agency: 'USCIS',
    category: 'USCIS_IMMIGRATION',
    url: 'https://my.uscis.gov/findadoctor',
    badge: 'Médicos Credenciados',
    description: 'Localizador oficial de médicos habilitados para realização de exame médico imigratório para o formulário I-693.',
    isOfficialGov: true,
    criticalNote: 'O envelope do exame I-693 deve permanecer estritamente lacrado até o envio com o pacote de AOS.'
  },

  // DOS
  {
    id: 'dos-visa-bulletin',
    title: 'Visa Bulletin Oficial — Departamento de Estado',
    agency: 'DOS',
    category: 'DOS_CONSULAR',
    url: 'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html',
    badge: 'Priority Dates EB-3',
    description: 'Boletim mensal contendo tabelas de Final Action Dates e Dates for Filing para acompanhamento de retrogresso e concorrência.',
    isOfficialGov: true,
    criticalNote: 'Consultar mensalmente para determinar se o cliente pode realizar Filing Concorrente de I-140 + I-485.'
  },
  {
    id: 'dos-ceac-portal',
    title: 'CEAC — Consular Electronic Application Center',
    agency: 'DOS',
    category: 'DOS_CONSULAR',
    url: 'https://ceac.state.gov',
    badge: 'NVC & DS-260',
    description: 'Portal para pagamento de taxas de visto de imigrante, submissão de DS-260 e envio de documentos civis ao NVC.',
    isOfficialGov: true
  },
  {
    id: 'dos-fam',
    title: 'Foreign Affairs Manual (FAM) — 9 FAM Immigrant Visas',
    agency: 'DOS',
    category: 'DOS_CONSULAR',
    url: 'https://fam.state.gov',
    badge: 'Regulamento Consular',
    description: 'Instruções oficiais de operação e interpretação jurídica para oficiais consulares dos EUA no exterior.',
    isOfficialGov: true
  },

  // CBP & Logistics
  {
    id: 'cbp-i94-portal',
    title: 'CBP I-94 — Registro Oficial de Entrada e Saída',
    agency: 'CBP',
    category: 'CBP_LOGISTICS',
    url: 'https://i94.cbp.dhs.gov',
    badge: 'Histórico de Viagens',
    description: 'Emissão eletrônica do formulário I-94 mais recente e histórico de admissões de estrangeiros nos portos de entrada dos EUA.',
    isOfficialGov: true
  },

  // SWA State Workforce Agencies
  {
    id: 'naswa-directory',
    title: 'NASWA — Diretório Nacional de Agências SWA',
    agency: 'SWA',
    category: 'SWA_STATE_WORKFORCE',
    url: 'https://www.naswa.org',
    badge: '50 Estados SWA',
    description: 'Associação nacional dos administradores estaduais das agências de desenvolvimento de força de trabalho dos 50 estados.',
    isOfficialGov: false
  },
  {
    id: 'employ-florida',
    title: 'Employ Florida — Florida Department of Commerce',
    agency: 'SWA',
    category: 'SWA_STATE_WORKFORCE',
    url: 'https://www.employflorida.com',
    badge: 'SWA Flórida (30 dias)',
    description: 'Portal oficial de submissão do Job Order obrigatório de 30 dias para processos de PERM com vagas baseadas na Flórida.',
    isOfficialGov: true,
    criticalNote: 'O Job Order deve rodar por no mínimo 30 dias corridos sem interrupção.'
  },
  {
    id: 'caljobs-california',
    title: 'CalJOBS — California Employment Development Dept (EDD)',
    agency: 'SWA',
    category: 'SWA_STATE_WORKFORCE',
    url: 'https://www.caljobs.ca.gov',
    badge: 'SWA Califórnia',
    description: 'Portal do estado da Califórnia para publicação de ordens de serviço e ordens estaduais de trabalho.',
    isOfficialGov: true
  },
  {
    id: 'work-in-texas',
    title: 'WorkInTexas — Texas Workforce Commission (TWC)',
    agency: 'SWA',
    category: 'SWA_STATE_WORKFORCE',
    url: 'https://www.workintexas.com',
    badge: 'SWA Texas',
    description: 'Sistema oficial do estado do Texas para registro e publicação de vagas de trabalho para o PERM.',
    isOfficialGov: true
  }
];
