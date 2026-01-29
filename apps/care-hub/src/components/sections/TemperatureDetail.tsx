"use client";

import Image from "next/image";
import { ProfileHeader } from "@care-hub/components/sections/ProfileHeader";

type TemperatureDetailProps = {
  onBack?: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
};

const ranges = [
  {
    label: "Low",
    range: "< 36.1°C (97°F)",
    note: "Hypothermia risk",
    color: "bg-sky-500",
    background: "bg-gray-200",
  },
  {
    label: "Normal",
    range: "36.1-37.2°C (97-99°F)",
    note: "Healthy range",
    color: "bg-teal",
    background: "bg-emerald-50",
    status: "Current",
  },
  {
    label: "Elevated",
    range: "37.3-38°C (99-100.4°F)",
    note: "Slightly elevated",
    color: "bg-orange-400",
    background: "bg-gray-200",
  },
  {
    label: "Fever",
    range: "> 38°C (100.4°F)",
    note: "Requires attention",
    color: "bg-red-500",
    background: "bg-gray-200",
  },
];

const readings = [
  { time: "Today, 9:30 AM", value: "34.5°C", sub: "98.1°F", status: "Normal" },
  { time: "Yesterday, 6:00 PM", value: "36.8°C", sub: "98.2°F", status: "Normal" },
  { time: "Yesterday, 9:00 AM", value: "36.7°C", sub: "98.1°F", status: "Normal" },
  { time: "Jan 26, 7:30 PM", value: "36.9°C", sub: "98.4°F", status: "Normal" },
];

const factors = [
  {
    title: "Time of Day",
    detail: "Temperature is typically lower in the morning and higher in the evening",
  },
  {
    title: "Physical Activity",
    detail: "Exercise can temporarily increase body temperature",
  },
  {
    title: "Food & Drink",
    detail: "Hot or cold beverages can affect oral temperature readings",
  },
  {
    title: "Weather",
    detail: "Ambient temperature can influence body temperature",
  },
  {
    title: "Menstrual Cycle",
    detail: "Women may experience slight temperature variations during their cycle",
  },
  {
    title: "Illness",
    detail: "Infections and illness commonly cause fever",
  },
];

export function TemperatureDetail({ onBack, onNotificationsClick, onProfileClick }: TemperatureDetailProps) {
  return (
    <div className="min-h-screen text-left text-black font-haas-grot-disp-trial">
      <div className="care-shell care-padding bg-black/5 pb-6 pt-3">
        <ProfileHeader
          name="Rashi Agrawal"
          handle="#rashi.agrawal0789"
          avatarSrc="/icons/patient.svg"
          bellIconSrc="/icons/bell-01.svg"
          onBellClick={onNotificationsClick}
          onProfileClick={onProfileClick}
        />

        <div className="mt-4 flex items-center gap-2 text-lg font-semibold">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-sandybrown text-sandybrown"
            onClick={onBack}
            aria-label="Back"
          >
            <Image className="h-4 w-4" width={16} height={16} alt="" src="/Leftarrow.svg" />
          </button>
          <span>Temperature</span>
        </div>

        <div className="mt-4 rounded-num-20 bg-white p-4 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-end gap-2 text-gray-400">
                <span className="text-3xl font-semibold text-gray-400">34.5</span>
                <span className="text-sm text-gray-500 font-ibm-plex-sans">°C</span>
              </div>
              <div className="text-sm text-teal font-ibm-plex-sans">Normal</div>
              <div className="mt-1 text-xs text-gray-500 font-ibm-plex-sans">98.1°F</div>
            </div>
            <Image className="h-8 w-8" width={32} height={32} alt="" src="/vitals/Temperature.svg" />
          </div>

          <div className="mt-4">
            <div className="relative h-3 w-full overflow-hidden rounded-full">
              <div className="flex h-full w-full">
                <div className="h-full w-1/5 bg-sky-400" />
                <div className="h-full w-1/5 bg-emerald-500" />
                <div className="h-full w-1/5 bg-yellow-400" />
                <div className="h-full w-1/5 bg-orange-400" />
                <div className="h-full w-1/5 bg-red-500" />
              </div>
              <div className="absolute left-2/5 top-1/2 h-4 w-10 -translate-y-1/2 rounded-full border-2 border-gray-400 bg-white shadow-sm" />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500 font-ibm-plex-sans">
              <span>Low</span>
              <span>Normal</span>
              <span>High</span>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-num-20 bg-white p-4 shadow-md">
          <div className="text-base font-semibold">Temperature Ranges</div>
          <div className="mt-3 flex flex-col gap-3">
            {ranges.map((range) => (
              <div
                key={range.label}
                className={`flex items-center justify-between rounded-xl px-3 py-3 ${range.background}`}
              >
                <div>
                  <div className="text-sm">
                    {range.label}{" "}
                    {range.status ? <span className="text-xs text-gray-500 font-ibm-plex-sans">({range.status})</span> : null}
                  </div>
                  <div className="text-xs text-gray-500 font-ibm-plex-sans">{range.range}</div>
                  <div className="text-xs text-gray-500 font-ibm-plex-sans">{range.note}</div>
                </div>
                <span className={`h-3 w-3 rounded-full ${range.color}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-num-20 bg-white p-4 shadow-md">
          <div className="text-base font-semibold">Recent Readings</div>
          <div className="mt-3 flex flex-col gap-3 text-gray-500 font-ibm-plex-sans">
            {readings.map((reading) => (
              <div key={reading.time} className="rounded-xl bg-black/5 px-3 py-3 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-700">{reading.time}</div>
                  <div className="text-xs">{reading.sub}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-400">{reading.value}</div>
                  <div className="text-xs text-teal">{reading.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-num-20 bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold">7-Day Trend</div>
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-teal" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 13l5-5 3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-gray-500 font-ibm-plex-sans">
            {["M","T","W","T","F","S","S"].map((day, index) => (
              <div key={`${day}-${index}`} className="text-xs">
                <div>{day}</div>
                <div className="text-gray-400">36.7°C</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-3 text-xs text-gray-500 font-ibm-plex-sans">
            Your body temperature has been consistently normal throughout the week.
          </div>
        </div>

        <div className="mt-4 rounded-num-20 bg-white p-4 shadow-md">
          <div className="flex items-center gap-2 text-base font-semibold">
            <div className="h-5 w-5 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center text-xs">i</div>
            Factors That Affect Body Temperature
          </div>
          <div className="mt-3 flex flex-col gap-3 text-gray-500 font-ibm-plex-sans">
            {factors.map((factor) => (
              <div key={factor.title} className="rounded-xl bg-black/5 p-3">
                <div className="text-sm text-gray-700 font-semibold">{factor.title}</div>
                <div className="text-xs">{factor.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
