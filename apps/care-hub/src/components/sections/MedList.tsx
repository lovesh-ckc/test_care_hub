import type { MedListSection } from "@care-hub/lib/types";

type MedListProps = {
  section: MedListSection;
};

export function MedList({ section }: MedListProps) {
  const { title, meds } = section.props;

  return (
    <section className="rounded-[var(--radius)] border border-black/5 bg-[color:var(--surface)] p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-[color:var(--ink)] font-[family:var(--font-display)]">
          {title}
        </h2>
        <span className="rounded-full bg-[color:var(--brand)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand)]">
          Active
        </span>
      </div>
      <div className="mt-4 grid gap-3">
        {meds.map((med) => (
          <div
            key={`${med.name}-${med.time}`}
            className="flex flex-wrap items-center justify-between gap-3 rounded-[calc(var(--radius)_-_6px)] border border-black/5 bg-[color:var(--surface-muted)] px-4 py-3"
          >
            <div>
              <p className="text-base font-semibold text-[color:var(--ink)]">
                {med.name}
              </p>
              <p className="text-sm text-[color:var(--muted-ink)]">
                {med.dosage}
              </p>
            </div>
            <span className="rounded-full border border-[color:var(--brand)]/20 px-3 py-1 text-xs font-semibold text-[color:var(--brand)]">
              {med.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
