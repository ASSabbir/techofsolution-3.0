"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { categoryLabels } from "@/lib/data/projects";

export default function ProjectCard({ project, className = "" }: { project: Project; className?: string }) {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLAnchorElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    const img = imgRef.current;
    if (!card || !img) return;
    const rect = card.getBoundingClientRect();
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    gsap.to(img, { x: -nx * 14, y: -ny * 14, duration: 0.6, ease: "power3.out" });
  };

  const onLeave = () => {
    gsap.to(imgRef.current, { x: 0, y: 0, scale: 1, duration: 0.7, ease: "power3.out" });
  };

  const onEnter = () => {
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.7, ease: "power3.out" });
  };

  return (
    <a
      ref={cardRef}
      href={project.link}
      target={project.link.startsWith("http") ? "_blank" : undefined}
      rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`group relative block h-full min-h-[22rem] overflow-hidden rounded-lg bg-surface ${className}`}
    >
      <div ref={imgRef} className="absolute inset-[-16px]">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.client}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-90" />

      <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
        <div className="flex items-start justify-between">
          <span className="rounded-full border border-line-strong bg-ink/50 px-3 py-1 text-xs text-fg-dim backdrop-blur">
            {categoryLabels[project.category]}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-fg text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </div>

        <div>
          <h3 className="font-display text-2xl font-semibold md:text-3xl">{project.title}</h3>
          <p className="mt-2 max-w-md text-sm text-fg-dim opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {project.description}
          </p>
        </div>
      </div>
    </a>
  );
}
