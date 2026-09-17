import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustedByMarquee from "@/components/TrustedByMarquee";
import ServicesShowcase from "@/components/ServicesShowcase";
import FeaturedWork from "@/components/FeaturedWork";
import BigMarquee from "@/components/BigMarquee";
import TeamGrid from "@/components/TeamGrid";
import Testimonials from "@/components/Testimonials";
import StatsBand from "@/components/StatsBand";

import { site } from "@/lib/data/site";
import ScrollRevealHeading from "@/components/ScrollRevealHeading";

export const metadata: Metadata = {
  title: `${site.name} — Web, Software, AI/ML & Research Engineering Studio`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <TrustedByMarquee /> */}
      <ScrollRevealHeading
        text="Tech Of Solution, web-first digital agency building modern, fast, and scalable digital platforms. We develop MERN-based applications and high-impact animated portfolios. Business websites, LMS systems, and e-commerce solutions crafted for performance, usability, and strong SEO."
        highlightWords={['web-first']}
        className="px-5 md:px-[6vw] py-30 section-light"
        textClassName="text-4xl md:text-6xl   content-shell font-medium leading-[1.15]"
        baseColor="#c1c1c9"    // zinc-400 — dim starting state on light bg
        revealColor="#18181b"
      />
      <ServicesShowcase />
      <FeaturedWork />
      <BigMarquee label="Engineered with intent" />
      <TeamGrid />
      <Testimonials />
      <StatsBand />
    </>
  );
}