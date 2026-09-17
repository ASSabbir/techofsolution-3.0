export type ProjectCategory = "website" | "software" | "aiml" | "research";

export type Project = {
  slug: string;
  category: ProjectCategory;
  title: string;
  client: string;
  description: string;
  image: string;
  link: string;
  featured?: boolean;
};

export const categoryLabels: Record<ProjectCategory, string> = {
  website: "Website",
  software: "Software",
  aiml: "AI / ML",
  research: "Research Paper",
};

export const projects: Project[] = [
  {
    slug: "7007-studio",
    category: "website",
    title: "7007 Studio",
    client: "3D design & animation studio",
    description:
      "An agency portfolio built for immersive storytelling — smooth interaction design showcasing creative work through engaging, motion-led layouts.",
    image: "/Img/website/2.webp",
    link: "https://7007studio.com/",
    featured: true,
  },
  {
    slug: "schedule-solution",
    category: "website",
    title: "Schedule Solution",
    client: "BPO services company",
    description:
      "A professional portfolio site for a BPO company, built with smooth animation and a responsive layout across every device.",
    image: "/Img/website/1.webp",
    link: "https://schedulesolutionbpo.com/",
    featured: true,
  },
  {
    slug: "the-juice-alluy",
    category: "website",
    title: "The Juice Alluy",
    client: "Coffee shop chain",
    description:
      "A full-stack coffee shop management system handling orders, inventory and day-to-day operations with a modern, responsive interface.",
    image: "/Img/website/a-01-01.png",
    link: "https://the-juice-alluy-8744f.web.app/",
    featured: true,
  },
  
  {
    slug: "loopmi",
    category: "website",
    title: "Loopmi",
    client: "E-commerce retailer (Portugal)",
    description:
      "A full-featured e-commerce platform covering product catalogues, cart and checkout flows for the European market.",
    image: "/Img/website/as.webp",
    link: "https://loopmi-client-en.vercel.app/",
  },
  {
    slug: "chronolux",
    category: "website",
    title: "ChronoLux",
    client: "Luxury watch retailer",
    description:
      "A premium watch e-commerce experience with detailed product galleries and a smooth checkout built for considered purchases.",
    image: "/Img/website/5.webp",
    link: "https://watch.planetazdorovo.com/",
  },
  {
    slug: "learnbridge",
    category: "website",
    title: "LearnBridge",
    client: "Education platform",
    description:
      "A learning management system with three distinct roles — student, teacher and admin — handling courses, assignments and grading.",
    image: "/Img/website/learnbridge1.webp",
    link: "https://learnbridge-6f2b3.web.app/",
  },
  {
    slug: "milex",
    category: "software",
    title: "Milex Parcel ERP",
    client: "Logistics & parcel operator",
    description:
      "An end-to-end parcel management system handling shipment tracking, delivery workflows, agent management and financial reconciliation.",
    image: "/Img/software/milex.webp",
    link: "https://milex-erp.vercel.app/",
    featured: true,
  },
  {
    slug: "khulna-hardware",
    category: "software",
    title: "Khulna Hardware Mart",
    client: "Hardware retail chain",
    description:
      "A full-scale retail management system covering inventory, invoicing, supplier records and stock control from a single dashboard.",
    image: "/Img/software/khm0.webp",
    link: "#",
  },
  {
    slug: "ummahatul-lms",
    category: "software",
    title: "Ummahatul Muminin LMS",
    client: "Educational institution",
    description:
      "An institution-wide LMS managing attendance, fee payments, staff payroll and digital class notes in one integrated platform.",
    image: "/Img/software/umkun.webp",
    link: "#",
  },
  {
    slug: "banglaplate",
    category: "research",
    title: "BanglaPlate",
    client: "Published research — IEEE",
    description:
      "An automatic number-plate detection and recognition system for Bangladeshi vehicles using YOLOv8, built for real-time transportation systems.",
    image: "/Img/Research_Paper/banglaplate.webp",
    link: "https://ieeexplore.ieee.org/document/11013529",
    featured: true,
  },
  {
    slug: "waste-classification",
    category: "research",
    title: "Automated Waste Classification",
    client: "Published research — IEEE",
    description:
      "A YOLOv8-based deep learning system that classifies and sorts waste materials in real time, improving recycling efficiency.",
    image: "/Img/Research_Paper/waste.webp",
    link: "https://ieeexplore.ieee.org/document/11172269",
  },
  {
    slug: "aiot-road-safety",
    category: "research",
    title: "AIoT for Road Safety",
    client: "Applied research",
    description:
      "A unified system integrating vehicle speed estimation with automatic license-plate recognition for intelligent traffic monitoring.",
    image: "/Img/Research_Paper/roadsafty.webp",
    link: "https://www.researchgate.net/publication/406152534",
  },
  {
    slug: "cbc-blood-cancer",
    category: "aiml",
    title: "CBC Blood Cancer Detector",
    client: "Healthcare diagnostics research",
    description:
      "A diagnostic support model that analyses Complete Blood Count data to flag early indicators of blood cancer for clinical review.",
    image: "/Img/AI/63.webp",
    link: "#",
    featured: true,
  },
  {
    slug: "hemavision-ml",
    category: "aiml",
    title: "HemaVision ML",
    client: "Bangladesh Medical University",
    description:
      "A machine learning system trained on flow-cytometry data to assist in blood-cancer detection, developed with the Department of Pediatric Hematology & Oncology.",
    image: "/Img/AI/64.webp",
    link: "#",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
