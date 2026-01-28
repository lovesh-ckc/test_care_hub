"use client";

import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  handle: string;
  avatarSrc: string;
  bellIconSrc: string;
  onBellClick?: () => void;
  onProfileClick?: () => void;
};

export function ProfileHeader({
  name,
  handle,
  avatarSrc,
  bellIconSrc,
  onBellClick,
  onProfileClick,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      {onProfileClick ? (
        <button
          type="button"
          className="flex items-center gap-3 text-left"
          onClick={onProfileClick}
          aria-label="Open profile"
        >
          <Image className="h-12 w-12 rounded-full object-cover" width={48} height={48} alt="" src={avatarSrc} />
          <div>
            <div className="text-base font-semibold">{name}</div>
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
        <div className="flex h-10 w-22 items-center rounded-num-100 bg-lavenderblush bg-red-300 rounded-3xl">
          <div className="flex h-9 w-9 items-center rounded-full">
             <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    fill="none"
    viewBox="0 0 60 60"
  >
    <rect
      width="60"
      height="60"
      fill="color(display-p3 0.9569 0.2627 0.2118)"
      rx="30"
    ></rect>
    <path
      fill="color(display-p3 0.9569 0.2627 0.2118)"
      d="M52.5 30c0 12.426-10.074 22.5-22.5 22.5S7.5 42.426 7.5 30 17.574 7.5 30 7.5 52.5 17.574 52.5 30"
    ></path>
    <path
      stroke="color(display-p3 0.9686 0.9059 0.9059)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M30 30V18.75m0 19.589v.099M52.5 30c0 12.426-10.074 22.5-22.5 22.5S7.5 42.426 7.5 30 17.574 7.5 30 7.5 52.5 17.574 52.5 30"
    ></path>
  </svg>

          </div>
        </div>
        <button
          type="button"
          className="h-10 w-10 rounded-full border border-sandybrown flex items-center justify-center text-sandybrown"
          onClick={onBellClick}
          aria-label="Notifications"
        >
          <Image className="h-6 w-6" width={24} height={24} alt="" src={bellIconSrc} />
        </button>
      </div>
    </div>
  );
}
