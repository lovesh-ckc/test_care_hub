"use client";

import Image from "next/image";

type TopbarProps = {
  userName: string;
  userHandle: string;
  profileImage?: string;
};

export function Topbar({ userName, userHandle, profileImage }: TopbarProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-[18px] bg-white/70 p-4 shadow-[0_10px_20px_rgba(15,10,5,0.06)] backdrop-blur">
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-[0.24em] text-[#a0a0a0]">Patient</span>
        <h1 className="text-xl font-semibold text-[#1a1a1a] sm:text-2xl">{userName}</h1>
        <p className="text-sm text-[#777]">{userHandle}</p>
      </div>
      <div className="h-12 w-12 overflow-hidden rounded-full bg-[#f5f1ea]">
        {profileImage ? (
          <Image src={profileImage} alt={userName} width={48} height={48} className="h-full w-full object-cover" />
        ) : null}
      </div>
    </div>
  );
}
