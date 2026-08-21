import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "motion/react";
import { projects } from "@/data/studio";

export function Work() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // The container will be 400vh tall to give plenty of scrolling room.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate active index based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const num = projects.length;
    // Math.min/max ensures we stay within bounds
    const index = Math.min(Math.max(0, Math.floor(latest * num)), num - 1);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  // Move the cards container horizontally.
  // We no longer need an x transform! We will just collapse the width of past cards to 0.
  // This automatically pulls the track to the left without complex math, and prevents overlap.

  const activeProject = projects[activeIndex];

  return (
    <section ref={containerRef} id="work" className="relative h-[400vh] w-full bg-background">
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        
        {/* Cinematic Background Crossfade */}
        <div className="absolute inset-0 z-0 bg-background">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={activeIndex}
              src={activeProject.image}
              alt="Background"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.25, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
          {/* Gradient Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-14 lg:pb-24">
          
          {/* Left Side: Typography */}
          <div className="w-full lg:w-[45%] pointer-events-none pr-4">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-4">
                  <span className="label-meta tracking-[0.15em] text-foreground/70">
                    {activeProject.category}
                  </span>
                </div>
                
                {/* Adjusted text size so it doesn't overflow and hit the cards */}
                <h2 className="font-display text-4xl font-medium leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl break-words">
                  {activeProject.name}
                </h2>
                
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {activeProject.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {activeProject.services.map((service) => (
                    <span 
                      key={service} 
                      className="rounded-full border border-border/50 bg-surface/40 px-3 py-1 text-xs text-foreground/80 backdrop-blur-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Horizontal Scroll Track */}
          <div className="mt-12 w-full lg:mt-0 lg:w-[50%] overflow-hidden relative pb-10">
            {/* 
              The track translates based on activeIndex. 
              Each inactive card is 200px + 24px gap = 224px.
              So translating by activeIndex * 224 perfectly aligns the new active card!
            */}
            <motion.div 
              className="flex w-max items-end gap-6"
              animate={{ x: -(activeIndex * 224) }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {projects.map((project, i) => {
                const isActive = i === activeIndex;
                const isPast = i < activeIndex;
                
                return (
                  <motion.a
                    href="#work"
                    key={project.id}
                    data-cursor="view"
                    className="group relative block shrink-0 overflow-hidden rounded-md bg-surface"
                    initial={false}
                    animate={{
                      width: isActive ? 320 : 200,
                      height: isActive ? 420 : 280,
                      opacity: isActive ? 1 : (isPast ? 0.3 : 0.6),
                      filter: isActive ? "grayscale(0%)" : "grayscale(80%)",
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    {/* Dark overlay for inactive cards */}
                    <div 
                      className="absolute inset-0 bg-background/30 transition-opacity duration-500 group-hover:bg-transparent" 
                      style={{ opacity: isActive ? 0 : 1 }}
                    />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
