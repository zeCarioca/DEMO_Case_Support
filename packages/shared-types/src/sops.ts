import { z } from 'zod';
import { UserRoleSchema } from './user.js';

export const ProcessPhaseSchema = z.enum([
  'PHASE_A_DOL_PERM',
  'PHASE_B_USCIS_I140',
  'PHASE_C_GREEN_CARD_AOS',
  'SUBPROCESS_RFI_RFE'
]);
export type ProcessPhase = z.infer<typeof ProcessPhaseSchema>;

export const StepCategorySchema = z.enum([
  'INTAKE_TRIAGE',
  'JOB_DEFINITION_SOC',
  'PREVAILING_WAGE_ETA9141',
  'RECRUITMENT_COMPLIANCE',
  'ETA9089_FILING',
  'DOL_DECISION_AUDIT',
  'I140_PREPARATION',
  'PAYMENT_FINANCE',
  'FILING_SUBMISSION',
  'USCIS_RECEIPT_FOLLOWUP',
  'AOS_PREPARATION',
  'RFI_RFE_ROADMAP'
]);
export type StepCategory = z.infer<typeof StepCategorySchema>;

export const ChecklistItemTemplateSchema = z.object({
  id: z.string(),
  code: z.string(), // e.g. "PERM-01", "I140-12"
  title: z.string(),
  description: z.string().optional(),
  phase: ProcessPhaseSchema,
  category: StepCategorySchema,
  assignedRole: UserRoleSchema,
  requiresApprovalFrom: UserRoleSchema.optional(),
  order: z.number(),
  criticalNote: z.string().optional(),
  officialDocReference: z.string().optional()
});
export type ChecklistItemTemplate = z.infer<typeof ChecklistItemTemplateSchema>;

export const ChecklistItemStateSchema = z.object({
  templateId: z.string(),
  code: z.string(),
  title: z.string(),
  phase: ProcessPhaseSchema,
  completed: z.boolean().default(false),
  completedAt: z.string().optional(),
  completedByUserId: z.string().optional(),
  completedByUserName: z.string().optional(),
  approved: z.boolean().optional(),
  approvedAt: z.string().optional(),
  approvedByUserId: z.string().optional(),
  notes: z.string().optional(),
  assignedRole: UserRoleSchema,
  requiresApprovalFrom: UserRoleSchema.optional()
});
export type ChecklistItemState = z.infer<typeof ChecklistItemStateSchema>;

export const FlowNodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  phase: ProcessPhaseSchema,
  summary: z.string(),
  responsibilities: z.array(z.string()),
  criticalChecks: z.array(z.string()),
  officialLinks: z.array(z.object({
    label: z.string(),
    url: z.string()
  })),
  position: z.object({
    x: z.number(),
    y: z.number()
  })
});
export type FlowNode = z.infer<typeof FlowNodeSchema>;

export const PermRecruitmentTimelineSchema = z.object({
  jobOrderStartDate: z.string(), // Must be >= 30 days
  jobOrderEndDate: z.string(),
  sundayAd1Date: z.string(),
  sundayAd2Date: z.string(),
  nofStartDate: z.string(), // 10 business days
  nofEndDate: z.string(),
  additionalMethod1Date: z.string().optional(),
  additionalMethod2Date: z.string().optional(),
  additionalMethod3Date: z.string().optional(),
  latestRecruitmentDate: z.string(),
  quietPeriodEndDate: z.string(), // latestRecruitmentDate + 30 days
  earliestFilingDate: z.string(),
  latestFilingDate: z.string() // latestRecruitmentDate + 180 days
});
export type PermRecruitmentTimeline = z.infer<typeof PermRecruitmentTimelineSchema>;
