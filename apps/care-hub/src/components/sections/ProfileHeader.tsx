"use client";

import Image from "next/image";
import { SosButton } from "@care-hub/components/sections/SosButton";

type ProfileHeaderProps = {
  name: string;
  handle: string;
  avatarSrc: string;
  bellIconSrc: string;
  onBellClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
};

export function ProfileHeader({
  name,
  handle,
  avatarSrc,
  bellIconSrc,
  onBellClick,
  onProfileClick,
  onSettingsClick,
}: ProfileHeaderProps) {
  return (
    <div className="flex z-1000 items-center justify-between motion-fade-up">
      {onProfileClick ? (
        <button
          type="button"
          className="flex items-center gap-3 text-left"
          onClick={onProfileClick}
          aria-label="Open profile"
        >
          <Image className="h-12 w-12 rounded-full object-cover" width={48} height={48} alt="" src={avatarSrc} />
          <div>
            <div className="text-base  font-semibold">{name}</div>
            <div className="text-sm text-gray-500 font-ibm-plex-sans">{handle}</div>
          </div>
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <Image className="h-12 w-12 rounded-full object-cover" width={48} height={48} alt="" src={avatarSrc} />
          <div>
            <div className="text-base font-semibold">{name}</div>
            <div className="text-sm text-gray-500 font-ibm-plex-sans">{handle}</div>
          </div>
        </div>
      )}
      <div className="flex items-center gap-3">
        <SosButton variant="compact" />
        <button
          type="button"
          className="h-10 w-10 rounded-full border border-[#FF8B00] flex items-center justify-center text-sandybrown glow-accent"
          onClick={onBellClick}
          aria-label="Notifications"
        >
          <Image className="h-6 w-6" width={24} height={24} alt="" src={bellIconSrc} />
        </button>
        <button
          type="button"
          className="h-10 w-10 rounded-full border border-[#FF8B00] flex items-center justify-center text-sandybrown"
          onClick={onSettingsClick}
          aria-label="Feedback settings"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path
              d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8.5 4a1 1 0 0 0 .01-.2 1 1 0 0 0-.01-.2l2.02-1.58a.6.6 0 0 0 .14-.78l-1.92-3.32a.6.6 0 0 0-.74-.27l-2.38.96a7.2 7.2 0 0 0-1.7-.98l-.36-2.53A.6.6 0 0 0 13.5 2h-3a.6.6 0 0 0-.59.5l-.36 2.53a7.2 7.2 0 0 0-1.7.98l-2.38-.96a.6.6 0 0 0-.74.27L1.81 8.3a.6.6 0 0 0 .14.78l2.02 1.58a1 1 0 0 0-.01.2c0 .07 0 .14.01.2L1.95 12.64a.6.6 0 0 0-.14.78l1.92 3.32c.15.26.46.36.74.27l2.38-.96c.53.4 1.1.72 1.7.98l.36 2.53c.05.29.3.5.59.5h3c.29 0 .54-.21.59-.5l.36-2.53c.6-.26 1.17-.58 1.7-.98l2.38.96c.28.09.59-.01.74-.27l1.92-3.32a.6.6 0 0 0-.14-.78L20.5 12Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
