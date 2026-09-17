import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="content-shell flex min-h-[70vh] flex-col items-start justify-center pt-32">
      <p className="text-sm text-accent mb-5">404</p>
      <h1 className="max-w-xl font-display text-5xl font-semibold sm:text-6xl">
        This page took off without us.
      </h1>
      <p className="mt-5 max-w-md text-fg-dim">
        The page you&rsquo;re looking for doesn&rsquo;t exist, or has moved somewhere else.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink"
      >
        Back to home <ArrowUpRight size={16} />
      </Link>
    </section>
  );
}
