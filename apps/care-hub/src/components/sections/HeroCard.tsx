import type { HeroSection } from "@care-hub/lib/types";

type HeroCardProps = {
  section: HeroSection;
};

export function HeroCard({ section }: HeroCardProps) {
  const { title, subtitle, badge, patientName, careWindow } = section.props;

  return (
    <section className="rounded-[var(--radius)] border border-black/5 bg-[color:var(--surface)] p-6 shadow-[0_18px_40px_rgba(15,10,5,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="rounded-full border border-[color:var(--brand)]/30 px-3 py-1 text-xs uppercase tracking-[0.22em] text-[color:var(--muted-ink)]">
          {badge}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">
          {careWindow}
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--ink)] md:text-4xl font-[family:var(--font-display)]">
          {title}
        </h1>
        <p className="text-base leading-7 text-[color:var(--muted-ink)] md:text-lg">
          {subtitle}
        </p>
        <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--muted-ink)]">
          Patient: <span className="font-semibold text-[color:var(--ink)]">{patientName}</span>
        </p>
      </div>
    </section>
  );
}
