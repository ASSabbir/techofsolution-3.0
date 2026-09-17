export type Service = {
  slug: string;
  icon: "globe" | "cpu" | "flask" | "layers" | "chart";
  name: string;
  short: string;
  summary: string;
  heroImage: string;
  previewImage: string;
  description: string[];
  offerings: { title: string; detail: string }[];
  industries: string[];
  stack: string[];
  capabilities: { title: string; detail: string; image: string; bullets: string[] }[];
  process: { title: string; detail: string }[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "web-solutions",
    icon: "globe",
    name: "Web Solutions",
    short: "Business websites, e-commerce & animated portfolios",
    summary:
      "High-performance websites built for clarity, speed and conversion — engineered on modern frameworks and tuned for search from the first commit.",
    heroImage: "/Img/service/web.png",
    previewImage: "/Img/service/web.png",
    description: [
      "Every build starts from your business goal, not a template. We map the pages a visitor actually needs, then design and engineer around that path — so the site is fast, legible, and easy to extend as your business grows.",
      "We work in modern, component-based stacks so your site ships with strong Core Web Vitals, clean semantic markup, and a codebase your next developer can actually read.",
    ],
    offerings: [
      { title: "Business websites", detail: "Corporate and brand sites built to convert visitors into enquiries, with clean content structure editors can actually maintain." },
      { title: "E-commerce platforms", detail: "Full storefronts with catalogue, cart, checkout and inventory — built to handle real transaction volume." },
      { title: "Animated portfolios", detail: "Motion-led, award-style presentation sites for studios and creators who need their work to feel as good as it looks." },
      { title: "LMS front-ends", detail: "Learning-platform interfaces for students, teachers and administrators, connected to your existing backend." },
    ],
    industries: ["Retail & E-commerce", "Hospitality", "Professional Services", "Education", "Creative & Media"],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS","GSAP", "FramerMotion","Threejs","JavaScript", "php","PostgreSQL",],
    capabilities: [
      {
        title: "Performance by default",
        detail: "Every site is benchmarked against Core Web Vitals before launch, so speed is never something you discover from a customer complaint.",
        image: "/Img/service/web1.jfif",
        bullets: [
          "Sub-2-second load times on real-world connections, not just lab tests",
          "Automatic image and asset optimization on every deploy",
          "A performance budget enforced before code reaches production",
        ],
      },
      {
        title: "Premium by design",
        detail: "Distinctive visuals, refined motion, and thoughtful interactions create digital experiences that stand apart from the ordinary.",
        image: "/Img/service/web2.jfif",
        bullets: [
          "A visual system built around your brand, never a recycled template",
          "Motion and micro-interactions that feel intentional, not decorative",
          "Design benchmarked against your competitors before a page ships",
        ],
      },
      {
        title: "SEO from day one",
        detail: "Semantic markup, sitemaps and structured data ship with the first release, not as a later add-on.",
        image: "/Img/service/web3.jpg",
        bullets: [
          "Clean, crawlable markup and structured data from the first commit",
          "Sitemap, metadata and Open Graph tags configured before launch",
          "A site search engines can understand, not just visitors",
        ],
      },
    ],
    process: [
      { title: "Discovery", detail: "We study your audience, competitors and goals, then define the sitemap and success metrics." },
      { title: "Design", detail: "Wireframes and a visual system tailored to your brand, reviewed with you before a line of code is written." },
      { title: "Build", detail: "Component-driven development with staged previews, so you watch the site take shape in real time." },
      { title: "Launch & tune", detail: "Performance, accessibility and SEO passes before go-live, then monitoring afterward." },
    ],
    faq: [
      { q: "How long does a website project take?", a: "A focused business website typically takes 2–4 weeks. E-commerce or LMS platforms run 6–10 weeks depending on scope." },
      { q: "Do you handle hosting and domains?", a: "Yes — we can set up hosting, domains and DNS, or work inside your existing infrastructure if you already have a preferred provider." },
      { q: "Will the site be SEO-ready on launch?", a: "Every site we ship includes clean semantic HTML, metadata, sitemap and structured data as standard, not as an add-on." },
    ],
  },
  {
    slug: "software-development",
    icon: "layers",
    name: "Software Development",
    short: "Web apps, CRM, HRM, payroll & custom business systems",
    summary:
      "Purpose-built software that replaces spreadsheets and disconnected tools with one secure, scalable system shaped around how your team actually works.",
    heroImage: "/Img/service/sof.png",
    previewImage: "/Img/service/sof.png",
    description: [
      "Off-the-shelf software forces your process to bend around it. We build the reverse: systems modelled on how your business already operates, so adoption is fast and training is minimal.",
      "From web and internal applications to inventory, payroll and multi-role learning platforms, we design for the specific operational reality of your organisation.",
    ],
    offerings: [
      { title: "Web & internal applications", detail: "Custom web apps and internal tools built around your team's actual workflow, not a generic template." },
      { title: "CRM & pipeline management", detail: "Sales and client-relationship systems shaped around how your team actually sells." },
      { title: "HRM & payroll systems", detail: "Staff records, attendance and payroll processing in one auditable system." },
      { title: "Inventory & operations", detail: "Stock, invoicing and operational dashboards built for day-to-day business reality." },
    ],
    industries: ["Retail", "Logistics", "Education", "Manufacturing", "Professional Services"],
    stack: ["FastAPI", "JWT", "GraphQL", "Supabase", "Firebase", "Django", "Node.js", "Express", "MongoDB", "PostgreSQL", "React", "Docker","Next.js", ],
    capabilities: [
      {
        title: "Modelled on your process",
        detail: "We shadow real workflows before writing a data model, so the system fits how your team already works from day one.",
        image: "/assets/services/software-development-cap-1.svg",
        bullets: [
          "Weeks of process mapping before a single screen is designed",
          "Real staff test each module as it's built, not just at final delivery",
          "Fewer support tickets later because the system already fits how people work",
        ],
      },
      {
        title: "You own everything",
        detail: "Source code and infrastructure access are handed over in full — no lock-in, ever.",
        image: "/assets/services/software-development-cap-2.svg",
        bullets: [
          "Full source code and credentials transferred at handover",
          "No proprietary framework you're locked into",
          "Documentation your next developer can actually follow",
        ],
      },
      {
        title: "Built to scale",
        detail: "Architecture designed for growth from day one, so new users, roles or modules don't mean a rebuild.",
        image: "/assets/services/software-development-cap-3.svg",
        bullets: [
          "Data model designed for 10x your current volume, not just launch day",
          "New roles or modules added without touching core code",
          "Infrastructure that grows with a config change, not a rewrite",
        ],
      },
    ],
    process: [
      { title: "Process mapping", detail: "We shadow your current workflow to understand what the software must replace or improve." },
      { title: "Architecture", detail: "A data model and system architecture designed to scale with your team, not just your launch day." },
      { title: "Build & train", detail: "Iterative delivery with real staff testing each module as it's built." },
      { title: "Support", detail: "Post-launch maintenance, feature requests and scaling support as your business grows." },
    ],
    faq: [
      { q: "Can the system integrate with tools we already use?", a: "Yes — we design integrations with accounting, payment and communication tools you already depend on." },
      { q: "Who owns the software once it's built?", a: "You do. Source code and infrastructure access are handed over in full as part of every engagement." },
      { q: "Can it grow as our team grows?", a: "Systems are architected for scale from day one, so adding users, roles or modules later doesn't mean a rebuild." },
    ],
  },
  {
    slug: "ai-machine-learning",
    icon: "cpu",
    name: "AI & Machine Learning",
    short: "Intelligent systems, predictive models & automation",
    summary:
      "We turn raw data into decisions — building models, pipelines and interfaces that automate the repetitive and surface the insight that matters.",
    heroImage: "/Img/service/ai.png",
    previewImage: "/Img/service/ai.png",
    description: [
      "Most AI projects fail not at the model, but at the plumbing around it. We build the full pipeline: clean data ingestion, a model suited to the problem, and an interface your team will actually use.",
      "Our work spans classification and prediction systems, computer-vision pipelines, and applied research collaborations with academic and clinical partners.",
    ],
    offerings: [
      { title: "Customer behaviour analysis", detail: "Models that surface patterns in how customers browse, buy and churn, translated into decisions your team can act on." },
      { title: "Identification & recognition", detail: "Computer-vision systems for object, plate and biometric identification, built for real-time accuracy." },
      { title: "Process automation", detail: "Replacing manual review and data entry with models that handle the repeatable work reliably." },
      { title: "Predictive analytics", detail: "Forecasting models for demand, risk and operations planning, wrapped in a dashboard your team can read." },
    ],
    industries: ["Banking & Finance", "Healthcare", "Public Safety", "Retail", "Logistics"],
    stack: ["Python", "PyTorch", "YOLOv8", "TensorFlow", "FastAPI", "MLflow", "Docker","Pandas","NumPy" ,"FastAPI","ComputerVision",],
    capabilities: [
      {
        title: "Production-grade pipelines",
        detail: "Models are shipped as monitored services, not notebooks — built to run reliably in production from day one.",
        image: "/assets/services/ai-machine-learning-cap-1.svg",
        bullets: [
          "Deployed as monitored APIs, never left as an unfinished notebook",
          "An automated retraining pipeline, not a one-time model handoff",
          "Uptime and latency tracked the same way as the rest of your stack",
        ],
      },
      {
        title: "Explainable outputs",
        detail: "We design interfaces that show why a model made a call, so your team can trust and verify it, not just accept it.",
        image: "/assets/services/ai-machine-learning-cap-2.svg",
        bullets: [
          "Every prediction comes with the reasoning behind it, not just a number",
          "Your team can review or override a call, not just accept it blindly",
          "Built for the compliance conversation, not just the demo",
        ],
      },
      {
        title: "Drift-aware monitoring",
        detail: "We track accuracy after launch and retrain on schedule as real-world data shifts, so results don't quietly decay.",
        image: "/assets/services/ai-machine-learning-cap-3.svg",
        bullets: [
          "Accuracy tracked continuously after launch, not just at handover",
          "Scheduled retraining before performance quietly degrades",
          "You're alerted to drift before your customers notice it",
        ],
      },
    ],
    process: [
      { title: "Problem framing", detail: "We define what 'success' looks like in measurable terms before touching data." },
      { title: "Data & modelling", detail: "Cleaning, feature work and model selection, validated against real-world samples." },
      { title: "Integration", detail: "The model is wrapped in an interface or API your team can operate without a data-science background." },
      { title: "Monitoring", detail: "We track drift and accuracy after launch, and retrain when the data shifts." },
    ],
    faq: [
      { q: "Do we need our own dataset already?", a: "No — we can help design a data-collection strategy if one doesn't exist yet, though having real samples speeds things up considerably." },
      { q: "Can you integrate a model into our existing product?", a: "Yes, we regularly ship models as APIs or embedded services that plug into an existing web or mobile application." },
      { q: "How do you handle model accuracy over time?", a: "We set up monitoring for prediction drift and schedule retraining cycles as new data arrives." },
    ],
  },
  {
    slug: "research-academic",
    icon: "flask",
    name: "Research & Academic Solutions",
    short: "Research papers, thesis projects & applied systems",
    summary:
      "Technical depth for academic work — from structuring a thesis to building the system a research paper depends on, with publication-ready rigor.",
    heroImage: "/Img/service/re.png",
    previewImage: "/Img/service/re.png",
    description: [
      "We support students and institutions through the full arc of a research project: framing the problem, building the system or model it depends on, and structuring the paper so its contribution is clear to reviewers.",
      "Several of our collaborations have been published in IEEE and peer-reviewed venues, spanning computer vision, public-safety systems and healthcare informatics.",
    ],
    offerings: [
      { title: "Research paper structuring", detail: "Framing methodology, results and discussion so a reviewer can see the contribution clearly." },
      { title: "Thesis system development", detail: "Building the model or platform a thesis's claims actually depend on, with reproducible results." },
      { title: "Applied AI research", detail: "Collaborations spanning computer vision, healthcare informatics and public-safety systems." },
      { title: "Literature review & methodology", detail: "Structured review support to ground a project's methodology in existing work." },
    ],
    industries: ["Higher Education", "Healthcare", "Public Safety", "Transportation", "Environmental Systems"],
    stack: ["Python", "YOLOv8", "OpenCV", "LaTeX", "Scikit-learn", "Jupyter", "FastAPI", "MLflow","ComputerVision"],
    capabilities: [
      {
        title: "Publication-ready rigor",
        detail: "Several collaborations have reached IEEE and peer-reviewed venues — we know what reviewers actually look for.",
        image: "/assets/services/research-academic-cap-1.svg",
        bullets: [
          "Methodology structured the way reviewers expect to see it",
          "Results validated against real datasets, not cherry-picked samples",
          "A track record of actual IEEE and peer-reviewed publications",
        ],
      },
      {
        title: "Reproducible systems",
        detail: "Every system we build for a paper is documented well enough for a reviewer to reproduce the result.",
        image: "/assets/services/research-academic-cap-2.svg",
        bullets: [
          "Code and results documented well enough for a reviewer to rerun",
          "No black-box components you can't explain in your defense",
          "Version-controlled experiments, not one-off scripts",
        ],
      },
      {
        title: "Full-arc support",
        detail: "From framing the question to submission, we stay involved rather than handing off midway.",
        image: "/assets/services/research-academic-cap-3.svg",
        bullets: [
          "Support from the first framing session through to submission",
          "Available for defense preparation, not gone once the code works",
          "Revisions handled through peer review, not just the first draft",
        ],
      },
    ],
    process: [
      { title: "Scoping", detail: "We clarify the research question and what a credible contribution looks like for your target venue." },
      { title: "System build", detail: "We implement the model or system the paper's claims depend on, with reproducible results." },
      { title: "Writing support", detail: "We help structure methodology, results and discussion sections for clarity and rigor." },
      { title: "Submission", detail: "Formatting, citation and revision support through to submission and peer review." },
    ],
    faq: [
      { q: "Do you co-author papers?", a: "We work as a technical and writing collaborator; authorship arrangements are agreed with each client individually." },
      { q: "Can you help with an existing thesis in progress?", a: "Yes — we regularly join mid-project to help with system implementation, results, or defense preparation." },
      { q: "What subject areas do you cover?", a: "Primarily computer vision, applied machine learning, IoT-based systems and healthcare informatics." },
    ],
  },
  {
    slug: "data-analytics",
    icon: "chart",
    name: "Data Analytics",
    short: "Dashboards, reporting & business intelligence",
    summary:
      "We turn scattered spreadsheets and disconnected tools into one clear picture — dashboards and reporting your team checks every morning, not once a quarter.",
    heroImage: "/Img/service/data.png",
    previewImage: "/Img/service/data.png",
    description: [
      "Most businesses already have the data they need to make better decisions — it's just spread across spreadsheets, invoices and tools that don't talk to each other. We build the pipeline that pulls it together and the dashboard that makes sense of it.",
      "From a single KPI dashboard to a full internal reporting platform, we design analytics that match how your team actually reviews performance, not a generic template.",
    ],
    offerings: [
      { title: "Data pipelines & warehousing", detail: "Consolidating data from spreadsheets, tools and databases into one reliable source of truth." },
      { title: "BI dashboards", detail: "Live, role-specific dashboards your team actually opens, instead of static monthly reports." },
      { title: "KPI reporting automation", detail: "Recurring reports generated and delivered automatically, with no manual spreadsheet work." },
      { title: "Customer & cohort analysis", detail: "Segmentation and cohort breakdowns that show where revenue and churn are really coming from." },
    ],
    industries: ["Retail & E-commerce", "Finance", "Healthcare", "Logistics", "SaaS"],
    stack: ["Python", "Pandas", "PostgreSQL", "PowerBI", "LookerStudio", "dbt"],
    capabilities: [
      {
        title: "One source of truth",
        detail: "We consolidate scattered spreadsheets and tools into a single, reliable data layer everyone trusts.",
        image: "/assets/services/data-analytics-cap-1.svg",
        bullets: [
          "Every number traced back to one reliable source, not five spreadsheets",
          "A data pipeline that runs itself, not one someone has to babysit",
          "One dashboard your whole team trusts, not competing versions",
        ],
      },
      {
        title: "Dashboards people use",
        detail: "Built around the questions your team actually asks, not a generic template of charts nobody opens.",
        image: "/assets/services/data-analytics-cap-2.svg",
        bullets: [
          "Built around the three questions your team actually asks each week",
          "Role-specific views, so nobody wades through irrelevant charts",
          "Designed to be opened every morning, not just at quarter-end",
        ],
      },
      {
        title: "Automated, not manual",
        detail: "Recurring reports run themselves — no more end-of-month spreadsheet scrambles.",
        image: "/assets/services/data-analytics-cap-3.svg",
        bullets: [
          "Reports delivered on schedule, with zero manual spreadsheet work",
          "Hours reclaimed every month from copy-paste reporting",
          "Alerts when a number moves, instead of finding out weeks later",
        ],
      },
    ],
    process: [
      { title: "Audit", detail: "We map where your data already lives and what's missing before designing anything." },
      { title: "Pipeline", detail: "Consolidating sources into a clean, reliable warehouse your reporting can depend on." },
      { title: "Dashboards", detail: "Role-specific views built around the decisions your team makes every week." },
      { title: "Handover & training", detail: "Your team learns the system well enough to extend it without depending on us." },
    ],
    faq: [
      { q: "Do we need a data engineer on our side?", a: "No — we build and hand over the pipeline and dashboards in a state your team can maintain without specialist hires." },
      { q: "Can you connect to tools we already use?", a: "Yes, we regularly integrate with common accounting, CRM, e-commerce and spreadsheet tools." },
      { q: "How is this different from AI/ML services?", a: "Data Analytics focuses on visibility and reporting on what already happened; AI/ML focuses on prediction and automation. Many projects use both." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);