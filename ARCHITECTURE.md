# Infinity Platform - Architecture Guide

Enterprise-grade hybrid monorepo + microfrontend platform.

## Quick Start

```bash
# Install dependencies
pnpm install

# Development (all apps + workers)
pnpm dev

# Build everything
pnpm build

# Validate contracts
pnpm validate-contracts
```

## Project Structure

### 📱 Apps (Orchestration)

**[control-center](./apps/control-center)** - Shell / Orchestrator
- Owns routing, navigation, auth boundaries
- Loads remotes via Module Federation
- Hosts AppLoader, EventBridge, ErrorBoundary
- Port: 3000

**[command-center](./apps/command-center)** - Execution Workflows
- Operational workflows and execution management
- Federated module (loaded by control-center)
- Port: 3001

**[care-hub](./apps/care-hub)** - Support & Monitoring
- Monitoring, support, care workflows
- Federated module (loaded by control-center)
- Port: 3002

### 📦 Packages (Shared Infrastructure)

**[@infinity/contracts](./packages/contracts)**
- Federation contracts with semantic versioning
- Defines public interfaces for microfrontends
- Runtime version validation
- **Exports**: Contract interfaces, validators

**[@infinity/event-bus](./packages/event-bus)**
- Type-safe cross-app event communication
- Publish/Subscribe pattern
- Standard event types
- No shared state - events only
- **Exports**: EventBus, EventTypes, createEventBus

**[@infinity/tokens](./packages/tokens)**
- Design tokens: spacing, colors, typography, motion, shadows
- Single source of truth for theming
- Used by Tailwind and UI components
- **Exports**: spacing, colors, typography, motion, shadow

**[@infinity/ui](./packages/ui)**
- Component library: Button, Card, Badge, Alert
- Primitives only (no extensions allowed)
- Token-driven styling
- **Exports**: UILibrary components

**[@infinity/layout-engine](./packages/layout-engine)**
- Infinity layout system
- Responsive grid utilities
- Layout presets and helpers
- **Exports**: createGridClass, LayoutPresets

**[@infinity/typography-engine](./packages/typography-engine)**
- Typography scaling and hierarchy
- Responsive typography system
- Text styles (h1-h6, body, caption)
- **Exports**: TypographyScale, ResponsiveTypography

**[@infinity/auth](./packages/auth)**
- Authentication and authorization SDK
- User context management
- Permission and role checking
- Event-bus integration
- **Exports**: AuthSDK, createAuthSDK

**[@infinity/analytics](./packages/analytics)**
- Observability and telemetry
- Event tracking, page views, error reporting
- Automatic session management
- **Exports**: AnalyticsManager, createAnalyticsManager

### 🔧 Workers (Background Processing)

**[control-worker](./workers/control-worker)** - Shell Background Jobs
- Event-driven, fully isolated
- No UI imports
- Health checks, state sync, cleanup
- Port: 4001 (for IPC)

**[command-worker](./workers/command-worker)** - Execution Background Jobs
- Workflow execution with progress tracking
- Idempotent operations
- Retry with exponential backoff
- Port: 4002 (for IPC)

**[care-worker](./workers/care-worker)** - Monitoring Background Jobs
- Health checks, incident scanning, cleanup
- Scheduled monitoring tasks
- Observable execution
- Port: 4003 (for IPC)

### 🏗️ Infrastructure

**[infra/federation](./infra/federation/config.ts)**
- Module Federation configuration for all apps
- Shared dependencies definition
- Remote entry points
- Singleton and shared library rules

**[infra/environments](./infra/environments/index.ts)**
- Environment-specific configurations
- Development, staging, production settings
- API endpoints, remote URLs, worker endpoints

**[infra/deployment](./infra/deployment/README.md)**
- Deployment strategy documentation
- CDN versioning and immutability
- CI/CD pipeline requirements

### 🔨 Tooling

**[@infinity/eslint-config](./tooling/eslint-config)**
- Shared ESLint rules
- TypeScript strictness
- Code quality standards

**[@infinity/tsconfig](./tooling/tsconfig)**
- Shared TypeScript configuration
- Base compiler options
- Strict mode enabled

**[@infinity/tailwind-config](./tooling/tailwind-config)**
- Shared Tailwind CSS configuration
- Token integration
- Design system alignment

### 📜 Scripts

**[scripts/build-all.ts](./scripts/build-all.ts)**
- Orchestrates full build with proper dependency order
- Validates contracts after build
- Idempotent builds

**[scripts/dev-all.ts](./scripts/dev-all.ts)**
- Starts all apps and workers in watch mode
- Parallel execution
- Single command development

**[scripts/validate-contracts.ts](./scripts/validate-contracts.ts)**
- Validates federation contracts
- Checks for circular dependencies
- Validates version requirements

## Architecture Principles

### 🏛️ Hybrid Monorepo + Microfrontend

- **Single repository** for all code
- **Independent deployments** for each app
- **Runtime composition** via Module Federation
- **Compile-time isolation** with TypeScript boundaries

### 🔌 Event-Driven Communication

- **No shared state** across apps
- **Event-bus** for cross-app communication
- **Type-safe events** with contracts
- **Idempotent** event handlers

### 🎨 Token-Driven Design System

- **Design tokens** define all visual decisions
- **Component library** uses tokens only
- **Apps cannot extend** primitives
- **Versioned exports** with breaking change detection

### 🧠 Workers Architecture

- **Fully isolated** from UI code
- **Event-driven only** - no imperative calls
- **Idempotent operations** for safe retries
- **Observable execution** with full audit trail

## Development Workflow

### Local Development

```bash
# Start all services
pnpm dev

# Or start individual apps
cd apps/control-center
pnpm dev

cd apps/command-center
pnpm dev
```

### Building

```bash
# Build all packages and apps in order
pnpm build

# Or build specific workspace
pnpm build --filter=@infinity/ui
```

### Testing & Validation

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Contract validation
pnpm validate-contracts

# Dependency validation
pnpm validate-deps
```

## Deployment Strategy

### Apps
Each app builds independently with immutable federation assets:

```
control-center → CDN (serves shell)
  ├─ remoteEntry.js (v0.1.0)
  └─ _next/ artifacts

command-center → CDN (versioned remote)
  ├─ remoteEntry.js (v0.1.0-hash)
  └─ _next/ artifacts

care-hub → CDN (versioned remote)
  ├─ remoteEntry.js (v0.1.0-hash)
  └─ _next/ artifacts
```

### Workers
Workers deploy as independent services:
- Docker containers or serverless functions
- Event-driven communication only
- No direct app dependencies

### Version Management
- Apps: Semantic versioning
- Packages: Synchronized versions
- Federation: Contract-based validation

## Key Files & Conventions

### Must-Read Files
- [pnpm-workspace.yaml](./pnpm-workspace.yaml) - Workspace configuration
- [tsconfig.base.json](./tsconfig.base.json) - Base TypeScript config
- [package.json](./package.json) - Root package with scripts
- [README.md](./README.md) - Platform overview

### App Structure
```
apps/control-center/
├─ src/
│  ├─ app/         # Next.js app router
│  ├─ lib/         # Internal utilities
│  │  ├─ shell.tsx
│  │  ├─ event-bridge.tsx
│  │  └─ federation/
│  └─ pages/       # (optional) Page routes
├─ next.config.ts
├─ tsconfig.json
└─ package.json
```

### Package Structure
```
packages/ui/
├─ src/
│  └─ index.tsx    # All exports
├─ dist/           # Built output
├─ tsconfig.json
└─ package.json
```

## Strict Rules

### Architectural Boundaries
- ✅ Apps can import from packages only
- ❌ Packages cannot import from apps
- ✅ Workers are fully isolated (no UI imports)
- ❌ Cross-app imports only via federation contracts

### Design System
- ✅ Use tokens from @infinity/tokens
- ✅ Use primitives from @infinity/ui
- ❌ Create custom spacing/colors
- ❌ Extend primitive components directly

### Communication
- ✅ Cross-app via event-bus
- ✅ Events are strongly typed
- ❌ Shared global state
- ❌ Direct app-to-app imports

### Dependencies
- ✅ Explicit dependency declarations
- ✅ Version pinning for federation
- ❌ Peer dependencies without specification
- ❌ Circular dependencies

## Troubleshooting

### Type Errors
```bash
# Rebuild packages (types might be stale)
pnpm build

# Check specific package types
pnpm type-check --filter=@infinity/contracts
```

### Federation Issues
```bash
# Validate contracts
pnpm validate-contracts

# Check remote entry points
curl http://localhost:3001/_next/static/remoteEntry.js
```

### Version Mismatches
Check [infra/environments/index.ts](./infra/environments/index.ts) for environment config.

## Further Reading

- [Next.js Module Federation](https://nextjs.org/docs/advanced-features/module-federation)
- [Event-Driven Architecture](https://martinfowler.com/articles/201701-event-driven.html)
- [Design Tokens](https://inxs.io/design-tokens)
- [Monorepo Principles](https://monorepo.tools/)

---

**Status**: Production-ready architecture
**Last Updated**: January 2026
**Maintainer**: Frontend Architecture Team
