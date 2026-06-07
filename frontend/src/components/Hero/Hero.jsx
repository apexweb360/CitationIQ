import { useState, lazy, Suspense } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

// AIChatMock is split into its own chunk — not in the critical bundle
const AIChatMock = lazy(() => import("./AIChatMock"));

const GRADIENT = "linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)";
const YELLOW = "#ffd93b";
const BG = "#040c14";

const PLATFORMS = ["ChatGPT", "Claude", "Gemini", "Perplexity", "Grok"];

// H1 never starts at opacity:0 — browser can measure it as LCP immediately.
// Secondary elements (subtext, form, badges) still fade up normally.
const slideUp = (delay = 0) => ({
  initial: { opacity: 1, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

// Skeleton shown while AIChatMock lazy-loads — holds layout so no CLS
function ChatSkeleton() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "#212121",
        border: "1px solid rgba(255,255,255,0.07)",
        minHeight: 460,
      }}
    >
      {/* Header bar */}
      <div
        className="px-4 py-3 border-b flex items-center gap-2.5"
        style={{ background: "#171717", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="w-4 h-4 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
        <div className="h-3 w-16 rounded" style={{ background: "rgba(255,255,255,0.08)" }} />
        <div className="h-3 w-10 rounded ml-1" style={{ background: "rgba(255,255,255,0.05)" }} />
      </div>
      {/* Body shimmer lines */}
      <div className="px-5 pt-6 space-y-4">
        {[80, 60, 90, 55, 70].map((w, i) => (
          <div
            key={i}
            className="h-2.5 rounded"
            style={{
              width: `${w}%`,
              background: "rgba(255,255,255,0.05)",
              marginLeft: i % 2 === 0 ? "auto" : 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const [domain, setDomain] = useState("");

  return (
    <LazyMotion features={domAnimation}>
      <section
        style={{ background: BG }}
        className="min-h-screen flex items-center px-6 py-24 overflow-hidden"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: TEXT + CTA ── */}
          <div className="flex flex-col gap-6">

            {/* LIVE BADGE — secondary, fades in */}
            <m.div {...fadeUp(0)}>
              <span
                className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(255,217,59,0.08)",
                  border: `1px solid rgba(255,217,59,0.3)`,
                  color: YELLOW,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    background: YELLOW,
                    boxShadow: `0 0 6px rgba(255,217,59,0.6)`,
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                />
                Live AI citation testing across 5 platforms
              </span>
            </m.div>

            {/* H1 — LCP element: opacity always 1, only slides up */}
            <m.h1
              {...slideUp(0.05)}
              className="text-5xl md:text-6xl font-bold leading-tight tracking-tight"
              style={{ color: "#ffffff" }}
            >
              Does AI actually{" "}
              <em
                className="not-italic"
                style={{
                  background: GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                cite your business?
              </em>
            </m.h1>

            {/* SUBTEXT */}
            <m.p
              {...fadeUp(0.15)}
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(245,247,250,0.65)" }}
            >
              Run a free AI visibility audit. See how often ChatGPT, Claude, Gemini,
              Perplexity, and Grok cite your brand — and how to climb.
            </m.p>

            {/* INPUT FORM */}
            <m.div {...fadeUp(0.25)} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="yourdomain.com"
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#f5f7fa",
                }}
                onFocus={(e) => { e.target.style.border = "1px solid rgba(34,211,238,0.4)"; }}
                onBlur={(e) => { e.target.style.border = "1px solid rgba(255,255,255,0.12)"; }}
              />
              <button
                className="px-6 py-3 rounded-xl font-semibold text-sm text-white whitespace-nowrap hover:opacity-90 transition-opacity"
                style={{ background: GRADIENT }}
              >
                Analyze ↗
              </button>
            </m.div>

            {/* PLATFORM BADGES */}
            <m.div {...fadeUp(0.35)} className="flex flex-wrap gap-2">
              {PLATFORMS.map((platform) => (
                <span
                  key={platform}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(245,247,250,0.55)",
                  }}
                >
                  {platform}
                </span>
              ))}
            </m.div>

            {/* TRUST LINE */}
            <m.p
              {...fadeUp(0.45)}
              className="text-xs"
              style={{ color: "rgba(245,247,250,0.3)" }}
            >
              No credit card required · Free audit in &lt;60 seconds
            </m.p>

          </div>

          {/* ── RIGHT: CHAT MOCKUP (lazy) ── */}
          <m.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <Suspense fallback={<ChatSkeleton />}>
              <AIChatMock />
            </Suspense>
          </m.div>

        </div>
      </section>
    </LazyMotion>
  );
}
