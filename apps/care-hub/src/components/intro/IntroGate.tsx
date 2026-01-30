"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import StudioLumioIntro from "@care-hub/components/intro/StudioLumioIntro";

type IntroGateProps = {
  children: React.ReactNode;
};

export function IntroGate({ children }: IntroGateProps) {
  const [isDone, setIsDone] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const step = searchParams.get("step");
    if (step && step !== "welcome") {
      setIsDone(true);
      return;
    }

    if (typeof window === "undefined") return;
    if (!pathname.startsWith("/v/")) return;

    const token = pathname.split("/")[2];
    if (!token) return;

    const storedRaw = window.localStorage.getItem(`carehub:lastRoute:${token}`);
    if (!storedRaw) return;

    try {
      const stored = JSON.parse(storedRaw) as { step?: string; ts?: number };
      if (stored?.step && stored.step !== "welcome") {
        setIsDone(true);
      }
    } catch {
      // ignore invalid cache
    }
  }, [pathname, searchParams]);

  if (isDone) {
    return <>{children}</>;
  }

  return <StudioLumioIntro onComplete={() => setIsDone(true)} />;
}
