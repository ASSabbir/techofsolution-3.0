"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data/services";
import imgDefault from "../../public/Img/img2.png";
import img1 from "../../public/Img/img5.png";
import img2 from "../../public/Img/img4.png";
import img3 from "../../public/Img/img5.png";
import img4 from "../../public/Img/img4.png";
import img5 from "../../public/Img/img2.png";

// Order must match the services array — services[0] gets serviceImages[0], etc.
const serviceImages = [img1, img2, img3, img4, img5];

const BG_TRANSITION_MS = 700;

/**
 * One background layer. Mounts at opacity-0 and flips to opacity-100 a frame
 * later so the CSS transition actually has something to animate from.
 */
function BgLayer({ src, eager = false }: { src: StaticImageData; eager?: boolean }) {
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    if (eager) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [eager]);

  return (
    <Image
      src={src}
      alt=""
      fill
      priority={eager}
      className={`object-cover transition-opacity ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDuration: `${BG_TRANSITION_MS}ms` }}
    />
  );
}

export default function ServicesShowcase() {
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);
  const reduceMotion = useRef(false);

  // Right-side detail panels (one per service) + which one is currently shown
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shownRef = useRef<number | null>(null);

  // Background layers stack incrementally (see previous notes): older layers
  // stay opaque underneath, and get pruned once the top one has faded in.
  const [bgLayers, setBgLayers] = useState<{ src: StaticImageData; id: number }[]>([
    { src: imgDefault, id: 0 },
  ]);
  const bgIdRef = useRef(0);
  const pruneTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pushBackground = (src: StaticImageData) => {
    bgIdRef.current += 1;
    const id = bgIdRef.current;
    setBgLayers((prev) => [...prev, { src, id }]);

    if (pruneTimeout.current) clearTimeout(pruneTimeout.current);
    pruneTimeout.current = setTimeout(() => {
      setBgLayers((prev) => (prev.length > 1 ? prev.slice(-1) : prev));
    }, BG_TRANSITION_MS + 60);
  };

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => {
      if (pruneTimeout.current) clearTimeout(pruneTimeout.current);
    };
  }, []);

  const ensureQuick = () => {
    if (!pillRef.current || reduceMotion.current) return;
    if (!quickX.current) {
      quickX.current = gsap.quickTo(pillRef.current, "x", { duration: 0.5, ease: "power3.out" });
      quickY.current = gsap.quickTo(pillRef.current, "y", { duration: 0.5, ease: "power3.out" });
    }
  };

  const onMove = (e: React.MouseEvent) => {
    ensureQuick();
    quickX.current?.(e.clientX + 22);
    quickY.current?.(e.clientY + 22);

    const section = sectionRef.current;
    if (section) {
      const rect = section.getBoundingClientRect();
      section.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      section.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    }
  };

  // ---- Right panel animations (GSAP) ----
  const showPanel = (i: number) => {
    const el = panelRefs.current[i];
    if (!el) return;
    const tags = el.querySelectorAll("[data-tag]");
    const rm = reduceMotion.current;

    gsap.killTweensOf([el, tags]);

    // Panel slides in from the left
    gsap.fromTo(
      el,
      { x: rm ? 0 : -48, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: rm ? 0 : 0.6, ease: "power3.out" }
    );

    // Tags follow with a small stagger
    gsap.fromTo(
      tags,
      { x: rm ? 0 : -24, autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        duration: rm ? 0 : 0.5,
        ease: "power3.out",
        stagger: 0.06,
        delay: rm ? 0 : 0.12,
      }
    );
  };

  const hidePanel = (i: number) => {
    const el = panelRefs.current[i];
    if (!el) return;
    const tags = el.querySelectorAll("[data-tag]");
    gsap.killTweensOf([el, tags]);
    gsap.to(el, {
      x: reduceMotion.current ? 0 : -20,
      autoAlpha: 0,
      duration: reduceMotion.current ? 0 : 0.25,
      ease: "power2.in",
    });
  };

  const enter = (i: number) => {
    setActive(i);
    pushBackground(serviceImages[i] ?? serviceImages[serviceImages.length - 1]);

    const prev = shownRef.current;
    if (prev !== i) {
      if (prev !== null) hidePanel(prev);
      showPanel(i);
      shownRef.current = i;
    }

    if (pillRef.current && !reduceMotion.current) {
      gsap.to(pillRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" });
    }
  };

  // Resets hover/dim state, hides the panel and the cursor pill.
  // The background is intentionally left as-is.
  const leave = () => {
    setActive(null);
    if (shownRef.current !== null) {
      hidePanel(shownRef.current);
      shownRef.current = null;
    }
    if (pillRef.current) {
      gsap.to(pillRef.current, { opacity: 0, scale: 0.7, duration: 0.25, ease: "power2.in" });
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={leave}
      className="relative isolate overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(500px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(156,107,31,0.08), transparent 70%)",
      }}
    >
      {/* Background images — the section height is now constant on hover,
          so the wrapper can simply fill the section (no JS height lock needed). */}
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        {bgLayers.map((layer, idx) => (
          <BgLayer key={layer.id} src={layer.src} eager={idx === 0} />
        ))}
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <div className="content-shell py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-xl text-aqua mb-4">What we do</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-dm-sans tracking-tight text-zinc-800 font-semibold text-balance">
            Five disciplines, one engineering team.
          </h2>
        </div>

        <div className="mt-14 border-t border-gray-500">
          {services.map((service, i) => {
            const isActive = active === i;
            const isDimmed = active !== null && !isActive;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onMouseEnter={() => enter(i)}
                className={`group relative flex items-center border-b border-gray-500 py-8 text-zinc-800 transition-opacity duration-300 md:py-20 ${
                  isDimmed ? "opacity-40" : "opacity-100"
                }`}
              >
                {/* Left: number + title (fixed height, never grows) */}
                <div className="flex items-start gap-5 md:max-w-[58%] md:items-center md:gap-8">
                  <span className="pt-1.5 font-display text-xl text-zinc-800 md:pt-0">
                    0{i + 1}
                  </span>
                  <h3 className="font-dm text-3xl font-semibold leading-tight transition-colors duration-300 sm:text-4xl md:text-5xl text-zinc-800 group-hover:text-aqua">
                    {service.name}
                  </h3>
                </div>

                {/* Right: description + tags. Absolutely positioned, so it
                    adds ZERO height to the row. Slides in from the left via GSAP. */}
                <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[40%] items-center md:flex">
                  <div
                    ref={(el) => {
                      panelRefs.current[i] = el;
                    }}
                    className="w-full"
                    style={{ opacity: 0, visibility: "hidden" }}
                  >
                    <p className="text-lg text-zinc-800">{service.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.offerings.map((o) => (
                        <span
                          key={o.title}
                          data-tag
                          className="rounded-full bg-aqua px-4 py-1 text-sm text-white"
                          style={{ opacity: 0, visibility: "hidden" }}
                        >
                          {o.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Cursor-following label */}
      <div
        ref={pillRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-ink opacity-0 md:flex"
        style={{ transform: "scale(0.7)" }}
      >
        {active !== null ? services[active].name : ""}
        <ArrowUpRight size={14} />
      </div>
    </section>
  );
}