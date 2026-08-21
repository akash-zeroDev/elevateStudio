import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { budgets, projectTypes, studio } from "@/data/studio";
import { ArrowLink, LineReveal, Section } from "./primitives";
import { cn } from "@/lib/utils";

type Fields = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

const empty: Fields = { name: "", email: "", company: "", projectType: "", budget: "", message: "" };

async function submit(values: Fields) {
  await new Promise((r) => setTimeout(r, 700));
  return { ok: true as const, values };
}

function fieldClasses(hasError: boolean) {
  return cn(
    "w-full border-b bg-transparent py-3 text-base text-foreground outline-none transition-colors duration-300 placeholder:text-faint focus:border-accent",
    hasError ? "border-destructive" : "border-border",
  );
}

export function Contact() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof Fields) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!values.name.trim()) next.name = "Tell us your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "A valid email, please";
    if (values.message.trim().length < 10) next.message = "A sentence or two is enough";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setState("sending");
    await submit(values);
    setState("sent");
  };

  return (
    <Section id="contact" label={{ index: "08", text: "Start a project" }}>
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="display-xl text-[13vw] leading-[0.86] lg:text-[6.5vw]">
            <LineReveal
              lines={[
                <>Start a</>,
                <>
                  <span className="italic font-normal lowercase text-accent">project.</span>
                </>,
              ]}
            />
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            Tell us what you're working on — the messy version is fine. We reply to every serious
            enquiry within two working days.
          </p>

          <dl className="mt-12 space-y-6 border-t border-border pt-8">
            <div>
              <dt className="label-meta">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${studio.email}`}
                  data-cursor="link"
                  className="link-underline font-display text-xl tracking-[-0.01em] text-accent"
                >
                  {studio.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-meta">Studio</dt>
              <dd className="mt-1 font-display text-xl uppercase tracking-[-0.01em]">
                {studio.location}
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            {state === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="border border-border-strong p-10"
                role="status"
              >
                <span className="label-meta text-accent">Message received</span>
                <p className="mt-4 font-display text-3xl uppercase leading-[0.95] tracking-[-0.03em]">
                  Thanks, {values.name.split(" ")[0]}.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  We've got the details. Expect a reply at {values.email} within two working days.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setValues(empty);
                    setState("idle");
                  }}
                  className="link-underline mt-8 font-display text-xs uppercase tracking-[0.16em] text-accent"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-8 sm:grid-cols-2"
              >
                <div className="sm:col-span-1">
                  <label htmlFor="c-name" className="label-meta">
                    Name *
                  </label>
                  <input
                    id="c-name"
                    value={values.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    className={fieldClasses(!!errors.name)}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="mt-2 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="c-email" className="label-meta">
                    Email *
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    value={values.email}
                    onChange={set("email")}
                    placeholder="you@company.com"
                    className={fieldClasses(!!errors.email)}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="mt-2 text-xs text-destructive">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-company" className="label-meta">
                    Company
                  </label>
                  <input
                    id="c-company"
                    value={values.company}
                    onChange={set("company")}
                    placeholder="Optional"
                    className={fieldClasses(false)}
                  />
                </div>
                <div>
                  <label htmlFor="c-type" className="label-meta">
                    Project type
                  </label>
                  <select
                    id="c-type"
                    value={values.projectType}
                    onChange={set("projectType")}
                    className={cn(fieldClasses(false), "appearance-none")}
                  >
                    <option value="">Select</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t} className="bg-background">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="c-budget" className="label-meta">
                    Budget range
                  </label>
                  <select
                    id="c-budget"
                    value={values.budget}
                    onChange={set("budget")}
                    className={cn(fieldClasses(false), "appearance-none")}
                  >
                    <option value="">Select</option>
                    {budgets.map((b) => (
                      <option key={b} value={b} className="bg-background">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-message" className="label-meta">
                    What are you building? *
                  </label>
                  <textarea
                    id="c-message"
                    rows={4}
                    value={values.message}
                    onChange={set("message")}
                    placeholder="A few lines about the project, the timeline, and what needs to be solved."
                    className={cn(fieldClasses(!!errors.message), "resize-none")}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-2 text-xs text-destructive">{errors.message}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <ArrowLink type="submit" variant="solid">
                    {state === "sending" ? "Sending" : "Start a project"}
                  </ArrowLink>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
