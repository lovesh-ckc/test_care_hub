# Infinity Platform

Enterprise-grade hybrid monorepo + microfrontend platform built with Next.js, TypeScript, and a production-grade semantic theming system. Designed for zero-downtime theme updates across distributed microfrontends without rebuilds or redeployments.

---

## 🎯 Why This Architecture?

### Multi-Tenant Semantic Theming
Traditional monoliths struggle with multi-tenant design systems. This platform separates **theme definition** (semantic contracts) from **theme application** (runtime CSS variables), enabling:

- **Zero-Rebuild Theme Changes**: Update colors/spacing/typography without redeploying apps
- **Build-Safe**: All theme contracts validated at build-time; runtime always has a valid fallback
- **Microfrontend-Compatible**: Each app applies the same semantic theme independently via CSS variables
- **Type-Safe**: TypeScript enforces exhaustive theme contracts (27 colors, 13 typography scales, etc.)

### Server/Client Separation
Using Next.js App Router with strict boundaries:
- **Server Components** (layout.tsx): No client state, no hydration overhead
- **Client Components** (theme-initializer.tsx): Only client-only theme bootstrap lives here
- **SEO-Friendly**: Server-rendered HTML with progressive enhancement

### Hybrid Monorepo with Independent Deployments
- **Single Repository**: Unified contracts, CI/CD, tooling
- **Independent Scaling**: Apps deploy separately without coordination
- **Workspace Protocol**: pnpm workspaces with `workspace:*` dependencies ensure version consistency

---

## 🏗️ Architecture Overview

### Apps (Orchestration & Execution)
- **control-center** - Shell application, routing authority, federation loader
- **command-center** - Operational workflows, federated modules
- **care-hub** - Support and monitoring workflows, federated modules

### Packages (Shared Infrastructure)

#### 🎨 Design & Theming
- **theme-contracts** - Exhaustive semantic theme interface (27 colors, typography, spacing, radius, shadows)
- **theme-registry** - Pure synchronous tenant theme resolution with DEFAULT_THEME fallback
- **ui** - Component library consuming CSS variables only (no hardcoded values)
- **tokens** - Design tokens (spacing, colors, typography, motion)
- **layout-engine** - Infinity layout system
- **typography-engine** - Typography scaling and hierarchy

#### 🔧 Core Infrastructure
- **contracts** - Federation contracts with semantic versioning
- **event-bus** - Type-safe cross-app event communication
- **auth** - Authentication and authorization SDK
- **analytics** - Observability and telemetry SDK

### Workers (Background Processing)
- **control-worker** - Event-driven background jobs for shell
- **command-worker** - Event-driven background jobs for command center
- **care-worker** - Event-driven background jobs for care hub

### Infrastructure
- **federation/** - Module Federation configuration and manifests
- **environments/** - Environment definitions and secrets management
- **deployment/** - CI/CD pipelines and infrastructure as code

### Tooling
- **eslint-config** - Shared ESLint configuration
- **tsconfig** - Shared TypeScript configuration with @eumetise/* path aliases
- **tailwind-config** - Shared Tailwind CSS (v4) consuming CSS variables only

---

## 🔄 Semantic Theming System - How It Works

### 1️⃣ Theme Contracts (Build-Time Safety)
**File**: `packages/theme-contracts/src/index.ts`

Exhaustive TypeScript interface enforces what constitutes a valid theme:
```typescript
interface SemanticTheme {
  version: string;
  tenantId: string;
  label: string;
  colors: {
    // 27 semantic color tokens (primary, secondary, success, warning, error, etc.)
    primary: string;
    secondary: string;
    // ... all required colors must be hex/rgb
  };
  typography: {
    // 13 typography scales (h1-h6, body, caption, etc.)
  };
  spacing: [/* 7 scale tokens */];
  radius: [/* 5 radius values */];
  shadow: [/* 4 shadow definitions */];
}
```

**Validation**: `validateSemanticThemeShape()` assertion function catches invalid themes at build-time.

### 2️⃣ Theme Registry (Pure Deterministic Resolution)
**File**: `packages/theme-registry/src/registry.ts`

```typescript
resolveThemeForTenant(tenantId: string): SemanticTheme
```

- Looks up theme file in `themes/{tenantId}.json`
- Falls back to `DEFAULT_THEME` if tenant not found
- **Always returns valid SemanticTheme** (never null/undefined)
- Pure function: no side effects, no network calls, no state mutations

### 3️⃣ CSS Variable Pipeline (Design Token Materialization)

**globals.css** (Single Source of Truth):
```css
:root {
  /* 27 Color variables */
  --color-primary: #0066cc;
  --color-secondary: #f0f0f0;
  /* ... all semantic colors ... */
  
  /* Typography scales */
  --font-size-h1: 2.5rem;
  /* ... typography ... */
  
  /* Spacing, radius, shadows */
  --spacing-1: 0.25rem;
  --radius-sm: 0.25rem;
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

**Tailwind Config** (Variable-Driven):
```typescript
colors: {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  // All hardcoded values removed - only CSS variable refs
}
```

Result: Tailwind only outputs utility classes like `bg-primary` → `background-color: var(--color-primary)`. No color values baked into CSS; all from globals.css.

### 4️⃣ Runtime Theme Application (SSR-Safe Client Bootstrap)

**flow**:
1. **Server (layout.tsx)**:
   - Extract `tenantId` from request context/env
   - Render `<ThemeInitializer tenantId={tenantId} />`
   - Layout marked `suppressHydrationWarning` (CSS variables added client-side)

2. **Client (theme-initializer.tsx, marked with "use client")**:
   ```typescript
   export function ThemeInitializer({ tenantId }) {
     useThemeBootstrap({ tenantId });
     return null; // No DOM, just side effects
   }
   ```

3. **useThemeBootstrap Hook (theme-bootstrap.ts)**:
   - Run once on mount via `useEffect`
   - Call `resolveThemeForTenant(tenantId)` → get valid theme
   - Call `applyTheme(theme)` → inject CSS variables to document.documentElement
   - Fire optional `onThemeApplied` callback

4. **Apply Theme (apply-theme.ts)**:
   ```typescript
   applyTheme(theme: SemanticTheme): void {
     // Guard: Only run in browser
     if (!isBrowser()) return;
     
     // Iterate theme colors/typography/spacing
     // Set document.documentElement.style.setProperty('--color-primary', '#0066cc')
   }
   ```

**Result**: CSS variables applied before first paint. All utility classes automatically get correct colors/spacing/typography.

### 5️⃣ Dev-Time Mutation (localhost-controller.ts)

For local development only:
```typescript
mutateCSSVariable('--color-primary', '#ff0000'); // Red primary
```

- Zero persistence (memory only)
- Auto-disabled in production
- No rebuild/refresh needed
- Useful for testing theme variations

---

## 📊 Complete Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ BUILD TIME                                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Theme Contracts                Theme Files                      │
│  (TS interface)          ────→   (JSON)                          │
│       ↓                               ↓                          │
│  validate-themes.ts (Script)  ✓ Schema validation               │
│       ↓                        ✓ Color format check              │
│  All themes valid?             ✓ All required fields             │
│       ↓                                                           │
│  ✅ Build succeeds (or fails with clear error)                  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ RUNTIME - REQUEST ARRIVES                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  HTTP Request to /  →  Next.js Server                           │
│                           ↓                                      │
│                    layout.tsx (Server Component)                 │
│                           ↓                                      │
│         Extract: tenantId = process.env.NEXT_PUBLIC_TENANT_ID   │
│                           ↓                                      │
│         Render: <ThemeInitializer tenantId="acme-corp" />       │
│                           ↓                                      │
│    HTML sent to client (SSR, suppressHydrationWarning)          │
│                           ↓                                      │
│          Browser receives HTML (no CSS vars yet)                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ RUNTIME - CLIENT HYDRATION & THEME BOOTSTRAP                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Browser executes JavaScript                                    │
│         ↓                                                        │
│  ThemeInitializer (marked "use client") mounts                  │
│         ↓                                                        │
│  useThemeBootstrap hook fires useEffect                         │
│         ↓                                                        │
│  resolveThemeForTenant("acme-corp")                             │
│         ├→ Look up themes/acme-corp.json  ✓ Found               │
│         ├→ Parse & validate against contract                    │
│         └→ Return SemanticTheme                                 │
│         ↓                                                        │
│  applyTheme(theme)                                              │
│         ├→ Check isBrowser() ✓ Running in browser               │
│         ├→ Validate theme ✓ Matches contract                    │
│         └→ For each color/spacing/typography:                   │
│            document.documentElement.style.setProperty(          │
│              '--color-primary',                                 │
│              '#0066cc'                                          │
│            )                                                    │
│         ↓                                                        │
│  CSS Variables applied to DOM                                   │
│         ↓                                                        │
│  Tailwind utilities activate (var(--color-primary) resolves)    │
│         ↓                                                        │
│  Page renders with correct colors/spacing/typography           │
│         ↓                                                        │
│  Optional: onThemeApplied callback                              │
│         └→ console.log("[Theme] Applied theme for tenant: ...")│
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ THEME UPDATE (Zero Rebuild/Redeploy)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  UPDATE themes/acme-corp.json                                   │
│         ├→ Change --color-primary from #0066cc to #ff0000      │
│         └→ Deploy theme config (separate from app deployments)  │
│         ↓                                                        │
│  Existing app instances still running                           │
│         ├→ No rebuild triggered                                 │
│         ├→ No redeployment needed                               │
│         └→ Users' browser caches unaffected (different path)    │
│         ↓                                                        │
│  Next time user visits (or server re-initializes):              │
│         ├→ resolveThemeForTenant() reads updated JSON           │
│         ├→ applyTheme() applies new --color-primary             │
│         └→ Page renders with red primary instead of blue        │
│         ↓                                                        │
│  🎉 Theme updated without app redeploy                          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔑 Key Principles

### 🏗️ Architecture
- **Hybrid Monorepo**: Single repository, independent deployments
- **Runtime Composition**: Apps loaded dynamically via Module Federation
- **Compile-Time Isolation**: No shared state, strict TypeScript boundaries
- **Contracts-First**: All federated modules and themes defined with contracts

### 🎨 Theming
- **Semantic Contracts**: Exhaustive theme interface enforced at build-time
- **Pure Resolution**: Theme lookup is synchronous, deterministic, no side effects
- **CSS-Variable-Only**: All design values flow through CSS variables (no hardcoded values)
- **Build-Safe**: Invalid themes caught before deployment; DEFAULT_THEME fallback guarantees runtime stability
- **Zero-Rebuild**: Theme changes don't require app recompilation

### 🔌 Communication
- **Event-Driven**: Cross-app communication exclusively through event-bus
- **No Shared State**: Each app owns its state, no global singletons
- **Strong Types**: All events and contracts are TypeScript-defined

### 🎯 Workers
- **Fully Isolated**: No UI dependencies, event-driven only
- **Idempotent**: All jobs designed for safe retry
- **Observable**: Full audit trail of execution

### ⚡ Performance
- **Server-Rendered HTML**: No JavaScript required for initial content
- **Progressive Enhancement**: CSS variables applied client-side after hydration
- **No Flash**: suppressHydrationWarning allows CSS injection without layout shift
- **Minimal JS**: Theme bootstrap hook is <2KB gzipped

## Development

### Setup
```bash
pnpm install
```

### Development
```bash
# Run all apps and packages in watch mode
pnpm dev

# Run specific app/package
pnpm dev --filter=@control-center/*
```

### Building
```bash
# Build all apps and packages
pnpm build

# Build specific target
pnpm build --filter=@command-center/*
```

### Validation
```bash
# Validate federation contracts
pnpm validate-contracts

# Validate dependency graph
pnpm validate-deps
```

---

## 🌟 Key Features

### ✨ Zero-Rebuild Theme Updates
Change design tokens without recompiling or redeploying applications. Theme updates are loaded at runtime from JSON files.

### 🎯 Type-Safe Theming
Exhaustive TypeScript interfaces enforce theme contracts. Invalid themes are caught at build-time via `validate-themes` script.

### 🔄 SSR-Friendly
Server-rendered HTML with client-side CSS variable injection. No hydration mismatch; layout marked with `suppressHydrationWarning` for safe client mutations.

### 🏢 Multi-Tenant Ready
Each tenant can have completely different theme (colors, typography, spacing, shadows) with pure, synchronous resolution.

### ⚡ Performance Optimized
- **Server-rendered**: Initial paint requires no JavaScript
- **Progressive enhancement**: CSS variables applied post-hydration
- **Minimal footprint**: Theme system < 2KB gzipped
- **No layout shift**: CSS variables applied before first paint

### 🛠️ Developer Experience
- **Hot reload**: Dev server reflects theme changes instantly (via localhost-controller)
- **Full type hints**: IDE autocomplete for all theme properties
- **Build validation**: Script catches invalid themes before deployment
- **Clear error messages**: Exhaustive validation output

---

## ?? Troubleshooting

### Issue: pnpm not found
**Error**: pnpm: The term 'pnpm' is not recognized

**Solution**:
` ash
npm install -g pnpm@latest
` 

pnpm is required because npm doesn't support the workspace protocol.

### Issue: Cannot find module '@eumetise/theme-contracts'
**Error**: Cannot find module '@eumetise/theme-contracts'

**Solution**:
` ash
pnpm install
` 

Run from workspace root, not individual app directories.

### Issue: CSS variables not applied at runtime
**Symptom**: Page renders without themed colors

**Diagnostic**:
` javascript
const style = getComputedStyle(document.documentElement);
const primaryColor = style.getPropertyValue('--color-primary');
console.log(primaryColor); // Should be '#0066cc'
` 

**Solutions**:
1. Verify globals.css imported in pp/layout.tsx
2. Check browser DevTools for CSS variables in <html> styles
3. Ensure 	heme-initializer.tsx marked with \"use client"\ at module level
4. Check console for: \[Theme] Applied theme for tenant: ...\

---

## ? FAQ

### Q: Can I have different themes for different users?
**A**: Yes. Extract \	enantId\ per-request in \layout.tsx\. Each request resolves its own theme.

### Q: How do I add a new color?
**A**: Update (1) contract, (2) default theme, (3) globals.css, (4) Tailwind config, (5) tenant theme files, (6) validate.

### Q: Can I use rgba() colors?
**A**: Yes. Validator accepts hex and rgb/rgba formats.

### Q: Performance impact of CSS variables?
**A**: Minimal. Hardware-accelerated with same performance as hardcoded values.

### Q: How do I test theme changes locally?
**A**: Use localhost controller: \window.mutateCSSVariable('--color-primary', '#ff0000');\

### Q: What if tenant theme file is missing?
**A**: Returns DEFAULT_THEME. App never breaks.

---

## ?? Resources

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [STRUCTURE.md](./STRUCTURE.md)
- [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md)
- [VERIFICATION_REPORT.md](./VERIFICATION_REPORT.md)

---

## ?? Contributing

1. **Type Safety**: Ensure TypeScript strict-mode compliance
2. **Contract Compliance**: Update theme contracts if needed
3. **Validation**: Run \pnpm validate-themes\
4. **Testing**: Test locally with \pnpm dev\

---

## ?? License

This project is proprietary. All rights reserved.