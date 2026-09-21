"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/lib/data/site";

gsap.registerPlugin(ScrollTrigger);

export default function StatsBand() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = el.querySelectorAll<HTMLElement>("[data-count]");

    const ctx = gsap.context(() => {
      nodes.forEach((node) => {
        const target = parseFloat(node.dataset.count || "0");
        const decimal = node.dataset.decimal === "true";
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: node,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                node.textContent = decimal ? obj.val.toFixed(1) : Math.round(obj.val).toString();
              },
            });
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="border-y border-line section">
      <div className="content-shell grid grid-cols-2 gap-8 py-16 md:grid-cols-4 md:py-20">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center justify-center">
            <p className="font-dm-sans text-4xl text-aq font-semibold sm:text-5xl md:text-6xl">
              <span data-count={s.value} data-decimal={s.decimal ? "true" : "false"}>
                0
              </span>
              {s.suffix}
            </p>
            <p className="mt-2 text-xl text-center text-accent">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
