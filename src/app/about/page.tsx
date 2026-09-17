import type { Metadata } from "next";
import Image from "next/image";
import { HeartHandshake, Compass, Layers3, Handshake, TrendingUp } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import FlightPath from "@/components/FlightPath";
import StatsBand from "@/components/StatsBand";
import { team } from "@/lib/data/team";
import { site } from "@/lib/data/site";
import MeetingsCarousel from "@/components/MeetingsCarousel";

export const metadata: Metadata = {
  title: "About TechOf Solution — Our Story, Mission & Team",
  description:
    "TechOf Solution is a Dhaka-based technology studio building web, software, AI/ML and research systems. Learn about our mission, values and the team behind the work.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: HeartHandshake, title: "Customer-caring", body: "Every solution starts with a person, not a spec sheet. We build for outcomes, not deliverables checklists." },
  { icon: Compass, title: "Perfection-craving", body: "Good enough never is. We hold every deliverable to a standard we'd be proud to put our name on." },
  { icon: Layers3, title: "Boundary-breaking", body: "We treat AI, automation and research as ground to explore, not obligations to satisfy." },
  { icon: Handshake, title: "Trust-driven", body: "Integrity isn't a policy for us. It's the default we build every relationship on." },
  { icon: TrendingUp, title: "Growth-chasing", body: "We stay students of the craft, always learning and levelling up alongside the tools we use." },
];
const experience = [
  { title: "Founder & CEO", company: "TechOf Solution", period: "Jul 2026 – Present · 3 mos" },
  { title: "Chief Executive Officer", company: "Radiant Communications Ltd.", period: "Nov 2024 – Present · 1 yr 11 mos" },
  { title: "Founder & CEO", company: "TER Infotech (Full-time)", period: "Jan 2024 – Jun 2026 · 2 yrs 6 mos" },
  { title: "Director", company: "Dhaka Chamber of Commerce and Industry", period: "Dec 2021 – Dec 2024 · 3 yrs 1 mo" },
  { title: "Sr. Vice President ", company: "Dhaka Chamber of Commerce and Industry", period: "Dec 2022 – Dec 2023 · 1 yr 1 mo" },
  // { title: "Convenor, IT, ICT, Telecom & 4th IR Technology Standing Committee – 2021", company: "Dhaka Chamber of Commerce and Industry", period: "Jan 2021 – Dec 2021 · 1 yr" },
  // { title: "Joint Convenor, ICT and Telecom Standing Committee – 2020", company: "Dhaka Chamber of Commerce and Industry", period: "Jan 2020 – Dec 2020 · 1 yr" },
  // { title: "Joint Convenor, ICT and Telecom Standing Committee – 2019", company: "Dhaka Chamber of Commerce and Industry", period: "Jan 2019 – Dec 2019 · 1 yr" },
  // { title: "Joint Convenor, Telecom, ICT and IP Rights Standing Committee – 2018", company: "Dhaka Chamber of Commerce and Industry", period: "Jan 2018 – Dec 2018 · 1 yr" },
  { title: "Managing Director", company: "BDCOM Online Ltd.", period: "Mar 2012 – Dec 2023 · 11 yrs 10 mos" },
  // { title: "Chief Operating Officer", company: "BDCOM Online Ltd.", period: "Nov 2011 – Mar 2012 · 5 mos" },
  // { title: "Chief Operating Officer (COO)", company: "BDCOM Online Ltd.", period: "Nov 2010 – Mar 2012 · 1 yr 5 mos" },
  // { title: "Director of Marketing Operations", company: "BDCOM Online Ltd.", period: "Feb 2010 – Oct 2011 · 1 yr 9 mos" },
  { title: "Executive Director, Sales & Marketing", company: "BDCOM Online Ltd.", period: "Feb 2010 – Nov 2010 · 10 mos" },
  { title: "Chief Operating Officer", company: "ALAP Communication Ltd.", period: "Feb 2007 – Jan 2010 · 3 yrs" },
];
export const meetings = [
  { src: "/Img/atik_al_sabbir.webp", caption: "Kickoff — aligning on scope and goals" },
  { src: "/Img/atik_al_sabbir_with_bix.webp", caption: "Design review with the client team" },
  { src: "/Img/13.webp", caption: "Working session — problem-solving together" },
  { src: "/Img/21.jpg", caption: "Progress walkthrough before launch" },
  { src: "/Img/sabbir.webp", caption: "Post-launch check-in" },
];

const achievementImages = [
  "/Img/5.png",
  "/Img/6.webp",
  "/Img/sd.webp",

];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Tech Of Solutions"
        title="Built with experience. Driven by innovation."
        description="Tech Of Solutions is a technology company focused on building high-performance websites, software systems, AI solutions, and digital products that solve real business challenges. We combine thoughtful strategy, modern engineering, and purposeful design to turn complex ideas into reliable digital solutions."
      />

      {/* <section className="content-shell pb-24 md:pb-32">
        <Reveal>
          <FlightPath className="h-24 w-full max-w-xl md:h-28" />
        </Reveal>
      </section> */}

      <div className="section-light">
        <section className="content-shell  grid gap-10 border-t border-line py-20 md:grid-cols-2 md:py-28">
          <Reveal className="rounded-lg border border-line bg-surface p-8 md:p-10">
            <h2 className="font-dm-sans text-3xl font-semibold text-aqua">Mission</h2>
            <p className="mt-4 text-fg-dim text-xl">
              To empower people and businesses with transformative, intelligent
              and future-ready digital solutions, delivered through disciplined
              engineering and genuine partnership.
            </p>
            <ul className="mt-6 space-y-3 text-lg marker:text-aqua list-disc list-inside  text-fg-dim">
              <li>Deliver reliable, high-quality products tailored to client success.</li>
              <li>Advance applied work in AI, data science and automation.</li>
              <li>Support sustainable, ethical ways of building software.</li>
              <li>Build long-term partnerships across borders.</li>
            </ul>
          </Reveal>
          <Reveal className="rounded-lg border border-line bg-surface p-8 md:p-10">
            <h2 className="font-display text-3xl font-semibold text-aqua">Vision</h2>
            <p className="mt-4 text-fg-dim text-xl">
              To become one of South Asia&rsquo;s most trusted, research-driven
              technology partners &mdash; shaping how intelligent systems and
              thoughtful design work together.
            </p>
            <ul className="mt-6 space-y-3 text-lg marker:text-aqua list-disc list-inside  text-fg-dim">
              <li>Earn a reputation for reliability before scale.</li>
              <li>Lead in applied research, not just implementation.</li>
              <li>Contribute to Bangladesh&rsquo;s growing technology sector.</li>
              <li>Mentor the next generation of engineers and researchers.</li>
            </ul>
          </Reveal>
        </section>
      </div>

      <section className="content-shell border-t border-line py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-xl text-accent mb-4">Leadership</p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-dm-sans font-semibold text-balance">
            One Founder.<br /> One Clear Direction.
          </h2>
        </Reveal>

        <Reveal className="mt-12 grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface">
            <Image
              src={team[0].image}
              alt={`${team[0].name}, Founder and CEO of ${site.legalName}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>

          <div>
            <h3 className="font-display text-3xl font-semibold">{team[0].name}</h3>
            <p className="mt-1 text-accent">{team[0].role}</p>

            <p className="mt-5 max-w-xl text-fg-dim">
              33+ Years driving corporate strategy, business growth, operational
              excellence, digital transformation, and organisational development
              in technology-focused enterprises.
            </p>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {experience.map((exp, i) => (
                <li key={i} className="border-l-2 border-line pl-4">
                  <p className="font-medium text-accent">{exp.title}</p>
                  <p className="text-sm text-a">{exp.company}</p>
                  <p className="text-xs text-fg-dim/70">{exp.period}</p>
                </li>
              ))}
            </ul>

            {/* Demo images — replace src with real links later */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {achievementImages.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-video overflow-hidden rounded-md bg-surface border border-line"
                >
                  <Image
                    src={src}
                    alt={`${team[0].name} achievement ${i + 1}`}
                    fill
                    className="object-cover "
                    sizes="(max-width: 768px) 33vw, 20vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <StatsBand />

      <section className="section-light">
        <div className="content-shell py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="text-xl text-aqua mb-4">What we stand for</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-balance">
              Five things we won&rsquo;t compromise on.
            </h2>
          </Reveal>

          <Reveal stagger={0.08} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-md border border-line bg-surface p-7">
                <Icon className="text-aqua" size={26} />
                <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-fg-dim">{body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="content-shell border-t border-line py-20 md:py-28">
        <Reveal className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            
            <p className="text-xl text-accent mb-4"> Giving Back</p>

            <h2 className="font-dm-sans text-3xl md:text-6xl font-semibold leading-tight mb-6">
              Before the defense, we showed up.
            </h2>

            <span className="inline-block rounded-full border bg-accent border-line-strong px-4 py-1.5 text-sm font-black text-accent-ink mb-6">
              Daffodil International University — 64th Batch, CSE
            </span>

            <p className="text-fg-dim leading-relaxed mb-8 text-lg max-w-xl">
              Final-year defense pressure is real — we&rsquo;ve been there too. So
              our team sat down with the 64th batch CSE students before their big
              day: what a defense panel actually looks for, how to structure a
              research paper, and where most projects fall short. Our door stays
              open for anyone who needs a review, guidance, or just someone to
              talk it through with.
            </p>

            <a
              href="https://www.facebook.com/reel/1606791157128452"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-fg hover:border-accent hover:text-accent transition-colors"
            >
              ▶ Watch the Session
            </a>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-line aspect-video">
            <Image
              src="/Img/25.jpg"
              alt="Masterclass on Final Year Project Mastery — Tech Of Solutions"
              fill
              className="object-cover"
            // sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="absolute top-2 left-2 bg-surface/95 text-fg text-xs font-medium uppercase tracking-wide px-3 py-1.5 rounded-full border border-line">
              64th Batch, CSE
            </span>
          </div>
        </Reveal>
      </section>
      <section className="section-light">
        <div className="content-shell py-20 md:py-28">
          <Reveal className="mb-20">
            <p className="text-xl text-aqua mb-4">In The Room</p>
            <h2 className="font-dm-sans text-3xl md:text-6xl font-semibold max-w-2xl">
              Meetings &amp; Moments With Our Clients
            </h2>
            <p className="text-fg-dim mt-3 text-lg max-w-xl">
              A look at how we work — sitting down with clients, walking through
              problems together, and staying close from kickoff to launch.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <MeetingsCarousel slides={meetings} />
          </Reveal>


        </div>
      </section>
    </>
  );
}
