import { StateSwaInfo } from './types.js';
import { USA_SWA_STATES_PART1 } from './usaSwaDataPart1.js';
import { USA_SWA_STATES_PART2 } from './usaSwaDataPart2.js';

export const USA_SWA_STATES: Record<string, StateSwaInfo> = {
  ...USA_SWA_STATES_PART1,
  ...USA_SWA_STATES_PART2
};

export const ALL_SWA_LIST: StateSwaInfo[] = Object.values(USA_SWA_STATES).sort((a, b) =>
  a.name.localeCompare(b.name)
);
