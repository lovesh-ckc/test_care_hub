import Link from "next/link";
// import { responsiveContainer } from "@care-hub/components/layout/layoutPresets";

export default function Home() {
  return (
    <main
      className={`h-screen bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f4f2ee_45%,_#e7e1d7_100%)] py-16 text-[color:var(--ink)]`}
    >
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-[28px] bg-[color:var(--surface-muted)] px-6 py-10 shadow-[0_20px_60px_rgba(15,10,5,0.12)] sm:px-8 md:px-12">
        <div className="flex flex-col gap-3">
          <span className="w-fit rounded-full border border-[color:var(--brand)]/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[color:var(--muted-ink)]">
            Care App Patient
          </span>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Personalized care plans, built from configuration.
          </h1>
          <p className="text-base leading-7 text-[color:var(--muted-ink)] md:text-lg">
            This entry page is just a launcher. Patient links are issued by the
            control center and render the UI dynamically.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold text-[color:var(--brand-contrast)] transition hover:brightness-110"
              href="/v/demo-token"
            >
              Demo Patient 1
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--brand)]/40 px-6 py-3 text-sm font-semibold text-[color:var(--brand)] transition hover:bg-[color:var(--brand)]/10"
              href="/v/demo-token-2"
            >
              Demo Patient 2
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--brand)]/40 px-6 py-3 text-sm font-semibold text-[color:var(--brand)] transition hover:bg-[color:var(--brand)]/10"
              href="/v/demo-token-3"
            >
              Demo Patient 3
            </Link>
          </div>
          <div className="rounded-full border border-[color:var(--ink)]/10 px-6 py-3 text-sm text-[color:var(--muted-ink)]">
            Replace with real invite URLs later.
          </div>
        </div>
      </section>
    </main>
  );
}
