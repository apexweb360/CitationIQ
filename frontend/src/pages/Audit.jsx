import { AnimatePresence, motion } from "framer-motion";
import { useM1Scan } from "../hooks/useM1Scan";
import M1UrlStep        from "../components/m1/M1UrlStep";
import M1CompetitorStep from "../components/m1/M1CompetitorStep";
import M1Progress       from "../components/m1/M1Progress";
import M1Report         from "../components/m1/M1Report";
import Navbar           from "../components/ui/Navbar";

/** Wrap the light-card steps (URL + competitors) in the same card shell */
function LightCard({ children }) {
  return (
    <div
      className="rounded-2xl px-7 py-8 sm:px-9"
      style={{
        background:  "#fafafa",
        color:       "#111111",
        boxShadow:   "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,229,255,0.08)",
      }}
    >
      {children}
    </div>
  );
}

export default function Audit() {
  const {
    phase, url, domain, faviconUrl, meta,
    suggestions, selected,
    progress, result, error,
    confirmUrl, toggleCompetitor, startScan, reset,
  } = useM1Scan();

  const showReset = !["url", "loading"].includes(phase);

  return (
    <div className="min-h-screen text-white" style={{ background: "#000000" }}>
      <Navbar showReset={showReset} onReset={reset} />

      <main className="max-w-xl mx-auto px-4 py-12 sm:py-16">
        <AnimatePresence mode="wait">

          {/* ── Step 1: URL input ── */}
          {(phase === "url" || phase === "loading") && (
            <motion.div
              key="url"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32 }}
            >
              <LightCard>
                <M1UrlStep
                  onConfirm={confirmUrl}
                  loading={phase === "loading"}
                />
              </LightCard>
            </motion.div>
          )}

          {/* ── Step 2: Competitor picker ── */}
          {phase === "competitors" && (
            <motion.div
              key="competitors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32 }}
            >
              <LightCard>
                <M1CompetitorStep
                  domain={domain}
                  faviconUrl={faviconUrl}
                  suggestions={suggestions}
                  selected={selected}
                  onToggle={toggleCompetitor}
                  onStartScan={startScan}
                />
              </LightCard>
            </motion.div>
          )}

          {/* ── Scanning ── */}
          {phase === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <M1Progress progress={progress} domain={domain} />
            </motion.div>
          )}

          {/* ── Results ── */}
          {phase === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <M1Report result={result} onReset={reset} />
            </motion.div>
          )}

          {/* ── Error ── */}
          {phase === "failed" && (
            <motion.div
              key="failed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6 py-20"
            >
              <div className="text-5xl">⚠️</div>
              <h2 className="text-2xl font-semibold">Something went wrong</h2>
              <p className="text-sm max-w-xs mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
                {error ?? "Please check your connection and try again."}
              </p>
              <motion.button
                onClick={reset}
                whileHover={{ translateY: -1 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{
                  background: "linear-gradient(to right, #00E5FF, #3D6BFF, #A742FF)",
                  color: "#fff",
                }}
              >
                Try again
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
