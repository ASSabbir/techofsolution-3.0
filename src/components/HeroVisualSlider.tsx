"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import type { RotatorBus } from "@/lib/useRotatorBus";

export type HeroSlide = { word: string; image: string };

// Soft all-around vignette — this is what makes the image read as "emerging
// from the background" instead of a rectangular card sitting on the video.
const MASK =
  "radial-gradient(ellipse 78% 80% at 50% 50%, black 52%, transparent 100%)";

export default function HeroVisualSlider({
  slides,
  bus,
  reduced = false,
  duration = 0.85,
  ease = "power3.inOut",
  className = "",
}: {
  slides: HeroSlide[];
  bus: RotatorBus;
  reduced?: boolean;
  duration?: number;
  ease?: string;
  className?: string;
}) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  const idleRef = useRef<gsap.core.Tween | null>(null);

  // Initial stack: active slide in place, everything else waiting below.
  useEffect(() => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { yPercent: i === 0 ? 0 : 100, opacity: i === 0 ? 1 : 0 });
    });
  }, [slides.length]);

  // A barely-there idle drift on the active slide, so it never feels frozen
  // between transitions. Killed and restarted around every transition.
  useEffect(() => {
    if (reduced) return;
    const startIdle = () => {
      const el = itemRefs.current[activeRef.current];
      if (!el) return;
      idleRef.current?.kill();
      idleRef.current = gsap.to(el, {
        y: "+=4",
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    };
    startIdle();
    return () => {
      idleRef.current?.kill();
    };
  }, [reduced]);

  useEffect(() => {
    const unsubscribe = bus.subscribe((index) => {
      const prevEl = itemRefs.current[activeRef.current];
      const nextEl = itemRefs.current[index];
      activeRef.current = index;
      if (!prevEl || !nextEl) return;

      idleRef.current?.kill();
      gsap.set(prevEl, { y: 0 });

      if (reduced) {
        gsap.set(prevEl, { opacity: 0 });
        gsap.set(nextEl, { yPercent: 0, opacity: 1, scale: 1, filter: "blur(0px)" });
        return;
      }

      gsap.set(nextEl, { yPercent: 100, y: 0, opacity: 1, scale: 0.97, filter: "blur(6px)" });

      const tl = gsap.timeline({
        onComplete: () => {
          const el = itemRefs.current[activeRef.current];
          if (!el) return;
          idleRef.current = gsap.to(el, {
            y: "+=4",
            duration: 3.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      });

      // Outgoing continues upward and fades; incoming rises into place —
      // both start on tl position 0, so they move together, not in sequence.
      tl.to(prevEl, { yPercent: -100, opacity: 0, duration, ease }, 0).to(
        nextEl,
        { yPercent: 0, scale: 1, filter: "blur(0px)", duration, ease },
        0
      );
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bus, duration, ease, reduced]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-[28px] ${className}`}
      style={{
        WebkitMaskImage: MASK,
        maskImage: MASK,
      }}
    >
      {/* soft ambient glow behind the stack — helps it feel like light
          emerging from the scene rather than an image pasted on top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-20%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(200,155,74,0.16) 0%, transparent 70%)" }}
      />

      {slides.map((slide, i) => (
        <div
          key={slide.word}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={`${slide.word} — TechOf Solution`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 60vw, 28vw"
            priority={i === 0}
          />
          {/* blends the image's own edges into the hero video/overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" />
        </div>
      ))}
    </div>
  );
}