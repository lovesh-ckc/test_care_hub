import {
  THEME_CONTRACT_VERSION,
  type SemanticTheme,
} from "@eumetise/theme-contracts";

/**
 * DEFAULT THEME - MANDATORY FALLBACK FOR ALL TENANTS
 * Never empty, never partial, never null
 * Used when tenant ID is unknown or theme load fails
 */
export const DEFAULT_THEME: SemanticTheme = {
  version: THEME_CONTRACT_VERSION,
  tenantId: "default",
  label: "Default Theme",

  colors: {
    primary: "#0066cc",
    primaryHover: "#0052a3",
    primaryActive: "#003d7a",
    primaryDisabled: "#99ccff",

    secondary: "#667399",
    secondaryHover: "#4d5a7a",
    secondaryActive: "#334466",

    success: "#00aa44",
    successLight: "#ccf0dd",
    warning: "#ffaa00",
    warningLight: "#fff4e6",
    error: "#dd0000",
    errorLight: "#ffcccc",
    info: "#0099dd",
    infoLight: "#e6f2ff",

    neutral900: "#0a0a0a",
    neutral800: "#1a1a1a",
    neutral700: "#333333",
    neutral600: "#4d4d4d",
    neutral500: "#666666",
    neutral400: "#999999",
    neutral300: "#cccccc",
    neutral200: "#e6e6e6",
    neutral100: "#f5f5f5",
    neutral50: "#fafafa",

    overlay: "rgba(0, 0, 0, 0.5)",
    overlayHover: "rgba(0, 0, 0, 0.7)",
  },

  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontFamilyMono: "'Fira Code', 'Courier New', monospace",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemibold: 600,
    fontWeightBold: 700,
    lineHeightTight: 1.2,
    lineHeightNormal: 1.5,
    lineHeightRelaxed: 1.75,
    lineHeightLoose: 2,
    letterSpacingTight: "-0.02em",
    letterSpacingNormal: "0em",
    letterSpacingWide: "0.04em",
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },

  radius: {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    full: "9999px",
  },

  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
} as const;
