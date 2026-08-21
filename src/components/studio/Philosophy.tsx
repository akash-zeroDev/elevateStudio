import { principles } from "@/data/studio";
import { LineReveal, Section } from "./primitives";

export function Philosophy() {
  return (
    <Section id="philosophy" className="overflow-visible pb-0 md:pb-0 lg:pb-0">
      <h2 className="display-xl text-[11vw] leading-[0.88] lg:text-[7.5vw] mb-20">
        <LineReveal
          lines={[
            <>Small team.</>,
            <>Direct talk.</>,
            <>
              No corporate <span className="font-serif italic text-foreground/80">theater.</span>
            </>,
          ]}
        />
      </h2>

      {/* 
        Sticky Stacking Cards Container
        We add a massive bottom padding so the user can scroll past the sticky stack smoothly.
      */}
      <div className="relative mt-10 lg:mt-24 pb-[20vh] flex flex-col gap-10">
        {principles.map((p, i) => (
          <div
            key={p.index}
            className="sticky w-full rounded-t-[2.5rem] md:rounded-[3rem] border border-border/40 bg-surface/30 p-8 sm:p-12 md:p-16 lg:p-20 backdrop-blur-2xl shadow-2xl transition-all"
            style={{ 
              // Each card sticks significantly lower than the previous one, 
              // leaving enough room for the top edge and title of the previous cards to remain visible.
              top: `calc(10vh + ${i * 12}vh)`, 
              zIndex: i + 10,
            }}
          >
            {/* Inner Top Highlight for 3D Glass Depth */}
            <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
            
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start lg:items-center">
               <div className="flex flex-col gap-4 w-full lg:w-1/2">
                 <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground">
                   {p.title}
                 </h3>
               </div>
               
               <p className="w-full lg:w-1/2 text-base md:text-lg leading-relaxed text-muted-foreground/90">
                 {p.body}
               </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
