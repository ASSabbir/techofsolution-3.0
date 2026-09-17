"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X, ChevronDown, Globe, Cpu, FlaskConical, Layers, BarChart3, type LucideIcon } from "lucide-react";
import { nav } from "@/lib/data/site";
import { services } from "@/lib/data/services";


const icons: Record<string, LucideIcon> = {
  globe: Globe,
  cpu: Cpu,
  flask: FlaskConical,
  layers: Layers,
  chart: BarChart3,
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const menu = menuRef.current;
    const links = linksRef.current?.querySelectorAll("a");
    if (!menu) return;

    document.body.style.overflow = open ? "hidden" : "";

    if (open) {
      gsap.to(menu, { clipPath: "circle(150% at 100% 0%)", duration: 0.7, ease: "power3.inOut" });
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

  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;
    if (servicesOpen) {
      gsap.set(el, { display: "block" });
      gsap.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" });
    } else {
      gsap.to(el, {
        opacity: 0,
        y: 8,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [servicesOpen]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-ink/80 backdrop-blur-xl border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="content-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="TechOf Solution home">
          <Image src="/Img/logo.png" alt="TechOf Solution" width={34} height={34} priority />
          <span className="font- text-lg font-semibold ">TechOf Solution</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const isServices = item.label === "Services";

            if (isServices) {
              return (
                <div key={item.href} className="relative" onMouseEnter={openServices} onMouseLeave={scheduleClose}>
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1.5 text-[15px] transition-colors ${
                      active ? "text-fg" : "text-white hover:text-fg"
                    }`}
                  >
                    {item.label}
                    <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                    {active && <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent" aria-hidden="true" />}
                  </Link>

                  <div
                    ref={dropdownRef}
                    className="absolute left-1/2 top-full hidden w-[380px] -translate-x-1/2 pt-4"
                    style={{ opacity: 0 }}
                  >
                    <div className="flex flex-col gap-0.5 rounded-lg border border-line-strong bg-surface p-3 shadow-2xl">
                      {services.map((service) => {
                        const Icon = icons[service.icon];
                        return (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="group flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-surface-2"
                          >
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-accent">
                              <Icon size={16} />
                            </span>
                            <span>
                              <span className="block text-sm font-medium text-fg">{service.name}</span>
                              <span className="mt-0.5 block text-xs text-white">{service.short}</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[15px] transition-colors ${
                  active ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Start a project
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="lg:hidden relative z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-line-strong"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        ref={menuRef}
        className="lg:hidden fixed inset-0 h-dvh w-full overflow-y-auto bg-ink flex flex-col items-center justify-center gap-8 py-24"
        style={{ clipPath: "circle(0% at 100% 0%)" }}
      >
        <div ref={linksRef} className="flex w-full flex-col items-center gap-7 px-8">
          {nav.map((item) =>
            item.label === "Services" ? (
              <div key={item.href} className="flex flex-col items-center gap-5">
                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex items-center gap-2 font-display text-3xl"
                >
                  {item.label}
                  <ChevronDown size={22} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
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
              <Link key={item.href} href={item.href} className="font-display text-3xl">
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="mt-4 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink"
          >
            Start a project
          </Link>
        </div>
      </div>
    </header>
  );
}
