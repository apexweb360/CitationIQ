import { motion } from "framer-motion";

const STATUS_MESSAGES = [
  { threshold: 0,  text: "Initializing audit engines…" },
  { threshold: 15, text: "Firing prompts at ChatGPT…" },
  { threshold: 30, text: "Querying Gemini…" },
  { threshold: 45, text: "Checking Perplexity…" },
  { threshold: 60, text: "Running Claude analysis…" },
  { threshold: 75, text: "Scoring citation visibility…" },
  { threshold: 88, text: "Compiling recommendations…" },
  { threshold: 95, text: "Finalizing report…" },
];

function getStatusMessage(progress) {
  const match = [...STATUS_MESSAGES].reverse().find((m) => progress >= m.threshold);
  return match?.text ?? "Working…";
}

const ENGINE_ICONS = [
  { label: "ChatGPT",    color: "#10a37f" },
  { label: "Gemini",     color: "#4285F4" },
  { label: "Perplexity", color: "#20b2aa" },
  { label: "Claude",     color: "#D97706" },
];

export default function AuditProgress({ progress, businessName }) {
  const message = getStatusMessage(progress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto space-y-10 text-center"
    >
      {/* Heading */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          Auditing{businessName ? ` ${businessName}` : " your business"}
        </h2>
        <p className="text-[var(--color-muted)] text-sm">{message}</p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-[var(--color-muted)]">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-[var(--color-surface)] overflow-hidden border border-[var(--color-border)]">
          <motion.div
            className="h-full rounded-full bg-[#007FFF]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.4 }}
          />
        </div>
      </div>

      {/* Engine indicators */}
      <div className="flex justify-center gap-6">
        {ENGINE_ICONS.map(({ label, color }, i) => {
          const engineProgress = (i + 1) * 22;
          const active = progress >= engineProgress - 15;
          const done   = progress >= engineProgress;

          return (
            <div key={label} className="flex flex-col items-center gap-2">
              <motion.div
                animate={done
                  ? { scale: 1, opacity: 1 }
                  : active
                    ? { scale: [1, 1.1, 1], opacity: 1 }
                    : { opacity: 0.25 }
                }
                transition={active && !done ? { repeat: Infinity, duration: 1.2 } : {}}
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2"
                style={{
                  borderColor: done || active ? color : "rgba(255,255,255,0.1)",
                  color:       done || active ? color : "rgba(255,255,255,0.3)",
                  backgroundColor: done ? `${color}20` : "transparent",
                }}
              >
                {done ? "✓" : label[0]}
              </motion.div>
              <span className="text-[10px] text-[var(--color-muted)]">{label}</span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-[var(--color-muted)]">
        This usually takes 30–90 seconds
      </p>
    </motion.div>
  );
}
