"use client";

type Vital = {
  label: string;
  value: string;
  trend: string;
  accent: string;
};

const vitals: Vital[] = [
  { label: "Heart rate", value: "78 bpm", trend: "Stable", accent: "#f97316" },
  { label: "Blood oxygen", value: "98%", trend: "Good", accent: "#38bdf8" },
  { label: "Steps", value: "6,420", trend: "Daily", accent: "#22c55e" },
];

export function Vitals() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {vitals.map((vital) => (
        <div
          key={vital.label}
          className={`rounded-[18px] bg-white p-4 shadow-[0_10px_20px_rgba(15,10,5,0.06)] [--accent:${vital.accent}]`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm uppercase tracking-[0.2em] text-[#777]">
              {vital.label}
            </span>
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold text-[var(--accent)] bg-[color-mix(in_srgb,var(--accent),transparent_85%)]"
            >
              {vital.trend}
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold text-[#1a1a1a]">{vital.value}</p>
        </div>
      ))}
    </div>
  );
}
