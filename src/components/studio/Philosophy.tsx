import { principles } from "@/data/studio";
import { LineReveal, Section } from "./primitives";

export function Philosophy() {
  return (
    <Section id="philosophy" className="overflow-visible pb-0 md:pb-0 lg:pb-0">
      <div className="mb-24 lg:mb-32 max-w-[90vw]">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-12 bg-accent"></div>
          <p className="text-xs font-display tracking-[0.25em] text-accent uppercase">
            Studio Tenets
          </p>
        </div>
        <h2 className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] font-bold tracking-[-0.04em]">
          <LineReveal
            lines={[
              <span key="1" className="block text-foreground">Substance</span>,
              <span key="2" className="block flex items-center gap-4 md:gap-8">
                <em className="font-serif italic font-light text-muted-foreground pr-2">over</em>
                <span className="text-foreground">spectacle.</span>
                <span className="hidden md:block h-[3px] flex-1 bg-border mt-3 max-w-sm rounded-full"></span>
              </span>,
            ]}
          />
        </h2>
      </div>

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
