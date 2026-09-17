"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data/team";
import Reveal from "@/components/Reveal";

const AUTOPLAY_MS = 3000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoveringRef = useRef(false);

  const goTo = useCallback((next: number) => {
    setIndex((prev) => {
      const el = contentRef.current;
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
      }
      const total = testimonials.length;
      return typeof next === "number" ? ((next % total) + total) % total : prev;
    });
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!hoveringRef.current) {
        setIndex((prev) => {
          const nextIndex = (prev + 1) % testimonials.length;
          const el = contentRef.current;
          if (el) {
            gsap.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
          }
          return nextIndex;
        });
      }
    }, AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const manualGo = (dir: 1 | -1) => {
    goTo(index + dir);
    startTimer();
  };

  const current = testimonials[index];

  return (
    <section className="content-shell py-24 md:py-32">
      <Reveal className="mb-12 flex items-end justify-between">
        <div>
          <p className="text-xl text-accent mb-4">Client feedback</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-dm-sans font-semibold">What clients say</h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => manualGo(-1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => manualGo(1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </Reveal>

      <div
        className="relative overflow-hidden rounded-lg border border-line bg-surface p-8 md:p-14"
        onMouseEnter={() => (hoveringRef.current = true)}
        onMouseLeave={() => (hoveringRef.current = false)}
      >
        <Quote className="text-accent" size={32} />

        <div ref={contentRef}>
          <p className="mt-6 max-w-3xl text-2xl leading-snug text-fg sm:text-3xl md:text-4xl text-balance">
            &ldquo;{current.quote}&rdquo;
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-surface-2">
              <Image src={current.image} alt={current.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-semibold">{current.name}</p>
              <p className="text-sm text-muted">{current.role}</p>
            </div>
          </div>
        </div>

        {/* progress dots */}
        <div className="mt-8 flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => {
                goTo(i);
                startTimer();
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-accent" : "w-1.5 bg-line-strong"
              }`}
            />
          ))}
        </div>

        <div className="mt-6 flex gap-2 sm:hidden">
          <button onClick={() => manualGo(-1)} aria-label="Previous testimonial" className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => manualGo(1)} aria-label="Next testimonial" className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
