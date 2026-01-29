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
          onNotificationsClick={() => setCurrentScreen("notifications")}
          onProfileClick={() => setCurrentScreen("profile")}
        />
      )}
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
      {currentScreen === "heartRate" && (
        <HeartRateDetail 
        onBack={handleBackClick}
        onNotificationsClick={() => setCurrentScreen("notifications")}
        onProfileClick={() => setCurrentScreen("profile")}
        />
      )}
      {currentScreen === "spo2" && (
        <Spo2Detail 
        onBack={handleBackClick}
        onNotificationsClick={() => setCurrentScreen("notifications")}
        onProfileClick={() => setCurrentScreen("profile")}
           />
      )}
      {currentScreen === "respiratory" && (
        <RespiratoryDetail 
        onBack={handleBackClick}
        onNotificationsClick={() => setCurrentScreen("notifications")}
        onProfileClick={() => setCurrentScreen("profile")}
           />
      )}
      {currentScreen === "temperature" && (
        <TemperatureDetail 
        onBack={handleBackClick}
        onNotificationsClick={() => setCurrentScreen("notifications")}
        onProfileClick={() => setCurrentScreen("profile")}
           />
      )}
      {currentScreen === "bloodPressure" && (
        <BloodPressureDetail 
        onBack={handleBackClick} 
        onNotificationsClick={() => setCurrentScreen("notifications")}
        onProfileClick={() => setCurrentScreen("profile")} />
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
