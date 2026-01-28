"use client";

import type { SosDoesSection } from "@care-hub/lib/types";
import Image from "next/image";

type SosDoesProps = {
  section: SosDoesSection;
  onNext?: () => void;
  onBack?: () => void;
};

export function SosDoes({ section, onNext, onBack }: SosDoesProps) {
  const { title, subtitle, buttonLabel } = section.props;

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-6 px-5 py-10 text-center sm:gap-8 sm:px-6 sm:py-12">
      <div className="flex w-full max-w-sm items-center gap-3 sm:max-w-md lg:max-w-lg">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--muted-ink)]/30"
          aria-label="Go back"
          onClick={onBack}
        >
          <Image src="/Leftarrow.svg" alt="Go back" width={24} height={24} />
        </button>
      </div>
      <div className="relative flex h-48 w-full max-w-sm items-center justify-center sm:h-56 sm:max-w-md lg:h-72 lg:max-w-lg">
        <Image src="/illustration/illustration7.svg" alt="" width={280} height={220} className="h-full w-auto" />
      </div>
      <div className="flex max-w-sm flex-col items-center gap-3 sm:max-w-md lg:max-w-lg">
        <h1 className="text-[clamp(2rem,9vw,3.5rem)] font-normal lowercase tracking-[0.06em] leading-[0.95] p-2 sm:p-4">
          {title}
        </h1>
        <p className="text-[clamp(1rem,3.6vw,1.625rem)] text-[color:var(--muted-ink)] font-[family:var(--font-body)]">
          {subtitle}
        </p>
      </div>
      <button
        className="flex w-full max-w-sm items-center justify-center gap-3 rounded-full bg-[color:var(--brand)] px-6 py-[0.915rem] text-sm font-semibold text-[color:var(--brand-contrast)] sm:max-w-md sm:text-base lg:max-w-lg"
        type="button"
        onClick={onNext}
      >
        {buttonLabel}
      </button>
    </section>
  );
}
