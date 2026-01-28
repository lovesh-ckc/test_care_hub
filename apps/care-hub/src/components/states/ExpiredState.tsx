import Link from "next/link";

type ExpiredStateProps = {
  title?: string;
  description?: string;
};

export function ExpiredState({
  title = "This link is no longer active",
  description = "The invite has been used or expired. Please request a new link from your care team.",
}: ExpiredStateProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f4f2ee_60%,_#e0d8cc_100%)] px-6 py-16">
      <section className="mx-auto flex w-full max-w-xl flex-col gap-4 rounded-[24px] bg-white px-6 py-8 shadow-[0_24px_60px_rgba(15,10,5,0.14)]">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Care App Patient
        </p>
        <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
        <p className="text-sm leading-6 text-zinc-600">{description}</p>
        <Link
          className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white"
          href="/"
        >
          Go back home
        </Link>
      </section>
    </main>
  );
}
