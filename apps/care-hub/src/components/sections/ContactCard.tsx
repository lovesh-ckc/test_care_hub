import type { ContactSection } from "@care-hub/lib/types";

type ContactCardProps = {
  section: ContactSection;
};

export function ContactCard({ section }: ContactCardProps) {
  const { title, supportLabel, supportNumber, note } = section.props;

  return (
    <section className="rounded-(--radius) border border-black/5 bg-(--surface) p-6">
      <h2 className="text-xl font-semibold text-(--ink)">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-2 rounded-calc(var(--radius)_-_6px) bg-(--brand) px-5 py-4 text-(--brand-contrast)">
        <span className="text-xs uppercase tracking-[0.24em] text-(--brand-contrast)/80">
          {supportLabel}
        </span>
        <span className="text-2xl font-semibold">{supportNumber}</span>
      </div>
      <p className="mt-3 text-sm text-(--muted-ink)">{note}</p>
    </section>
  );
}
