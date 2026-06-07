import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudit } from "../hooks/useAudit";
import AuditForm from "../components/audit/AuditForm";
import AuditProgress from "../components/audit/AuditProgress";
import AuditReport from "../components/audit/AuditReport";
import Navbar from "../components/ui/Navbar";

const PLATFORMS = [
  { label: "ChatGPT",    color: "#10a37f" },
  { label: "Gemini",     color: "#4285F4" },
  { label: "Google AI",  color: "#EA4335" },
  { label: "Perplexity", color: "#20b2aa" },
  { label: "Claude",     color: "#D97706" },
  { label: "Copilot",    color: "#00B4EF" },
];

const PIPELINE_STEPS = [
  { label: "Intake",        active: true },
  { label: "Site Scan",     n: "1" },
  { label: "AI Probes",     n: "2" },
  { label: "Competitor\nGap", n: "3" },
  { label: "Score",         n: "4" },
  { label: "Report",        n: "5" },
];

export default function Audit() {
  const { submit, reset, phase, progress, result, error } = useAudit();
  const [businessName, setBusinessName] = useState("");

  const handleSubmit = (formData) => {
    setBusinessName(formData.business_name);
    submit(formData);
  };

  return (
    <div className="min-h-screen text-white" style={{ background: "#000000" }}>
      <Navbar
        showReset={phase !== "idle" && phase !== "submitting"}
        onReset={reset}
      />

      <main className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        <AnimatePresence mode="wait">

          {/* ── IDLE / FORM ── */}
          {(phase === "idle" || phase === "submitting") && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Light apex-card */}
              <div
                className="rounded-2xl px-8 py-9 sm:px-10"
                style={{
                  background: "#fafafa",
                  color: "#111111",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,229,255,0.08)",
                }}
              >
                {/* Platform badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {PLATFORMS.map(({ label, color }) => (
                    <span
                      key={label}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                      style={{
                        background: "#f3f4f6",
                        border: "1px solid #e5e7eb",
                        color: "#374151",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: color }}
                      />
                      {label}
                    </span>
                  ))}
                </div>

                {/* Eyebrow */}
                <p
                  className="text-[11px] font-bold tracking-widest uppercase mb-2.5"
                  style={{
                    background: "linear-gradient(to right, #00E5FF, #3D6BFF, #A742FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  CitationAI · Free Audit
                </p>

                {/* Headline */}
                <h1
                  className="text-[26px] sm:text-[30px] font-extrabold leading-tight mb-2"
                  style={{ color: "#111111", letterSpacing: "-0.02em" }}
                >
                  How visible is your<br />business to AI?
                </h1>

                {/* Subtitle */}
                <p className="text-[13.5px] leading-relaxed mb-7" style={{ color: "#6b7280" }}>
                  We fire real prompts at ChatGPT, Gemini, Google AI Overviews, Perplexity,
                  Claude, and Copilot — then score how often you appear.
                </p>

                {/* Form */}
                <AuditForm onSubmit={handleSubmit} isLoading={phase === "submitting"} />

                {/* Divider */}
                <hr className="my-6" style={{ borderColor: "#e5e7eb" }} />

                {/* Audit pipeline */}
                <p
                  className="text-[10.5px] font-bold tracking-widest uppercase mb-4"
                  style={{ color: "#9ca3af" }}
                >
                  Your audit pipeline
                </p>
                <div className="flex items-start">
                  {PIPELINE_STEPS.map((step, i) => (
                    <div key={step.label} className="flex-1 flex flex-col items-center gap-1.5 relative">
                      {/* Connector line */}
                      {i < PIPELINE_STEPS.length - 1 && (
                        <div
                          className="absolute top-3.5 left-1/2 right-0 h-px"
                          style={{
                            left: "calc(50% + 14px)",
                            right: "calc(-50% + 14px)",
                            background: "#e5e7eb",
                          }}
                        />
                      )}
                      {/* Circle */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold relative z-10"
                        style={
                          step.active
                            ? {
                                background: "linear-gradient(to right, #00E5FF, #3D6BFF, #A742FF)",
                                color: "#fff",
                                border: "none",
                                boxShadow: "0 2px 12px rgba(167,66,255,0.25)",
                              }
                            : {
                                background: "#f9fafb",
                                border: "1.5px solid #e5e7eb",
                                color: "#d1d5db",
                              }
                        }
                      >
                        {step.active ? "✓" : step.n}
                      </div>
                      {/* Label */}
                      <span
                        className="text-[10px] text-center leading-tight whitespace-pre-line"
                        style={{ color: step.active ? "#374151" : "#9ca3af", fontWeight: step.active ? 500 : 400 }}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── RUNNING ── */}
          {phase === "running" && (
            <motion.div
              key="progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AuditProgress progress={progress} businessName={businessName} />
            </motion.div>
          )}

          {/* ── COMPLETE ── */}
          {phase === "complete" && (
            <motion.div
              key="report"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AuditReport result={result} onReset={reset} />
            </motion.div>
          )}

          {/* ── FAILED ── */}
          {phase === "failed" && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6 py-16"
            >
              <div className="text-5xl">⚠️</div>
              <h2 className="text-2xl font-semibold">Audit failed</h2>
              <p className="text-[var(--color-muted)] text-sm max-w-sm mx-auto">
                {error ?? "Something went wrong. Make sure the backend is running and your API keys are set in .env."}
              </p>
              <button
                onClick={reset}
                className="px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(to right, #00E5FF, #3D6BFF, #A742FF)" }}
              >
                Try again
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
