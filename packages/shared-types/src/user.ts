import { z } from 'zod';

export const UserRoleSchema = z.enum([
  'INTAKE',          // Initial triage, employer/beneficiary identification, legal status
  'CASE_SUPPORT',    // Preparador: gathers documents, drafts forms, tear sheets
  'CASE_MANAGER',    // Revisor independente: checks dates, cross-verifies source records
  'LEGAL',           // Revisão Jurídica: Managing Attorney & Partners, approval of roadmaps/filings
  'FINANCE',         // Departamento Financeiro: filing fee checks (Tuesdays/Thursdays)
  'ADMIN'            // Intranet supervisor / system admin
]);

export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  picture: z.string().nullable().optional(),
  role: UserRoleSchema,
  isActive: z.boolean().default(true),
  googleSub: z.string().nullable().optional(),
  hostedDomain: z.string().nullable().optional(),
  lastLoginAt: z.string().nullable().optional(),
  createdAt: z.string(),
  lastLogin: z.string().optional()
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
