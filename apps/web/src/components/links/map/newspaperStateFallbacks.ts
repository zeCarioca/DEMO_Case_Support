import { SundayNewspaperInfo } from './types.js';
import { STATE_PRIMARY_NEWSPAPERS_PART1 } from './newspaperStateFallbacksPart1.js';
import { STATE_PRIMARY_NEWSPAPERS_PART2 } from './newspaperStateFallbacksPart2.js';

export const STATE_PRIMARY_NEWSPAPERS: Record<string, Omit<SundayNewspaperInfo, 'stateCode' | 'stateName'>> = {
  ...STATE_PRIMARY_NEWSPAPERS_PART1,
  ...STATE_PRIMARY_NEWSPAPERS_PART2
};
