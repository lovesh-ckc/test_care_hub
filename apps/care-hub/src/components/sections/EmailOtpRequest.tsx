"use client";

import Image from "next/image";
import { useState } from "react";
import type { ConnectFormSection } from "@care-hub/lib/types";
import { sendOtpEmail } from "@care-hub/lib/email/sendOtpEmail";
import { generateOtp, storeOtp } from "@care-hub/lib/email/otpStore";
import { useFeedback } from "@care-hub/components/feedback/FeedbackProvider";

type EmailOtpRequestProps = {
  section: ConnectFormSection;
  onBack?: () => void;
  onNext?: () => void;
};

// DEMO ONLY: Email OTP request (client-side).
export function EmailOtpRequest({ section, onBack, onNext }: EmailOtpRequestProps) {
  const { tap, confirm, error } = useFeedback();
  const { title, description, buttonLabel, abhaPlaceholder } = section.props;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const isAllowed = email.trim().length > 0 && email.trim().endsWith("@lemnyscate.com");

  async function handleSend() {
    if (!isAllowed) {
      setMessage("Only @lemnyscate.com emails allowed.");
      error();
      return;
    }

    setStatus("sending");
    setMessage("");
    const otp = generateOtp();
    storeOtp(email.trim(), otp);
    try {
      console.log("[EmailJS] Sending OTP", { email: email.trim(), otp });
      await sendOtpEmail(email.trim(), otp);
      setStatus("sent");
      confirm();
      onNext?.();
    } catch (err) {
      console.error("[EmailJS] Send failed", err);
      setStatus("error");
      setMessage("Could not send OTP. Please try again.");
      error();
    }
  }

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-6 px-5 py-10 text-left sm:px-6">
      <div className="flex w-full max-w-sm items-center gap-3 sm:max-w-md lg:max-w-lg">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--muted-ink)]/30"
          aria-label="Go back"
          onClick={() => {
            tap();
            onBack?.();
          }}
        >
          <Image src="/Leftarrow.svg" alt="Go back" width={24} height={24} className="h-6 w-6" />
        </button>
      </div>

      <div className="relative flex h-44 w-full max-w-sm items-center justify-center sm:h-52 sm:max-w-md lg:h-64 lg:max-w-lg mb-4 motion-fade-up">
        <Image
          src="/illustration/illustration5.svg"
          alt=""
          width={260}
          height={220}
          className="h-full w-auto"
        />
      </div>

      <div className="flex w-full max-w-sm flex-col gap-4 sm:max-w-md lg:max-w-lg motion-fade-up delay-1">
        <h2 className="text-lg font-semibold text-[color:var(--ink)]">{title}</h2>
        <p className="text-sm text-[color:var(--muted-ink)]">{description}</p>

        <div className="relative">
          <input
            className="h-11 w-full rounded-full border border-[color:var(--muted-ink)]/30 px-11 text-sm text-[color:var(--ink)] outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-orange-200 transition"
            placeholder={"name@lemnyscate.com"}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            inputMode="email"
            autoComplete="email"
          />
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--muted-ink)]">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
              <path
                d="M3 5h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="m3 6 7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {message ? (
          <p className="text-xs text-red-500 font-ibm-plex-sans">{message}</p>
        ) : null}

        <button
          className={`mt-2 flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold text-[color:var(--brand-contrast)]
            ${isAllowed && status !== "sending" ? "bg-[color:var(--brand)]" : "bg-[color:var(--brand)]/40"}`}
          type="button"
          onClick={handleSend}
          disabled={!isAllowed || status === "sending"}
        >
          {status === "sending" ? "Sending OTP..." : buttonLabel}
        </button>
      </div>
    </section>
  );
}
