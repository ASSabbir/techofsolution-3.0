"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data/services";
import img1 from "../../public/Img/service/web2.webp";
import img2 from "../../public/Img/service/sof2.webp";
import img3 from "../../public/Img/service/ai.png";
import img4 from "../../public/Img/service/re.png";
import img5 from "../../public/Img/service/data.png";

// Order must match the services array — services[0] gets serviceImages[0], etc.
const serviceImages = [img1, img2, img3, img4, img5];

// How quickly the preview catches up with its target (0–1, higher = snappier).
const FOLLOW_LERP = 0.14;
// Max tilt (degrees) while the preview lags behind.
const MAX_TILT = 10;
// The image only travels 1/3 of the cursor's horizontal distance from the
// center of the list. Vertical movement follows the cursor 1:1.
const X_DIVISOR = 3;

// Row background slide
const BG_IN_DURATION = 1;
const BG_OUT_DURATION = 0.55;
const BG_EASE = "power4.out";

export default function ServicesShowcase() {
  const [active, setActive] = useState<number | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shownRef = useRef<number | null>(null);
  const reduceMotion = useRef(false);

  // Raw cursor position, smoothed render position, and the list's horizontal center
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const centerX = useRef(0);

  // Slowed horizontal target: measured from the middle of the list
  const targetX = (mx: number) => centerX.current + (mx - centerX.current) / X_DIVISOR;

  // ---- Setup: initial states + smooth-follow ticker ----
  useEffect(() => {
    const wrap = previewRef.current;
    if (!wrap) return;

    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(wrap, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.8 });
    gsap.set(layerRefs.current, { autoAlpha: 0 });
    gsap.set(bgRefs.current, { scaleY: 0, transformOrigin: "50% 100%" });

    const setX = gsap.quickSetter(wrap, "x", "px");
    const setY = gsap.quickSetter(wrap, "y", "px");
    const setRot = gsap.quickSetter(wrap, "rotation", "deg");

    const tick = () => {
      // Frame-rate independent easing
      const ease = reduceMotion.current
        ? 1
        : 1 - Math.pow(1 - FOLLOW_LERP, gsap.ticker.deltaRatio());

      const tx = targetX(mouse.current.x);
      const ty = mouse.current.y;
      const dx = tx - pos.current.x;
      const dy = ty - pos.current.y;

      pos.current.x += dx * ease;
      pos.current.y += dy * ease;

      setX(pos.current.x);
      setY(pos.current.y);
      setRot(reduceMotion.current ? 0 : gsap.utils.clamp(-MAX_TILT, MAX_TILT, dx * 0.08));
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      gsap.killTweensOf(wrap);
      gsap.killTweensOf(titleRefs.current);
      gsap.killTweensOf(bgRefs.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Image swap: no animation, the new image is simply placed on top ----
  const showLayer = (next: number) => {
    layerRefs.current.forEach((layer, idx) => {
      if (layer) gsap.set(layer, { autoAlpha: idx === next ? 1 : 0 });
    });
  };

  // ---- Title shift (GSAP so it's smooth) ----
  const shiftTitle = (i: number, x: number, duration: number) => {
    const title = titleRefs.current[i];
    if (!title) return;
    gsap.to(title, {
      // x: reduceMotion.current ? 0 : x,
      duration: reduceMotion.current ? 0 : duration,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  // ---- Background: slides up from the bottom to cover the row ----
  const showBg = (i: number) => {
    const el = bgRefs.current[i];
    if (!el) return;
    // Only flip the origin when the layer is (almost) hidden, so there is never a visual jump
    if ((gsap.getProperty(el, "scaleY") as number) < 0.02) {
      gsap.set(el, { transformOrigin: "50% 100%" });
    }
    gsap.to(el, {
      scaleY: 1,
      duration: reduceMotion.current ? 0 : BG_IN_DURATION,
      ease: BG_EASE,
      overwrite: "auto",
    });
  };

  // ---- ...and continues upward out of the row when the cursor moves away ----
  const hideBg = (i: number) => {
    const el = bgRefs.current[i];
    if (!el) return;
    if ((gsap.getProperty(el, "scaleY") as number) > 0.98) {
      gsap.set(el, { transformOrigin: "50% 0%" });
    }
    gsap.to(el, {
      scaleY: 0,
      duration: reduceMotion.current ? 0 : BG_OUT_DURATION,
      ease: BG_EASE,
      overwrite: "auto",
    });
  };

  // ---- Tags: slide in from the left with a small stagger ----
  const showTags = (i: number) => {
    const wrap = tagRefs.current[i];
    if (!wrap) return;
    const rm = reduceMotion.current;
    const tags = Array.from(wrap.querySelectorAll("[data-tag]"));

    gsap.killTweensOf(tags);
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

  const hideTags = (i: number) => {
    const wrap = tagRefs.current[i];
    if (!wrap) return;
    const rm = reduceMotion.current;
    const tags = Array.from(wrap.querySelectorAll("[data-tag]"));

    gsap.killTweensOf(tags);
    gsap.to(tags, {
      x: rm ? 0 : -12,
      autoAlpha: 0,
      duration: rm ? 0 : 0.25,
      ease: "power2.in",
    });
  };

  // ---- Cursor enters a service row ----
  const enter = (i: number, e: React.MouseEvent) => {
    const wrap = previewRef.current;
    const list = listRef.current;
    if (!wrap || !list) return;

    // Middle of the list block — the image's horizontal anchor
    const rect = list.getBoundingClientRect();
    centerX.current = rect.left + rect.width / 2;

    mouse.current = { x: e.clientX, y: e.clientY };

    const prev = shownRef.current;
    // First appearance: start at the target position instead of flying in
    if (prev === null) pos.current = { x: targetX(e.clientX), y: e.clientY };

    setActive(i);

    if (prev !== i) {
      showLayer(i);
      if (prev !== null) {
        shiftTitle(prev, 0, 0.6);
        hideBg(prev);
      }
      // Safety net: every row except the active one must have its tags hidden
      services.forEach((_, j) => {
        if (j !== i) hideTags(j);
      });
      shiftTitle(i, 28, 0.8);
      showBg(i);
      showTags(i);
      shownRef.current = i;
    }

    gsap.killTweensOf(wrap);
    gsap.to(wrap, {
      autoAlpha: 1,
      scale: 1,
      duration: reduceMotion.current ? 0 : 0.55,
      ease: "power3.out",
    });
  };

  // ---- Cursor leaves the whole list: image disappears ----
  const leave = () => {
    const wrap = previewRef.current;
    setActive(null);
    if (shownRef.current !== null) {
      shiftTitle(shownRef.current, 0, 0.6);
      hideBg(shownRef.current);
    }
    services.forEach((_, j) => hideTags(j));
    shownRef.current = null;
    if (!wrap) return;

    gsap.killTweensOf(wrap);
    gsap.to(wrap, {
      autoAlpha: 0,
      scale: 0.8,
      duration: reduceMotion.current ? 0 : 0.35,
      ease: "power2.in",
    });
  };

  const onMove = (e: React.MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <section className="relative isolate section-light">
      <div className="px-5 py-24 md:px-[6vw] md:py-32">
        <div className="max-w-2xl">
          <p className="mb-4 text-xl text-accent">What we do</p>
          <h2 className="font-dm-sans text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
            Five disciplines, one engineering team.
          </h2>
        </div>

        {/* Hover zone: full-bleed so the row background can span the whole width.
            The negative margins cancel the section padding; rows add it back. */}
        <div
          ref={listRef}
          className="-mx-5 mt-14 border-t border-zinc-200 md:-mx-[6vw]"
          onMouseMove={onMove}
          onMouseLeave={leave}
        >
          {services.map((service, i) => {
            const isActive = active === i;

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onMouseEnter={(e) => enter(i, e)}
                className="group relative flex items-center justify-between gap-6 overflow-hidden border-b border-zinc-200 px-5 py-8 md:px-[6vw] md:py-14"
              >
                {/* Aqua background that slides up and covers the row */}
                <div
                  ref={(el) => {
                    bgRefs.current[i] = el;
                  }}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 bg-aqua will-change-transform"
                  style={{ transform: "scaleY(0)", transformOrigin: "50% 100%" }}
                />

                {/* Number + title: zinc-900 by default, white while active */}
                <div
                  className={`relative z-10 flex items-start gap-5 transition-colors duration-500 ease-out md:items-center md:gap-8 ${
                    isActive ? "text-white" : "text-zinc-900"
                  }`}
                >
                  <span className="pt-1.5 font-display text-xl md:pt-0">0{i + 1}</span>
                  <h3
                    ref={(el) => {
                      titleRefs.current[i] = el;
                    }}
                    className="font-dm text-3xl font-semibold leading-tight will-change-transform sm:text-4xl md:text-5xl"
                  >
                    {service.name}
                  </h3>
                </div>

                {/* Right side: tags (revealed on hover) + arrow button */}
                <div className="relative z-10 flex items-center">
                  {/* Absolutely positioned so the tags never change the row height.
                      Visibility is tied to the active row, so tags can never linger
                      after the cursor leaves — even if a GSAP tween gets interrupted. */}
                  <div
                    ref={(el) => {
                      tagRefs.current[i] = el;
                    }}
                    className={`pointer-events-none absolute inset-y-0 right-full mr-8 hidden w-[30vw] items-center justify-end transition-opacity duration-300 md:flex ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="flex flex-wrap justify-end gap-2">
                      {service.offerings.map((o) => (
                        <span
                          key={o.title}
                          data-tag
                          className="rounded-full border border-white/60 bg-white/10 px-4 py-1 text-sm text-white"
                          style={{ opacity: 0, visibility: "hidden" }}
                        >
                          {o.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow button */}
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full border text-aqua transition-all duration-500 ease-out md:size-14 ${
                      isActive ? "border-white bg-white" : "border-zinc-300 bg-transparent"
                    }`}
                  >
                    <ArrowUpRight
                      size={22}
                      className={`transition-all duration-500 ease-out ${
                        isActive ? "translate-x-0.5 -translate-y-0.5" : ""
                      }`}
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Cursor-following image preview. All service images are stacked here;
          switching just shows the next one on top (no transition). */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-80 top-0 z-30 hidden h-[180px] w-[200px] overflow-hidden rounded-sm shadow-2xl ring-1 ring-black/10 will-change-transform md:block lg:h-[240px] lg:w-[240px]"
      >
        {serviceImages.slice(0, services.length).map((src, i) => (
          <div
            key={i}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="absolute inset-0"
          >
            <Image src={src} alt="" fill sizes="340px" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}