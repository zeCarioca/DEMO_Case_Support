import { LearnItem } from './types.js';

export const LEARN_FORMS: LearnItem[] = [
  {
    id: 'form-eta-9141',
    category: 'FORM',
    code: 'ETA-9141',
    title: 'Application for Prevailing Wage Determination',
    subtitle: 'Determinação Salarial Prévia pelo DOL (NPWC)',
    agency: 'DOL',
    legalBasis: '20 CFR § 656.40',
    summary: 'Formulário eletrônico submetido ao National Prevailing Wage Center (NPWC) via portal FLAG. Estabelece o salário mínimo legal obrigatório que o empregador deve se comprometer a pagar ao trabalhador estrangeiro.',
    responsibleRoles: ['Case Support', 'Case Manager', 'Legal'],
    criticalRules: [
      'Nunca selecionar um código SOC/O*NET apenas pelo menor piso salarial; a ocupação deve refletir estritamente as tarefas reais.',
      'Requer conferência prévia e validação jurídica (Sarah Jenkins, Esq.) antes de submeter no FLAG.',
      'A assinatura do patrocinador (sponsor) na FIA deve ser arquivada na pasta do caso.'
    ],
    submissionChecklist: [
      'Job description detalhada e requisitos mínimos definidos',
      'Código SOC/O*NET e nível salarial validados',
      'Endereço de trabalho confirmado com SunBiz e Utility Bill',
      'Rascunho revisado pelo Case Manager e aprovado pelo Legal',
      'Número de protocolo (P-xxx) registrado no arquivo do caso'
    ],
    officialUrl: 'https://flag.dol.gov/',
    relatedPhaseId: 'node-pwd',
    relatedPhaseName: 'Fase 02 — Prevailing Wage (ETA-9141)'
  },
  {
    id: 'form-eta-9089',
    category: 'FORM',
    code: 'ETA-9089',
    title: 'Application for Permanent Employment Certification',
    subtitle: 'Certificação de Trabalho Permanente no DOL',
    agency: 'DOL',
    legalBasis: '20 CFR § 656.17',
    summary: 'Aplicação formal de certificação laboral demonstrando que não há trabalhadores americanos qualificados, dispostos e disponíveis para a posição após o recrutamento obrigatório.',
    responsibleRoles: ['Case Support', 'Case Manager', 'Legal'],
    criticalRules: [
      'Consistência absoluta: descrição da vaga e requisitos no ETA-9089 devem coincidir 100% com o ETA-9141 e os anúncios veiculados.',
      'A certificação PERM tem validade estrita e improrrogável de 180 dias corridos após a aprovação para protocolo do I-140.',
      'O Appendix oficial deve conter assinaturas originais de Sarah Jenkins, Esq., do Sponsor e do Beneficiário.'
    ],
    submissionChecklist: [
      'Compliance File completo com cópias de todos os anúncios e Job Order',
      'Quiet Period de 30 dias após a última ação de recrutamento cumprido',
      'Prevailing Wage ainda válida na data do protocolo',
      'Formulário preenchido e revisado no portal FLAG',
      'Assinaturas FIA coletadas e anexadas'
    ],
    officialUrl: 'https://flag.dol.gov/',
    relatedPhaseId: 'node-eta9089',
    relatedPhaseName: 'Fase 04 — Protocolo ETA-9089 (FLAG)'
  },
  {
    id: 'form-i-140',
    category: 'FORM',
    code: 'Form I-140',
    title: 'Immigrant Petition for Alien Workers',
    subtitle: 'Petição de Imigrante para Trabalhador Estrangeiro no USCIS',
    agency: 'USCIS',
    legalBasis: '8 CFR § 204.5 / INA § 203(b)(3)',
    summary: 'Petição principal protocolada junto ao USCIS onde o empregador patrocina o visto de imigrante permanente para o beneficiário (EB-3 Skilled Worker, Professional ou Other Workers).',
    responsibleRoles: ['Case Support', 'Case Manager', 'Legal', 'Finance'],
    criticalRules: [
      'Obrigatório protocolar dentro dos 180 dias de validade da certificação PERM emitida pelo DOL.',
      'Comprovar rigorosamente a Ability to Pay da empresa através dos Tax Returns mais recentes e W-2.',
      'Protocolar formalmente com as vias originais assinadas e comprovação de entrega.'
    ],
    submissionChecklist: [
      'Formulário I-140 e G-28 assinados em caneta preta',
      'Certificação PERM original assinada por todas as partes',
      'Comprovante de Ability to Pay (Income Tax Return e Utility Bill)',
      'Cartas de experiência do beneficiário no formato padrão USCIS',
      'Cheques de taxas solicitados à Finance (Terça/Quinta)',
      'Cover Letter elaborada e aprovada por Sarah Jenkins, Esq.'
    ],
    officialUrl: 'https://www.uscis.gov/i-140',
    relatedPhaseId: 'node-i140',
    relatedPhaseName: 'Fase 05 — Petição I-140 (USCIS)'
  },
  {
    id: 'form-i-485',
    category: 'FORM',
    code: 'Form I-485',
    title: 'Application to Register Permanent Residence or Adjust Status',
    subtitle: 'Ajuste de Status para Concessão do Green Card',
    agency: 'USCIS',
    legalBasis: '8 CFR § 245 / INA § 245',
    summary: 'Pedido final de residência permanente (Green Card) para o trabalhador estrangeiro e seus dependentes que mantêm presença física legal contínua nos Estados Unidos.',
    responsibleRoles: ['Case Support', 'Case Manager', 'Legal'],
    criticalRules: [
      'A Priority Date do caso deve estar vigente na tabela oficial de Filing Dates do Visa Bulletin do Departamento de Estado.',
      'O envelope do exame médico I-693 NÃO pode, sob nenhuma hipótese, ser aberto pela equipe ou pelo cliente.',
      'Sem lacunas de tempo nos históricos de endereços e empregos dos últimos 5 anos.'
    ],
    submissionChecklist: [
      'Formulário I-485 e Supplement J devidamente assinados',
      'Envelope do exame I-693 LACRADO emitido por médico credenciado (Civil Surgeon)',
      'Certidões civis com tradução juramentada (nascimento, casamento)',
      'Formulários derivados para dependentes (cônjuge e filhos menores)',
      'Taxas do USCIS emitidas por cheque'
    ],
    officialUrl: 'https://www.uscis.gov/i-485',
    relatedPhaseId: 'node-aos',
    relatedPhaseName: 'Fase 06 — Ajuste de Status / Green Card (I-485)'
  },
  {
    id: 'form-i-765',
    category: 'FORM',
    code: 'Form I-765',
    title: 'Application for Employment Authorization (EAD)',
    subtitle: 'Autorização de Trabalho para Solicitantes de Ajuste de Status',
    agency: 'USCIS',
    legalBasis: '8 CFR § 274a.12(c)(9) / INA § 274A',
    summary: 'Pedido formal de autorização de trabalho temporária (EAD) protocolado simultaneamente ou subsequente ao Formulário I-485 com base em ajuste de status pendente (categoria (c)(9)). Permite ao beneficiário principal e aos seus dependentes trabalharem legalmente nos Estados Unidos enquanto o Green Card é processado.',
    responsibleRoles: ['Case Support', 'Case Manager', 'Legal'],
    criticalRules: [
      'A categoria de elegibilidade sob I-485 pendente deve ser indicada obrigatoriamente como (c)(9) no campo Part 2 do formulário.',
      'Anexar 2 fotografias recentes padrão passaporte americano (2x2 polegadas) em fundo branco com identificação a lápis no verso.',
      'Se protocolado separadamente do I-485, é indispensável anexar a cópia do Recibo I-797C do I-485 pendente como prova de base legal.',
      'O protocolo do I-765 não substitui nem prorroga automaticamente vistos temporários (ex: F-1, H-1B, B-2) até a concessão efetiva do cartão EAD.'
    ],
    submissionChecklist: [
      'Formulário I-765 preenchido na versão vigente e assinado em caneta preta',
      'Código de categoria de elegibilidade preenchido como (c)(9)',
      '2 fotografias estilo passaporte (2x2) em saquinho transparente identificado',
      'Cópia da página biográfica do passaporte vigente e carimbo de admissão / I-94',
      'Cópia do I-797C Notice of Action do I-485 (se não protocolado em pacote concorrente)',
      'Cheque de taxa nominal ao U.S. Department of Homeland Security conferido com a Finance'
    ],
    officialUrl: 'https://www.uscis.gov/i-765',
    relatedPhaseId: 'node-aos',
    relatedPhaseName: 'Fase 06 — Ajuste de Status / Green Card (I-485)'
  },
  {
    id: 'form-g-28',
    category: 'FORM',
    code: 'Form G-28',
    title: 'Notice of Entry of Appearance as Attorney or Accredited Representative',
    subtitle: 'Procuração de Representação Jurídica de Sarah Jenkins, Esq.',
    agency: 'USCIS',
    legalBasis: '8 CFR § 292.4',
    summary: 'Documento legal obrigatório que autoriza Sarah Jenkins, Esq. e a Apex IP & Tech Law a representarem formalmente o requerente perante o USPTO, USCIS e DHS.',
    responsibleRoles: ['Case Support', 'Legal'],
    criticalRules: [
      'Devem ser preenchidos dois formulários G-28 separados: um para o Sponsor (empregador) e outro para o Beneficiário.',
      'Exige assinatura do advogado responsável (Sarah Jenkins, Esq., NY BAR 1234567).'
    ],
    submissionChecklist: [
      'Dados de inscrição de Sarah Jenkins, Esq. na New York Bar conferidos',
      'Assinatura do representante legal do empregador',
      'Assinatura do beneficiário principal e dependentes'
    ],
    officialUrl: 'https://www.uscis.gov/g-28',
    relatedPhaseId: 'node-i140',
    relatedPhaseName: 'Fase 05 — Petição I-140 (USCIS)'
  },
  {
    id: 'form-i-693',
    category: 'FORM',
    code: 'Form I-693',
    title: 'Report of Immigration Medical Examination and Vaccination Record',
    subtitle: 'Exame Médico Imigratório e Registro de Vacinas',
    agency: 'USCIS',
    legalBasis: '8 CFR § 232 / INA § 212(a)(1)',
    summary: 'Relatório clínico emitido por médico credenciado (Civil Surgeon) atestando que o candidato não é inadmissível aos EUA por razões de saúde pública.',
    responsibleRoles: ['Case Support', 'Intake'],
    criticalRules: [
      'CRÍTICO: O envelope deve permanecer estritamente LACRADO com selo do médico. Se aberto, o USCIS rejeitará imediatamente.',
      'Validade de 2 anos a partir da data em que o médico civil assinou o formulário.'
    ],
    submissionChecklist: [
      'Conferir se o médico é Civil Surgeon credenciado no portal do USCIS',
      'Verificar se o envelope entregue pelo cliente está intacto e assinado no lacre',
      'Arquivar cópia digital do relatório (se o médico forneceu via de cortesia)'
    ],
    officialUrl: 'https://www.uscis.gov/i-693',
    relatedPhaseId: 'node-aos',
    relatedPhaseName: 'Fase 06 — Ajuste de Status / Green Card (I-485)'
  },
  {
    id: 'form-i-797',
    category: 'FORM',
    code: 'Form I-797',
    title: 'Notice of Action',
    subtitle: 'Notificação Oficial de Ação do USCIS (Recibo, Biometria, RFE e Aprovação)',
    agency: 'USCIS',
    legalBasis: '8 CFR § 103.2 / INA § 103',
    summary: 'Documento oficial emitido exclusivamente pelo USCIS para comunicar o andamento, agendamentos e decisões sobre petições e aplicações (I-140, I-485, I-765). Subdivide-se em variantes fundamentais: I-797 (aprovação original em papel de segurança timbrado), I-797A (extensão/mudança de status com canhoto I-94), I-797B (aprovação sem I-94 para processo consular), I-797C (recibo de protocolo com Receipt Number, agendamento de biometria ASC ou transferência), I-797D (carta anexa a cartões EAD/Green Card) e I-797E (Request for Evidence - RFE).',
    responsibleRoles: ['Case Support', 'Case Manager', 'Legal'],
    criticalRules: [
      'Auditoria do Receipt Number (I-797C): ao receber o recibo, conferir imediatamente o código de 13 caracteres (ex: LIN, SRC, IOE), a grafia dos nomes e a Priority Date com o PERM.',
      'A via original de aprovação (I-797 em papel de segurança com marca d\'água) é insubstituível; digitalizar em alta resolução e arquivar o original físico em local seguro.',
      'Agendamento de Biometria (I-797C ASC Notice): alertar o cliente no mesmo dia com a data, horário e centro ASC estipulados, instruindo o comparecimento com documento oficial e o notice impresso.',
      'Request for Evidence (I-797E): prazos de resposta do USCIS são peremptórios e fatais; notificar o advogado responsável no mesmo dia para emissão imediata do Roadmap estratégico.',
      'O I-797C do I-485 pendente serve como comprovação de presença legal contínua e documento base indispensável para solicitações de EAD (I-765) e Travel Document (I-131).'
    ],
    submissionChecklist: [
      'Digitalizar a notificação recebida em PDF de alta resolução e renomear com padrão [Data]_[Tipo_I797]_[ReceiptNumber]_[Cliente]',
      'Conferir Receipt Number no portal USCIS Case Status Online e atualizar o painel interno',
      'Verificar integridade dos dados cadastrais: nome completo, data de nascimento, endereço e categoria (EB-3)',
      'Se agendamento de biometria (ASC), encaminhar notificação ao cliente com instruções claras de comparecimento',
      'Se aprovação (I-797 / I-797B), anexar ao arquivo do caso, atualizar marcos da esteira e acionar a próxima fase (AOS ou Consular)',
      'Se RFE (I-797E), registrar o prazo limite no calendário jurídico e encaminhar imediatamente para elaboração do Roadmap'
    ],
    officialUrl: 'https://www.uscis.gov/forms/all-forms/form-i-797-types-and-functions',
    relatedPhaseId: 'node-i140',
    relatedPhaseName: 'Fase 05 — Petição I-140 (USCIS)'
  }
];
