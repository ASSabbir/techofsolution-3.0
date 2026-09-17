"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { gsap } from "gsap";
import {
  Globe,
  Cpu,
  FlaskConical,
  Layers,
  BarChart3,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/data/services";
import imgDefault from '../../public/Img/sd.webp'
import img1 from '../../public/Img/img2.png'
import img2 from '../../public/Img/img2.png'
import img3 from '../../public/Img/img3.png'
import img4 from '../../public/Img/img2.png'
import img5 from '../../public/Img/img2.png'

// Order must match the services array — services[0] gets serviceImages[0], etc.
// Swap these five files in /public/Img for your real per-service images.
const serviceImages = [img1, img2, img3, img4, img5];

const icons: Record<string, LucideIcon> = {
  globe: Globe,
  cpu: Cpu,
  flask: FlaskConical,
  layers: Layers,
  chart: BarChart3,
};

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
  const bgWrapperRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);
  const reduceMotion = useRef(false);

  // Background layers stack incrementally: each hover pushes a new layer on
  // top, older layers stay fully opaque underneath (never faded out), so
  // there's always continuous coverage and nothing can flash through
  // mid-transition. Once a layer finishes fading in, everything below it is
  // pruned since it's no longer visible anyway.
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
    return () => {
      if (pruneTimeout.current) clearTimeout(pruneTimeout.current);
    };
  }, []);

  // Lock the background wrapper to the section's natural (collapsed) height,
  // measured once on mount and re-measured only on window resize — never on
  // hover. The accordion reveal still changes the section's real height same
  // as before; the background just no longer tracks it, so it never
  // stretches/zooms during that transition. If an expanded row pushes the
  // section taller than this measured height, the extra sliver at the bottom
  // simply shows the plain section background instead of the image — no
  // distortion, which is the trade-off that fixes the zoom.
  useEffect(() => {
    const section = sectionRef.current;
    const bgWrapper = bgWrapperRef.current;
    if (!section || !bgWrapper) return;

    const setHeight = () => {
      bgWrapper.style.height = `${section.offsetHeight}px`;
    };

    setHeight();
    window.addEventListener("resize", setHeight);
    return () => window.removeEventListener("resize", setHeight);
  }, []);

  const ensureQuick = () => {
    if (typeof window !== "undefined") {
      reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
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

  const enter = (i: number) => {
    setActive(i);
    pushBackground(serviceImages[i] ?? serviceImages[serviceImages.length - 1]);
    if (pillRef.current && !reduceMotion.current) {
      gsap.to(pillRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" });
    }
  };

  // Only resets hover/dim state and the cursor pill. The background is left
  // alone — once you've hovered a service, its image stays as the new
  // "default" until you hover another one. A full page reload resets it back
  // to imgDefault.
  const leave = () => {
    setActive(null);
    if (pillRef.current) {
      gsap.to(pillRef.current, { opacity: 0, scale: 0.7, duration: 0.25, ease: "power2.in" });
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={leave}
      className=" relative isolate overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(500px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(156,107,31,0.08), transparent 70%)",
      }}
    >
      {/* Background images — fixed-height wrapper so hover-driven row growth
          never resizes/zooms the image. */}
      <div
        ref={bgWrapperRef}
        className="absolute inset-x-0 top-0 -z-20 overflow-hidden"
        aria-hidden="true"
      >
        {bgLayers.map((layer, idx) => (
          <BgLayer key={layer.id} src={layer.src} eager={idx === 0} />
        ))}
        {/* White overlay so the image sits subtly behind the light theme content */}
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <div className="content-shell py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-xl text-aqua mb-4">What we do</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-dm-sans tracking- text-zinc-800 font-semibold text-balance">
            Five disciplines, one engineering team.
          </h2>
        </div>

        <div className="mt-14 border-t border-gray-500">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            const isActive = active === i;
            const isDimmed = active !== null && !isActive;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onMouseEnter={() => enter(i)}
                className={`group relative flex flex-col text-zinc-800 gap-4 border-b border-gray-500 py-8 transition-opacity duration-300 md:flex-row md:items-center md:justify-between md:gap-6 md:py-10 ${
                  isDimmed ? "opacity-40" : "opacity-100"
                }`}
              >
                <div className="flex items-start gap-5 md:items-center md:gap-8">
                  <span className="pt-1.5 font-display text-xl text-zinc-800 md:pt-0">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-dm text-3xl font-semibold leading-tight transition-colors duration-300 sm:text-4xl md:text-5xl text-zinc-800 group-hover:text-aqua">
                      {service.name}
                    </h3>
                    <div className="grid transition-all duration-500 ease-out grid-rows-[0fr] group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="max-w-md pt-3 text-lg text-zinc-800">{service.summary}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {service.offerings.map((o) => (
                            <span
                              key={o.title}
                              className="rounded-full px-4 py-1 text-sm bg-aqua text-white"
                            >
                              {o.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-4 self-end md:self-auto">
                  <Icon size={20} className="hidden text-aqua sm:block" />
                  <ArrowUpRight
                    size={24}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-aqua"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Cursor-following label — text only, no imagery needed */}
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