import type { InfoGridSection } from "@care-hub/lib/types";

type InfoGridProps = {
  section: InfoGridSection;
};

export function InfoGrid({ section }: InfoGridProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      {section.props.items.map((item) => (
        <div
          key={item.label}
          className="rounded-[var(--radius)] border border-black/5 bg-[color:var(--surface)] p-5"
        >
          <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--muted-ink)]">
            {item.label}
          </p>
          <p className="mt-2 text-lg font-semibold text-[color:var(--ink)]">
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
}
