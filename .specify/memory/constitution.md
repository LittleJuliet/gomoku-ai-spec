# Gomoku Feature Specification Constitution

## Core Principles

### I. Local-Only Experience
All features must run entirely on a single device without network services unless explicitly required by the spec.

### II. Stack Consistency
Use JavaScript (ES2020+), Vue 2.7 runtime, Vite, and Pinia. Any change requires an explicit spec and plan update.

### III. In-Memory State by Default
Game state is session-only. Persistence is allowed only when explicitly specified.

### IV. Simplicity First
Prefer minimal additions and avoid new services or infrastructure unless required by the spec.

## Additional Constraints

- No external APIs or third-party services by default.
- Performance expectations should be stated as user-visible metrics in the spec.

## Development Workflow

- Spec, plan, and tasks must stay consistent; changes in one require corresponding updates in the others.

## Governance

This constitution supersedes other documents. Amendments must be documented with date and rationale.

**Version**: 1.0.0 | **Ratified**: 2026-01-20 | **Last Amended**: 2026-01-20
