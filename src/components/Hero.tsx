"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowUpRight, ShieldCheck, Award, Sparkles } from "lucide-react";
import WordRotator from "@/components/WordRotator";
import HeroVisualSlider, { type HeroSlide } from "@/components/HeroVisualSlider";
import MagneticButton from "@/components/MagneticButton";
import useReducedMotion from "@/lib/useReducedMotion";
import { useRotatorBus } from "@/lib/useRotatorBus";
import { stats } from "@/lib/data/site";
import Image from "next/image";

const words = ["Website", "Software", "Automation", "Research"];

// Same order as `words` above — index i's image shows while word i is active.
const heroSlides: HeroSlide[] = [
  { word: "Website", image: "/Img/service/web2.webp" },
  { word: "Software", image: "/Img/service/sof2.webp" },
  { word: "AI / ML", image: "/Img/service/ai1.jpg" },
  { word: "Research", image: "/Img/service/re1.webp" },
];

// ── Timing — change these, nothing else ──────────────────────────────
const HERO_TIMING = {
  delay: 0.15,
  duration: 0.9,
  stagger: 0.12,
  ease: "power3.out",
  distance: 26,
};

const ROTATOR_TIMING = {
  hold: 2.4,
  duration: 0.85,
  ease: "power3.inOut",
};
// ─────────────────────────────────────────────────────────────────────

const badges = [
  "/Img/m.png",
  "/Img/s.jpeg",
  "/Img/c.jpeg"

];

export default function Hero() {
  const scopeRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const projectsStat = stats.find((s) => s.label === "Projects delivered");

  const bus = useRotatorBus(words.length, { hold: ROTATOR_TIMING.hold }, reduced);

  if (process.env.NODE_ENV !== "production" && words.length !== heroSlides.length) {
    // eslint-disable-next-line no-console
    console.warn(
      `Hero: words (${words.length}) and heroSlides (${heroSlides.length}) must be the same length — they're paired by index.`
    );
  }

  useEffect(() => {
  // If the preloader is running, hold the intro until it says "reveal"
  const waiting = document.documentElement.dataset.preloader === "running";
  let tl: gsap.core.Timeline | undefined;
  const play = () => tl?.play();

  const ctx = gsap.context(() => {
    const targets = gsap.utils.toArray<HTMLElement>("[data-hero-in]");
    gsap.set(targets, { y: HERO_TIMING.distance, opacity: 0 });
    tl = gsap.timeline({
      paused: waiting,
      delay: waiting ? 0 : HERO_TIMING.delay,
    });
    tl.to(targets, {
      y: 0,
      opacity: 1,
      duration: HERO_TIMING.duration,
      ease: HERO_TIMING.ease,
      stagger: HERO_TIMING.stagger,
    });
  }, scopeRef);

  if (waiting) window.addEventListener("preloader:reveal", play, { once: true });

  return () => {
    window.removeEventListener("preloader:reveal", play);
    ctx.revert();
  };
}, []);

  return (
    <section
      ref={scopeRef}
      className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-[#E4E2DD] pt-28 text-zinc-900 sm:pt-32 lg:pt-40"
    >
      {/*
        Full-height, ~30%-width image panel — this IS the right side of the
        hero now, not a card floating inside it. Desktop only; mobile gets
        a smaller floating-card version further down.

        Fixes vs. the original:
        - Fixed `right-10 bottom-10` (40px) offsets didn't scale with the
          effective viewport at browser zoom, so at 150–200% zoom the panel
          could sit too close to (or collide with) the text column. They're
          now fluid (`clamp`) so the gap shrinks gracefully instead of
          staying a fixed 40px on a much narrower effective viewport.
        - `w-[30%]` had no floor/ceiling, so on very wide screens it could
          get enormous, and on intermediate widths just below `lg` (via
          zoom) it could get uncomfortably small. `w-[clamp(...)]` keeps it
          within a sane range at every width.
      */}
      <div
        data-hero-in
        className="absolute z-0 hidden aspect-video w-[clamp(260px,30vw,520px)] overflow-hidden rounded-3xl border-2 border-zinc-600 lg:block"
        style={{
          right: "clamp(1rem, 2.5vw, 2.5rem)",
          bottom: "clamp(1rem, 2.5vw, 2.5rem)",
        }}
      >
        <HeroVisualSlider
          slides={heroSlides}
          bus={bus}
          reduced={reduced}
          duration={ROTATOR_TIMING.duration}
          ease={ROTATOR_TIMING.ease}
          className="h-full w-full rounded-2xl"
        />
      </div>

      {/* Content — a flex column that fills the section, so the bottom
          block below is pushed to the bottom with `lg:mt-auto` instead of
          being absolutely positioned. This is the main zoom fix: with
          absolute positioning, if the heading wrapped onto extra lines at
          an odd zoom level it could grow tall enough to run into the
          panel/paragraph below, since those were pinned to a fixed
          `bottom-10` regardless of how tall the heading became. In normal
          flow, the bottom block always renders after the heading, so it
          can never overlap it. */}
      <div className="relative z-10 flex  w-full flex-1 flex-col px-5 md:px-[6vw]">
        <div className="flex w-full flex-1 flex-col lg:max-w-[100%]">
          <h1
            className="max-w-full text-balance font-black font-fringe text-zinc-900"
            style={{
              // Fluid clamp in place of the stepped
              // text-6xl md:text-[6rem] lg:text-[7rem] xl:text-[10rem]
              // sizes. Endpoints match the old sizes at mobile (~3.5rem)
              // and xl (10rem), but now scale continuously with the
              // effective viewport width instead of jumping at
              // breakpoints — which is what makes it hold up at 125% /
              // 150% / 175% / 200% zoom and at widths between breakpoints.
              fontSize: "clamp(2rem, 0.5rem + 11.5vw, 8rem)",
              lineHeight: 0.95,
            }}
          >
            <span data-hero-in className="block">
              We design <br /> We build{" "}
              <WordRotator
                words={words}
                bus={bus}
                duration={ROTATOR_TIMING.duration}
                ease={ROTATOR_TIMING.ease}
              />
            </span>
            <span data-hero-in className="block">
              That moves the world
            </span>
          </h1>

          {/* Mobile/tablet-only floating card — the full-bleed panel above
              is hidden below lg, so this fills its place responsively. */}
          <div data-hero-in className="mt-8 lg:hidden">
            <HeroVisualSlider
              slides={heroSlides}
              bus={bus}
              reduced={reduced}
              duration={ROTATOR_TIMING.duration}
              ease={ROTATOR_TIMING.ease}
              className="aspect-[7/3] max-w-sm md:aspect-[10/5] lg:mx-auto lg:aspect-[16/9]"
            />
          </div>

          {/*
            Was `lg:absolute bottom-10` with no horizontal anchor. Now part
            of normal flow, pushed to the bottom of the flex column with
            `lg:mt-auto` so it visually sits at the bottom-left the same
            way it used to — but it can never overlap the heading or the
            image panel, because it's no longer taken out of flow.

            The width cap (`lg:max-w-[60%] xl:max-w-[55%]`) keeps this
            whole block — paragraph, badges and stat text — clear of the
            image panel's reserved right-hand space at every width and
            zoom level, instead of relying only on the paragraph's own
            max-width (which, at odd zoom levels, could extend far enough
            right to run under the image).
          */}
          <div className="mt-10 lg:mt-auto lg:max-w-[60%] xl:max-w-[55%]">
            <p
              data-hero-in
              className="max-w-prose text-xl font-semibold text-zinc-600 md:text-2xl"
            >
             Trusted across 7 countries with 100+ projects delivered, TechOf Solution builds scalable technology designed to perform today and evolve for tomorrow.
            </p>
            <div className="mt-15 flex flex-wrap items-center gap-4 lg:mt-15">
              <div className="flex -space-x-2">
                {badges.map((src, i) => (
                  <span
                    key={i}
                    className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-zinc-400 bg-white"
                  >
                    <Image
                      src={src}
                      alt={`Badge ${i + 1}`}
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  </span>
                ))}
              </div>

              {projectsStat && (
                <span className="text-xl font-medium text-aqua">
                  100+ Projects Delivered
                </span>
              )}
            </div>
          </div>

          {/* <div data-hero-in className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
              >
                Start a project <ArrowUpRight size={16} />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/works"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-400 px-6 py-3.5 text-sm font-medium text-zinc-900 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
              >
                See our work
              </Link>
            </MagneticButton>
          </div> */}
        </div>
      </div>

      {/* Bottom trust bar — solid backing so it stays legible sitting on
          top of the full-height image panel, not just a border with
          nothing behind it */}
      {/* <div
        data-hero-in
        className="absolute inset-x-0 bottom-0 z-10 border-t border-zinc-400/60 bg-zinc-200/10 backdrop-blur-sm"
      >
        <div className="content-shell flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl text-zinc-600">
            {`TechOf Solution is a technology partner trusted by teams across seven countries.`}
          </p>

          
        </div>
      </div> */}
    </section>
  );
}