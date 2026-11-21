import { LearnItem } from './types.js';
import { LEARN_FORMS } from './learnFormsData.js';
import { LEARN_PROTOCOLS_AND_DOCS } from './learnProtocolsData.js';

export const LEARN_ITEMS: LearnItem[] = [
  ...LEARN_FORMS,
  ...LEARN_PROTOCOLS_AND_DOCS
];

export function getLearnItemById(id: string): LearnItem | undefined {
  return LEARN_ITEMS.find((it) => it.id === id);
}
