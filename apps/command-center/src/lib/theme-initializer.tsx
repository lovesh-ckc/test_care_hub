"use client";

import { useThemeBootstrap } from "./theme-bootstrap";

/**
 * CLIENT-ONLY COMPONENT: Theme Initializer
 * Separated from layout.tsx to ensure proper client-side execution
 * Bootstrap theming system on mount
 */

export interface ThemeInitializerProps {
  tenantId: string;
}

export function ThemeInitializer({ tenantId }: ThemeInitializerProps) {
  useThemeBootstrap({
    tenantId,
    onThemeApplied: (theme) => {
      console.log(`[Theme] Applied theme for tenant: ${theme.tenantId}`);
    },
  });

  return null;
}
