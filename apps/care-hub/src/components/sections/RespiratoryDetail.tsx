"use client";

import Image from "next/image";
import { ProfileHeader } from "@care-hub/components/sections/ProfileHeader";

type RespiratoryDetailProps = {
  onBack?: () => void;
};

const ranges = [
  { label: "Low", range: "< 12 breaths/min", status: "Bradypnea", color: "bg-sky-500", bar: "bg-gray-200" },
  { label: "Normal", range: "12-20 breaths/min", status: "Healthy range", current: true, color: "bg-teal", bar: "bg-emerald-50" },
  { label: "Elevated", range: "21-25 breaths/min", status: "Slightly elevated", color: "bg-yellow-400", bar: "bg-gray-200" },
  { label: "High", range: "> 25 breaths/min", status: "Tachypnea", color: "bg-red-500", bar: "bg-gray-200" },
];

export function RespiratoryDetail({ onBack }: RespiratoryDetailProps) {
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
          <span>Respiratory Rate</span>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-end gap-2 text-gray-400">
                <span className="text-3xl font-semibold text-gray-400">0.8</span>
                <span className="text-sm text-gray-500 font-ibm-plex-sans">sec</span>
              </div>
              <div className="text-sm text-[#518D73] font-ibm-plex-sans">Normal</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-500">
              <Image className="h-5 w-5" width={20} height={20} alt="" src="/vitals/Lungs.svg" />
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-[#FAF9F8] p-4">
            <div className="mx-auto flex items-center justify-center">
              <svg width="161" height="161" viewBox="0 0 161 161" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.665435">
                  <mask id="path-1-inside-1_1461_22219" fill="white">
                    <path d="M0 80.2368C0 35.9232 35.9233 0 80.2368 0C124.55 0 160.474 35.9232 160.474 80.2368C160.474 124.55 124.55 160.474 80.2368 160.474C35.9233 160.474 0 124.55 0 80.2368Z"/>
                  </mask>
                  <path d="M0 80.2368C0 35.9232 35.9233 0 80.2368 0C124.55 0 160.474 35.9232 160.474 80.2368C160.474 124.55 124.55 160.474 80.2368 160.474C35.9233 160.474 0 124.55 0 80.2368Z" fill="url(#paint0_linear_1461_22219)"/>
                  <path d="M80.2368 160.474V156.474C38.1324 156.474 4 122.341 4 80.2368H0H-4C-4 126.76 33.7141 164.474 80.2368 164.474V160.474ZM160.474 80.2368H156.474C156.474 122.341 122.341 156.474 80.2368 156.474V160.474V164.474C126.76 164.474 164.474 126.76 164.474 80.2368H160.474ZM80.2368 0V4C122.341 4 156.474 38.1324 156.474 80.2368H160.474H164.474C164.474 33.7141 126.76 -4 80.2368 -4V0ZM80.2368 0V-4C33.7141 -4 -4 33.7141 -4 80.2368H0H4C4 38.1324 38.1324 4 80.2368 4V0Z" fill="#00BCD4" mask="url(#path-1-inside-1_1461_22219)"/>
                </g>
                <defs>
                  <linearGradient id="paint0_linear_1461_22219" x1="0" y1="0" x2="160.474" y2="160.474" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00BCD4" stopOpacity="0.3"/>
                    <stop offset="1" stopColor="#2196F3" stopOpacity="0.3"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="mt-2 text-xs text-gray-500 font-ibm-plex-sans">Breathing pattern visualization</div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="text-base font-semibold">Normal Ranges</div>
          <div className="mt-3 flex flex-col gap-3">
            {ranges.map((range) => (
              <div key={range.label} className={`flex items-center justify-between rounded-xl px-3 py-3 ${range.bar}`}>
                <div>
                  <div className="text-sm">
                    {range.label} {range.current ? "(Current)" : ""}
                  </div>
                  <div className="text-xs text-gray-500 font-ibm-plex-sans">{range.range}</div>
                  <div className="text-xs text-gray-500 font-ibm-plex-sans">{range.status}</div>
                </div>
                <span className={`h-3 w-3 rounded-full ${range.color}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold">Total Statistics</div>
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-gray-500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 13l5-5 3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-gray-500 font-ibm-plex-sans">
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-xs">Average</div>
              <div className="text-lg font-semibold text-gray-400">16</div>
              <div className="text-xs">br/min</div>
            </div>
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-xs">Lowest</div>
              <div className="text-lg font-semibold text-gray-400">14</div>
              <div className="text-xs">br/min</div>
            </div>
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-xs">Highest</div>
              <div className="text-lg font-semibold text-gray-400">20</div>
              <div className="text-xs">br/min</div>
            </div>
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
            Your respiratory rate has remained stable and within the healthy range this week.
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="text-base font-semibold">Recent Readings</div>
          <div className="mt-3 flex flex-col gap-3 text-gray-500 font-ibm-plex-sans">
            {[
              { label: "Today, 9:30 AM", value: "16", status: "Normal" },
              { label: "Yesterday, 6:00 PM", value: "15", status: "Normal" },
              { label: "Yesterday, 9:00 AM", value: "17", status: "Normal" },
              { label: "Jan 26, 7:30 PM", value: "16", status: "Normal" },
            ].map((reading) => (
              <div key={reading.label} className="flex items-center justify-between rounded-xl bg-[#FAF9F8] px-3 py-3">
                <div>
                  <div className="text-sm text-gray-700">{reading.label}</div>
                  <div className="text-xs text-[#518D73]">{reading.status}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-semibold text-gray-400">{reading.value}</div>
                  <div className="text-xs">breaths/min</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="text-base font-semibold">Breathing Exercises</div>
          <div className="mt-3 flex flex-col gap-3 text-gray-500 font-ibm-plex-sans">
            {[
              { title: "Diaphragmatic Breathing", desc: "Breathe deeply from your diaphragm, not your chest", time: "5 minutes" },
              { title: "4-7-8 Technique", desc: "Inhale for 4, hold for 7, exhale for 8 seconds", time: "3 minutes" },
              { title: "Box Breathing", desc: "Inhale, hold, exhale, hold - each for 4 seconds", time: "5 minutes" },
              { title: "Pursed Lip Breathing", desc: "Inhale through nose, exhale slowly through pursed lips", time: "10 minutes" },
            ].map((exercise) => (
              <div key={exercise.title} className="flex items-center justify-between rounded-xl bg-[#FAF9F8] px-3 py-3">
                <div>
                  <div className="text-sm text-gray-700 font-semibold">{exercise.title}</div>
                  <div className="text-xs">{exercise.desc}</div>
                </div>
                <span className="text-xs rounded-full bg-white px-2 py-1 text-gray-500">{exercise.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-md">
          <div className="text-base font-semibold">Health Insights</div>
          <div className="mt-3 flex flex-col gap-3 text-gray-500 font-ibm-plex-sans">
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-sm text-gray-700 font-semibold">What Affects Respiratory Rate?</div>
              <div className="text-xs">Physical activity, stress, anxiety, medications, and medical conditions can all influence your breathing rate.</div>
            </div>
            <div className="rounded-xl bg-[#FAF9F8] p-3">
              <div className="text-sm text-gray-700 font-semibold">Benefits of Controlled Breathing</div>
              <div className="text-xs">Regular breathing exercises can reduce stress, lower blood pressure, and improve overall lung function.</div>
            </div>
          </div>
        </div>
      
    </>
  );
}
