import { ScheduleItem } from '../../types.js';

export const FORMS_DATA: ScheduleItem[] = [
  {
    id: 'form-teas-plus',
    code: 'TEAS-PLUS',
    name: 'Pedido Eletrônico Inicial TEAS Plus (Classes Nice Padronizadas)',
    category: 'forms',
    defaultHours: 1.0,
    unit: 'por classe',
    notes: 'Requer enquadramento estrito nos termos pré-aprovados do USPTO ID Manual com taxa governamental reduzida.',
    variableRange: '1.0h - 1.5h',
    variants: [
      { id: 'teas-mono', label: 'Classe Única (ex: Class 009)', hours: 1.0 },
      { id: 'teas-multi', label: 'Multiclasse (ex: Classes 009 e 042 SaaS)', hours: 1.5 }
    ]
  },
  {
    id: 'form-teas-std',
    code: 'TEAS-STD',
    name: 'Pedido Eletrônico Inicial TEAS Standard (Descrição Livre de Produtos)',
    category: 'forms',
    defaultHours: 1.5,
    unit: 'por classe',
    notes: 'Permite descrições customizadas de produtos e serviços não catalogados no ID Manual.',
    variableRange: '1.5h - 2.0h',
    variants: [
      { id: 'teas-std-mono', label: 'Classe Única com Especificação Customizada', hours: 1.5 },
      { id: 'teas-std-multi', label: 'Multiclasse com Especificação Ampla', hours: 2.0 }
    ]
  },
  {
    id: 'form-teas-oa',
    code: 'TEAS-OA',
    name: 'Resposta Formal a Despacho do Examinador (Office Action Response)',
    category: 'forms',
    defaultHours: 2.0,
    unit: 'por despacho',
    notes: 'Elaboração de memorial de resposta, superação de recusas § 2(d) ou disclaimers e aditamentos de especificação.',
    variableRange: '1.5h - 3.0h',
    variants: [
      { id: 'oa-procedural', label: 'Despacho Procedimental (Disclaimer / Emenda de Classe)', hours: 1.5 },
      { id: 'oa-substantive', label: 'Despacho Substantivo (§ 2(d) Conflito / § 2(e) Descritividade)', hours: 3.0 }
    ]
  },
  {
    id: 'form-teas-sou',
    code: 'TEAS-SOU',
    name: 'Declaração de Uso Efetivo no Comércio (Statement of Use - SOU)',
    category: 'forms',
    defaultHours: 1.0,
    unit: 'por classe',
    notes: 'Conversão de pedido Intent-to-Use (§ 1b) em registro mediante validação de espécimes comerciais e datas de primeiro uso.',
    variableRange: '1.0h - 1.5h',
    variants: [
      { id: 'sou-standard', label: 'Espécime Regular Aprovado', hours: 1.0 },
      { id: 'sou-complex', label: 'Espécime Digital com Auditoria de URL de Compra', hours: 1.5 }
    ]
  },
  {
    id: 'form-teas-ext',
    code: 'TEAS-EXT',
    name: 'Pedido de Prorrogação de 6 Meses para Apresentar SOU',
    category: 'forms',
    defaultHours: 0.5,
    unit: 'por pedido',
    notes: 'Prorrogação semestral do prazo fatal após emissão da Notice of Allowance (limite de até 5 prorrogações / 36 meses).'
  },
  {
    id: 'form-teas-sec8',
    code: 'TEAS-SEC8',
    name: 'Declaração de Uso Continuado de Marca (Section 8 Declaration)',
    category: 'forms',
    defaultHours: 1.0,
    unit: 'por registro',
    notes: 'Protocolada obrigatoriamente entre o 5º e o 6º ano após a concessão do registro perante o USPTO.'
  },
  {
    id: 'form-teas-sec15',
    code: 'TEAS-SEC15',
    name: 'Declaração de Incontestabilidade de Marca (Section 15 Declaration)',
    category: 'forms',
    defaultHours: 0.8,
    unit: 'por registro',
    notes: 'Garante imunidade jurídica contra a maioria das alegações de anulabilidade de marca registrada após 5 anos de uso contínuo.'
  },
  {
    id: 'form-teas-sec9',
    code: 'TEAS-SEC9',
    name: 'Renovação Decenal de Registro de Marca (Section 9 Renewal)',
    category: 'forms',
    defaultHours: 1.0,
    unit: 'por classe',
    notes: 'Renovação decenal do registro com recolhimento de taxas estatutárias e espécime atualizado.'
  },
  {
    id: 'form-wipo-mm2',
    code: 'WIPO-MM2',
    name: 'Requerimento de Registro Internacional de Marca (Protocolo de Madrid)',
    category: 'forms',
    defaultHours: 2.0,
    unit: 'por pedido',
    notes: 'Depósito internacional via USPTO e OMPI/WIPO com designação de jurisdições contratantes estrangeiras.'
  },
  {
    id: 'form-pto-1595',
    code: 'PTO-1595',
    name: 'Averbação de Transferência e Cessão de Marcas (Recordation Cover Sheet)',
    category: 'forms',
    defaultHours: 0.8,
    unit: 'por instrumento',
    notes: 'Registro formal de mudança de titularidade na base de dados Assignment do USPTO.'
  }
];
