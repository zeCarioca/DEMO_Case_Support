import { ScheduleItem } from '../../types.js';
import { FORMS_DATA } from './formsData.js';
import { TRANSLATIONS_DATA } from './translationsData.js';
import { FOIA_SPECIAL_DATA } from './foiaSpecialData.js';

export * from './formsData.js';
export * from './translationsData.js';
export * from './foiaSpecialData.js';
export * from './teamData.js';

export const ALL_SCHEDULE_ITEMS: ScheduleItem[] = [
  ...FORMS_DATA,
  ...TRANSLATIONS_DATA,
  ...FOIA_SPECIAL_DATA
];
