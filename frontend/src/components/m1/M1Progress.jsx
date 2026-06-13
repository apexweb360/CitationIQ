import { motion } from "framer-motion";

const ENGINES = [
  { label: "ChatGPT",    color: "#10a37f" },
  { label: "Perplexity", color: "#20b2aa" },
  { label: "Gemini",     color: "#4285F4" },
  { label: "Claude",     color: "#D97706" },
];

export default function M1Progress({ progress, domain }) {
  const { pct = 0, engine: activeEngine, msg = "Firing prompts…" } = progress;

  // Determine each engine's state
  const activeIdx = ENGINES.findIndex((e) => e.label === activeEngine);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 text-center py-8"
    >
      {/* Heading */}
      <div className="space-y-2">
        <h2 className="text-[22px] font-bold text-white tracking-tight">
          Scanning{domain ? ` ${domain}` : ""}…
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          {msg}
        </p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2 max-w-xs mx-auto">
        <div className="flex justify-between text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
          <span>Progress</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(to right, #00E5FF, #3D6BFF, #A742FF)" }}
            animate={{ width: `${pct}%` }}
            transition={{ ease: "easeOut", duration: 0.5 }}
          />
        </div>
      </div>

      {/* Engine bubbles */}
      <div className="flex justify-center gap-8 flex-wrap">
        {ENGINES.map(({ label, color }, i) => {
          const isDone   = activeIdx > -1 ? i < activeIdx : pct >= 90;
          const isActive = label === activeEngine;

          return (
            <div key={label} className="flex flex-col items-center gap-2.5">
              <motion.div
                animate={
                  isDone
                    ? { scale: 1, opacity: 1 }
                    : isActive
                      ? { scale: [1, 1.1, 1], opacity: 1 }
                      : { scale: 1, opacity: 0.2 }
                }
                transition={
                  isActive
                    ? { repeat: Infinity, duration: 1.3, ease: "easeInOut" }
                    : {}
                }
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  border: `2px solid ${isDone || isActive ? color : "rgba(255,255,255,0.12)"}`,
                  color:  isDone || isActive ? color : "rgba(255,255,255,0.15)",
                  background: isDone ? `${color}18` : "transparent",
                }}
              >
                {isDone ? "✓" : label[0]}
              </motion.div>
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{label}</span>
            </div>
          );
        })}
      </div>

      <p className="text-[11.5px]" style={{ color: "rgba(255,255,255,0.28)" }}>
        Firing 20 AI prompts across 4 engines
      </p>
    </motion.div>
  );
}
