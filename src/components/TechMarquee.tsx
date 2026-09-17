"use client";

import Marquee from "react-fast-marquee";

const slugify = (s: string) => s.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-");

// Real, recognizable logos via devicon's public CDN — only listed where I'm
// confident the icon exists there. Anything not listed (or that fails to
// load) automatically falls back to the local monogram tile, so nothing
// ever shows as a broken image.
const DEVICON_SLUGS: Record<string, string> = {
  "Next.js": "nextjs",
  React: "react",
  TypeScript: "typescript",
  "Node.js": "nodejs",
  MongoDB: "mongodb",
  "Tailwind CSS": "tailwindcss",
  Python: "python",
  PyTorch: "pytorch",
  TensorFlow: "tensorflow",
  FastAPI: "fastapi",
  Pandas: "pandas",
  OpenCV: "opencv",
  "Scikit-learn": "scikitlearn",
  Jupyter: "jupyter",
  Express: "express",
  PostgreSQL: "postgresql",
  Docker: "docker",
};

function logoUrl(tech: string) {
  const slug = DEVICON_SLUGS[tech];
  return slug ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg` : null;
}

export default function TechMarquee({ items }: { items: string[] }) {
  return (
    <Marquee speed={35} gradient={false}  className="edge-fade">
      {items.map((tech) => {
        const remote = logoUrl(tech);
        const fallback = `/assets/tech/${slugify(tech)}.svg`;

        return (
          <div key={tech} className="mx-10  flex flex-col items-center gap-3 sm:mx-10">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl !bg-black p-4 sm:h-20 sm:w-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={remote ?? fallback}
                alt={tech}
                className="h-full w-full object-contain"
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src !== window.location.origin + fallback) img.src = fallback;
                }}
              />
            </div>
            <span className="whitespace-nowrap text-xl text-muted">{tech}</span>
          </div>
        );
      })}
    </Marquee>
  );
}