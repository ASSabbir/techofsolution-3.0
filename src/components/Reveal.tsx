"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type RevealProps = {
  children: React.ReactNode;
  as?: React.ElementType;
  delay?: number;
  y?: number;
  className?: string;
  /** Reveal children one-by-one instead of the container as a whole */
  stagger?: number;
};

/**
 * Slide-up + fade-in when the element scrolls into view.
 *
 * Uses IntersectionObserver rather than ScrollTrigger on purpose: the browser
 * re-checks element positions continuously, so it keeps working when the page
 * height changes (client-side navigation, late-loading content, short pages).
 * ScrollTrigger stores absolute pixel positions when it is created, and those go
 * stale for components that persist across pages — like the footer.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  y = 28,
  className,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: leave everything visible, no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = stagger ? Array.from(el.children) : [el];
    let io: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {
      gsap.set(targets, { y, opacity: 0 });

      const tween = gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        paused: true,
      });

      // Same feel as "top 85%", but never larger than half the element, so short
      // elements at the very bottom of a page can always be revealed.
      const margin = Math.min(window.innerHeight * 0.15, el.offsetHeight * 0.5);

      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            tween.play();
          } else if (entry.boundingClientRect.top > 0) {
            // Scrolled back up past it (it's below the viewport again) → reset so it replays
            tween.reverse();
          }
        },
        { rootMargin: `0px 0px -${Math.round(margin)}px 0px`, threshold: 0 }
      );
      io.observe(el);
    }, el);

    return () => {
      io?.disconnect();
      ctx.revert();
    };
  }, [delay, y, stagger]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}