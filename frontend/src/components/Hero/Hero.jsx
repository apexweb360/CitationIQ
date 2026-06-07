import { useState } from "react";
import { motion } from "framer-motion";

const GRADIENT = "linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)";
const YELLOW = "#ffd93b";
const BG = "#040c14";

const PLATFORMS = ["ChatGPT", "Claude", "Gemini", "Perplexity", "Grok"];

const SCORE_CARDS = [
  { label: "AI Visibility",       score: 36,  max: 100, color: "#EF4444" },
  { label: "Entity Authority",    score: 52,  max: 100, color: "#F97316" },
  { label: "Crawlability",        score: 88,  max: 100, color: "#22D3EE" },
  { label: "Citation Readiness",  score: 59,  max: 100, color: "#8B5CF6" },
  { label: "Trust & Authority",   score: 31,  max: 100, color: "#EF4444" },
  { label: "Live AI Test",        score: 0,   max: 5,   color: "#6B7280", suffix: "of 5" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const [domain, setDomain] = useState("");

  return (
    <section
      style={{ background: BG }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="w-full max-w-2xl flex flex-col items-center text-center gap-6">

        {/* ── LIVE BADGE ── */}
        <motion.div {...fadeUp(0)}>
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
        </motion.div>

        {/* ── H1 ── */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
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
        </motion.h1>

        {/* ── SUBTEXT ── */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-base md:text-lg max-w-lg leading-relaxed"
          style={{ color: "rgba(245,247,250,0.65)" }}
        >
          Run a free AI visibility audit. See how often ChatGPT, Claude, Gemini, Perplexity, and Grok cite your brand — and how to climb.
        </motion.p>

        {/* ── INPUT FORM ── */}
        <motion.div {...fadeUp(0.3)} className="w-full flex flex-col sm:flex-row gap-3">
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
            onFocus={(e) => {
              e.target.style.border = "1px solid rgba(34,211,238,0.4)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1px solid rgba(255,255,255,0.12)";
            }}
          />
          <button
            className="px-6 py-3 rounded-xl font-semibold text-sm text-white whitespace-nowrap hover:opacity-90 transition-opacity"
            style={{ background: GRADIENT }}
          >
            Analyze ↗
          </button>
        </motion.div>

        {/* ── PLATFORM BADGES ── */}
        <motion.div {...fadeUp(0.4)} className="flex flex-wrap justify-center gap-2">
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
        </motion.div>

        {/* ── SCORE PREVIEW PANEL ── */}
        <motion.div
          {...fadeUp(0.55)}
          className="w-full mt-4 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 40px rgba(34,211,238,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Panel header */}
          <div
            className="flex items-center gap-2 px-5 py-3 text-xs border-b"
            style={{
              borderColor: "rgba(255,255,255,0.07)",
              color: "rgba(245,247,250,0.35)",
              letterSpacing: "0.08em",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: GRADIENT }}
            />
            SAMPLE AUDIT — citationiq.ai
          </div>

          {/* Score grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            {SCORE_CARDS.map((card, i) => (
              <ScoreCard key={card.label} card={card} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ── TRUST LINE ── */}
        <motion.p
          {...fadeUp(0.7)}
          className="text-xs"
          style={{ color: "rgba(245,247,250,0.3)" }}
        >
          No credit card required · Free audit in &lt;60 seconds
        </motion.p>

      </div>
    </section>
  );
}

function ScoreCard({ card, index }) {
  const pct = card.max === 100 ? card.score : (card.score / card.max) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.65 + index * 0.07, duration: 0.4, ease: "easeOut" }}
      className="flex flex-col gap-2 px-4 py-4"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <span
        className="text-xs font-medium"
        style={{ color: "rgba(245,247,250,0.4)", letterSpacing: "0.04em" }}
      >
        {card.label}
      </span>

      <span
        className="text-2xl font-bold leading-none"
        style={{ color: "#ffffff" }}
      >
        {card.score}
        {card.suffix && (
          <span className="text-sm font-normal ml-1" style={{ color: "rgba(245,247,250,0.35)" }}>
            {card.suffix}
          </span>
        )}
      </span>

      {/* Progress bar */}
      <div
        className="w-full h-1 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: 0.8 + index * 0.07, duration: 0.7, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: card.color }}
        />
      </div>
    </motion.div>
  );
}
