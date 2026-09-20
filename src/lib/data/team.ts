export type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio?: string;
};

export const team: TeamMember[] = [
  {
    name: "S M Golam Faruk Alamgir Arman",
    role: "Founder & CEO",
    image: "/Img/12.jpeg",
    bio: "Former Director & Senior Vice President of the Dhaka Chamber of Commerce and Industry, and former Managing Director of BDCOM Online Limited.",
  },
  
  {
    name: "Engr. Tanvir Hassan Turan",
    role: "Sales",
    image: "/Img/2.png",
  },
  {
    name: "Abdullah Al Noman",
    role: "AI / ML Engineer",
    image: "/Img/35.jpg",
  },
  {
    name: "Atik Al Sabbir",
    role: "Software Engineer",
    image: "/Img/atik al sabbir.webp",
  },
  {
    name: "Mustazir Billah",
    role: "Software Engineer",
    image: "/Img/a.jpg",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Amazing service and a super clean build. The team understood exactly what our studio needed to present its work.",
    name: "Nazmul Hasan",
    role: "CEO, 7007 Studio",
    image: "/Img/client/img1.png",
  },
  {
    quote:
      "Outstanding work, delivered on time with real attention to detail from discovery through to launch.",
    name: "James Walker",
    role: "Product Manager, Nexora Digital (USA)",
    image: "/assets/team/review-2.svg",
  },
  {
    quote:
      "Top-notch animation and a genuinely smooth interface — our customers noticed the difference immediately.",
    name: "MD. Emon",
    role: "Founder, Schedule Solution",
    image: "/assets/team/review-3.svg",
  },
  {
    quote:
      "Very professional and fast delivery. A pleasure to collaborate with from the first call.",
    name: "Lucas Martin",
    role: "Operations Director, InnovateX (France)",
    image: "/assets/team/review-4.svg",
  },
  {
    quote: "Quick delivery without cutting corners on quality.",
    name: "Sadia Rahman",
    role: "Marketing Director, EcomHub",
    image: "/assets/team/review-5.svg",
  },
];

export type Client = {
  name: string;
  logo: string;
};

export const clients: Client[] = [
  { name: "Conveyor Group", logo: "/Img/partners/conveyor.jpeg" },
  { name: "Milex", logo: "/Img/partners/milex.jpeg" },
  { name: "OTTO Outfits", logo: "/Img/partners/ottos.jpeg" },
  { name: "TeXco Tech", logo: "/Img/partners/texco.jpeg" },
  { name: "Sheer Leathers", logo: "/Img/partners/lea.jpeg" }, // guess — please confirm
  { name: "Schedule Solution", logo: "/Img/partners/favicon.png" },
  { name: "7007 Studio", logo: "/Img/partners/logo.png" },
  { name: "Khulna Hardware", logo: "/Img/partners/images.webp" },
  { name: "De Tempete", logo: "/Img/partners/1.jpeg" },
  { name: "RADIANT", logo: "/Img/partners/2.jpeg" },
  { name: "Sattar & Co.", logo: "/Img/partners/s.jpeg" },
];
