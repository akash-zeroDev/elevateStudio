import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"default" | "link" | "view">("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      const next = el?.dataset['cursor'];
      setMode(next === "view" ? "view" : next === "link" ? "link" : "default");
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduced, x, y]);

  if (!enabled) return null;

  const size = mode === "view" ? 72 : mode === "link" ? 40 : 14;

  return (
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: sx, y: sy }}
      >
      <motion.div
        className="flex items-center justify-center rounded-full border border-accent"
        animate={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          backgroundColor: mode === "view" ? "var(--color-accent)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {mode === "view" && (
          <span className="font-display text-[10px] uppercase tracking-[0.16em] text-accent-foreground">View</span>
        )}
      </motion.div>
    </motion.div>
  );
}
