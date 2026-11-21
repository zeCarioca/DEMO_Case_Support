import React from 'react';
import { FileCheck2, DollarSign, Hourglass, MapPin, BookOpen, Scissors, FileText, Files, Replace } from 'lucide-react';
import { UtilityCardMeta, UtilityId } from '../types.js';
import { UtilityCardItem } from './UtilityCardItem.js';
import { useLanguage } from '../../i18n/LanguageContext.js';

interface UtilityCardGridProps {
  onSelectUtility: (id: UtilityId) => void;
  onRunDemo?: (id: UtilityId) => void;
}

export const UtilityCardGrid: React.FC<UtilityCardGridProps> = ({ onSelectUtility, onRunDemo }) => {
  const { t, language } = useLanguage();

  const getCards = (): UtilityCardMeta[] => [
    {
      id: 'pdf-merger',
      title: t('hub.card.pdfMerger.title'),
      subtitle: t('hub.card.pdfMerger.subtitle'),
      description: t('hub.card.pdfMerger.desc'),
      category: language === 'pt' ? 'Documentos' : 'Documents',
      status: 'active',
      estimatedTime: language === 'pt' ? '100% Local' : '100% Client-Side'
    },
    {
      id: 'page-swapper',
      title: t('hub.card.pageSwapper.title'),
      subtitle: t('hub.card.pageSwapper.subtitle'),
      description: t('hub.card.pageSwapper.desc'),
      category: language === 'pt' ? 'Documentos' : 'Documents',
      status: 'active',
      estimatedTime: language === 'pt' ? '100% Local' : '100% Client-Side'
    },
    {
      id: 'case-description-template',
      title: t('hub.card.caseTemplate.title'),
      subtitle: t('hub.card.caseTemplate.subtitle'),
      description: t('hub.card.caseTemplate.desc'),
      category: language === 'pt' ? 'Ferramentas de Texto' : 'Text Tools',
      status: 'active',
      estimatedTime: language === 'pt' ? 'Gerador Interativo' : 'Interactive Generator'
    },
    {
      id: 'text-splitter',
      title: t('hub.card.textSplitter.title'),
      subtitle: t('hub.card.textSplitter.subtitle'),
      description: t('hub.card.textSplitter.desc'),
      category: language === 'pt' ? 'Ferramentas de Texto' : 'Text Tools',
      status: 'active',
      estimatedTime: language === 'pt' ? 'Formatador Interativo' : 'Interactive Formatter'
    },
    {
      id: 'forms-translations',
      title: t('hub.card.formsTranslations.title'),
      subtitle: t('hub.card.formsTranslations.subtitle'),
      description: t('hub.card.formsTranslations.desc'),
      category: language === 'pt' ? 'Equipes & Prazos' : 'Teams & Deadlines',
      status: 'active',
      estimatedTime: language === 'pt' ? 'SLA & Horas' : 'SLA & Hours'
    },
    {
      id: 'policies-procedures',
      title: t('hub.card.policies.title'),
      subtitle: t('hub.card.policies.subtitle'),
      description: t('hub.card.policies.desc'),
      category: language === 'pt' ? 'Políticas & Compliance' : 'Policies & Compliance',
      status: 'active',
      estimatedTime: language === 'pt' ? '2 Manuais Oficiais' : '2 Official Manuals'
    },
    {
      id: 'uscis-fees',
      title: language === 'pt' ? 'Tabela de Taxas USPTO' : 'USPTO Statutory Fee Schedule',
      subtitle: language === 'pt' ? 'Calculadora de Taxas Oficiais TEAS' : 'Official TEAS Filing Fee Calculator',
      description: language === 'pt'
        ? 'Estimativa consolidada de taxas federais para classes Nice 001-045, pedidos TEAS Plus/Standard e renovações Section 8/9.'
        : 'Consolidated federal fee estimates for Nice Classes 001-045, TEAS Plus/Standard applications, and Section 8/9 renewals.',
      category: language === 'pt' ? 'Calculadoras' : 'Calculators',
      status: 'coming_soon'
    },
    {
      id: 'dol-queues',
      title: language === 'pt' ? 'Prazos de Exame USPTO' : 'USPTO Examination Wait Times',
      subtitle: language === 'pt' ? 'Monitoramento de Atribuição de Examinador' : 'Examining Attorney Assignment Tracker',
      description: language === 'pt'
        ? 'Acompanhamento do tempo médio até o primeiro despacho (First Action) e prazos estatutários do Trademark Trial and Appeal Board.'
        : 'Tracking average pendency to First Action and statutory response windows before the Trademark Trial and Appeal Board.',
      category: language === 'pt' ? 'Portais & Dados' : 'Portals & Data',
      status: 'coming_soon'
    },
    {
      id: 'gis-checker',
      title: language === 'pt' ? 'Jurisdição Madrid & WIPO' : 'Madrid & WIPO Jurisdiction Matrix',
      subtitle: language === 'pt' ? 'Designação de Países e Escritórios Nacionais' : 'Contracting Parties & Designated Offices',
      description: language === 'pt'
        ? 'Validação de extensão internacional de marcas via Escritório Internacional de Genebra para requerentes sediados nos EUA.'
        : 'Validation of international trademark extensions via the International Bureau in Geneva for US-based applicants.',
      category: language === 'pt' ? 'Portais & Dados' : 'Portals & Data',
      status: 'coming_soon'
    }
  ];

  const getCardIcon = (id: UtilityId) => {
    switch (id) {
      case 'pdf-merger':
        return <Files size={20} />;
      case 'page-swapper':
        return <Replace size={20} />;
      case 'case-description-template':
        return <FileText size={20} />;
      case 'text-splitter':
        return <Scissors size={20} />;
      case 'forms-translations':
        return <FileCheck2 size={20} />;
      case 'policies-procedures':
        return <BookOpen size={20} />;
      case 'uscis-fees':
        return <DollarSign size={20} />;
      case 'dol-queues':
        return <Hourglass size={20} />;
      case 'gis-checker':
        return <MapPin size={20} />;
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.25rem'
      }}
    >
      {getCards().map((card) => (
        <UtilityCardItem
          key={card.id}
          card={card}
          icon={getCardIcon(card.id)}
          onOpen={onSelectUtility}
          onRunDemo={onRunDemo}
        />
      ))}
    </div>
  );
};
