import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/Reveal";

type Capability = { title: string; detail: string; image: string; bullets: string[] };

export default function CapabilityRows({ items }: { items: Capability[] }) {
  return (
    <div className="space-y-16 md:space-y-24">
      {items.map((item, i) => {
        const reversed = i % 2 === 1;
        return (
          <Reveal
            key={item.title}
            className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${reversed ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>
            <div>
              <span className="font-display text-3xl text-accent">0{i + 1}</span>
              <h3 className="mt-7 font-display text-2xl font-semibold sm:text-5xl">{item.title}</h3>
              <p className="mt-10 max-w-md text-xl text-fg-dim">{item.detail}</p>

              <ul className="mt-5 space-y-2.5">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-lg text-fg-dim">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}