import { z } from 'zod';
import { ProcessPhaseSchema, ChecklistItemStateSchema } from './sops.js';

export const Eb3CategorySchema = z.enum([
  'SKILLED_WORKER',      // At least 2 years training/experience
  'PROFESSIONAL',         // U.S. baccalaureate or foreign equivalent
  'OTHER_WORKERS'         // Less than 2 years experience (unskilled, non-seasonal)
]);
export type Eb3Category = z.infer<typeof Eb3CategorySchema>;

export const CaseStatusSchema = z.enum([
  'INTAKE',
  'PWD_PENDING',
  'RECRUITMENT_ACTIVE',
  'QUIET_PERIOD',
  'ETA9089_DRAFTING',
  'ETA9089_PENDING_DOL',
  'PERM_AUDIT_RFI',
  'PERM_CERTIFIED',
  'I140_DRAFTING',
  'I140_REVIEW_CM',
  'I140_REVIEW_LEGAL',
  'I140_WAITING_FINANCE_CHECKS',
  'I140_FILED_PENDING_RECEIPT',
  'I140_APPROVED',
  'AOS_FILED',
  'COMPLETED',
  'DENIED'
]);
export type CaseStatus = z.infer<typeof CaseStatusSchema>;

export const CaseRecordSchema = z.object({
  id: z.string(),
  caseNumber: z.string(), // Firm internal code e.g. USA-2026-0042
  clientName: z.string(), // Beneficiary name
  sponsorName: z.string(), // Employer legal name
  jobTitle: z.string(),
  socCode: z.string().optional(), // O*NET / SOC code e.g. 15-1252.00
  eb3Category: Eb3CategorySchema,
  currentPhase: ProcessPhaseSchema,
  status: CaseStatusSchema,
  
  // External system reference links
  googleDriveUrl: z.string().url().optional(),
  flagCaseNumber: z.string().optional(),
  
  // Key critical dates
  pwdSubmissionDate: z.string().optional(),
  pwdIssuedDate: z.string().optional(),
  pwdExpirationDate: z.string().optional(),
  recruitmentStartDate: z.string().optional(),
  recruitmentEndDate: z.string().optional(),
  permCertificationDate: z.string().optional(),
  permExpirationDate: z.string().optional(), // 180 days from certification
  priorityDate: z.string().optional(),
  
  // Assignees
  caseSupportId: z.string().optional(),
  caseSupportName: z.string().optional(),
  caseManagerId: z.string().optional(),
  caseManagerName: z.string().optional(),
  attorneyName: z.string().default('Eleanor Vance, Esq.'),
  
  // Live Checklist Items
  checklists: z.array(ChecklistItemStateSchema).default([]),
  customTasks: z.array(z.lazy(() => CaseCustomTaskSchema)).default([]),
  
  createdAt: z.string(),
  updatedAt: z.string()
});
export type CaseRecord = z.infer<typeof CaseRecordSchema>;

export const CaseCustomTaskSchema = z.object({
  id: z.string(),
  caseId: z.string(),
  title: z.string(),
  assignedRole: z.string().default('CASE_SUPPORT'),
  criticalNote: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  completed: z.boolean().default(false),
  completedAt: z.string().nullable().optional(),
  isArchived: z.boolean().default(false),
  archivedAt: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});
export type CaseCustomTask = z.infer<typeof CaseCustomTaskSchema>;

export const CreateCaseInputSchema = CaseRecordSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  checklists: true,
  customTasks: true
}).partial({
  status: true,
  currentPhase: true,
  attorneyName: true
});
export type CreateCaseInput = z.infer<typeof CreateCaseInputSchema>;

