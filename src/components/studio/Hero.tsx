import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { projects } from "@/data/studio";

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 pb-10 pt-32 sm:px-8 lg:px-14"
    >
      <motion.div 
        style={{ opacity: reduced ? 1 : fade, y: reduced ? 0 : y }} 
        className="relative flex w-full max-w-[1400px] flex-col items-center justify-center"
      >
        
        {/* Left vertical text */}
        <motion.div 
          className="absolute -left-4 top-1/2 hidden -translate-y-1/2 -rotate-180 lg:block xl:-left-12" 
          style={{ writingMode: "vertical-rl" }}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="label-meta tracking-[0.3em] text-muted-foreground/60">( AVAILABLE GLOBALLY )</span>
        </motion.div>

        {/* Right vertical text */}
        <motion.div 
          className="absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block xl:-right-12" 
          style={{ writingMode: "vertical-rl" }}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="label-meta tracking-[0.3em] text-muted-foreground/60">( IG / LN / X )</span>
        </motion.div>

        {/* Main Logo Text */}
        <motion.h1 
          className="text-center font-normal text-[18vw] leading-none tracking-normal text-foreground lg:text-[14vw]"
          style={{ fontFamily: "var(--font-pixel)", textShadow: "0 0 40px rgba(255,255,255,0.05)" }}
          initial={reduced ? false : { opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          EL Studio
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mt-6 text-center font-display text-sm text-muted-foreground md:text-lg lg:text-xl"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Building digital products that people remember.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-24 lg:mt-32"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a
            href="#work"
            data-cursor="link"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <svg
              className="h-4 w-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
}
