export type HapticPattern = number | number[];

export const hapticPatterns = {
  lightTap: 12,
  confirm: [20, 30, 20],
  error: [40, 30, 40],
  sos: [60, 40, 60],
} as const;

export const isHapticsSupported = () =>
  typeof navigator !== "undefined" && "vibrate" in navigator;

export const vibrate = (pattern: HapticPattern) => {
  if (!isHapticsSupported()) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    // Ignore unsupported/blocked vibrate calls.
  }
};
