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
    role: "Head, Business Development Strategist",
    image: "/Img/2.png",
  },
  {
    name: "Anar Koli",
    role: "Consultant Sales & Marketing",
    image: "/Img/ss.png",
  },
  {
    name: "SK. MD. Aliraz",
    role: "Head, Brand & Communications",
    image: "/Img/aliraz.jpeg",
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
      "A professional team with a clear understanding of what businesses need. The entire process was smooth, structured, and handled with great attention to detail.",
    name: "Kabir Ahmed",
    role: "Chairman, Conveyor Group | Former President, BAFFA",
    image: "/Img/client/s.jpeg",
  },

  {
    quote:
      "Working with the team was a genuinely positive experience. They understood our vision and translated it into a polished digital presence with great attention to detail.",
    name: "Mohsena Munna, FCCA",
    role: "Founder & CEO, De Tempête",
    image: "/Img/client/a.jfif",
  },

  {
    quote:
      "They demonstrated strong technical understanding and a professional approach throughout the project. The final result reflected both quality and careful execution.",
    name: "Eng. Md. Anwarul Haque",
    role: "Managing Director, Texco Tech",
    image: "/Img/client/sa.jpeg",
  },

  {
    quote:
      "The team was responsive, professional, and attentive to every detail. They delivered a solution that aligned well with our business requirements.",
    name: "Barrister Sameer Satter",
    role: "CEO & Founder, Sattar & Co. | Bangladesh",
    image: "/Img/client/shamir_1.webp",
  },

  {
    quote:
      "A thoughtful approach from start to finish. The team took the time to understand our requirements and delivered a refined digital experience.",
    name: "Nazmul Hasan",
    role: "CEO, 7007 Studio",
    image: "/Img/client/img1.png",
  },

  {
    quote:
      "The attention to detail and smooth execution really stood out. Communication was clear throughout, and the final experience felt modern and well considered.",
    name: "Lucas Martin",
    role: "Operations Director, InnovateX | France",
    image: "https://udayton.edu/directory/artssciences/religiousstudies/images/martin-lucas-2023.jpg",
  },

  {
    quote:
      "Professional collaboration, clear communication, and a strong focus on quality. The team delivered exactly what we needed for our digital presence.",
    name: "Daniel Morgan",
    role: "Managing Director, Vertex Solutions | United Kingdom",
    image: "https://images.jg-cdn.com/image/eeb2d6b6-7f0c-42db-8881-467f676d2511.jpg",
  },

  {
    quote:
      "From the initial discussion to the final delivery, everything was handled with care and professionalism. The result exceeded our expectations.",
    name: "Alexandre Laurent",
    role: "Director, Laurent Consulting | France",
    image: "https://i1.rgstatic.net/ii/profile.image/959623725056006-1605803533769_Q512/Alexandre-Laurent.jpg",
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
  { name: "Sattar & Co.", logo: "/Img/partners/blogo.png" },
  { name: "Bangladesh Industrial X-Ray (BIX).", logo: "/Img/partners/BixLogo.jpg" },
  { name: "Bangladesh Industrial X-Ray (BIX).", logo: "/Img/partners/3.jpeg" },
];
