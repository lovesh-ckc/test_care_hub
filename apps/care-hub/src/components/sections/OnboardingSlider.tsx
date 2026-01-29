"use client";

import { useMemo, useState } from "react";
import type { OnboardingSliderSection } from "@care-hub/lib/types";
import Image from "next/image";
import { useFeedback } from "@care-hub/components/feedback/FeedbackProvider";

type OnboardingSliderProps = {
  section: OnboardingSliderSection;
  onComplete?: () => void;
};

const illustrationMap: Record<string, string> = {
  laptop: "/illustration/illustration2.svg",
  chat: "/illustration/illustration3.svg",
  support: "/illustration/illustration4.svg",
  highfive: "/illustration/illustration4.svg",
};

export function OnboardingSlider({
  section,
  onComplete,
}: OnboardingSliderProps) {
  const { tap, confirm } = useFeedback();
  const {
    slides,
    textAlign = "left",
  } = section.props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const activeSlide = useMemo(() => slides[activeIndex], [slides, activeIndex]);
  const textAlignClass = textAlign === "center" ? "text-center" : "text-left";

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const delta = touchStartX - endX;
    const threshold = 40;

    if (delta > threshold && activeIndex < slides.length - 1) {
      setActiveIndex(activeIndex + 1);
    }

    if (delta < -threshold && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }

    setTouchStartX(null);
  }

  if (!activeSlide) {
    return null;
  }

  const illustrationSrc = illustrationMap[activeSlide.illustration] ?? "/illustration/illustration2.svg";

  return (
    <section
      className={`flex h-screen w-full flex-col items-center justify-center gap-2 px-5 py-10 sm:gap-3 sm:px-6 sm:py-2 ${textAlignClass}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex h-48 w-full max-w-sm items-center justify-center sm:h-60 sm:max-w-md lg:h-72 lg:max-w-lg">
        <Image src={illustrationSrc} alt="" width={280} height={220} className="h-full w-auto" />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-3 sm:max-w-md lg:max-w-lg">
        <h2
          className="text-[clamp(2rem,4vw,3rem)] text-(--ink) font-(--font-greeting)"
        >
          {activeSlide.title}
        </h2>
        <p
          className="text-(--muted-ink) font-(--font-body)
            text-[clamp(1rem,3.6vw,1.5rem)]"
        >
          {activeSlide.subtitle}
        </p>
      </div>
      <div className="flex items-center justify-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`h-1 rounded-full transition-all duration-200
              ${index === activeIndex ? "w-6 opacity-100 bg-(--brand)" : "w-2 opacity-50 bg-(--brand)"}`}
            type="button"
            onClick={() => {
              tap();
              setActiveIndex(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {activeSlide.ctaLabel ? (
        <button
          className="flex w-full max-w-sm items-center justify-center rounded-full bg-(--brand) px-6 py-[0.95rem] text-base font-semibold text-(--brand-contrast) sm:max-w-md lg:max-w-lg"
          type="button"
          onClick={() => {
            if (activeIndex < slides.length - 1) {
              tap();
              setActiveIndex((current) =>
                Math.min(current + 1, slides.length - 1)
              );
              return;
            }

            confirm();
            onComplete?.();
          }}
        >
          {activeSlide.ctaLabel}
        </button>
      ) : null}
    </section>
  );
}
