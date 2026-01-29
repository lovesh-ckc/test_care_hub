"use client";

import Image from "next/image";
import { useState } from "react";
import type { Dashboard } from "@care-hub/lib/types";
import { ProfileHeader } from "@care-hub/components/sections/ProfileHeader";
import { Bottombar } from "../UI/bottombar/Bottombar";
type DashboardProps = {
  section: Dashboard;
  onNext?: () => void;
  onBack?: () => void;
  activeNavItem?: string;
  onHeartRateClick?: () => void;
  onSpo2Click?: () => void;
  onRespiratoryClick?: () => void;
  onTemperatureClick?: () => void;
  onBloodPressureClick?: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onNavClick?: (itemId: "home" | "documents" | "list" | "grid") => void;
};

export function DashboardScreen({
  onNavClick,
  onHeartRateClick,
  onSpo2Click,
  onRespiratoryClick,
  onTemperatureClick,
  onBloodPressureClick,
  onNotificationsClick,
  onProfileClick,
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"home" | "documents" | "list" | "grid">("home");

  const handleNav = (id: "home" | "documents" | "list" | "grid") => {
    setActiveTab(id);
    onNavClick?.(id);
  };

  return (
    <div className="h-screen text-left text-black font-haas-grot-disp-trial">
      <div className="care-shell care-padding flex h-full flex-col bg-black/5 pb-4 pt-3">
        <ProfileHeader
          name="Rashi Agrawal"
          handle="#rashi.agrawal0789"
          avatarSrc="/icons/patient.svg"
          bellIconSrc="/icons/bell-01.svg"
          onBellClick={onNotificationsClick}
          onProfileClick={onProfileClick}
        />

        <div className="mt-4 flex-1 overflow-y-auto pb-4">
          <div className="rounded-num-20 bg-white p-4 shadow-lg rounded-xl">
            <div className="text-2xl font-semibold">Good Morning</div>
            <div className="text-base text-gray-500 font-ibm-plex-sans">Your health score is up 5% from last week.</div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-3 flex-1 rounded-num-100 bg-linear-to-r from-amber-300 to-emerald-600" />
              <div className="flex items-end gap-1 text-xl font-semibold">
                <span>92</span>
                <span className="text-base text-gray-500 font-ibm-plex-sans">%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-gray-500 font-ibm-plex-sans ">
            <button
              type="button"
              className="col-span-1 rounded-num-20 bg-white p-4 shadow-md text-left rounded-xl"
              onClick={onHeartRateClick}
            >
              <div className="flex items-center gap-2 text-gray-500">
                <Image className="h-4 w-4" width={16} height={16} alt="" src="/vitals/HeartRateIcon.svg" />
                <span className="text-sm">Heart Rate</span>
              </div>
              <div className="mt-2 flex items-end gap-1 text-gray-400">
                <span className="text-2xl font-semibold">72</span>
                <span className="text-sm">bpm</span>
              </div>
              <div className="text-xs">Everything looks stable today.</div>
              <div className="mt-4 h-24 rounded-b-full border-8 border-teal border-b-0 border-l-0 border-r-0" />
            </button>

            <div className="col-span-1 flex flex-col gap-3">
              <button
                type="button"
                className="rounded-num-20 bg-white p-4 shadow-md text-left rounded-xl"
                onClick={onSpo2Click}
              >
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4" width={16} height={16} alt="" src="/vitals/blood.svg" />
                  <span className="text-sm">SPO2</span>
                </div>
                <div className="mt-2 flex items-end gap-1 text-gray-400">
                  <span className="text-2xl font-semibold">92</span>
                  <span className="text-sm">%</span>
                </div>
                <div className="text-xs text-teal">Normal</div>
                <div className="mt-3 h-6 w-10 border-b-2 border-sandybrown -rotate-12" />
              </button>
              <button
                type="button"
                className="rounded-num-20 bg-white p-4 shadow-md text-left rounded-xl"
                onClick={onRespiratoryClick}
              >
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4" width={16} height={16} alt="" src="/vitals/Lungs.svg" />
                  <span className="text-sm">Respiratory Rate</span>
                </div>
                <div className="mt-2 flex items-end gap-1 text-gray-400">
                  <span className="text-2xl font-semibold">0.8</span>
                  <span className="text-sm">sec</span>
                </div>
                <div className="text-xs text-teal">Normal</div>
              </button>
            </div>

            <button
              type="button"
              className="col-span-1 rounded-num-20 bg-white p-4 shadow-md text-left rounded-xl"
              onClick={onBloodPressureClick}
            >
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4" width={16} height={16} alt="" src="/vitals/BloodPressure.svg" />
                <span className="text-sm">Blood Pressure</span>
              </div>
              <div className="mt-2 flex items-end gap-1 text-gray-400">
                <span className="text-2xl font-semibold">108/78</span>
                <span className="text-sm">mmHg</span>
              </div>
              <div className="text-xs text-teal">Normal</div>
            </button>

            <button
              type="button"
              className="col-span-1 rounded-xl rounded-num-20 bg-white p-4 shadow-md text-left"
              onClick={onTemperatureClick}
            >
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4" width={16} height={16} alt="" src="/vitals/Temperature.svg" />
                <span className="text-sm">Temperature</span>
              </div>
              <div className="mt-2 flex items-end gap-1 text-gray-400">
                <span className="text-2xl font-semibold">34.5</span>
                <span className="text-sm">C</span>
              </div>
              <div className="text-xs text-teal">Normal</div>
            </button>
          </div>

          <div className="mt-5 text-lg font-semibold">Upcoming appointments</div>
          <div className="mt-3 rounded-num-20 bg-white p-4 shadow-md rounded-xl" >
            <div className="flex items-center gap-3">
              <Image className="h-12 w-12 rounded-full object-cover" width={48} height={48} alt="" src="/icons/patient.svg" />
              <div className="flex-1">
                <div className="text-base font-semibold">Dr. Sarah Jenkins</div>
                <div className="text-sm text-gray-500 font-ibm-plex-sans">Cardiologist</div>
              </div>
              <div className="h-9 w-9 rounded-full bg-sandybrown flex items-center justify-center text-white">VC</div>
            </div>
            <div className="mt-3 rounded-lg bg-black/5 p-3 text-sm text-gray-500 font-ibm-plex-sans">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4" width={16} height={16} alt="" src="/icons/patient.svg" />
                  <span>Friday, 23 July 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4" width={16} height={16} alt="" src="/icons/patient.svg" />
                  <span>09:00 Am - 10:00 Am</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3">
          <Bottombar activeItem={activeTab} onItemClick={handleNav} />
        </div>
      </div>
    </div>
  );
}
