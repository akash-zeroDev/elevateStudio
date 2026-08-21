import { principles } from "@/data/studio";
import { LineReveal, Reveal, Section } from "./primitives";

export function Philosophy() {
  return (
    <Section label={{ index: "03", text: "Why us" }}>
      <h2 className="display-xl text-[11vw] leading-[0.88] lg:text-[7.5vw]">
        <LineReveal
          lines={[
            <>Small team.</>,
            <>Direct talk.</>,
            <>
              No corporate <span className="text-accent">theater.</span>
            </>,
          ]}
        />
      </h2>

      <Reveal delay={0.15}>
        <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground lg:ml-auto lg:mt-16">
          You work directly with the people designing and building the project. Decisions happen in
          a message, not a meeting, and nothing gets lost between four layers of management.
        </p>
      </Reveal>

      <ul className="mt-20 border-t border-border">
        {principles.map((p, i) => (
          <Reveal as="li" key={p.index} delay={i * 0.05}>
            <div className="grid items-baseline gap-2 border-b border-border py-8 md:grid-cols-12 md:gap-8">
              <span className="label-meta text-accent md:col-span-1">{p.index}</span>
              <h3 className="font-display text-2xl uppercase tracking-[-0.02em] md:col-span-5 md:text-3xl">
                {p.title}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-6">
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
