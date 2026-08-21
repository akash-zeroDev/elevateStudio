import { metrics } from "@/data/studio";
import { Reveal } from "./primitives";

export function Metrics() {
  return (
    <section aria-label="Studio numbers" className="border-t border-border px-5 py-16 sm:px-8 lg:px-14">
      <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.08}>
            <div className="border-l border-border pl-5">
              <dt className="label-meta">{m.label}</dt>
              <dd className="mt-2 font-display text-5xl leading-none tracking-[-0.05em] md:text-6xl">
                {m.value}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
