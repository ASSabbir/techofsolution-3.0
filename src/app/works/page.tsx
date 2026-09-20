import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import WorksGrid from "@/components/WorksGrid";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Work — Websites, Software, AI/ML & Research Projects",
  description:
    "Explore TechOf Solution's portfolio: business websites, e-commerce platforms, custom software, LMS systems, and AI/ML research projects delivered for clients worldwide.",
  alternates: { canonical: "/works" },
};

const faqs = [
  { q: "What services do you offer?", a: "Web design and development, custom software, AI/ML systems, and applied research engineering — see our Services page for full detail." },
  { q: "How long does a project take?", a: "A focused website takes 2–4 weeks. More complex software, AI or multi-role platforms typically run 6–10 weeks depending on scope." },
  { q: "What is your pricing?", a: "Pricing depends on scope and complexity. Reach out for a free consultation and a quote tailored to your project." },
  { q: "Do you provide support after launch?", a: "Yes — every engagement includes an option for ongoing maintenance, updates and support after go-live." },
];

// Helps Google show these Q&As directly in search results.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function WorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="section-light">
        <PageHeader
          eyebrow="Selected work"
          title="Next-level services that make an impact."
          description="From animated portfolios to production ML systems — a look at what we've shipped."
        />
      </div>

      <section className="content-shell pb-20 pt-20 sm:pb-24 md:pb-32">
        <WorksGrid />
      </section>

      <section className="section-light">
        <div className="content-shell py-16 sm:py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">Common questions</h2>
              <p className="mt-4 max-w-sm text-base text-muted">
                Can&apos;t find your answer here?{" "}
                <Link href="/contact" className="underline underline-offset-4 transition-colors hover:text-accent">
                  Talk to us
                </Link>{" "}
                and we&apos;ll get back to you within a day.
              </p>
            </Reveal>
            <Reveal>
              <FaqAccordion items={faqs} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="content-shell py-16 sm:py-20 md:py-28">
        <Reveal>
          <div className="rounded-3xl border border-line-strong bg-surface px-6 py-14 text-center sm:px-12 md:py-20">
            <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
              Want results like these?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-muted">
              Tell us what you&apos;re building and we&apos;ll come back with a plan and a quote.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-ink transition-transform duration-300 hover:scale-[1.03] active:scale-95 sm:w-auto"
              >
                Start a project
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center rounded-full border border-line-strong px-7 py-3.5 text-sm font-semibold text-fg transition-colors duration-300 hover:border-accent hover:text-accent sm:w-auto"
              >
                See our services
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}