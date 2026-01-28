/**
 * COMPILE-TIME CONTRACT FOR SEMANTIC THEMING
 * Non-optional, exhaustive, versioned.
 * All design decisions flow through this contract.
 */

export const THEME_CONTRACT_VERSION = "1.0.0" as const;

/**
 * Semantic color intent (not raw hex/rgb)
 * Palette is tenant-specific, semantics are universal
 */
export interface SemanticColorPalette {
  // Primary intent
  readonly primary: string; // Brand/action color
  readonly primaryHover: string;
  readonly primaryActive: string;
  readonly primaryDisabled: string;

  // Secondary intent
  readonly secondary: string; // Supporting color
  readonly secondaryHover: string;
  readonly secondaryActive: string;

  // Semantic status
  readonly success: string;
  readonly successLight: string;
  readonly warning: string;
  readonly warningLight: string;
  readonly error: string;
  readonly errorLight: string;
  readonly info: string;
  readonly infoLight: string;

  // Neutral scale (structural)
  readonly neutral900: string; // Darkest
  readonly neutral800: string;
  readonly neutral700: string;
  readonly neutral600: string;
  readonly neutral500: string;
  readonly neutral400: string;
  readonly neutral300: string;
  readonly neutral200: string;
  readonly neutral100: string;
  readonly neutral50: string; // Lightest

  // Overlays
  readonly overlay: string; // Modal/backdrop base
  readonly overlayHover: string;
}

/**
 * Semantic typography intent
 * Font family, weight, and line-height are tenant-specific
 */
export interface SemanticTypography {
  readonly fontFamily: string;
  readonly fontFamilyMono: string;

  // Weight scale
  readonly fontWeightRegular: number; // 400
  readonly fontWeightMedium: number; // 500
  readonly fontWeightSemibold: number; // 600
  readonly fontWeightBold: number; // 700

  // Line height scale
  readonly lineHeightTight: number;
  readonly lineHeightNormal: number;
  readonly lineHeightRelaxed: number;
  readonly lineHeightLoose: number;

  // Letter spacing
  readonly letterSpacingTight: string;
  readonly letterSpacingNormal: string;
  readonly letterSpacingWide: string;
}

/**
 * Semantic spacing intent
 * Always in rem, scales with root font-size
 */
export interface SemanticSpacing {
  readonly xs: string; // 0.25rem / 4px
  readonly sm: string; // 0.5rem / 8px
  readonly md: string; // 1rem / 16px
  readonly lg: string; // 1.5rem / 24px
  readonly xl: string; // 2rem / 32px
  readonly "2xl": string; // 3rem / 48px
  readonly "3xl": string; // 4rem / 64px
}

/**
 * Semantic radius intent
 * Used for border-radius, corner treatment
 */
export interface SemanticRadius {
  readonly none: string;
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
  readonly full: string;
}

/**
 * Semantic shadow intent
 * Depth and elevation signaling
 */
export interface SemanticShadow {
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
  readonly xl: string;
}

/**
 * COMPLETE SEMANTIC THEME DEFINITION
 * All keys mandatory. No partial themes allowed.
 */
export interface SemanticTheme {
  readonly version: typeof THEME_CONTRACT_VERSION;
  readonly tenantId: string;
  readonly label: string; // Display name for admin UI
  readonly colors: SemanticColorPalette;
  readonly typography: SemanticTypography;
  readonly spacing: SemanticSpacing;
  readonly radius: SemanticRadius;
  readonly shadow: SemanticShadow;
}

/**
 * Build-time validator for exhaustive key presence
 * Used in build script to fail on mismatch
 */
export function validateSemanticThemeShape(
  input: unknown
): asserts input is SemanticTheme {
  if (!input || typeof input !== "object") {
    throw new Error("Theme must be an object");
  }

  const obj = input as Record<string, unknown>;

  // Exhaustive checks
  if (typeof obj.version !== "string")
    throw new Error("theme.version must be a string");
  if (typeof obj.tenantId !== "string")
    throw new Error("theme.tenantId must be a string");
  if (typeof obj.label !== "string")
    throw new Error("theme.label must be a string");

  // Color palette checks
  if (!obj.colors || typeof obj.colors !== "object")
    throw new Error("theme.colors must be an object");

  const colorKeys: (keyof SemanticColorPalette)[] = [
    "primary",
    "primaryHover",
    "primaryActive",
    "primaryDisabled",
    "secondary",
    "secondaryHover",
    "secondaryActive",
    "success",
    "successLight",
    "warning",
    "warningLight",
    "error",
    "errorLight",
    "info",
    "infoLight",
    "neutral900",
    "neutral800",
    "neutral700",
    "neutral600",
    "neutral500",
    "neutral400",
    "neutral300",
    "neutral200",
    "neutral100",
    "neutral50",
    "overlay",
    "overlayHover",
  ];

  for (const key of colorKeys) {
    const value = (obj.colors as Record<string, unknown>)[key];
    if (typeof value !== "string")
      throw new Error(`theme.colors.${key} must be a non-empty string`);
    if (value.trim() === "")
      throw new Error(`theme.colors.${key} cannot be empty`);
    if (!/^#[0-9a-fA-F]{6}$|^rgba?\(/.test(value))
      throw new Error(
        `theme.colors.${key} must be valid hex or rgb(a): ${value}`
      );
  }

  // Typography checks
  if (!obj.typography || typeof obj.typography !== "object")
    throw new Error("theme.typography must be an object");

  const typographyKeys: (keyof SemanticTypography)[] = [
    "fontFamily",
    "fontFamilyMono",
    "fontWeightRegular",
    "fontWeightMedium",
    "fontWeightSemibold",
    "fontWeightBold",
    "lineHeightTight",
    "lineHeightNormal",
    "lineHeightRelaxed",
    "lineHeightLoose",
    "letterSpacingTight",
    "letterSpacingNormal",
    "letterSpacingWide",
  ];

  for (const key of typographyKeys) {
    const value = (obj.typography as Record<string, unknown>)[key];
    const isNumber = typeof value === "number";
    const isString = typeof value === "string";
    if (!isNumber && !isString)
      throw new Error(`theme.typography.${key} must be string or number`);
    if (isString && value.trim() === "")
      throw new Error(`theme.typography.${key} cannot be empty`);
  }

  // Spacing checks
  if (!obj.spacing || typeof obj.spacing !== "object")
    throw new Error("theme.spacing must be an object");

  const spacingKeys: (keyof SemanticSpacing)[] = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
  ];

  for (const key of spacingKeys) {
    const value = (obj.spacing as Record<string, unknown>)[key];
    if (typeof value !== "string")
      throw new Error(`theme.spacing.${key} must be a string`);
    if (!/^\d+\.?\d*(rem|px|em)$/.test(value))
      throw new Error(`theme.spacing.${key} must be valid unit: ${value}`);
  }

  // Radius checks
  if (!obj.radius || typeof obj.radius !== "object")
    throw new Error("theme.radius must be an object");

  const radiusKeys: (keyof SemanticRadius)[] = [
    "none",
    "sm",
    "md",
    "lg",
    "full",
  ];

  for (const key of radiusKeys) {
    const value = (obj.radius as Record<string, unknown>)[key];
    if (typeof value !== "string")
      throw new Error(`theme.radius.${key} must be a string`);
    if (!/^\d+\.?\d*(rem|px|em)|full/.test(value))
      throw new Error(`theme.radius.${key} must be valid unit: ${value}`);
  }

  // Shadow checks
  if (!obj.shadow || typeof obj.shadow !== "object")
    throw new Error("theme.shadow must be an object");

  const shadowKeys: (keyof SemanticShadow)[] = ["sm", "md", "lg", "xl"];

  for (const key of shadowKeys) {
    const value = (obj.shadow as Record<string, unknown>)[key];
    if (typeof value !== "string")
      throw new Error(`theme.shadow.${key} must be a string`);
    if (value.trim() === "")
      throw new Error(`theme.shadow.${key} cannot be empty`);
  }
}

export function isValidSemanticTheme(input: unknown): input is SemanticTheme {
  try {
    validateSemanticThemeShape(input);
    return true;
  } catch {
    return false;
  }
}
