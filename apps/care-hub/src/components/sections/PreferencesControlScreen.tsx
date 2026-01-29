"use client";

import Image from "next/image";
import { useFeedback } from "@care-hub/components/feedback/FeedbackProvider";

type PreferencesControlScreenProps = {
  onBack?: () => void;
};

const notificationSettings = [
  { label: "Push Notifications", detail: "Receive app notifications", enabled: true },
  { label: "Email Notifications", detail: "Get updates via email", enabled: true },
  { label: "SMS Notifications", detail: "Receive text messages", enabled: false },
];

const communicationSettings = [
  { label: "Allow Voice Calls", detail: "Doctors can call you directly", enabled: true },
  { label: "Allow Messages", detail: "Receive messages from care team", enabled: true },
];

const displaySettings = [
  { label: "Dark Mode", detail: "Enable dark theme", enabled: false },
  { label: "Sound Effects", detail: "Enable notification sounds", enabled: true },
];

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <div className={`h-5 w-10 rounded-full p-1 ${enabled ? "bg-orange-100" : "bg-gray-200"}`}>
      <div className={`h-3 w-3 rounded-full ${enabled ? "bg-orange-400 ml-auto" : "bg-gray-300"}`} />
    </div>
  );
}

function SettingsCard({ title, items }: { title: string; items: { label: string; detail: string; enabled: boolean }[] }) {
  return (
    <div className="mt-4">
      <div className="text-sm font-semibold text-gray-700 motion-fade-up">{title}</div>
      <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm motion-fade-up card-hover">
        <div className="flex flex-col gap-4 text-gray-500 font-ibm-plex-sans">
          {items.map((item, index) => (
            <div key={item.label} className={`${index < items.length - 1 ? "border-b border-gray-100 pb-4" : ""}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-gray-700 font-semibold">{item.label}</div>
                  <div className="text-xs">{item.detail}</div>
                </div>
                <Toggle enabled={item.enabled} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PreferencesControlScreen({ onBack }: PreferencesControlScreenProps) {
  const { tap } = useFeedback();
  return (
    <div className="min-h-screen text-left text-black font-haas-grot-disp-trial">
      <div className="care-shell min-h-screen bg-[#FAF9F8] care-padding bg-[#FAF9F8] pb-6 pt-3">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-sandybrown text-sandybrown"
          onClick={() => {
            tap();
            onBack?.();
          }}
          aria-label="Back"
        >
          <Image className="h-4 w-4" width={16} height={16} alt="" src="/Leftarrow.svg" />
        </button>

        <div className="mt-4">
          <div className="text-xl font-semibold motion-fade-up">Preferences & Control</div>
          <div className="text-sm text-gray-500 font-ibm-plex-sans motion-fade-up delay-1">Notifications and Themes</div>
        </div>

        <SettingsCard title="Notification Settings" items={notificationSettings} />
        <SettingsCard title="Communication Permissions" items={communicationSettings} />
        <SettingsCard title="Display & Sound" items={displaySettings} />

        <button type="button" className="mt-6 w-full rounded-2xl bg-orange-400 px-4 py-3 text-sm font-semibold text-white motion-fade-up delay-4">
          Save Preferences
        </button>
      </div>
    </div>
  );
}
