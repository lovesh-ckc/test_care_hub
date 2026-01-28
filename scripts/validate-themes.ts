/**
 * BUILD VALIDATION SCRIPT
 * Runs during build to validate all themes
 * Fails build on invalid themes
 * Ensures CI determinism
 */

import fs from "fs";
import path from "path";
import {
  validateSemanticThemeShape,
  THEME_CONTRACT_VERSION,
} from "../packages/theme-contracts/src/index";

interface ValidationResult {
  success: boolean;
  errors: string[];
  warnings: string[];
  tenantsValidated: number;
}

const result: ValidationResult = {
  success: true,
  errors: [],
  warnings: [],
  tenantsValidated: 0,
};

/**
 * Load and validate a theme file
 */
function validateThemeFile(filePath: string): boolean {
  if (!fs.existsSync(filePath)) {
    result.errors.push(`Theme file not found: ${filePath}`);
    return false;
  }

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const theme = JSON.parse(content);

    // Validate schema
    validateSemanticThemeShape(theme);

    // Ensure version matches contract
    if (theme.version !== THEME_CONTRACT_VERSION) {
      result.errors.push(
        `Version mismatch in ${path.basename(
          filePath
        )}: expected ${THEME_CONTRACT_VERSION}, got ${theme.version}`
      );
      return false;
    }

    // Validate CSS variables are valid strings
    const invalidValues = [];
    for (const [key, value] of Object.entries(theme.colors)) {
      if (
        value === undefined ||
        value === null ||
        value === "" ||
        value === "NaN"
      ) {
        invalidValues.push(`colors.${key}`);
      }
    }

    if (invalidValues.length > 0) {
      result.errors.push(
        `Invalid color values in ${path.basename(
          filePath
        )}: ${invalidValues.join(", ")}`
      );
      return false;
    }

    result.tenantsValidated++;
    return true;
  } catch (error) {
    result.errors.push(
      `Failed to parse ${path.basename(filePath)}: ${String(error)}`
    );
    return false;
  }
}

/**
 * Validate globals.css contains all required variables
 */
function validateGlobalsCss(cssFilePath: string): boolean {
  if (!fs.existsSync(cssFilePath)) {
    result.errors.push(`globals.css not found: ${cssFilePath}`);
    return false;
  }

  const content = fs.readFileSync(cssFilePath, "utf-8");
  const requiredVariables = [
    // Colors
    "--color-primary",
    "--color-success",
    "--color-warning",
    "--color-error",
    "--color-neutral-900",
    "--color-neutral-50",
    // Typography
    "--font-family",
    "--font-weight-regular",
    "--line-height-normal",
    // Spacing
    "--spacing-xs",
    "--spacing-md",
    "--spacing-3xl",
    // Radius
    "--radius-none",
    "--radius-full",
    // Shadows
    "--shadow-sm",
    "--shadow-xl",
  ];

  const missing = requiredVariables.filter((v) => !content.includes(v));

  if (missing.length > 0) {
    result.errors.push(
      `globals.css missing required variables: ${missing.join(", ")}`
    );
    return false;
  }

  return true;
}

/**
 * Validate tailwind.config.js only references CSS variables
 */
function validateTailwindConfig(configPath: string): boolean {
  if (!fs.existsSync(configPath)) {
    result.errors.push(`tailwind.config.js not found: ${configPath}`);
    return false;
  }

  const content = fs.readFileSync(configPath, "utf-8");

  // Check for hardcoded color values (red flag)
  const hardcodedColorPattern = /#[0-9a-fA-F]{6}/g;
  const matches = content.match(hardcodedColorPattern) || [];

  if (matches.length > 0) {
    result.errors.push(
      `tailwind.config.js contains hardcoded color values: ${matches.join(", ")}`
    );
    return false;
  }

  // Ensure var() references
  if (!content.includes("var(--")) {
    result.warnings.push(
      "tailwind.config.js may not be using CSS variables"
    );
  }

  return true;
}

/**
 * Main validation
 */
function main(): void {
  const rootDir = process.cwd();
  const themesDir = path.join(rootDir, "themes");
  const globalsPath = path.join(
    rootDir,
    "apps/command-center/src/globals.css"
  );
  const tailwindPath = path.join(
    rootDir,
    "apps/command-center/tailwind.config.js"
  );

  console.log("🔍 Validating semantic theme system...\n");

  // Validate all theme files
  if (fs.existsSync(themesDir)) {
    const files = fs.readdirSync(themesDir).filter((f) => f.endsWith(".json"));

    for (const file of files) {
      const filePath = path.join(themesDir, file);
      console.log(`  Checking ${file}...`);

      if (!validateThemeFile(filePath)) {
        result.success = false;
      }
    }
  } else {
    result.warnings.push(`Themes directory not found: ${themesDir}`);
  }

  // Validate globals.css
  console.log(`\n  Checking globals.css...`);
  if (!validateGlobalsCss(globalsPath)) {
    result.success = false;
  }

  // Validate tailwind config
  console.log(`  Checking tailwind.config.js...`);
  if (!validateTailwindConfig(tailwindPath)) {
    result.success = false;
  }

  // Report
  console.log("\n" + "=".repeat(60));
  console.log(`✅ Themes validated: ${result.tenantsValidated}`);

  if (result.errors.length > 0) {
    console.log(`\n❌ Errors (${result.errors.length}):`);
    result.errors.forEach((e) => console.log(`   - ${e}`));
  }

  if (result.warnings.length > 0) {
    console.log(`\n⚠️  Warnings (${result.warnings.length}):`);
    result.warnings.forEach((w) => console.log(`   - ${w}`));
  }

  console.log("=".repeat(60) + "\n");

  if (!result.success) {
    process.exit(1);
  }

  console.log("✨ Theme validation passed!\n");
}

main();
