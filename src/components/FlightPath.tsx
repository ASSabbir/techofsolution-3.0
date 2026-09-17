"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FlightPath({ className = "" }: { className?: string }) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const planeRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    const plane = planeRef.current;
    if (!path || !plane) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const proxy = { progress: 0 };
    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(path, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0);
    tl.to(
      proxy,
      {
        progress: 1,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          const point = path.getPointAtLength(proxy.progress * length);
          const next = path.getPointAtLength(Math.min(proxy.progress * length + 1, length));
          const angle = (Math.atan2(next.y - point.y, next.x - point.x) * 180) / Math.PI;
          gsap.set(plane, { x: point.x, y: point.y, rotation: angle, transformOrigin: "center" });
        },
      },
      0
    );
    tl.to(plane, { opacity: 1, duration: 0.2 }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg viewBox="0 0 600 200" className={className} aria-hidden="true">
      <line x1="10" y1="170" x2="590" y2="170" stroke="var(--color-line-strong)" strokeWidth="1" strokeDasharray="4 8" />
      <path
        ref={pathRef}
        d="M 10 170 Q 260 170 460 60"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g ref={planeRef} opacity="0">
        <path d="M0 -5 L14 0 L0 5 L3 0 Z" fill="var(--color-accent)" />
      </g>
    </svg>
  );
}
