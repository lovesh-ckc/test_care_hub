"use client";

import { useFeedback } from "./FeedbackProvider";

type FeedbackSettingsSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function FeedbackSettingsSheet({ open, onClose }: FeedbackSettingsSheetProps) {
  const { preferences, setPreferences, tap } = useFeedback();

  if (!open) return null;

  const toggleHaptics = () => {
    const next = { ...preferences, hapticsEnabled: !preferences.hapticsEnabled };
    setPreferences(next);
    tap();
  };

  const toggleSounds = () => {
    const next = { ...preferences, soundsEnabled: !preferences.soundsEnabled };
    setPreferences(next);
    tap();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 px-4 pb-6 pt-20 motion-fade-in">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close settings" />
      <div className="relative w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl motion-fade-up">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-base font-semibold text-gray-800">Haptics & Sound</div>
            <div className="text-xs text-gray-500 font-ibm-plex-sans">
              Control tactile and audio feedback.
            </div>
          </div>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-sandybrown text-sandybrown"
            onClick={onClose}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-[#FAF9F8] px-4 py-3 text-left"
            onClick={toggleHaptics}
          >
            <div>
              <div className="text-sm font-semibold text-gray-800">Haptics</div>
              <div className="text-xs text-gray-500 font-ibm-plex-sans">
                Vibration feedback on taps and SOS.
              </div>
            </div>
            <span
              className={`h-6 w-11 rounded-full p-1 ${
                preferences.hapticsEnabled ? "bg-orange-100" : "bg-gray-200"
              }`}
            >
              <span
                className={`block h-4 w-4 rounded-full ${
                  preferences.hapticsEnabled ? "bg-orange-500 translate-x-5" : "bg-gray-400"
                } transition`}
              />
            </span>
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-[#FAF9F8] px-4 py-3 text-left"
            onClick={toggleSounds}
          >
            <div>
              <div className="text-sm font-semibold text-gray-800">Sounds</div>
              <div className="text-xs text-gray-500 font-ibm-plex-sans">
                Subtle audio cues for actions.
              </div>
            </div>
            <span
              className={`h-6 w-11 rounded-full p-1 ${
                preferences.soundsEnabled ? "bg-orange-100" : "bg-gray-200"
              }`}
            >
              <span
                className={`block h-4 w-4 rounded-full ${
                  preferences.soundsEnabled ? "bg-orange-500 translate-x-5" : "bg-gray-400"
                } transition`}
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
