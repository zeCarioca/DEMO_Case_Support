import { ServiceItem } from './types.js';

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'auth-service',
    name: 'Google Workspace SSO & Auth Service',
    package: '@case-support/api',
    tier: 'BACKEND',
    entryPoint: 'apps/api/src/services/googleAuthService.ts',
    summary: 'Autenticação corporativa via Google OAuth 2.0 com emissão de JWT e cookies HTTP-only.',
    description: 'Gerencia o ciclo de vida de autenticação corporativa restrita ao domínio corporativo apextechlaw.com. Emite tokens JWT assinados, persiste cookies seguros e verifica papéis de acesso no Fastify.',
    port: 4000,
    routes: ['/api/auth/login', '/api/auth/callback', '/api/auth/me', '/api/auth/logout'],
    envVars: [
      { name: 'GOOGLE_CLIENT_ID', scope: 'api', required: true, description: 'ID do cliente OAuth 2.0 no Google Cloud Console' },
      { name: 'GOOGLE_CLIENT_SECRET', scope: 'api', required: true, description: 'Segredo OAuth do cliente corporativo' },
      { name: 'GOOGLE_REDIRECT_URI', scope: 'api', required: true, defaultValue: 'http://localhost:4000/api/auth/callback', description: 'URI de retorno registrada no Google Cloud' },
      { name: 'JWT_SECRET', scope: 'api', required: true, description: 'Chave secreta para assinatura dos tokens JWT' },
      { name: 'COOKIE_SECRET', scope: 'api', required: true, description: 'Chave de criptografia de cookies HTTP-only' }
    ],
    storage: {
      type: 'Cookies',
      keys: ['casesupport_session'],
      description: 'Cookie HTTP-only seguro contendo o token de sessão JWT assinado'
    },
    fallbacks: 'Em ambiente local (localhost / 127.0.0.1), o frontend permite acesso aos utilitários como convidado mesmo sem sessão ativa.',
    tags: ['auth', 'oauth', 'jwt', 'security', 'cookies', 'session']
  },
  {
    id: 'newspaper-engine',
    name: 'PERM Newspaper Resolution Engine',
    package: '@case-support/api',
    tier: 'BACKEND',
    entryPoint: 'apps/api/src/services/newspaper/resolutionEngine.ts',
    summary: 'Motor hierárquico em 3 camadas para determinação legal de jornais de maior circulação (AIE).',
    description: 'Implementa as regras de 20 CFR § 656.3 e § 656.17(e). Resolve CBSA/MSA (Tier 1), jornais de condado (Tier 2) e exceção rural por fórmula de Haversine até 50 milhas (Tier 3).',
    port: 4000,
    routes: ['/api/newspapers/resolve', '/api/newspapers/cbsa/:cbsaCode'],
    envVars: [],
    storage: {
      type: 'None',
      description: 'Opera com bases do Censo dos EUA e catálogos metropolitanos carregados em memória'
    },
    fallbacks: 'Se o backend estiver offline ou inacessível, o módulo web suporta fallback de resolução geográfica local instantânea.',
    tags: ['perm', 'cbsa', 'newspaper', 'haversine', 'dol', 'regulations']
  },
  {
    id: 'case-service',
    name: 'Case Management Service',
    package: '@case-support/api',
    tier: 'BACKEND',
    entryPoint: 'apps/api/src/routes/cases.ts',
    summary: 'Gerenciamento de casos de imigração, vínculos de suporte/gerente e fases do processo.',
    description: 'Controla a listagem, detalhamento, filtros e status operacionais de casos (fases A, B e C: DOL PERM, USCIS I-140 e AOS/Green Card).',
    port: 4000,
    routes: ['/api/cases', '/api/cases/:id', '/api/cases/:id/timeline'],
    envVars: [
      { name: 'DATABASE_URL', scope: 'api', required: true, defaultValue: 'file:./dev.db', description: 'String de conexão Prisma com o banco de dados SQLite' }
    ],
    storage: {
      type: 'SQLite',
      keys: ['dev.db'],
      description: 'Armazena instâncias de Case, CaseChecklistProgress e vínculos de usuários'
    },
    fallbacks: 'Se a conexão com o banco SQLite falhar, o Fastify retorna 500 com diagnóstico de saúde degradado.',
    tags: ['cases', 'immigration', 'eb3', 'i140', 'dol', 'prisma']
  },
  {
    id: 'checklist-sla-engine',
    name: 'Checklist & SLA Engine',
    package: '@case-support/api',
    tier: 'BACKEND',
    entryPoint: 'apps/api/src/routes/checklists.ts',
    summary: 'Motor de esteira de tarefas e validação de checklist de conformidade por caso.',
    description: 'Controla a execução de etapas do processo (ETA-9141, Recrutamento, ETA-9089, I-140), atribuição de papéis (Intake, Case Support, Legal) e aprovação de gerência.',
    port: 4000,
    routes: ['/api/checklists/templates', '/api/cases/:caseId/checklists', '/api/cases/:caseId/checklists/:progressId/toggle'],
    envVars: [
      { name: 'DATABASE_URL', scope: 'api', required: true, defaultValue: 'file:./dev.db', description: 'String de conexão SQLite para persistência de progresso' }
    ],
    storage: {
      type: 'SQLite',
      keys: ['dev.db'],
      description: 'Modelos ChecklistTemplate e CaseChecklistProgress'
    },
    fallbacks: 'Operações em transação atômica revertem em caso de conflito de concorrência ou papel não autorizado.',
    tags: ['checklists', 'sla', 'compliance', 'workflow', 'roles']
  },
  {
    id: 'priority-tasks-service',
    name: 'Priority Tasks Service',
    package: '@case-support/api',
    tier: 'BACKEND',
    entryPoint: 'apps/api/src/routes/priorityTasks.ts',
    summary: 'Fila de tarefas urgentes e itens operacionais que demandam ação imediata.',
    description: 'Agrega prazos críticos de casos (SLA expirando em menos de 10 dias, pendências de aprovação jurídica e requisições RFE/RFI).',
    port: 4000,
    routes: ['/api/priority-tasks', '/api/priority-tasks/stats'],
    envVars: [
      { name: 'DATABASE_URL', scope: 'api', required: true, defaultValue: 'file:./dev.db', description: 'String de conexão do SQLite' }
    ],
    storage: {
      type: 'SQLite',
      keys: ['dev.db'],
      description: 'Modelos CaseCustomTask e CaseChecklistProgress pendentes'
    },
    fallbacks: 'Ordenação padrão por data limite ascendente em caso de falha de filtro customizado.',
    tags: ['tasks', 'priority', 'sla', 'urgency', 'workflow']
  },
  {
    id: 'sop-knowledge-service',
    name: 'SOP Engine & Knowledge Server',
    package: '@case-support/api',
    tier: 'BACKEND',
    entryPoint: 'apps/api/src/routes/sops.ts',
    summary: 'Servidor de nós do fluxograma SOP e documentação operacional em Markdown.',
    description: 'Fornece a estrutura de nós, conexões de dependência e descritivos técnicos de cada procedimento operacional padrão (SOP) das petições.',
    port: 4000,
    routes: ['/api/sops', '/api/sops/:id', '/api/sops/categories'],
    envVars: [],
    storage: {
      type: 'None',
      description: 'Catálogo tipado em código e esquemas em memória'
    },
    fallbacks: 'Frontend armazena cópia estática empacotada dos nós para renderização imediata do fluxograma se a API demorar.',
    tags: ['sops', 'knowledge', 'flowchart', 'documentation', 'markdown']
  },
  {
    id: 'calculator-service',
    name: 'PERM Timeline Calculator Service',
    package: '@case-support/api',
    tier: 'BACKEND',
    entryPoint: 'apps/api/src/routes/calculator.ts',
    summary: 'Calculadora determinística de prazos regulatórios do DOL para processo PERM.',
    description: 'Calcula datas de início/fim de SWA Job Order, anúncios em jornais de domingo, período de resguardo (30-day cooling off) e janela válida para submissão do ETA-9089.',
    port: 4000,
    routes: ['/api/calculator/perm-schedule'],
    envVars: [],
    storage: {
      type: 'None',
      description: 'Cálculo algorítmico puro sem dependência de persistência'
    },
    fallbacks: 'Algoritmo espelhado no frontend permite recálculo instantâneo sem chamadas de rede adicionais.',
    tags: ['calculator', 'perm', 'deadlines', 'dol', 'dates']
  },
  {
    id: 'prisma-database-layer',
    name: 'Prisma Persistence & Database Layer',
    package: '@case-support/database',
    tier: 'DATABASE',
    entryPoint: 'packages/database/src/index.ts',
    summary: 'ORM Prisma configurado com driver SQLite para persistência local de dados.',
    description: 'Centraliza esquemas relacionais, migrações determinísticas e scripts de seeding (`prisma/seed.ts`) com inicialização segura de clientes Prisma globais.',
    envVars: [
      { name: 'DATABASE_URL', scope: 'api', required: true, defaultValue: 'file:./dev.db', description: 'Caminho absoluto ou relativo para o arquivo SQLite de desenvolvimento' }
    ],
    storage: {
      type: 'SQLite',
      keys: ['dev.db', 'dev.db-journal'],
      description: 'Banco de dados SQLite transacional local no disco'
    },
    fallbacks: 'Usa padrão global singleton para evitar vazamento de conexões durante hot-reload no Fastify.',
    tags: ['database', 'prisma', 'sqlite', 'orm', 'migrations', 'seeder']
  },
  {
    id: 'shared-contracts-layer',
    name: 'Shared Schema & Type Contracts',
    package: '@case-support/shared-types',
    tier: 'CONTRACTS',
    entryPoint: 'packages/shared-types/src/index.ts',
    summary: 'Contratos tipados TypeScript e esquemas Zod compartilhados entre API e Web.',
    description: 'Assegura consistência de ponta a ponta para casos, usuários, resolução de jornais e progresso de checklists, prevenindo desvios de contrato em tempo de compilação.',
    envVars: [],
    storage: {
      type: 'None',
      description: 'Tipagem estática em tempo de compilação sem impacto de runtime'
    },
    fallbacks: 'Compilação estrita com `tsc --noEmit` bloqueia builds caso ocorra incompatibilidade entre pacotes.',
    tags: ['types', 'contracts', 'zod', 'typescript', 'shared']
  },
  {
    id: 'pdf-merger-worker',
    name: 'PDF Merger Web Worker & Outlines',
    package: '@case-support/web',
    tier: 'FRONTEND',
    entryPoint: 'apps/web/src/components/utilities/pdf-merger/workers/pdf-merge.worker.ts',
    summary: 'Thread dedicada de segundo plano para junção de PDFs e imagens com divisores.',
    description: 'Processa mesclagem de arquivos pesados fora da thread principal do React, convertendo imagens para PDF, padronizando tamanho A4 e inserindo marcadores (bookmarks).',
    envVars: [],
    storage: {
      type: 'IndexedDB',
      keys: ['casesupport_pdf_merger_db', 'casesupport_pdf_merger_saved_order_v1'],
      description: 'IndexedDB para histórico de lotes (<50MB) e localStorage para ordem persistente'
    },
    fallbacks: 'Se o arquivo exceder o limite seguro de memória de 50MB, armazena apenas metadados e avisa o usuário.',
    tags: ['pdf', 'web-worker', 'indexeddb', 'localStorage', 'concurrency']
  },
  {
    id: 'utilities-hub',
    name: 'Central Utilities Hub',
    package: '@case-support/web',
    tier: 'FRONTEND',
    entryPoint: 'apps/web/src/components/utilities/UtilitiesView.tsx',
    summary: 'Hub de ferramentas auxiliares operacionais (PDFs, templates, tradução e textos).',
    description: 'Fornece seis utilitários autônomos: Mesclador de PDFs, Trocador de Páginas, Gerador de Descrição de Casos, Quebrador de Texto, Tradução de Formulários e Políticas.',
    envVars: [],
    storage: {
      type: 'localStorage',
      keys: ['casesupport_pdf_merger_saved_order_v1', 'casesupport_pdf_merger_batch_metadata_v1'],
      description: 'localStorage para persistência de ordem, históricos e preferências de UI'
    },
    fallbacks: 'Totalmente desacoplado do backend interno; acessível mesmo sem autenticação de rede corporativa.',
    tags: ['utilities', 'pdf-merger', 'page-swapper', 'text-splitter', 'tools']
  },
  {
    id: 'dev-atlas',
    name: 'Dev Atlas & Diagnostics Environment',
    package: '@case-support/web',
    tier: 'FRONTEND',
    entryPoint: 'apps/web/src/components/dev/DevView.tsx',
    summary: 'Painel de diagnóstico, testes de motor, feature flags e integridade do sistema.',
    description: 'Aba protegida do desenvolvedor com verificação de saúde da API, teste interativo da resolução PERM, seletor de feature flags, seeder de banco e guia de serviços.',
    envVars: [
      { name: 'DEV', scope: 'web', required: false, defaultValue: 'true', description: 'Flag de runtime do Vite indicando ambiente de desenvolvimento' },
      { name: 'MODE', scope: 'web', required: false, defaultValue: 'development', description: 'Modo de execução do bundler Vite' }
    ],
    storage: {
      type: 'localStorage',
      keys: ['casesupport_dev_auth', 'casesupport_feature_flags'],
      description: 'Persistência de status do modo dev e flags de teste locais'
    },
    fallbacks: 'Pode ser desbloqueado via atalho `Ctrl+Shift+D` ou query param `?dev=true`.',
    tags: ['dev', 'diagnostics', 'health', 'flags', 'seeder', 'atlas']
  },
  {
    id: 'flowchart-engine',
    name: 'Interactive SOP Flowchart Engine',
    package: '@case-support/web',
    tier: 'FRONTEND',
    entryPoint: 'apps/web/src/components/flowchart/SopFlowchartView.tsx',
    summary: 'Motor de renderização de fluxogramas em SVG vetorial interativo com zoom e pan.',
    description: 'Renderiza as conexões e fases de petições EB-3 / PERM / I-140 com nós interativos, barra lateral de procedimentos detalhados e sincronização com a busca global.',
    envVars: [],
    storage: {
      type: 'localStorage',
      keys: ['casesupport_theme_mode', 'casesupport_high_contrast'],
      description: 'Preferências de contraste e tema aplicadas ao canvas SVG'
    },
    fallbacks: 'Renderiza estado offline imediatamente usando definições em cache local.',
    tags: ['flowchart', 'svg', 'interactive', 'sops', 'visual']
  },
  {
    id: 'global-search',
    name: 'Global Search Subsystem',
    package: '@case-support/web',
    tier: 'FRONTEND',
    entryPoint: 'apps/web/src/components/search/GlobalSearchModal.tsx',
    summary: 'Barra de busca global instantânea ativada por atalho de teclado (Ctrl+K).',
    description: 'Indexador client-side de alta performance que pesquisa transversalmente por fases, passos de checklist, documentações oficiais e manuais do Learn.',
    envVars: [],
    storage: {
      type: 'None',
      description: 'Índice montado em memória na inicialização do aplicativo'
    },
    fallbacks: 'Degrada suavemente se termos não forem encontrados sem travar a interface do usuário.',
    tags: ['search', 'keyboard-shortcut', 'indexing', 'navigation']
  }
];
