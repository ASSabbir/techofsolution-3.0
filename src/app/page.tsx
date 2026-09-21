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
import AnimatedGridBackground from "@/components/Animatedgridbackground";
import ScrollExpandVideo from "@/components/Scrollexpandvideo";
import BigClientsMarquee from "@/components/Bigclientsmarquee";


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
      <BigClientsMarquee direction="right" speed={50} />
      <ScrollRevealHeading
        text="TechOf Solution, a technology company delivering modern, scalable solutions across web, software, automation, data, and research. We build high-performance digital platforms, intelligent business systems, and research-driven solutions engineered for efficiency, usability, and growth."
        highlightWords={['web, software, automation, data, and research']}
        className="px-5 md:px-[6vw] py-10 md:py-20 xl:py-30 bg-zinc-950 "
        textClassName="text-4xl  2xl:text-6xl py-  text-wrap font-medium leading-[1.25]"
        baseColor="#18181b"    // zinc-400 — dim starting state on light bg
        revealColor="#fff"
      />
      
      
      <ServicesShowcase />
      <ScrollExpandVideo
        src="/Img/0912.mp4"
        poster="/Img/img3.png"
      />
      <BigMarquee label="An Experienced, Specialized & Innovative Team." />
      {/* <FeaturedWork /> */}


      <TeamGrid />
      <StatsBand />
      <Testimonials />


      
      {/* <section className="relative overflow-hidden bg-black h-screen">
        <AnimatedGridBackground></AnimatedGridBackground>
      </section> */}

    </>
  );
}