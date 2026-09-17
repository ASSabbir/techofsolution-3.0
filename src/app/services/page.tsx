import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Globe, Cpu, FlaskConical, Layers, BarChart3, ArrowUpRight, type LucideIcon } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services — Web, AI/ML, Data Analytics, Research & Software",
  description:
    "Explore TechOf Solution's services: business websites and e-commerce, AI and machine learning systems, data analytics and BI, research and academic engineering, and custom business software.",
  alternates: { canonical: "/services" },
};

const icons: Record<string, LucideIcon> = {
  globe: Globe,
  cpu: Cpu,
  flask: FlaskConical,
  layers: Layers,
  chart: BarChart3,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Five disciplines. One accountable team."
        description="We don't hand you off between departments. The people who scope your project are the people who build it."
      />

      <section className="content-shell space-y-16 pb-24 md:space-y-24 md:pb-32">
        {services.map((service) => {
          const Icon = icons[service.icon];
          return (
            <Reveal
              key={service.slug}
              as="article"
              className="grid gap-8 border-t border-line pt-10 md:grid-cols-[280px_1fr] md:gap-16 md:pt-16"
            >
              <div>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative block aspect-video overflow-hidden rounded-md bg-surface"
                >
                  <Image
                    src={service.previewImage}
                    alt={`${service.name} cover`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="280px"
                  />
                </Link>
                <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-accent">
                  <Icon size={20} />
                </div>
                <h2 className="mt-6 font-display text-3xl font-semibold md:text-4xl">{service.name}</h2>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
                >
                  Full details <ArrowUpRight size={14} />
                </Link>
              </div>

              <div>
                <p className="max-w-2xl text-lg text-fg-dim">{service.summary}</p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-faint mb-3">What we deliver</p>
                    <ul className="space-y-2 text-sm text-fg-dim">
                      {service.offerings.map((d) => (
                        <li key={d.title} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {d.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-faint mb-3">Typical stack</p>
                    <div className="flex flex-wrap gap-2">
                      {service.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-line-strong px-3 py-1 text-xs text-fg-dim"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      <section className="content-shell border-t border-line py-20 text-center md:py-28">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Not sure which service fits your project?
          </h2>
          <p className="mt-4 text-fg-dim">Tell us what you&rsquo;re building — we&rsquo;ll help you scope it.</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink"
          >
            Start a conversation <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
