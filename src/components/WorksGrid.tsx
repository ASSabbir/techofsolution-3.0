"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { projects, categoryLabels, type ProjectCategory } from "@/lib/data/projects";
import ProjectCard from "@/components/ProjectCard";

const categories: ProjectCategory[] = ["website", "software", "aiml", "research"];

export default function WorksGrid() {
  const [active, setActive] = useState<ProjectCategory>("website");
  const [displayed, setDisplayed] = useState<ProjectCategory>("website");
  const gridRef = useRef<HTMLDivElement | null>(null);

  const filtered = projects.filter((p) => p.category === displayed);

  const handleSelect = (cat: ProjectCategory) => {
    if (cat === active) return;
    setActive(cat);

    const grid = gridRef.current;
    const cards = grid ? Array.from(grid.children) : [];

    if (!cards.length) {
      setDisplayed(cat);
      return;
    }

    gsap.to(cards, {
      opacity: 0,
      y: -16,
      scale: 0.97,
      duration: 0.3,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => setDisplayed(cat),
    });
  };

  // Animate the newly displayed set in whenever it changes.
  const enterKey = displayed;
  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-line pb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleSelect(cat)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              active === cat
                ? "bg-fg text-ink"
                : "border border-line-strong text-fg-dim hover:border-accent hover:text-accent"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {filtered.length ? (
        <div
          key={enterKey}
          ref={gridRef}
          className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {filtered.map((project) => (
            <GridEnter key={project.slug}>
              <ProjectCard project={project} className="min-h-[24rem]" />
            </GridEnter>
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-muted">No projects in this category yet.</p>
      )}
    </div>
  );
}

function GridEnter({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMount = (node: HTMLDivElement | null) => {
    ref.current = node;
    if (node) {
      gsap.fromTo(
        node,
        { opacity: 0, y: 22, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" }
      );
    }
  };

  return <div ref={onMount}>{children}</div>;
}
