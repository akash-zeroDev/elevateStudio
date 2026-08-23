import { useEffect, useState } from "react";
import wordmarkLight from "@/assets/El.png";

export function Preloader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 3400);
    document.body.style.overflow = "hidden";
    const u = setTimeout(() => {
      document.body.style.overflow = "";
    }, 3250);
    return () => {
      clearTimeout(t);
      clearTimeout(u);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="theme-el-preloader animate-el-curtain fixed inset-0 z-[100] flex items-center justify-center bg-[oklch(0.11_0_0)]"
      aria-hidden
    >
      <div className="animate-el-mark-out">
        <img
          src={wordmarkLight}
          alt="EL Studio"
          className="animate-el-mark-in w-[70vw] max-w-[720px] sm:w-[52vw] object-contain"
        />
      </div>

      <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-[oklch(0.98_0_0)]/40">
        Independent design practice
      </span>
    </div>
  );
}
