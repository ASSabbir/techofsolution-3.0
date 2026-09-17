"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FloatingGlow({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(el, { y: -24, x: 12, duration: 4, ease: "sine.inOut" });
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)", opacity: 0.18 }}
    />
  );
}
