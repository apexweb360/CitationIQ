import { useNavigate } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

const CYAN   = "#00E5FF";
const BLUE   = "#3D6BFF";
const PURPLE = "#A742FF";
const GRAD   = `linear-gradient(to right, ${CYAN}, ${BLUE}, ${PURPLE})`;

const steps = [
  {
    n: "01",
    title: "Enter your business name or website",
    desc: "Takes 10 seconds. No account required.",
  },
  {
    n: "02",
    title: "We query ChatGPT, Perplexity & Gemini",
    desc: "We ask the same questions your customers are asking AI right now.",
  },
  {
    n: "03",
    title: "Get your AI Visibility Score",
    desc: "Your free report lands in your inbox — no fluff, just your score and how to improve it.",
  },
];

export default function SolutionsLocal() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#040c14", color: "#fff", fontFamily: "inherit" }}>
      <Navbar />

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "80px 24px 120px", textAlign: "center" }}>

        {/* Label */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(0,229,255,0.08)", border: "0.5px solid rgba(0,229,255,0.2)",
          borderRadius: 20, padding: "4px 14px", marginBottom: 28,
          fontSize: 12, fontWeight: 600, color: CYAN, letterSpacing: "0.04em",
        }}>
          For Local Businesses
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
          Find out how AI describes{" "}
          <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            your business
          </span>
        </h1>

        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: "0 0 48px", maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
          When someone asks ChatGPT or Perplexity "best [your service] near me," does your business show up?
          Run a free audit in 60 seconds and get a full report in your inbox.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate("/audit")}
          style={{
            padding: "14px 32px", borderRadius: 9,
            background: GRAD, color: "#fff",
            fontSize: 15, fontWeight: 600,
            cursor: "pointer", border: "none",
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "inherit", letterSpacing: "-0.1px",
          }}
        >
          Check My AI Visibility — Free
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 12 }}>
          Free · No credit card · Report sent to your email
        </p>

        {/* How it works */}
        <div style={{ marginTop: 72, textAlign: "left" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 28, textAlign: "center" }}>
            How it works
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {steps.map((s) => (
              <div key={s.n} style={{
                display: "flex", alignItems: "flex-start", gap: 20,
                background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)",
                borderRadius: 12, padding: "18px 22px",
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: CYAN,
                  background: "rgba(0,229,255,0.08)", border: "0.5px solid rgba(0,229,255,0.15)",
                  borderRadius: 7, padding: "4px 9px", flexShrink: 0, letterSpacing: "0.02em",
                }}>
                  {s.n}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
