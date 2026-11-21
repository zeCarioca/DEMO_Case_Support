import { FastifyPluginAsync } from 'fastify';
import { prisma } from '@case-support/database';

export const sopRoutes: FastifyPluginAsync = async (server) => {
  // Get all standard flow nodes for visual SOP rendering
  server.get('/flowchart', async (request, reply) => {
    const nodes = [
      {
        id: 'node-intake',
        title: '1. Abertura & Triagem Inicial',
        phase: 'PHASE_A_DOL_PERM',
        summary: 'Identificação de empregador, vaga e beneficiário. Coleta de IRS Letter, Income Tax, Utility Bill e SunBiz.',
        responsibilities: ['Intake', 'Case Support'],
        criticalChecks: [
          'FEIN válido e local de trabalho real nos EUA',
          'Beneficiário possui status legal e histórico documentável',
          'Alinhamento comercial na Welcome Call'
        ],
        officialLinks: [
          { label: 'O*NET Online', url: 'https://www.onetonline.org/' },
          { label: 'Sunbiz FL', url: 'https://search.sunbiz.org/' }
        ],
        position: { x: 50, y: 100 }
      },
      {
        id: 'node-pwd',
        title: '2. Prevailing Wage (ETA-9141)',
        phase: 'PHASE_A_DOL_PERM',
        summary: 'Determinação salarial oficial solicitada ao National Prevailing Wage Center via FLAG.',
        responsibilities: ['Case Support', 'Case Manager'],
        criticalChecks: [
          'SOC/O*NET condizente com as funções efetivas (não escolher apenas pelo menor salário)',
          'Local e jornada full-time validados',
          'Revisão jurídica das evidências antes do envio'
        ],
        officialLinks: [
          { label: 'FLAG Portal', url: 'https://flag.dol.gov/' },
          { label: 'BLS Wage Data', url: 'https://www.bls.gov/oes/' }
        ],
        position: { x: 320, y: 100 }
      },
      {
        id: 'node-recruitment',
        title: '3. Recrutamento & Conformidade',
        phase: 'PHASE_A_DOL_PERM',
        summary: 'Teste do mercado de trabalho americano. Job order estadual (30d), 2 anúncios de domingo, NOF (10d) e etapas adicionais se profissional.',
        responsibilities: ['Case Support', 'Finance', 'Case Manager'],
        criticalChecks: [
          'Guardar Tear Sheets dos dois domingos e prints do Job Order',
          'Cumprir o Mandatory Quiet Period de 30 dias após a última ação',
          'Recrutamento entre 30 e 180 dias antes do protocolo ETA-9089'
        ],
        officialLinks: [
          { label: 'DOL 20 CFR 656', url: 'https://www.ecfr.gov/current/title-20/chapter-V/part-656' }
        ],
        position: { x: 590, y: 100 }
      },
      {
        id: 'node-eta9089',
        title: '4. Protocolo ETA-9089 (FLAG)',
        phase: 'PHASE_A_DOL_PERM',
        summary: 'Aplicação de certificação laboral permanente no DOL.',
        responsibilities: ['Docketing Specialist', 'Managing Attorney (Legal Review)'],
        criticalChecks: [
          'Consistência total entre PWD, anúncios e formulário',
          'Revisão da equipe e revisão jurídica obrigatórias',
          'Assinaturas FIA do sponsor e cliente'
        ],
        officialLinks: [
          { label: 'DOL Processing Times', url: 'https://flag.dol.gov/processingtimes' }
        ],
        position: { x: 860, y: 100 }
      },
      {
        id: 'node-i140',
        title: '5. Petição I-140 (USCIS)',
        phase: 'PHASE_B_USCIS_I140',
        summary: 'Petição de Imigrante para Trabalhador Estrangeiro (EB-3 Skilled, Professional ou Other Workers).',
        responsibilities: ['Case Support', 'Case Manager', 'Legal', 'Finance'],
        criticalChecks: [
          'Protocolar dentro dos 180 dias de validade da certificação PERM',
          'Demonstrar capacidade de pagamento do empregador (Ability to Pay)',
          'Revisão independente do Case Manager e aprovação final da Legal',
          'Cheques de taxas solicitados à Finance com antecedência'
        ],
        officialLinks: [
          { label: 'USCIS Form I-140', url: 'https://www.uscis.gov/i-140' },
          { label: 'Direct Filing Addresses', url: 'https://www.uscis.gov/forms/all-forms/direct-filing-addresses-for-form-i-140-immigrant-petition-for-alien-worker' }
        ],
        position: { x: 450, y: 280 }
      },
      {
        id: 'node-aos',
        title: '6. Ajuste de Status / Green Card (I-485)',
        phase: 'PHASE_C_GREEN_CARD_AOS',
        summary: 'Etapa final do Green Card para beneficiários elegíveis nos EUA.',
        responsibilities: ['Intake', 'Case Support', 'Case Manager', 'Legal'],
        criticalChecks: [
          'Priority date alcançou o Visa Bulletin no mês do protocolo',
          'Exame médico I-693 enviado LACRADO pelo cliente',
          'Formulários I-485 e I-485J completos sem lacunas de histórico'
        ],
        officialLinks: [
          { label: 'Visa Bulletin', url: 'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html' }
        ],
        position: { x: 750, y: 280 }
      },
      {
        id: 'node-rfe',
        title: 'Subprocesso: Auditoria / RFI / RFE',
        phase: 'SUBPROCESS_RFI_RFE',
        summary: 'Resposta a questionamentos do DOL (Audit/RFI) ou do USCIS (RFE).',
        responsibilities: ['Legal (Roadmap)', 'Case Support', 'Case Manager'],
        criticalChecks: [
          'Solicitar Roadmap imediatamente ao departamento jurídico',
          'Seguir rigorosamente o prazo estabelecido na notificação',
          'Envio eletrônico no FLAG (RFI) ou protocolo físico com comprovante de entrega (RFE)'
        ],
        officialLinks: [
          { label: 'FLAG Portal', url: 'https://flag.dol.gov/' }
        ],
        position: { x: 590, y: 440 }
      }
    ];

    const edges = [
      { id: 'e1-2', source: 'node-intake', target: 'node-pwd' },
      { id: 'e2-3', source: 'node-pwd', target: 'node-recruitment' },
      { id: 'e3-4', source: 'node-recruitment', target: 'node-eta9089' },
      { id: 'e4-5', source: 'node-eta9089', target: 'node-i140' },
      { id: 'e5-6', source: 'node-i140', target: 'node-aos' },
      { id: 'e4-rfe', source: 'node-eta9089', target: 'node-rfe', animated: true },
      { id: 'e5-rfe', source: 'node-i140', target: 'node-rfe', animated: true }
    ];

    return reply.send({ nodes, edges });
  });

  // Get template checklist definitions grouped by phase
  server.get('/templates', async (request, reply) => {
    const templates = await prisma.checklistTemplate.findMany({
      orderBy: { order: 'asc' }
    });
    return reply.send({ templates });
  });
};
