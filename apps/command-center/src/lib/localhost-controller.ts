"use client";

import { useEffect, useRef } from "react";

/**
 * LOCALHOST DESIGN CONTROLLER - DEVELOPMENT ONLY
 * Mutates CSS variables at runtime from dev UI
 * NEVER persists to build artifacts
 * NEVER triggers rebuild
 * NEVER active in production
 * Fully isolated from theme registry
 */

interface LocalhostControllerState {
  isActive: boolean;
  isDirty: boolean;
  currentOverrides: Record<string, string>;
}

const STATE: LocalhostControllerState = {
  isActive: false,
  isDirty: false,
  currentOverrides: {},
};

/**
 * Check if localhost controller should be enabled
 */
function isLocalhostEnvironment(): boolean {
  if (typeof window === "undefined") return false;

  const hostname = window.location.hostname;
  const isDevEnv = process.env.NODE_ENV === "development";

  return isDevEnv && (hostname === "localhost" || hostname === "127.0.0.1");
}

/**
 * Enable localhost controller (dev UI call)
 */
export function enableLocalhostController(): void {
  if (!isLocalhostEnvironment()) {
    console.warn("[LocalhostController] Not a localhost environment, ignoring");
    return;
  }

  STATE.isActive = true;
  console.log("[LocalhostController] Enabled");
}

/**
 * Disable localhost controller
 */
export function disableLocalhostController(): void {
  STATE.isActive = false;
  STATE.isDirty = false;
  STATE.currentOverrides = {};
  console.log("[LocalhostController] Disabled and cleared");
}

/**
 * Update a single CSS variable at runtime
 * Does NOT persist, does NOT trigger rebuild
 */
export function mutateCSSVariable(
  variableName: string,
  value: string
): void {
  if (!STATE.isActive) {
    console.warn(
      "[LocalhostController] Not active, ignoring mutation request"
    );
    return;
  }

  if (typeof window === "undefined" || !document.documentElement) {
    return;
  }

  try {
    // Store override
    STATE.currentOverrides[variableName] = value;
    STATE.isDirty = true;

    // Apply to DOM
    document.documentElement.style.setProperty(variableName, value);

    console.debug(
      `[LocalhostController] Mutated ${variableName} = ${value}`
    );
  } catch (error) {
    console.error(
      `[LocalhostController] Failed to mutate ${variableName}:`,
      error
    );
  }
}

/**
 * Batch update multiple CSS variables
 */
export function mutateCSSVariables(
  updates: Record<string, string>
): void {
  for (const [variable, value] of Object.entries(updates)) {
    mutateCSSVariable(variable, value);
  }
}

/**
 * Get current overrides (for dev UI display)
 */
export function getLocalhostOverrides(): Record<string, string> {
  return { ...STATE.currentOverrides };
}

/**
 * Reset to base theme (undo all overrides)
 * Does NOT reload page, just resets CSS
 */
export function resetLocalhostOverrides(): void {
  if (!STATE.isActive) return;

  if (typeof window === "undefined" || !document.documentElement) {
    return;
  }

  for (const variableName of Object.keys(STATE.currentOverrides)) {
    document.documentElement.style.removeProperty(variableName);
  }

  STATE.currentOverrides = {};
  STATE.isDirty = false;

  console.log("[LocalhostController] Reset all overrides");
}

/**
 * Check if any overrides are active
 */
export function hasLocalhostOverrides(): boolean {
  return Object.keys(STATE.currentOverrides).length > 0;
}

/**
 * React hook for accessing localhost controller
 * Only available in development on localhost
 */
export function useLocalhostController() {
  const isAvailableRef = useRef<boolean>(isLocalhostEnvironment());

  useEffect(() => {
    if (!isAvailableRef.current) return;

    // Mount UI or establish communication channel here
    enableLocalhostController();

    return () => {
      // Cleanup on unmount
      disableLocalhostController();
    };
  }, []);

  if (!isAvailableRef.current) {
    return {
      isActive: false,
      mutateCSSVariable: () => {},
      resetOverrides: () => {},
      getOverrides: () => ({}),
      hasOverrides: () => false,
    };
  }

  return {
    isActive: STATE.isActive,
    mutateCSSVariable,
    resetOverrides: resetLocalhostOverrides,
    getOverrides: getLocalhostOverrides,
    hasOverrides: hasLocalhostOverrides,
  };
}
