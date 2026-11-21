import { AppTab } from '../Header.js';

export interface TabGuideItem {
  id: AppTab;
  tabNumber: string;
  command: string;
  badge: { en: string; pt: string };
  title: { en: string; pt: string };
  problem: { en: string; pt: string };
  solution: { en: string; pt: string };
  techTags: string[];
}

export const TAB_GUIDE_DATA: TabGuideItem[] = [
  {
    id: 'flowchart',
    tabNumber: '01',
    command: 'sop_flowchart --lanham-act --statutory-dates',
    badge: { en: 'Visual State Machine', pt: 'Máquina de Estados Visual' },
    title: { en: 'USPTO Trademark SOP & Docketing Flow', pt: 'Fluxograma SOP USPTO de Registro de Marcas' },
    problem: {
      en: 'Law firms frequently lose active trademark rights due to staff missing statutory deadlines (Lanham Act § 1(b) 6-month ITU windows, § 2(d) 3-month Office Action deadlines, and Gazette 30-day opposition periods).',
      pt: 'Escritórios frequentemente perdem direitos de marcas porque a equipe perde prazos legais fatais (prazos de 6 meses de ITU § 1(b), 3 meses para resposta a Office Actions § 2(d) e 30 dias de oposição no Gazette).'
    },
    solution: {
      en: 'An interactive state machine and node-based SOP breaking down all 7 statutory phases into actionable steps with Nice classification guidance, SLA rules, and dynamic drawer navigation.',
      pt: 'Uma máquina de estados visual e interativa que desmembra as 7 fases estatutárias em passos práticos com classificação Nice, regras de SLA e gaveta dinâmica de detalhes.'
    },
    techTags: ['React State Machine', 'Nice Classes 009/042', 'Dynamic Drawer', 'TMEP Rules']
  },
  {
    id: 'learn',
    tabNumber: '02',
    command: 'knowledge_base --query=protocols --deep-link',
    badge: { en: 'Searchable Repository', pt: 'Repositório Pesquisável' },
    title: { en: 'Knowledge Base & Protocol Manuals', pt: 'Base de Conhecimento & Protocolos' },
    problem: {
      en: 'Filing checklists, evidence standards, and specimen rules are traditionally trapped in unorganized Drive folders and personal emails, causing inconsistent filings and slow junior onboarding.',
      pt: 'Checklists de protocolo, padrões de prova e regras de espécimes ficam isolados em pastas dispersas no Drive e e-mails pessoais, gerando erros e lentidão no onboarding.'
    },
    solution: {
      en: 'A centralized, searchable procedural repository with verified checklists, specimen compliance guides, and deep-linking directly into corresponding SOP flowchart phases.',
      pt: 'Repositório centralizado e pesquisável com checklists verificados, guias de espécimes e links diretos para cada fase correspondente do fluxograma SOP.'
    },
    techTags: ['Deep Linking', 'Search Filtering', 'Filing Checklists', 'Responsive Drawers']
  },
  {
    id: 'utilities',
    tabNumber: '03',
    command: 'legal_toolkit --client-side-only --zero-leak',
    badge: { en: '100% Client-Side Engine', pt: 'Processamento 100% Local' },
    title: { en: 'Legal Operations & Document Utilities', pt: 'Central de Utilitários Jurídicos' },
    problem: {
      en: 'Paralegals waste hours manually assembling exhibit dividers, swapping signature pages across 50-page PDFs, and using risky online converters that leak confidential trade secrets.',
      pt: 'Paralegais perdem horas montando divisores de exhibits, trocando páginas de assinatura em PDFs extensos e usando sites não seguros que vazam segredos comerciais.'
    },
    solution: {
      en: 'Zero-leak, 100% client-side WebAssembly and pdf-lib utilities for batch merging, single-page replacement, 41-char text formatting, and instant docket block generation with realistic demo runners.',
      pt: 'Utilitários 100% no navegador (pdf-lib e Web Workers) para mesclagem em lote, substituição isolada de páginas, formatação em caixas de 41 caracteres e gerador de docket com demonstração interativa.'
    },
    techTags: ['pdf-lib', 'Web Workers', 'Zero-Upload Privacy', 'Procedural PDF Engine']
  },
  {
    id: 'links',
    tabNumber: '04',
    command: 'portals_matrix --uspto-tsdr --wipo-madrid',
    badge: { en: 'Official Portals Matrix', pt: 'Matriz de Portais Oficiais' },
    title: { en: 'Official Registries & External Portals', pt: 'Portais Oficiais & Tribunais' },
    problem: {
      en: 'Attorneys and docketing clerks constantly juggle dozens of separate government portals (USPTO TSDR, WIPO Madrid, TTAB, TESS) with bookmark drift and broken links.',
      pt: 'Advogados e docketing specialists precisam alternar constantemente entre dezenas de portais governamentais dispersos com links quebrados e páginas desatualizadas.'
    },
    solution: {
      en: 'A curated directory and jurisdiction matrix of verified USPTO, WIPO, federal courts, and regional patent/trademark offices with direct docket query integrations.',
      pt: 'Diretório curado e matriz de jurisdições verificadas de órgãos como USPTO, WIPO, tribunais federais e escritórios regionais com links diretos para consultas.'
    },
    techTags: ['Curated Matrix', 'Madrid Protocol', 'Government Portals', 'Quick Navigation']
  },
  {
    id: 'dev',
    tabNumber: '05',
    command: 'architecture_console --telemetry --security-audit',
    badge: { en: 'Engineering Architecture', pt: 'Arquitetura de Software' },
    title: { en: 'Developer & Architecture Console', pt: 'Console do Desenvolvedor (.dev)' },
    problem: {
      en: 'Technical hiring managers rarely get to inspect real code metrics, monorepo boundaries, supply chain hygiene, and test gates from a live production frontend.',
      pt: 'Recrutadores técnicos raramente conseguem auditar métricas reais de monorepo, segurança de dependências e testes a partir de uma aplicação em produção.'
    },
    solution: {
      en: 'An interactive architecture console displaying Turborepo workspace topology, zero-leak verification proof, bundle analytics, and TypeScript strict safety metrics.',
      pt: 'Console interativo que exibe a topologia do monorepo Turborepo, provas de auditoria de zero vazamento, análise de bundle e conformidade estrita com TypeScript.'
    },
    techTags: ['Turborepo', 'TypeScript Strict', 'Monorepo Architecture', 'CI/CD Gates']
  }
];
