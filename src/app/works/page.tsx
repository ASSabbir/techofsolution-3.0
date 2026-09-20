import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import WorksGrid from "@/components/WorksGrid";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import AnimatedGridBackground from "@/components/Animatedgridbackground";
import Image from "next/image";

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

      <section className="relative">
        <AnimatedGridBackground></AnimatedGridBackground>
        <div className="content-shell pb-20 pt-20 sm:pb-24 md:pb-32">

          <WorksGrid />
        </div>
      </section>

      <section className="section-light">
        <div className="content-shell py-16 sm:py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">Common questions</h2>
              <p className="mt-4 max-w-sm text-base text-muted">
                Can&apos;t find your answer here?{" "}
                <Link href="/contact" className="underline underline-offset-4 transition-colors hover:text-accent">
                  Talk to us
                </Link>{" "}
                and we&apos;ll get back to you within a day.
              </p>
            </div>
            <div>
              <FaqAccordion items={faqs} />
            </div>
          </div>
        </div>
      </section>
      <section className="content-shell border-t border-line py-20 md:py-28">
              <Reveal className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
                <div>
      
                  <p className="text-xl text-accent mb-4"> Giving Back</p>
      
                  <h2 className="font-dm-sans text-3xl md:text-6xl font-semibold leading-tight mb-6">
                    Before the defense, we showed up.
                  </h2>
      
                  <span className="inline-block rounded-full border bg-accent border-line-strong px-4 py-1.5 text-sm font-black text-accent-ink mb-6">
                    Daffodil International University — 64th Batch, CSE
                  </span>
      
                  <p className="text-fg-dim leading-relaxed mb-8 text-lg max-w-xl">
                    Final-year defense pressure is real — we&rsquo;ve been there too. So
                    our team sat down with the 64th batch CSE students before their big
                    day: what a defense panel actually looks for, how to structure a
                    research paper, and where most projects fall short. Our door stays
                    open for anyone who needs a review, guidance, or just someone to
                    talk it through with.
                  </p>
      
                  <a
                    href="https://www.facebook.com/reel/1606791157128452"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-fg hover:border-accent hover:text-accent transition-colors"
                  >
                    ▶ Watch the Session
                  </a>
                </div>
      
                <div className="relative rounded-lg overflow-hidden border border-line aspect-video">
                  <Image
                    src="/Img/25.jpg"
                    alt="Masterclass on Final Year Project Mastery — Tech Of Solutions"
                    fill
                    className="object-cover"
                  // sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <span className="absolute top-2 left-2 bg-surface/95 text-fg text-xs font-medium uppercase tracking-wide px-3 py-1.5 rounded-full border border-line">
                    64th Batch, CSE
                  </span>
                </div>
              </Reveal>
            </section>

      <section className="relative bg-zinc-950">

        <div className="content-shell py-16  sm:py-20 md:py-28">

          <div>

            <div className="rounded-3xl border glass-card border-line-strong  px-6 py-14 text-center sm:px-12 md:py-20">
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
          </div>
        </div></section>
    </>
  );
}