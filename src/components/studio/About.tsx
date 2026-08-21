import { useEffect, useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import founderOne from "@/assets/founder.png"; 

const MANIFESTO = [
  "A small team with big standards.",
  "Every detail is owned by the people building it.",
  "No middlemen. No shortcuts. Just craft.",
];

const FOUNDERS = [
  {
    img: founderOne,
    name: "Akash",
    role: "Founder & Lead Engineer",
    note: "Breaks things until they work beautifully.",
  },
  {
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    name: "Rishu",
    role: "Co-founder & Marketer",
    note: "Makes it move like it means it.",
  },
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--rd": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function About() {
  const stageRef = useRef<HTMLElement>(null);

  const handleStageMove = (e: PointerEvent<HTMLElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  const handleCardMove = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
  };

  const handleCardLeave = (e: PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <section 
      id="about" 
      ref={stageRef} 
      onPointerMove={handleStageMove} 
      className="about-stage relative min-h-[100svh] overflow-x-clip bg-background font-display py-20"
    >
      {/* Glow and Grain */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(560px_circle_at_var(--mx,70%)_var(--my,30%),color-mix(in_oklab,var(--color-accent)_10%,transparent),transparent_70%)]" aria-hidden="true" />
      <div className="about-grain fixed inset-[-50%] pointer-events-none opacity-[0.06]" aria-hidden="true" />

      {/* Hero */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-[clamp(5rem,14vh,8rem)] pb-[3rem] transition-transform duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)]" style={{ transform: 'translate(calc(var(--px, 0) * -10px), calc(var(--py, 0) * -8px))' }}>
        
        <h1 className="about-title group mt-[clamp(1.8rem,4.5vh,3rem)] font-bold text-[clamp(2.6rem,8.6vw,7.4rem)] leading-[1.02] tracking-[-0.03em] uppercase cursor-default">
          <span className="block overflow-hidden mb-[clamp(1rem,2.5vh,1.6rem)]" aria-hidden="true">
            <span className="about-kicker-inner inline-block font-serif italic font-normal text-[clamp(1.15rem,2.2vw,1.7rem)] tracking-normal normal-case text-muted-foreground">
              the people behind El Studio
            </span>
          </span>
          <span className="flex items-center gap-[0.22em] overflow-hidden py-[0.06em]" aria-hidden="true">
            <span className="inline-block animate-[line-up_1s_backwards_cubic-bezier(0.16,0.7,0.3,1)]" style={{ animationDelay: "0.3s" }}>
              A team
            </span>
            <span className="about-chip flex-shrink-0 inline-block h-[0.72em] w-[1.55em] rounded-full overflow-hidden shrink-0 transition-[width] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:w-[2.6em]" style={{ animationDelay: "0.85s" }}>
              <img src={founderOne} alt="" width={320} height={160} className="w-full h-full object-cover block grayscale contrast-[1.05] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:grayscale-0 group-hover:scale-110" />
            </span>
            <span className="inline-block animate-[line-up_1s_backwards_cubic-bezier(0.16,0.7,0.3,1)]" style={{ animationDelay: "0.42s" }}>
              of
            </span>
          </span>
          <span className="flex items-center gap-[0.22em] overflow-hidden py-[0.06em]" aria-hidden="true">
            <span className="inline-block animate-[line-up_1s_backwards_cubic-bezier(0.16,0.7,0.3,1)]" style={{ animationDelay: "0.55s" }}>
              makers
            </span>
            <span
              className="inline-block animate-[line-up_1s_backwards_cubic-bezier(0.16,0.7,0.3,1)] font-serif italic font-normal lowercase tracking-normal text-muted-foreground"
              style={{ animationDelay: "0.7s" }}
            >
              with <em className="relative text-accent not-italic font-serif about-em-hover">one standard.</em>
            </span>
          </span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mt-[clamp(2.2rem,6vh,3.6rem)] animate-[intro-fade_0.9s_1.15s_backwards]">
          <p className="m-0 max-w-[26ch] pt-4 border-t border-muted-foreground/35 text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-muted-foreground">
            We are a small, focused crew building the future of <em className="font-serif text-[1.15em] text-accent">El Studio</em> — one decision, one prototype, one launch at a time.
          </p>
          <ul className="list-none flex flex-wrap md:flex-nowrap gap-7 m-0 p-0 pb-1.5 text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent" />Based in Delhi, India</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent" />Est. 2026</li>
          </ul>
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 py-[clamp(2rem,6vh,4rem)] pb-[clamp(4rem,8vh,6rem)] grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-[clamp(2.5rem,6vw,6rem)] items-start">
        <div>
          {MANIFESTO.map((line, i) => (
            <Reveal key={line} delay={i * 0.12}>
              <p className="m-0 mb-[1.7rem] text-[clamp(1.4rem,2.5vw,2.1rem)] font-semibold leading-[1.25] tracking-[-0.01em] text-foreground">{line}</p>
            </Reveal>
          ))}
        </div>

        <div className="relative">
          {FOUNDERS.map((f, i) => (
            <Reveal
              key={f.name}
              delay={0.15 + i * 0.18}
              className={i === 1 ? "md:mt-[clamp(2rem,6vw,5.5rem)] md:ml-[clamp(0rem,4vw,2.5rem)] mt-8" : ""}
            >
              <article
                className="group relative border border-muted-foreground/25 rounded-2xl bg-foreground/[0.04] p-4 transition-all duration-[0.35s] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:border-accent/50 hover:shadow-[0_24px_60px_-24px_rgba(52,211,153,0.3)]"
                onPointerMove={handleCardMove}
                onPointerLeave={handleCardLeave}
                style={{ transform: 'perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))' }}
              >
                <div className="absolute left-[1.6rem] top-[1.6rem] w-4 h-4 border-l-2 border-t-2 border-accent opacity-0 translate-x-1 translate-y-1 transition-all duration-300 z-10 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                <div className="overflow-hidden rounded-xl aspect-[4/5]">
                  <img
                    src={f.img}
                    alt={`Portrait of ${f.name}`}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover block grayscale contrast-[1.05] scale-[1.01] transition-all duration-600 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:grayscale-0 group-hover:scale-[1.06]"
                  />
                </div>
                <div>
                  <h2 className="mt-4 mb-1 font-display text-[1.4rem] tracking-[-0.01em] text-foreground">{f.name}</h2>
                  <p className="m-0 text-[0.68rem] tracking-[0.3em] uppercase text-accent">{f.role}</p>
                  <p className="mt-2 mb-1 text-[0.95rem] text-muted-foreground">{f.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
