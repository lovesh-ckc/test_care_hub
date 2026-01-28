"use client";

import Image from "next/image";
import { useState } from "react";
import { Bottombar } from "@care-hub/components/UI/bottombar/Bottombar";

type DevicesGridScreenProps = {
  onNavClick?: (itemId: "home" | "documents" | "list" | "grid") => void;
  activeItem?: "home" | "documents" | "list" | "grid";
};

type DeviceItem = {
  id: string;
  name: string;
  description: string;
  image: string;
};

const devices: DeviceItem[] = [
  {
    id: "bpm-pro-2",
    name: "BPM Pro 2",
    description: "Clinically validated blood pressure monitor.",
    image: "/devices/image1.png",
  },
  {
    id: "beam-o",
    name: "Beam O",
    description: "The revolutionary health MultiScan.",
    image: "/devices/image2.png",
  },
  {
    id: "u-scan",
    name: "U-Scan Nutrio",
    description: "Master your body's response to nutrition.",
    image: "/devices/image3.png",
  },
  {
    id: "sleep-analyzer",
    name: "Sleep Analyzer",
    description: "Explore the depths of your sleep pattern.",
    image: "/devices/image4.png",
  },
  {
    id: "body-pro-2",
    name: "Body Pro 2",
    description: "The most advanced checkup for your body.",
    image: "/devices/image5.png",
  },
  {
    id: "nutrisense",
    name: "Nutrisense",
    description: "Glucose monitor",
    image: "/devices/image6.png",
  },
];

function DeviceCard({ device, onClick }: { device: DeviceItem; onClick?: () => void }) {
  return (
    <button
      type="button"
      className="flex flex-col rounded-xl bg-white p-4 text-left shadow-sm"
      onClick={onClick}
    >
      <div className="text-sm font-semibold text-gray-700">{device.name}</div>
      <div className="text-xs text-gray-500 font-ibm-plex-sans">{device.description}</div>
      <div className="relative mt-4 flex flex-1 items-center justify-center">
        <Image
          src={device.image}
          alt=""
          width={160}
          height={120}
          className="h-28 w-full object-contain"
        />
        <div className="pointer-events-none absolute inset-0 rounded-lg bg-white/40 backdrop-blur-sm" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="-rotate-12 rounded-full border border-gray-300 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gray-700">
            Available Soon
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-orange-400 text-orange-400">
          <span className="text-xs font-semibold">i</span>
        </div>
      </div>
    </button>
  );
}

function Overlay({ open, onClose, deviceName }: { open: boolean; onClose: () => void; deviceName: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 px-4 py-6">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close overlay" />
      <div className="relative w-full max-w-md rounded-2xl bg-white px-6 py-6 text-center shadow-xl">
        <div className="flex justify-end">
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-sandybrown text-sandybrown"
            onClick={onClose}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="text-lg font-semibold text-gray-700">Coming soon</div>
        <div className="mt-2 text-sm text-gray-500 font-ibm-plex-sans">{deviceName} is not available yet.</div>
      </div>
    </div>
  );
}

export function DevicesGridScreen({ onNavClick, activeItem = "grid" }: DevicesGridScreenProps) {
  const [activeDevice, setActiveDevice] = useState<DeviceItem | null>(null);

  return (
    <div className="min-h-screen text-left text-black font-haas-grot-disp-trial">
      <div className="mx-auto flex bg-black/5 h-screen w-full max-w-md flex-col px-4 pb-4 pt-4">
        <div className="text-xl font-semibold text-gray-700">Connected devices</div>
        <div className="mt-1 text-sm text-gray-500 font-ibm-plex-sans">
          Add and manage devices to keep track of your daily health readings.
        </div>

        <div className="mt-4 flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            {devices.map((device) => (
              <DeviceCard key={device.id} device={device} onClick={() => setActiveDevice(device)} />
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Bottombar activeItem={activeItem} onItemClick={onNavClick} />
        </div>
      </div>

      <Overlay
        open={Boolean(activeDevice)}
        onClose={() => setActiveDevice(null)}
        deviceName={activeDevice?.name ?? "Device"}
      />
    </div>
  );
}
