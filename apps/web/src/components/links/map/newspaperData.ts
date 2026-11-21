import { SundayNewspaperInfo } from './types.js';
import { SUNDAY_NEWSPAPERS_EAST } from './newspaperDataEast.js';
import { SUNDAY_NEWSPAPERS_SOUTH } from './newspaperDataSouth.js';
import { SUNDAY_NEWSPAPERS_CENTRAL } from './newspaperDataCentral.js';
import { SUNDAY_NEWSPAPERS_WEST } from './newspaperDataWest.js';

export const SUNDAY_NEWSPAPERS: SundayNewspaperInfo[] = [
  ...SUNDAY_NEWSPAPERS_EAST,
  ...SUNDAY_NEWSPAPERS_SOUTH,
  ...SUNDAY_NEWSPAPERS_CENTRAL,
  ...SUNDAY_NEWSPAPERS_WEST
];
