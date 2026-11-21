import { LearnItem } from './types.js';

export const LEARN_PROTOCOLS_AND_DOCS: LearnItem[] = [
  // --- PROTOCOLS ---
  {
    id: 'proto-swa-job-order',
    category: 'PROTOCOL',
    code: 'SWA-JO-30D',
    title: 'State Workforce Agency (SWA) Job Order Protocol',
    subtitle: 'Protocolo de Vaga Estadual Obrigatória por 30 Dias',
    agency: 'STATE_SWA',
    legalBasis: '20 CFR § 656.17(e)(1)(i)(A)',
    summary: 'Abertura de ordem de trabalho junto ao sistema de empregos estadual (ex: Employ Florida / SWA) que deve permanecer aberta e ativa por no mínimo 30 dias corridos antes do protocolo do PERM.',
    responsibleRoles: ['Case Support', 'Case Manager'],
    criticalRules: [
      'A ordem deve permanecer ativa por no mínimo 30 dias contínuos; 29 dias resulta em negação sumária pelo DOL.',
      'A postagem deve ocorrer entre 30 e 180 dias antes do envio do ETA-9089 no FLAG.'
    ],
    submissionChecklist: [
      'Cadastrar a vaga com título e descrição idênticos ao ETA-9141',
      'Salvar print da data de abertura no Compliance File',
      'Salvar print da data de encerramento após 30 dias comprovando o período contínuo'
    ],
    relatedPhaseId: 'node-recruitment',
    relatedPhaseName: 'Fase 03 — Recrutamento & Conformidade'
  },
  {
    id: 'proto-sunday-ads',
    category: 'PROTOCOL',
    code: 'RECRUIT-SUN-ADS',
    title: 'Sunday Newspaper Ads Protocol',
    subtitle: 'Anúncios em 2 Domingos em Jornal de Grande Circulação',
    agency: 'DOL',
    legalBasis: '20 CFR § 656.17(e)(1)(i)(B)',
    summary: 'Veiculação de 2 anúncios impressos em edições dominicais consecutivas em jornal de circulação geral na área pretendida de emprego, testando o mercado local de trabalhadores.',
    responsibleRoles: ['Case Support', 'Finance', 'Case Manager'],
    criticalRules: [
      'Os anúncios devem ser publicados estritamente em edições de DOMINGO.',
      'Obrigatório arquivar as Tear Sheets completas (página inteira do jornal com nome do periódico e data visíveis).'
    ],
    submissionChecklist: [
      'Cotação prévia e aprovação de custos com a Finance',
      'Texto do anúncio revisado e aprovado pelo Case Manager',
      'Coleta das 2 páginas inteiras originais (Tear Sheets)',
      'Todos os currículos recebidos arquivados com justificativa lícita de rejeição'
    ],
    relatedPhaseId: 'node-recruitment',
    relatedPhaseName: 'Fase 03 — Recrutamento & Conformidade'
  },
  {
    id: 'proto-quiet-period',
    category: 'PROTOCOL',
    code: 'PERM-QUIET-30D',
    title: 'Mandatory Quiet Period Protocol',
    subtitle: 'Período Regulamentar de Silêncio de 30 Dias',
    agency: 'DOL',
    legalBasis: '20 CFR § 656.17(e)',
    summary: 'Janela obrigatória de 30 dias corridos após o término da última ação de recrutamento durante a qual nenhuma nova ação ocorre e os currículos ainda podem ser recebidos antes do protocolo do ETA-9089.',
    responsibleRoles: ['Case Manager', 'Legal'],
    criticalRules: [
      'Submeter o ETA-9089 antes de cumpridos os 30 dias de Quiet Period gera rejeição imediata da certificação laboral pelo DOL.',
      'Utilize a Calculadora PERM da intranet para auditar as datas limites exatas.'
    ],
    submissionChecklist: [
      'Identificar a data de conclusão da última ação de recrutamento',
      'Adicionar 30 dias corridos para encontrar a data mais precoce de filing',
      'Verificar se a data mais tardia de filing não excede 180 dias da primeira ação'
    ],
    relatedPhaseId: 'node-recruitment',
    relatedPhaseName: 'Fase 03 — Recrutamento & Conformidade'
  },
  {
    id: 'proto-rfe-roadmap',
    category: 'PROTOCOL',
    code: 'RFE-ROADMAP',
    title: 'RFI / RFE Emergency Roadmap Protocol',
    subtitle: 'Procedimento Imediato de Resposta a Auditorias e Notificações',
    agency: 'INTERNAL',
    legalBasis: '20 CFR § 656.20 / 8 CFR § 103.2(b)(8)',
    summary: 'Procedimento prioritário acionado no mesmo dia em que o escritório recebe um pedido de informações (RFI DOL) ou pedido de evidências (RFE USCIS) para formulação da estratégia jurídica.',
    responsibleRoles: ['Legal (Roadmap)', 'Case Support', 'Case Manager'],
    criticalRules: [
      'Solicitar ROADMAP a Sarah Jenkins, Esq. no mesmo dia do recebimento da notificação oficial.',
      'Prazos do USCIS e DOL são peremptórios e fatais; não há extensão de prazo.'
    ],
    submissionChecklist: [
      'Registrar data oficial de recebimento e prazo fatal na pasta do caso',
      'Compartilhar roadmap estratégico com o cliente e sponsor',
      'Reunir documentação suplementar requisitada',
      'Aprovação formal da resposta pelo advogado e protocolo da petição'
    ],
    relatedPhaseId: 'node-rfe',
    relatedPhaseName: 'Subprocesso — Auditoria / RFI / RFE'
  },

  // --- DOCUMENTS ---
  {
    id: 'doc-ability-to-pay',
    category: 'DOCUMENT',
    code: 'DOC-ATP-TAX',
    title: 'Employer Tax Returns & Ability to Pay Proofs',
    subtitle: 'Comprovações Contábeis da Capacidade de Pagamento',
    agency: 'IRS',
    legalBasis: '8 CFR § 204.5(g)(2)',
    summary: 'Declarações anuais de imposto de renda da empresa (Form 1120, 1120-S ou 1065) comprovando que a renda líquida ou ativos circulantes líquidos são iguais ou superiores ao salário oferecido na PWD.',
    responsibleRoles: ['Case Support', 'Case Manager'],
    criticalRules: [
      'O empregador deve comprovar capacidade financeira contínua desde a Priority Date até a emissão do Green Card.',
      'Se o beneficiário já trabalha para a empresa com autorização, contracheques e W-2 podem complementar a comprovação.'
    ],
    submissionChecklist: [
      'Cópia completa e assinada do Income Tax Return do ano fiscal mais recente',
      'Cálculo do Net Income e Net Current Assets realizado',
      'Utility Bill recente comprovando atividade regular no mesmo endereço'
    ],
    relatedPhaseId: 'node-i140',
    relatedPhaseName: 'Fase 05 — Petição I-140 (USCIS)'
  },
  {
    id: 'doc-experience-letters',
    category: 'DOCUMENT',
    code: 'DOC-EXP-LETTERS',
    title: 'Beneficiary Experience Letters',
    subtitle: 'Cartas de Comprovação de Experiência Prévia',
    agency: 'USCIS',
    legalBasis: '8 CFR § 204.5(l)(3)',
    summary: 'Cartas formais emitidas por empregadores anteriores em papel timbrado atestando que o trabalhador cumpriu o tempo e atribuições exigidos na vaga antes da contratação pelo patrocinador.',
    responsibleRoles: ['Case Support', 'Intake', 'Case Manager'],
    criticalRules: [
      'A experiência NÃO pode ter sido adquirida no próprio patrocinador na mesma posição do PERM.',
      'A carta deve detalhar nome completo, cargo, atribuições específicas, regime de dedicação e datas exatas de início e fim.'
    ],
    submissionChecklist: [
      'Papel timbrado oficial da empresa emissora com assinatura e contato do supervisor',
      'Descrição das atribuições confere com os requisitos do ETA-9141',
      'Tradução juramentada completa se a carta original estiver em português ou espanhol'
    ],
    relatedPhaseId: 'node-intake',
    relatedPhaseName: 'Fase 01 — Triagem Inicial & Abertura'
  },
  {
    id: 'doc-sunbiz-certificate',
    category: 'DOCUMENT',
    code: 'DOC-SUNBIZ-FL',
    title: 'SunBiz Florida Certificate & Articles of Incorporation',
    subtitle: 'Comprovante Societário de Regularidade Estadual',
    agency: 'STATE_SWA',
    summary: 'Certidão societária obtida junto à Florida Division of Corporations comprovando que a empresa patrocinadora está ativa, regular e autorizada a operar no estado da Flórida.',
    responsibleRoles: ['Intake', 'Case Support'],
    criticalRules: [
      'A razão social e o endereço físico devem coincidir perfeitamente com os informados no FLAG e nos formulários do USCIS.',
      'O status da corporação deve estar "ACTIVE" no momento de cada submissão.'
    ],
    submissionChecklist: [
      'Consulta ao portal SunBiz realizada',
      'Articles of Incorporation e Annual Report mais recente baixados',
      'Documento anexado à pasta da empresa no Google Drive e arquivo do caso'
    ],
    officialUrl: 'https://search.sunbiz.org/',
    relatedPhaseId: 'node-intake',
    relatedPhaseName: 'Fase 01 — Triagem Inicial & Abertura'
  }
];
