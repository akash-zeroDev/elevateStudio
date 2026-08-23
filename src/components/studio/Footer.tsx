import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import elLogo from "@/assets/elevate-studio-logo.png";

const columns = [
  {
    title: "Studio",
    links: [
      { label: "How we work", href: "/#work" },
      { label: "Services", href: "/#services" },
      { label: "Selected work", href: "/#work" },
      { label: "Process", href: "/studio" },
      { label: "About", href: "/studio" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="veil relative overflow-hidden border-t border-border bg-background pt-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]">
          {/* Brand card */}
          <div className="relative flex min-h-[16rem] flex-col justify-between overflow-hidden rounded-3xl bg-accent p-7">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-background/90 p-1.5">
                <img src={elLogo} alt="Elevate" className="h-full w-full object-contain" />
              </span>
              <span className="font-display text-2xl font-extrabold tracking-tight text-background uppercase">
                STUDIO
              </span>
            </div>

            <p className="mt-10 max-w-[16rem] font-display text-sm leading-relaxed font-semibold text-background">
              Design and engineering for products that ship.
              <span className="block font-serif text-lg italic font-normal opacity-70">
                Three people, one room.
              </span>
            </p>
          </div>

          {/* Panel */}
          <div className="member-card rounded-3xl border border-border bg-foreground/[0.04] p-7 sm:p-9">
            <div className="relative z-10 grid gap-10 sm:grid-cols-2">
              {columns.map((col) => (
                <div key={col.title}>
                  <p className="font-display text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase">
                    {col.title}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.href}
                          className="group inline-flex items-center gap-1.5 font-display text-[0.95rem] font-semibold text-foreground transition-colors hover:text-accent"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
            © {new Date().getFullYear()} Elevate Studio. All rights reserved.
          </p>
        </div>
      </div>

      <div aria-hidden className="relative mt-8 select-none overflow-hidden px-4 md:px-12 flex justify-center translate-y-[20%]">
        <p 
          className="font-display font-extrabold tracking-tight"
          style={{ 
            fontSize: "clamp(6rem, 22vw, 25rem)", 
            lineHeight: 0.75,
            WebkitTextStroke: "1px color-mix(in oklab, var(--color-accent) 25%, transparent)",
            color: "transparent"
          }}
        >
          ELEVATE
        </p>
      </div>
    </footer>
  );
}
