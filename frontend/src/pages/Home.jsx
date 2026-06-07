import Hero from "../components/hero/Hero";
import { useNavigate } from "react-router-dom";

const CYAN = "#22D3EE";
const PURPLE = "#8B5CF6";
const YELLOW = "#ffd93b";
const AMBER = "#EF9F27";
const RED = "#E24B4A";

const gradText = {
  background: `linear-gradient(135deg, ${CYAN} 0%, ${PURPLE} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const gradBg = {
  background: `linear-gradient(135deg, ${CYAN}, ${PURPLE})`,
};

// ── Score Preview ──────────────────────────────────────────────────────────────
const scores = [
  { name: "AI Visibility",      val: 36,  color: RED,    hint: "5 schemas missing, +45 pts to gain" },
  { name: "Entity Authority",   val: 52,  color: AMBER,  hint: "No knowledge graph entry, +28 pts" },
  { name: "Crawlability",       val: 88,  color: null,   hint: "LLMs.txt present, bots unblocked" },
  { name: "Citation Readiness", val: 59,  color: AMBER,  hint: "FAQ missing, no declarative summaries" },
  { name: "Trust & Authority",  val: 31,  color: RED,    hint: "No surfaced reviews, +30 pts" },
  { name: "Live AI Test",       val: 0,   color: RED,    hint: "Not cited on any platform tested", label: "0 / 5" },
];

function ScoreBar({ val, color }) {
  const fill = color
    ? { width: `${val}%`, background: color }
    : { width: `${val}%`, ...gradBg };
  return (
    <div style={{ height: 3, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden", marginBottom: 6 }}>
      <div style={{ height: "100%", borderRadius: 2, ...fill }} />
    </div>
  );
}

function ScorePreview() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.045)",
      border: "0.5px solid rgba(255,255,255,0.1)",
      borderRadius: 16,
      padding: "1.5rem",
      maxWidth: 680,
      margin: "0 auto 3rem",
      boxShadow: `0 0 40px rgba(34,211,238,0.05), inset 0 1px 0 rgba(255,255,255,0.06)`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(245,247,250,0.4)", textTransform: "uppercase", letterSpacing: 1 }}>
          Sample audit — apexweb360.com
        </span>
        <span style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 700, color: "#fff" }}>
          61 <span style={{ fontSize: 14, color: "rgba(245,247,250,0.3)" }}>/ 100</span>
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        {scores.map((s) => (
          <div key={s.name} style={{
            background: "rgba(255,255,255,0.06)",
            border: "0.5px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            padding: 12,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontFamily: "monospace", fontSize: 12, color: "#fff" }}>{s.name}</span>
              <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: s.color || CYAN }}>
                {s.label ?? s.val}
              </span>
            </div>
            <ScoreBar val={s.val} color={s.color} />
            <p style={{ fontSize: 11, color: "rgba(245,247,250,0.35)" }}>{s.hint}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Audit Categories ───────────────────────────────────────────────────────────
const categories = [
  {
    title: "Schema & Structured Data",
    desc: "Organization, FAQ, HowTo, Article, LocalBusiness, and 8 more schema types checked",
    count: "12 checks",
    chips: [["{}",CYAN],["@","#378ADD"],["</>",PURPLE],["faq","#0ea5e9"],["org","#6366f1"],["✓",CYAN]],
  },
  {
    title: "Entity Identity",
    desc: "NAP consistency, knowledge graph presence, Wikipedia/Wikidata, entity disambiguation",
    count: "8 checks",
    chips: [["G","#4285F4"],["W","#555"],["📍","#34A853"],["NAP","#378ADD"],["KG",PURPLE],["ID","#ea4335"]],
  },
  {
    title: "AI Crawlability",
    desc: "GPTBot, ClaudeBot, PerplexityBot access, LLMs.txt presence, sitemap freshness",
    count: "7 checks",
    chips: [["🤖","#10a37f"],["🤖",PURPLE],["🤖",AMBER],["txt",CYAN],["🗺","#378ADD"],["🔒","#6366f1"]],
  },
  {
    title: "Content Signals",
    desc: "FAQ sections, Q&A format, definition paragraphs, author bios, E-E-A-T signals",
    count: "10 checks",
    chips: [["Q&A",CYAN],["FAQ",PURPLE],["👤",AMBER],["📝","#378ADD"],["E-E","#10a37f"],["A-T","#6366f1"]],
  },
  {
    title: "Authority & Trust",
    desc: "Backlink quality, .gov/.edu citations, review platform presence, brand mentions",
    count: "9 checks",
    chips: [["🔗",CYAN],[".gov","#34A853"],[".edu","#4285F4"],["⭐",AMBER],["📣","#D4537E"],["DA",PURPLE]],
  },
  {
    title: "Technical SEO",
    desc: "Meta tags, OG, canonicals, page speed, mobile-ready, HTTPS, robots.txt",
    count: "11 checks",
    chips: [["OG",CYAN],["📱",PURPLE],["🔒","#34A853"],["⚡",AMBER],["can","#378ADD"],["🤖","#6366f1"]],
  },
  {
    title: "Citation Readiness",
    desc: "Declarative sentences, attributed data, quotable summaries, jargon density score",
    count: "8 checks",
    chips: [["💬",CYAN],["📊",PURPLE],["📝",AMBER],["🎯","#378ADD"],["sum","#D4537E"],["ref","#6366f1"]],
  },
  {
    title: "Competitor Benchmarking",
    desc: "Score your site vs. 3 direct competitors across all 10 categories simultaneously",
    count: "Pro feature",
    chips: [["📈",CYAN],["🏆",PURPLE],["vs",AMBER],["A","#378ADD"],["B","#D4537E"],["C","#6366f1"]],
  },
  {
    title: "Live AI Testing",
    desc: "Actually queries ChatGPT, Perplexity, Gemini, Grok, Claude with brand questions",
    count: "True differentiator",
    chips: [["GP","#10a37f"],["Cl",PURPLE],["Ge","#4285F4"],["Px",AMBER],["Gr","#1DA1F2"],["🔴",CYAN]],
  },
  {
    title: "Historical Tracking",
    desc: "Monthly score snapshots showing citation growth after implementing fixes",
    count: "Agency feature",
    chips: [["jan",CYAN],["feb","#378ADD"],["mar",PURPLE],["📅",AMBER],["📈","#34A853"],["🔔","#D4537E"]],
  },
];

function Categories() {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 2rem 3rem" }}>
      <p style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(245,247,250,0.35)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "1.5rem" }}>
        10 audit categories · 80+ signals
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
        {categories.map((c) => (
          <div key={c.title} style={{
            background: "rgba(255,255,255,0.03)",
            border: "0.5px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            padding: "1rem",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 4, width: 52, marginBottom: 12 }}>
              {c.chips.map(([label, bg], i) => (
                <div key={i} style={{
                  width: 15, height: 15, borderRadius: 4,
                  background: bg, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 7, fontWeight: 700, color: "#fff", fontFamily: "monospace",
                }}>{label}</div>
              ))}
            </div>
            <p style={{ fontSize: 13, fontWeight: 500, color: "#fff", marginBottom: 4 }}>{c.title}</p>
            <p style={{ fontSize: 11, color: "rgba(245,247,250,0.38)", lineHeight: 1.6, marginBottom: 8 }}>{c.desc}</p>
            <span style={{
              fontFamily: "monospace", fontSize: 10,
              border: `0.5px solid rgba(139,92,246,0.25)`,
              padding: "2px 7px", borderRadius: 10,
              color: CYAN,
            }}>{c.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Differentiators ────────────────────────────────────────────────────────────
const diffs = [
  {
    icon: "🎯",
    title: "We don't guess, we ask",
    desc: "Competitors score on-site signals and call it AI visibility. We actually query live AI platforms and report whether your brand is cited, mentioned, or invisible.",
  },
  {
    icon: "🏢",
    title: "Built for agencies",
    desc: "White-label reporting, bulk client audits, and branded PDF exports. Your clients see the results, not your tools.",
  },
  {
    icon: "🔄",
    title: "Citation monitoring, not a one-time report",
    desc: "AI citation behavior changes monthly. CitationIQ runs on a schedule and alerts you when your visibility drops or a competitor gains ground.",
  },
];

function Differentiators() {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 2rem 3rem" }}>
      <p style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(245,247,250,0.35)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "1.5rem" }}>
        Why CitationIQ wins
      </p>
      {diffs.map((d) => (
        <div key={d.title} style={{
          background: "rgba(255,255,255,0.04)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: 12,
          padding: "1.25rem",
          marginBottom: "1rem",
          display: "flex",
          gap: 12,
        }}>
          <span style={{ fontSize: 20, color: YELLOW, marginTop: 2, flexShrink: 0 }}>{d.icon}</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 4 }}>{d.title}</p>
            <p style={{ fontSize: 12, color: "rgba(245,247,250,0.4)", lineHeight: 1.6 }}>{d.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Pricing ────────────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Free",
    price: "$0",
    period: "one-time audit",
    features: ["40 signal checks", "Overall score + summary", "Top 5 fix recommendations"],
    featured: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "per month",
    features: ["80+ signal checks", "Live AI platform testing", "Competitor benchmarking", "Monthly tracking"],
    featured: true,
  },
  {
    name: "Agency",
    price: "$199",
    period: "per month",
    features: ["Up to 25 client sites", "White-label PDF reports", "Branded client dashboard", "Priority support"],
    featured: false,
  },
];

function Pricing() {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 2rem 3rem" }}>
      <p style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(245,247,250,0.35)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "1.5rem" }}>
        Pricing
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {plans.map((p) => (
          <div key={p.name} style={{
            background: p.featured ? `rgba(255,217,59,0.05)` : "rgba(255,255,255,0.03)",
            border: `0.5px solid ${p.featured ? "rgba(255,217,59,0.5)" : "rgba(255,255,255,0.07)"}`,
            borderRadius: 12,
            padding: "1.25rem",
          }}>
            <p style={{ fontFamily: "monospace", fontSize: 11, color: p.featured ? YELLOW : "rgba(232,237,242,0.4)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
              {p.name}
            </p>
            <p style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{p.price}</p>
            <p style={{ fontSize: 11, color: "rgba(232,237,242,0.3)", marginBottom: "1rem" }}>{p.period}</p>
            {p.features.map((f) => (
              <p key={f} style={{ fontSize: 12, color: "rgba(232,237,242,0.5)", display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <span style={{ color: YELLOW }}>✓</span> {f}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CTA ────────────────────────────────────────────────────────────────────────
function CTA() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "3rem 2rem 5rem" }}>
      <h2 style={{ fontSize: 28, fontWeight: 600, color: "#fff", marginBottom: "0.75rem", letterSpacing: "-0.5px" }}>
        Run your free audit now
      </h2>
      <p style={{ fontSize: 14, color: "rgba(232,237,242,0.4)", marginBottom: "1.5rem" }}>
        No signup required · results in 60 seconds
      </p>
      <button
        onClick={() => navigate("/audit")}
        style={{
          ...gradBg,
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
          border: "none",
          padding: "14px 32px",
          borderRadius: 10,
          cursor: "pointer",
        }}
      >
        Get your AI visibility score ↗
      </button>
    </div>
  );
}

// ── Home ───────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main style={{ background: "#040c14", color: "#f5f7fa", minHeight: "100vh", overflowX: "hidden" }}>
      <Hero />
      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 2rem 3rem" }} />
      <ScorePreview />
      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 2rem 2rem" }} />
      <Categories />
      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 2rem 2rem" }} />
      <Differentiators />
      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 2rem 2rem" }} />
      <Pricing />
      <CTA />
    </main>
  );
}
