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
    <section className="content-shell bg- pt-30 pb-16  md:pb-20">
      <Reveal>
        <p className="text-xl text-aqua mb-5">{eyebrow}</p>
        <h1 className=" text-5xl sm:text-6xl md:text-8xl font-dm-sans font-semibold leading-[1.02] trackin text-balance">
          {/* Experience <span className="text-aqua">Driven</span> Innovation. */}
          {title}
        </h1>
        {description && <p className="mt-6 max-w-3xl text-xl  text-gray-800">{description}</p>}
      </Reveal>
    </section>
  );
}
