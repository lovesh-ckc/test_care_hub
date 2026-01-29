"use client";

import { useState } from "react";
import StudioLumioIntro from "@care-hub/components/intro/StudioLumioIntro";

type IntroGateProps = {
  children: React.ReactNode;
};

export function IntroGate({ children }: IntroGateProps) {
  const [isDone, setIsDone] = useState(false);

  if (isDone) {
    return <>{children}</>;
  }

  return <StudioLumioIntro onComplete={() => setIsDone(true)} />;
}
