import { hapticPatterns, vibrate } from "./haptics";
import { playSound } from "./sounds";
import type { FeedbackPreferences } from "./preferences";

type FeedbackOptions = {
  prefs: FeedbackPreferences;
  prefersReducedMotion: boolean;
};

const shouldPlaySound = (opts: FeedbackOptions) =>
  opts.prefs.soundsEnabled && !opts.prefersReducedMotion;

const shouldVibrate = (opts: FeedbackOptions) => opts.prefs.hapticsEnabled;

export const feedback = (opts: FeedbackOptions) => ({
  tap: () => {
    if (shouldVibrate(opts)) vibrate(hapticPatterns.lightTap);
    if (shouldPlaySound(opts)) playSound("tap");
  },
  confirm: () => {
    if (shouldVibrate(opts)) vibrate(hapticPatterns.confirm);
    if (shouldPlaySound(opts)) playSound("confirm");
  },
  error: () => {
    if (shouldVibrate(opts)) vibrate(hapticPatterns.error);
    if (shouldPlaySound(opts)) playSound("error");
  },
  sos: () => {
    if (shouldVibrate(opts)) vibrate(hapticPatterns.sos);
    if (shouldPlaySound(opts)) playSound("sos");
  },
});
