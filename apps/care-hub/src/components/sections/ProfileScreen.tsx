"use client";

import Image from "next/image";

type ProfileScreenProps = {
  onBack?: () => void;
  onClinicalCare?: () => void;
  onDeviceManagement?: () => void;
  onPreferences?: () => void;
};

const profileItems = [
  {
    id: "clinical",
    title: "Clinical Care Overview",
    subtitle: "St. Jude Medical Center | Active Virtual Care | Dr. Sarah Jenkins",
  },
  {
    id: "devices",
    title: "Device Management",
    subtitle: "St. Jude Medical Center | Active Virtual Care | Dr. Sarah Jenkins",
  },
  {
    id: "preferences",
    title: "Preferences & Controls",
    subtitle: "Language Preference | Notification & Call/Message Settings",
  },
  {
    id: "safety",
    title: "Safety & Emergency",
    subtitle: "Emergency Contact Details | How SOS Works & Instructions",
  },
  {
    id: "support",
    title: "Support Center",
    subtitle: "How to Use & Device Help",
  },
  {
    id: "security",
    title: "Security & Session",
    subtitle: "Consent Status & Data Usage",
  },
];

export function ProfileScreen({
  onBack,
  onClinicalCare,
  onDeviceManagement,
  onPreferences,
}: ProfileScreenProps) {
  const handleItemClick = (id: string) => {
    if (id === "clinical") onClinicalCare?.();
    if (id === "devices") onDeviceManagement?.();
    if (id === "preferences") onPreferences?.();
  };

  return (
    <div className="min-h-screen text-left text-black font-haas-grot-disp-trial">
      <div className="mx-auto bg-black/5 w-full max-w-md bg-whitesmoke px-4 pb-6 pt-3">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-sandybrown text-sandybrown"
          onClick={onBack}
          aria-label="Back"
        >
          <Image className="h-4 w-4" width={16} height={16} alt="" src="/Leftarrow.svg" />
        </button>

        <div className="mt-6 rounded-num-20 bg-white p-4 shadow-md">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                className="h-16 w-16 rounded-full object-cover"
                width={64}
                height={64}
                alt=""
                src="/icons/patient.svg"
              />
              <button
                type="button"
                className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500"
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5h7v14H5V5h7Zm0 0V3m0 2H5m7 0h7M9 12h6M12 9v6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div>
              <div className="text-lg font-semibold">Rashi Agrawal</div>
              <div className="text-sm text-gray-500 font-ibm-plex-sans">#rashi.agrawal0789</div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-700 font-ibm-plex-sans">
                <span className="rounded-full bg-gray-200 px-3 py-1">Female</span>
                <span className="rounded-full bg-gray-200 px-3 py-1">45</span>
                <span className="rounded-full bg-gray-200 px-3 py-1">+91 00000 - 00000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {profileItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="flex items-center justify-between rounded-num-20 bg-white px-4 py-3 text-left shadow-sm"
              onClick={() => handleItemClick(item.id)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 6v6l4 2M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700">{item.title}</div>
                  <div className="text-xs text-gray-500 font-ibm-plex-sans">{item.subtitle}</div>
                </div>
              </div>
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-gray-500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 4l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
