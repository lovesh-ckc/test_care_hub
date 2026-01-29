"use client";

import Image from "next/image";
import { ProfileHeader } from "@care-hub/components/sections/ProfileHeader";
import { on } from "events";

type Spo2DetailProps = {
  onBack?: () => void;
};

const levels = [
  { label: "Normal", range: "95% - 100%", color: "bg-teal", bar: "bg-gray-200" },
  { label: "Acceptable", range: "90% - 94%", status: "Current", color: "bg-yellow-400", bar: "bg-yellow-50" },
  { label: "Low - Seek Medical Attention", range: "Below 90%", color: "bg-red-500", bar: "bg-gray-200" },
];



export function Spo2Detail({ onBack }: Spo2DetailProps) {
  return (
   <>
        <div className="mt-4 flex items-center gap-2 text-lg font-semibold">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-sandybrown text-sandybrown"
            onClick={onBack}
            aria-label="Back"
          >
            <Image className="h-4 w-4" width={16} height={16} alt="" src="/Leftarrow.svg" />
          </button>
          <span>Blood Oxygen (SpO2)</span>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-end gap-2 text-gray-400">
                <span className="text-3xl font-semibold text-gray-400">92</span>
                <span className="text-sm text-gray-500 font-ibm-plex-sans">%</span>
              </div>
              <div className="text-sm text-teal font-ibm-plex-sans">Normal</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-500">
              <Image className="h-5 w-5" width={20} height={20} alt="" src="/vitals/blood.svg" />
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-[#FAF9F8] p-4">
            <svg viewBox="0 0 706 58" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 9.6L88.25 3.6L176.5 7.2L264.75 0L353 4.8L441.25 2.4L529.5 7.2L617.75 3.6L706 9.6V57.6H0V9.6Z" fill="url(#paint0_linear_1461_22029)"/>
              <defs>
                <linearGradient id="paint0_linear_1461_22029" x1="0" y1="0" x2="0" y2="5760" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFA500" stopOpacity="0.3"/>
                  <stop offset="1" stopColor="#FFA500" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
            <div className="mt-2 text-xs text-gray-500 font-ibm-plex-sans text-right">Last 24 hours</div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="text-base font-semibold">Understanding SpO2 Levels</div>
          <div className="mt-3 flex flex-col gap-3">
            {levels.map((level) => (
              <div key={level.label} className={`flex items-center justify-between rounded-xl px-3 py-3 ${level.bar}`}>
                <div>
                  <div className="text-sm">{level.label}{level.status ? ` (${level.status})` : ""}</div>
                  <div className="text-xs text-gray-500 font-ibm-plex-sans">{level.range}</div>
                </div>
                <span className={`h-3 w-3 rounded-full ${level.color}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="text-base font-semibold">Today's Statistics</div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-gray-500 font-ibm-plex-sans">
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-xs">Average</div>
              <div className="text-lg font-semibold text-gray-400">93</div>
              <div className="text-xs">%</div>
            </div>
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-xs">Lowest</div>
              <div className="text-lg font-semibold text-gray-400">90</div>
              <div className="text-xs">%</div>
            </div>
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-xs">Highest</div>
              <div className="text-lg font-semibold text-gray-400">98</div>
              <div className="text-xs">%</div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold">7-Day Average</div>
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-teal" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 13l5-5 3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-gray-500 font-ibm-plex-sans">
            {["M","T","W","T","F","S","S"].map((day, index) => (
              <div key={`${day}-${index}`} className="text-xs">
                <div>{day}</div>
                <div className="text-gray-400">68</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl bg-amber-50 px-3 py-3 text-xs text-gray-500 font-ibm-plex-sans">
            Your oxygen saturation has been stable and within acceptable range this week.
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="flex items-center gap-2 text-base font-semibold">
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-sky-500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12l4-4 3 3 5-6 4 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Factors That May Affect SpO2
          </div>
          <div className="mt-3 flex flex-col gap-3 text-gray-500 font-ibm-plex-sans">
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-sm text-gray-700 font-semibold">Physical Activity</div>
              <div className="text-xs">SpO2 can temporarily drop during intense exercise</div>
            </div>
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-sm text-gray-700 font-semibold">Altitude</div>
              <div className="text-xs">Higher altitudes may result in lower oxygen saturation</div>
            </div>
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-sm text-gray-700 font-semibold">Sleep Position</div>
              <div className="text-xs">Sleeping position can affect readings</div>
            </div>
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-sm text-gray-700 font-semibold">Temperature</div>
              <div className="text-xs">Cold hands can affect sensor accuracy</div>
            </div>
          </div>
        </div>
      
    </>
  );
}
