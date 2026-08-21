import { services } from "@/data/studio";
import { LineReveal, Section } from "./primitives";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <Section id="services" label={{ index: "02", text: "Capabilities" }}>
      <div className="mb-16 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <h2 className="display-xl text-[12vw] leading-[0.85] tracking-tighter lg:text-[8.5vw]">
          <LineReveal lines={[
            <>What we</>, 
            <><span className="text-accent italic">do.</span></>
          ]} />
        </h2>
        <p className="max-w-md text-base md:text-lg leading-relaxed text-muted-foreground pb-2">
          Six things, done properly. If a project needs something outside this list, we'll say so
          rather than improvise.
        </p>
      </div>

      <div className="relative mt-20 border-l-4 border-t-4 border-border/20 bg-surface/20 backdrop-blur-sm rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-6">
          {services.map((s, index) => {
            // Determine col span for Bento layout
            let colSpan = "md:col-span-2"; // 1/3
            if (index === 0) colSpan = "md:col-span-4"; // 2/3
            if (index === 1) colSpan = "md:col-span-2"; // 1/3
            if (index === 2) colSpan = "md:col-span-2"; // 1/3
            if (index === 3) colSpan = "md:col-span-4"; // 2/3
            if (index === 4) colSpan = "md:col-span-3"; // 1/2
            if (index === 5) colSpan = "md:col-span-3"; // 1/2

            return (
              <div 
                key={s.title} 
                className={cn(
                  "group relative border-r-4 border-b-4 border-border/20 p-6 sm:p-8 hover:bg-surface/60 transition-colors duration-500",
                  colSpan
                )}
              >
                <div className="flex h-full flex-col justify-between gap-8">
                  <div className="flex justify-between items-start">
                    <span className="font-display text-xs font-bold tracking-[0.2em] text-accent">
                      {s.index}
                    </span>
                    <span className="font-display text-2xl opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-accent">
                      ↗
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase leading-[0.9] tracking-[-0.02em] mb-4 transition-transform duration-500 group-hover:translate-x-2 break-words hyphens-auto">
                      {s.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-500 max-w-md">
                      {s.blurb}
                    </p>

                    <ul className="flex flex-wrap gap-x-2 gap-y-2 mt-6">
                      {s.includes.map((item) => (
                        <li key={item} className="label-meta text-[10px] sm:text-xs text-foreground/60 border border-border/40 rounded-full px-3 py-1 backdrop-blur-md bg-surface/50">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plus Intersection Icon */}
                {(index === 0 || index === 2) && (
                  <div className="absolute -bottom-[18px] -right-[18px] z-10 hidden md:flex h-8 w-8 items-center justify-center rounded-full border-4 border-border/20 bg-background text-accent font-display text-lg">
                    +
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
