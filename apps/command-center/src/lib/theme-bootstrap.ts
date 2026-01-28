"use client"; // Next.js client marker

import { useEffect, useRef } from "react";
import type { SemanticTheme } from "@eumetise/theme-contracts";
import { resolveThemeForTenant } from "@eumetise/theme-registry";
import { applyTheme } from "./apply-theme";

/**
 * THEME BOOTSTRAP - Initializes theming for a tenant
 * CLIENT-ONLY execution (useEffect guard)
 * Called once per app instance
 * Deterministic: Always applies valid theme, never throws
 */

export interface UseThemeBootstrapOptions {
  /**
   * Tenant ID to resolve theme for
   * Falls back to 'default' if unknown
   */
  tenantId: string;

  /**
   * Optional callback when theme is applied
   * Useful for integration with admin controller
   */
  onThemeApplied?: (theme: SemanticTheme) => void;
}

/**
 * React hook for theme initialization
 * Safe for SSR (no side effects outside useEffect)
 */
export function useThemeBootstrap(
  options: UseThemeBootstrapOptions
): SemanticTheme {
  const { tenantId, onThemeApplied } = options;

  // Resolve theme synchronously
  const theme = resolveThemeForTenant(tenantId);

  // Track if effect has run to avoid double-application
  const effectRunRef = useRef<boolean>(false);

  useEffect(() => {
    // Prevent double-running in strict mode or dev mode
    if (effectRunRef.current) {
      return;
    }
    effectRunRef.current = true;

    // Apply theme to DOM
    applyTheme(theme);

    // Notify callback
    onThemeApplied?.(theme);
  }, [theme, onThemeApplied]);

  // Return current theme for component use
  return theme;
}

/**
 * Simple synchronous bootstrap for testing or non-React contexts
 * Do NOT use during SSR
 */
export function bootstrapThemeSync(tenantId: string): SemanticTheme {
  const theme = resolveThemeForTenant(tenantId);
  applyTheme(theme);
  return theme;
}
