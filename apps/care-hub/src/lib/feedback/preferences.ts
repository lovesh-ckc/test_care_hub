export type FeedbackPreferences = {
  hapticsEnabled: boolean;
  soundsEnabled: boolean;
};

const STORAGE_KEY = "careHub.feedbackPrefs.v1";

export const getDefaultPreferences = (): FeedbackPreferences => ({
  hapticsEnabled: typeof navigator !== "undefined" && "vibrate" in navigator,
  soundsEnabled: false,
});

export const readPreferences = (): FeedbackPreferences => {
  if (typeof window === "undefined") {
    return getDefaultPreferences();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultPreferences();
    const parsed = JSON.parse(raw) as FeedbackPreferences;
    return { ...getDefaultPreferences(), ...parsed };
  } catch {
    return getDefaultPreferences();
  }
};

export const writePreferences = (prefs: FeedbackPreferences) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // ignore storage errors
  }
};
