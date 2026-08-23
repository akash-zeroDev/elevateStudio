import { useEffect, useRef, useState } from "react";
import member1 from "@/assets/founder.png";
const member2 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80";
const member3 = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80";

const team = [
  {
    name: "Akash",
    role: "Founder & Engineer",
    line: "Builds high-performance websites and digital products from the ground up.",
    tags: ["Nextjs", "Mongodb", "React"],
    image: member1,
    since: "2026",
  },
  {
    name: "Rishu",
    role: "Co-founder, Marketing & Growth",
    line: "Scales the vision, drives growth strategy, and ensures the product reaches the right audience.",
    tags: ["Marketing", "Growth Strategy", "Go-to-market"],
    image: member2,
    since: "2026",
  },
  {
    name: "Noah",
    role: "Full Stack Developer",
    line: "Builds robust backend architectures and seamless frontend experiences.",
    tags: ["NextJs", "SQL", "React"],
    image: member3,
    since: "2026",
  },
];

const stats = [
  { value: "10+", label: "Products shipped" },
  { value: "3", label: "People, no layers" },
  { value: "100%", label: "Direct access" },
];

const marquee = [
  "Small team",
  "Direct access",
  "No handoffs",
  "Weekly demos",
  "Design + engineering",
  "Built to last",
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setVisible(true);
      return;
    }
    
    // Fallback: forcefully reveal after 1.5s just in case observer fails
    const fallback = setTimeout(() => setVisible(true), 1500);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting || entry?.boundingClientRect.top < window.innerHeight) {
          setVisible(true);
          io.disconnect();
          clearTimeout(fallback);
        }
      },
      { threshold: 0.05, rootMargin: "100px" },
    );
    
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return { ref, visible };
}

function MemberCard({ member, index }: { member: (typeof team)[number]; index: number }) {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      data-visible={visible ? "true" : "false"}
      style={{ transitionDelay: `${index * 120}ms` } as React.CSSProperties}
      className="member-card group flex h-full items-start gap-5 rounded-2xl border border-border bg-foreground/[0.04] p-5 opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="relative shrink-0 overflow-hidden rounded-xl bg-white/[0.06]">
        <img
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          loading="lazy"
          width={160}
          height={200}
          className="portrait-img h-28 w-20 object-cover sm:h-32 sm:w-24"
        />
        <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background font-display text-[0.55rem] tracking-[0.18em] text-accent uppercase">
          0{index + 1}
        </span>
      </div>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
              {member.name}
            </h3>
            <p className="mt-0.5 font-serif text-base italic text-accent">{member.role}</p>
          </div>
          <span className="hidden shrink-0 rounded-full border border-border bg-background/70 px-2 py-1 font-display text-[0.55rem] tracking-[0.18em] text-muted-foreground uppercase backdrop-blur sm:block">
            Since {member.since}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.line}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {member.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-2.5 py-1 font-display text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase transition-colors duration-300 hover:border-accent/60 hover:text-accent"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function About() {
  const heading = useReveal<HTMLDivElement>();
  const statsBlock = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="veil relative overflow-hidden bg-background py-24 sm:py-32">
      <span className="orbit-dot absolute left-1/2 top-24 hidden h-3 w-3 rounded-full border border-accent lg:block" />

      <div className="mx-auto w-full max-w-6xl px-6">
        <div 
          ref={heading.ref} 
          data-visible={heading.visible ? "true" : "false"} 
          className="opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
        >
          <p className="font-display text-[0.68rem] tracking-[0.32em] text-accent uppercase">
            About the studio
          </p>

          <h2 className="mt-6 font-display text-5xl leading-[0.9] font-extrabold tracking-tight text-foreground sm:text-7xl">
            <span className="marker-underline inline-block" data-visible={heading.visible ? "true" : "false"}>
              THREE
            </span>{" "}
            PEOPLE,
            <br />
            <span className="font-serif text-4xl font-normal italic text-muted-foreground sm:text-6xl">
              one room.
            </span>
          </h2>

          <div className="mt-10 grid gap-10 border-t border-border pt-10 md:grid-cols-2">
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              Elevate Studio is a three-person freelance team. The people you meet in the
              first call are the people who design, build and ship your product — there is
              no account layer and nothing gets passed down.
            </p>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:justify-self-end">
              We take a small number of projects at a time so each one gets real attention.
              Strategy, interface and engineering sit at the same table, which is why the
              thing we present is the thing that actually runs.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div
          ref={statsBlock.ref}
          data-visible={statsBlock.visible ? "true" : "false"}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-3 opacity-0 translate-y-7 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group bg-background px-6 py-10 transition-colors duration-500 hover:bg-foreground/[0.04]"
            >
              <p className="font-display text-4xl font-extrabold tracking-tight text-foreground transition-colors duration-500 group-hover:text-accent">
                {stat.value}
              </p>
              <p className="mt-2 font-display text-[0.62rem] tracking-[0.22em] text-muted-foreground uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 flex w-full overflow-hidden border-y border-border py-5">
        <div className="ticker-track flex shrink-0 gap-10 pr-10">
          {[...marquee, ...marquee].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-10 font-display text-sm tracking-[0.28em] text-muted-foreground uppercase"
            >
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
