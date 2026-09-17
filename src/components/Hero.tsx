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

const words = ["Website", "Software", "AI / ML", "Research"];

// Same order as `words` above — index i's image shows while word i is active.
// Swap these paths for the real exports; anything dropped in at these exact
// paths just works, nothing else in the component needs to change.
const heroSlides: HeroSlide[] = [
  { word: "Website", image: "/Img/service/web.png" },
  { word: "Software", image: "/Img/service/sof.png" },
  { word: "AI / ML", image: "/Img/service/ai.png" },
  { word: "Research", image: "/Img/service/re.png" },
];

// ── Timing — change these, nothing else ──────────────────────────────
const HERO_TIMING = {
  delay: 0.15,
  duration: 0.9,
  stagger: 0.12,
  ease: "power3.out",
  distance: 26,
};

// The word/image rotation timing — shared by WordRotator AND
// HeroVisualSlider via the bus, so this is the one place that controls both.
const ROTATOR_TIMING = {
  hold: 2.4, // seconds each word/image stays before transitioning
  duration: 0.85, // seconds the transition itself takes
  ease: "power3.inOut",
};
// ─────────────────────────────────────────────────────────────────────

// Decorative placeholder badges for the bottom bar — generic icons, not
// impersonating any real award or certification body.
const badges = [ShieldCheck, Award, Sparkles];

export default function Hero() {
  const scopeRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
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
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-hero-in]");
      gsap.set(targets, { y: HERO_TIMING.distance, opacity: 0 });
      gsap.timeline({ delay: HERO_TIMING.delay }).to(targets, {
        y: 0,
        opacity: 1,
        duration: HERO_TIMING.duration,
        ease: HERO_TIMING.ease,
        stagger: HERO_TIMING.stagger,
      });
    }, scopeRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduced) video.pause();
    else video.play().catch(() => {});
  }, [reduced]);

  return (
    <section ref={scopeRef} className="relative bg-zinc-200 text-zinc-700 flex min-h-dvh items-center overflow-hidden">
      {/* Video background */}
      {/* <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/Img/0912.mp4" type="video/mp4" />
      </video> */}

      {/* Dark overlay — keeps the text readable and the footage on-brand */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/75 to-gray-300/10" />
      <div className="absolute inset-0 bg-ink/45" /> */}

      {/* Soft white glow bridging left content and right visual — deliberately
          low opacity; this is a light source, not a white panel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-[10%] left-[42%] right-0 z-[5] hidden lg:block"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 60% 50%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 45%, transparent 75%)",
        }}
      />

      {/* Content */}
      <div className=" px-24 relative z-10 w-full pb-28 pt-40 md:pb-32">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[7fr,3fr] lg:items-center lg:gap-12 xl:gap-16">
          {/* Headline block — top-left on desktop */}
          <div className="lg:col-start-1 lg:row-start-1">
            <h1 className="text-[13vw] font-semibold tracking-tight text-balance text-zinc-900 sm:text-6xl md:text-7xl lg:text-[6.5rem]">
              <span data-hero-in className="block ">
                Building <WordRotator words={words} bus={bus} duration={ROTATOR_TIMING.duration} ease={ROTATOR_TIMING.ease} />
              </span>
              <span data-hero-in className="block">
                That move the world
              </span>
            </h1>
          </div>

          {/* Visual slider — right column on desktop, spans both rows so it
              sits centered alongside the headline + copy together; a smaller
              inline block on mobile, appearing between headline and copy. */}
          <div
            data-hero-in
            className="order-first lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center"
          >
            <HeroVisualSlider
              slides={heroSlides}
              bus={bus}
              reduced={reduced}
              duration={ROTATOR_TIMING.duration}
              ease={ROTATOR_TIMING.ease}
              className="mx-auto aspect-[4/3]  h-full sm:aspect-[16/9] lg:aspect-[2/3] "
            />
          </div>

          {/* Description + CTAs — bottom-left on desktop */}
          <div className="lg:col-start-1 lg:row-start-2">
            <p data-hero-in className="max-w-xl text-lg ">
              From high-performance websites and custom software to AI-powered
              systems and digital products, we engineer technology that turns
              ideas into meaningful experiences, smarter operations, and
              lasting business value.
            </p>

            <div data-hero-in className="mt-8 flex flex-wrap items-center gap-3">
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
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium text-fg backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
                >
                  See our work
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom trust bar */}
      <div data-hero-in className="absolute inset-x-0 bottom-0 z-10 border-t border-zinc-400/60">
        <div className="content-shell flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl ">
            {`TechOf Solution is a technology partner trusted by teams across seven countries.`}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {badges.map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-400-strong bg-surface text-accent"
                >
                  <Icon size={16} />
                </span>
              ))}
            </div>
            {projectsStat && (
              <span className="text-sm font-medium  whitespace-nowrap">
                {projectsStat.value}
                {projectsStat.suffix} Projects Delivered
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}