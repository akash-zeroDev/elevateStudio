import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { testimonials } from "@/data/studio";
import { Section } from "./primitives";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const reduced = useReducedMotion();
  const t = testimonials[i]!;

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setI((prev) => (prev + 1) % testimonials.length);
    }, 2000);
    
    return () => clearInterval(timer);
  }, [isPlaying, testimonials.length]);

  return (
    <Section id="testimonials">
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
                <span className="text-accent/50">“</span>
                {t.quote}
                <span className="text-accent/50">”</span>
              </p>
              <footer className="mt-8 flex flex-wrap items-center gap-x-4">
                <span className="font-display text-sm uppercase tracking-[0.14em] text-foreground/90">— {t.name}</span>
                <span className="label-meta text-muted-foreground">{t.role}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-3 lg:items-end lg:justify-start">
          <div className="flex gap-3 lg:flex-col lg:items-end">
            {testimonials.map((item, idx) => (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  setI(idx);
                  setIsPlaying(false); // Pause on manual interaction
                }}
                aria-label={`Show testimonial from ${item.name}`}
                aria-current={idx === i}
                data-cursor="link"
                className="group flex h-11 items-center gap-3"
              >
                <span className={cn(
                  "label-meta hidden lg:block transition-colors",
                  idx === i ? "text-accent" : "text-muted-foreground group-hover:text-foreground"
                )}>
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

          {/* Play/Pause Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            data-cursor="link"
            className="flex items-center gap-2 label-meta text-muted-foreground hover:text-accent transition-colors mt-2"
          >
            {isPlaying ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                PAUSE
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                PLAY
              </>
            )}
          </button>
        </div>
      </div>
    </Section>
  );
}
