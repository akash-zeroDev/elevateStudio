import work1 from "@/assets/work-1.png";
import work2 from "@/assets/work-2.png";
import work3 from "@/assets/work-3.png";
import work4 from "@/assets/work-4.png";

export const studio = {
  name: "ELEVATE",
  fullName: "EL Studio", // updating since we changed it in Hero earlier
  founderName: "Your Name",
  email: "hello@elevatestudio.co",
  location: "Delhi, India",
  availability: "Available for select projects",
  tagline: "Independent digital studio",
  year: 2026,
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X", href: "https://x.com" },
];

export type Project = {
  id: string;
  index: string;
  name: string;
  category: string;
  year: string;
  description: string;
  services: string[];
  image: string;
};

export const projects: Project[] = [
  {
    id: "ledgerline",
    index: "01",
    name: "Ledgerline",
    category: "Fintech / Product",
    year: "2025",
    description:
      "A payments dashboard for a small fintech team who were losing customers at onboarding. We rebuilt the flow around one question: what does this person need to see right now?",
    services: ["Product design", "Design system", "Frontend"],
    image: work1,
  },
  {
    id: "aurel",
    index: "02",
    name: "Aurel Atelier",
    category: "Fashion / Brand & Web",
    year: "2025",
    description:
      "Brand system and commerce site for a made-to-order label. Quiet typography, heavy imagery, and a checkout that gets out of the way.",
    services: ["Brand system", "Art direction", "E-commerce"],
    image: work2,
  },
  {
    id: "northbeam",
    index: "03",
    name: "Northbeam",
    category: "SaaS / Marketing",
    year: "2024",
    description:
      "A marketing site and docs experience for an analytics platform. We cut the page count in half and the demo requests went the other way.",
    services: ["Positioning", "Web design", "Development"],
    image: work3,
  },
  {
    id: "orbit",
    index: "04",
    name: "Orbit Collective",
    category: "Creator platform / Product",
    year: "2024",
    description:
      "Identity and interface for a membership platform used by independent writers. Built to feel personal at ten members and at ten thousand.",
    services: ["Identity", "UI/UX", "Motion"],
    image: work4,
  },
];

export type Service = {
  index: string;
  title: string;
  blurb: string;
  includes: string[];
};

export const services: Service[] = [
  {
    index: "01",
    title: "Websites",
    blurb:
      "Fast, accessible websites built to perform.",
    includes: ["Strategy", "Design", "Development", "Motion", "Optimization"],
  },
  {
    index: "02",
    title: "Web Applications",
    blurb:
      "Interfaces for real products — dashboards, tools, portals. Built around the actual workflow, not a template.",
    includes: ["Architecture", "Design system", "React / TypeScript", "Testing"],
  },
  {
    index: "03",
    title: "UI / UX",
    blurb:
      "Structure before decoration. We map the flows, remove the friction, then design interfaces that are clear and easy to use.",
    includes: ["Research", "Flows", "Prototyping", "Interface design"],
  },
  {
    index: "04",
    title: "Branding",
    blurb:
      "Identity systems that actually stand out in your category without following the current trend.",
    includes: ["Naming support", "Logotype", "Typography", "Guidelines"],
  },
  {
    index: "05",
    title: "E-commerce",
    blurb:
      "Storefronts that load quickly, read clearly, and treat the checkout as part of the design — not an afterthought.",
    includes: ["Merchandising", "Product pages", "Checkout", "Analytics"],
  },
  {
    index: "06",
    title: "Frontend Engineering",
    blurb:
      "Custom interaction design and motion for when standard layouts aren't enough.",
    includes: ["Concept", "Art direction", "Motion", "Build"],
  },
];

export const principles = [
  {
    index: "01",
    title: "We skip the fluff",
    body: "No endless slide decks or bloated discovery phases. We start designing and building immediately, showing you real progress as early as week one.",
  },
  {
    index: "02",
    title: "You talk to the makers",
    body: "There are no account managers here. You collaborate directly with the designers and engineers who are actually bringing your vision to life.",
  },
  {
    index: "03",
    title: "Design with purpose",
    body: "We strip away the unnecessary. If a feature or layout doesn't serve a clear function for your users, we cut it.",
  },
  {
    index: "04",
    title: "Code you can keep",
    body: "We build robust, documented systems. When it's time to hand over the project, your team will actually enjoy working with our code.",
  },
  {
    index: "05",
    title: "Handcrafted solutions",
    body: "We solve your unique problems from the ground up. No shortcuts, no forcing your business into a pre-made template.",
  },
];

export const process = [
  { index: "01", title: "Discover", body: "Understand the product, users, constraints, and what needs to be solved." },
  { index: "02", title: "Define", body: "Turn the messy idea into a clear direction, scope and set of decisions we can build on." },
  { index: "03", title: "Design", body: "Turn the agreed direction into layouts, components, and interaction details." },
  { index: "04", title: "Build", body: "Develop the real thing — typed, responsive, accessible and fast on the devices people use." },
  { index: "05", title: "Refine", body: "Polish, test, measure. Fix the small things that separate good from finished." },
  { index: "06", title: "Launch", body: "Ship it, hand over everything, and stay reachable for the weeks that follow." },
];

export const expertise = [
  "Web Development",
  "UI / UX",
  "Frontend Engineering",
  "Brand Systems",
  "E-commerce",
  "Digital Products",
];

export const stack = ["React", "TypeScript", "Next / TanStack", "Tailwind", "Motion", "Figma", "Shopify", "Webflow"];

export const testimonials = [
  {
    quote:
      "Working with the studio felt less like hiring an agency and more like having an experienced product person on our team.",
    name: "Ishita Raman",
    role: "Founder, Ledgerline",
  },
  {
    quote:
      "They pushed back on half of what we asked for, and they were right about most of it. The site is the best thing our brand has.",
    name: "Marc Devlin",
    role: "Creative Director, Aurel Atelier",
  },
  {
    quote:
      "Two people moved faster than the twelve-person agency we used before, and the handover was actually documented.",
    name: "Sofia Klein",
    role: "Head of Growth, Northbeam",
  },
  {
    quote: "Direct, honest, and genuinely good at the craft. We've kept them on retainer since.",
    name: "Arjun Mehta",
    role: "Co-founder, Orbit Collective",
  },
];

export const metrics = [
  { value: "15+", label: "Projects shipped" },
  { value: "4+", label: "Years building" },
  { value: "12", label: "Clients" },
  { value: "∞", label: "Iterations" },
];

export const faqs = [
  {
    q: "What kind of projects do you take?",
    a: "Websites, web applications, and product interfaces. We usually work with founders and small teams who need to move quickly. We take a limited number of projects so each one gets real attention.",
  },
  {
    q: "How does the process work?",
    a: "A short call, a written scope, then we start. You see work weekly and decisions happen in days, not sprints.",
  },
  {
    q: "How long does a typical project take?",
    a: "A focused marketing site is three to five weeks. A product interface or full build is typically eight to twelve. We'll give you a real timeline before you commit.",
  },
  {
    q: "Do you work with startups?",
    a: "Often. Early-stage work is our favourite kind — fewer committees, faster decisions. We can scale the scope to fit an early budget.",
  },
  {
    q: "Can you work with an existing design?",
    a: "Yes. If you have Figma files, we'll build to them and flag any production issues before we write code.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes — monthly retainers for iteration and maintenance, or ad-hoc support after launch. No lock-in.",
  },
];

export const projectTypes = [
  "Website",
  "Web application",
  "Brand identity",
  "E-commerce",
  "Something else",
];

export const budgets = ["Under $5k", "$5k – $15k", "$15k – $40k", "$40k+", "Not sure yet"];
