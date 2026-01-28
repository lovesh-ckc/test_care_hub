import type { SemanticTheme } from "@eumetise/theme-contracts";
import {
  validateSemanticThemeShape,
  isValidSemanticTheme,
} from "@eumetise/theme-contracts";

/**
 * ADMIN THEME EDITOR - CONTROL CENTER
 * Operates on semantic tokens only
 * Prevents invalid formats, empty values, NaN, malformed input
 * Supports live preview WITHOUT mutating persisted state
 * Explicit publish/rollback flow required
 */

export interface ThemeEditorState {
  original: SemanticTheme;
  current: SemanticTheme;
  isDirty: boolean;
  validationErrors: string[];
}

/**
 * Validate a color value
 */
function isValidColor(value: string): boolean {
  if (typeof value !== "string" || value.trim() === "") {
    return false;
  }

  // Hex format
  if (/^#[0-9a-fA-F]{6}$/.test(value)) {
    return true;
  }

  // RGB format
  if (
    /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)$/.test(value)
  ) {
    return true;
  }

  return false;
}

/**
 * Validate a spacing/sizing value
 */
function isValidUnit(value: string): boolean {
  if (typeof value !== "string" || value.trim() === "") {
    return false;
  }

  return /^\d+\.?\d*(rem|px|em)$/.test(value) || value === "0";
}

/**
 * Create initial editor state
 */
export function createEditorState(
  originalTheme: SemanticTheme
): ThemeEditorState {
  return {
    original: JSON.parse(JSON.stringify(originalTheme)),
    current: JSON.parse(JSON.stringify(originalTheme)),
    isDirty: false,
    validationErrors: [],
  };
}

/**
 * Update a color in current theme
 * Validates before update, never corrupts state
 */
export function updateThemeColor(
  state: ThemeEditorState,
  path: string,
  value: string
): ThemeEditorState {
  if (!isValidColor(value)) {
    return {
      ...state,
      validationErrors: [
        ...state.validationErrors,
        `Invalid color for ${path}: must be valid hex (#RRGGBB) or rgba(r, g, b, a)`,
      ],
    };
  }

  const newCurrent = JSON.parse(JSON.stringify(state.current));
  const parts = path.split(".");

  if (parts[0] !== "colors") {
    return state;
  }

  const colorKey = parts[1] as keyof typeof newCurrent.colors;
  newCurrent.colors[colorKey] = value;

  return {
    ...state,
    current: newCurrent,
    isDirty: true,
    validationErrors: state.validationErrors.filter((e) => !e.includes(path)),
  };
}

/**
 * Update a spacing value
 */
export function updateThemeSpacing(
  state: ThemeEditorState,
  path: string,
  value: string
): ThemeEditorState {
  if (!isValidUnit(value)) {
    return {
      ...state,
      validationErrors: [
        ...state.validationErrors,
        `Invalid spacing for ${path}: must be valid unit (rem, px, em)`,
      ],
    };
  }

  const newCurrent = JSON.parse(JSON.stringify(state.current));
  const parts = path.split(".");

  if (parts[0] !== "spacing") {
    return state;
  }

  const key = parts[1] as keyof typeof newCurrent.spacing;
  newCurrent.spacing[key] = value;

  return {
    ...state,
    current: newCurrent,
    isDirty: true,
    validationErrors: state.validationErrors.filter((e) => !e.includes(path)),
  };
}

/**
 * Get current preview theme (for live preview without persisting)
 */
export function getPreviewTheme(state: ThemeEditorState): SemanticTheme {
  return state.current;
}

/**
 * Validate current theme against contract
 * Returns error array, empty if valid
 */
export function validateCurrentTheme(
  state: ThemeEditorState
): string[] {
  try {
    validateSemanticThemeShape(state.current);
    return [];
  } catch (error) {
    return [String(error instanceof Error ? error.message : "Unknown error")];
  }
}

/**
 * Prepare for publish: final validation
 * Returns validation errors, publish is blocked if any exist
 */
export function canPublish(state: ThemeEditorState): boolean {
  const validationErrors = validateCurrentTheme(state);
  return validationErrors.length === 0 && isValidSemanticTheme(state.current);
}

/**
 * Rollback to original theme
 */
export function rollbackTheme(
  state: ThemeEditorState
): ThemeEditorState {
  return {
    ...state,
    current: JSON.parse(JSON.stringify(state.original)),
    isDirty: false,
    validationErrors: [],
  };
}

/**
 * Get changes between original and current
 */
export function getThemeChanges(
  state: ThemeEditorState
): Record<string, { original: unknown; current: unknown }> {
  const changes: Record<string, { original: unknown; current: unknown }> = {};

  function compareRecursive(
    orig: unknown,
    curr: unknown,
    prefix: string = ""
  ): void {
    if (
      (typeof orig !== "object" && typeof curr !== "object") ||
      orig === null ||
      curr === null
    ) {
      if (orig !== curr) {
        changes[prefix] = { original: orig, current: curr };
      }
      return;
    }

    if (typeof orig !== "object" || typeof curr !== "object") {
      changes[prefix] = { original: orig, current: curr };
      return;
    }

    const origObj = orig as Record<string, unknown>;
    const currObj = curr as Record<string, unknown>;

    for (const key of Object.keys(currObj)) {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      compareRecursive(origObj[key], currObj[key], newPrefix);
    }
  }

  compareRecursive(state.original, state.current);
  return changes;
}
