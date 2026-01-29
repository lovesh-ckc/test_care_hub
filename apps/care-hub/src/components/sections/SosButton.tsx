"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useFeedback } from "@care-hub/components/feedback/FeedbackProvider";
import { createPortal } from "react-dom";

type SosButtonProps = {
  variant?: "full" | "compact";
  onTriggered?: () => void;
};

const HOLD_DURATION = 800;

export function SosButton({ variant = "full", onTriggered }: SosButtonProps) {
  const { tap, sos, confirm, error } = useFeedback();
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sheetState, setSheetState] = useState<"idle" | "sending" | "sent">("idle");
  const [isMounted, setIsMounted] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const reset = () => {
    setIsHolding(false);
    setProgress(0);
    startRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const trigger = () => {
    setSheetState("sending");
    sos();
    onTriggered?.();
    setTimeout(() => {
      setSheetState("sent");
      confirm();
    }, 800);
  };

  const tick = (now: number) => {
    if (!startRef.current) startRef.current = now;
    const elapsed = now - startRef.current;
    const nextProgress = Math.min(elapsed / HOLD_DURATION, 1);
    setProgress(nextProgress);
    if (nextProgress >= 1) {
      reset();
      trigger();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  const startHold = () => {
    if (sheetState !== "idle") return;
    tap();
    setIsHolding(true);
    rafRef.current = requestAnimationFrame(tick);
  };

  const endHold = () => {
    if (sheetState !== "idle") return;
    if (progress < 1) {
      error();
    }
    reset();
  };

  useEffect(() => () => reset(), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const ringStyle: CSSProperties = {
    background: `conic-gradient(#ff8b00 ${progress * 360}deg, rgba(0,0,0,0.08) 0deg)`,
  };

  const isCompact = variant === "compact";

  return (
    <>
      <button
        type="button"
        className={
          isCompact
            ? "relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md"
            : "relative flex w-full items-center justify-between rounded-2xl border border-orange-200 bg-[#FDF3EE] px-4 py-3 text-left shadow-sm"
        }
        onPointerDown={startHold}
        onPointerUp={endHold}
        onPointerLeave={endHold}
        onPointerCancel={endHold}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            startHold();
          }
        }}
        onKeyUp={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            endHold();
          }
        }}
        aria-label="Hold to send SOS"
      >
        <span
          className={`absolute inset-1 rounded-full ${isCompact ? "" : "hidden"}`}
          style={ringStyle}
          aria-hidden="true"
        />
        <span
          className={`absolute ${isCompact ? "inset-1" : "left-3 top-1/2 h-10 w-10 -translate-y-1/2"} rounded-full`}
          style={ringStyle}
          aria-hidden="true"
        />
        <span className={`${isCompact ? "relative z-10" : "relative z-10 flex items-center gap-3"}`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path
                d="M12 7v6m0 4h.01M10.29 3.86l-7.4 12.8A2 2 0 0 0 4.6 20h14.8a2 2 0 0 0 1.71-3.34l-7.4-12.8a2 2 0 0 0-3.42 0Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {!isCompact && (
            <span>
              <div className="text-sm font-semibold text-gray-900">Hold to send SOS</div>
              <div className="text-xs text-gray-500 font-ibm-plex-sans">
                Press and hold for 0.8s to confirm
              </div>
            </span>
          )}
        </span>
        {!isCompact && (
          <span className="relative z-10 text-xs font-semibold text-orange-500">SOS</span>
        )}
        {isHolding && !isCompact ? (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
            {Math.round(progress * 100)}%
          </span>
        ) : null}
      </button>

      {sheetState !== "idle" && isMounted
        ? createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-4 py-8 motion-fade-in">
              <button type="button" className="absolute inset-0" onClick={() => setSheetState("idle")} />
              <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl motion-fade-up">
                <div className="text-base font-semibold text-gray-800">
                  {sheetState === "sending" ? "Sending SOS..." : "SOS sent"}
                </div>
                <div className="mt-2 text-sm text-gray-500 font-ibm-plex-sans">
                  {sheetState === "sending"
                    ? "Your care team is being alerted."
                    : "Help is on the way. Stay calm and keep your phone nearby."}
                </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white"
                  onClick={() => setSheetState("idle")}
                >
                  Close
                </button>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
