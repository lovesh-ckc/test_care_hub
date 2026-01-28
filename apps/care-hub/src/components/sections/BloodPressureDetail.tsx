"use client";

import Image from "next/image";
import { ProfileHeader } from "@care-hub/components/sections/ProfileHeader";

type BloodPressureDetailProps = {
  onBack?: () => void;
};

const categories = [
  {
    label: "Normal",
    range: "Systolic: < 120 / Diastolic: < 80",
    color: "bg-teal",
    background: "bg-emerald-50",
    status: "Current",
  },
  {
    label: "Elevated",
    range: "Systolic: 120-129 / Diastolic: < 80",
    color: "bg-orange-400",
    background: "bg-gray-200",
  },
  {
    label: "High BP Stage 1",
    range: "Systolic: 130-139 / Diastolic: 80-89",
    color: "bg-orange-400",
    background: "bg-gray-200",
  },
  {
    label: "High BP Stage 2",
    range: "Systolic: ≥ 140 / Diastolic: ≥ 90",
    color: "bg-red-500",
    background: "bg-gray-200",
  },
  {
    label: "Hypertensive Crisis",
    range: "Systolic: > 180 / Diastolic: > 120",
    color: "bg-red-700",
    background: "bg-gray-200",
  },
];

const recentReadings = [
  { time: "Today, 9:30 AM", pulse: "Pulse: 72 bpm", value: "108/78", status: "Normal" },
  { time: "Yesterday, 6:45 PM", pulse: "Pulse: 68 bpm", value: "112/80", status: "Normal" },
  { time: "Yesterday, 9:15 AM", pulse: "Pulse: 70 bpm", value: "110/76", status: "Normal" },
  { time: "Jan 26, 7:00 PM", pulse: "Pulse: 74 bpm", value: "115/82", status: "Normal" },
];

const tips = [
  { title: "Regular Exercise", detail: "Aim for 150 minutes of moderate activity per week" },
  { title: "Healthy Diet", detail: "Follow a DASH diet rich in fruits, vegetables, and whole grains" },
  { title: "Reduce Sodium", detail: "Limit sodium intake to less than 2,300 mg per day" },
  { title: "Manage Stress", detail: "Practice relaxation techniques like meditation or yoga" },
  { title: "Limit Alcohol", detail: "Moderate alcohol consumption can help maintain healthy BP" },
  { title: "Monitor Regularly", detail: "Check your blood pressure at the same time each day" },
];

export function BloodPressureDetail({ onBack }: BloodPressureDetailProps) {
  return (
    <div className="min-h-screen text-left text-black font-haas-grot-disp-trial">
      <div className="mx-auto w-full max-w-md bg-whitesmoke px-4 pb-6 pt-3">
        <ProfileHeader
          name="Rashi Agrawal"
          handle="#rashi.agrawal0789"
          avatarSrc="/icons/patient.svg"
          bellIconSrc="/icons/bell-01.svg"
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
          <span>Blood Pressure</span>
        </div>

        <div className="mt-4 rounded-num-20 bg-white p-4 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl font-semibold text-gray-400">108/78</div>
              <div className="mt-1 text-sm text-gray-500 font-ibm-plex-sans">mmHg</div>
              <div className="text-sm text-teal font-ibm-plex-sans">Normal</div>
            </div>
            <svg viewBox="0 0 64 64" className="h-8 w-8 text-emerald-700" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M58.6668 31.9997H52.0535C50.8881 31.9972 49.7539 32.3765 48.8245 33.0796C47.895 33.7827 47.2215 34.7709 46.9068 35.893L40.6402 58.1863C40.5998 58.3248 40.5156 58.4465 40.4002 58.533C40.2848 58.6196 40.1444 58.6663 40.0002 58.6663C39.8559 58.6663 39.7156 58.6196 39.6002 58.533C39.4848 58.4465 39.4006 58.3248 39.3602 58.1863L24.6402 5.81301C24.5998 5.67453 24.5156 5.55289 24.4002 5.46634C24.2848 5.37979 24.1444 5.33301 24.0002 5.33301C23.8559 5.33301 23.7156 5.37979 23.6002 5.46634C23.4848 5.55289 23.4006 5.67453 23.3602 5.81301L17.0935 28.1063C16.7801 29.2241 16.1105 30.209 15.1865 30.9117C14.2624 31.6144 13.1343 31.9964 11.9735 31.9997H5.3335" stroke="currentColor" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-gray-500 font-ibm-plex-sans">
            <div className="rounded-xl bg-whitesmoke p-3">
              <div className="text-xs text-gray-700">Systolic</div>
              <div className="text-xl font-semibold text-gray-400">108</div>
              <div className="text-xs text-teal">Normal</div>
            </div>
            <div className="rounded-xl bg-whitesmoke p-3">
              <div className="text-xs text-gray-700">Diastolic</div>
              <div className="text-xl font-semibold text-gray-400">78</div>
              <div className="text-xs text-teal">Normal</div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-num-20 bg-white p-4 shadow-md">
          <div className="text-base font-semibold">Blood Pressure Categories</div>
          <div className="mt-3 flex flex-col gap-3 text-gray-500 font-ibm-plex-sans">
            {categories.map((category) => (
              <div
                key={category.label}
                className={`flex items-center justify-between rounded-xl px-3 py-3 ${category.background}`}
              >
                <div>
                  <div className="text-sm">
                    {category.label}{" "}
                    {category.status ? <span className="text-xs">({category.status})</span> : null}
                  </div>
                  <div className="text-xs">{category.range}</div>
                </div>
                <span className={`h-3 w-3 rounded-full ${category.color}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-num-20 bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold">Recent Readings</div>
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-teal" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 13l5-5 3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="mt-3 flex flex-col gap-3 text-gray-500 font-ibm-plex-sans">
            {recentReadings.map((reading) => (
              <div key={reading.time} className="rounded-xl bg-whitesmoke px-3 py-3 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-700">{reading.time}</div>
                  <div className="text-xs">{reading.pulse}</div>
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
          <div className="text-base font-semibold">7-Day Trend</div>
          <div className="mt-3 text-xs text-gray-500 font-ibm-plex-sans">Systolic</div>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500 font-ibm-plex-sans">
            {["112","110","115","108","112","110","108"].map((value, index) => (
              <span key={`sys-${index}`} className="text-gray-400">{value}</span>
            ))}
          </div>
          <div className="mt-4 text-xs text-gray-500 font-ibm-plex-sans">Diastolic</div>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500 font-ibm-plex-sans">
            {["80","76","82","78","80","76","78"].map((value, index) => (
              <span key={`dia-${index}`} className="text-gray-400">{value}</span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 font-ibm-plex-sans">
            {["M","T","W","T","F","S","S"].map((day, index) => (
              <span key={`day-${index}`}>{day}</span>
            ))}
          </div>
          <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-3 text-xs text-gray-500 font-ibm-plex-sans">
            Your blood pressure has been consistently normal this week. Great job!
          </div>
        </div>

        <div className="mt-4 rounded-num-20 bg-white p-4 shadow-md">
          <div className="flex items-center gap-2 text-base font-semibold">
            <div className="h-5 w-5 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center text-xs">!</div>
            Maintaining Healthy Blood Pressure
          </div>
          <div className="mt-3 flex flex-col gap-3 text-gray-500 font-ibm-plex-sans">
            {tips.map((tip) => (
              <div key={tip.title} className="rounded-xl bg-whitesmoke p-3">
                <div className="text-sm text-gray-700 font-semibold">{tip.title}</div>
                <div className="text-xs">{tip.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
