"use client";

import type { WelcomeSection } from "@care-hub/lib/types";
import Image from "next/image";
import { useFeedback } from "@care-hub/components/feedback/FeedbackProvider";

type WelcomeHeroProps = {
  section: WelcomeSection;
  onStart?: () => void;
};

export function WelcomeHero({ section, onStart }: WelcomeHeroProps) {
  const { confirm } = useFeedback();
  const { title, subtitle, buttonLabel, note } = section.props;

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-6 px-5 py-10 text-center sm:gap-8 sm:px-6 sm:py-12">
      <div className="relative flex h-44 w-full max-w-sm items-center justify-center sm:h-56 sm:max-w-md lg:h-72 lg:max-w-lg">
        <Image src="/illustration/illustration1.svg" alt="" width={280} height={220} className="h-full w-auto" />
      </div>
      <div className="flex w-full max-w-sm flex-col items-center gap-3 sm:max-w-md lg:max-w-lg">
        <h1 className="text-[clamp(2.4rem,10vw,6rem)]  lowercase tracking-[0.06em] leading-[0.9] text-center font-(--font-greeting) bg-[linear-gradient(352deg,var(--ink)_-4.12%,var(--brand)_86.78%)] bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-[clamp(1rem,3.8vw,1.625rem)] text-(--muted-ink) font-(--font-body)">
          {subtitle}
        </p>
        <button
          className="flex w-full max-w-sm items-center justify-center gap-3 rounded-full bg-(--brand) px-6 py-[0.915rem] text-sm font-semibold text-(--brand-contrast) sm:max-w-md sm:text-base lg:max-w-lg"
          type="button"
          onClick={() => {
            confirm();
            onStart?.();
          }}
        >
          {buttonLabel}
        </button>
        <p className="text-[clamp(0.85rem,3.2vw,1.05rem)] tracking-[0.12em] text-(--muted-ink) font-(--font-heading)">
          {note}
        </p>
      </div>
    </section>
  );
}
