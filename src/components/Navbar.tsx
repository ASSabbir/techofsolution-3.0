"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
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
  Mail,
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

// ── ⚠️ Replace these with your real links ─────────────────────────────
const SOCIAL_LINKS = {
  facebook: "https://facebook.com/your-page",
  linkedin: "https://linkedin.com/company/your-company",
  // country code + number, no "+" or spaces  (e.g. 8801712345678)
  whatsapp: "https://wa.me/8801XXXXXXXXX",
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
const SCROLL_THRESHOLD = 24; // px scrolled before the colors flip light → dark

/* ────────────────────────────────────────────────────────────────────
   Brand icons (inline so we don't depend on lucide's brand icons,
   which are deprecated in newer versions)
──────────────────────────────────────────────────────────────────── */
const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const WhatsappIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ────────────────────────────────────────────────────────────────────
   Dropdown data
──────────────────────────────────────────────────────────────────── */
type DropdownItem = {
  key: string;
  label: string;
  description?: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
  dividerBefore?: boolean;
};

const serviceItems: DropdownItem[] = services.map((service) => {
  const Icon = icons[service.icon];
  return {
    key: service.slug,
    label: service.name,
    description: service.short,
    href: `/services/${service.slug}`,
    icon: Icon ? <Icon size={16} /> : null,
  };
});

const contactItems: DropdownItem[] = [
  {
    key: "contact-us",
    label: "Contact us",
    description: "Send us a message",
    href: "/contact",
    icon: <Mail size={16} />,
  },
  {
    key: "facebook",
    label: "Facebook",
    description: "Follow our page",
    href: SOCIAL_LINKS.facebook,
    icon: <FacebookIcon />,
    external: true,
    dividerBefore: true,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    description: "Connect with us",
    href: SOCIAL_LINKS.linkedin,
    icon: <LinkedinIcon />,
    external: true,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    description: "Chat with us directly",
    href: SOCIAL_LINKS.whatsapp,
    icon: <WhatsappIcon />,
    external: true,
  },
];

/* ────────────────────────────────────────────────────────────────────
   Glass surface (Apple-style frosted panel)
   - bg-white/65 + backdrop-blur + saturate = the frosted look
   - inset highlight + hairline ring = the "edge of the glass"
   NOTE: don't put clip-path / filter / opacity<1 on any *parent* of this
   element, or the browser stops blurring what's behind it.
──────────────────────────────────────────────────────────────────── */
/* ════════════════════════════════════════════════════════════════════
   🎨 DROPDOWN STYLES — edit everything about the dropdown look here.
   Each key is the className of one part (Services + Contact share it).
   ════════════════════════════════════════════════════════════════════ */
const DD = {
  // The glass panel itself: fill, blur, border, shadow.
  //   fill   → bg-white/65  (try bg-black/40 for dark glass)
  //   blur   → backdrop-blur-2xl  (xl / 3xl for less / more)
  //   colors → backdrop-saturate-150 (higher = more vivid, "Apple" feel)
  panel:
    "relative overflow-hidden rounded-2xl border border-white/50 bg-white/65 ring-1 ring-black/[0.06] " +
    "backdrop-blur-2xl backdrop-saturate-150 " +
    "shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.7)]",

  // Soft light streak across the glass (plain CSS gradient, not a class)
  sheen:
    "linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.12) 100%)",

  // Padding / spacing around the rows
  list: "relative flex flex-col gap-0.5 p-2",

  // One row (link) — hover background lives here
  row:
    "group flex items-center gap-3 rounded-xl p-2.5 outline-none transition-colors duration-300 " +
    "hover:bg-black/[0.06] focus-visible:bg-black/[0.06]",

  // Round icon badge on the left
  iconWrap:
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/50 text-accent " +
    "transition-transform duration-300 group-hover:scale-105",

  // Wrapper around label + description (nudges right on hover)
  textWrap: "flex-1 transition-transform duration-300 group-hover:translate-x-0.5",

  // Label text (gets the slide-up hover effect)
  label: "block text-sm font-medium text-black",

  // Small grey line under the label
  description: "mt-0.5 block text-xs text-black/55",

  // ↗ arrow on the right (fades in on hover)
  arrow:
    "shrink-0 -translate-x-1 text-accent opacity-0 transition-all duration-300 " +
    "group-hover:translate-x-0 group-hover:opacity-100",

  // Line between "Contact us" and the socials
  divider: "mx-2.5 my-1 h-px bg-black/10",
};

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

/**
 * Reusable hover dropdown with a glass panel.
 *
 * Structure (each layer has ONE job so nothing fights over `transform`):
 *   wrapper      → hover / focus / outside-click detection
 *   positioner   → Tailwind positioning + hover bridge (pt-3) + pointer-events
 *   panel        → GSAP animates opacity / y / scale here, glass styling lives here
 *   rows         → GSAP staggers y / opacity here
 */
function NavDropdown({
  items,
  widthClass,
  align = "center",
  disabled = false,
  label,
  trigger,
}: {
  items: DropdownItem[];
  widthClass: string;
  align?: "center" | "right";
  disabled?: boolean;
  label: string;
  trigger: (state: { open: boolean; toggle: () => void }) => ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const positionerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const origin = align === "right" ? "85% 0%" : "50% 0%";
  const alignClass = align === "right" ? "right-0" : "left-1/2 -translate-x-1/2";

  const openMenu = () => {
    if (disabled) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  // Close on route change, when the navbar hides, and on unmount cleanup
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  // Initial closed pose (before first paint)
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    gsap.set(panel, { autoAlpha: 0, y: -10, scale: 0.96, transformOrigin: origin });
  }, [origin]);

  // Open / close animation
  useEffect(() => {
    const positioner = positionerRef.current;
    const panel = panelRef.current;
    if (!positioner || !panel) return;

    const rows = panel.querySelectorAll("[data-dd-item]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(positioner, { pointerEvents: open ? "auto" : "none" });

    if (reduce) {
      gsap.set(panel, { autoAlpha: open ? 1 : 0, y: 0, scale: 1 });
      gsap.set(rows, { opacity: open ? 1 : 0, y: 0 });
      return;
    }

    if (open) {
      gsap.to(panel, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.fromTo(
        rows,
        { y: -10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.05,
          delay: 0.08,
          overwrite: true,
        }
      );
    } else {
      gsap.to(rows, { y: -6, opacity: 0, duration: 0.15, ease: "power2.in", overwrite: true });
      gsap.to(panel, {
        autoAlpha: 0,
        y: -8,
        scale: 0.97,
        duration: 0.28,
        ease: "power2.inOut",
        overwrite: true,
      });
    }
  }, [open]);

  // Escape to close + click / tap outside
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      // Keyboard users: open when focus arrives via Tab (not on mouse click,
      // otherwise click-to-toggle would immediately re-close it).
      onFocus={(e) => {
        if ((e.target as HTMLElement).matches(":focus-visible")) openMenu();
      }}
      onBlur={(e) => {
        if (!wrapperRef.current?.contains(e.relatedTarget as Node | null)) scheduleClose();
      }}
    >
      {trigger({ open, toggle: () => setOpen((v) => !v) })}

      <div
        ref={positionerRef}
        className={`absolute top-full z-10 pt-3 ${widthClass} ${alignClass}`}
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={panelRef}
          role="menu"
          aria-label={label}
          className={DD.panel}
          style={{ opacity: 0, visibility: "hidden" }}
        >
          {/* soft top-left sheen — sells the "glass" */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ background: DD.sheen }}
          />

          <div className={DD.list}>
            {items.map((item) => {
              const content = (
                <>
                  <span className={DD.iconWrap}>{item.icon}</span>
                  <span className={DD.textWrap}>
                    <span className={DD.label}>
                      <SlideText>{item.label}</SlideText>
                    </span>
                    {item.description && <span className={DD.description}>{item.description}</span>}
                  </span>
                  <ArrowUpRight size={14} className={DD.arrow} />
                </>
              );

              return (
                <Fragment key={item.key}>
                  {item.dividerBefore && (
                    <div aria-hidden="true" className={DD.divider} />
                  )}
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      data-dd-item
                      className={DD.row}
                      onClick={() => setOpen(false)}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link href={item.href} role="menuitem" data-dd-item className={DD.row}>
                      {content}
                    </Link>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [reduced, setReduced] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);

  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const centerRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const lastY = useRef(0);
  const tickingRef = useRef(false);

  // On EVERY page, while the user is at the very top (not scrolled), the bar
  // uses the light variant: light fill, black text/border. As soon as they
  // scroll past SCROLL_THRESHOLD it flips to the dark-pill variant
  // (black fill, white text). Purely a style switch — it doesn't touch the
  // hide/show choreography below.
  const isTop = !scrolled;

  const itemClasses = (active: boolean) => {
    if (active) return "border-accent text-accent";
    return isTop
      ? "border-black text-black hover:border-accent "
      : "border-white text-white hover:border-accent ";
  };
  const itemFillClass = isTop ? "bg-[#E4E2DD]" : "bg-black";
  const iconButtonClasses = isTop
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
      setScrolled(y > SCROLL_THRESHOLD);

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

  // ── Close mobile menu on route change ─────────────────────────────
  useEffect(() => {
    setOpen(false);
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

  const isServicesActive = pathname.startsWith("/services");

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 md:px-[5.5vw] py-5">
        {/* LEFT — logo */}
        <Link
          ref={logoRef}
          href="/"
          className="flex w-fit items-center justify-self-start"
          aria-label="TechOf Solution home"
        >
          <Image src="/Img/logo2.png" alt="TechOf Solution" width={200} height={34} priority />
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
                <NavDropdown
                  key={item.href}
                  items={serviceItems}
                  widthClass="w-[380px]"
                  align="center"
                  disabled={hidden}
                  label="Services"
                  trigger={({ open: dropdownOpen, toggle }) => (
                    <button
                      onClick={toggle}
                      aria-haspopup="menu"
                      aria-expanded={dropdownOpen}
                      className={`group flex items-center gap-1.5 rounded-sm border px-4 py-[10px] text-sm font-semibold uppercase tracking-wide transition-colors duration-500 ${itemFillClass} ${itemClasses(
                        active || isServicesActive
                      )}`}
                    >
                      <SlideText>{item.label}</SlideText>
                      <ChevronDown
                        size={14}
                        className={`shrink-0 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                />
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
            <NavDropdown
              items={contactItems}
              widthClass="w-[280px]"
              align="right"
              disabled={hidden}
              label="Contact options"
              trigger={({ open: dropdownOpen }) => (
                <Link
                  href="/contact"
                  aria-haspopup="menu"
                  aria-expanded={dropdownOpen}
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
              )}
            />
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