import Reveal from "@/components/Reveal";

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="content-shell pt-40 pb-16 md:pt-52 md:pb-20">
      <Reveal>
        <p className="text-xl text-accent mb-5">{eyebrow}</p>
        <h1 className="max-w-3xl text-5xl sm:text-6xl md:text-7xl font-dm-sans font-semibold leading-[1.02] text-balance">
          {title}
        </h1>
        {description && <p className="mt-6 max-w-3xl text-lg  text-fg-dim">{description}</p>}
      </Reveal>
    </section>
  );
}
