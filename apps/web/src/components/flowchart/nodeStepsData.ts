import { CLEARANCE_STEPS, TEAS_FILING_STEPS, EXAMINATION_STEPS } from './nodeStepsClearance.js';
import { OFFICE_ACTION_STEPS, GAZETTE_STEPS, SOU_STEPS, MAINTENANCE_STEPS } from './nodeStepsProsecution.js';

export interface NodeStepItem {
  code: string;
  title: string;
  role: string;
  requiresApproval?: string;
  criticalNote?: string;
  detail?: string;
}

export const NODE_STEPS_MAP: Record<string, NodeStepItem[]> = {
  'node-clearance': CLEARANCE_STEPS,         // 8 steps
  'node-teas-filing': TEAS_FILING_STEPS,     // 12 steps
  'node-examination': EXAMINATION_STEPS,     // 6 steps
  'node-office-action': OFFICE_ACTION_STEPS, // 14 steps
  'node-gazette': GAZETTE_STEPS,             // 7 steps
  'node-sou': SOU_STEPS,                     // 10 steps
  'node-maintenance': MAINTENANCE_STEPS      // 8 steps
};
