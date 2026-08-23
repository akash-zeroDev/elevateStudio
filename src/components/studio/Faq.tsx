import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { faqs } from "@/data/studio";
import { LineReveal, Section } from "./primitives";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <Section className="bg-surface/40">
      <div className="grid gap-10 lg:grid-cols-12">
        <h2 className="display-xl text-[10vw] leading-[0.9] lg:col-span-4 lg:text-[4.5vw]">
          <LineReveal lines={[<>Questions.</>]} />
        </h2>

        <div className="lg:col-span-8">
          <ul className="border-t border-border">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="border-b border-border">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      data-cursor="link"
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={cn(
                          "font-display text-lg tracking-[-0.01em] transition-colors duration-300 sm:text-xl",
                          isOpen ? "text-accent" : "hover:text-accent",
                        )}
                      >
                        {f.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "shrink-0 text-xl transition-transform duration-500",
                          isOpen ? "rotate-45 text-accent" : "text-faint",
                        )}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduced ? { height: "auto" } : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? { height: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 text-sm leading-relaxed text-muted-foreground">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
