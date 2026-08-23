import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

import {
  submitInquiry,
  inquirySchema,
  budgetOptions,
  timelineOptions,
  serviceOptions,
  type InquiryInput,
} from "@/lib/inquiries.functions";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

const trustPoints = [
  "Reply within 24 hours",
  "No sales team, talk to the makers",
];

export function Contact() {
  const heading = useReveal<HTMLDivElement>();
  const formCard = useReveal<HTMLDivElement>();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      services: [],
      budget: "",
      timeline: "",
    },
  });

  const selectedServices = watch("services") ?? [];

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    try {
      await submitInquiry({ data });
      setSubmitted(true);
      reset();
      window.setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  });

  const toggleService = (service: string) => {
    const next = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    setValue("services", next, { shouldValidate: true });
  };

  return (
    <section id="contact" className="veil relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left panel */}
          <div ref={heading.ref} data-visible={heading.visible} className="reveal">
            <p className="font-display text-[0.68rem] tracking-[0.32em] text-primary uppercase">
              Start a project
            </p>

            <h2 className="mt-6 font-display text-5xl leading-[0.9] font-extrabold tracking-tight text-foreground sm:text-7xl">
              <span className="marker-underline inline-block" data-visible={heading.visible}>
                START
              </span>{" "}
              A
              <br />
              <span className="font-serif text-4xl font-normal italic text-muted-foreground sm:text-6xl">
                project.
              </span>
            </h2>

            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Tell us what you are building. We will review the details and come back with honest
              feedback, a rough timeline, and a clear next step.
            </p>

            <ul className="mt-8 space-y-3">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="grid h-5 w-5 place-items-center rounded-full border border-primary/50 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-10 hidden items-center gap-4 lg:flex">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/60">
                <Sparkles className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="font-display text-xs font-bold tracking-[0.08em] text-foreground uppercase">
                  Currently taking new work
                </p>
                <p className="text-xs text-muted-foreground">Two project slots left for Q4</p>
              </div>
            </div>
          </div>

          {/* Form panel */}
          <div
            ref={formCard.ref}
            onMouseMove={onMove}
            data-visible={formCard.visible}
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="project-card reveal relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-foreground">
                  Inquiry sent
                </h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  We received your project details and will reply within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="submit-btn mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-display text-xs font-bold tracking-[0.08em] text-primary-foreground uppercase"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="relative z-10 grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="form-field">
                    <label htmlFor="name" className="field-label">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      {...register("name")}
                      className="field-input"
                    />
                    {errors.name && <p className="field-error">{errors.name.message}</p>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="email" className="field-label">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      {...register("email")}
                      className="field-input"
                    />
                    {errors.email && <p className="field-error">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="company" className="field-label">
                    Company / Organization
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Acme Inc."
                    {...register("company")}
                    className="field-input"
                  />
                </div>

                <div className="form-field">
                  <span className="field-label">Services you need</span>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((service) => {
                      const selected = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`service-pill ${selected ? "selected" : ""}`}
                        >
                          {selected && <Check className="h-3 w-3" />}
                          {service}
                        </button>
                      );
                    })}
                  </div>
                  {errors.services && <p className="field-error">{errors.services.message}</p>}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="form-field">
                    <label htmlFor="budget" className="field-label">
                      Budget range
                    </label>
                    <div className="select-wrap">
                      <select id="budget" {...register("budget")} className="field-select">
                        <option value="">Select a budget</option>
                        {budgetOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="timeline" className="field-label">
                      Timeline
                    </label>
                    <div className="select-wrap">
                      <select id="timeline" {...register("timeline")} className="field-select">
                        <option value="">Select a timeline</option>
                        {timelineOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="message" className="field-label">
                    Project details
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="What are you building, who is it for, and what does success look like?"
                    {...register("message")}
                    className="field-input field-textarea"
                  />
                  {errors.message && <p className="field-error">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="submit-btn mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-display text-xs font-bold tracking-[0.08em] text-primary-foreground uppercase disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending inquiry
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
