import type { StepListSection } from "@care-hub/lib/types";

type StepListProps = {
  section: StepListSection;
};

export function StepList({ section }: StepListProps) {
  const { title, steps } = section.props;

  return (
    <section className="rounded-[var(--radius)] border border-black/5 bg-[color:var(--surface)] p-6">
      <h2 className="text-xl font-semibold text-[color:var(--ink)] font-[family:var(--font-display)]">
        {title}
      </h2>
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex gap-4 rounded-[calc(var(--radius)_-_6px)] border border-[color:var(--brand)]/10 bg-[color:var(--surface-muted)] p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--brand)] text-sm font-semibold text-[color:var(--brand-contrast)]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <p className="text-base font-semibold text-[color:var(--ink)]">
                {step.title}
              </p>
              <p className="text-sm leading-6 text-[color:var(--muted-ink)]">
                {step.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
