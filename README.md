# Gradual

[![CI](https://github.com/acarberk/gradual/actions/workflows/ci.yml/badge.svg)](https://github.com/acarberk/gradual/actions/workflows/ci.yml)
[![CodeQL](https://github.com/acarberk/gradual/actions/workflows/codeql.yml/badge.svg)](https://github.com/acarberk/gradual/actions/workflows/codeql.yml)

Sequential habit tracker. Active habits must be held for 10 out of 14 days before the next locked habit unlocks — a 14-day rolling window forgives occasional missed days without breaking progress.

## Tech Stack

**App**

- Next.js 16 (App Router) + React 19
- TypeScript strict
- Tailwind CSS v4
- Zustand (client state, used in later phases)

**Tooling**

- pnpm workspaces + Turborepo
- Vitest + Testing Library
- ESLint (flat config) + Prettier + prettier-plugin-tailwindcss
- Husky + lint-staged + commitlint
- GitHub Actions CI, CodeQL SAST, Dependabot

**Deployment**

- Vercel (frontend, continuous deploy from `main`)
- Mobile packaging (iOS + Android via Capacitor) comes in a later phase

## Repository Layout

```
gradual/
├── apps/
│   └── web/              Next.js 16 PWA
├── packages/
│   └── config/           Shared tsconfig, eslint, prettier presets
├── .github/              CI, CodeQL, Dependabot configs
├── .husky/               Git hooks (pre-commit, commit-msg)
├── pnpm-workspace.yaml
├── turbo.json
└── prettier.config.mjs
```

## Prerequisites

- Node.js 22+ (pinned via `.nvmrc`)
- pnpm 10.32+ (via the root `packageManager` field)

## Getting Started

```bash
pnpm install
pnpm turbo run dev
```

The `web` app runs on [http://localhost:3000](http://localhost:3000).

## Common Commands

All commands run from the repo root:

```bash
pnpm turbo run lint         # ESLint across all packages
pnpm turbo run type-check   # TypeScript no-emit check
pnpm turbo run test         # Vitest suites
pnpm turbo run build        # Production build
pnpm format                 # Prettier write
pnpm format:check           # Prettier check (CI)
```

Filter a single package:

```bash
pnpm --filter @gradual/web dev
pnpm --filter @gradual/web test
```

## Code Quality

- **TypeScript strict mode** across all packages
- **ESLint flat config** via `@gradual/config/eslint/nextjs`
- **Prettier** with shared config and Tailwind class sorting
- **Husky pre-commit**: runs `lint-staged` (ESLint + Prettier on staged files only)
- **Husky commit-msg**: enforces [Conventional Commits](https://www.conventionalcommits.org/)
- **GitHub Actions CI** runs lint, type-check, test, build, and format-check on every PR

## Branching

Trunk-based development with short-lived feature branches:

- `feature/` — new capabilities
- `fix/` — bug fixes
- `chore/` — tooling, CI, dependencies
- `docs/` — documentation
- `refactor/` — non-behavior code changes
- `test/` — test additions or changes

Every change goes through a pull request. Direct commits to `main` are avoided.

## Deployment

`main` branch deploys automatically to Vercel on merge.

For Vercel project setup, the Root Directory must be set to `apps/web`. Everything else (framework, build command, install command) is auto-detected.

## Project Status

Early development. The Phase 0 foundation (monorepo, tooling, CI) is complete. The sequential-unlock habit tracker implementation is being rebuilt from scratch in subsequent phases.

## License

All rights reserved. Source is public for portfolio and transparency purposes. Reuse, redistribution, or derivative works are not permitted without explicit permission.
