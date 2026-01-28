import type { SemanticTheme } from "@eumetise/theme-contracts";
import { DEFAULT_THEME } from "./default-theme";

/**
 * THEME REGISTRY
 * Pure, synchronous, side-effect-free tenant resolution
 * All themes loaded at build time or provided as static imports
 */

// Build-time injected tenant themes (imported as static modules)
// This map is populated by build process from d:\CCC\Eumetise\themes\*.json
const TENANT_THEMES: Record<string, SemanticTheme> = {
  default: DEFAULT_THEME,
  // Other tenants injected here by build system
};

/**
 * Resolve theme for a given tenant ID
 * ALWAYS returns a valid, complete SemanticTheme
 * Never throws, never returns null/undefined
 */
export function resolveThemeForTenant(tenantId: string): SemanticTheme {
  // Explicit tenant resolution with type narrowing
  const theme = tenantId && typeof tenantId === "string" && tenantId in TENANT_THEMES
    ? TENANT_THEMES[tenantId]
    : undefined;

  // Unknown tenant falls back to default
  return theme ?? DEFAULT_THEME;
}

/**
 * Get all registered tenant IDs (for admin UI listing)
 * Deterministic order
 */
export function getRegisteredTenants(): readonly string[] {
  return Object.keys(TENANT_THEMES).sort();
}

/**
 * Check if a tenant is registered
 * Pure boolean check, no side effects
 */
export function isTenantRegistered(tenantId: string): boolean {
  return tenantId in TENANT_THEMES && tenantId !== "default";
}

/**
 * Register a theme at runtime (for testing only)
 * NOT used in production builds
 */
export function registerThemeForTesting(
  tenantId: string,
  theme: SemanticTheme
): void {
  if (process.env.NODE_ENV !== "development") {
    return; // No-op in production
  }
  TENANT_THEMES[tenantId] = theme;
}
