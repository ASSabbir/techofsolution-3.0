"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { clients } from "@/lib/data/team";

type Props = {
  /** Small accent label above the marquee, e.g. "Our clients". Omit to hide. */
  eyebrow?: string;
  /** Big heading above the marquee. Omit to hide. */
  title?: string;
  direction?: "left" | "right";
  speed?: number;
};

export default function BigClientsMarquee({
  eyebrow,
  title,
  direction = "left",
  speed = 50,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden border-y border-white/10 bg-zinc-950 py-12 sm:py-16 md:py-20 lg:py-24">
      {(eyebrow || title) && (
        <div className="mb-8 px-5 sm:mb-12 md:mb-14 md:px-[6vw] lg:mb-16">
          {eyebrow && (
            <p className="mb-3 text-base text-accent sm:mb-4 sm:text-lg md:text-xl">{eyebrow}</p>
          )}
          {title && (
            <h2 className="max-w-3xl text-balance font-dm-sans text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h2>
          )}
        </div>
      )}

      <Marquee
        speed={speed}
        direction={direction}
        gradient={false}
        className="edge-fade"
      >
        {clients.map((client) => (
          <div
            key={client.name}
            className="group mx-2 flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-500 ease-out hover:border-white/30 hover:bg-white/[0.08] sm:mx-3 sm:h-24 sm:w-48 sm:rounded-2xl sm:p-5 md:mx-4 md:h-32 md:w-64 md:p-8 lg:mx-5 lg:h-40 lg:w-80 lg:p-10 xl:h-35 xl:w-36"
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={240}
              height={120}
              draggable={false}
              className="h-full w-full object-contain transition-opacity duration-500 ease-out"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}