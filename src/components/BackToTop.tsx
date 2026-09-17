"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, scrollY / max) : 0);
      setVisible(scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const deg = progress * 360;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full p-[2px] transition-all duration-300 sm:bottom-8 sm:right-8 ${
        visible ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-90"
      }`}
      style={{ background: `conic-gradient(#C89B4A ${deg}deg, rgba(255,255,255,0.12) ${deg}deg)` }}
    >
      <span className="flex h-full w-full items-center justify-center rounded-full bg-ink/90 backdrop-blur">
        <ArrowUp size={18} />
      </span>
    </button>
  );
}
