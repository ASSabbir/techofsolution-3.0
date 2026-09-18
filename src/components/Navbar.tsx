"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Globe,
  Cpu,
  FlaskConical,
  Layers,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { nav } from "@/lib/data/site";
import { services } from "@/lib/data/services";

const icons: Record<string, LucideIcon> = {
  globe: Globe,
  cpu: Cpu,
  flask: FlaskConical,
  layers: Layers,
  chart: BarChart3,
};

// Center nav pulls from the project's existing nav data — drop the home
// link (the logo already goes home) and the contact link (it gets its own
// CTA on the right). Adjust this filter if your nav.ts shape changes.
const CENTER_ITEMS = nav.filter(
  (item) => item.href !== "/" && item.label.toLowerCase() !== "contact"
);

const CHOREO_DURATION = 0.5;
const CHOREO_EASE = "power3.inOut";
const STAGGER_OVERLAP = "-=0.32"; // how much each reveal step overlaps the previous one
const HIDE_AT = 80; // px scrolled before hiding is allowed to trigger

/**
 * Two stacked copies of the label inside an overflow-hidden box. On hover
 * (driven by the parent's `group` class) the top copy slides up and out
 * while an identical copy slides up from below into its place — the
 * "current word slides up, next identical word slides up behind it" effect.
 */
function SlideText({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block h-[1.15em] overflow-hidden align-middle">
      <span className="block transition-transform !duration-500 ease-out group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 block translate-y-full transition-transform !duration-500 ease-out group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [reduced, setReduced] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);
  const servicesButtonRef = useRef<HTMLDivElement | null>(null);
  const dropdownPanelRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const centerRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const lastY = useRef(0);
  const tickingRef = useRef(false);

  // On the homepage, while still at the top of the hero (not scrolled),
  // the bar flips to the light variant: white fill, black text/border.
  // Anywhere else — or once scrolled past the hero — it's the normal
  // dark-pill variant. This is purely a style switch; it doesn't touch
  // the hide/show choreography above.
  const isHeroTop = pathname === "/" && !scrolled;

  const itemClasses = (active: boolean) => {
    if (active) return "border-accent text-accent";
    return isHeroTop
      ? "border-black text-black hover:border-accent "
      : "border-white text-white hover:border-accent ";
  };
  const itemFillClass = isHeroTop ? "bg-[#E4E2DD]" : "bg-black";
  const iconButtonClasses = isHeroTop
    ? "border-black bg-white text-black"
    : "border-white bg-black text-white";

  // ── Reduced motion: watch it live ──────────────────────────────────
  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // ── Scroll direction detection ──────────────────────────────────────
  useEffect(() => {
    lastY.current = window.scrollY;

    const evaluate = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      if (y > lastY.current && y > HIDE_AT) {
        setHidden(true);
      } else if (y < lastY.current) {
        setHidden(false);
      }

      lastY.current = y;
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(evaluate);
      }
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close mobile menu / dropdown on route change ──────────────────
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // ── GSAP scroll choreography ────────────────────────────────────────
  useLayoutEffect(() => {
    const logo = logoRef.current;
    const center = centerRef.current;
    const contact = contactRef.current;
    if (!logo || !center || !contact) return;

    if (reduced) {
      gsap.to([logo, center, contact], {
        opacity: hidden ? 0 : 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
      return;
    }

    const logoDistance = logo.offsetWidth + 40;
    const contactDistance = contact.offsetWidth + 40;
    const centerDistance = center.offsetHeight + 32;

    const tl = gsap.timeline();

    if (hidden) {
      tl.to(logo, { x: -logoDistance, opacity: 0, duration: CHOREO_DURATION, ease: CHOREO_EASE }, 0)
        .to(center, { y: -centerDistance, opacity: 0, duration: CHOREO_DURATION, ease: CHOREO_EASE }, 0)
        .to(contact, { x: contactDistance, opacity: 0, duration: CHOREO_DURATION, ease: CHOREO_EASE }, 0);
    } else {
      tl.to(logo, { x: 0, opacity: 1, duration: CHOREO_DURATION, ease: CHOREO_EASE })
        .to(contact, { x: 0, opacity: 1, duration: CHOREO_DURATION, ease: CHOREO_EASE }, STAGGER_OVERLAP)
        .to(center, { y: 0, opacity: 1, duration: CHOREO_DURATION, ease: CHOREO_EASE }, STAGGER_OVERLAP);
    }

    return () => {
      tl.kill();
    };
  }, [hidden, reduced]);

  // ── Mobile full-screen menu ─────────────────────────────────────────
  useEffect(() => {
    const menu = menuRef.current;
    const links = linksRef.current?.querySelectorAll("a, button");
    if (!menu) return;

    document.body.style.overflow = open ? "hidden" : "";

    if (open) {
      gsap.to(menu, {
        clipPath: "circle(150% at 100% 0%)",
        duration: 0.7,
        ease: "power3.inOut",
      });
      if (links) {
        gsap.fromTo(
          links,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.2, ease: "power3.out" }
        );
      }
    } else {
      gsap.to(menu, { clipPath: "circle(0% at 100% 0%)", duration: 0.5, ease: "power3.inOut" });
    }
  }, [open]);

  // ── Services dropdown: height 0 → auto, rows slide down one after another ──
  useEffect(() => {
    const panel = dropdownPanelRef.current;
    const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    if (!panel) return;

    if (servicesOpen) {
      gsap.set(panel, { pointerEvents: "auto" });
      gsap.to(panel, {
        height: "auto",
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.fromTo(
        items,
        { y: -14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.05,
          delay: 0.12,
          overwrite: true,
        }
      );
    } else {
      gsap.to(items, { y: -8, opacity: 0, duration: 0.18, ease: "power2.in", overwrite: true });
      gsap.to(panel, {
        height: 0,
        duration: 0.32,
        ease: "power2.inOut",
        delay: 0.05,
        overwrite: true,
        onComplete: () => gsap.set(panel, { pointerEvents: "none" }),
      });
    }
  }, [servicesOpen]);

  // ── Escape to close + click outside ─────────────────────────────────
  useEffect(() => {
    if (!servicesOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (servicesButtonRef.current && !servicesButtonRef.current.contains(target)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [servicesOpen]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const isServicesActive = pathname.startsWith("/services");

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-20 py-5">
        {/* LEFT — logo */}
        <Link
          ref={logoRef}
          href="/"
          className="flex w-fit items-center justify-self-start"
          aria-label="TechOf Solution home"
        >
          <Image src="/Img/logo2.png" alt="TechOf Solution" width={180} height={34} priority />
        </Link>

        {/* CENTER */}
        <nav
          ref={centerRef}
          className="col-start-2 hidden items-center gap-2 justify-self-center lg:flex"
          aria-label="Primary"
        >
          {CENTER_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const isServices = item.label.toLowerCase() === "services";

            if (isServices) {
              return (
                <div
                  key={item.href}
                  ref={servicesButtonRef}
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    onClick={() => setServicesOpen((v) => !v)}
                    aria-haspopup="menu"
                    aria-expanded={servicesOpen}
                    className={`group flex items-center gap-1.5 rounded-sm border px-4 py-[10px] text-sm font-semibold uppercase tracking-wide transition-colors duration-500 ${itemFillClass} ${itemClasses(
                      active || isServicesActive
                    )}`}
                  >
                    <SlideText>{item.label}</SlideText>
                    <ChevronDown
                      size={14}
                      className={`shrink-0 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Static positioning wrapper — the panel inside does the
                      height 0 → auto reveal, so this never needs its own
                      opacity/transform animation. */}
                  <div className="absolute left-1/2 top-full w-[380px] -translate-x-1/2 pt-4">
                    {/* This outer element owns the height 0 → auto tween and
                        overflow-hidden clipping ONLY — no border/background
                        here. A border painted directly on a height:0 box
                        still renders (top and bottom edges stack into a
                        visible hairline), which was the stray white line.
                        Putting the border on the child below instead means
                        it gets fully clipped away while height is 0. */}
                    <div
                      ref={dropdownPanelRef}
                      role="menu"
                      className="overflow-hidden"
                      style={{ height: 0, pointerEvents: "none" }}
                    >
                      <div className="rounded-sm border border-black/50 bg-white shadow-2xl">
                        <div className="flex flex-col gap-0.5 p-3">
                          {services.map((service, i) => {
                          const Icon = icons[service.icon];
                          return (
                            <Link
                              key={service.slug}
                              ref={(el) => {
                                itemRefs.current[i] = el;
                              }}
                              href={`/services/${service.slug}`}
                              role="menuitem"
                              className="group flex items-start gap-3 rounded-md p-3 opacity-0 transition-colors hover:bg-black/[0.04]"
                            >
                              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-accent transition-transform duration-300 group-hover:translate-x-0.5">
                                <Icon size={16} />
                              </span>
                              <span className="flex-1 transition-transform duration-300 group-hover:translate-x-0.5">
                                <span className="block text-sm font-medium text-black">{service.name}</span>
                                <span className="mt-0.5 block text-xs text-black/50">{service.short}</span>
                              </span>
                              <ArrowUpRight
                                size={14}
                                className="mt-1 shrink-0 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                              />
                            </Link>
                          );
                        })}
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group rounded-sm border px-4 py-2 text-sm font-semibold uppercase tracking-wide  duration-500 ${itemFillClass} ${itemClasses(
                  active
                )}`}
              >
                <SlideText>{item.label}</SlideText>
              </Link>
            );
          })}
        </nav>

        {/* RIGHT — contact CTA + mobile toggle */}
        <div className="col-start-3 flex items-center justify-self-end gap-3">
          <div ref={contactRef} className="hidden md:block">
            <Link
              href="/contact"
              className={`group inline-flex items-center gap-2 rounded-sm border px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-all duration-500 hover:scale-[1.03] ${itemFillClass} ${itemClasses(
                false
              )}`}
            >
              <SlideText>Contact</SlideText>
              <ArrowUpRight
                size={14}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`relative z-[60] flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 lg:hidden ${iconButtonClasses}`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 flex h-dvh w-full flex-col items-center justify-center gap-8 overflow-y-auto bg-ink py-24 text-fg lg:hidden"
        style={{ clipPath: "circle(0% at 100% 0%)" }}
      >
        <div ref={linksRef} className="flex w-full flex-col items-center gap-7 px-8">
          {CENTER_ITEMS.map((item) =>
            item.label.toLowerCase() === "services" ? (
              <div key={item.href} className="flex flex-col items-center gap-5">
                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  aria-expanded={mobileServicesOpen}
                  className="flex items-center gap-2 font-display text-3xl font-semibold uppercase tracking-wide"
                >
                  {item.label}
                  <ChevronDown
                    size={22}
                    className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="flex flex-col items-center gap-4">
                    {services.map((service) => (
                      <Link key={service.slug} href={`/services/${service.slug}`} className="text-lg text-fg-dim">
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-3xl font-semibold uppercase tracking-wide"
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="mt-4 rounded-md bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-accent-ink"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}