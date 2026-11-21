import type { CatalogNewspaper } from './ruralPublications.js';
import { RURAL_PUBLICATIONS } from './ruralPublications.js';
import { METRO_CATALOG_EAST } from './metroCatalogEast.js';
import { METRO_CATALOG_CENTRAL } from './metroCatalogCentral.js';
import { METRO_CATALOG_WEST } from './metroCatalogWest.js';

export type { CatalogNewspaper };

export const METRO_NEWSPAPER_CATALOG: CatalogNewspaper[] = [
  ...METRO_CATALOG_EAST,
  ...METRO_CATALOG_CENTRAL,
  ...METRO_CATALOG_WEST
];

export const NEWSPAPER_CATALOG: CatalogNewspaper[] = [
  ...METRO_NEWSPAPER_CATALOG,
  ...RURAL_PUBLICATIONS
];
