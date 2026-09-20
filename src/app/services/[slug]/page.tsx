import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Globe, Cpu, FlaskConical, Layers, BarChart3, ArrowUpRight, type LucideIcon } from "lucide-react";
import ServiceHero from "@/components/ServiceHero";
import Reveal from "@/components/Reveal";
import TechMarquee from "@/components/TechMarquee";
import IndustriesStrip from "@/components/IndustriesStrip";
import ClientsMarquee from "@/components/ClientsMarquee";
import CapabilityRows from "@/components/CapabilityRows";
import ProcessSteps from "@/components/ProcessSteps";
import FaqAccordion from "@/components/FaqAccordion";
import { services, getService } from "@/lib/data/services";
import AnimatedGridBackground from "@/components/Animatedgridbackground";
// import LightLines from "@/components/temp/temp";

const icons: Record<string, LucideIcon> = {
  globe: Globe,
  cpu: Cpu,
  flask: FlaskConical,
  layers: Layers,
  chart: BarChart3,
};

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} — Services`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return notFound();

  const Icon = icons[service.icon];
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <ServiceHero
        eyebrow="Services"
        title={service.name}
        description={service.summary}
        image={service.heroImage}
      />


      {/* What we do */}
      <section className="black-section">
        <AnimatedGridBackground></AnimatedGridBackground>
        <div className="content-shell py-20 md:py-28">
          <Reveal className="mb-12 flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line-strong text-accent">
              <Icon size={30} />
            </span>
            <h2 className="font-display text-3xl font-semibold font-dm-sans sm:text-6xl">What we do</h2>
          </Reveal>

          <Reveal stagger={0.08} className="grid gap-4 overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 ">
            {service.offerings.map((offering) => (
              <div key={offering.title} className="bg-surface glass-card p-8">
                <h3 className="font-display text-2xl font-dm font-semibold">{offering.title}</h3>
                <p className="mt-3 text-xl text-gray-500">{offering.detail}</p>
              </div>
            ))}
          </Reveal>

          {/* <Reveal className="mt-14 max-w-2xl space-y-5 text-fg-dim">
          {service.description.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal> */}
        </div>
      </section>



      {/* Industries + who we work with */}
      <section className="section-light">
        <div className="content-shell grid gap-14 py-20 md:grid-cols-2 md:py-40">
          <Reveal>
            <p className="text-xl text-aqua mb-10">Industries we serve</p>
            <h2 className="mb-15 font-display text-3xl font-semibold sm:text-5xl">
              Built for regulated, high-stakes environments.
            </h2>
            <IndustriesStrip industries={service.industries} />
          </Reveal>
          <Reveal>
            <p className="text-xl text-aqua mb-10">Who we work with</p>
            <h2 className="mb-15 font-display text-3xl font-semibold sm:text-5xl">
              Trusted across seven countries.
            </h2>
            <ClientsMarquee />
          </Reveal>
        </div>
      </section>
      

      {/* Capabilities */}
      <section className="black-section">
        <AnimatedGridBackground></AnimatedGridBackground>
        <CapabilityRows items={service.capabilities} eyebrow="Why choose us" title="Our capabilities" />
      </section>
      {/* Technologies */}
      <div className="section-light">

        <section className="border-y max-w-7xl mx-auto  py-28">
          <div className="content-shell mb-16">
            <p className="text-xl text-aqua">Technology we use</p>
          </div>
          <TechMarquee items={service.stack} />
        </section>
      </div>

      {/* Process */}
      <section className="black-section">
        <AnimatedGridBackground></AnimatedGridBackground>
        <div className="content-shell border-t border-line py-20 md:py-28">
          <Reveal className="max-w-xl pb-14">
            <h2 className="font-display text-3xl font-semibold sm:text-6xl">How we work</h2>
          </Reveal>
          <ProcessSteps steps={service.process} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-light">
        <div className="content-shell py-20 md:py-28">
          <Reveal className="max-w-xl mb-8">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Frequently asked</h2>
          </Reveal>
          <FaqAccordion items={service.faq} />
        </div>
      </section>

      {/* Related + CTA */}
      <section className="black-section">
        <AnimatedGridBackground></AnimatedGridBackground>
        <div className="content-shell py-20 md:py-28">
          <Reveal className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Other services</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="glass-card  rounded-md border border-line p-6 transition-colors hover:border-accent"
              >
                <p className="font-display font-semibold">{s.name}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent">
                  View <ArrowUpRight size={13} className="" />
                </span>
              </Link>
            ))}
          </div>

          <Reveal className="mt-16 glass-card rounded-lg border border-line bg-surface p-8 text-center md:p-14">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Ready to scope your project?</h2>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink"
            >
              Start a project <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
