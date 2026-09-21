"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const WORDS = ["Tech", "Of", "Solution"];

// true  → only once per browser session (skips on refresh)
// false → every full page load (client-side navigation never re-triggers it)
const ONCE_PER_SESSION = false;
const STORAGE_KEY = "techof:preloader-seen";

// ── Timing — tweak here ──────────────────────────────────────────────
const T = {
  inDuration: 0.9,
  inStagger: 0.14,
  inEase: "expo.out",
  hold: 0.2,
  outDuration: 0.6,
  outStagger: 0.1,
  outEase: "power3.in",
  lineDuration: 0.9,
  lineEase: "power3.inOut",
  panelDuration: 1.2,
  panelEase: "power4.inOut",
};
// ─────────────────────────────────────────────────────────────────────

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SCROLL_KEYS = [" ", "PageUp", "PageDown", "ArrowUp", "ArrowDown", "Home", "End"];

function lockScroll() {
  const html = document.documentElement;
  const body = document.body;
  const scrollbar = window.innerWidth - html.clientWidth;

  window.scrollTo(0, 0);
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  // keeps layout from jumping when the scrollbar disappears/reappears
  if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

  // Also swallow wheel/touch/keys in the capture phase so Lenis
  // (SmoothScroll) can't scroll the page while the loader is up.
  const block = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const blockKeys = (e: KeyboardEvent) => {
    if (SCROLL_KEYS.includes(e.key)) e.preventDefault();
  };
  const opts = { passive: false, capture: true } as const;
  window.addEventListener("wheel", block, opts);
  window.addEventListener("touchmove", block, opts);
  window.addEventListener("keydown", blockKeys, opts);

  return () => {
    html.style.overflow = "";
    body.style.overflow = "";
    body.style.paddingRight = "";
    window.removeEventListener("wheel", block, opts);
    window.removeEventListener("touchmove", block, opts);
    window.removeEventListener("keydown", blockKeys, opts);
  };
}

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState(false);

  useIsoLayoutEffect(() => {
    const html = document.documentElement;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = ONCE_PER_SESSION && !!sessionStorage.getItem(STORAGE_KEY);
    } catch {}

    // Skip everything → hero plays its normal intro right away
    if (reduced || seen) {
      html.dataset.preloader = "done";
      setDone(true);
      return;
    }

    // Hero reads this in its own effect to know it should wait
    html.dataset.preloader = "running";
    const unlock = lockScroll();

    const finish = () => {
      html.dataset.preloader = "done";
      try {
        if (ONCE_PER_SESSION) sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      unlock();
      setDone(true);
    };

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".preloader-word");

      gsap.set(".preloader-line", { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({ onComplete: finish });

      tl
        // 1. words enter right → left, one by one
        .fromTo(
          words,
          { xPercent: 100, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: T.inDuration,
            ease: T.inEase,
            stagger: T.inStagger,
          },
          0.2
        )
        // 2. hold, then 3. words exit to the left, one by one
        .to(
          words,
          {
            xPercent: -100,
            opacity: 0,
            duration: T.outDuration,
            ease: T.outEase,
            stagger: T.outStagger,
          },
          `+=${T.hold}`
        )
        // 4. white line draws left → right
        .to(
          ".preloader-line",
          { scaleX: 1, duration: T.lineDuration, ease: T.lineEase },
          "-=0.3"
        )
        // 5. panels split open
        .addLabel("reveal", "+=0.1")
        .to(
          ".preloader-line",
          { opacity: 0, duration: 0.25, ease: "power2.out" },
          "reveal"
        )
        .to(
          ".preloader-top",
          { yPercent: -100, duration: T.panelDuration, ease: T.panelEase },
          "reveal"
        )
        .to(
          ".preloader-bottom",
          { yPercent: 100, duration: T.panelDuration, ease: T.panelEase },
          "reveal"
        )
        // 6. tell the hero to start its reveal, just as the panels begin to move
        .call(
          () => window.dispatchEvent(new Event("preloader:reveal")),
          undefined,
          "reveal+=0.1"
        );
    }, rootRef);

    return () => {
      ctx.revert();
      unlock();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] overflow-hidden"
    >
      {/* Split panels */}
      <div className="preloader-top absolute left-0 top-0 h-1/2 w-full bg-black will-change-transform" />
      <div className="preloader-bottom absolute bottom-0 left-0 h-1/2 w-full bg-black will-change-transform" />

      {/* Center line (inline styles on purpose — GSAP owns the transform) */}
      <div
        className="preloader-line absolute left-0 w-full bg-white will-change-transform"
        style={{
          top: "calc(50% - 1px)",
          height: 2,
          transform: "scaleX(0)",
          transformOrigin: "left center",
        }}
      />

      {/* Words */}
      <div className="absolute inset-0 flex items-center justify-center px-5">
        <p
          className="flex flex-wrap items-center justify-center gap-x-[0.28em] font-dm-sans f leading-[0.95]  text-white"
          style={{ fontSize: "clamp(2rem, 9vw, 6rem)" }}
        >
          {WORDS.map((w) => (
            <span
              key={w}
              className="preloader-word inline-block opacity-0 will-change-transform"
            >
              {w}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}