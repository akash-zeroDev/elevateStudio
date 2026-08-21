import { studio } from "@/data/studio";
import { LineReveal, Reveal, Section } from "./primitives";
import founderImg from "@/assets/founder.png";

export function About() {
  return (
    <Section id="about" className="overflow-visible">
      <div className="grid gap-16 lg:gap-8 lg:grid-cols-12 items-start pt-12">
        
        {/* Left Column: Massive Typography & Copy */}
        <div className="flex flex-col lg:col-span-6 lg:pr-8">
          <h2 className="display-xl text-[12vw] leading-[0.88] lg:text-[7vw] mb-12">
            <LineReveal
              lines={[
                <>ABOUT THE</>,
                <>
                  <span className="font-serif italic text-foreground/80">studio.</span>
                </>,
              ]}
            />
          </h2>
          
          <div className="flex flex-col gap-8 mt-4">
            <Reveal>
              <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 font-light max-w-xl">
                We are a dedicated duo working directly with founders and small teams. Backed by a short bench of trusted collaborators for motion, copy and photography when a project calls for it.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl">
                That means fewer projects at once, faster decisions, and the people you brief are the people doing the work. We're not trying to become an agency. We're trying to keep the work good.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Right Column: Subtle Minimal Portraits */}
        <div className="lg:col-span-5 lg:col-start-8 flex flex-col sm:flex-row lg:flex-col gap-8 justify-center mt-8 lg:mt-32">
          
          {/* Card 1: Founder */}
          <Reveal delay={0.3}>
            <div className="group flex flex-col gap-4">
              <div className="relative h-48 w-40 sm:h-56 sm:w-48 overflow-hidden rounded-xl border border-border/40 bg-surface">
                <img 
                  src={founderImg} 
                  alt={studio.founderName}
                  className="h-full w-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-display text-xl tracking-tight text-foreground">
                  {studio.founderName}
                </h4>
                <p className="label-meta text-muted-foreground text-[10px]">FOUNDER & LEAD ENGINEER</p>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Rishu */}
          <Reveal delay={0.4}>
            <div className="group flex flex-col gap-4 lg:ml-24">
              <div className="relative h-48 w-40 sm:h-56 sm:w-48 overflow-hidden rounded-xl border border-border/40 bg-surface">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" 
                  alt="Rishu"
                  className="h-full w-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-display text-xl tracking-tight text-foreground">
                  Rishu
                </h4>
                <p className="label-meta text-muted-foreground text-[10px]">CO-FOUNDER & MARKETER</p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </Section>
  );
}
