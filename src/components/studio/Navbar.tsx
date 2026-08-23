import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav, studio } from "@/data/studio";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    setActive(currentPath);
  }, [currentPath]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-6 z-[70] px-5 sm:px-8 lg:px-14">
        <div className="relative flex w-full items-center justify-end">
          
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="pointer-events-auto relative z-[70] flex h-11 w-11 items-center justify-start md:hidden"
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span
                className={cn(
                  "block h-px bg-foreground transition-all duration-300",
                  open ? "w-6 translate-y-[3.5px] rotate-45" : "w-6",
                )}
              />
              <span
                className={cn(
                  "block h-px bg-foreground transition-all duration-300",
                  open ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4",
                )}
              />
            </span>
          </button>

          {/* Floating Pill Navigation - Centered Desktop */}
          <nav 
            aria-label="Primary" 
            onMouseLeave={() => setHovered(null)}
            className="pointer-events-auto hidden absolute left-1/2 -translate-x-1/2 md:flex items-center gap-1 rounded-full border border-border/40 bg-surface/80 p-1.5 backdrop-blur-xl"
          >
            {nav.map((item) => {
              const isActive = active === item.href || (active === "" && item.href === "#top");
              const isTarget = hovered === item.href || (hovered === null && isActive);
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  data-cursor="link"
                  onMouseEnter={() => setHovered(item.href)}
                  className={cn(
                    "relative z-10 rounded-full px-5 py-2 font-display text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-300",
                    isTarget ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {isTarget && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button - Right Aligned Desktop */}
          <Link
            to="/contact"
            data-cursor="link"
            className="pointer-events-auto hidden bg-accent px-5 py-2.5 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-accent-foreground transition-colors duration-300 hover:bg-accent/90 md:inline-block"
          >
            Start a project
          </Link>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-background px-5 pb-10 pt-28 md:hidden"
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item, i) => (
                <div key={item.href} className="overflow-hidden border-b border-border">
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-display text-4xl uppercase tracking-[-0.03em]"
                    // @ts-ignore - motion props don't typecheck perfectly on custom components sometimes
                    as={motion.a}
                    initial={reduced ? false : { y: "110%" }}
                    animate={reduced ? {} : { y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="mr-3 align-super text-[10px] tracking-[0.2em] text-accent">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
            <div className="space-y-2">
              <p className="label-meta">{studio.availability}</p>
              <a href={`mailto:${studio.email}`} className="block font-display text-lg text-accent">
                {studio.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
