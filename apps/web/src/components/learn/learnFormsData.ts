import { LearnItem } from './types.js';

export const LEARN_FORMS: LearnItem[] = [
  {
    id: 'form-teas-plus',
    category: 'FORM',
    code: 'TEAS Plus',
    title: 'TEAS Plus Initial Application',
    subtitle: 'Petição Inicial de Registro de Marca com Descrições Pré-Aprovadas',
    agency: 'USPTO',
    legalBasis: '37 CFR § 2.22 / Lanham Act § 1(a), § 1(b)',
    summary: 'Formulário eletrônico oficial do USPTO para protocolo inicial de marca. Exige seleção de produtos e serviços estritamente a partir do ID Manual pré-aprovado, pagamento prévio de taxa reduzida ($250 por classe) e compromisso formal de recebimento de comunicações por e-mail.',
    responsibleRoles: ['Docketing Specialist', 'Trademark Paralegal', 'Managing Attorney'],
    criticalRules: [
      'Descrições de produtos e serviços devem ser selecionadas exclusivamente do USPTO ID Manual para manter o benefício tarifário reduzido ($250/classe).',
      'Declaração sob base § 1(a) exige data exata do primeiro uso comercial no comércio interestadual dos EUA e anexação de espécime verificado.',
      'Consentimento expresso obrigatório de endereço eletrônico corporativo válido para recebimento de despachos e exigências do Examining Attorney.'
    ],
    submissionChecklist: [
      'Identificação precisa do titular (entidade corporativa e jurisdição ou pessoa física)',
      'Desenho límpido do mark (Standard Character ou Special Form / Stylized)',
      'Classificação Nice correspondente e itens selecionados do ID Manual',
      'Espécime comercial em conformidade com TMEP § 904 (se base § 1a)',
      'Assinatura eletrônica na declaração verificada por representante legal ou procurador'
    ],
    officialUrl: 'https://www.uspto.gov/trademarks/apply',
    relatedPhaseId: 'node-teas-filing',
    relatedPhaseName: 'Fase 02 — Protocolo TEAS'
  },
  {
    id: 'form-teas-standard',
    category: 'FORM',
    code: 'TEAS Standard',
    title: 'TEAS Standard Application',
    subtitle: 'Petição Inicial com Descrições Customizadas ou Prioridade Internacional',
    agency: 'USPTO',
    legalBasis: '37 CFR § 2.23 / Lanham Act § 1, § 44(d), § 44(e)',
    summary: 'Formulário eletrônico flexível que permite redação personalizada de produtos e serviços (sem restrição ao vocabulário do ID Manual), bem como reivindicação de prioridade unionista estrangeira (§ 44d/44e). Taxa oficial de $350 por classe.',
    responsibleRoles: ['Docketing Specialist', 'Managing Attorney'],
    criticalRules: [
      'Reivindicação sob Convenção de Paris (§ 44d) deve ser protocolada em até 6 meses da data do primeiro depósito estrangeiro.',
      'Tradução juramentada para o inglês é obrigatória se o certificado de registro do país de origem estiver em idioma estrangeiro (§ 44e).',
      'Taxa governamental é de $350 por classe Nice, sem reembolso em caso de desistência ou recusa.'
    ],
    submissionChecklist: [
      'Minuta de especificação customizada revisada por Attorney',
      'Cópia autenticada do certificado de depósito ou registro estrangeiro',
      'Declaração formal de intenção de boa-fé de uso no comércio dos EUA (Bona Fide Intent)',
      'Comprovante de pagamento da taxa de $350 por classe'
    ],
    officialUrl: 'https://www.uspto.gov/trademarks/apply',
    relatedPhaseId: 'node-teas-filing',
    relatedPhaseName: 'Fase 02 — Protocolo TEAS'
  },
  {
    id: 'form-teas-roa',
    category: 'FORM',
    code: 'TEAS ROA',
    title: 'Response to Office Action',
    subtitle: 'Manifestação a Despachos e Exigências Substantivas do Examinador',
    agency: 'USPTO',
    legalBasis: '15 U.S.C. § 1062(b) / TMEP § 711 / TMA 2020',
    summary: 'Petição formal de resposta a despachos saneadores (Non-Final ou Final Office Actions) emitidos pelo Examining Attorney. Aborda defesas substantivas contra recusas sob Lanham Act § 2(d) (Likelihood of Confusion), disclaimers e substituição de espécimes rejeitados.',
    responsibleRoles: ['Managing Attorney', 'Docketing Specialist'],
    criticalRules: [
      'Prazo fatal de resposta é de estritamente 3 meses corridos a contar da data de emissão sob o Trademark Modernization Act (TMA 2020).',
      'Prorrogação única de 30 dias pode ser solicitada mediante pagamento de taxa governamental de $125 antes do termo fatal.',
      'A não apresentação de resposta tempestiva acarreta abandono sumário (Abandonment) irreversível do pedido de registro.'
    ],
    submissionChecklist: [
      'Mapeamento de cada objeção ou exigência formulada no despacho',
      'Memorial de defesa fático-jurídica fundamentado nos fatores de DuPont (TMEP § 1207.01)',
      'Declaração de disclaimer ou alteração de goods/services se exigido',
      'Espécime substituto acompanhado de declaração de uso se aplicável',
      'Protocolo via TEAS com protocolo TSDR arquivado na pasta do caso'
    ],
    officialUrl: 'https://www.uspto.gov/trademarks/maintain/responding-office-actions',
    relatedPhaseId: 'node-examination',
    relatedPhaseName: 'Fase 03 — Exame & Office Actions'
  },
  {
    id: 'form-teas-sou',
    category: 'FORM',
    code: 'TEAS SOU / Ext',
    title: 'Statement of Use & Request for Extension',
    subtitle: 'Declaração de Efetivo Uso ou Pedido de Prorrogação (Intent-to-Use)',
    agency: 'USPTO',
    legalBasis: '15 U.S.C. § 1051(d) / 37 CFR § 2.88, § 2.89',
    summary: 'Petição protocolada após a emissão do Notice of Allowance (NOA) para pedidos baseados em intenção de uso (§ 1b). Comprova que a marca entrou em circulação comercial efetiva ou requer extensão de prazo de 6 meses para completar a comercialização.',
    responsibleRoles: ['Docketing Specialist', 'Trademark Paralegal', 'Managing Attorney'],
    criticalRules: [
      'Prazo inicial de 6 meses improrrogáveis a contar da emissão do Notice of Allowance (NOA).',
      'Permite até 5 pedidos sucessivos de extensão de 6 meses (máximo total de 36 meses), exigindo justificativa plausível (Good Cause) a partir do segundo pedido.',
      'O SOU deve ser acompanhado de espécime autêntico para cada classe reivindicada e taxa de $100 por classe.'
    ],
    submissionChecklist: [
      'Datas de primeiro uso geral e primeiro uso no comércio interestadual comprovadas',
      'Espécime de uso para cada classe Nice em conformidade com TMEP § 904',
      'Declaração verificada do requerente quanto à veracidade do uso comercial',
      'Comprovante de pagamento de $100/classe para SOU ou $125/classe para extensão'
    ],
    officialUrl: 'https://www.uspto.gov/trademarks/apply/forms-intent-use-applications',
    relatedPhaseId: 'node-publication',
    relatedPhaseName: 'Fase 04 — Publicação & Oposição TTAB'
  },
  {
    id: 'form-section-8',
    category: 'FORM',
    code: 'Section 8',
    title: 'Section 8 Declaration of Continued Use',
    subtitle: 'Declaração Quinquenal Obrigatória de Continuidade de Uso Comercial',
    agency: 'USPTO',
    legalBasis: '15 U.S.C. § 1058 / 37 CFR § 2.161',
    summary: 'Declaração juramentada obrigatória que deve ser submetida entre o 5º e o 6º ano após a concessão do registro federal, comprovando que a marca continua em uso comercial ativo em todos os produtos e serviços especificados.',
    responsibleRoles: ['Docketing Specialist', 'Managing Attorney'],
    criticalRules: [
      'Janela legal de protocolo: exatamente entre o 5º e o 6º ano a contar da concessão do registro (período de tolerância de 6 meses com sobretaxa de $100).',
      'A omissão no protocolo da Seção 8 resulta no cancelamento automático definitivo do registro federal no banco de dados do USPTO.',
      'Produtos ou serviços que não estejam mais em uso comercial ativo devem ser voluntariamente deletados do registro para evitar falsidade ideológica.'
    ],
    submissionChecklist: [
      'Auditoria de catálogo: confirmação por escrito do cliente de uso ativo em cada classe',
      'Espécime comercial recente coletado para cada classe de registro',
      'Exclusão formal de itens descontinuados no formulário eletrônico',
      'Taxa oficial de $225 por classe paga via portal TEAS'
    ],
    officialUrl: 'https://www.uspto.gov/trademarks/maintain',
    relatedPhaseId: 'node-post-reg',
    relatedPhaseName: 'Fase 05 — Manutenção & Pós-Registro'
  },
  {
    id: 'form-section-15',
    category: 'FORM',
    code: 'Section 15',
    title: 'Section 15 Declaration of Incontestability',
    subtitle: 'Declaração de Incontestabilidade do Direito de Propriedade da Marca',
    agency: 'USPTO',
    legalBasis: '15 U.S.C. § 1065 / 37 CFR § 2.167',
    summary: 'Petição opcional de elevado valor estratégico que blinda o registro federal contra contestações de terceiros. Torna a marca incontestável quanto à distintividade, titularidade e validade após 5 anos ininterruptos de uso pós-registro.',
    responsibleRoles: ['Managing Attorney'],
    criticalRules: [
      'A marca deve estar no Principal Register e em uso contínuo por período de 5 anos consecutivos após o registro.',
      'Não pode haver decisão final adversa à titularidade ou validade do mark, nem litígio ou processo no TTAB pendente de julgamento.',
      'Frequentemente protocolada em petição combinada (§ 8 & § 15) no 5º ano para otimização de taxas e prazos.'
    ],
    submissionChecklist: [
      'Certificação de ausência de litígios pendentes perante tribunais federais ou TTAB',
      'Declaração atestando uso ininterrupto durante o período quinquenal',
      'Pagamento da taxa oficial governamental de $200 por classe'
    ],
    officialUrl: 'https://www.uspto.gov/trademarks/maintain',
    relatedPhaseId: 'node-post-reg',
    relatedPhaseName: 'Fase 05 — Manutenção & Pós-Registro'
  },
  {
    id: 'form-section-9',
    category: 'FORM',
    code: 'Section 9',
    title: 'Section 9 Trademark Renewal Application',
    subtitle: 'Renovação Decenal Periódica do Registro Federal de Marca',
    agency: 'USPTO',
    legalBasis: '15 U.S.C. § 1059 / 37 CFR § 2.181',
    summary: 'Petição decenal de renovação da vigência do registro federal. Protocolada conjuntamente com a Declaração da Seção 8 a cada 10 anos contados da data de registro original, estendendo a proteção por mais 10 anos sucessivos.',
    responsibleRoles: ['Docketing Specialist', 'Managing Attorney'],
    criticalRules: [
      'Janela de protocolo: durante o último ano de cada período decenal (ex: entre os anos 9 e 10, 19 e 20).',
      'Período de graça (Grace Period) de 6 meses concedido com multa de $100 por classe.',
      'Garante renovação indefinida da proteção marcaria enquanto perdurar o uso comercial legítimo.'
    ],
    submissionChecklist: [
      'Protocolo combinado Seção 8 & Seção 9 via formulário eletrônico TEAS',
      'Espécime em vigor anexado para comprovação do uso contínuo',
      'Recolhimento das taxas combinadas ($225 de Sec 8 + $300 de Sec 9 por classe)'
    ],
    officialUrl: 'https://www.uspto.gov/trademarks/maintain',
    relatedPhaseId: 'node-post-reg',
    relatedPhaseName: 'Fase 05 — Manutenção & Pós-Registro'
  },
  {
    id: 'form-pto-1595',
    category: 'FORM',
    code: 'PTO-1595',
    title: 'Recordation Cover Sheet (ETAS Assignment)',
    subtitle: 'Averbação Eletrônica de Cessão, Transferência de Titularidade ou Gravame',
    agency: 'USPTO',
    legalBasis: '15 U.S.C. § 1060 / 37 CFR Part 3',
    summary: 'Formulário de averbação eletrônica perante a Assignment Recordation Branch do USPTO (portal ETAS). Registra formalmente transferências de titularidade, fusões e aquisições, alterações de denominação social e ônus ou gravames financeiros.',
    responsibleRoles: ['Docketing Specialist', 'Corporate IP Paralegal'],
    criticalRules: [
      'Deve ser averbado no prazo máximo de 3 meses da data de celebração do contrato de cessão ou antes de qualquer transferência subsequente para surtir efeito contra terceiros de boa-fé (Bona Fide Purchaser Rule).',
      'A cessão de marcas com intenção de uso (§ 1b) antes do arquivamento do SOU é nula por lei, salvo se transferida conjuntamente com a integralidade do negócio operacional ao qual se destina.',
      'Contrato de cessão deve obrigatoriamente incluir a transferência expressa do aviamento comercial associado (Goodwill of the Business).'
    ],
    submissionChecklist: [
      'Contrato de cessão (Assignment Agreement) assinado pelo cedente (Assignor) e cessionário (Assignee)',
      'Cláusula expressa de transferência de Goodwill',
      'Identificação precisa de todos os números de registro ou número de processo serial afetados',
      'Taxa de averbação recolhida ($40 para o primeiro mark, $25 para adicionais)'
    ],
    officialUrl: 'https://etas.uspto.gov/',
    relatedPhaseId: 'node-post-reg',
    relatedPhaseName: 'Fase 05 — Manutenção & Pós-Registro'
  }
];
