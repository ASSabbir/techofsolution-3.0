import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function ServiceHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-32">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
      </div>

      <div className="content-shell relative pb-16 md:pb-24">
        <Reveal>
          <p className="text-xl text-accent mb-5">{eyebrow}</p>
          <h1 className="max-w-3xl text-5xl sm:text-6xl md:text-8xl font-dm-sans font-semibold leading-[1.02] text-balance">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-fg-dim">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
