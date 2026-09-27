import Image from "next/image";
import { team } from "@/lib/data/team";
import Reveal from "@/components/Reveal";

const topRowColStart = ["md:col-start-2", "md:col-start-3", "md:col-start-4"];

export default function TeamGrid() {
  return (
    <section className="">
      <div className="content-shell py-24 md:py-32">
        <Reveal className="">
          <p className="text-xl text-accent mb-4">The Minds Behind TechOf</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-dm-sans font-semibold text-balance">
            Creative Minds ,<br/> Technical Excellence.
          </h2>
        </Reveal>
        {/* Row 2 — 4 items */}
        <Reveal stagger={0.08} className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-4">
          {team.slice(0, 4).map((member) => (
            <div key={member.name} className="group">
              <div className="relative aspect-square overflow-hidden rounded-md bg-surface">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role} at TechOf Solution`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <h3 className="mt-6 font-display text-lg md:text-xl text-center font-semibold leading-tight">{member.name}</h3>
              <p className="text-sm md:text-lg text-center text-accent">{member.role}</p>
            </div>
          ))}
        </Reveal>

        {/* Row 1 — 3 items, centered against the 4-col row below */}
        <Reveal stagger={0.08} className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-4">
          {team.slice(4, 8).map((member) => (
            <div key={member.name} className="group">
              <div className="relative aspect-square overflow-hidden rounded-md bg-surface">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role} at TechOf Solution`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <h3 className="mt-6 font-display text-lg md:text-xl text-center font-semibold leading-tight">{member.name}</h3>
              <p className="text-sm md:text-lg text-center text-accent">{member.role}</p>
            </div>
          ))}
        </Reveal>

        
      </div>
    </section>
  );
}