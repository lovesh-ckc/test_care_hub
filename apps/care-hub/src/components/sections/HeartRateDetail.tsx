"use client";

import Image from "next/image";
import { ProfileHeader } from "@care-hub/components/sections/ProfileHeader";

type HeartRateDetailProps = {
  onBack?: () => void;
};

const zones = [
  { label: "Resting", range: "60-80 bpm", status: "Current", color: "bg-teal", bar: "bg-emerald-50" },
  { label: "Fat Burn", range: "95-115 bpm", color: "bg-yellow-400", bar: "bg-gray-200" },
  { label: "Cardio", range: "115-135 bpm", color: "bg-orange-400", bar: "bg-gray-200" },
  { label: "Peak", range: "135-155 bpm", color: "bg-red-500", bar: "bg-gray-200" },
];

export function HeartRateDetail({ onBack }: HeartRateDetailProps) {
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
          <span>Heart Rate</span>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-end gap-2 text-gray-400">
                <span className="text-3xl font-semibold text-gray-400">72</span>
                <span className="text-sm text-gray-500 font-ibm-plex-sans">bpm</span>
              </div>
              <div className="text-sm text-[#518D73] font-ibm-plex-sans">Everything looks stable today.</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-red-500 text-xl">
              ♥
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-[#FAF9F8] p-4">
            <svg viewBox="0 0 672 48" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 45.1071C11.2 45.1071 22.4 34.4404 33.6 13.1071C44.8 -8.22624 56 2.44043 67.2 45.1071C78.4 45.1071 89.6 34.4404 100.8 13.1071C112 -8.22624 123.2 2.44043 134.4 45.1071C145.6 45.1071 156.8 34.4404 168 13.1071C179.2 -8.22624 190.4 2.44043 201.6 45.1071C212.8 45.1071 224 34.4404 235.2 13.1071C246.4 -8.22624 257.6 2.44043 268.8 45.1071C280 45.1071 291.2 34.4404 302.4 13.1071C313.6 -8.22624 324.8 2.44043 336 45.1071C347.2 45.1071 358.4 34.4404 369.6 13.1071C380.8 -8.22624 392 2.44043 403.2 45.1071C414.4 45.1071 425.6 34.4404 436.8 13.1071C448 -8.22624 459.2 2.44043 470.4 45.1071C481.6 45.1071 492.8 34.4404 504 13.1071C515.2 -8.22624 526.4 2.44043 537.6 45.1071C548.8 45.1071 560 34.4404 571.2 13.1071C582.4 -8.22624 593.6 2.44043 604.8 45.1071C616 45.1071 627.2 34.4404 638.4 13.1071C649.6 -8.22624 660.8 2.44043 672 45.1071" stroke="#518D73" strokeWidth="4.91854" strokeDasharray="0.94 1.64" />
            </svg>
            <div className="mt-2 text-xs text-gray-500 font-ibm-plex-sans">Last updated: Just now</div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="text-base font-semibold">Heart Rate Zones</div>
          <div className="mt-3 flex flex-col gap-3">
            {zones.map((zone) => (
              <div key={zone.label} className={`flex items-center justify-between rounded-xl px-3 py-3 ${zone.bar}`}>
                <div>
                  <div className="text-sm">{zone.label}</div>
                  <div className="text-xs text-gray-500 font-ibm-plex-sans">
                    {zone.range} {zone.status ? `(${zone.status})` : ""}
                  </div>
                </div>
                <span className={`h-3 w-3 rounded-full ${zone.color}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold">Today's Activity</div>
            <svg viewBox="0 0 20 20" className="h-5 w-5 text-gray-500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1461_21862)">
                <path d="M18.3332 10.0003H16.2665C15.9023 9.99955 15.5479 10.1181 15.2574 10.3378C14.967 10.5575 14.7565 10.8663 14.6582 11.217L12.6998 18.1837C12.6872 18.2269 12.6609 18.2649 12.6248 18.292C12.5888 18.319 12.5449 18.3337 12.4998 18.3337C12.4548 18.3337 12.4109 18.319 12.3748 18.292C12.3388 18.2649 12.3125 18.2269 12.2998 18.1837L7.69984 1.81699C7.68722 1.77372 7.6609 1.73571 7.62484 1.70866C7.58878 1.68161 7.54491 1.66699 7.49984 1.66699C7.45476 1.66699 7.4109 1.68161 7.37484 1.70866C7.33878 1.73571 7.31246 1.77372 7.29984 1.81699L5.3415 8.78366C5.24356 9.13295 5.03432 9.44076 4.74556 9.66034C4.45679 9.87992 4.10427 9.99929 3.7415 10.0003H1.6665" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_1461_21862">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-gray-500 font-ibm-plex-sans">
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-xs">Average</div>
              <div className="text-lg font-semibold text-gray-400">68</div>
              <div className="text-xs">bpm</div>
            </div>
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-xs">Lowest</div>
              <div className="text-lg font-semibold text-gray-400">58</div>
              <div className="text-xs">bpm</div>
            </div>
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-xs">Highest</div>
              <div className="text-lg font-semibold text-gray-400">125</div>
              <div className="text-xs">bpm</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-500 font-ibm-plex-sans">Time in zones today</div>
          <div className="mt-2 h-4 w-full rounded-full overflow-hidden bg-gray-200 flex">
            <div className="h-full bg-teal w-2/3" />
            <div className="h-full bg-orange-300 w-1/5" />
            <div className="h-full bg-yellow-400 w-1/10" />
            <div className="h-full bg-red-500 w-1/10" />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500 font-ibm-plex-sans">
            <span>Resting: 65%</span>
            <span>Active: 35%</span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold">7-Day Average</div>
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#518D73]" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-3 text-xs text-gray-500 font-ibm-plex-sans">
            Your resting heart rate is within the healthy range and has been stable this week.
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="flex items-center gap-2 text-base font-semibold">
            <div className="h-5 w-5 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center text-xs">i</div>
            Health Insights
          </div>
          <div className="mt-3 flex flex-col gap-3 text-gray-500 font-ibm-plex-sans">
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-sm text-gray-700 font-semibold">Normal Resting Heart Rate</div>
              <div className="text-xs">A resting heart rate of 60-100 bpm is considered healthy. Your rate of 72 bpm is excellent.</div>
            </div>
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-sm text-gray-700 font-semibold">Cardiovascular Fitness</div>
              <div className="text-xs">Regular exercise can help lower your resting heart rate and improve overall cardiovascular health.</div>
            </div>
          </div>
        </div>
      
    </>
  );
}
