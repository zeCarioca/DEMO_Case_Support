import { Language } from './types.js';

export const TRANSLATION_STRINGS: Record<Language, Record<string, string>> = {
  en: {
    // Brand & Header
    'brand.title': 'Apex IP & Tech Law',
    'brand.badge': 'USPTO Docketing SOP',
    'brand.tagline': 'Intellectual Property Practice • Sarah Jenkins, Esq.',
    'brand.demoBadge': 'Recruiter Demo Mode',
    'nav.flowchart': 'Trademark SOP Flowchart',
    'nav.learn': 'IP Knowledge Base',
    'nav.utilities': 'Utilities Hub',
    'nav.links': 'USPTO & WIPO Portals',
    'nav.dev': 'Dev Atlas',
    'nav.search': 'Search Steps, Forms & Dockets...',
    'nav.langToggle': 'Switch language (EN / PT)',
    
    // Footer
    'footer.firm': 'Apex IP & Tech Law Group',
    'footer.attorney': 'Sarah Jenkins, Esq. (NY BAR 1234567)',
    'footer.phone': '(212) 555-0198',
    'footer.email': 'docket@apextechlaw.com',
    'footer.uspto': 'USPTO TSDR Portal',
    'footer.wipo': 'WIPO Madrid Monitor',
    'footer.tess': 'USPTO Trademark Search',

    // Utilities Hub
    'hub.title': 'Legal Operations & Utility Hub',
    'hub.subtitle': 'Auxiliary tools, docketing calculators, and SLA reference tables supporting the trademark prosecution workflow at Apex IP & Tech Law Group.',
    'hub.badgeActive': 'Interactive Toolkit',
    'hub.back': 'Back to Utilities Hub',
    'hub.card.pageSwapper.title': 'Page Swapper (Signature Replacement)',
    'hub.card.pageSwapper.subtitle': 'Isolated Signature Page Replacement with Canvas Preview',
    'hub.card.pageSwapper.desc': 'Swap out signature or declaration pages on TEAS filings or legal briefs without touching other pages. 100% client-side memory management.',
    'hub.card.pdfMerger.title': 'PDF Batch Merger & Exhibit Divider',
    'hub.card.pdfMerger.subtitle': 'Drag & Drop Assembly with Official Exhibit Dividers',
    'hub.card.pdfMerger.desc': 'Organize trademark specimen exhibits (A-D+), combine multiple PDFs client-side with document outlines and zero cloud upload.',
    'hub.card.caseTemplate.title': 'Trademark Docketing Note Generator',
    'hub.card.caseTemplate.subtitle': 'Standardized Matter Notes & Interactive Triage Generator',
    'hub.card.caseTemplate.desc': 'Standardize USPTO trademark case notes for immediate 5-second docketing triage. Features auto-null omission, presets, and live output.',
    'hub.card.textSplitter.title': '41-Character Box Formatter',
    'hub.card.textSplitter.subtitle': 'Text Block Divider with Hyphenated Word Breaks',
    'hub.card.textSplitter.desc': 'Formats long goods & services descriptions and identification clauses into standard 41-character boxes with single and batch copy.',
    'hub.card.formsTranslations.title': 'Docketing & Translation Team SLA',
    'hub.card.formsTranslations.subtitle': 'SLA Timelines, TEAS/WIPO Forms & Hours Calculator',
    'hub.card.formsTranslations.desc': 'Operational guidelines, Paris Convention § 44d priority certs, Madrid Protocol filings, and interactive hours calculator per matter.',
    'hub.card.policies.title': 'Operating Policies & Compliance',
    'hub.card.policies.subtitle': 'Docketing Retention & Client Communication Protocol',
    'hub.card.policies.desc': 'Official firm guidelines for statutory docketing deadlines, specimen verification, and client communications.',

    // Common actions
    'action.copy': 'Copy',
    'action.copied': 'Copied to Clipboard!',
    'action.reset': 'Reset',
    'action.save': 'Save',
    'action.export': 'Export',

    // Demonstrations
    'demo.run': 'Run demonstration',
    'demo.loading': 'Generating mock documents...',
    'demo.loadedMerger': '3 USPTO demonstration documents loaded into queue!',
    'demo.loadedSwapper': 'Agreement (3 pages) & signed execution page loaded!'
  },
  pt: {
    // Brand & Header
    'brand.title': 'Apex IP & Tech Law',
    'brand.badge': 'SOP de Registro USPTO',
    'brand.tagline': 'Propriedade Intelectual • Sarah Jenkins, Esq.',
    'brand.demoBadge': 'Modo Demonstração Recrutador',
    'nav.flowchart': 'Fluxograma SOP Marcas',
    'nav.learn': 'Base de Conhecimento PI',
    'nav.utilities': 'Central de Utilitários',
    'nav.links': 'Portais USPTO & WIPO',
    'nav.dev': 'Dev Atlas',
    'nav.search': 'Buscar Passos, Formulários & Marcas...',
    'nav.langToggle': 'Alternar idioma (PT / EN)',
    
    // Footer
    'footer.firm': 'Apex IP & Tech Law Group',
    'footer.attorney': 'Sarah Jenkins, Esq. (NY BAR 1234567)',
    'footer.phone': '(212) 555-0198',
    'footer.email': 'docket@apextechlaw.com',
    'footer.uspto': 'Portal USPTO TSDR',
    'footer.wipo': 'Monitor WIPO Madrid',
    'footer.tess': 'Busca de Marcas USPTO',

    // Utilities Hub
    'hub.title': 'Central de Utilitários Jurídicos',
    'hub.subtitle': 'Ferramentas auxiliares, calculadoras de prazos e tabelas de referência de SLA para suporte aos processos de marcas e PI da Apex IP & Tech Law Group.',
    'hub.badgeActive': 'Toolkit Interativo',
    'hub.back': 'Voltar à Central de Utilitários',
    'hub.card.pageSwapper.title': 'Page Swapper (Substituidor de Páginas)',
    'hub.card.pageSwapper.subtitle': 'Troca de Folhas de Assinatura com Preview Isolado',
    'hub.card.pageSwapper.desc': 'Substitua a página de declaração ou assinatura em formulários TEAS sem alterar as demais. Processamento 100% no cliente.',
    'hub.card.pdfMerger.title': 'Mesclador de PDFs & Divisor de Exhibits',
    'hub.card.pdfMerger.subtitle': 'Organização Drag & Drop com Divisores Oficiais de Exhibit',
    'hub.card.pdfMerger.desc': 'Organize provas de uso (specimens) e exhibits (A-D+), mescle PDFs localmente com marcadores/outlines e zero upload de dados.',
    'hub.card.caseTemplate.title': 'Gerador de Notas de Docketing de Marcas',
    'hub.card.caseTemplate.subtitle': 'Notas Padronizadas & Gerador Interativo de Triagem',
    'hub.card.caseTemplate.desc': 'Padronize resumos de casos de marcas perante o USPTO para triagem em 5 segundos. Com omissão de campos nulos e presets.',
    'hub.card.textSplitter.title': 'Formatador de Caixas (41 Chars)',
    'hub.card.textSplitter.subtitle': 'Divisor de Texto com Quebra Hifenizada (-)',
    'hub.card.textSplitter.desc': 'Formata especificações de produtos/serviços e descrições longas em caixas de 41 caracteres com cópia individual ou em lote.',
    'hub.card.formsTranslations.title': 'Equipe de Prazos & Traduções de PI',
    'hub.card.formsTranslations.subtitle': 'Tabela de SLA, Formulários TEAS/WIPO e Calculadora',
    'hub.card.formsTranslations.desc': 'Diretrizes de prioridade da Convenção de Paris (§ 44d), Protocolo de Madrid, formulários TEAS e calculadora interativa de horas.',
    'hub.card.policies.title': 'Políticas Operacionais & Compliance',
    'hub.card.policies.subtitle': 'Controle de Prazos Fatais e Comunicação com Clientes',
    'hub.card.policies.desc': 'Normas do escritório para compliance de prazos de Office Action, auditoria de espécimes de uso e comunicação corporativa.',

    // Common actions
    'action.copy': 'Copiar',
    'action.copied': 'Copiado para a Área de Transferência!',
    'action.reset': 'Redefinir',
    'action.save': 'Salvar',
    'action.export': 'Exportar',

    // Demonstrations
    'demo.run': 'Executar demonstração',
    'demo.loading': 'Gerando documentos de teste...',
    'demo.loadedMerger': '3 documentos USPTO de demonstração carregados na fila!',
    'demo.loadedSwapper': 'Contrato (3 páginas) e folha assinada carregados!'
  }
};
