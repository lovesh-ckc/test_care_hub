"use client";

import { useMemo, useState } from "react";
import {
  ConnectFormSection,
  Dashboard,
  LayoutSection,
  OnboardingSliderSection,
  OtpVerifySection,
  SosDoesSection,
  SosWorksSection,
  WelcomeSection,
} from "@care-hub/lib/types";
import { WelcomeHero } from "@care-hub/components/sections/WelcomeHero";
import { OnboardingSlider } from "@care-hub/components/sections/OnboardingSlider";
import { ConnectForm } from "@care-hub/components/sections/ConnectForm";
import { OtpVerify } from "@care-hub/components/sections/OtpVerify";
import { SosDoes } from "@care-hub/components/sections/SosDoes";
import { SosWorks } from "@care-hub/components/sections/SosWorks";
import { DashboardContainer } from "@care-hub/components/sections/DashboardContainer";

type ClientCareFlowProps = {
  layout: LayoutSection[];
};

export function ClientCareFlow({ layout }: ClientCareFlowProps) {
  const [step, setStep] = useState<
    "welcome" | "onboarding" | "connect" | "otp" | "sosDoes" | "sosWorks" | "dashboard"
  >("welcome");

  const welcomeSection = useMemo(
    () =>
      layout.find((item) => item.type === "welcome") as
        | WelcomeSection
        | undefined,
    [layout]
  );
  const sliderSection = useMemo(
    () =>
      layout.find((item) => item.type === "onboardingSlider") as
        | OnboardingSliderSection
        | undefined,
    [layout]
  );
  const connectSection = useMemo(
    () =>
      layout.find((item) => item.type === "connectForm") as
        | ConnectFormSection
        | undefined,
    [layout]
  );
  const otpSection = useMemo(
    () =>
      layout.find((item) => item.type === "otpVerify") as
        | OtpVerifySection
        | undefined,
    [layout]
  );
  const sosSection = useMemo(
    () =>
      layout.find((item) => item.type === "sosDoes") as
        | SosDoesSection
        | undefined,
    [layout]
  );

  const sosWorksSection = useMemo(
    () =>
      layout.find((item) => item.type === "sosWorks") as
        | SosWorksSection
        | undefined,
    [layout]
  );

  const dashboardSection = useMemo(
    () =>
      layout.find((item) => item.type === "dashboard") as
        | Dashboard
        | undefined,
    [layout]
  );

  if (!welcomeSection) {
    return null;
  }

  if (step === "welcome") {
    return (
      <WelcomeHero
        section={welcomeSection}
        onStart={() => setStep("onboarding")}
      />
    );
  }

  if (!sliderSection) {
    return (
      <WelcomeHero
        section={welcomeSection}
        onStart={() => setStep("onboarding")}
      />
    );
  }

  if (step === "onboarding") {
    return (
      <OnboardingSlider
        section={sliderSection}
        onComplete={() => setStep("connect")}
      />
    );
  }

  if (step === "connect") {
    if (!connectSection) {
      return (
        <OnboardingSlider
          section={sliderSection}
          onComplete={() => setStep("connect")}
        />
      );
    }

    return (
      <ConnectForm
        section={connectSection}
        onBack={() => setStep("onboarding")}
        onNext={() => setStep("otp")}
      />
    );
  }

  if (!otpSection) {
    if (!connectSection) {
      return (
        <OnboardingSlider
          section={sliderSection}
          onComplete={() => setStep("connect")}
        />
      );
    }

    return (
      <ConnectForm
        section={connectSection}
        onBack={() => setStep("onboarding")}
        onNext={() => setStep("otp")}
      />
    );
  }

  if (step === "otp") {
    return (
      <OtpVerify
        section={otpSection}
        onBack={() => setStep("connect")}
        onNext={() => setStep("sosDoes")}
      />
    );
  }

  if (step === "sosDoes") {
    if (!sosSection) return null;
    return (
      <SosDoes
        section={sosSection}
        onBack={() => setStep("otp")}
        onNext={() => setStep("sosWorks")}
      />
    );
  }

  if (step === "sosWorks") {
    if (!sosWorksSection) return null;
    return (
      <SosWorks
        section={sosWorksSection}
        onBack={() => setStep("sosDoes")}
        onNext={() => setStep("dashboard")}
      />
    );
  }

  if (step === "dashboard") {
    if (!dashboardSection) return null;
    return <DashboardContainer section={dashboardSection} />;
  }

  return null;
}
