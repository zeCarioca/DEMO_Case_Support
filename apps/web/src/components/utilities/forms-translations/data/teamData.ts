import { TeamMember } from '../../types.js';

export const FORMS_TRANSLATIONS_TEAM: TeamMember[] = [
  { name: 'Sarah Jenkins, Esq.', role: 'Managing Partner & Lead IP Counsel', isLeader: true },
  { name: 'Marcus Vance', role: 'Senior IP Docketing Specialist' },
  { name: 'Elena Rostova', role: 'Madrid Protocol & Foreign Filing Paralegal' },
  { name: 'Chloe Bennett', role: 'Trademark Clearance Analyst' },
  { name: 'David Park', role: 'Patent & Technical Translation Specialist' },
  { name: 'Sofia Alencar', role: 'Specimen Compliance Specialist' }
];

export const SOP_RULES = [
  {
    title: 'Auditoria Prévia de Espécimes de Uso',
    text: 'Inspecionar espécimes comerciais garantindo conexão direta com o produto ou serviço (etiquetas, embalagens ou e-commerce com carrinho de compra).'
  },
  {
    title: 'Janela Estatutária da Convenção de Paris (§ 44d)',
    text: 'Reivindicações de prioridade estrangeira devem ser protocoladas dentro de exatos 6 meses da data do primeiro depósito no país de origem.'
  },
  {
    title: 'Certificação de Tradução do Protocolo de Madrid',
    text: 'Traduções de certidões e despachos emitidos pelo WIPO ou escritórios nacionais estrangeiros devem conter declaração juramentada do tradutor.'
  },
  {
    title: 'Controle de Prazos de Office Action (TMA)',
    text: 'Prazos de resposta a despachos perante o USPTO são de 3 meses. Registrar alerta para eventual pedido de prorrogação de 3 meses suplementares.'
  },
  {
    title: 'Cálculo por Classe Internacional (Nice 001-045)',
    text: 'Considerar que as horas operacionais e as taxas oficiais do USPTO são calculadas e recolhidas individualmente por classe de produtos e serviços.'
  },
  {
    title: 'Protocolo de Duplo Docketing e Prevenção de Conflitos',
    text: 'Após cadastrar prazos fatais no sistema, verificar o espelho na base de dados para garantir ausência de sobreposição ou erro de cômputo.'
  }
];
