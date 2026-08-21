import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

export function LineReveal({
  lines,
  className,
  delay = 0,
  inView = true,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  inView?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = !inView || seen || !!reduced;

  return (
    <span ref={ref} className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={reduced ? false : { y: "110%" }}
            animate={show ? { y: 0 } : { y: "110%" }}
            transition={{ duration: 0.95, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="label-meta text-accent">{index}</span>
      <span className="h-px w-6 bg-border-strong" aria-hidden="true" />
      <span className="label-meta text-foreground/70">{children}</span>
    </div>
  );
}

export function Section({
  id,
  children,
  className,
  label,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  label?: { index: string; text: string };
}) {
  return (
    <section id={id} className={cn("relative border-t border-border px-5 py-24 sm:px-8 md:py-32 lg:px-14", className)}>
      {label && (
        <div className="mb-12 md:mb-20">
          <SectionLabel index={label.index}>{label.text}</SectionLabel>
        </div>
      )}
      {children}
    </section>
  );
}

export function ArrowLink({
  href,
  children,
  variant = "ghost",
  className,
  onClick,
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: "ghost" | "solid" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const base =
    "group inline-flex items-center gap-3 font-display text-sm uppercase tracking-[0.14em] transition-colors duration-300";
  const styles = {
    ghost: "text-foreground hover:text-accent",
    solid: "bg-accent px-6 py-3.5 text-accent-foreground hover:bg-foreground",
    outline: "border border-border-strong px-6 py-3.5 text-foreground hover:border-accent hover:text-accent",
  }[variant];

  const inner = (
    <>
      <span>{children}</span>
      <span className="relative block h-4 w-4 overflow-hidden leading-4" aria-hidden="true">
        <span className="absolute inset-0 block leading-4 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-5">
          →
        </span>
        <span className="absolute inset-0 block leading-4 -translate-x-5 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0">
          →
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn(base, styles, className)} data-cursor="link">
        {inner}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cn(base, styles, className)} data-cursor="link">
      {inner}
    </button>
  );
}
