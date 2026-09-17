import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

export default function FeaturedWork() {
  const featured = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="content-shell py-24 md:py-32">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xl font-dm-sans text-accent mb-4">Selected work</p>
          <h2 className="max-w-xl text-4xl sm:text-5xl md:text-6xl font-dm-sans font-semibold text-balance">
            We build. They grow.
          </h2>
        </div>
        <Link
          href="/works"
          className="inline-flex items-center gap-2 self-start rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent md:self-auto"
        >
          View all work <ArrowUpRight size={15} />
        </Link>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.title} project={project} className="md:min-h-[24rem]" />
        ))}
      </div>
    </section>
  );
}