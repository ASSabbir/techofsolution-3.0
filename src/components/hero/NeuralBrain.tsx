"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import BrainScene from "./BrainScene";
import AmbientGlow from "./AmbientGlow";

export default function NeuralBrain() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollT = useRef(0);
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // 0 at the top of the hero, 1 once it has scrolled fully past.
      const progress = THREE_clamp((viewportH - rect.top) / (viewportH + rect.height), 0, 1);
      scrollT.current = progress;
      wrapper.style.setProperty("--brain-fade", String(1 - progress * 0.9));
    };

    function THREE_clamp(v: number, min: number, max: number) {
      return Math.min(max, Math.max(min, v));
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      media.removeEventListener("change", onChange);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] md:block lg:w-[38%]"
      style={{ opacity: "var(--brain-fade, 1)" }}
    >
      <AmbientGlow />
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 6.4], fov: 32 }}
        style={{ pointerEvents: "none" }}
      >
        <BrainScene reduced={reduced} mouse={mouse} scrollT={scrollT} />
      </Canvas>
    </div>
  );
}