"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type Meeting = {
  src: string;
  caption?: string;
};

/**
 * 3-up "conveyor" carousel: always shows 3 cards, center one bigger/taller
 * than the two sides, auto-advances right-to-left on a timer. Built with
 * Framer Motion's `layout` prop — when the window shifts by one, cards
 * that stay visible animate to their new slot (center -> left, right ->
 * center) automatically; the card that falls off the left edge exits,
 * and a new one slides in from the right.
 */
export default function MeetingsCarousel({ slides }: { slides: Meeting[] }) {
  const [tick, setTick] = useState(0);
  const n = slides?.length || 0;

  useEffect(() => {
    if (n <= 1) return;
    const interval = setInterval(() => {
      setTick((v) => v + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [n]);

  if (!slides || n === 0) return null;

  const positions = [0, 1, 2].map((offset) => tick + offset);

  return (
    <div>
      <div className="flex items-end justify-center gap-4 md:gap-6">
        <AnimatePresence initial={false} mode="popLayout">
          {positions.map((pos, slot) => {
            const slide = slides[pos % n];
            const isCenter = slot === 1;

            return (
              <motion.div
                key={pos}
                layout
                initial={{ opacity: 0, x: 80, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -80, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-lg overflow-hidden border border-line shrink-0 ${
                  isCenter
                    ? "w-[42%] md:w-[34%] h-[280px] md:h-[380px] z-20"
                    : "hidden sm:block w-[29%] md:w-[26%] h-[220px] md:h-[300px] z-10 opacity-80"
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.caption || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 40vw, 34vw"
                />

                {slide.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 md:p-5">
                    <p className="text-white font-medium text-sm md:text-base">
                      {slide.caption}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dots — one per item in the full set */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Jump to item ${i + 1}`}
            onClick={() => setTick(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === tick % n ? "w-6 bg-aqua" : "w-2 bg-line-strong hover:bg-fg-dim"
            }`}
          />
        ))}
      </div>
    </div>
  );
}