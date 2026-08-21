import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { testimonials } from "@/data/studio";
import { Section } from "./primitives";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  const t = testimonials[i]!;

  return (
    <Section label={{ index: "06", text: "In their words" }}>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-[6.5vw] leading-[1.05] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                <span className="text-faint">“</span>
                {t.quote}
                <span className="text-faint">”</span>
              </p>
              <footer className="mt-8 flex flex-wrap items-center gap-x-4">
                <span className="font-display text-sm uppercase tracking-[0.14em]">— {t.name}</span>
                <span className="label-meta">{t.role}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex gap-3 lg:col-span-3 lg:flex-col lg:items-end lg:justify-end">
          {testimonials.map((item, idx) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Show testimonial from ${item.name}`}
              aria-current={idx === i}
              data-cursor="link"
              className="group flex h-11 items-center gap-3"
            >
              <span className="label-meta hidden group-hover:text-foreground lg:block">
                0{idx + 1}
              </span>
              <span
                className={cn(
                  "block h-px transition-all duration-500",
                  idx === i ? "w-16 bg-accent" : "w-8 bg-border-strong group-hover:w-12",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}
