"use client";

import Image from "next/image";
import { useState } from "react";
import type { Dashboard } from "@care-hub/lib/types";
import { Bottombar } from "../UI/bottombar/Bottombar";
import LiquidMorph from "../UI/LiquidMorph";
import { useFeedback } from "@care-hub/components/feedback/FeedbackProvider";
type DashboardProps = {
  section: Dashboard;
  onNext?: () => void;
  onBack?: () => void;
  activeNavItem?: string;
  userName?: string;
  userAvatar?: string;
  onHeartRateClick?: () => void;
  onSpo2Click?: () => void;
  onRespiratoryClick?: () => void;
  onTemperatureClick?: () => void;
  onBloodPressureClick?: () => void;
  onNavClick?: (itemId: "home" | "documents" | "list" | "grid") => void;
};

export function DashboardScreen({
  onNavClick,
  userName,
  userAvatar,
  onHeartRateClick,
  onSpo2Click,
  onRespiratoryClick,
  onTemperatureClick,
  onBloodPressureClick,
}: DashboardProps) {

  const { tap } = useFeedback();

  const handleNav = (id: "home" | "documents" | "list" | "grid") => {
    // setActiveTab(id);
    onNavClick?.(id);
  };

  return (
    <>
        <div className="mt-4 flex-1 overflow-y-auto pb-4">
          <div className="rounded-2xl bg-white p-4 shadow-lg motion-fade-up card-hover">
            <div className="text-2xl font-semibold">Good Morning</div>
            <div className="text-base text-gray-500 font-ibm-plex-sans">Your health score is up 5% from last week.</div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-3 flex-1 rounded-lg bg-linear-to-r from-amber-300 to-emerald-600 motion-shimmer" />
              <div className="flex items-end gap-1 text-xl font-semibold">
                <span>92</span>
                <span className="text-base text-gray-500 font-ibm-plex-sans">%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 font-bold text-gray-500 ">
            <button
              type="button"
              className="col-span-1 rounded-2xl bg-white p-4 shadow-md text-left motion-fade-up delay-1 card-hover"
              onClick={() => {
                tap();
                onHeartRateClick?.();
              }}
            >
              <div className="flex items-center gap-2 font-[--font-haas]">
                <Image className="h-4 w-4" width={16} height={16} alt="" src="/vitals/HeartRateIcon.svg" />
                <span className="text-sm">Heart Rate</span>
              </div>
              <div className="mt-2 flex items-end gap-1 text-gray-500">
                <span className="text-2xl text-black font-semibold">72</span>
                <span className="text-sm">bpm</span>
              </div>
              <div className="text-xs">Everything looks stable today.</div>
            <div className="mt-4 motion-float">
              <Image
                src="/ellipse.svg"
                alt=""
                width={240}
                height={96}
                className="w-full"
              />
            </div>
            </button>

            <div className="col-span-1 flex flex-col gap-3">
              <button
                type="button"
                className="rounded-2xl bg-white p-4 shadow-md text-left motion-fade-up delay-2 card-hover"
                onClick={() => {
                  tap();
                  onSpo2Click?.();
                }}
              >
                <div className="flex items-center gap-2 font-[--font-haas]">
                  <Image className="h-4 w-4" width={16} height={16} alt="" src="/vitals/blood.svg" />
                  <span className="text-sm">SPO2</span>
                </div>
                <div className="mt-2 flex items-end gap-1 text-gray-500">
                  <span className="text-2xl font-semibold text-black">92</span>
                  <span className="text-sm">%</span>
                </div>
                <div className="text-xs text-[#518D73]">Normal</div>
                <div className="mt-3 h-6 w-10 border-b-2 border-sandybrown -rotate-12 motion-shimmer" />
              </button>
              <button
                type="button"
                className="rounded-2xl bg-white p-4 shadow-md text-left motion-fade-up delay-3 card-hover"
                onClick={() => {
                  tap();
                  onRespiratoryClick?.();
                }}
              >
                <div className="flex items-center gap-2 font-[--font-haas]">
                  <Image className="h-4 w-4" width={16} height={16} alt="" src="/vitals/Lungs.svg" />
                  <span className="text-sm">Respiratory Rate</span>
                </div>
                <div className="mt-2 flex items-end gap-1 text-gray-500">
                  <span className="text-2xl font-semibold text-black">0.8</span>
                  <span className="text-sm">sec</span>
                </div>
                <div className="text-xs text-[#518D73]">Normal</div>
              </button>
            </div>

            <button
              type="button"
              className="col-span-1 rounded-2xl bg-white p-4 shadow-md text-left motion-fade-up delay-2 card-hover"
              onClick={() => {
                tap();
                onBloodPressureClick?.();
              }}
            >
              <div className="flex items-center gap-2 font-[--font-haas]">
                <Image className="h-4 w-4" width={16} height={16} alt="" src="/vitals/BloodPressure.svg" />
                <span className="text-sm">Blood Pressure</span>
              </div>
              <div className="mt-2 flex items-end gap-1 text-gray-500">
                <span className="text-2xl font-semibold text-black">108/78</span>
                <span className="text-sm">mmHg</span>
              </div>
              <div className="text-xs text-[#518D73]">Normal</div>
            </button>

            <button
              type="button"
              className="col-span-1 rounded-xl bg-white p-4 shadow-md text-left motion-fade-up delay-3 card-hover"
              onClick={() => {
                tap();
                onTemperatureClick?.();
              }}
            >
              <div className="flex items-center gap-2 font-[--font-haas]">
                <Image className="h-4 w-4" width={16} height={16} alt="" src="/vitals/Temperature.svg" />
                <span className="text-sm">Temperature</span>
              </div>
              <div className="mt-2 flex items-end gap-1 text-gray-500">
                <span className="text-2xl font-semibold text-black">34.5</span>
                <span className="text-sm">C</span>
              </div>
              <div className="text-xs text-[#518D73]">Normal</div>
            </button>
          </div>

{/* 
          <div className="mt-3 rounded-2xl bg-white p-4 shadow-md motion-fade-up delay-2 card-hover">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-700">Temperature Trend</div>
              <span className="text-xs text-gray-500 font-ibm-plex-sans">Last 7 days</span>
            </div>
            <svg viewBox="0 0 300 80" className="mt-3 w-full" fill="none" aria-hidden="true">
              <path d="M10 52 L60 46 L110 50 L160 42 L210 48 L260 44 L290 46" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" />
              <path className="graph-stroke" d="M10 52 L60 46 L110 50 L160 42 L210 48 L260 44 L290 46" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />
            </svg>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500 font-ibm-plex-sans">
              {["M","T","W","T","F","S","S"].map((day, index) => (
                <span key={`${day}-${index}`}>{day}</span>
              ))}
            </div>
          </div> */}
          <div className="mt-5 text-lg font-bold motion-fade-up delay-3">Upcoming appointments</div>
          <div className="mt-3 rounded-2xl bg-white p-4 shadow-md motion-fade-up delay-2 card-hover" >
            <div className="flex items-center gap-3">
              <Image
                className="h-12 w-12 rounded-full object-cover"
                width={48}
                height={48}
                alt={userName ?? "Patient"}
                src={"/icons/patient.svg"}
              />
              <div className="flex-1">
                <div className="text-base font-semibold">Dr. Sarah Jenkins</div>
                <div className="text-sm text-gray-500 font-ibm-plex-sans">Cardiologist</div>
              </div>
              <div className="h-9 w-9 rounded-full bg-sandybrown flex items-center justify-center text-white glow-accent motion-pulse">VC</div>
            </div>
            <div className="mt-3 rounded-lg bg-[#FAF9F8] p-3 text-sm text-gray-500 font-ibm-plex-sans">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>Friday, 23 July 2026</span>
                </div>
                <p>|</p>
                <div className="flex items-center gap-2">
                  <span>09:00 Am - 10:00 Am</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
  );
}
