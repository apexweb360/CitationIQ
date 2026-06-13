import { motion } from "framer-motion";

/* ── helpers ─────────────────────────────────────────────── */

function scoreColor(score) {
  if (score >= 70) return "#22c55e";   // green
  if (score >= 40) return "#f59e0b";   // amber
  return "#ef4444";                    // red
}

function scoreLabel(score) {
  if (score >= 70) return "Strong";
  if (score >= 40) return "Moderate";
  return "Weak";
}

/* ── sub-components ──────────────────────────────────────── */

function ScoreRing({ score, size = 120 }) {
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const color = scoreColor(score);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth={8} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={8}
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - fill }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>{score}</span>
        <span className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider">
          {scoreLabel(score)}
        </span>
      </div>
    </div>
  );
}

function EngineCard({ engine }) {
  const color = scoreColor(engine.score);
  return (
    <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium capitalize">{engine.engine}</span>
        <span className="text-sm font-bold" style={{ color }}>{engine.score}/100</span>
      </div>
      {/* mini bar */}
      <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${engine.score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <div className="text-xs text-[var(--color-muted)] space-y-1">
        <div>Mentions: <span className="text-white">{engine.mentions}</span></div>
        <div>Prompts fired: <span className="text-white">{engine.prompts_fired}</span></div>
        {engine.top_competitors?.length > 0 && (
          <div>Top rival: <span className="text-white">{engine.top_competitors[0]}</span></div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)]">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Pill({ text, variant = "default" }) {
  const variants = {
    default: "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-muted)]",
    action: "border-[rgba(0,229,255,0.3)] text-[#00E5FF]",
    missing: "bg-red-500/10 border-red-500/30 text-red-400",
  };
  return (
    <span className={`inline-block px-3 py-1.5 rounded-lg text-xs border ${variants[variant]}`}>
      {text}
    </span>
  );
}

/* ── main component ──────────────────────────────────────── */

export default function AuditReport({ result, onReset }) {
  if (!result) return null;

  const {
    business_name,
    overall_score,
    engine_results = [],
    top_citation_sources = [],
    missing_authority_signals = [],
    recommended_actions = [],
    competitor_scores = {},
  } = result;

  const competitors = Object.entries(competitor_scores);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto space-y-10"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6
                      p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <ScoreRing score={overall_score} />
        <div className="space-y-1">
          <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider">AI Visibility Score</p>
          <h2 className="text-2xl font-semibold">{business_name}</h2>
          <p className="text-sm text-[var(--color-muted)]">
            {overall_score >= 70
              ? "You have solid AI visibility — keep building on it."
              : overall_score >= 40
                ? "Moderate visibility — significant room to improve."
                : "Low visibility — competitors are claiming your citations."
            }
          </p>
        </div>
      </div>

      {/* Engine breakdown */}
      {engine_results.length > 0 && (
        <Section title="Per-engine breakdown">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {engine_results.map((e) => (
              <EngineCard key={e.engine} engine={e} />
            ))}
          </div>
        </Section>
      )}

      {/* Competitor comparison */}
      {competitors.length > 0 && (
        <Section title="Competitor comparison">
          <div className="space-y-2">
            {/* Your score */}
            <div className="flex items-center gap-3 text-sm">
              <span className="w-36 truncate font-medium text-white">You</span>
              <div className="flex-1 h-2 rounded-full bg-black/40 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: scoreColor(overall_score) }}
                  initial={{ width: 0 }}
                  animate={{ width: `${overall_score}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <span className="w-8 text-right font-bold" style={{ color: scoreColor(overall_score) }}>
                {overall_score}
              </span>
            </div>
            {/* Competitors */}
            {competitors.map(([name, score]) => (
              <div key={name} className="flex items-center gap-3 text-sm">
                <span className="w-36 truncate text-[var(--color-muted)]">{name}</span>
                <div className="flex-1 h-2 rounded-full bg-black/40 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: scoreColor(score) }}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="w-8 text-right text-[var(--color-muted)]">{score}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Missing signals */}
      {missing_authority_signals.length > 0 && (
        <Section title="Missing authority signals">
          <div className="flex flex-wrap gap-2">
            {missing_authority_signals.map((s) => (
              <Pill key={s} text={s} variant="missing" />
            ))}
          </div>
        </Section>
      )}

      {/* Recommended actions */}
      {recommended_actions.length > 0 && (
        <Section title="Recommended actions">
          <ol className="space-y-3">
            {recommended_actions.map((action, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-3 p-3 rounded-xl"
                style={{ border: "0.5px solid rgba(0,229,255,0.2)", background: "rgba(0,229,255,0.04)" }}
              >
                <span className="text-[#00E5FF] font-bold text-sm mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-[var(--color-muted)]">{action}</span>
              </motion.li>
            ))}
          </ol>
        </Section>
      )}

      {/* Citation sources */}
      {top_citation_sources.length > 0 && (
        <Section title="Trusted citation sources in your category">
          <div className="flex flex-wrap gap-2">
            {top_citation_sources.map((s) => (
              <Pill key={s} text={s} variant="default" />
            ))}
          </div>
        </Section>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          onClick={onReset}
          className="flex-1 py-3 rounded-xl border border-[var(--color-border)]
                     text-sm text-[var(--color-muted)] hover:text-white hover:border-white/20
                     transition-colors"
        >
          Run another audit
        </button>
        <button
          className="flex-1 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(to right, #00E5FF, #3D6BFF, #A742FF)" }}
          onClick={() => window.print()}
        >
          Save report
        </button>
      </div>
    </motion.div>
  );
}
