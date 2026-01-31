"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  token: string;
};

const FLOW_STEPS = ["welcome", "onboarding", "connect", "otp", "sosDoes", "sosWorks", "dashboard"] as const;
type FlowStep = (typeof FLOW_STEPS)[number];

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function ClientCareFlow({ layout, token }: ClientCareFlowProps) {
  const [step, setStep] = useState<
    "welcome" | "onboarding" | "connect" | "otp" | "sosDoes" | "sosWorks" | "dashboard"
  >("welcome");
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasRestoredRef = useRef(false);
  const pendingScreenRef = useRef<string | null>(null);

  const stepParam = searchParams.get("step");
  const screenParam = searchParams.get("screen");
  const resumeParam = searchParams.get("resume");

  const storageKey = `carehub:lastRoute:${token}`;

  const normalizeStep = (value: string | null): FlowStep | null => {
    if (!value) return null;
    return FLOW_STEPS.includes(value as FlowStep) ? (value as FlowStep) : null;
  };

  useEffect(() => {
    if (hasRestoredRef.current) return;
    hasRestoredRef.current = true;

    const urlStep = normalizeStep(stepParam);
    if (urlStep) {
      if (resumeParam !== "1") {
        const params = new URLSearchParams(searchParams.toString());
        params.set("step", "welcome");
        params.delete("screen");
        params.delete("resume");
        router.replace(`${pathname}?${params.toString()}`);
        setStep("welcome");
        setIsReady(true);
        return;
      }
      setStep(urlStep);
      setIsReady(true);
      return;
    }

    if (typeof window === "undefined") return;
    if (resumeParam !== "1") {
      window.localStorage.removeItem(storageKey);
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", "welcome");
      params.delete("screen");
      params.delete("resume");
      router.replace(`${pathname}?${params.toString()}`);
      setStep("welcome");
      setIsReady(true);
      return;
    }

    const storedRaw = window.localStorage.getItem(storageKey);
    if (!storedRaw) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", "welcome");
      params.delete("screen");
      params.delete("resume");
      router.replace(`${pathname}?${params.toString()}`);
      setStep("welcome");
      setIsReady(true);
      return;
    }

    try {
      const stored = JSON.parse(storedRaw) as { step?: FlowStep; screen?: string; ts?: number };
      if (!stored?.step || !stored.ts) return;
      if (Date.now() - stored.ts > ONE_DAY_MS) return;
      if (!FLOW_STEPS.includes(stored.step)) return;

      pendingScreenRef.current = stored.screen ?? null;
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", stored.step);
      if (stored.step === "dashboard" && stored.screen) {
        params.set("screen", stored.screen);
      } else {
        params.delete("screen");
      }
      params.delete("resume");
      router.replace(`${pathname}?${params.toString()}`);
      setStep(stored.step);
      if (!stored.screen) {
        setIsReady(true);
      }
    } catch {
      // ignore invalid cache
      setIsReady(true);
    }
  }, [pathname, router, searchParams, stepParam, storageKey]);

  useEffect(() => {
    const urlStep = normalizeStep(stepParam);
    if (urlStep && urlStep !== step) {
      setStep(urlStep);
    }
    if (pendingScreenRef.current) {
      if (screenParam === pendingScreenRef.current) {
        pendingScreenRef.current = null;
        setIsReady(true);
      }
      return;
    }
    if (urlStep && !isReady) {
      setIsReady(true);
    }
  }, [screenParam, stepParam, step]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload = {
      step,
      screen: step === "dashboard" ? screenParam ?? undefined : undefined,
      ts: Date.now(),
    };
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
  }, [screenParam, step, storageKey]);

  const pushStep = (nextStep: FlowStep) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", nextStep);
    if (nextStep === "dashboard") {
      if (!params.get("screen")) {
        params.delete("screen");
      }
    } else {
      params.delete("screen");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const goBack = (fallbackStep: FlowStep) => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    pushStep(fallbackStep);
  };

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

  if (!isReady) {
    return null;
  }

  if (step === "welcome") {
    return (
      <WelcomeHero
        section={welcomeSection}
        onStart={() => pushStep("onboarding")}
      />
    );
  }

  if (!sliderSection) {
    return (
      <WelcomeHero
        section={welcomeSection}
        onStart={() => pushStep("onboarding")}
      />
    );
  }

  if (step === "onboarding") {
    return (
      <OnboardingSlider
        section={sliderSection}
        onComplete={() => pushStep("connect")}
      />
    );
  }

  if (step === "connect") {
    if (!connectSection) {
      return (
        <OnboardingSlider
          section={sliderSection}
          onComplete={() => pushStep("connect")}
        />
      );
    }

    return (
      <ConnectForm
        section={connectSection}
        onBack={() => goBack("onboarding")}
        onNext={() => pushStep("otp")}
      />
    );
  }

  if (!otpSection) {
    if (!connectSection) {
      return (
        <OnboardingSlider
          section={sliderSection}
          onComplete={() => pushStep("connect")}
        />
      );
    }

    return (
      <ConnectForm
        section={connectSection}
        onBack={() => goBack("onboarding")}
        onNext={() => pushStep("otp")}
      />
    );
  }

  if (step === "otp") {
    return (
      <OtpVerify
        section={otpSection}
        onBack={() => goBack("connect")}
        onNext={() => pushStep("sosDoes")}
      />
    );
  }

  if (step === "sosDoes") {
    if (!sosSection) return null;
    return (
      <SosDoes
        section={sosSection}
        onBack={() => goBack("otp")}
        onNext={() => pushStep("sosWorks")}
      />
    );
  }

  if (step === "sosWorks") {
    if (!sosWorksSection) return null;
    return (
      <SosWorks
        section={sosWorksSection}
        onBack={() => goBack("sosDoes")}
        onNext={() => pushStep("dashboard")}
      />
    );
  }

  if (step === "dashboard") {
    if (!dashboardSection) return null;
    return <DashboardContainer section={dashboardSection} token={token} />;
  }

  return null;
}
