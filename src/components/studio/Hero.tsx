import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring, useAnimationFrame } from "motion/react";
import { cn } from "@/lib/utils";

export function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  
  // -- SCROLL EFFECTS --
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const fadeOut = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const slideUp = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const marqueeScrollX = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // -- MOUSE PROXIMITY PARALLAX --
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background moves slightly WITH the mouse (deep)
  const parallaxBgX = useTransform(smoothX, [-1000, 1000], [8, -8]);
  const parallaxBgY = useTransform(smoothY, [-1000, 1000], [8, -8]);
  
  // Typography moves slightly AGAINST the mouse (foreground)
  const parallaxTextX = useTransform(smoothX, [-1000, 1000], [-15, 15]);
  const parallaxTextY = useTransform(smoothY, [-1000, 1000], [-15, 15]);

  // Highlight pill moves slightly MORE (physical separation)
  const parallaxPillX = useTransform(smoothX, [-1000, 1000], [-25, 25]);
  const parallaxPillY = useTransform(smoothY, [-1000, 1000], [-25, 25]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // For parallax
    mouseX.set(x - rect.width / 2);
    mouseY.set(y - rect.height / 2);
    
    // For CSS Grid Masking
    sectionRef.current.style.setProperty("--mouse-x", `${x}px`);
    sectionRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  // -- SEAMLESS MARQUEE PHYSICS --
  const marqueeX = useMotionValue(0);
  const baseVelocity = -0.05; // 0.05% per frame
  const velocityFactor = useMotionValue(1);
  const smoothVelocity = useSpring(velocityFactor, { damping: 40, stiffness: 200 });

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const moveBy = baseVelocity * (delta / 16.66) * smoothVelocity.get();
    let currentX = marqueeX.get() + moveBy;
    
    if (currentX <= -50) {
       currentX = currentX + 50;
    }
    marqueeX.set(currentX);
  });

  const marqueeTransform = useTransform(marqueeX, (v) => `${v}%`);
  const combinedMarqueeX = useTransform(() => `calc(${marqueeTransform.get()} + ${marqueeScrollX.get()}px)`);

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#0a0a0c]"
    >
      {/* ============================================================== */}
      {/* 1. OVERSIZED CROPPED GRAPHIC SYSTEM (Design 2: Sliced Rings)   */}
      {/* ============================================================== */}
      <motion.div 
        style={{ x: reduced ? 0 : parallaxBgX, y: reduced ? 0 : parallaxBgY }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        {/* Base Dark Canvas */}
        <div className="absolute inset-0 bg-[#0a0a0c]" />

        {/* The Enormous Graphic Poster Element */}
        {/* Scaled beyond the viewport so it feels heavily cropped */}
        <motion.div 
          className="absolute inset-[-20%] w-[140%] h-[140%] opacity-100"
          animate={reduced ? {} : { rotate: [0, 1, 0] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <svg width="100%" height="100%" viewBox="0 0 2000 2000" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            
            {/* Giant Graphic Composition shifted to dominate the background organically */}
            <g transform="translate(1000, 1000)">
               
               {/* 1. Massive Solid Architectural Block anchoring bottom left */}
               <rect x="-1500" y="200" width="1200" height="1200" fill="#14141a" />
               <rect x="-1500" y="200" width="1200" height="4" fill="#22222c" />

               {/* 2. Enormous Outer Geometric Ring (Charcoal) */}
               {/* Color made bright enough to be distinctly visible but remain background */}
               <circle cx="0" cy="0" r="850" fill="none" stroke="#1c1c24" strokeWidth="180" />
               
               {/* 3. Offset Inner Ring (Deep Violet) */}
               <circle cx="40" cy="-40" r="650" fill="none" stroke="#26233d" strokeWidth="80" opacity="0.9" />
               
               {/* 4. Fragmented Accent Arc (Electric Green tinted) */}
               <path d="M -500 -500 A 707 707 0 0 1 500 -500" fill="none" stroke="#233315" strokeWidth="120" />
               
               {/* 5. Giant Diagonal Negative Space Slice cutting through the geometry */}
               <rect x="-1800" y="-80" width="3600" height="160" fill="#0a0a0c" transform="rotate(-25)" />
               
               {/* Fine editorial accent lines framing the slice */}
               <rect x="-1800" y="-80" width="3600" height="2" fill="rgba(255,255,255,0.06)" transform="rotate(-25)" />
               <rect x="-1800" y="80" width="3600" height="2" fill="rgba(212,246,61,0.12)" transform="rotate(-25)" />
               
               {/* 6. Oversized Abstract Pixel details */}
               <rect x="500" y="300" width="120" height="120" fill="#1c1c24" />
               <rect x="620" y="420" width="120" height="120" fill="#1c1c24" opacity="0.5" />
               <rect x="740" y="540" width="120" height="120" fill="#1c1c24" opacity="0.2" />

            </g>
            
          </svg>
        </motion.div>

        {/* Paper / Ink Texture (Print Materiality) */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
        
        {/* Subtle vignetting to ensure typography remains perfectly readable in the center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0a0c_100%)] opacity-70 pointer-events-none" />
      </motion.div>

      {/* ============================================================== */}
      {/* 2. FOREGROUND TYPOGRAPHY & INTERACTION LAYER                   */}
      {/* ============================================================== */}
      <motion.div 
        style={{ opacity: fadeOut, y: slideUp }} 
        className="relative z-10 flex w-full max-w-[1600px] mx-auto flex-col h-full px-6 md:px-12 lg:px-20 pt-28 pb-12"
      >
        
        {/* ELEVATE STUDIO Signature */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-full flex justify-start mb-16 md:mb-24 group cursor-default"
        >
          <h1 
            className="text-lg md:text-xl lg:text-2xl text-foreground/90 uppercase leading-[0.85] tracking-tight transition-transform duration-500 group-hover:scale-[1.02]"
            style={{ fontFamily: "var(--font-pixel)", textShadow: "0 0 20px rgba(255,255,255,0.05)" }}
          >
            ELEVATE<br/>STUDIO
          </h1>
        </motion.div>

        {/* Main Headline Block */}
        <motion.div 
          style={{ x: reduced ? 0 : parallaxTextX, y: reduced ? 0 : parallaxTextY }}
          className="w-full flex flex-col items-start justify-center flex-grow relative"
        >
          
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="w-full"
          >
            <h2 className="text-[14vw] md:text-[10vw] lg:text-[9vw] leading-[0.85] font-display font-medium uppercase tracking-tight text-foreground flex flex-col">
              <span className="block">DESIGNING</span>
              <span className="flex items-center gap-3 md:gap-6 mt-1 md:mt-3 flex-wrap">
                DIGITAL 
                
                {/* Physical Highlighted Pill */}
                <motion.span 
                  initial={reduced ? false : { opacity: 0, scale: 0.9, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: -2 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                  style={{ x: reduced ? 0 : parallaxPillX, y: reduced ? 0 : parallaxPillY }}
                  className="relative inline-flex items-center justify-center bg-accent text-black rounded-[3rem] px-6 md:px-10 pb-1 md:pb-2 pt-1.5 md:pt-3 shadow-[0_0_40px_rgba(212,246,61,0.2)] mx-2 cursor-crosshair group transition-colors duration-500 hover:bg-[#E2FF54]"
                >
                  <span className="relative z-10 transition-all duration-500 group-hover:tracking-wider">
                    PRODUCTS
                  </span>
                  {/* Hover Bloom */}
                  <span className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 rounded-full" />
                </motion.span>
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            className="w-full mt-2 md:mt-4 pl-2 md:pl-32 lg:pl-48"
          >
             <h2 className="text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.85] font-serif italic text-foreground/80 tracking-tight normal-case">
               and engineering.
             </h2>
          </motion.div>

          {/* Graphic Marquee Band */}
          <motion.div
            initial={reduced ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
            onMouseEnter={() => velocityFactor.set(0.2)}
            onMouseLeave={() => velocityFactor.set(1)}
            className="w-[120vw] -ml-[10vw] mt-16 md:mt-24 lg:mt-32 -rotate-2 relative z-20 pointer-events-auto"
          >
             <div className="overflow-hidden rounded-[5rem] bg-indigo-600/95 backdrop-blur-md h-[12vw] sm:h-[9vw] md:h-[7vw] lg:h-[5.5vw] flex items-center shadow-[0_0_50px_rgba(79,70,229,0.2)] border border-white/10 cursor-ew-resize transition-transform duration-500 hover:scale-[1.01]">
                <motion.div 
                  style={{ x: combinedMarqueeX }} 
                  className="flex whitespace-nowrap text-[4.5vw] sm:text-[3vw] md:text-[2.2vw] lg:text-[1.8vw] font-display uppercase tracking-widest text-white/95"
                >
                  {[...Array(8)].map((_, i) => (
                     <span key={i} className="px-8 flex items-center gap-8 group/item">
                       BRANDS 
                       <span className="opacity-30 group-hover/item:opacity-100 group-hover/item:text-accent transition-all duration-500">✦</span> 
                       DIGITAL PRODUCTS 
                       <span className="opacity-30 group-hover/item:opacity-100 group-hover/item:text-accent transition-all duration-500">✦</span> 
                       WEBSITES 
                       <span className="opacity-30 group-hover/item:opacity-100 group-hover/item:text-accent transition-all duration-500">✦</span> 
                       EXPERIENCES 
                       <span className="opacity-30 group-hover/item:opacity-100 group-hover/item:text-accent transition-all duration-500">✦</span>
                     </span>
                  ))}
                </motion.div>
             </div>
          </motion.div>
          
        </motion.div>

        {/* ============================================================== */}
        {/* 3. SUPPORTING EDITORIAL DETAILS                                */}
        {/* ============================================================== */}
        <div className="w-full flex justify-between items-end mt-12 md:mt-0 relative z-10 pointer-events-none">
           
           <motion.div
             initial={reduced ? false : { opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1.5, delay: 1.1 }}
             className="hidden md:flex flex-col gap-1 items-start justify-end"
           >
             <div className="w-2 h-2 rounded-full bg-accent mb-2 animate-pulse shadow-[0_0_10px_rgba(212,246,61,0.5)]" />
             <span className="text-[9px] uppercase tracking-widest text-muted-foreground/40 font-display">
               LAT: 34.0522 • LNG: -118.2437
             </span>
             <span className="text-[9px] uppercase tracking-widest text-muted-foreground/40 font-display">
               AVAILABLE FOR WORK
             </span>
           </motion.div>

        </div>

      </motion.div>
    </section>
  );
}
