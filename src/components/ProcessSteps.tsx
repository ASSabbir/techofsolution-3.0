"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSteps({ steps }: { steps: { title: string; detail: string }[] }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const fill = fillRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (fill) {
        gsap.set(fill, { scaleX: 0 });
        gsap.to(fill, {
          scaleX: 1,
          duration: 1.3,
          ease: "power2.inOut",
          scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none reverse" },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none reverse" },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [steps]);

  return (
    <div ref={sectionRef} className="relative">
      {/* connecting line — desktop only, fills in on scroll */}
      <div className="absolute left-0 top-5  hidden h-px w-full bg-line-strong sm:block" aria-hidden="true">
        <div ref={fillRef} className="h-full origin-left bg-accent" />
      </div>

      <div className="grid gap-8 sm:grid-cols-4  sm:gap-6">
        {steps.map((step, i) => (
          <div key={step.title} data-step className="group flex items-start gap-4 sm:block">
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong bg-ink font-display text-xl transition-all duration-300 group-hover:border-accent group-hover:text-accent group-hover:shadow-[0_0_0_6px_rgba(200,155,74,0.12)]">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="sm:mt-5">
              <h3 className="font-display text-2xl mt-7 font-semibold transition-colors duration-300 group-hover:text-accent">
                {step.title}
              </h3>
              <p className="mt-4 text-fg-dim">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}