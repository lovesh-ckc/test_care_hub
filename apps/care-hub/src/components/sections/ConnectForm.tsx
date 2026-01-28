"use client";

import Image from "next/image";
import { useState } from "react";
import type { ConnectFormSection } from "@care-hub/lib/types";

type ConnectFormProps = {
  section: ConnectFormSection;
  onBack?: () => void;
  onNext?: () => void;
};

export function ConnectForm({ section, onBack, onNext }: ConnectFormProps) {
  const {
    title,
    description,
    abhaPlaceholder,
    mobilePlaceholder,
    countryCode,
    separatorText,
    buttonLabel,
  } = section.props;
  const [abhaValue, setAbhaValue] = useState("");
  const [mobileValue, setMobileValue] = useState("");

  const isValid = abhaValue.trim().length > 0 || mobileValue.trim().length > 0;

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-6 px-5 py-10 text-left sm:px-6">
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

      <div className="relative flex h-44 w-full max-w-sm items-center justify-center sm:h-52 sm:max-w-md lg:h-64 lg:max-w-lg mb-4">
        <Image
          src="/illustration/illustration5.svg"
          alt=""
          width={260}
          height={220}
          className="h-full w-auto"
        />
      </div>

      <div className="flex w-full max-w-sm flex-col gap-4 sm:max-w-md lg:max-w-lg">
        <h2 className="text-lg font-semibold text-[color:var(--ink)]">
          {title}
        </h2>
        <p className="text-sm text-[color:var(--muted-ink)]">
          {description}
        </p>
        <input
          className="h-11 w-full rounded-full border border-[color:var(--muted-ink)]/30 px-4 text-sm text-[color:var(--ink)] outline-none placeholder:text-zinc-400"
          placeholder={abhaPlaceholder}
          value={abhaValue}
          onChange={(event) => setAbhaValue(event.target.value)}
        />
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-zinc-400">
          <span className="h-px flex-1 bg-zinc-200" />
          {separatorText}
          <span className="h-px flex-1 bg-zinc-200" />
        </div>
        <div className="flex h-11 w-full items-center rounded-full border border-[color:var(--muted-ink)]/30 px-3">
          <span className="text-sm text-[color:var(--muted-ink)]">
            {countryCode}
          </span>
          <div className="mx-2 h-5 w-px bg-zinc-200" />
          <input
            className="h-full w-full bg-transparent text-sm text-[color:var(--ink)] outline-none placeholder:text-zinc-400"
            placeholder={mobilePlaceholder}
            value={mobileValue}
            onChange={(event) => setMobileValue(event.target.value)}
          />
        </div>
        <button
          className={`mt-2 flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold text-[color:var(--brand-contrast)]
            ${isValid ? "bg-[color:var(--brand)]" : "bg-[color:var(--brand)]/40"}`}
          type="button"
          onClick={() => {
            if (isValid) {
              onNext?.();
            }
          }}
        >
          {buttonLabel}
        </button>
      </div>
    </section>
  );
}
