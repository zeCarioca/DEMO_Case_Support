# Code Modularity & File Size Guidelines

## File Length Limit
- **Strict 300-Line Limit**: Every source code file (`.ts`, `.tsx`, `.js`, `.jsx`, `.css`, etc.) MUST remain strictly under **300 lines of code**.
- When a file approaches 250 lines, refactor proactively by breaking it into smaller, single-responsibility modules.

## Component Granularity
- **Small, Single-Responsibility Components**: Components must focus on a specific, isolated task (e.g., a card, a form modal, a header bar, a checklist row).
- **Separation of Concerns**:
  - Separate static mock/flow data, constant definitions, and schema mappings into dedicated `*.data.ts` or `*.types.ts` files.
  - Separate self-contained sub-views (e.g., drawers, filter bars, modals) into their own subcomponent files.
  - Keep root view components concise coordinators of child components and state.
