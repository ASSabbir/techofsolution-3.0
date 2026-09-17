"use client";

import { useEffect, useRef } from "react";

/**
 * AnimatedGridBackground
 * -----------------------
 * Minimal black background: 8-10 extremely subtle VERTICAL lines,
 * each permanently carrying ONE independent light stroke that travels
 * the full height of the line, reaches the edge, pauses, then starts
 * another journey (random direction/speed/delay/length).
 *
 * Usage:
 *   <section className="relative overflow-hidden bg-black">
 *     <AnimatedGridBackground />
 *     <div className="relative z-10">...content...</div>
 *   </section>
 *
 * Controls:
 *   <AnimatedGridBackground lineCount={10} speed={1.6} />
 *
 *   lineCount — exact number of vertical lines (default: random 8–10)
 *   speed     — multiplier applied to stroke travel speed (default: 1)
 */

type Track = {
  x: number;
  lineAlpha: number;
  dir: 1 | -1;
  y: number; // current stroke center position
  length: number;
  speed: number; // px per ms (base, before the `speed` multiplier)
  maxOpacity: number;
  state: "traveling" | "waiting";
  waitTimer: number;
  waitDuration: number;
};

const CONFIG = {
  bg: "#050505",
  lineAlphaMin: 0.035,
  lineAlphaMax: 0.07,
  strokeColor: "255,255,255",
  minTracks: 8,
  maxTracks: 10,
};

interface AnimatedGridBackgroundProps {
  /** Exact number of vertical lines. If omitted, picks a random value between 8 and 10. */
  lineCount?: number;
  /** Speed multiplier for the traveling strokes. 1 = default pace, 2 = twice as fast. */
  speed?: number;
}

export default function AnimatedGridBackground({
  lineCount,
  speed = 1,
}: AnimatedGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const speedRef = useRef(speed);
  const lineCountRef = useRef(lineCount);

  // keep latest prop values available inside the rAF loop without re-mounting the effect
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);
  useEffect(() => {
    lineCountRef.current = lineCount;
  }, [lineCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let tracks: Track[] = [];
    let builtCount = 0;
    let lastTime = 0;
    let rafId = 0;
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

    function isMobile() {
      return width < 768;
    }

    function randomLength() {
      return isMobile() ? 50 + Math.random() * 70 : 80 + Math.random() * 100;
    }

    function randomSpeed() {
      // calm, architectural pace but a bit livelier than before
      return (isMobile() ? 0.04 : 0.032) + Math.random() * 0.05;
    }

    function makeTrack(x: number): Track {
      const dir: 1 | -1 = Math.random() > 0.5 ? 1 : -1;
      const length = randomLength();
      const startFraction = 0.08 + Math.random() * 0.84;
      const y = height * startFraction;
      return {
        x,
        lineAlpha:
          CONFIG.lineAlphaMin +
          Math.random() * (CONFIG.lineAlphaMax - CONFIG.lineAlphaMin),
        dir,
        y,
        length,
        speed: randomSpeed(),
        maxOpacity: 0.4 + Math.random() * 0.35,
        state: "traveling",
        waitTimer: 0,
        waitDuration: 0,
      };
    }

    function desiredCount() {
      const explicit = lineCountRef.current;
      if (explicit && explicit > 0) return Math.round(explicit);
      return (
        CONFIG.minTracks +
        Math.floor(Math.random() * (CONFIG.maxTracks - CONFIG.minTracks + 1))
      );
    }

    function buildTracks(force = false) {
      const count = desiredCount();
      if (!force && count === builtCount && tracks.length === count) {
        // just reposition existing tracks on resize, keep their motion state
        repositionTracks(count);
        return;
      }
      builtCount = count;

      const margin = width * 0.06;
      const usable = width - margin * 2;
      const step = usable / (count - 1 || 1);

      const previous = tracks;
      tracks = [];
      for (let i = 0; i < count; i++) {
        const jitter = (Math.random() - 0.5) * step * 0.3;
        const x = Math.round(margin + step * i + jitter) + 0.5;
        const existing = previous[i];
        if (existing) {
          tracks.push({ ...existing, x });
        } else {
          tracks.push(makeTrack(x));
        }
      }
    }

    function repositionTracks(count: number) {
      const margin = width * 0.06;
      const usable = width - margin * 2;
      const step = usable / (count - 1 || 1);
      tracks.forEach((t, i) => {
        const jitter = (Math.random() - 0.5) * step * 0.3;
        t.x = Math.round(margin + step * i + jitter) + 0.5;
      });
    }

    function resize() {
      // Measure the canvas's OWN rendered box (driven by the `absolute inset-0
      // h-full w-full` classes against its nearest positioned ancestor) rather
      // than its immediate DOM parent — a padded/max-width wrapper in between
      // (e.g. a content container) would otherwise report a narrower size than
      // what the canvas is actually stretched to on screen.
      const rect = canvas!.getBoundingClientRect();
      width = Math.ceil(rect.width || window.innerWidth);
      height = Math.ceil(rect.height || window.innerHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      // Intentionally NOT setting canvas.style.width/height here — that would
      // hard-code a pixel size via inline style and silently override the
      // `w-full h-full` Tailwind classes that keep the canvas filling its
      // positioned ancestor on every viewport.
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildTracks();
    }

    function drawStaticLines() {
      ctx!.fillStyle = CONFIG.bg;
      ctx!.fillRect(0, 0, width, height);
      ctx!.lineWidth = 1;
      for (const t of tracks) {
        ctx!.strokeStyle = `rgba(255,255,255,${t.lineAlpha})`;
        ctx!.beginPath();
        ctx!.moveTo(t.x, 0);
        ctx!.lineTo(t.x, height);
        ctx!.stroke();
      }
    }

    function drawStroke(t: Track) {
      if (t.state !== "traveling") return;

      const half = t.length / 2;
      const y0 = t.y - half;
      const y1 = t.y + half;

      if (y1 < 0 || y0 > height) return;

      const grad = ctx!.createLinearGradient(t.x, y0, t.x, y1);
      grad.addColorStop(0, `rgba(${CONFIG.strokeColor},0)`);
      grad.addColorStop(0.5, `rgba(${CONFIG.strokeColor},${t.maxOpacity})`);
      grad.addColorStop(1, `rgba(${CONFIG.strokeColor},0)`);

      ctx!.save();
      ctx!.shadowColor = `rgba(${CONFIG.strokeColor},${t.maxOpacity * 0.85})`;
      ctx!.shadowBlur = 7;
      ctx!.strokeStyle = grad;
      ctx!.lineWidth = 1.4;
      ctx!.beginPath();
      ctx!.moveTo(t.x, y0);
      ctx!.lineTo(t.x, y1);
      ctx!.stroke();
      ctx!.restore();
    }

    function updateTrack(t: Track, dt: number) {
      const mult = speedRef.current || 1;

      if (t.state === "waiting") {
        t.waitTimer += dt;
        if (t.waitTimer >= t.waitDuration) {
          t.dir = Math.random() > 0.5 ? 1 : -1;
          t.length = randomLength();
          t.speed = randomSpeed();
          t.maxOpacity = 0.4 + Math.random() * 0.35;
          t.y = t.dir === 1 ? -t.length / 2 : height + t.length / 2;
          t.state = "traveling";
        }
        return;
      }

      // traveling: move the stroke's center down (dir 1) or up (dir -1)
      t.y += t.speed * mult * dt * t.dir;

      const half = t.length / 2;
      const reachedBottom = t.dir === 1 && t.y - half >= height;
      const reachedTop = t.dir === -1 && t.y + half <= 0;

      if (reachedBottom || reachedTop) {
        t.state = "waiting";
        t.waitTimer = 0;
        t.waitDuration = 600 + Math.random() * 2600;
      }
    }

    function tick(time: number) {
      if (!lastTime) lastTime = time;
      const dt = Math.min(time - lastTime, 48);
      lastTime = time;

      // pick up live lineCount changes without losing existing track motion
      const wanted = lineCountRef.current
        ? Math.round(lineCountRef.current)
        : builtCount;
      if (wanted !== builtCount) {
        buildTracks(true);
      }

      for (const t of tracks) updateTrack(t, dt);

      drawStaticLines();
      for (const t of tracks) drawStroke(t);

      rafId = requestAnimationFrame(tick);
    }

    resize();

    if (prefersReducedMotion) {
      drawStaticLines();
    } else {
      rafId = requestAnimationFrame(tick);
    }

    function handleResize() {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        if (prefersReducedMotion) drawStaticLines();
      }, 150);
    }

    window.addEventListener("resize", handleResize);

    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => {
      cancelAnimationFrame(rafId);
      if (motionMedia.matches) {
        drawStaticLines();
      } else {
        lastTime = 0;
        rafId = requestAnimationFrame(tick);
      }
    };
    motionMedia.addEventListener?.("change", handleMotionChange);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      motionMedia.removeEventListener?.("change", handleMotionChange);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}