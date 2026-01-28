import type { SemanticTheme } from "@eumetise/theme-contracts";
import { isValidSemanticTheme } from "@eumetise/theme-contracts";

/**
 * CLIENT-SIDE ONLY: Apply theme values to DOM via CSS variables
 * GUARD: Must check window/document availability
 * GUARD: Must validate theme before application
 * GUARD: Must never throw
 * EFFECT: Mutates CSS variables only, never DOM structure
 */

/**
 * Check if we're in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

/**
 * Apply a validated theme to the document root
 * Mutates CSS variables ONLY
 * Safe to call multiple times
 * Never throws
 */
export function applyTheme(theme: unknown): void {
  // Noop if not in browser
  if (!isBrowser()) {
    return;
  }

  // Validate theme structure
  if (!isValidSemanticTheme(theme)) {
    console.warn(
      "[Theme] Invalid theme structure, applying defaults instead"
    );
    return;
  }

  // Type is now narrowed to SemanticTheme
  const validTheme: SemanticTheme = theme;

  // Get root element safely
  const root = document.documentElement;
  if (!root) {
    console.warn("[Theme] Cannot access document root");
    return;
  }

  try {
    // Apply colors
    root.style.setProperty("--color-primary", validTheme.colors.primary);
    root.style.setProperty(
      "--color-primary-hover",
      validTheme.colors.primaryHover
    );
    root.style.setProperty(
      "--color-primary-active",
      validTheme.colors.primaryActive
    );
    root.style.setProperty(
      "--color-primary-disabled",
      validTheme.colors.primaryDisabled
    );

    root.style.setProperty("--color-secondary", validTheme.colors.secondary);
    root.style.setProperty(
      "--color-secondary-hover",
      validTheme.colors.secondaryHover
    );
    root.style.setProperty(
      "--color-secondary-active",
      validTheme.colors.secondaryActive
    );

    root.style.setProperty("--color-success", validTheme.colors.success);
    root.style.setProperty(
      "--color-success-light",
      validTheme.colors.successLight
    );
    root.style.setProperty("--color-warning", validTheme.colors.warning);
    root.style.setProperty(
      "--color-warning-light",
      validTheme.colors.warningLight
    );
    root.style.setProperty("--color-error", validTheme.colors.error);
    root.style.setProperty("--color-error-light", validTheme.colors.errorLight);
    root.style.setProperty("--color-info", validTheme.colors.info);
    root.style.setProperty("--color-info-light", validTheme.colors.infoLight);

    root.style.setProperty("--color-neutral-900", validTheme.colors.neutral900);
    root.style.setProperty("--color-neutral-800", validTheme.colors.neutral800);
    root.style.setProperty("--color-neutral-700", validTheme.colors.neutral700);
    root.style.setProperty("--color-neutral-600", validTheme.colors.neutral600);
    root.style.setProperty("--color-neutral-500", validTheme.colors.neutral500);
    root.style.setProperty("--color-neutral-400", validTheme.colors.neutral400);
    root.style.setProperty("--color-neutral-300", validTheme.colors.neutral300);
    root.style.setProperty("--color-neutral-200", validTheme.colors.neutral200);
    root.style.setProperty("--color-neutral-100", validTheme.colors.neutral100);
    root.style.setProperty("--color-neutral-50", validTheme.colors.neutral50);

    root.style.setProperty("--color-overlay", validTheme.colors.overlay);
    root.style.setProperty("--color-overlay-hover", validTheme.colors.overlayHover);

    // Apply typography
    root.style.setProperty("--font-family", validTheme.typography.fontFamily);
    root.style.setProperty(
      "--font-family-mono",
      validTheme.typography.fontFamilyMono
    );
    root.style.setProperty(
      "--font-weight-regular",
      validTheme.typography.fontWeightRegular.toString()
    );
    root.style.setProperty(
      "--font-weight-medium",
      validTheme.typography.fontWeightMedium.toString()
    );
    root.style.setProperty(
      "--font-weight-semibold",
      validTheme.typography.fontWeightSemibold.toString()
    );
    root.style.setProperty(
      "--font-weight-bold",
      validTheme.typography.fontWeightBold.toString()
    );

    root.style.setProperty(
      "--line-height-tight",
      validTheme.typography.lineHeightTight.toString()
    );
    root.style.setProperty(
      "--line-height-normal",
      validTheme.typography.lineHeightNormal.toString()
    );
    root.style.setProperty(
      "--line-height-relaxed",
      validTheme.typography.lineHeightRelaxed.toString()
    );
    root.style.setProperty(
      "--line-height-loose",
      validTheme.typography.lineHeightLoose.toString()
    );

    root.style.setProperty(
      "--letter-spacing-tight",
      validTheme.typography.letterSpacingTight
    );
    root.style.setProperty(
      "--letter-spacing-normal",
      validTheme.typography.letterSpacingNormal
    );
    root.style.setProperty(
      "--letter-spacing-wide",
      validTheme.typography.letterSpacingWide
    );

    // Apply spacing
    root.style.setProperty("--spacing-xs", validTheme.spacing.xs);
    root.style.setProperty("--spacing-sm", validTheme.spacing.sm);
    root.style.setProperty("--spacing-md", validTheme.spacing.md);
    root.style.setProperty("--spacing-lg", validTheme.spacing.lg);
    root.style.setProperty("--spacing-xl", validTheme.spacing.xl);
    root.style.setProperty("--spacing-2xl", theme.spacing["2xl"]);
    root.style.setProperty("--spacing-3xl", theme.spacing["3xl"]);

    // Apply radius
    root.style.setProperty("--radius-none", validTheme.radius.none);
    root.style.setProperty("--radius-sm", validTheme.radius.sm);
    root.style.setProperty("--radius-md", validTheme.radius.md);
    root.style.setProperty("--radius-lg", validTheme.radius.lg);
    root.style.setProperty("--radius-full", validTheme.radius.full);

    // Apply shadows
    root.style.setProperty("--shadow-sm", validTheme.shadow.sm);
    root.style.setProperty("--shadow-md", validTheme.shadow.md);
    root.style.setProperty("--shadow-lg", validTheme.shadow.lg);
    root.style.setProperty("--shadow-xl", validTheme.shadow.xl);
  } catch (error) {
    // Fail silently, document is still usable with defaults
    console.error("[Theme] Failed to apply CSS variables:", error);
  }
}

/**
 * Get current CSS variable value (for testing or debugging)
 * Safe, never throws
 */
export function getCSSVariable(variableName: string): string {
  if (!isBrowser()) {
    return "";
  }

  try {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  } catch {
    return "";
  }
}
