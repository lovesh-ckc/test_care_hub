"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { feedback as createFeedback } from "@care-hub/lib/feedback";
import { readPreferences, writePreferences, type FeedbackPreferences } from "@care-hub/lib/feedback/preferences";

type FeedbackContextValue = {
  preferences: FeedbackPreferences;
  setPreferences: (next: FeedbackPreferences) => void;
  tap: () => void;
  confirm: () => void;
  error: () => void;
  sos: () => void;
};

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferencesState] = useState<FeedbackPreferences>(readPreferences);

  useEffect(() => {
    setPreferencesState(readPreferences());
  }, []);

  const setPreferences = useCallback((next: FeedbackPreferences) => {
    setPreferencesState(next);
    writePreferences(next);
  }, []);

  const feedbackApi = useMemo(
    () => createFeedback({ prefs: preferences, prefersReducedMotion: prefersReducedMotion() }),
    [preferences]
  );

  const value = useMemo(
    () => ({
      preferences,
      setPreferences,
      tap: feedbackApi.tap,
      confirm: feedbackApi.confirm,
      error: feedbackApi.error,
      sos: feedbackApi.sos,
    }),
    [preferences, setPreferences, feedbackApi]
  );

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
}

export const useFeedback = () => {
  const ctx = useContext(FeedbackContext);
  if (!ctx) {
    throw new Error("useFeedback must be used within FeedbackProvider");
  }
  return ctx;
};
