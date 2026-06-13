import { motion } from "framer-motion";

/* ── Score helpers ───────────────────────────────────────── */

function scoreColor(score) {
  if (score >= 70) return "#22c55e";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}

function scoreLabel(score) {
  if (score >= 70) return "Strong";
  if (score >= 40) return "Moderate";
  return "Low";
}

function scoreDescription(score) {
  if (score >= 70) return "Solid AI visibility — keep building on it.";
  if (score >= 40) return "Moderate visibility — significant room to improve.";
  return "Low visibility — competitors are being recommended instead of you.";
}

/* ── ScoreRing ───────────────────────────────────────────── */

function ScoreRing({ score, size = 116 }) {
  const r     = (size - 16) / 2;
  const circ  = 2 * Math.PI * r;
  const color = scoreColor(score);

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (score / 100) * circ }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-[10px] uppercase tracking-wider mt-0.5"
              style={{ color: "rgba(255,255,255,0.4)" }}>
          {scoreLabel(score)}
        </span>
      </div>
    </div>
  );
}

/* ── Engine row ──────────────────────────────────────────── */

const ENGINE_COLORS = {
  ChatGPT:    "#10a37f",
  Perplexity: "#20b2aa",
  Gemini:     "#4285F4",
  Claude:     "#D97706",
};

function EngineRow({ engine, mentioned, mention_count }) {
  const color = ENGINE_COLORS[engine] ?? "#9ca3af";
  return (
    <div
      className="flex items-center gap-3 py-2.5"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
      <span className="text-sm flex-1 font-medium text-white">{engine}</span>
      {mentioned ? (
        <span className="text-[12px] font-semibold" style={{ color: "#22c55e" }}>
          ✓ Mentioned {mention_count}×
        </span>
      ) : (
        <span className="text-[12px] font-medium" style={{ color: "#ef4444" }}>
          ✗ Not found
        </span>
      )}
    </div>
  );
}

/* ── Lock overlay ────────────────────────────────────────── */

function LockedSection({ children, label }) {
  return (
    <div className="relative rounded-xl overflow-hidden"
         style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="blur-[3px] pointer-events-none select-none" aria-hidden>
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5"
           style={{ background: "rgba(0,0,0,0.65)" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <span className="text-[11.5px] font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>
          {label}
        </span>
      </div>
    </div>
  );
}

/* ── Card wrapper ────────────────────────────────────────── */

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl overflow-hidden ${className}`}
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {children}
    </div>
  );
}

function CardHeader({ children }) {
  return (
    <p className="px-4 pt-4 pb-2 text-[10.5px] font-bold tracking-widest uppercase"
       style={{ color: "rgba(255,255,255,0.3)" }}>
      {children}
    </p>
  );
}

/* ── Main report ─────────────────────────────────────────── */

export default function M1Report({ result, onReset }) {
  if (!result) return null;

  const {
    domain,
    overall_score,
    engine_results        = [],
    competitor_teasers    = [],
    missing_signals_preview = [],
    missing_signals_locked  = [],
  } = result;

  const color = scoreColor(overall_score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-4"
    >

      {/* ── Score header ── */}
      <div
        className="flex items-center gap-5 p-5 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <ScoreRing score={overall_score} />
        <div className="space-y-1.5 min-w-0">
          <p className="text-[10.5px] uppercase tracking-wider font-semibold"
             style={{ color: "rgba(255,255,255,0.35)" }}>
            AI Visibility Score
          </p>
          <p className="text-lg font-bold text-white truncate">{domain}</p>
          <p className="text-[13px] leading-snug" style={{ color: "rgba(255,255,255,0.5)" }}>
            {scoreDescription(overall_score)}
          </p>
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
            style={{
              background: `${color}18`,
              border: `1px solid ${color}40`,
              color,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
            {scoreLabel(overall_score)} · {result.prompts_fired} prompts fired
          </div>
        </div>
      </div>

      {/* ── Engine presence ── */}
      <Card>
        <CardHeader>AI Engine Presence</CardHeader>
        <div className="px-4 pb-3">
          {engine_results.map((e, i) => (
            <div key={e.engine} style={i === engine_results.length - 1 ? { borderBottom: "none" } : {}}>
              <EngineRow {...e} />
            </div>
          ))}
        </div>
      </Card>

      {/* ── Competitor teasers ── */}
      {competitor_teasers.length > 0 && (
        <Card>
          <CardHeader>Competitor Snapshot</CardHeader>
          <div className="px-4 pb-4 space-y-3">
            {competitor_teasers.map((c) => (
              <div key={c.domain}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-medium text-white">{c.name}</span>
                  <span className="text-[11px] font-semibold" style={{ color: "#ef4444" }}>
                    +{c.beats_you_on} queries ahead of you
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden"
                     style={{ background: "rgba(255,255,255,0.07)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "#ef4444" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(c.beats_you_on / c.total_queries) * 100}%` }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
            <p className="text-[11px] pt-1" style={{ color: "rgba(255,255,255,0.28)" }}>
              Full competitor breakdown — why they rank and how to outpace them — unlocks with M3.
            </p>
          </div>
        </Card>
      )}

      {/* ── Missing signals ── */}
      <div className="space-y-2">
        <p className="px-1 text-[10.5px] font-bold tracking-widest uppercase"
           style={{ color: "rgba(255,255,255,0.3)" }}>
          Missing Authority Signals
        </p>

        {/* Free preview */}
        <div className="flex flex-wrap gap-2">
          {missing_signals_preview.map((s) => (
            <span key={s}
              className="px-3 py-1.5 rounded-lg text-[12px]"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.22)",
                color: "#fca5a5",
              }}
            >
              ✗ {s}
            </span>
          ))}
        </div>

        {/* Locked preview */}
        {missing_signals_locked.length > 0 && (
          <LockedSection label="Unlock full signal list with M3">
            <div className="flex flex-wrap gap-2 p-3">
              {missing_signals_locked.map((s) => (
                <span key={s}
                  className="px-3 py-1.5 rounded-lg text-[12px]"
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.22)",
                    color: "#fca5a5",
                  }}
                >
                  ✗ {s}
                </span>
              ))}
            </div>
          </LockedSection>
        )}
      </div>

      {/* ── Upsell card — M3 unlock ── */}
      <div
        className="p-5 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(0,229,255,0.05), rgba(167,66,255,0.07))",
          border: "1px solid rgba(167,66,255,0.2)",
        }}
      >
        <div className="flex items-start gap-3.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(167,66,255,0.15)", fontSize: 18 }}
          >
            🔒
          </div>
          <div className="space-y-2 min-w-0">
            <p className="text-[14px] font-bold text-white">Unlock M3 · Competitive Radar</p>
            <p className="text-[12.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              See exactly <em>why</em> each AI engine skips you, get a query-by-query
              breakdown versus competitors, and receive a prioritized fix list.
            </p>
            <motion.button
              whileHover={{ translateY: -1 }}
              whileTap={{ scale: 0.97 }}
              className="mt-1 px-4 py-2 rounded-lg text-[13px] font-semibold flex items-center gap-1.5 transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(to right, #A742FF, #3D6BFF)", color: "#fff" }}
            >
              Unlock full analysis
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Reset ── */}
      <button
        onClick={onReset}
        className="w-full py-3 rounded-xl text-sm transition-colors"
        style={{ border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.35)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
      >
        Scan another business
      </button>

    </motion.div>
  );
}
