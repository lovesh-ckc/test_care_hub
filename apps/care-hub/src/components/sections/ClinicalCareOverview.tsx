"use client";

import Image from "next/image";

type ClinicalCareOverviewProps = {
  onBack?: () => void;
};

const vitalCards = [
  { label: "Heart rate", value: "68", unit: "bpm", status: "Normal", color: "text-red-500" },
  { label: "Blood Oxygen", value: "98", unit: "%", status: "Normal", color: "text-blue-500" },
  { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "Normal", color: "text-emerald-600" },
  { label: "Temperature", value: "98.4", unit: "°F", status: "Normal", color: "text-orange-500" },
];

const testResults = [
  { label: "Virtual Consultation", detail: "Dr. Sarah Jenkins | Today, 2:00 PM", status: "Upcoming", accent: "border-red-400", pill: "bg-orange-100 text-orange-500" },
  { label: "Follow Up", detail: "Dr. Sarah Jenkins | Today, 2:00 PM", status: "Scheduled", accent: "border-emerald-400", pill: "bg-emerald-100 text-emerald-600" },
  { label: "Check Up", detail: "Dr. Sarah Jenkins | June 5, 2:00 PM", status: "Completed", accent: "border-gray-200", pill: "bg-gray-200 text-gray-700" },
];

export function ClinicalCareOverview({ onBack }: ClinicalCareOverviewProps) {
  return (
    <div className="min-h-screen text-left text-black font-haas-grot-disp-trial ">
      <div className="care-shell min-h-screen care-padding bg-black/5 pb-6 pt-3 bg-black/5">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-sandybrown text-sandybrown"
          onClick={onBack}
          aria-label="Back"
        >
          <Image className="h-4 w-4" width={16} height={16} alt="" src="/Leftarrow.svg" />
        </button>

        <div className="mt-4">
          <div className="text-xl font-semibold">Clinical Care Overview</div>
          <div className="text-sm text-gray-500 font-ibm-plex-sans">St. Jude Medical Center</div>
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold text-gray-700">Vital Signs</div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-gray-500 font-ibm-plex-sans">
            {vitalCards.map((card) => (
              <div key={card.label} className="rounded-num-20 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">{card.label}</div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-600">Normal</span>
                </div>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-xl font-semibold text-gray-400">{card.value}</span>
                  <span className="text-xs">{card.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold text-gray-700">Test Results</div>
          <div className="mt-3 flex flex-col gap-3 text-gray-500 font-ibm-plex-sans">
            {testResults.map((item) => (
              <div key={item.label} className={`rounded-num-20 bg-white p-4 shadow-sm border-l-4 ${item.accent}`}>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-700">{item.label}</div>
                  <span className={`rounded-full px-3 py-1 text-xs ${item.pill}`}>{item.status}</span>
                </div>
                <div className="text-xs text-gray-500">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold text-gray-700">Quick Actions</div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button type="button" className="rounded-xl bg-orange-400 p-2 text-sm font-semibold text-white">
              Schedule Appointment
            </button>
            <button type="button" className="rounded-xl bg-white p-2 text-sm font-semibold text-orange-400 shadow-sm">
              Contact Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
