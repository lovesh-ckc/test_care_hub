"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DashboardScreen } from "@care-hub/components/sections/Dashboard";
import { DocumentScreen } from "@care-hub/components/UI/documents/Document";
import { HeartRateDetail } from "@care-hub/components/sections/HeartRateDetail";
import { Spo2Detail } from "@care-hub/components/sections/Spo2Detail";
import { RespiratoryDetail } from "@care-hub/components/sections/RespiratoryDetail";
import { TemperatureDetail } from "@care-hub/components/sections/TemperatureDetail";
import { BloodPressureDetail } from "@care-hub/components/sections/BloodPressureDetail";
import { NotificationScreen } from "@care-hub/components/sections/NotificationScreen";
import { ClinicalCareOverview } from "@care-hub/components/sections/ClinicalCareOverview";
import { DeviceManagementScreen } from "@care-hub/components/sections/DeviceManagementScreen";
import { PreferencesControlScreen } from "@care-hub/components/sections/PreferencesControlScreen";
import { DevicesGridScreen } from "@care-hub/components/sections/DevicesGridScreen";
import { TodoListScreen } from "@care-hub/components/sections/TodoListScreen";
import type { Dashboard } from "@care-hub/lib/types";
import { ProfileHeader } from "./ProfileHeader";
import { FeedbackSettingsSheet } from "@care-hub/components/feedback/FeedbackSettingsSheet";
import { useFeedback } from "@care-hub/components/feedback/FeedbackProvider";
import { Bottombar } from "../UI/bottombar/Bottombar";

type DashboardContainerProps = {
  section: Dashboard;
  token: string;
  onNext?: () => void;
  onBack?: () => void;
};

const DASHBOARD_SCREENS = [
  "dashboard",
  "documents",
  "list",
  "grid",
  "heartRate",
  "spo2",
  "respiratory",
  "temperature",
  "bloodPressure",
  "notifications",
  "clinicalCare",
  "deviceManagement",
  "preferences",
] as const;

type DashboardScreenKey = (typeof DASHBOARD_SCREENS)[number];

export function DashboardContainer({ section, token }: DashboardContainerProps) {
  const [showSettings, setShowSettings] = useState(false);
  const { tap } = useFeedback();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasSyncedRef = useRef(false);
  const storageKey = `carehub:lastRoute:${token}`;

  const screenParam = searchParams.get("screen");
  const normalizeScreen = (value: string | null): DashboardScreenKey | null => {
    if (!value) return null;
    return DASHBOARD_SCREENS.includes(value as DashboardScreenKey)
      ? (value as DashboardScreenKey)
      : null;
  };

  const resolvedScreen = normalizeScreen(screenParam) ?? "dashboard";
  const activeNavItem =
    resolvedScreen === "documents" || resolvedScreen === "list" || resolvedScreen === "grid"
      ? resolvedScreen
      : "home";

  useEffect(() => {
    if (!hasSyncedRef.current) {
      hasSyncedRef.current = true;
    }
  }, []);

  const navigateTo = (nextScreen: DashboardScreenKey, replace = false) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", "dashboard");
    if (nextScreen === "dashboard") {
      params.delete("screen");
    } else {
      params.set("screen", nextScreen);
    }
    const nextUrl = `${pathname}?${params.toString()}`;
    const currentUrl = `${pathname}?${searchParams.toString()}`;
    if (nextUrl === currentUrl) return;
    if (replace) {
      router.replace(nextUrl);
    } else {
      router.push(nextUrl);
    }
  };

  useEffect(() => {
    if (!hasSyncedRef.current) return;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({ step: "dashboard", screen: resolvedScreen, ts: Date.now() })
      );
    }
  }, [resolvedScreen, storageKey]);

  const handleNavClick = (itemId: "home" | "documents" | "list" | "grid") => {
    if (itemId === "home") {
      navigateTo("dashboard");
      return;
    }
    navigateTo(itemId);
  };

  const handleBackClick = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    navigateTo("dashboard", true);
  };

  return (
    <>
    {["dashboard","temperature","heartRate","spo2","respiratory","bloodPressure"].includes(resolvedScreen) &&
    <div className="min-h-screen text-left text-black font-haas-grot-disp-trial">
    <div className="care-shell care-padding flex h-screen flex-col bg-[#FAF9F8] pb-4 pt-3">
      <div className="sticky top-3 z-40 rounded-2xl bg-white/70 p-2">
    <ProfileHeader
          name="Rashi Agrawal"
          handle="+91 1234567890"
          avatarSrc="/icons/patient.svg"
          bellIconSrc="/icons/bell-01.svg"
          onBellClick={() => navigateTo("notifications")}
          onProfileClick={() => navigateTo("dashboard")}
          onSettingsClick={() => {
            tap();
            setShowSettings(true);
          }}
        />
        </div>
      {resolvedScreen === "dashboard" && (
        <>
        <DashboardScreen
          section={section}
          onNavClick={handleNavClick}
          activeNavItem={activeNavItem}
          onHeartRateClick={() => navigateTo("heartRate")}
          onSpo2Click={() => navigateTo("spo2")}
          onRespiratoryClick={() => navigateTo("respiratory")}
          onTemperatureClick={() => navigateTo("temperature")}
          onBloodPressureClick={() => navigateTo("bloodPressure")}
        />
        <div className="sticky bottom-2">
      <Bottombar activeItem={activeNavItem} onItemClick={handleNavClick} />
     </div>
        </>
      )}
      
      {resolvedScreen === "temperature" && (
        <TemperatureDetail 
        onBack={handleBackClick}
           />
      )}
      
      {resolvedScreen === "heartRate" && (
        <HeartRateDetail 
        onBack={handleBackClick}
        />
      )}
      {resolvedScreen === "spo2" && (
        <Spo2Detail 
        onBack={handleBackClick}
           />
      )}
      {resolvedScreen === "respiratory" && (
        <RespiratoryDetail 
        onBack={handleBackClick}
           />
      )}
      
      {resolvedScreen === "bloodPressure" && (
        <BloodPressureDetail 
        onBack={handleBackClick} 
       />
      )}
      </div>
</div>
}
      {resolvedScreen === "documents" && (
        <DocumentScreen
          onBack={handleBackClick}
          onNavClick={handleNavClick}
          activeItem="documents"
        />
      )}
      {resolvedScreen === "list" && (
        <TodoListScreen onNavClick={handleNavClick} activeItem="list" />
      )}
      {resolvedScreen === "grid" && (
        <DevicesGridScreen onNavClick={handleNavClick} activeItem="grid" />
      )}
      
      {resolvedScreen === "notifications" && (
        <NotificationScreen onBack={handleBackClick} />
      )}
      {resolvedScreen === "clinicalCare" && (
        <ClinicalCareOverview onBack={handleBackClick} />
      )}
      {resolvedScreen === "deviceManagement" && (
        <DeviceManagementScreen onBack={handleBackClick} />
      )}
      {resolvedScreen === "preferences" && (
        <PreferencesControlScreen onBack={handleBackClick} />
      )}

      <FeedbackSettingsSheet open={showSettings} onClose={() => setShowSettings(false)} />

    </>
  );
}
