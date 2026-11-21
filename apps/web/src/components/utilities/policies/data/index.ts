import { PolicyDocument } from './policyTypes.js';
import { FIN_005_POLICY } from './fin005Data.js';
import { CLIENT_COMMUNICATION_POLICY } from './clientCommunicationData.js';

export * from './policyTypes.js';
export * from './fin005Data.js';
export * from './clientCommunicationData.js';

export const FIRM_POLICIES: PolicyDocument[] = [
  CLIENT_COMMUNICATION_POLICY,
  FIN_005_POLICY
];
