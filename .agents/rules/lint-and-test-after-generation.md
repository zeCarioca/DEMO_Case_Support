# Rule: Lint and Test Code After Generation

## Purpose
Ensure all generated or modified code across the monorepo is syntax-clean, strictly typed, passes lint checks, and builds successfully before changes are presented to the user.

---

## 1. Core Directives

1. **Mandatory Post-Generation Check**:
   - Immediately after generating new files or applying edits to existing source code, run the appropriate lint / build verification command for the affected packages.
2. **Zero-Error Completion Gate**:
   - Never conclude a task or prompt response while there are pending compiler errors, broken imports, missing types, or lint regressions.
3. **Proactive Self-Correction**:
   - If a build or lint test fails, inspect the compiler/linter error output, pinpoint the issue, and apply the fix immediately without waiting for the user to report it.

---

## 2. Verification Commands by Package

Depending on which part of the codebase was modified, run the corresponding target command:

| Scope of Changes | Verification Command | What it Tests |
|---|---|---|
| **Frontend Web (`apps/web`)** | `pnpm --filter @case-support/web build` | TypeScript compilation (`tsc`) + Vite production bundle |
| **Backend API (`apps/api`)** | `pnpm --filter @case-support/api build` | Fastify TypeScript build (`tsc`) |
| **Shared Types (`packages/shared-types`)** | `pnpm --filter @case-support/shared-types build` | Shared contracts & Zod type declarations |
| **Database (`packages/database`)** | `pnpm --filter @case-support/database build` | Prisma client types & repository build |
| **Full Monorepo / Cross-Package** | `pnpm build` or `pnpm lint` | Turborepo pipeline across all workspaces |

---

## 3. Checklist for Code Generation

- [ ] File adheres to the `< 300 lines` strict limit.
- [ ] Imports use correct extension format (e.g. `.js` relative imports required by ESM/Vite setup).
- [ ] No `any` escapes where concrete domain types exist in `@case-support/shared-types`.
- [ ] Ran verification command (`pnpm --filter <pkg> build`).
- [ ] Output confirmed: Exit code `0`, `0 errors`.
