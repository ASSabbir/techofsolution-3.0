"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { categoryLabels } from "@/lib/data/projects";

type Props = {
  project: Project;
  className?: string;
  /** Wide lead card (spans both columns on md+). */
  featured?: boolean;
};

// Only real mouse users get the parallax. Touch taps used to leave cards "stuck" in the hover state.
const allowMotion = (e: React.PointerEvent) =>
  e.pointerType === "mouse" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// On devices that can hover, the description and arrow appear on hover/focus.
// On touch devices they're always visible, since there's no hover to reveal them.
const descReveal =
  "grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-500 ease-out " +
  "[@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 " +
  "[@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100 " +
  "[@media(hover:hover)]:group-focus-visible:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:opacity-100";

const arrowReveal =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fg text-ink transition-all duration-500 " +
  "[@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:scale-90 [@media(hover:hover)]:opacity-0 " +
  "[@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:scale-100 [@media(hover:hover)]:group-hover:opacity-100 " +
  "[@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:scale-100 [@media(hover:hover)]:group-focus-visible:opacity-100";

export default function ProjectCard({ project, className = "", featured = false }: Props) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const moveX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const moveY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  // quickTo reuses one tween per property, so the parallax stays smooth without spawning new tweens on every mousemove.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    moveX.current = gsap.quickTo(img, "x", { duration: 0.8, ease: "power3.out" });
    moveY.current = gsap.quickTo(img, "y", { duration: 0.8, ease: "power3.out" });
    return () => {
      gsap.killTweensOf(img);
    };
  }, []);

  const onEnter = (e: React.PointerEvent) => {
    if (!allowMotion(e)) return;
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.9, ease: "power3.out" });
  };

  const onMove = (e: React.PointerEvent) => {
    if (!allowMotion(e)) return;
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const nx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const ny = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    moveX.current?.(-nx * 14);
    moveY.current?.(-ny * 14);
  };

  const onLeave = () => {
    moveX.current?.(0);
    moveY.current?.(0);
    gsap.to(imgRef.current, { scale: 1, duration: 0.9, ease: "power3.out" });
  };

  const external = project.link.startsWith("http");

  return (
    <Link
      ref={cardRef}
      href={project.link}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group relative isolate block h-full overflow-hidden rounded-2xl bg-surface ring-1 ring-inset ring-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      <div ref={imgRef} className="absolute inset-[-16px] will-change-transform">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.client}`}
          fill
          className="object-cover"
          sizes={featured ? "(max-width: 1280px) 100vw, 1200px" : "(max-width: 768px) 100vw, 50vw"}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col justify-between p-5 sm:p-6 md:p-8">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full border border-line-strong bg-ink/50 px-3 py-1 text-xs text-fg-dim backdrop-blur">
            {categoryLabels[project.category]}
          </span>
          <span className={arrowReveal}>
            <ArrowUpRight size={18} />
          </span>
        </div>

        <div>
          <p className="mb-2 text-sm text-fg-dim">{project.client}</p>
          <h3
            className={`font-display text-2xl font-semibold leading-tight sm:text-3xl ${
              featured ? "lg:text-4xl" : ""
            }`}
          >
            {project.title}
          </h3>
          <div className={descReveal}>
            <div className="overflow-hidden">
              <p className={`pt-3 text-sm leading-relaxed text-fg-dim ${featured ? "max-w-xl" : "max-w-md"}`}>
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}