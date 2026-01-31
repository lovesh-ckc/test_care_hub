"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { OtpVerifySection } from "@care-hub/lib/types";
import { useFeedback } from "@care-hub/components/feedback/FeedbackProvider";
import { sendOtpEmail } from "@care-hub/lib/email/sendOtpEmail";
import { clearOtp, generateOtp, isOtpExpired, readOtp, storeOtp } from "@care-hub/lib/email/otpStore";

type OtpVerifyProps = {
  section: OtpVerifySection;
  onBack?: () => void;
  onNext?: () => void;
};

export function OtpVerify({ section, onBack, onNext }: OtpVerifyProps) {
  const { tap, confirm, error } = useFeedback();
  const {
    description,
    helperText,
    resendLabel,
    buttonLabel,
  } = section.props;
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const stored = readOtp();
    if (stored?.email) {
      setEmail(stored.email);
    }
    if (isOtpExpired(stored)) {
      setStatusMessage("OTP expired. Please resend.");
      clearOtp();
    }
  }, []);

  const isComplete = useMemo(
    () => digits.every((digit) => digit.trim().length === 1),
    [digits]
  );

  function updateDigit(index: number, value: string) {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) {
      setDigits((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
      return;
    }
    setDigits((prev) => {
      const next = [...prev];
      next[index] = cleaned.slice(0, 1);
      return next;
    });
    if (index < digits.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    const text = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) return;
    const sliced = text.slice(0, digits.length).split("");
    setDigits((prev) => {
      const next = [...prev];
      sliced.forEach((char, idx) => {
        next[idx] = char;
      });
      return next;
    });
    const lastIndex = Math.min(sliced.length - 1, digits.length - 1);
    if (lastIndex >= 0) {
      inputRefs.current[lastIndex]?.focus();
    }
  }

  async function handleResend() {
    if (!email || !email.endsWith("@lemnyscate.com")) {
      setStatusMessage("Only @lemnyscate.com emails allowed.");
      error();
      return;
    }
    setIsSending(true);
    setStatusMessage("");
    const otp = generateOtp();
    storeOtp(email, otp);
    try {
      console.log("[EmailJS] Resending OTP", { email, otp });
      await sendOtpEmail(email, otp);
      setStatusMessage("New OTP sent.");
      confirm();
    } catch {
      console.error("[EmailJS] Resend failed");
      setStatusMessage("Could not resend OTP. Try again.");
      error();
    } finally {
      setIsSending(false);
    }
  }

  function handleVerify() {
    const entered = digits.join("");
    const stored = readOtp();
    if (!stored || isOtpExpired(stored)) {
      setStatusMessage("OTP expired. Please resend.");
      clearOtp();
      error();
      return;
    }
    if (entered !== stored.otp) {
      setStatusMessage("Incorrect OTP. Please try again.");
      error();
      return;
    }
    setStatusMessage("");
    confirm();
    onNext?.();
  }

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-6 px-5 py-10 text-left sm:px-6">
      <div className="flex w-full max-w-sm items-center gap-3 sm:max-w-md lg:max-w-lg">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-var(--muted-ink)/30"
          aria-label="Go back"
          onClick={() => {
            tap();
            onBack?.();
          }}
        >
          <Image
            src="/Leftarrow.svg"
            alt="Go back"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
      </div>

      <div className="relative flex h-44 w-full max-w-sm items-center justify-center sm:h-52 sm:max-w-md lg:h-64 lg:max-w-lg mb-10">
        <Image src="/illustration/illustration6.svg" alt="" width={260} height={220} className="h-full w-auto" />
      </div>

      <div className="flex w-full items-center flex-col gap-4 sm:max-w-md lg:max-w-lg">
        <p className="text-sm text-(--muted-ink)">
          {description}
          {email ? <span className="block text-xs text-gray-400">Sent to {email}</span> : null}
        </p>
        <div className="flex items-center gap-2">
          {digits.map((digit, index) => (
            <input
              key={`otp-${index}`}
              className="h-10 w-10 px-2 rounded-2xl border border-(--muted-ink)/30 text-center text-sm text-(--ink) outline-none focus:ring-2 focus:ring-orange-200"
              inputMode="numeric"
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={digit}
              onChange={(event) => updateDigit(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={index === 0 ? handlePaste : undefined}
            />
          ))}
        </div>
        <div className="flex w-full justify-between text-xs">
          <p className="text-(--muted-ink)">{helperText}</p>
          <button
            type="button"
            className="text-xs text-(--muted-ink) cursor-pointer"
            onClick={() => {
              tap();
              handleResend();
            }}
            disabled={isSending}
          >
            {isSending ? "Sending..." : resendLabel}
          </button>
        </div>
        {statusMessage ? (
          <p className="text-xs text-red-500 font-ibm-plex-sans w-full text-left">{statusMessage}</p>
        ) : null}
        <button
          className={`mt-2 flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold text-(--brand-contrast)
            ${isComplete ? "bg-(--brand)" : "bg-(--brand)/40"}`}
          type="button"
          onClick={() => {
            if (isComplete) {
              handleVerify();
              return;
            }
            error();
          }}
          disabled={!isComplete}
        >
          {buttonLabel}
        </button>
      </div>
    </section>
  );
}
