import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { services } from "@/data/studio";
import { Section } from "./primitives";
import { cn } from "@/lib/utils";

const ROTATING_WORDS = ["do.", "ship.", "craft.", "build."];

export function Services() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length),
      2600,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <Section id="services">
      
      {/* Intro Composition exactly as provided */}
      <div className="mb-24 flex flex-col items-start md:flex-row md:items-end md:justify-between w-full relative z-10 intro-stage">
        
        <div>
          <h1 className="intro-title" aria-label="What we do.">
            <span className="intro-row" aria-hidden="true">
              <span className="word-what">
                {"WHAT WE".split("").map((ch, i) => (
                  <span
                    key={i}
                    className="letter"
                    style={{ animationDelay: `${0.35 + i * 0.06}s` }}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                ))}
              </span>
            </span>
            <span className="intro-underline" aria-hidden="true" />
            <span
              className="intro-rotator"
              aria-hidden="true"
              style={{ "--wi": wordIndex } as CSSProperties}
            >
              <span className="intro-rotator-track">
                {ROTATING_WORDS.map((word) => (
                  <span key={word} className="intro-rotator-word">
                    {word}
                  </span>
                ))}
              </span>
            </span>
          </h1>
        </div>

        <div className="mt-8 md:mt-0 md:pb-6 ml-auto md:ml-0 md:pl-12 lg:pl-20">
          <p className="intro-sub text-left md:text-right !mt-0 max-w-[280px] lg:max-w-[320px]">
            <strong>Six things, done properly.</strong> Nothing improvised.
          </p>
        </div>

      </div>

      <div className="relative mt-20 border-l-4 border-t-4 border-border/20 bg-surface/20 backdrop-blur-sm rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-6">
          {services.map((s, index) => {
            // Determine col span for Bento layout
            let colSpan = "md:col-span-2"; // 1/3
            if (index === 0) colSpan = "md:col-span-4"; // 2/3
            if (index === 1) colSpan = "md:col-span-2"; // 1/3
            if (index === 2) colSpan = "md:col-span-2"; // 1/3
            if (index === 3) colSpan = "md:col-span-4"; // 2/3
            if (index === 4) colSpan = "md:col-span-3"; // 1/2
            if (index === 5) colSpan = "md:col-span-3"; // 1/2

            return (
              <motion.div 
                key={s.title} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative border-r-4 border-b-4 border-border/20 p-6 sm:p-8 hover:bg-white/[0.02] transition-colors duration-500 overflow-hidden",
                  colSpan
                )}
              >
                {/* Subtle spotlight gradient on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_bottom_right,rgba(52,211,153,0.03)_0%,transparent_60%)]" />

                <div className="flex h-full flex-col justify-between gap-8 relative z-10">
                  <div className="flex justify-end items-start h-8">
                    <span className="font-display text-2xl opacity-0 -translate-x-4 translate-y-4 rotate-12 transition-all duration-500 ease-[0.22,1,0.36,1] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0 text-accent">
                      ↗
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-[0.9] tracking-[-0.02em] mb-4 transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:text-foreground break-words text-foreground/90">
                      {s.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500 max-w-md">
                      {s.blurb}
                    </p>

                    <ul className="flex flex-wrap gap-x-2 gap-y-2 mt-6">
                      {s.includes.map((item, i) => (
                        <li 
                          key={item} 
                          className="label-meta text-[10px] sm:text-xs text-foreground/50 border border-border/40 rounded-full px-3 py-1 backdrop-blur-md bg-surface/50 transition-all duration-500 group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:text-foreground/90"
                          style={{ transitionDelay: `${i * 40}ms` }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plus Intersection Icon */}
                {(index === 0 || index === 2) && (
                  <div className="absolute -bottom-[18px] -right-[18px] z-20 hidden md:flex h-8 w-8 items-center justify-center rounded-full border-4 border-background bg-background text-accent/60 font-display text-lg transition-transform duration-700 ease-in-out group-hover:rotate-90 group-hover:text-accent group-hover:scale-110">
                    +
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
