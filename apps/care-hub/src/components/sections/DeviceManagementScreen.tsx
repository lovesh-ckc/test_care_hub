"use client";

import Image from "next/image";
import { useFeedback } from "@care-hub/components/feedback/FeedbackProvider";

type DeviceManagementScreenProps = {
  onBack?: () => void;
};

const devices = [
  { name: "Apple Watch Series 9", type: "Smartwatch", battery: 85, connection: "Strong", sync: "2 mins ago" },
  { name: "Blood Pressure Monitor", type: "Medical Device", battery: 60, connection: "Strong", sync: "2 mins ago" },
  { name: "iPhone 15 Pro", type: "Smartphone", battery: 92, connection: "Strong", sync: "2 mins ago" },
];

const batteryWidth = (battery: number) => {
  if (battery >= 90) return "w-11/12";
  if (battery >= 80) return "w-5/6";
  if (battery >= 70) return "w-3/4";
  if (battery >= 60) return "w-2/3";
  if (battery >= 50) return "w-1/2";
  if (battery >= 40) return "w-2/5";
  if (battery >= 30) return "w-1/3";
  if (battery >= 20) return "w-1/4";
  return "w-1/6";
};

const settings = [
  { label: "Auto Sync", detail: "Automatically sync data from devices", enabled: true },
  { label: "Auto Connect", detail: "Connect to devices automatically", enabled: true },
  { label: "Device Notifications", detail: "Get alerts about device status", enabled: true },
];

export function DeviceManagementScreen({ onBack }: DeviceManagementScreenProps) {
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
          <div className="text-xl font-semibold motion-fade-up">Device Management</div>
          <div className="text-sm text-gray-500 font-ibm-plex-sans motion-fade-up delay-1">Connected Devices & Settings</div>
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold text-gray-700 motion-fade-up delay-2">Connected Devices</div>
          <div className="mt-3 flex flex-col gap-4">
            {devices.map((device) => (
              <div key={device.name} className="rounded-2xl bg-white p-4 shadow-sm motion-fade-up card-hover">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M9 7h6M9 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700">{device.name}</div>
                      <div className="text-xs text-gray-500 font-ibm-plex-sans">{device.type}</div>
                    </div>
                  </div>
                  <div className="h-5 w-10 rounded-full bg-orange-100 p-1">
                    <div className="h-3 w-3 rounded-full bg-orange-400 ml-auto" />
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500 font-ibm-plex-sans">
                  <div className="flex items-center justify-between">
                    <span>Battery</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-gray-200">
                        <div className={`h-1.5 rounded-full bg-emerald-700 ${batteryWidth(device.battery)}`} />
                      </div>
                      <span className="text-gray-700">{device.battery}%</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span>Connection</span>
                    <span className="text-emerald-700">{device.connection}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span>Last Sync</span>
                    <span>{device.sync}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold text-gray-700 motion-fade-up delay-3">Device Settings</div>
          <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm motion-fade-up delay-4 card-hover">
            <div className="flex flex-col gap-4 text-gray-500 font-ibm-plex-sans">
              {settings.map((setting, index) => (
                <div key={setting.label} className={`${index < settings.length - 1 ? "border-b border-gray-100 pb-4" : ""}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-700 font-semibold">{setting.label}</div>
                      <div className="text-xs">{setting.detail}</div>
                    </div>
                    <div className="h-5 w-10 rounded-full bg-orange-100 p-1">
                      <div className="h-3 w-3 rounded-full bg-orange-400 ml-auto" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button type="button" className="mt-4 w-full rounded-2xl bg-orange-400 px-4 py-3 text-sm font-semibold text-white motion-fade-up delay-4">
            Add New Device
          </button>
        </div>
      </div>
    </div>
  );
}

