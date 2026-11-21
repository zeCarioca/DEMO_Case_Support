import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const permChecklist = [
  // 1. PW / ETA-9141
  { code: 'PERM-PW-01', title: 'Welcome call e aplicar workflow', phase: 'PHASE_A_DOL_PERM', category: 'INTAKE_TRIAGE', assignedRole: 'INTAKE', order: 1 },
  { code: 'PERM-PW-02', title: 'Confirmar razão social, endereço e dados legais do empregador (IRS, SunBiz)', phase: 'PHASE_A_DOL_PERM', category: 'INTAKE_TRIAGE', assignedRole: 'CASE_SUPPORT', order: 2 },
  { code: 'PERM-PW-03', title: 'Confirmar nome do cargo, duties e requisitos mínimos da vaga', phase: 'PHASE_A_DOL_PERM', category: 'JOB_DEFINITION_SOC', assignedRole: 'CASE_SUPPORT', order: 3 },
  { code: 'PERM-PW-04', title: 'Confirmar SOC/O*NET compatível com as funções efetivas', phase: 'PHASE_A_DOL_PERM', category: 'JOB_DEFINITION_SOC', assignedRole: 'CASE_SUPPORT', order: 4, criticalNote: 'Não escolher ocupação apenas pelo menor salário' },
  { code: 'PERM-PW-05', title: 'Revisar endereço e área de emprego pretendida (todos os locais)', phase: 'PHASE_A_DOL_PERM', category: 'JOB_DEFINITION_SOC', assignedRole: 'CASE_SUPPORT', order: 5 },
  { code: 'PERM-PW-06', title: 'Validar jornada, full-time', phase: 'PHASE_A_DOL_PERM', category: 'JOB_DEFINITION_SOC', assignedRole: 'CASE_SUPPORT', order: 6 },
  { code: 'PERM-PW-07', title: 'Conferir requisitos de educação, experiência, treinamento e habilidades especiais', phase: 'PHASE_A_DOL_PERM', category: 'JOB_DEFINITION_SOC', assignedRole: 'CASE_SUPPORT', order: 7 },
  { code: 'PERM-PW-08', title: 'Confirmar se temos as evidências para os requisitos da vaga', phase: 'PHASE_A_DOL_PERM', category: 'JOB_DEFINITION_SOC', assignedRole: 'CASE_SUPPORT', order: 8 },
  { code: 'PERM-PW-09', title: 'Pedir revisão jurídica das evidências', phase: 'PHASE_A_DOL_PERM', category: 'JOB_DEFINITION_SOC', assignedRole: 'CASE_SUPPORT', requiresApprovalFrom: 'LEGAL', order: 9 },
  { code: 'PERM-PW-10', title: 'Revisar o salário oferecido O*NET', phase: 'PHASE_A_DOL_PERM', category: 'PREVAILING_WAGE_ETA9141', assignedRole: 'CASE_SUPPORT', order: 10 },
  { code: 'PERM-PW-11', title: 'Confirmar que os requisitos do cargo não foram ajustados artificialmente ao beneficiário', phase: 'PHASE_A_DOL_PERM', category: 'JOB_DEFINITION_SOC', assignedRole: 'CASE_MANAGER', order: 11 },
  { code: 'PERM-PW-12', title: 'Salvar cópia do ETA-9141 DRAFT e pedir revisão jurídica', phase: 'PHASE_A_DOL_PERM', category: 'PREVAILING_WAGE_ETA9141', assignedRole: 'CASE_SUPPORT', requiresApprovalFrom: 'LEGAL', order: 12 },
  { code: 'PERM-PW-13', title: 'Salvar cópia do ETA-9141 submetido e registrar número do caso, data e comprovante', phase: 'PHASE_A_DOL_PERM', category: 'PREVAILING_WAGE_ETA9141', assignedRole: 'CASE_SUPPORT', order: 13 },
  { code: 'PERM-PW-14', title: 'Pedir assinatura do sponsor no FIA', phase: 'PHASE_A_DOL_PERM', category: 'PREVAILING_WAGE_ETA9141', assignedRole: 'CASE_SUPPORT', order: 14 },
  { code: 'PERM-PW-15', title: 'Follow-up do ETA-9141 com registro de notas na pasta do caso', phase: 'PHASE_A_DOL_PERM', category: 'PREVAILING_WAGE_ETA9141', assignedRole: 'CASE_SUPPORT', order: 15 },
  { code: 'PERM-PW-16', title: 'Follow-up do ETA-9141 junto ao sponsor', phase: 'PHASE_A_DOL_PERM', category: 'PREVAILING_WAGE_ETA9141', assignedRole: 'CASE_SUPPORT', order: 16 },
  { code: 'PERM-PW-17', title: 'Abrir SWA e pedir a verificação da SWA', phase: 'PHASE_A_DOL_PERM', category: 'PREVAILING_WAGE_ETA9141', assignedRole: 'CASE_SUPPORT', order: 17 },
  { code: 'PERM-PW-18', title: 'Após determinação do ETA-9141, salvar cópia certificada na pasta do caso e confirmar salário', phase: 'PHASE_A_DOL_PERM', category: 'PREVAILING_WAGE_ETA9141', assignedRole: 'CASE_MANAGER', order: 18 },

  // 2. LC / ETA-9089 & Recrutamento
  { code: 'PERM-LC-01', title: 'Confirmar PW válida e aplicável', phase: 'PHASE_A_DOL_PERM', category: 'RECRUITMENT_COMPLIANCE', assignedRole: 'CASE_MANAGER', order: 19 },
  { code: 'PERM-LC-02', title: 'Conferir consistência entre PW e os documentos enviados pelo empregador', phase: 'PHASE_A_DOL_PERM', category: 'RECRUITMENT_COMPLIANCE', assignedRole: 'CASE_MANAGER', order: 20 },
  { code: 'PERM-LC-03', title: 'Conferir requisitos mínimos e alternativos', phase: 'PHASE_A_DOL_PERM', category: 'RECRUITMENT_COMPLIANCE', assignedRole: 'CASE_SUPPORT', order: 21 },
  { code: 'PERM-LC-04', title: 'Confirmar recrutamento exigido (anúncios, job order, etapas adicionais e NOF)', phase: 'PHASE_A_DOL_PERM', category: 'RECRUITMENT_COMPLIANCE', assignedRole: 'CASE_SUPPORT', order: 22 },
  { code: 'PERM-LC-05', title: 'Draft do Anúncio do Jornal', phase: 'PHASE_A_DOL_PERM', category: 'RECRUITMENT_COMPLIANCE', assignedRole: 'CASE_SUPPORT', order: 23 },
  { code: 'PERM-LC-06', title: 'Pedir Aprovação Jurídica para o draft do Anúncio do Jornal', phase: 'PHASE_A_DOL_PERM', category: 'RECRUITMENT_COMPLIANCE', assignedRole: 'CASE_SUPPORT', requiresApprovalFrom: 'LEGAL', order: 24 },
  { code: 'PERM-LC-07', title: 'Postar Vaga na SWA (Job Order 30 dias)', phase: 'PHASE_A_DOL_PERM', category: 'RECRUITMENT_COMPLIANCE', assignedRole: 'CASE_SUPPORT', order: 25 },
  { code: 'PERM-LC-08', title: 'Draft do NOF (Notice of Filing)', phase: 'PHASE_A_DOL_PERM', category: 'RECRUITMENT_COMPLIANCE', assignedRole: 'CASE_SUPPORT', order: 26 },
  { code: 'PERM-LC-09', title: 'Coletar assinatura do NOF e adicionar documento assinado na pasta do caso', phase: 'PHASE_A_DOL_PERM', category: 'RECRUITMENT_COMPLIANCE', assignedRole: 'CASE_SUPPORT', order: 27 },
  { code: 'PERM-LC-10', title: 'Cotar e efetuar pagamento do Jornal', phase: 'PHASE_A_DOL_PERM', category: 'RECRUITMENT_COMPLIANCE', assignedRole: 'FINANCE', order: 28 },
  { code: 'PERM-LC-11', title: 'Salvar no arquivo de conformidade o resume dos candidatos rejeitados no recrutamento', phase: 'PHASE_A_DOL_PERM', category: 'RECRUITMENT_COMPLIANCE', assignedRole: 'CASE_SUPPORT', order: 29 },
  { code: 'PERM-LC-12', title: 'Pedir e salvar as Tear Sheets dos 2 domingos na pasta do caso', phase: 'PHASE_A_DOL_PERM', category: 'RECRUITMENT_COMPLIANCE', assignedRole: 'CASE_SUPPORT', order: 30 },
  { code: 'PERM-LC-13', title: 'Validar datas dos meios de recrutamento, período de quiet period (30 dias) e prazos', phase: 'PHASE_A_DOL_PERM', category: 'RECRUITMENT_COMPLIANCE', assignedRole: 'CASE_MANAGER', order: 31, criticalNote: 'Recrutamento entre 30 e 180 dias antes do protocolo' },
  { code: 'PERM-LC-14', title: 'Draft do LC – ETA-9089 e conferir versão atual no FLAG', phase: 'PHASE_A_DOL_PERM', category: 'ETA9089_FILING', assignedRole: 'CASE_SUPPORT', order: 32 },
  { code: 'PERM-LC-15', title: 'Pedir revisão da equipe e revisão jurídica no ETA-9089 antes de submeter', phase: 'PHASE_A_DOL_PERM', category: 'ETA9089_FILING', assignedRole: 'CASE_SUPPORT', requiresApprovalFrom: 'LEGAL', order: 33 },
  { code: 'PERM-LC-16', title: 'Submeter o LC – ETA-9089 no portal FLAG', phase: 'PHASE_A_DOL_PERM', category: 'ETA9089_FILING', assignedRole: 'CASE_SUPPORT', order: 34 },
  { code: 'PERM-LC-17', title: 'Pedir assinatura do sponsor e cliente no FIA e arquivar na pasta do caso', phase: 'PHASE_A_DOL_PERM', category: 'ETA9089_FILING', assignedRole: 'CASE_SUPPORT', order: 35 },
  { code: 'PERM-LC-18', title: 'Após determinação do ETA-9089, salvar cópia e Appendix na pasta do caso', phase: 'PHASE_A_DOL_PERM', category: 'ETA9089_FILING', assignedRole: 'CASE_SUPPORT', order: 36 },
  { code: 'PERM-LC-19', title: 'Assinatura do Advogado Responsável, Cliente e Sponsor no ETA-9089 e Appendix arquivados', phase: 'PHASE_A_DOL_PERM', category: 'ETA9089_FILING', assignedRole: 'LEGAL', order: 37 },
  { code: 'PERM-LC-20', title: 'Confirmação por escrito do sponsor para seguir EB-3 -> Encaminhar para Intake (NB) -> Formalizar transição para I-140', phase: 'PHASE_A_DOL_PERM', category: 'ETA9089_FILING', assignedRole: 'CASE_MANAGER', order: 38 }
];

const i140Checklist = [
  { code: 'I140-01', title: 'Has the ETA 9089 been signed by all parties?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 1 },
  { code: 'I140-02', title: 'Has the beneficiary completed and submitted the I-140 Intake Form? (Button must be green)', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'INTAKE', order: 2 },
  { code: 'I140-03', title: 'Has documentation been transferred from PERM to appropriate folders?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 3 },
  { code: 'I140-04', title: 'Has the beneficiary’s documentation related to the job position been reviewed?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 4 },
  { code: 'I140-05', title: 'Have job requirements been verified & compared with beneficiary credentials?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_MANAGER', order: 5 },
  { code: 'I140-06', title: 'What is beneficiary’s current immigration status? Do we have supporting docs?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 6 },
  { code: 'I140-07', title: 'Do we have the employer’s most recent Income Tax Return?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 7 },
  { code: 'I140-08', title: 'Do we have a recent utility bill in company’s name?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 8 },
  { code: 'I140-09', title: 'What is current number of employees? (For Asylum Program Fee calculation)', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 9 },
  { code: 'I140-10', title: 'Is this a new job position within the company?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 10 },
  { code: 'I140-11', title: 'Will Premium Processing (PP - Form I-907) be used?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 11 },
  { code: 'I140-12', title: 'Have Forms I-140 and G-28 been reviewed by Case Support?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 12 },
  { code: 'I140-13', title: 'Have Forms I-140 and G-28 been reviewed by Case Manager?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_MANAGER', requiresApprovalFrom: 'CASE_MANAGER', order: 13 },
  { code: 'I140-14', title: 'Have Forms I-140 and G-28 been reviewed by the employer?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 14 },
  { code: 'I140-15', title: 'Have Forms I-140 and G-28 been reviewed by beneficiary? (Beneficiary portion only)', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 15 },
  { code: 'I140-16', title: 'Have Forms I-140 and G-28 been signed by the employer?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 16 },
  { code: 'I140-17', title: 'Has Form G-28 been signed by the beneficiary?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 17 },
  { code: 'I140-18', title: 'Have Acknowledgment forms (I-140, G-28, I-907) been signed by all parties?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 18 },
  { code: 'I140-19', title: 'Has payment of applicable filing fees been requested from client?', phase: 'PHASE_B_USCIS_I140', category: 'PAYMENT_FINANCE', assignedRole: 'CASE_SUPPORT', order: 19 },
  { code: 'I140-20', title: 'Has client completed payment of the filing fees?', phase: 'PHASE_B_USCIS_I140', category: 'PAYMENT_FINANCE', assignedRole: 'FINANCE', order: 20 },
  { code: 'I140-21', title: 'Has payment of filing fees been requested from Finance? (Request 1 wk before filing - Tue/Thu)', phase: 'PHASE_B_USCIS_I140', category: 'PAYMENT_FINANCE', assignedRole: 'CASE_SUPPORT', order: 21, criticalNote: 'Cheques emitidos estritamente Terça/Quinta pelo Departamento Financeiro' },
  { code: 'I140-22', title: 'Has cover letter been drafted?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 22 },
  { code: 'I140-23', title: 'Has Final Package (FP) been assembled?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 23 },
  { code: 'I140-24', title: 'Has Final Package (FP) been reviewed by Case Manager (CM)?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_MANAGER', requiresApprovalFrom: 'CASE_MANAGER', order: 24 },
  { code: 'I140-25', title: 'Has Final Package (FP) been reviewed by Attorney? (Submit ONLY after legal approval)', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'LEGAL', requiresApprovalFrom: 'LEGAL', order: 25 },
  { code: 'I140-26', title: 'Has Final Package been prepared and submitted to USCIS?', phase: 'PHASE_B_USCIS_I140', category: 'I140_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 26, criticalNote: 'Conferir comprovante de protocolo ou postagem' }
];

const aosChecklist = [
  { code: 'AOS-01', title: 'Welcome call e aplicar workflow', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'AOS_PREPARATION', assignedRole: 'INTAKE', order: 1 },
  { code: 'AOS-02', title: 'Confirmar elegibilidade para ajuste de status e presença física nos EUA', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'AOS_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 2 },
  { code: 'AOS-03', title: 'Verificar Visa Bulletin e tabela autorizada pelo USCIS para o mês do protocolo', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'AOS_PREPARATION', assignedRole: 'CASE_MANAGER', order: 3 },
  { code: 'AOS-04', title: 'Conferir se o I-140 está aprovado (Green Copy ou Approval Notice)', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'AOS_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 4 },
  { code: 'AOS-05', title: 'Trazer documentos dos casos antigos e pedir atualizações necessárias', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'AOS_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 5 },
  { code: 'AOS-06', title: 'Revisar entradas, status, I-94, passaportes, vistos anteriores e documentos civis', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'AOS_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 6 },
  { code: 'AOS-07', title: 'Para dependentes: verificar elegibilidade derivada e formulários individuais', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'AOS_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 7 },
  { code: 'AOS-08', title: 'Preencher I-485 e I-485 J sem lacunas de endereço/emprego/viagens', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'AOS_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 8 },
  { code: 'AOS-09', title: 'Confirmar exame médico I-693 (cliente envia LACRADO para o escritório)', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'AOS_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 9, criticalNote: 'O envelope do exame I-693 NÃO pode ser aberto pela equipe' },
  { code: 'AOS-10', title: 'Avaliar necessidade de I-765 (EAD) e I-131 (Advance Parole)', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'AOS_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 10 },
  { code: 'AOS-11', title: 'Revisar admissibilidade e histórico com o advogado', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'AOS_PREPARATION', assignedRole: 'LEGAL', requiresApprovalFrom: 'LEGAL', order: 11 },
  { code: 'AOS-12', title: 'Assinaturas nos forms I-485 / I-485 J e passar para Revisão CM', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'AOS_PREPARATION', assignedRole: 'CASE_MANAGER', requiresApprovalFrom: 'CASE_MANAGER', order: 12 },
  { code: 'AOS-13', title: 'Draft do pacote final e Revisão Jurídica', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'AOS_PREPARATION', assignedRole: 'LEGAL', requiresApprovalFrom: 'LEGAL', order: 13 },
  { code: 'AOS-14', title: 'Solicitar cheques em task para o Departamento Financeiro (Terça/Quinta)', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'PAYMENT_FINANCE', assignedRole: 'FINANCE', order: 14 },
  { code: 'AOS-15', title: 'Envio físico do pacote ao USCIS com comprovante de postagem', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'AOS_PREPARATION', assignedRole: 'CASE_SUPPORT', order: 15 },
  { code: 'AOS-16', title: 'Recibo USCIS: registrar na pasta do caso e follow-up', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'USCIS_RECEIPT_FOLLOWUP', assignedRole: 'CASE_SUPPORT', order: 16 },
  { code: 'AOS-17', title: 'Acompanhar aprovação, foto do Green Card na pasta do caso, pedir review Google e concluir', phase: 'PHASE_C_GREEN_CARD_AOS', category: 'USCIS_RECEIPT_FOLLOWUP', assignedRole: 'CASE_MANAGER', order: 17 }
];

const rfeChecklist = [
  { code: 'RFE-01', title: 'Registrar data de recebimento e pedir Roadmap imediatamente ao responsável jurídico', phase: 'SUBPROCESS_RFI_RFE', category: 'RFI_RFE_ROADMAP', assignedRole: 'LEGAL', requiresApprovalFrom: 'LEGAL', order: 1 },
  { code: 'RFE-02', title: 'Compartilhar o Roadmap com o cliente e confirmar endereço de envio', phase: 'SUBPROCESS_RFI_RFE', category: 'RFI_RFE_ROADMAP', assignedRole: 'CASE_SUPPORT', order: 2 },
  { code: 'RFE-03', title: 'Pedir documentação adicional seguindo rigorosamente o Roadmap', phase: 'SUBPROCESS_RFI_RFE', category: 'RFI_RFE_ROADMAP', assignedRole: 'CASE_SUPPORT', order: 3 },
  { code: 'RFE-04', title: 'Draft Cover Letter e montagem do pacote de resposta', phase: 'SUBPROCESS_RFI_RFE', category: 'RFI_RFE_ROADMAP', assignedRole: 'CASE_SUPPORT', order: 4 },
  { code: 'RFE-05', title: 'Revisão do pacote com cover letter ao CM', phase: 'SUBPROCESS_RFI_RFE', category: 'RFI_RFE_ROADMAP', assignedRole: 'CASE_MANAGER', requiresApprovalFrom: 'CASE_MANAGER', order: 5 },
  { code: 'RFE-06', title: 'Aprovação jurídica final da resposta', phase: 'SUBPROCESS_RFI_RFE', category: 'RFI_RFE_ROADMAP', assignedRole: 'LEGAL', requiresApprovalFrom: 'LEGAL', order: 6 },
  { code: 'RFE-07', title: 'Em caso de RFI DOL: conferir tamanho e submeter no portal Flag.Dol', phase: 'SUBPROCESS_RFI_RFE', category: 'RFI_RFE_ROADMAP', assignedRole: 'CASE_SUPPORT', order: 7 },
  { code: 'RFE-08', title: 'Em caso de RFE USCIS: montagem e submissão da resposta formal', phase: 'SUBPROCESS_RFI_RFE', category: 'RFI_RFE_ROADMAP', assignedRole: 'CASE_SUPPORT', order: 8 },
  { code: 'RFE-09', title: 'Salvar comprovante de entrega na pasta do caso e follow-up do recibo', phase: 'SUBPROCESS_RFI_RFE', category: 'USCIS_RECEIPT_FOLLOWUP', assignedRole: 'CASE_SUPPORT', order: 9 }
];

async function main() {
  console.log('Seeding Apex IP & Tech Law Group users...');
  const users = [
    { email: 'attorney@apexipgroup.com', name: 'Eleanor Vance, Esq. (Managing Partner)', role: 'LEGAL' },
    { email: 'intake@apexipgroup.com', name: 'Marcus Chen (Intake Specialist)', role: 'INTAKE' },
    { email: 'docketing@apexipgroup.com', name: 'David Ross (Docketing Specialist)', role: 'CASE_SUPPORT' },
    { email: 'casemanager@apexipgroup.com', name: 'Sophia Martinez (Senior Case Manager)', role: 'CASE_MANAGER' },
    { email: 'finance@apexipgroup.com', name: 'Operations Finance (Filing Fees)', role: 'FINANCE' },
    { email: 'disbursements@apexipgroup.com', name: 'Treasury & Disbursements', role: 'FINANCE' }
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, role: u.role },
      create: u
    });
  }

  console.log('Seeding Checklist Templates...');
  const allTemplates = [...permChecklist, ...i140Checklist, ...aosChecklist, ...rfeChecklist];
  for (const t of allTemplates) {
    await prisma.checklistTemplate.upsert({
      where: { code: t.code },
      update: {
        title: t.title,
        phase: t.phase,
        category: t.category,
        assignedRole: t.assignedRole,
        requiresApprovalFrom: t.requiresApprovalFrom || null,
        criticalNote: t.criticalNote || null,
        order: t.order
      },
      create: {
        code: t.code,
        title: t.title,
        phase: t.phase,
        category: t.category,
        assignedRole: t.assignedRole,
        requiresApprovalFrom: t.requiresApprovalFrom || null,
        criticalNote: t.criticalNote || null,
        order: t.order
      }
    });
  }

  console.log('Seeding realistic demo cases for Apex IP & Tech Law Group...');
  const demoCases = [
    {
      caseNumber: 'APX-2026-TRM-001',
      clientName: 'Rodrigo Alcantara',
      sponsorName: 'Apex Precision Logistics LLC',
      jobTitle: 'Logistics Operations Supervisor',
      socCode: '11-3071.04',
      eb3Category: 'SKILLED_WORKER',
      currentPhase: 'PHASE_B_USCIS_I140',
      status: 'I140_WAITING_FINANCE_CHECKS',
      googleDriveUrl: 'https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoP',
      flagCaseNumber: 'A-24190-12890',
      permCertificationDate: new Date('2026-08-15'),
      permExpirationDate: new Date('2027-02-11') // 180 days
    },
    {
      caseNumber: 'APX-2026-TRM-002',
      clientName: 'Mariana Duarte',
      sponsorName: 'Solaris Health Care Inc',
      jobTitle: 'Physical Therapy Specialist',
      socCode: '29-1123.00',
      eb3Category: 'PROFESSIONAL',
      currentPhase: 'PHASE_A_DOL_PERM',
      status: 'RECRUITMENT_ACTIVE',
      googleDriveUrl: 'https://drive.google.com/drive/folders/2bCdEfGhIjKlMnOpQ',
      recruitmentStartDate: new Date('2026-09-01'),
      recruitmentEndDate: new Date('2026-10-05')
    },
    {
      caseNumber: 'APX-2026-TRM-003',
      clientName: 'Carlos Eduardo Ferreira',
      sponsorName: 'Biscayne Bay Construction Services',
      jobTitle: 'Heavy Machinery Maintenance Technician',
      socCode: '49-3042.00',
      eb3Category: 'OTHER_WORKERS',
      currentPhase: 'PHASE_C_GREEN_CARD_AOS',
      status: 'AOS_FILED',
      priorityDate: new Date('2024-03-12')
    }
  ];

  for (const c of demoCases) {
    const createdCase = await prisma.case.upsert({
      where: { caseNumber: c.caseNumber },
      update: c,
      create: c
    });

    // Populate checklist progress for this case if not already present
    const existingProgress = await prisma.caseChecklistProgress.count({
      where: { caseId: createdCase.id }
    });

    if (existingProgress === 0) {
      // Add all templates matching the case's current phase
      const templates = await prisma.checklistTemplate.findMany({
        where: { phase: c.currentPhase },
        orderBy: { order: 'asc' }
      });

      for (let i = 0; i < templates.length; i++) {
        const tmpl = templates[i];
        // Mark first few as completed for realistic demo
        const isDone = i < 5;
        await prisma.caseChecklistProgress.create({
          data: {
            caseId: createdCase.id,
            templateId: tmpl.id,
            completed: isDone,
            completedAt: isDone ? new Date() : null,
            approved: isDone && tmpl.requiresApprovalFrom ? true : null
          }
        });
      }
    }
  }

  // Seed initial priority tasks if empty
  const taskCount = await prisma.priorityTask.count();
  if (taskCount === 0) {
    const initialTasks = [
      { title: 'Protocolo de Emergência: NOF e Job Order na SWA', priority: 'CRITICAL', assignedRole: 'CASE_SUPPORT', order: 0, dueDate: new Date(Date.now() + 86400000 * 2), description: 'Prazo fatal para manter validade da Prevailing Wage ETA-9141.' },
      { title: 'Emissão de Cheques USCIS (I-140 Fee + Asylum Fee)', priority: 'CRITICAL', assignedRole: 'FINANCE', order: 1, dueDate: new Date(Date.now() + 86400000), description: 'Cheques nominais ao U.S. Department of Homeland Security.' },
      { title: 'Revisão Jurídica de Tear Sheets dos 2 Domingos', priority: 'HIGH', assignedRole: 'LEGAL', order: 0, dueDate: new Date(Date.now() + 86400000 * 3), description: 'Checagem de texto legível e nome exato do empregador.' },
      { title: 'Triagem de novos formulários Intake EB-3', priority: 'HIGH', assignedRole: 'INTAKE', order: 1, dueDate: new Date(Date.now() + 86400000 * 4), description: 'Verificar status imigratório e histórico de permanência.' },
      { title: 'Coleta de W-2 e Income Tax do empregador sponsor', priority: 'MEDIUM', assignedRole: 'CASE_SUPPORT', order: 0, dueDate: new Date(Date.now() + 86400000 * 7), description: 'Análise de capacidade de pagamento (Ability to Pay).' },
      { title: 'Conferência de relatórios e calendário de Quiet Period', priority: 'MEDIUM', assignedRole: 'CASE_MANAGER', order: 1, dueDate: new Date(Date.now() + 86400000 * 8), description: 'Aguardar 30 dias regulamentares pós-recrutamento.' },
      { title: 'Auditoria de comprovantes e protocolo de envio', priority: 'LOW', assignedRole: 'CASE_SUPPORT', order: 0, dueDate: new Date(Date.now() + 86400000 * 14), description: 'Confirmar comprovantes arquivados na pasta do caso.' }
    ];

    for (const t of initialTasks) {
      await prisma.priorityTask.create({ data: t });
    }
  }

  console.log('Seeding complete! Successfully seeded users, templates, cases, and priority tasks.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
