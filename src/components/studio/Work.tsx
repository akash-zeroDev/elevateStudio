import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function Work() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImmersive, setIsImmersive] = useState(false);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["portfolio_projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("portfolio_projects").select("*").order("index");
      if (error) throw error;
      return data;
    },
  });

  // The container will be 400vh tall to give plenty of scrolling room.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate active index based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // If we are in immersive mode, scrolling shouldn't break out immediately, 
    // but typically we let it scrub. For simplicity, we just scrub index.
    const num = projects.length;
    // Math.min/max ensures we stay within bounds
    const index = Math.min(Math.max(0, Math.floor(latest * num)), num - 1);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  // Toggle global body class to hide navbar when in immersive mode
  useEffect(() => {
    if (isImmersive) {
      document.body.classList.add("immersive-mode");
    } else {
      document.body.classList.remove("immersive-mode");
    }
    return () => document.body.classList.remove("immersive-mode");
  }, [isImmersive]);

  // We move the conditional inside the sticky container so the section and ref are ALWAYS rendered.
  // This ensures useScroll can correctly calculate the 400vh height.
  const activeProject = projects.length > 0 ? projects[activeIndex] : null;

  const getImageUrl = (path: string) => {
    return supabase.storage.from("portfolio-media").getPublicUrl(path).data.publicUrl;
  };

  return (
    <section ref={containerRef} id="work" className="relative h-[400vh] w-full bg-background">
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        
        {(isLoading || projects.length === 0 || !activeProject) ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : (
          <>
            {/* Cinematic Background Crossfade */}
            <div 
              className={`absolute inset-0 z-0 bg-background ${isImmersive ? "cursor-pointer" : ""}`}
              onClick={() => {
                if (isImmersive) setIsImmersive(false);
              }}
            >
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={activeIndex}
                  src={getImageUrl(activeProject.image)}
                  alt="Background"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: isImmersive ? 1 : 0.25, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
              {/* Gradient Overlay to ensure text readability */}
              <motion.div 
                animate={{ opacity: isImmersive ? 0.4 : 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" 
              />
              <motion.div 
                animate={{ opacity: isImmersive ? 0.2 : 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" 
              />
            </div>

            {/* Immersive Close Button */}
            <AnimatePresence>
              {isImmersive && (
                <motion.button
                  key="close-btn"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onClick={() => setIsImmersive(false)}
                  className="absolute right-8 top-8 z-50 rounded-full border border-border/50 bg-surface/40 px-6 py-2.5 text-sm font-medium tracking-wide text-foreground backdrop-blur-md transition-colors hover:bg-surface/60 sm:right-14 sm:top-10"
                >
                  Close Project
                </motion.button>
              )}
            </AnimatePresence>

        {/* Foreground Content */}
        <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-14 lg:pb-24 pointer-events-none">
          
          {/* Left Side: Typography */}
          <div className="w-full lg:w-[45%] pr-4">
            <AnimatePresence mode="popLayout">
              {!isImmersive && (
                <motion.div
                  key={`text-${activeIndex}`}
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
                  
                  <h2 className="font-display text-4xl font-medium leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl break-words drop-shadow-md">
                    {activeProject.name}
                  </h2>
                  
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base drop-shadow-sm">
                    {activeProject.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 pointer-events-auto">
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
              )}
            </AnimatePresence>
          </div>

          {/* Right Side: Horizontal Scroll Track */}
          <AnimatePresence>
            {!isImmersive && (
              <motion.div 
                key="carousel"
                className="mt-12 w-full lg:mt-0 lg:w-[50%] overflow-hidden relative pb-10 pointer-events-auto"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
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
                      <motion.button
                        key={project.id}
                        data-cursor="view"
                        onClick={() => {
                          if (isActive) setIsImmersive(true);
                        }}
                        className="group relative block shrink-0 overflow-hidden rounded-md bg-surface text-left"
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
                          src={getImageUrl(project.image)}
                          alt={project.name}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        
                        {/* Dark overlay for inactive cards */}
                        <div 
                          className="absolute inset-0 bg-background/30 transition-opacity duration-500 group-hover:bg-transparent" 
                          style={{ opacity: isActive ? 0 : 1 }}
                        />
                      </motion.button>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
        </>
        )}
      </div>
    </section>
  );
}
