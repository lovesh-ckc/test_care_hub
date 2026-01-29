"use client";

import { useState } from "react";
import { DashboardScreen } from "@care-hub/components/sections/Dashboard";
import { DocumentScreen } from "@care-hub/components/UI/documents/Document";
import { HeartRateDetail } from "@care-hub/components/sections/HeartRateDetail";
import { Spo2Detail } from "@care-hub/components/sections/Spo2Detail";
import { RespiratoryDetail } from "@care-hub/components/sections/RespiratoryDetail";
import { TemperatureDetail } from "@care-hub/components/sections/TemperatureDetail";
import { BloodPressureDetail } from "@care-hub/components/sections/BloodPressureDetail";
import { NotificationScreen } from "@care-hub/components/sections/NotificationScreen";
import { ProfileScreen } from "@care-hub/components/sections/ProfileScreen";
import { ClinicalCareOverview } from "@care-hub/components/sections/ClinicalCareOverview";
import { DeviceManagementScreen } from "@care-hub/components/sections/DeviceManagementScreen";
import { PreferencesControlScreen } from "@care-hub/components/sections/PreferencesControlScreen";
import { DevicesGridScreen } from "@care-hub/components/sections/DevicesGridScreen";
import { TodoListScreen } from "@care-hub/components/sections/TodoListScreen";
import type { Dashboard } from "@care-hub/lib/types";
import { ProfileHeader } from "./ProfileHeader";

type ScreenType =
  | "dashboard"
  | "documents"
  | "list"
  | "grid"
  | "heartRate"
  | "spo2"
  | "respiratory"
  | "temperature"
  | "bloodPressure"
  | "notifications"
  | "profile"
  | "clinicalCare"
  | "deviceManagement"
  | "preferences";

type DashboardContainerProps = {
  section: Dashboard;
  onNext?: () => void;
  onBack?: () => void;
};

export function DashboardContainer({ section }: DashboardContainerProps) {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("dashboard");
  const [activeNavItem, setActiveNavItem] = useState<string>("home");

  const handleNavClick = (itemId: "home" | "documents" | "list" | "grid") => {
    setActiveNavItem(itemId);
    if (itemId === "home") {
      setCurrentScreen("dashboard");
      return;
    }
    setCurrentScreen(itemId);
  };

  const handleBackClick = () => {
    setCurrentScreen("dashboard");
    setActiveNavItem("home");
  };

  return (
    <>
    {["dashboard","temperature","heartRate","spo2","respiratory","bloodPressure"].includes(currentScreen) &&
    <div className="min-h-screen text-left text-black font-haas-grot-disp-trial">
    <div className="care-shell care-padding flex h-full flex-col bg-[#FAF9F8] pb-4 pt-3">
      <div className="sticky top-3 topbar shadow-2xl rounded-2xl p-2">
    <ProfileHeader
          name="Rashi Agrawal"
          handle="#rashi.agrawal0789"
          avatarSrc="/icons/patient.svg"
          bellIconSrc="/icons/bell-01.svg"
          onBellClick={() => setCurrentScreen("notifications")}
          onProfileClick={() => setCurrentScreen("profile")}
        />
        </div>
      {currentScreen === "dashboard" && (
        <DashboardScreen
          section={section}
          onNavClick={handleNavClick}
          activeNavItem={activeNavItem}
          onHeartRateClick={() => setCurrentScreen("heartRate")}
          onSpo2Click={() => setCurrentScreen("spo2")}
          onRespiratoryClick={() => setCurrentScreen("respiratory")}
          onTemperatureClick={() => setCurrentScreen("temperature")}
          onBloodPressureClick={() => setCurrentScreen("bloodPressure")}
        />
      )}
      
      {currentScreen === "temperature" && (
        <TemperatureDetail 
        onBack={handleBackClick}
           />
      )}
      
      {currentScreen === "heartRate" && (
        <HeartRateDetail 
        onBack={handleBackClick}
        />
      )}
      {currentScreen === "spo2" && (
        <Spo2Detail 
        onBack={handleBackClick}
           />
      )}
      {currentScreen === "respiratory" && (
        <RespiratoryDetail 
        onBack={handleBackClick}
           />
      )}
      
      {currentScreen === "bloodPressure" && (
        <BloodPressureDetail 
        onBack={handleBackClick} 
       />
      )}
      </div>
</div>
}
      {currentScreen === "documents" && (
        <DocumentScreen
          onBack={handleBackClick}
          onNavClick={handleNavClick}
          activeItem="documents"
        />
      )}
      {currentScreen === "list" && (
        <TodoListScreen onNavClick={handleNavClick} activeItem="list" />
      )}
      {currentScreen === "grid" && (
        <DevicesGridScreen onNavClick={handleNavClick} activeItem="grid" />
      )}
      
      {currentScreen === "notifications" && (
        <NotificationScreen onBack={handleBackClick} />
      )}
      {currentScreen === "profile" && (
        <ProfileScreen
          onBack={handleBackClick}
          onClinicalCare={() => setCurrentScreen("clinicalCare")}
          onDeviceManagement={() => setCurrentScreen("deviceManagement")}
          onPreferences={() => setCurrentScreen("preferences")}
        />
      )}
      {currentScreen === "clinicalCare" && (
        <ClinicalCareOverview onBack={() => setCurrentScreen("profile")} />
      )}
      {currentScreen === "deviceManagement" && (
        <DeviceManagementScreen onBack={() => setCurrentScreen("profile")} />
      )}
      {currentScreen === "preferences" && (
        <PreferencesControlScreen onBack={() => setCurrentScreen("profile")} />
      )}

    </>
  );
}
