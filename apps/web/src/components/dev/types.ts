export type DevTabSection =
  | 'architecture'
  | 'perm-engine'
  | 'health'
  | 'perm-tester'
  | 'flags-env'
  | 'data-seeder'
  | 'services-docs';

export interface DevAccountStatus {
  userId: string;
  email: string;
  role: string;
  hasDevStatus: boolean;
  developerToken?: string;
  environment: 'development' | 'staging' | 'production';
  activatedVia: 'SHORTCUT' | 'QUERY_PARAM' | 'ACCOUNT_ROLE' | 'LOCAL_OVERRIDE';
  activatedAt: string;
}

export interface FeatureFlag {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'ENGINE' | 'UI' | 'PERM_AUDIT' | 'SECURITY';
}

export interface SystemHealthData {
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  latencyMs: number;
  apiPort: number;
  database: {
    connected: boolean;
    type: string;
    casesCount?: number;
    auditLogCount?: number;
  };
  timestamp: string;
}
