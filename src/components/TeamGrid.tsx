import Image from "next/image";
import { team } from "@/lib/data/team";
import Reveal from "@/components/Reveal";

export default function TeamGrid() {
  return (
    <section className="">
      <div className="content-shell py-24 md:py-32">
        <Reveal className="">
          <p className="text-xl text-accent mb-4">The Minds Behind TechOf</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-dm-sans font-semibold text-balance">

            Experienced specialists turning ideas into  scalable solutions.
          </h2>
        </Reveal>

        <Reveal stagger={0.08} className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-surface">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role} at TechOf Solution`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold leading-tight">{member.name}</h3>
              <p className="text-sm text-muted">{member.role}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
