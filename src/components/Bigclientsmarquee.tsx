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
    <section className="pt-15 section-light">
     <div className="">
      <section className="relative isolate overflow-hidden border-y  border-white/10 bg-white py-3  ">
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
            className="group mx-2 flex h-20 w-40 shrink-0 items-center justify-center rounded-xl 10  p-4 transition-all duration-500 ease-out hover:border-white/30 hover:bg-white/[0.08] sm:rounded-2xl "
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={240}
              height={120}
              draggable={false}
              className="h-full w-full  object-contain transition-opacity duration-500 ease-out"
            />
          </div>
        ))}
      </Marquee>
    </section></div> 
    </section>
  );
}