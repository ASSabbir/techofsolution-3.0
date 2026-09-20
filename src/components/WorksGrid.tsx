"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { projects, categoryLabels, type ProjectCategory } from "@/lib/data/projects";
import ProjectCard from "@/components/ProjectCard";

const categories: ProjectCategory[] = ["website", "software", "aiml", "research"];

// useLayoutEffect warns during SSR, so fall back to useEffect on the server.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function WorksGrid() {
  // `active` drives the tab UI instantly, `displayed` drives the cards after the exit animation.
  const [active, setActive] = useState<ProjectCategory>("website");
  const [displayed, setDisplayed] = useState<ProjectCategory>("website");

  const gridRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const tabRefs = useRef<Partial<Record<ProjectCategory, HTMLButtonElement | null>>>({});
  const prevDisplayed = useRef<ProjectCategory>("website");
  const indicatorPlaced = useRef(false);

  const counts = useMemo(() => {
    const map = {} as Record<ProjectCategory, number>;
    categories.forEach((c) => (map[c] = projects.filter((p) => p.category === c).length));
    return map;
  }, []);

  const filtered = useMemo(() => projects.filter((p) => p.category === displayed), [displayed]);

  /* ---------- Sliding tab indicator ---------- */
  const moveIndicator = useCallback(
    (animate: boolean) => {
      const tab = tabRefs.current[active];
      const bar = indicatorRef.current;
      if (!tab || !bar) return;
      const to = { x: tab.offsetLeft, width: tab.offsetWidth };
      if (animate && !reducedMotion()) {
        gsap.to(bar, { ...to, duration: 0.6, ease: "power3.inOut", overwrite: true });
      } else {
        gsap.set(bar, to);
      }
    },
    [active]
  );

  useIsoLayoutEffect(() => {
    moveIndicator(indicatorPlaced.current); // first placement is instant, no slide-in from 0
    indicatorPlaced.current = true;
  }, [moveIndicator]);

  useEffect(() => {
    const onResize = () => moveIndicator(false);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize); // re-measure once the display font is loaded
    return () => window.removeEventListener("resize", onResize);
  }, [moveIndicator]);

  /* ---------- Enter animation (runs ONLY when the displayed category actually changes) ---------- */
  useIsoLayoutEffect(() => {
    if (prevDisplayed.current === displayed) return; // skips first mount + StrictMode double-run
    prevDisplayed.current = displayed;

    const grid = gridRef.current;
    if (!grid || reducedMotion()) return;
    const cards = Array.from(grid.children);
    if (!cards.length) return;

    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        stagger: 0.09,
        ease: "power3.out",
        clearProps: "opacity,transform",
      }
    );
    return () => {
      tween.kill();
    };
  }, [displayed]);

  /* ---------- Tab click ---------- */
  const handleSelect = (cat: ProjectCategory) => {
    if (cat === active) return;
    setActive(cat);
    tabRefs.current[cat]?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });

    const cards = gridRef.current ? Array.from(gridRef.current.children) : [];
    gsap.killTweensOf(cards); // safe to click again mid-animation

    // Went back to the category that's still on screen: just bring the cards back.
    if (cat === displayed) {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.04,
        ease: "power3.out",
        clearProps: "opacity,transform",
      });
      return;
    }

    if (!cards.length || reducedMotion()) {
      setDisplayed(cat);
      return;
    }

    gsap.to(cards, {
      opacity: 0,
      y: -18,
      scale: 0.96,
      duration: 0.28,
      stagger: 0.04,
      ease: "power2.in",
      onComplete: () => setDisplayed(cat),
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="Project categories"
          className="relative flex w-full max-w-full gap-1 overflow-x-auto rounded-full border border-line-strong bg-surface p-1.5 [scrollbar-width:none] sm:w-auto [&::-webkit-scrollbar]:hidden"
        >
          <span
            ref={indicatorRef}
            aria-hidden
            className="pointer-events-none absolute bottom-1.5 left-0 top-1.5 rounded-full bg-fg"
            style={{ width: 0 }}
          />
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                ref={(el) => {
                  tabRefs.current[cat] = el;
                }}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelect(cat)}
                className={`relative z-10 shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-5 ${
                  isActive ? "text-ink" : "text-fg-dim hover:text-fg"
                }`}
              >
                {categoryLabels[cat]}
                <span className="ml-2 text-xs tabular-nums opacity-60">{counts[cat]}</span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="text-sm text-muted">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {filtered.length ? (
        <div
          ref={gridRef}
          role="tabpanel"
          className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 xl:gap-6"
        >
          {filtered.map((project, i) => {
            // Odd count: lead with one wide card so the grid never ends on an orphan.
            const featured = i === 0 && filtered.length % 2 === 1;
            return (
              <div key={project.slug} className={featured ? "md:col-span-2" : undefined}>
                <ProjectCard
                  project={project}
                  featured={featured}
                  className="min-h-[22rem] sm:min-h-[26rem] lg:min-h-[30rem]"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-16 text-center text-muted">No projects in this category yet.</p>
      )}
    </div>
  );
}