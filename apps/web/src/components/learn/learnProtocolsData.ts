import { LearnItem } from './types.js';

export const LEARN_PROTOCOLS_AND_DOCS: LearnItem[] = [
  {
    id: 'proto-specimen-audit',
    category: 'DOCUMENT',
    code: 'TMEP-SPEC-904',
    title: 'Specimen of Use Compliance & Verification',
    subtitle: 'Padrões Oficiais de Prova de Uso Comercial no Comércio dos EUA',
    agency: 'USPTO',
    legalBasis: '15 U.S.C. § 1051 / TMEP § 904',
    summary: 'Auditoria rigorosa de evidências de circulação comercial antes do protocolo perante o USPTO. Estabelece a distinção estrita entre espécimes aceitáveis (rótulos físicos, embalagens estampadas, displays de ponto de venda, telas de e-commerce com botão de compra) e rejeições sumárias (mockups digitais, notas fiscais isoladas).',
    responsibleRoles: ['Docketing Specialist', 'Trademark Paralegal', 'Managing Attorney'],
    criticalRules: [
      'Para bens físicos (Classes 1-34): o espécime deve mostrar o mark fixado diretamente no produto, rótulo ou embalagem de varejo. Telas de websites devem conter o botão "Add to Cart / Comprar", preço e URL com data.',
      'Para serviços (Classes 35-45): o espécime deve exibir o mark associado diretamente à prestação dos serviços (ex: site comercial institucional, material publicitário com escopo da oferta).',
      'Mockups gerados em softwares de edição gráfica, renders conceituais e provas de gráfica (printer proofs) são expressamente rejeitados pelo Examining Attorney sob suspeita de falsidade.'
    ],
    submissionChecklist: [
      'Arquivo em formato JPG ou PDF com resolução nítida e sem adulterações digitais',
      'Captura completa de página de e-commerce contendo URL, data de captura e funcionalidade de compra ativa',
      'Declaração juramentada do cliente confirmando a autenticidade do uso comercial',
      'Conferência de correspondência idêntica com o mark drawing protocolado'
    ],
    officialUrl: 'https://www.uspto.gov/trademarks/apply/specimens',
    relatedPhaseId: 'node-teas-filing',
    relatedPhaseName: 'Fase 02 — Protocolo TEAS'
  },
  {
    id: 'proto-clearance-audit',
    category: 'PROTOCOL',
    code: 'CLEAR-2D-TESS',
    title: 'Trademark Clearance & Conflict Search Protocol',
    subtitle: 'Auditoria Federal e Common Law de Riscos de Colidência (§ 2d)',
    agency: 'USPTO',
    legalBasis: 'Lanham Act § 2(d) / In re E.I. DuPont de Nemours & Co.',
    summary: 'Protocolo analítico estruturado de busca em registros do USPTO (TESS), juntas comerciais estaduais, registros de domínios e comércio eletrônico para identificação de marcas idênticas ou semelhantes antes do dispêndio de taxas governamentais.',
    responsibleRoles: ['Trademark Analyst', 'Managing Attorney'],
    criticalRules: [
      'Avaliação trifásica dos fatores de DuPont: semelhança fonética, visual e semântico-conceitual entre os signos.',
      'Verificação de afinidade mercadológica e canais de distribuição: marcas idênticas em classes distintas podem colidir se os consumidores forem os mesmos.',
      'Parecer de clearance emitido formalmente pelo advogado antes do protocolo da petição no portal TEAS.'
    ],
    submissionChecklist: [
      'Relatório analítico TESS com todas as variações de radicais e fonéticas',
      'Varredura de marcas no estado da Flórida (SunBiz) e principais juntas estaduais',
      'Verificação de marcas não registradas (Common Law) no Google e marketplaces',
      'Parecer formal de risco (Baixo, Moderado, Alto) emitido para o cliente'
    ],
    officialUrl: 'https://www.uspto.gov/trademarks/search',
    relatedPhaseId: 'node-clearance',
    relatedPhaseName: 'Fase 01 — Busca Prévia & Clearance'
  },
  {
    id: 'proto-tma-deadline',
    category: 'PROTOCOL',
    code: 'TMA-3M-DEADLINE',
    title: 'TMA 3-Month Strict Deadline Docketing Protocol',
    subtitle: 'Controle Rígido de Termo Fatal sob o Trademark Modernization Act',
    agency: 'USPTO',
    legalBasis: 'Trademark Modernization Act of 2020 / 37 CFR § 2.62',
    summary: 'Diretriz operacional de docketing para controle do prazo encurtado de 3 meses corridos (reduzido de 6 meses) instituído pelo TMA para resposta a despachos de exame perante o USPTO.',
    responsibleRoles: ['Docketing Specialist', 'Managing Attorney'],
    criticalRules: [
      'Prazo fatal improrrogável de 3 meses a partir da data de expedição no TSDR.',
      'Se necessária prorrogação de 30 dias adicionais, a taxa de $125 deve ser protocolada impreterivelmente antes do término dos 3 meses.',
      'Fim de semana ou feriado federal transfere o vencimento para o próximo dia útil subsequente (37 CFR § 2.196).'
    ],
    submissionChecklist: [
      'Lançamento imediato da data no calendário de docketing (30 dias, 60 dias e 80 dias para alerta)',
      'Notificação preliminar ao cliente nos primeiros 10 dias do recebimento do despacho',
      'Draft da resposta finalizado e aprovado por Attorney com 15 dias de antecedência'
    ],
    officialUrl: 'https://www.uspto.gov/trademarks/laws/trademark-modernization-act',
    relatedPhaseId: 'node-examination',
    relatedPhaseName: 'Fase 03 — Exame & Office Actions'
  },
  {
    id: 'proto-sou-extension',
    category: 'PROTOCOL',
    code: 'ITU-NOA-6M',
    title: 'Notice of Allowance & SOU Extension Protocol',
    subtitle: 'Acompanhamento dos Ciclos de 6 Meses para Marcas Intent-to-Use',
    agency: 'USPTO',
    legalBasis: '15 U.S.C. § 1051(d) / TMEP § 1108',
    summary: 'Fluxo de gestão de prazos para pedidos de registro baseados em intenção de uso (§ 1b) após publicação na Gazette e recebimento do Notice of Allowance (NOA). Controla as 5 janelas sucessivas de extensão permitidas por lei.',
    responsibleRoles: ['Docketing Specialist', 'Case Manager'],
    criticalRules: [
      'O primeiro pedido de extensão (Ext 1) é automático mediante recolhimento da taxa oficial ($125/classe).',
      'Extensões 2 a 5 exigem declaração expressa de Good Cause (esforços contínuos de desenvolvimento de produto, pesquisa de mercado ou licenciamento).',
      'O teto absoluto de 36 meses da data do NOA não pode ser estendido sob nenhuma hipótese.'
    ],
    submissionChecklist: [
      'Calendário de 6 meses configurado a partir da data do NOA',
      'Check-in bimestral com o cliente sobre o cronograma de lançamento comercial',
      'Coleta tempestiva de evidências de Good Cause para extensões 2 em diante'
    ],
    officialUrl: 'https://www.uspto.gov/trademarks/apply/forms-intent-use-applications',
    relatedPhaseId: 'node-publication',
    relatedPhaseName: 'Fase 04 — Publicação & Oposição TTAB'
  },
  {
    id: 'proto-ttab-opposition',
    category: 'PROTOCOL',
    code: 'OG-TTAB-30D',
    title: 'Official Gazette Publication & TTAB 30-Day Watch',
    subtitle: 'Monitoramento da Janela Pública de Oposição no Tribunal Administrativo',
    agency: 'TTAB',
    legalBasis: '15 U.S.C. § 1063 / TBMP § 300',
    summary: 'Procedimento operacional que monitora a publicação de marcas deferidas na Official Gazette semanal (OG). Gerencia o prazo fatal de 30 dias para apresentação de Oposição formal ou pedidos de prorrogação de prazo perante o TTAB via ESTTA.',
    responsibleRoles: ['Docketing Specialist', 'Litigation Paralegal', 'Managing Attorney'],
    criticalRules: [
      'O prazo de 30 dias corre a partir da data de publicação oficial de terça-feira na Official Gazette.',
      'Terceiros podem protocolar prorrogação automática inicial de 30 dias, ou 90 dias com justificativa, via sistema ESTTA.',
      'Se nenhuma oposição for apresentada, o pedido avança para emissão de Certificado de Registro (§ 1a) ou Notice of Allowance (§ 1b).'
    ],
    submissionChecklist: [
      'Alerta de publicação na Official Gazette verificado com o cliente',
      'Auditoria semanal de marcas concorrentes publicadas com risco de colidência com o portfólio da firma',
      'Protocolo preventivo de Request for Extension of Time to Oppose (ESTTA) quando aplicável'
    ],
    officialUrl: 'https://www.uspto.gov/trademarks/ttab',
    relatedPhaseId: 'node-publication',
    relatedPhaseName: 'Fase 04 — Publicação & Oposição TTAB'
  },
  {
    id: 'proto-assignment-closing',
    category: 'DOCUMENT',
    code: 'CHAIN-TITLE-90D',
    title: 'Chain of Title & Security Interest Perfection',
    subtitle: 'Protocolo de Segurança Jurídica e Averbação Contratual em 3 Meses',
    agency: 'USPTO',
    legalBasis: '15 U.S.C. § 1060 / 37 CFR § 3.31',
    summary: 'Diretriz para auditoria e averbação tempestiva de contratos de cessão, garantias reais e alterações societárias junto ao USPTO para assegurar eficácia contra terceiros e resguardar a cadeia ininterrupta de titularidade (Chain of Title).',
    responsibleRoles: ['Corporate IP Paralegal', 'Managing Attorney'],
    criticalRules: [
      'Prazo crítico: o documento de cessão deve ser averbado no ETAS em até 3 meses da data de execução contratual.',
      'Cessões de marcas sob Intent-to-Use (§ 1b) sem o aviamento do negócio em andamento (Goodwill) acarretam invalidade do registro por Assignment in Gross.',
      'A averbação garante presunção legal de publicidade registral contra credores e adquirentes posteriores.'
    ],
    submissionChecklist: [
      'Contrato assinado com qualificação completa do Assignor e Assignee',
      'Cláusula expressa de cessão com todo o Goodwill comercial associado',
      'Certidão de Averbação emitida pelo ETAS arquivada no docketing'
    ],
    officialUrl: 'https://etas.uspto.gov/',
    relatedPhaseId: 'node-post-reg',
    relatedPhaseName: 'Fase 05 — Manutenção & Pós-Registro'
  }
];
