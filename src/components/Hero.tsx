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
  { word: "Website", image: "/Img/service/web2.jfif" },
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

  return (
    <section
      ref={scopeRef}
      className="relative flex min-h-dvh items-center overflow-hidden bg-[#E4E2DD] text-zinc-900"
    >
      {/* Full-height, 40%-width image panel — this IS the right side of the
          hero now, not a card floating inside it. Desktop only; mobile gets
          a smaller floating-card version further down. */}
      <div
        data-hero-in
        className="absolute bottom-10 right-10 rounded-3xl overflow-hidden  hidden w-[30%] border-2 border-zinc-600 aspect-video lg:block "
      >
        <HeroVisualSlider
          slides={heroSlides}
          bus={bus}
          reduced={reduced}
          duration={ROTATOR_TIMING.duration}
          ease={ROTATOR_TIMING.ease}
          className="h-full rounded-2xl w-full"
        />
      </div>

      {/* Soft glow at the seam between text and the panel — low opacity,
          sits just left of the panel's edge, not on top of the image itself */}
      {/* Blend seam — fades the left panel's background color into the image,
    so the hard edge disappears instead of ending abruptly */}
      {/* <div
  aria-hidden="true"
  className="pointer-events-none !absolute inset-y-0 left-[50%] w-[5%] z-[6] hidden lg:block"
  style={{
    background:
      "linear-gradient(to right, rgb(228 228 231) 0%, rgb(228 228 231 / 0.55) 45%, rgb(228 228 231 / 0) 100%)",
  }}
/> */}

      {/* Content */}
      <div className="  z-10 w-full pb-28 px-20  md:pb-62">
        <div className="lg:max-w-[100%]">
          <h1 className="text-[13vw] leading-36 font-black font-fringe text-balance text-zinc-900 sm:text-6xl md:text-7xl lg:text-[10rem]">
            <span data-hero-in className="block le">

              We design and <br />build{" "}
              <WordRotator
                words={words}
                bus={bus}
                duration={ROTATOR_TIMING.duration}
                ease={ROTATOR_TIMING.ease}
              />
            </span>
            <span data-hero-in className="block">
              that help companies grow.
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
              className="mx-auto aspect-[4/3] max-w-sm sm:aspect-[16/9]"
              
            />
          </div>

          <div className="absolute bottom-10">
            <p data-hero-in className="mt-8  max-w-3xl text-2xl font-semibold text-zinc-600">
              From high-performance websites and custom software to AI-powered
              systems and digital products, we engineer technology that turns
              ideas into meaningful experiences, smarter operations, and
              lasting business value.
            </p>
            <div className="flex mt-15 items-center gap-4">
              <div className="flex -space-x-2">
                {badges.map((src, i) => (
                  <span
                    key={i}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-400 bg-white overflow-hidden"
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
                <span className="whitespace-nowrap text-xl font-medium text-aqua">
                  {projectsStat.value}
                  {projectsStat.suffix} Projects Delivered
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