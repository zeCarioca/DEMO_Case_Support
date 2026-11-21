import { ScheduleItem } from '../../types.js';

export const TRANSLATIONS_DATA: ScheduleItem[] = [
  {
    id: 'tr-for-prio',
    code: 'PRIO-CERT',
    name: 'Certidão de Depósito / Prioridade Estrangeira (Convenção de Paris § 44d)',
    category: 'translations',
    defaultHours: 1.0,
    unit: 'por documento',
    notes: 'Certidão oficial emitida por escritório nacional (INPI, EUIPO, JPO) comprovando data e classes prioritárias.',
    variableRange: '1.0h - 1.5h',
    variants: [
      { id: 'digital-cert', label: 'Certidão Digital Oficial (INPI / EUIPO)', hours: 1.0 },
      { id: 'apostilled-cert', label: 'Com Apostilamento de Haia e Anotações', hours: 1.5 }
    ]
  },
  {
    id: 'tr-madrid',
    code: 'WIPO-MADRID',
    name: 'Certificados & Despachos do Protocolo de Madrid (WIPO)',
    category: 'translations',
    defaultHours: 1.2,
    unit: 'por certificado',
    notes: 'Extratos de registro internacional emitidos pelo Escritório Internacional de Genebra (OMPI/WIPO).',
    variableRange: '1.0h - 1.5h',
    variants: [
      { id: 'madrid-standard', label: 'Extrato Padrão WIPO', hours: 1.0 },
      { id: 'madrid-multi-office', label: 'Com Designações Múltiplas e Recusas Provisórias', hours: 1.5 }
    ]
  },
  {
    id: 'tr-specimen',
    code: 'SPECIMEN-TR',
    name: 'Tradução Certificada de Espécimes de Uso Comercial (Embalagens / UI)',
    category: 'translations',
    defaultHours: 0.8,
    unit: 'por espécime',
    notes: 'Rótulos, interfaces de software, telas de checkout e catálogos demonstrando a marca no comércio.',
    variableRange: '0.5h - 1.2h',
    variants: [
      { id: 'specimen-simple', label: 'Etiqueta / Rótulo de Produto Físico', hours: 0.5 },
      { id: 'specimen-software', label: 'Interface SaaS / E-commerce com Fluxo de Compra', hours: 0.8 },
      { id: 'specimen-dense', label: 'Manual Técnico / Catálogo com Múltiplas Páginas', hours: 1.2 }
    ]
  },
  {
    id: 'tr-corp-bylaws',
    code: 'CORP-BYLAWS',
    name: 'Contrato Social & Estatuto de Requerente Estrangeiro',
    category: 'translations',
    defaultHours: 1.5,
    unit: 'por página',
    notes: 'Comprovação de legitimidade societária, representação legal e domicílio comercial perante o USPTO.'
  },
  {
    id: 'tr-poa',
    code: 'POWER-ATTORNEY',
    name: 'Procuração & Autorização de Representante Jurídico nos EUA',
    category: 'translations',
    defaultHours: 0.5,
    unit: 'por instrumento',
    notes: 'Outorga formal para Sarah Jenkins, Esq. atuar como Attorney of Record perante o USPTO.'
  },
  {
    id: 'tr-pat-claims',
    code: 'PAT-CLAIMS',
    name: 'Reivindicações Técnicas & Relatório Descritivo de Patente',
    category: 'translations',
    defaultHours: 2.0,
    unit: 'por página',
    notes: 'Tradução técnica de alta precisão de pedidos de patente prioritários e desenhos de engenharia.'
  },
  {
    id: 'tr-assign',
    code: 'CHAIN-TITLE',
    name: 'Instrumentos de Cessão de Marcas & Cadeia de Titularidade (PTO-1595)',
    category: 'translations',
    defaultHours: 1.0,
    unit: 'por contrato',
    notes: 'Cessão de direitos de propriedade intelectual, fusões e acordos de transferência de ativos intangíveis.'
  },
  {
    id: 'tr-coexistence',
    code: 'COEXIST-AGR',
    name: 'Acordo de Coexistência de Marcas & Termo de Consentimento',
    category: 'translations',
    defaultHours: 1.5,
    unit: 'por instrumento',
    notes: 'Acordos celebrados entre partes para superação de recusa § 2(d) de confusão marcaria perante o Examinador.'
  }
];
