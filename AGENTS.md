# Workspace Rules

## 1. Code Length Rule
- **Max Lines per File**: All source code files must stay strictly **under 300 lines**.
- Split large files into focused subcomponents, dedicated helper utilities, or data definition files whenever approaching this limit.

## 2. Component Architecture
- Favor modular, single-responsibility components.
- Colocate subcomponents inside feature folders (e.g. `components/flowchart/`, `components/pipeline/`, `components/case-detail/`).
- Decouple data constants, form modals, and presentation cards from parent container views.

## 3. Lint and Test Verification Rule
- **Mandatory Post-Generation Verification**: Immediately after generating or modifying any code, the agent MUST run linting, type-checking, or build tests (e.g. `pnpm --filter <package> build` or `pnpm build` / `pnpm lint`).
- **Zero-Error Gate**: Never complete a turn or present code changes to the user with unresolved type errors, syntax errors, or broken builds.
- **Proactive Remediation**: If lint or test errors are reported, diagnose and resolve them immediately before notifying the user.
