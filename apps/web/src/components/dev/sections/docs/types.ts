export type ServiceTier = 'ALL' | 'BACKEND' | 'DATABASE' | 'FRONTEND' | 'CONTRACTS';

export interface ServiceEnvVar {
  name: string;
  scope: 'api' | 'web' | 'shared';
  required: boolean;
  defaultValue?: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  package: string;
  tier: 'BACKEND' | 'DATABASE' | 'FRONTEND' | 'CONTRACTS';
  entryPoint: string;
  summary: string;
  description: string;
  port?: number;
  routes?: string[];
  envVars: ServiceEnvVar[];
  storage?: {
    type: 'localStorage' | 'IndexedDB' | 'SQLite' | 'Cookies' | 'None';
    keys?: string[];
    description: string;
  };
  fallbacks?: string;
  tags: string[];
}
