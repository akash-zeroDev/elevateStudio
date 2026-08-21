import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#0a0a0c]"
    >
      {/* 1. Atmospheric Background (Deep, Non-Flat Black) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Subtle Violet Left */}
        <motion.div 
          animate={{ x: ["0%", "2%", "0%"], y: ["0%", "2%", "0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,transparent_60%)] blur-[100px]" 
        />
        
        {/* Layer 2: Subtle Green Right */}
        <motion.div 
          animate={{ x: ["0%", "-2%", "0%"], y: ["0%", "-2%", "0%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(212,246,61,0.04)_0%,transparent_60%)] blur-[120px]" 
        />
        
        {/* Layer 3: Radial Lighting Center behind typography */}
        <div className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_50%)] blur-[80px]" />
        
        {/* Layer 4: Extremely faint noise grain */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      </div>

      <motion.div 
        style={{ opacity: reduced ? 1 : fade, y: reduced ? 0 : y }} 
        className="relative z-10 flex w-full max-w-[1600px] mx-auto flex-col h-full px-6 md:px-12 lg:px-20 pt-28 pb-12"
      >
        
        {/* 2. ELEVATE STUDIO Signature */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="w-full flex justify-start mb-16 md:mb-24"
        >
          <h1 
            className="text-lg md:text-xl lg:text-2xl text-foreground/90 uppercase leading-[0.85] tracking-tight"
            style={{ fontFamily: "var(--font-pixel)", textShadow: "0 0 20px rgba(255,255,255,0.05)" }}
          >
            ELEVATE<br/>STUDIO
          </h1>
        </motion.div>

        {/* 3. Main Headline & Typographic Composition */}
        <div className="w-full flex flex-col items-start justify-center flex-grow relative">
          
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="w-full"
          >
            <h2 className="text-[14vw] md:text-[10vw] lg:text-[9vw] leading-[0.85] font-display font-medium uppercase tracking-tight text-foreground">
              <div className="flex flex-col">
                <span className="block">DESIGNING</span>
                <span className="flex items-center gap-3 md:gap-6 mt-1 md:mt-3 flex-wrap">
                  DIGITAL 
                  {/* The Highlighted Graphic Word */}
                  <span className="relative inline-flex items-center justify-center bg-accent text-black rounded-[3rem] px-6 md:px-10 pb-1 md:pb-2 pt-1.5 md:pt-3 -rotate-2 transform hover:-rotate-1 transition-transform duration-500 shadow-[0_0_40px_rgba(212,246,61,0.2)] mx-2">
                    PRODUCTS
                  </span>
                </span>
              </div>
            </h2>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="w-full mt-2 md:mt-4 pl-2 md:pl-32 lg:pl-48"
          >
             <h2 className="text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.85] font-serif italic text-foreground/80 tracking-tight normal-case">
               and engineering.
             </h2>
          </motion.div>

          {/* 4. The Pill-Shaped Marquee (As a diagonal intersecting graphic element) */}
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="w-[120vw] -ml-[10vw] mt-16 md:mt-24 lg:mt-32 -rotate-2 relative z-20 pointer-events-none"
          >
             <div className="overflow-hidden rounded-[5rem] bg-indigo-600 backdrop-blur-md h-[12vw] sm:h-[9vw] md:h-[7vw] lg:h-[5.5vw] flex items-center shadow-[0_0_50px_rgba(79,70,229,0.2)] border border-white/5 pointer-events-auto">
                <motion.div 
                  animate={{ x: ["0%", "-50%"] }} 
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }} 
                  className="flex whitespace-nowrap text-[4.5vw] sm:text-[3vw] md:text-[2.2vw] lg:text-[1.8vw] font-display uppercase tracking-widest text-white/90"
                >
                  {[...Array(8)].map((_, i) => (
                     <span key={i} className="px-8 flex items-center gap-8">
                       BRANDS <span className="opacity-40">✦</span> DIGITAL PRODUCTS <span className="opacity-40">✦</span> WEBSITES <span className="opacity-40">✦</span> EXPERIENCES <span className="opacity-40">✦</span>
                     </span>
                  ))}
                </motion.div>
             </div>
          </motion.div>
          
        </div>

        {/* 5. Supporting Elements (Independent from the typography) */}
        <div className="w-full flex justify-between items-end mt-12 md:mt-0 relative z-10 pointer-events-none">
           
           {/* Decorative Element */}
           <motion.div
             initial={reduced ? false : { opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.8 }}
             className="hidden md:flex flex-col gap-1 items-start justify-end"
           >
             <div className="w-2 h-2 rounded-full bg-accent mb-2 animate-pulse" />
             <span className="text-[9px] uppercase tracking-widest text-muted-foreground/50 font-display">
               LAT: 34.0522 • LNG: -118.2437
             </span>
             <span className="text-[9px] uppercase tracking-widest text-muted-foreground/50 font-display">
               AVAILABLE FOR WORK
             </span>
           </motion.div>

           {/* Supporting Description */}
           <motion.p
             initial={reduced ? false : { opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
             className="max-w-[260px] md:max-w-[300px] text-xs md:text-sm text-muted-foreground/80 leading-relaxed text-left md:text-right ml-auto pointer-events-auto"
           >
             We design brands, digital products and experiences for ambitious startups and businesses.
           </motion.p>
        </div>

      </motion.div>
    </section>
  );
}
