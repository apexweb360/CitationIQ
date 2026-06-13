import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ── ChatGPT palette ──────────────────────────────────────────
const GPT_BG      = "#212121";
const GPT_SIDEBAR = "#171717";
const GPT_BUBBLE  = "#2f2f2f";
const GPT_TEXT    = "#ececec";
const GPT_MUTED   = "#8e8ea0";
const GPT_BORDER  = "rgba(255,255,255,0.07)";

// ── User question — typed out character by character ─────────
const QUESTION   = "I just got into a car accident. Which personal injury law firms do you recommend in Houston, TX?";
const TYPING_MS  = 21; // ~2 seconds total for the full question

// ── Firms revealed in the response ──────────────────────────
const FIRMS = [
  { name: "Sullivan, Bennett & Feiner",       platforms: 5, color: "#22C55E" },
  { name: "Morgan & Harrison Injury Counsel", platforms: 3, color: "#F59E0B" },
  { name: "Yaffa Cohen, LLP",                 platforms: 1, color: "#6B7280" },
];

// ── OpenAI / ChatGPT logo SVG ────────────────────────────────
function GPTLogo({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 41 41" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.371-2.945A10.078 10.078 0 0 0 9.836 5.143a9.964 9.964 0 0 0-6.235 4.616 10.078 10.078 0 0 0-1.24 7.697 9.963 9.963 0 0 0 .856 8.185 10.078 10.078 0 0 0 10.855 4.835 9.964 9.964 0 0 0 6.37 2.945 10.079 10.079 0 0 0 9.617-6.025 9.964 9.964 0 0 0 6.235-4.616 10.078 10.078 0 0 0 1.238-7.908zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.86a7.504 7.504 0 0 1-2.747-10.24zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v4.999l-4.331 2.5-4.331-2.5V18z"/>
    </svg>
  );
}

// ── Bouncing dots typing indicator ──────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: GPT_MUTED }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.55, delay: i * 0.14, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────
export default function AIChatMock() {
  const [cycle, setCycle]           = useState(0);
  const [phase, setPhase]           = useState(0);
  const [typedCount, setTypedCount] = useState(0);

  // Phase timeline (all offsets include the ~2s typing lead-in):
  // 0      → question starts typing character by character
  // ~2.1s  → question fully typed, cursor blinks then fades
  // 3900ms → GPT bouncing dots appear
  // 5200ms → intro sentence appears
  // 6100ms → firm 1
  // 6950ms → firm 2
  // 7800ms → firm 3
  // 8900ms → "not cited" warning
  // 13000ms → full reset, new cycle
  useEffect(() => {
    if (document.hidden) return;

    // Reset both counters at the top of every cycle
    setTypedCount(0);
    setPhase(0);

    // Typewriter: one character every TYPING_MS until question is fully revealed
    let count = 0;
    const typeInterval = setInterval(() => {
      count++;
      setTypedCount(count);
      if (count >= QUESTION.length) clearInterval(typeInterval);
    }, TYPING_MS);

    // Phase progression
    const t = [
      setTimeout(() => setPhase(1), 3900),
      setTimeout(() => setPhase(2), 5200),
      setTimeout(() => setPhase(3), 6100),
      setTimeout(() => setPhase(4), 6950),
      setTimeout(() => setPhase(5), 7800),
      setTimeout(() => setPhase(6), 8900),
      setTimeout(() => {
        setPhase(0);
        setTypedCount(0);
        setCycle((c) => c + 1);
      }, 13000),
    ];

    return () => {
      clearInterval(typeInterval);
      t.forEach(clearTimeout);
    };
  }, [cycle]);

  // Resume animation when user returns to the tab
  useEffect(() => {
    const onVisible = () => {
      if (!document.hidden) setCycle((c) => c + 1);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  const isTyping  = typedCount < QUESTION.length;
  const visibleText = QUESTION.slice(0, typedCount);

  return (
    <div
      className="w-full rounded-2xl overflow-hidden select-none"
      style={{
        background: GPT_BG,
        border: `1px solid ${GPT_BORDER}`,
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)",
        fontFamily:
          "'Söhne', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', sans-serif",
      }}
    >
      {/* ── TITLE BAR ── */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ background: GPT_SIDEBAR, borderColor: GPT_BORDER }}
      >
        <div className="flex items-center gap-2.5">
          <div style={{ color: GPT_TEXT }}>
            <GPTLogo size={18} />
          </div>
          <span className="text-sm font-semibold" style={{ color: GPT_TEXT }}>
            ChatGPT
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-md"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: GPT_MUTED,
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            GPT-4o
          </span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ color: GPT_MUTED }}>
            <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8"/>
            <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
            <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ color: GPT_MUTED }}>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* ── CHAT BODY ── fixed height = fully-expanded final state, overflow hidden prevents any resize ── */}
      <div className="px-5 pt-6 pb-4 space-y-6" style={{ height: 420, overflow: "hidden" }}>

        {/* USER MESSAGE — types out character by character */}
        <div className="flex items-end justify-end gap-3">
          <div
            className="text-sm px-4 py-3 rounded-2xl leading-relaxed"
            style={{
              background: GPT_BUBBLE,
              color: GPT_TEXT,
              borderBottomRightRadius: 6,
              maxWidth: "82%",
              // Pre-sized to the fully-typed 2-line height — no layout jump during typing
              minHeight: "4.25rem",
            }}
          >
            {visibleText}
            {/* Blinking cursor while typing */}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.48, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "0.85em",
                  background: GPT_TEXT,
                  borderRadius: 1,
                  marginLeft: 2,
                  verticalAlign: "text-bottom",
                }}
              />
            )}
          </div>
          {/* User avatar */}
          <div
            className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
            style={{ background: "#7C3AED", color: "#fff" }}
          >
            Y
          </div>
        </div>

        {/* GPT RESPONSE */}
        <div className="flex items-start gap-3">
          <div
            className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
            style={{ background: "#10a37f", color: "#fff" }}
          >
            <GPTLogo size={13} />
          </div>

          <div className="flex-1 min-w-0">

            {/* Typing dots */}
            {phase === 1 && <TypingDots />}

            {/* Response body */}
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <p className="text-sm leading-relaxed" style={{ color: GPT_TEXT }}>
                  Here are some of the most frequently cited personal injury law firms in Houston:
                </p>

                <div className="space-y-3">
                  {FIRMS.map((firm, i) =>
                    phase >= 3 + i ? (
                      <motion.div
                        key={firm.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.38, ease: "easeOut" }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-medium" style={{ color: GPT_TEXT }}>
                            {firm.name}
                          </span>
                          <span className="text-xs font-semibold tabular-nums" style={{ color: firm.color }}>
                            {firm.platforms}/5 platforms
                          </span>
                        </div>
                        <div
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.07)" }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(firm.platforms / 5) * 100}%` }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ background: firm.color }}
                          />
                        </div>
                      </motion.div>
                    ) : null
                  )}
                </div>

                {/* "Not cited" callout */}
                {phase >= 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="rounded-xl px-4 py-3.5 flex items-start gap-3"
                    style={{
                      background: "rgba(239,68,68,0.07)",
                      border: "1px solid rgba(239,68,68,0.22)",
                    }}
                  >
                    <span style={{ fontSize: 15, lineHeight: 1 }}>⚠️</span>
                    <div>
                      <p className="text-xs font-semibold leading-snug" style={{ color: "#FCA5A5" }}>
                        Your firm isn't appearing in AI answers
                      </p>
                      <p className="text-xs mt-0.5 leading-snug" style={{ color: "rgba(252,165,165,0.55)" }}>
                        Stratena detected 0 / 5 AI platforms cite your business
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ── INPUT BAR ── */}
      <div className="px-4 pb-4">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: GPT_BUBBLE, border: `1px solid ${GPT_BORDER}` }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ color: "#4d4d5e", flexShrink: 0 }}>
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="flex-1 text-sm" style={{ color: "#4d4d5e" }}>
            Message ChatGPT
          </span>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#676767" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke={GPT_BG} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <p className="text-center text-xs mt-2" style={{ color: "#3d3d4a" }}>
          ChatGPT can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}
