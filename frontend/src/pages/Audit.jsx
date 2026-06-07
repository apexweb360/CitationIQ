import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudit } from "../hooks/useAudit";
import AuditForm from "../components/audit/AuditForm";
import AuditProgress from "../components/audit/AuditProgress";
import AuditReport from "../components/audit/AuditReport";
import Navbar from "../components/ui/Navbar";

export default function Audit() {
  const { submit, reset, phase, progress, result, error } = useAudit();
  const [businessName, setBusinessName] = useState("");

  const handleSubmit = (formData) => {
    setBusinessName(formData.business_name);
    submit(formData);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar
        showReset={phase !== "idle" && phase !== "submitting"}
        onReset={reset}
      />

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">

          {/* ── IDLE / FORM ── */}
          {(phase === "idle" || phase === "submitting") && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              <div className="text-center space-y-3">
                <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
                  How visible is your business<br />to AI?
                </h1>
                <p className="text-[var(--color-muted)]">
                  We fire real prompts at ChatGPT, Gemini, Perplexity, and Claude —
                  and score how often you appear.
                </p>
              </div>
              <AuditForm onSubmit={handleSubmit} isLoading={phase === "submitting"} />
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
