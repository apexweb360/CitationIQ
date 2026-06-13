import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

const CYAN   = "#00E5FF";
const BLUE   = "#3D6BFF";
const PURPLE = "#A742FF";
const GRAD   = `linear-gradient(to right, ${CYAN}, ${BLUE}, ${PURPLE})`;

const features = [
  { title: "Multi-client dashboard",    desc: "Track AI visibility scores for every client in one view." },
  { title: "White-label audit reports", desc: "Branded PDF reports you can send directly to clients." },
  { title: "Competitor benchmarking",   desc: "Show clients exactly how they stack up against local rivals in AI." },
  { title: "Monthly monitoring alerts", desc: "Get notified when a client's AI visibility drops." },
];

export default function SolutionsAgencies() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [agency, setAgency] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to backend / email capture
    console.log("Agency access request:", { email, agency });
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#040c14", color: "#fff", fontFamily: "inherit" }}>
      <Navbar />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 120px" }}>

        <div style={{ textAlign: "center", marginBottom: 60 }}>

          {/* Label */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(167,66,255,0.08)", border: "0.5px solid rgba(167,66,255,0.2)",
            borderRadius: 20, padding: "4px 14px", marginBottom: 28,
            fontSize: 12, fontWeight: 600, color: PURPLE, letterSpacing: "0.04em",
          }}>
            For Agencies · Beta Access
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
            GEO reporting built for{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              agencies
            </span>
          </h1>

          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: "0 auto 0", maxWidth: 540 }}>
            Stop manually checking AI tools for every client. Stratena gives your agency a single
            dashboard to track, report, and improve AI visibility across your entire book of business.
          </p>
        </div>

        {/* Feature grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 56 }}>
          {features.map((f) => (
            <div key={f.title} style={{
              background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)",
              borderRadius: 12, padding: "20px 22px",
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Request access form */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.1)",
          borderRadius: 16, padding: "36px 40px", maxWidth: 480, margin: "0 auto",
        }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 8 }}>You're on the list</div>
              <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                We're onboarding a small group of agency beta partners. We'll reach out within 48 hours.
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Request beta access</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24, lineHeight: 1.5 }}>
                We're working with a small cohort of agencies to shape the product. Limited spots.
              </div>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input
                  type="text"
                  placeholder="Agency name"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  required
                  style={{
                    padding: "11px 14px", borderRadius: 8,
                    background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)",
                    color: "#fff", fontSize: 13.5, fontFamily: "inherit", outline: "none",
                  }}
                />
                <input
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    padding: "11px 14px", borderRadius: 8,
                    background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)",
                    color: "#fff", fontSize: 13.5, fontFamily: "inherit", outline: "none",
                  }}
                />
                <button type="submit" style={{
                  marginTop: 4, padding: "12px", borderRadius: 8,
                  background: GRAD, color: "#fff",
                  fontSize: 14, fontWeight: 600,
                  cursor: "pointer", border: "none", fontFamily: "inherit",
                }}>
                  Request Access
                </button>
              </form>
              <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 14 }}>
                No commitment · We'll reach out within 48 hours
              </p>
            </>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link to="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>
            ← Back to home
          </Link>
        </div>

      </div>
    </div>
  );
}
