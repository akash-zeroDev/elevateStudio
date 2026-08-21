import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, AnimatePresence } from "motion/react";
import { process as processSteps } from "@/data/studio";
import { cn } from "@/lib/utils";

export function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // We want to scroll past this section for 400vh to give enough time to read 6 steps.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate which step is active
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const num = processSteps.length;
    const index = Math.min(Math.max(0, Math.round(latest * (num - 1))), num - 1);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  // Each step is 30 degrees apart on the wheel.
  // To bring step `i` to 0 degrees, the wheel must rotate by `-(i * 30)` degrees.
  const maxRotation = -(processSteps.length - 1) * 30;
  const rotation = useTransform(scrollYProgress, [0, 1], [0, maxRotation]);

  return (
    <section ref={containerRef} id="process" className="relative h-[400vh] bg-surface/30">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        
        {/* The Rotating Wheel */}
        <motion.div
          className="absolute top-1/2 left-[-20vw] md:left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/40 w-[120vw] h-[120vw] md:w-[100vh] md:h-[100vh]"
          style={{ rotate: rotation }}
        >
          {processSteps.map((step, i) => (
            <div
              key={step.index}
              className="absolute inset-0"
              style={{ transform: `rotate(${i * 30}deg)` }}
            >
              {/* Anchor the number to the far right edge of the wheel */}
              <div className="absolute top-1/2 right-0 flex h-20 w-20 md:h-24 md:w-24 -translate-y-1/2 translate-x-1/2 items-center justify-center">
                <span
                  className={cn(
                    "font-display text-5xl md:text-7xl transition-all duration-500",
                    activeIndex === i ? "text-accent scale-110" : "text-muted-foreground/30 scale-75"
                  )}
                >
                  {step.index}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* The Content */}
        <div className="relative z-10 flex h-full w-full flex-col justify-center pl-[50vw] pr-6 md:pl-[55vh] md:pr-24 lg:pl-[60vh] xl:pl-[65vh]">
          <h2 className="absolute top-10 right-6 md:right-14 md:top-14 font-display text-2xl tracking-widest text-muted-foreground/50 uppercase">
            How we work
          </h2>
          
          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="label-meta tracking-[0.2em] text-accent">Phase {processSteps[activeIndex].index}</span>
                <h3 className="mt-4 mb-6 font-display text-5xl md:text-7xl uppercase leading-[0.9] tracking-[-0.02em]">
                  {processSteps[activeIndex].title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  {processSteps[activeIndex].body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
