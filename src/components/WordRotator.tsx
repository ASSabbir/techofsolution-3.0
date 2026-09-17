"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { RotatorBus } from "@/lib/useRotatorBus";

export default function WordRotator({
  words,
  bus,
  duration = 0.85,
  ease = "power3.inOut",
}: {
  words: string[];
  bus: RotatorBus;
  duration?: number;
  ease?: string;
}) {
  const trackRef = useRef<HTMLSpanElement | null>(null);
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const heightRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    const items = Array.from(track.children) as HTMLElement[];

    const measure = () => {
      heightRef.current = items[0].getBoundingClientRect().height;
      wrap.style.height = `${heightRef.current}px`;
    };
    measure();

    // The bus fires this synchronously alongside every other subscriber's
    // callback (e.g. HeroVisualSlider's) — that's what keeps them in lockstep.
    const unsubscribe = bus.subscribe((index) => {
      gsap.to(track, { y: -heightRef.current * index, duration, ease });
    });

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", onResize);
    };
  }, [bus, duration, ease]);

  return (
    <span ref={wrapRef} className="relative inline-block overflow-hidden pr-5 align-bottom">
      <span ref={trackRef} className="flex flex-col will-change-transform">
        {words.map((word, i) => (
          <span key={i} className="block font-medium italic text-accent">
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}