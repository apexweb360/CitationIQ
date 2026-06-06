import { useEffect, useState } from "react";
import AIChatMock from "./AIChatMock";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setMounted(true);

    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section className="min-h-screen grid md:grid-cols-2 items-center px-8 md:px-20 gap-10 overflow-hidden">

      {/* ─────────────────────────────────────────────
          LEFT: MOTION TEXT STACK
      ───────────────────────────────────────────── */}
      <div className="space-y-6">

        {/* MAIN HEADLINE */}
        <h1
          className={`
            text-5xl md:text-6xl font-semibold leading-tight tracking-tight
            transition-all duration-700 ease-out
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          Search Has{" "}
          <span className="text-accent relative">
            Changed.
            {/* subtle pulse underline */}
            <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-[#007FFF] opacity-40 animate-pulse"></span>
          </span>
        </h1>

        {/* SUBTEXT */}
        <p
          className={`
            text-gray-400 text-lg max-w-md leading-relaxed
            transition-all duration-700 delay-200 ease-out
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          From blue links to AI answers. We help your brand become the citation inside generative engines.
        </p>

        {/* CTA BLOCK */}
        <div
          className={`
            flex gap-4 pt-4 flex-wrap
            transition-all duration-700 delay-300 ease-out
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <button className="bg-accent px-6 py-3 rounded-xl font-medium text-white hover:opacity-90 transition hover-lift">
            Get AI Visibility Audit
          </button>

          <button className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/5 transition hover-lift">
            See Live Examples
          </button>
        </div>

        {/* MICRO TRUST LINE */}
        <p
          className={`
            text-xs text-gray-500 pt-6
            transition-all duration-700 delay-500
            ${mounted ? "opacity-100" : "opacity-0"}
          `}
        >
          Built for AI-first search engines, not traditional rankings.
        </p>

      </div>

      {/* ─────────────────────────────────────────────
          RIGHT: FLOATING AI SYSTEM PANEL
      ───────────────────────────────────────────── */}
      <div
        className={`
          relative transition-all duration-1000 ease-out
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >

        {/* BACK GLOW LAYER */}
        <div className="absolute -inset-8 bg-[#007FFF] opacity-5 rounded-3xl blur-0"></div>

        {/* FLOAT ANIMATION WRAPPER */}
        <div className="animate-float">

          <AIChatMock phase={phase} />

        </div>

      </div>
    </section>
  );
}