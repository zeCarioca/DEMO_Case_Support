import { ScheduleItem } from '../../types.js';

export const FOIA_SPECIAL_DATA: ScheduleItem[] = [
  {
    id: 'spec-clearance-comp',
    code: 'CLEARANCE-FULL',
    name: 'Relatório Completo de Anterioridade & Risco de Conflito (§ 2d)',
    category: 'foia_special',
    defaultHours: 2.0,
    unit: 'por marca',
    notes: 'Varredura completa TESS, registros estaduais, marcas de direito comum (common law) e parecer jurídico de registrabilidade.'
  },
  {
    id: 'spec-specimen-audit',
    code: 'SPECIMEN-AUDIT',
    name: 'Auditoria de Conformidade de Espécime Comercial & Ponto de Venda',
    category: 'foia_special',
    defaultHours: 0.5,
    unit: 'por classe',
    notes: 'Verificação técnica de telas de checkout, rótulos e etiquetas conforme o TMEP § 904 para prevenir recusas sumárias.'
  },
  {
    id: 'spec-ttab-extension',
    code: 'TTAB-EXT',
    name: 'Pedido de Prorrogação de Prazo para Oposição perante o TTAB (30/60d)',
    category: 'foia_special',
    defaultHours: 0.5,
    unit: 'por requerimento',
    notes: 'Extensão tempestiva de prazo perante o Trademark Trial and Appeal Board para negociação de coexistência.'
  },
  {
    id: 'spec-poa-revocation',
    code: 'APPOINT-ATTORNEY',
    name: 'Substituição de Procurador & Atualização de Correspondência USPTO',
    category: 'foia_special',
    defaultHours: 0.3,
    unit: 'por processo',
    notes: 'Designação formal de Sarah Jenkins, Esq. e cadastro de dados corporativos da Apex IP & Tech Law Group no TSDR.'
  }
];
