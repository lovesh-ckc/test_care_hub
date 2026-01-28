import type { NoteSection } from "@care-hub/lib/types";

type NoteCardProps = {
  section: NoteSection;
};

export function NoteCard({ section }: NoteCardProps) {
  const { title, text } = section.props;

  return (
    <section className="rounded-[var(--radius)] border border-dashed border-[color:var(--brand)]/40 bg-[color:var(--surface)] p-5">
      <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--brand)]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[color:var(--muted-ink)]">
        {text}
      </p>
    </section>
  );
}
