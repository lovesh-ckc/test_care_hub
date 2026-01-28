import type { ReactNode } from "react";
import { ThemeConfig } from "@care-hub/lib/types";
import { getThemeClass } from "@care-hub/lib/themeClass";
// import { responsiveContainer } from "@care-hub/components/layout/layoutPresets";

type TabletFrameProps = {
  theme: ThemeConfig;
  variant?: "frame" | "flat";
  children: ReactNode;
};

export function TabletFrame({
  theme,
  variant = "frame",
  children,
}: TabletFrameProps) {
  const themeClass = getThemeClass(theme);

  if (variant === "flat") {
    return (
      <div
        className={`min-h-screen bg-[color:var(--surface-muted)] text-[color:var(--ink)] ${themeClass}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-[radial-gradient(circle_at_top,_var(--surface-muted)_0%,_var(--surface)_55%,_#d9d1c4_100%)] text-[color:var(--ink)] py-8 sm:py-10 lg:py-12 ${themeClass}`}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-[calc(var(--radius)_+_8px)] bg-[color:var(--surface-muted)] px-5 py-8 shadow-[0_30px_70px_rgba(18,14,8,0.18)] sm:px-8 md:px-12">
        {children}
      </div>
    </div>
  );
}
