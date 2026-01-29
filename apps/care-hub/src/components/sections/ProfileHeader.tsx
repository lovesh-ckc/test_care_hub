"use client";

import Image from "next/image";
import { useRef, useState } from "react";

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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const getMaxDrag = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const trackWidth = track.clientWidth;
    const knobSize = 36;
    return Math.max(trackWidth - knobSize - 2, 0);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    track.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const maxDrag = getMaxDrag();
    const nextX = clamp(event.clientX - rect.left - 18, 0, maxDrag);
    setDragX(nextX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    const maxDrag = getMaxDrag();
    const shouldLatch = dragX > maxDrag * 0.6;
    setDragX(shouldLatch ? maxDrag : 0);
    setIsDragging(false);
  };

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
        <div
          ref={trackRef}
          className="relative flex h-10 w-28 items-center rounded-3xl bg-[#F7E7E7]"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            className="absolute left-1 top-0.5 flex h-9 w-9 items-center justify-center rounded-full transition-transform"
            style={{ transform: `translateX(${dragX}px)` }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              fill="#AD3C3C"
              viewBox="0 0 60 60"
            >
              <rect
                width="60"
                height="60"
                fill=""
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
          className="h-10 w-10 rounded-full border border-[#FF8B00] flex items-center justify-center text-sandybrown"
          onClick={onBellClick}
          aria-label="Notifications"
        >
          <Image className="h-6 w-6" width={24} height={24} alt="" src={bellIconSrc} />
        </button>
      </div>
    </div>
  );
}
