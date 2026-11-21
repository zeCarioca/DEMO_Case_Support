export type UtilityId =
  | 'case-description-template'
  | 'forms-translations'
  | 'policies-procedures'
  | 'text-splitter'
  | 'pdf-merger'
  | 'page-swapper'
  | 'uscis-fees'
  | 'dol-queues'
  | 'gis-checker';

export interface UtilityCardMeta {
  id: UtilityId;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  status: 'active' | 'coming_soon';
  badgeText?: string;
  estimatedTime?: string;
}

export type ScheduleCategory = 'all' | 'forms' | 'translations' | 'foia_special';

export type ScheduleUnit =
  | 'por beneficiário'
  | 'por página'
  | 'por print'
  | 'por formulário'
  | 'por form'
  | 'fixo'
  | 'por marca'
  | 'por classe'
  | 'por documento'
  | 'por certificado'
  | 'por espécime'
  | 'por instrumento'
  | 'por contrato'
  | 'por despacho'
  | 'por pedido'
  | 'por registro'
  | 'por requerimento'
  | 'por processo';

export interface ScheduleVariant {
  id: string;
  label: string;
  hours: number;
}

export interface ScheduleItem {
  id: string;
  code: string;
  name: string;
  category: 'forms' | 'translations' | 'foia_special';
  defaultHours: number;
  unit: ScheduleUnit;
  notes?: string;
  variableRange?: string;
  variants?: ScheduleVariant[];
}

export interface CalculatorEntry {
  id: string;
  item: ScheduleItem;
  quantity: number;
  selectedVariantId?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  isLeader?: boolean;
}
