"use client";

import Image from "next/image";
import { useFeedback } from "@care-hub/components/feedback/FeedbackProvider";

type TemperatureDetailProps = {
  onBack?: () => void;
};

const ranges = [
  {
    label: "Low",
    range: "< 36.1Â°C (97Â°F)",
    note: "Hypothermia risk",
    color: "bg-sky-500",
    background: "bg-gray-200",
  },
  {
    label: "Normal",
    range: "36.1-37.2Â°C (97-99Â°F)",
    note: "Healthy range",
    color: "bg-teal",
    background: "bg-emerald-50",
    status: "Current",
  },
  {
    label: "Elevated",
    range: "37.3-38Â°C (99-100.4Â°F)",
    note: "Slightly elevated",
    color: "bg-orange-400",
    background: "bg-gray-200",
  },
  {
    label: "Fever",
    range: "> 38Â°C (100.4Â°F)",
    note: "Requires attention",
    color: "bg-red-500",
    background: "bg-gray-200",
  },
];

const readings = [
  { time: "Today, 9:30 AM", value: "34.5Â°C", sub: "98.1Â°F", status: "Normal" },
  { time: "Yesterday, 6:00 PM", value: "36.8Â°C", sub: "98.2Â°F", status: "Normal" },
  { time: "Yesterday, 9:00 AM", value: "36.7Â°C", sub: "98.1Â°F", status: "Normal" },
  { time: "Jan 26, 7:30 PM", value: "36.9Â°C", sub: "98.4Â°F", status: "Normal" },
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

export function TemperatureDetail({ onBack}: TemperatureDetailProps) {
  const { tap } = useFeedback();
  return (
<>

        <div className="mt-4 flex items-center gap-2 text-lg font-semibold motion-fade-up">
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
          <span>Temperature</span>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md motion-fade-up delay-1 card-hover">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-end gap-2 text-gray-400">
                <span className="text-3xl font-semibold text-black">34.5</span>
                <span className="text-sm text-gray-500 font-ibm-plex-sans">Â°C</span>
              </div>
              <div className="text-sm text-[#518D73] ">Normal</div>
              <div className="mt-1 text-xs text-gray-500 font-ibm-plex-sans">98.1Â°F</div>
            </div>
            <Image className="h-8 w-8 motion-pulse" width={32} height={32} alt="" src="/vitals/Temperature.svg" />
          </div>

          <div className="mt-4 rounded-2xl bg-[#FAF9F8] p-4">
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-gradient-to-r from-yellow-100 via-orange-200 to-red-300">
              <div className="absolute inset-0 motion-shimmer opacity-40" />
            </div>
            <div className="relative mt-5 h-20">
              <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-gray-200" />
              <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 opacity-70" />
              <div className="temp-marker absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-2 border-white bg-orange-400 shadow-lg motion-pulse">
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-full bg-white px-2 py-0.5 text-[10px] text-gray-700 shadow">
                  34.5Â°C
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500 font-ibm-plex-sans">
              <span>Low</span>
              <span>Normal</span>
              <span>High</span>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md motion-fade-up delay-2 card-hover">
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
                <span className={`h-3 w-3 rounded-full ${range.color} ${range.status ? "motion-pulse" : ""}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md motion-fade-up delay-3 card-hover">
          <div className="text-base font-semibold">Recent Readings</div>
          <div className="mt-3 flex flex-col gap-3 text-gray-500 font-ibm-plex-sans">
            {readings.map((reading) => (
              <div key={reading.time} className="rounded-xl bg-[#FAF9F8] px-3 py-3 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-700">{reading.time}</div>
                  <div className="text-xs">{reading.sub}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-400">{reading.value}</div>
                  <div className="text-xs text-[#518D73]">{reading.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md motion-fade-up delay-4 card-hover">
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold">7-Day Trend</div>
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#518D73]" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 13l5-5 3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-gray-500 font-ibm-plex-sans">
            {["M","T","W","T","F","S","S"].map((day, index) => (
              <div key={`${day}-${index}`} className="text-xs">
                <div>{day}</div>
                <div className="text-gray-400">36.7Â°C</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-3 text-xs text-gray-500 font-ibm-plex-sans">
            Your body temperature has been consistently normal throughout the week.
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md motion-fade-up delay-4 card-hover">
          <div className="flex items-center gap-2 text-base font-semibold">
            <div className="h-5 w-5 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center text-xs">i</div>
            Factors That Affect Body Temperature
          </div>
          <div className="mt-3 flex flex-col gap-3 text-gray-500 font-ibm-plex-sans">
            {factors.map((factor) => (
              <div key={factor.title} className="rounded-xl bg-[#FAF9F8] p-3">
                <div className="text-sm text-gray-700 font-semibold">{factor.title}</div>
                <div className="text-xs">{factor.detail}</div>
              </div>
            ))}
          </div>
        </div>
      
    </>
  );
}

