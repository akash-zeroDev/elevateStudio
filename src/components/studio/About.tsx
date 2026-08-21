import { expertise, stack, studio } from "@/data/studio";
import { LineReveal, Reveal, Section } from "./primitives";

export function About() {
  return (
    <Section id="about" label={{ index: "05", text: "About the studio" }}>
      <h2 className="display-xl text-[11vw] leading-[0.88] lg:text-[7vw]">
        <LineReveal
          lines={[
            <>About the</>,
            <>
              <span className="italic font-normal lowercase text-accent">studio.</span>
            </>,
          ]}
        />
      </h2>

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5 lg:col-start-7">
          <Reveal>
            <p className="text-base leading-relaxed text-foreground/85">
              {studio.fullName} is a small independent studio working directly with founders and 
              small teams. One lead designer-engineer, a short bench of trusted collaborators for 
              motion, copy and photography when a project calls for it.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-muted-foreground">
              That means fewer projects at once, faster decisions, and the person you brief is the
              person doing the work. We're not trying to become an agency. We're trying to keep the
              work good.
            </p>
          </Reveal>

          {/* Founder Profile Block */}
          <Reveal delay={0.2}>
            <div className="mt-8 flex items-center gap-5 rounded-2xl border border-border/50 bg-surface/30 p-4 backdrop-blur-sm sm:p-5">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border/50 bg-surface sm:h-20 sm:w-20">
                {/* Placeholder Image - You can replace this src with your own photo later */}
                <img 
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" 
                  alt="Founder" 
                  className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
              </div>
              <div>
                <h3 className="font-display text-xl tracking-[0.02em] sm:text-2xl text-foreground">
                  {studio.founderName}
                </h3>
                <p className="label-meta mt-1">Founder & Lead Engineer</p>
              </div>
            </div>
          </Reveal>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 self-start lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <div>
            <dt className="label-meta">Based in</dt>
            <dd className="mt-2 font-display text-lg uppercase tracking-[-0.01em]">{studio.location}</dd>
          </div>
          <div>
            <dt className="label-meta">Availability</dt>
            <dd className="mt-2 font-display text-lg uppercase tracking-[-0.01em] text-accent">
              Q3 2026 — open
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="label-meta">Expertise</dt>
            <dd className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {expertise.map((e) => (
                <span key={e} className="text-sm text-foreground/85">
                  {e}
                </span>
              ))}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="label-meta">Tools &amp; technologies</dt>
            <dd className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {stack.map((t) => (
                <span key={t} className="text-sm text-muted-foreground">
                  {t}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
