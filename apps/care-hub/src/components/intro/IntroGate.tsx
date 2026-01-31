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
  }, [searchParams]);

  if (isDone) {
    return <>{children}</>;
  }

  return <StudioLumioIntro onComplete={() => setIsDone(true)} />;
}
