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

export default function WorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Next-level services that make an impact."
        description="From animated portfolios to production ML systems — a look at what we've shipped."
      />

      <section className="content-shell pb-24 md:pb-32">
        <WorksGrid />
      </section>

      <section className="section-light">
        <div className="content-shell py-20 md:py-28">
          <Reveal className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Common questions</h2>
          </Reveal>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="content-shell border-t border-line py-20 text-center md:py-28">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Want results like these?</h2>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink"
          >
            Start a project <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
