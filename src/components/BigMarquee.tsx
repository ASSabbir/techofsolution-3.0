"use client";

import Marquee from "react-fast-marquee";
import { ChevronsRight } from "lucide-react";

export default function BigMarquee({ label, direction = "left" }: { label: string; direction?: "left" | "right" }) {
  return (
    <div className="border-y border-line py-6" aria-hidden="true">
      <Marquee speed={45} direction={direction} gradient={false} className="edge-fade">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="mx-10 flex items-center gap-8 whitespace-nowrap font-display text-6xl font-semibold tracking-tight text-fg md:text-7xl lg:text-9xl py-5"
          >
            {label}
            <ChevronsRight className="text-accent rotate-180"  size={200} />
          </span>
        ))}
      </Marquee>
    </div>
  );
}