"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import useReducedMotion from "@/lib/useReducedMotion";
import { heroAlbumSlides } from "@/lib/data/site";

// ── Timing — change these, nothing else ─────────────────────────────────
const ALBUM_TIMING = {
  autoplayMs: 4500,
  transitionDuration: 0.7,
  stagger: 0.08,
  distance: 16,
  ease: "power3.out",
};
// ─────────────────────────────────────────────────────────────────────

export default function HeroAlbum() {
  const [index, setIndex] = useState(0);
  const rowsRef = useRef<HTMLDivElement | null>(null);
  const hoveringRef = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      if (!hoveringRef.current) {
        setIndex((i) => (i + 1) % heroAlbumSlides.length);
      }
    }, ALBUM_TIMING.autoplayMs);
    return () => clearInterval(interval);
  }, [reduced]);

  useEffect(() => {
    const rows = rowsRef.current;
    if (!rows || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows.querySelectorAll("[data-tile]"),
        { opacity: 0, y: ALBUM_TIMING.distance },
        {
          opacity: 1,
          y: 0,
          duration: ALBUM_TIMING.transitionDuration,
          ease: ALBUM_TIMING.ease,
          stagger: ALBUM_TIMING.stagger,
        }
      );
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, reduced]);

  const slide = heroAlbumSlides[index];

  return (
    <div
      onMouseEnter={() => (hoveringRef.current = true)}
      onMouseLeave={() => (hoveringRef.current = false)}
    >
      <div ref={rowsRef} className="flex flex-col gap-6">
        {/* Row 1: photo, then its stat — an explicit flex row, always side by side */}
        <div className="flex items-center gap-5">
          <div data-tile className="flex-1">
            <Frame>
              <Image src={slide.topImage} alt="TechOf Solution team at work" fill className="object-cover" sizes="240px" />
            </Frame>
          </div>
          <div data-tile className="flex-1 text-center">
            <span className="block font-display text-4xl font-semibold sm:text-5xl">{slide.topStat.value}</span>
            <span className="mt-2 block text-xs uppercase tracking-wide text-muted">{slide.topStat.label}</span>
          </div>
        </div>

        {/* Row 2: stat first, then photo — mirrored so it doesn't feel mechanical */}
        <div className="flex items-center gap-5">
          <div data-tile className="flex-1 text-center">
            <span className="block font-display text-4xl font-semibold sm:text-5xl">{slide.bottomStat.value}</span>
            <span className="mt-2 block text-xs uppercase tracking-wide text-muted">{slide.bottomStat.label}</span>
          </div>
          <div data-tile className="flex-1">
            <Frame>
              <Image src={slide.bottomImage} alt="TechOf Solution project work" fill className="object-cover" sizes="240px" />
            </Frame>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {heroAlbumSlides.map((_, i) => (
          <button
            key={i}
            aria-label={`Show highlight ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-accent" : "w-1.5 bg-line-strong hover:bg-faint"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className=" border-2 border-white -xl ">
      <div className="relative aspect-[4/3] overflow-hidden ">{children}</div>
    </div>
  );
}