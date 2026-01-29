"use client";

import { useEffect, useRef } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PwaRegister() {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const register = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js");
      } catch {
        // Ignore registration errors in development.
      }
    };

    register();

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      deferredPrompt.current = event as BeforeInstallPromptEvent;
    };

    const handleUserGesture = async () => {
      if (!deferredPrompt.current) return;
      try {
        await deferredPrompt.current.prompt();
        const choice = await deferredPrompt.current.userChoice;
        if (choice.outcome !== "accepted") {
          deferredPrompt.current = null;
        }
      } catch {
        deferredPrompt.current = null;
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("click", handleUserGesture, { once: true });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("click", handleUserGesture);
    };
  }, []);

  return null;
}
