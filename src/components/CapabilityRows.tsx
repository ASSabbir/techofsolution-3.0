"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Capability = { title: string; detail: string; image: string; bullets: string[] };

type Props = {
  items: Capability[];
  eyebrow?: string;
  title?: string;
};

/**
 * Capabilities as a horizontal scroller.
 *
 * - Desktop (md+): the section pins to the screen and vertical scrolling drives
 *   the cards sideways (GSAP ScrollTrigger). Images get a slight parallax, and a
 *   progress bar + counter track where you are.
 * - Mobile: the original stacked cards, one after another (no horizontal scrolling).
 * - Desktop + prefers-reduced-motion: native horizontal scroll, no pinning.
 */
export default function CapabilityRows({
  items,
  eyebrow = "Why choose us",
  title = "Our capabilities",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  // -1 = intro panel (no card active yet) → HUD shows 00
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const mm = gsap.matchMedia();

    // ---------- Desktop + motion allowed: pinned horizontal scroll ----------
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const progress = progressRef.current;
      if (progress) gsap.set(progress, { scaleX: 0, transformOrigin: "0% 50%" });
      const setProgress = progress ? gsap.quickSetter(progress, "scaleX") : null;

      // How far the track has to travel. Function-based so it is re-measured on every refresh/resize.
      const getDistance = () => Math.max(0, track.scrollWidth - wrapper.clientWidth);

      const scrollTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        // `this` is the tween itself. (Referencing `scrollTween` here throws, because
        // GSAP fires onUpdate once during creation, before the const is assigned.)
        onUpdate: function (this: gsap.core.Tween) {
          setProgress?.(this.progress());
        },
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1, // 1s of smoothing = that buttery, weighted feel
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        // Counter follows whichever card is crossing the middle of the screen
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: scrollTween,
          start: "left center",
          end: "right center",
          onToggle: (self) => {
            if (self.isActive) setCurrent(i);
          },
          // Scrolling back past the first card returns to the intro state
          onLeaveBack: () => {
            if (i === 0) setCurrent(-1);
          },
        });

        // Image parallax: drifts slower than the card as it passes
        const parallax = card.querySelector("[data-parallax]");
        if (parallax) {
          gsap.fromTo(
            parallax,
            { xPercent: -7 },
            {
              xPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });

      // Fonts can change text metrics after first paint — re-measure once they're ready
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => setCurrent(-1);
    });

    // ---------- Desktop + reduced motion: native horizontal scroll ----------
    mm.add("(min-width: 768px) and (prefers-reduced-motion: reduce)", () => {
      wrapper.setAttribute("data-native", "true");
      return () => wrapper.removeAttribute("data-native");
    });

    return () => mm.revert();
  }, [items.length]);

  return (
    <div
      ref={wrapperRef}
      className="group/cap relative w-full min-w-0 max-w-full overflow-x-clip pb-16 md:h-screen md:overflow-hidden md:pb-0 md:data-[native=true]:h-auto md:data-[native=true]:overflow-visible md:data-[native=true]:pb-16"
    >
      {/* Mobile heading (desktop shows it as the first panel inside the track) */}
      <div className="px-5 pb-8 pt-16 sm:px-8 md:hidden">
        <p className="mb-3 text-lg text-accent">{eyebrow}</p>
        <h2 className="font-dm text-4xl font-semibold">{title}</h2>
      </div>

      {/* Track: simple vertical stack on mobile, GSAP-driven horizontal scroller on desktop */}
      <div
        ref={trackRef}
        className="flex w-full flex-col gap-10 px-5 sm:gap-12 sm:px-8 md:grid md:h-full md:w-max md:auto-cols-max md:grid-flow-col md:content-center md:items-stretch md:gap-[4vw] md:overflow-visible md:px-[6vw] md:will-change-transform md:group-data-[native=true]/cap:h-auto md:group-data-[native=true]/cap:w-full md:group-data-[native=true]/cap:snap-x md:group-data-[native=true]/cap:snap-mandatory md:group-data-[native=true]/cap:items-stretch md:group-data-[native=true]/cap:overflow-x-auto md:group-data-[native=true]/cap:py-10"
      >
        {/* Intro panel — desktop only. Fills the whole screen (100vw minus the track's
            left padding), so at first ONLY the heading is visible and the cards
            slide in from the right as you scroll. */}
        <div className="hidden shrink-0 md:flex md:w-[calc(100vw-6vw)] md:flex-col md:justify-center">
          <p className="mb-5 text-2xl text-accent">{eyebrow}</p>
          <h2 className="font-dm text-6xl font-semibold leading-[1.02] tracking-tight md:text-[clamp(4rem,9vw,7rem)]">
            {title}
          </h2>
          <div className="mt-12 flex items-center gap-3 text-base text-fg-dim">
            <span>Scroll to explore</span>
            <ArrowRight size={18} className="text-accent" />
          </div>
        </div>

        {items.map((item, i) => (
          <article
            key={item.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="relative flex glass-card w-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-500 hover:border-white/20 md:min-h-[min(68vh,620px)] md:w-[72vw] md:max-w-[1150px] md:shrink-0 md:snap-start md:flex-row"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:w-[50%] md:shrink-0">
              {/* Wider than its frame so the parallax drift never shows an edge */}
              <div data-parallax className="absolute inset-y-0 -left-[12%] -right-[12%]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 45vw, 85vw"
                  className="object-cover"
                  draggable={false}
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-14">
              <span className="font-display text-2xl text-accent md:text-3xl">0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-3xl md:mt-6 md:text-[clamp(1.75rem,2.8vw,3rem)]">
                {item.title}
              </h3>
              <p className="mt-4 max-w-md text-base text-fg-dim md:mt-6 md:text-[clamp(1rem,1.2vw,1.25rem)]">
                {item.detail}
              </p>

              <ul className="mt-5 space-y-2.5 md:mt-8">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 text-base text-fg-dim md:text-[clamp(0.95rem,1.1vw,1.125rem)]"
                  >
                    <Check size={16} className="mt-1 shrink-0 text-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* Progress HUD — pinned desktop mode only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[6vw] bottom-8 z-10 hidden items-center gap-6 md:flex md:group-data-[native=true]/cap:hidden"
      >
        <span className="font-display text-sm tabular-nums text-fg-dim">
          <span className="text-accent">0{current + 1}</span> / 0{items.length}
        </span>
        <div className="h-px flex-1 bg-white/15">
          <div
            ref={progressRef}
            className="h-full w-full bg-accent"
            style={{ transform: "scaleX(0)", transformOrigin: "0% 50%" }}
          />
        </div>
      </div>
    </div>
  );
}