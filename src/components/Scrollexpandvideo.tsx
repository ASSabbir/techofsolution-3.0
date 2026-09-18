"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Stops mobile URL-bar show/hide from triggering full recalculations.
ScrollTrigger.config({ ignoreMobileResize: true });

const DEBUG = false;

interface ScrollExpandVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function ScrollExpandVideo({
  src,
  poster,
  className = "",
}: ScrollExpandVideoProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useLayoutEffect(() => {
    if (reduced) return;
    if (!sectionRef.current || !pinRef.current || !wrapperRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
      },
      (context) => {
        const { isDesktop, isTablet } = (context.conditions ?? {}) as {
          isDesktop: boolean;
          isTablet: boolean;
        };

        const initialScale = isDesktop ? 0.55 : isTablet ? 0.75 : 0.9;
        const scrollDistance = isDesktop ? "130%" : isTablet ? "100%" : "70%";

        // Scale only. No borderRadius animation: it forces a repaint of the
        // video layer on every frame and is the biggest cause of the lag.
        gsap.set(wrapperRef.current, {
          scale: initialScale,
          transformOrigin: "center center",
          force3D: true,
        });

        gsap.to(wrapperRef.current, {
          scale: 1,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: 0.5,
            pin: pinRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: DEBUG,
          },
        });
      }
    );

    return () => mm.revert(); // kills the tweens and ScrollTriggers created above
  }, [reduced]);

  // Re-measure once the page has settled, so trigger positions aren't stale
  // after images/fonts above this section finish loading.
  useEffect(() => {
    if (reduced) return;

    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 500);
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
    };
  }, [reduced]);

  // Pause decoding when the video is nowhere near the viewport.
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(section);
    return () => io.disconnect();
  }, [reduced]);

  if (reduced) {
    return (
      <section className={`relative py-16 ${className}`}>
        <div className="mx-auto w-[90vw] max-w-5xl overflow-hidden rounded-2xl">
          <video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={`relative ${className}`}>
      <div
        ref={pinRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
      >
        <div
          ref={wrapperRef}
          className="absolute inset-0 h-full w-full will-change-transform"
          style={{ backfaceVisibility: "hidden" }}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}