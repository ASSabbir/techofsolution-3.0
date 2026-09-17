// ─────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH — brand, contact & SEO defaults.
// Change your company name, contact details, or socials here and every
// page, the footer, the JSON-LD schema and the sitemap update with it.
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  name: "TechOf Solution",
  legalName: "TechOf Solution Ltd.",
  shortName: "TechOf",
  tagline: "Building the software that moves your business forward.",
  description:
    "TechOf Solution is a Dhaka-based technology studio designing and engineering websites, product software, AI/ML systems and applied research for clients across Asia, Europe and North America.",
  url: "https://techofsolution.com",
  email: "techofsolution@gmail.com",
  phone: "+8801798392494",
  phoneDisplay: "+880 1798 392494",
  address: {
    locality: "Dhaka",
    country: "Bangladesh",
    countryCode: "BD",
  },
  founder: "S M Golam Faruk Alamgir Arman",
  social: {
    facebook: "https://www.facebook.com/techofsolution",
    linkedin: "https://www.linkedin.com/company/techofsolution",
    github: "https://github.com/techofsolution",
    discord: "https://discord.gg/j68RBQ3P",
  },
  keywords: [
    "software development agency Bangladesh",
    "web development Dhaka",
    "custom software development company",
    "AI and machine learning development",
    "LMS development company",
    "e-commerce development agency",
    "research and academic technology partner",
    "MERN stack development agency",
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type Stat = { value: number; suffix: string; label: string; decimal?: boolean };

export const stats: Stat[] = [
  { value: 132, suffix: "+", label: "Projects delivered" },
  { value: 7, suffix: "", label: "Countries served" },
  { value: 4.8, suffix: "", label: "Average client rating", decimal: true },
  { value: 24, suffix: "hr", label: "Typical first response" },
];