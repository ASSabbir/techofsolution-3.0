import Reveal from "@/components/Reveal";

export default function IndustriesStrip({ industries }: { industries: string[] }) {
  return (
    <Reveal stagger={0.06} className="flex flex-wrap gap-3">
      {industries.map((industry) => (
        <span
          key={industry}
          className="rounded-full bg-aqua px-5 py-2.5 text-sm text-white"
        >
          {industry}
        </span>
      ))}
    </Reveal>
  );
}
