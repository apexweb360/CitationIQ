import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { STRATENA_ASSETS } from "../../lib/brand";

/* ─── Brand tokens ───────────────────────────────────────────────────────────── */
const CYAN   = "#00E5FF";
const BLUE   = "#3D6BFF";
const PURPLE = "#A742FF";
const MINT   = "#A8F0FF";   // --ciq-know, mint green already in brand
const GRAD   = `linear-gradient(to right, ${CYAN}, ${BLUE}, ${PURPLE})`;

/* ─── Inline SVG icon ────────────────────────────────────────────────────────── */
const Ico = ({ p, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" style={{ display: "block", flexShrink: 0 }}>
    <path d={p} />
  </svg>
);

const P = {
  sparkle:  "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
  pin:      "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  bar:      "M3 3v16a2 2 0 0 0 2 2h16M18 9l-5 5-4-4-3 3",
  file:     "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zM14 2v4a2 2 0 0 0 2 2h4",
  write:    "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
  compass:  "m3 11 19-9-9 19-2-8z",
  users:    "M18 21a8 8 0 0 0-16 0M10 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8m10.5 7a4.5 4.5 0 0 0-4.5-4.5",
  book:     "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
  building: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18ZM6 12H4a2 2 0 0 0-2 2v8h4ZM18 9h2a2 2 0 0 1 2 2v11h-4ZM10 6h4M10 10h4M10 14h4M10 18h4",
  chevron:  "m6 9 6 6 6-6",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  menu:     "M4 6h16M4 12h16M4 18h16",
  x:        "M18 6 6 18M6 6l12 12",
  home:     "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
};

/* ─── Menu data ──────────────────────────────────────────────────────────────── */
const MENUS = {
  features: {
    w: 460,
    cols: [
      { heading: "Visibility", items: [
        { icon: "sparkle", label: "Visibility Score",      desc: "Your brand's presence across LLMs",  to: "/#features" },
        { icon: "pin",     label: "Citation Tracking",     desc: "Every mention, every AI model",       to: "/#features" },
      ]},
      { heading: "Analysis", items: [
        { icon: "bar",  label: "Competitor Benchmarking", desc: "See how you stack up in AI search",   to: "/#features" },
        { icon: "file", label: "Audit Reports",           desc: "Shareable GEO reports for clients",   to: "/#features" },
      ]},
    ],
    footer: { text: "Ready to see your AI Visibility Score?", cta: "Run free audit", to: "/audit" },
  },
  resources: {
    w: 440,
    cols: [
      { heading: "Learn", items: [
        { icon: "write",   label: "Blog",       desc: "GEO news, tactics and trends",     to: "/blog"   },
        { icon: "compass", label: "GEO Guides", desc: "Improve your AI citation rate",     to: "/guides" },
      ]},
      { heading: "Use", items: [
        { icon: "users", label: "Case Studies",  desc: "How agencies win with Stratena", to: "/cases" },
        { icon: "book",  label: "Documentation", desc: "API docs and integration guides",  to: "/docs"  },
      ]},
    ],
  },
};

/* ─── Solutions mega-panel ───────────────────────────────────────────────────── */
function SolutionsPanel({ onClose }) {
  const iconBox = { width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "rgba(255,255,255,0.5)" };
  return (
    <div style={{ position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", width: 380, background: "#111113", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 12, zIndex: 100 }}>
      <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.09em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", padding: "2px 10px 8px" }}>For Local Businesses</div>
      <Link to="/solutions/local" onClick={onClose} className="ciq-drop-item" style={{ display: "flex", alignItems: "flex-start", gap: 11, padding: "9px 10px", borderRadius: 9, textDecoration: "none" }}>
        <div className="ciq-drop-icon" style={iconBox}><Ico p={P.sparkle} size={14} /></div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#fff", lineHeight: 1.3 }}>See how AI describes your business</div>
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Free audit · results in 60 seconds</div>
        </div>
      </Link>
      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.07)", margin: "8px 0" }} />
      <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.09em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", padding: "2px 10px 8px" }}>For Agencies</div>
      <Link to="/solutions/agencies" onClick={onClose} className="ciq-drop-item" style={{ display: "flex", alignItems: "flex-start", gap: 11, padding: "9px 10px", borderRadius: 9, textDecoration: "none" }}>
        <div className="ciq-drop-icon" style={iconBox}><Ico p={P.building} size={14} /></div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#fff", lineHeight: 1.3 }}>Built for agencies managing multiple clients</div>
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Request access to the agency dashboard</div>
        </div>
      </Link>
    </div>
  );
}

/* ─── Generic dropdown panel ─────────────────────────────────────────────────── */
function DropPanel({ menu, onClose }) {
  return (
    <div style={{ position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", width: menu.w, background: "#111113", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 16, zIndex: 100 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {menu.cols.map((col, ci) => (
          <div key={ci} style={{ paddingRight: ci === 0 ? 14 : 0, paddingLeft: ci === 1 ? 14 : 0, borderRight: ci === 0 ? "0.5px solid rgba(255,255,255,0.08)" : "none" }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.09em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", padding: "2px 10px 8px", marginTop: 2 }}>
              {col.heading}
            </div>
            {col.items.map((item) => (
              <Link key={item.label} to={item.to} onClick={onClose} className="ciq-drop-item"
                style={{ display: "flex", alignItems: "flex-start", gap: 11, padding: "9px 10px", borderRadius: 9, textDecoration: "none" }}>
                <div className="ciq-drop-icon" style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "rgba(255,255,255,0.5)" }}>
                  <Ico p={P[item.icon]} size={14} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#fff", lineHeight: 1.3 }}>{item.label}</div>
                  <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)", marginTop: 2, lineHeight: 1.35 }}>{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
      {menu.footer && (
        <>
          <div style={{ height: "0.5px", background: "rgba(255,255,255,0.07)", margin: "10px 0" }} />
          <Link to={menu.footer.to} onClick={onClose} className="ciq-drop-footer"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 9, background: "rgba(83,74,183,0.12)", border: "0.5px solid rgba(127,119,221,0.2)", textDecoration: "none" }}>
            <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)" }}>{menu.footer.text}</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: CYAN, display: "flex", alignItems: "center", gap: 4 }}>
              {menu.footer.cta} <Ico p={P.arrow} size={11} />
            </span>
          </Link>
        </>
      )}
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────────────── */
export default function Navbar({ onReset, showReset = false }) {
  const [open,       setOpen]       = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timers   = useRef({});
  const navRef   = useRef(null);
  const navigate = useNavigate();

  const enter    = (id) => { clearTimeout(timers.current[id]); setOpen(id); };
  const leave    = (id) => { timers.current[id] = setTimeout(() => setOpen((p) => (p === id ? null : p)), 120); };
  const toggle   = (id) => setOpen((p) => (p === id ? null : id));
  const closeAll = () => { setOpen(null); setMobileOpen(false); };

  useEffect(() => {
    const outside = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpen(null); };
    const esc     = (e) => { if (e.key === "Escape") { setOpen(null); setMobileOpen(false); } };
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown",   esc);
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("keydown",   esc);
    };
  }, []);

  const navBtnStyle = (id) => ({
    display: "flex", alignItems: "center", gap: 5,
    padding: "5px 12px", borderRadius: 7, color: "#fff",
    background: open === id ? "rgba(255,255,255,0.08)" : "none",
    cursor: "pointer", border: "none",
    fontSize: 13.5, fontFamily: "inherit", letterSpacing: "-0.1px", whiteSpace: "nowrap",
  });

  return (
    <>
      {/* ── Scoped styles ────────────────────────────────────────────────── */}
      <style>{`
        .ciq-nav-btn         { transition: color .18s, background .18s; }
        .ciq-nav-btn:hover   { color: #fff !important; background: rgba(255,255,255,0.08) !important; }
        .ciq-nav-link        { transition: background .18s; }
        .ciq-nav-link:hover  { background: rgba(255,255,255,0.08) !important; }
        .ciq-drop-item       { transition: background .14s; }
        .ciq-drop-item:hover { background: rgba(255,255,255,0.05) !important; }
        .ciq-drop-item:hover .ciq-drop-icon { background: rgba(0,229,255,0.12) !important; color: ${CYAN} !important; }
        .ciq-drop-footer     { transition: background .14s; }
        .ciq-drop-footer:hover { background: rgba(83,74,183,0.22) !important; }
        .ciq-sign-in         { transition: color .18s, background .18s; }
        .ciq-sign-in:hover   { color: #fff !important; background: rgba(255,255,255,0.08) !important; }
        .ciq-cta             { transition: opacity .18s; }
        .ciq-cta:hover       { opacity: 0.85; }
        .ciq-ann-link        { transition: color .15s; }
        .ciq-ann-link:hover  { color: #fff !important; }
        .ciq-mob-item        { transition: background .14s; }
        .ciq-mob-item:hover  { background: rgba(255,255,255,0.06) !important; }
        .ciq-mob-primary     { transition: background .14s; }
        .ciq-mob-primary:hover { background: rgba(255,255,255,0.05) !important; }

        /* Desktop */
        .ciq-ann-bar   { display: flex; }
        .ciq-desktop   { display: flex; }
        .ciq-hamburger { display: none !important; }

        /* Mobile ≤ 767px — hide announcement bar entirely, show hamburger */
        @media (max-width: 767px) {
          .ciq-ann-bar   { display: none !important; }
          .ciq-desktop   { display: none !important; }
          .ciq-hamburger { display: flex !important; }
        }
      `}</style>

      {/* ─── Sticky wrapper — both rows stick together ──────────────────── */}
      <div style={{ position: "sticky", top: 0, zIndex: 50 }}>

        {/* ── Announcement bar (desktop only via CSS) ──────────────────── */}
        <div className="ciq-ann-bar" style={{
          background: "#080810",
          borderBottom: "0.5px solid rgba(255,255,255,0.07)",
          padding: "10px 16px 6px", textAlign: "center",
          fontSize: 12.5, color: "rgba(255,255,255,0.5)",
          alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <span style={{
            background: "rgba(167,66,255,0.18)", border: "0.5px solid rgba(167,66,255,0.3)",
            borderRadius: 20, padding: "2px 10px",
            fontSize: 11, fontWeight: 600, color: PURPLE, letterSpacing: "0.02em", flexShrink: 0,
          }}>
            New
          </span>
          Real-time citation tracking across ChatGPT, Perplexity &amp; Gemini
          <span style={{ opacity: 0.3 }}>·</span>
          <Link to="/blog" className="ciq-ann-link"
            style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
            See what&apos;s new <Ico p={P.arrow} size={12} />
          </Link>
        </div>

        {/* ── Main nav ─────────────────────────────────────────────────── */}
        <nav ref={navRef} style={{
          background: "#000", borderBottom: "0.5px solid rgba(255,255,255,0.08)",
          padding: "0 20px", height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo → Home */}
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            <img
              src={STRATENA_ASSETS.logoFull} alt="Stratena" draggable={false}
              style={{ height: 50, width: "auto", display: "block", objectFit: "contain" }}
              onError={(e) => {
                e.target.style.display = "none";
                if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback */}
            <span style={{ display: "none", alignItems: "center", gap: 7, fontSize: 17, fontWeight: 700, letterSpacing: "-0.4px", color: "#fff" }}>
              <img src={STRATENA_ASSETS.iconSvg} alt="" width={28} height={28} style={{ width: 28, height: 28, borderRadius: 7 }} onError={(e) => { e.target.style.display = "none"; }} />
              Citation<span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>IQ</span>
            </span>
          </Link>

          {/* Center nav links (desktop) */}
          <div className="ciq-desktop" style={{
            position: "absolute", left: "50%", transform: "translateX(-50%)",
            alignItems: "center", gap: 2,
          }}>
            <Link to="/" className="ciq-nav-btn ciq-nav-link" style={{ padding: "5px 12px", borderRadius: 7, color: "#fff", textDecoration: "none", fontSize: 13.5, letterSpacing: "-0.1px", whiteSpace: "nowrap" }}>
              Home
            </Link>

            <div style={{ position: "relative" }} onMouseEnter={() => enter("solutions")} onMouseLeave={() => leave("solutions")}>
              <button className="ciq-nav-btn" onClick={() => toggle("solutions")} style={navBtnStyle("solutions")}>
                Solutions <span style={{ display: "flex", transition: "transform 0.22s", transform: open === "solutions" ? "rotate(180deg)" : "rotate(0deg)", color: "rgba(255,255,255,0.5)" }}><Ico p={P.chevron} size={11} /></span>
              </button>
              {open === "solutions" && <SolutionsPanel onClose={() => setOpen(null)} />}
            </div>

            <div style={{ position: "relative" }} onMouseEnter={() => enter("features")} onMouseLeave={() => leave("features")}>
              <button className="ciq-nav-btn" onClick={() => toggle("features")} style={navBtnStyle("features")}>
                Features <span style={{ display: "flex", transition: "transform 0.22s", transform: open === "features" ? "rotate(180deg)" : "rotate(0deg)", color: "rgba(255,255,255,0.5)" }}><Ico p={P.chevron} size={11} /></span>
              </button>
              {open === "features" && <DropPanel menu={MENUS.features} onClose={() => setOpen(null)} />}
            </div>

            <div style={{ position: "relative" }} onMouseEnter={() => enter("resources")} onMouseLeave={() => leave("resources")}>
              <button className="ciq-nav-btn" onClick={() => toggle("resources")} style={navBtnStyle("resources")}>
                Resources <span style={{ display: "flex", transition: "transform 0.22s", transform: open === "resources" ? "rotate(180deg)" : "rotate(0deg)", color: "rgba(255,255,255,0.5)" }}><Ico p={P.chevron} size={11} /></span>
              </button>
              {open === "resources" && <DropPanel menu={MENUS.resources} onClose={() => setOpen(null)} />}
            </div>
          </div>

          {/* Right slot (desktop) */}
          <div className="ciq-desktop" style={{ alignItems: "center", gap: 6, flexShrink: 0 }}>
            {showReset && onReset ? (
              <button onClick={onReset} className="ciq-sign-in" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer", padding: "5px 12px", borderRadius: 7, fontFamily: "inherit" }}>
                ← Start over
              </button>
            ) : (
              <Link to="/login" className="ciq-sign-in" style={{ padding: "5px 12px", borderRadius: 7, color: "#fff", fontSize: 13.5, textDecoration: "none", letterSpacing: "-0.1px" }}>
                Sign in
              </Link>
            )}
            <button className="ciq-cta" onClick={() => navigate("/audit")} style={{
              padding: "7px 15px", borderRadius: 7, background: GRAD, color: "#fff",
              fontSize: 13.5, fontWeight: 600, cursor: "pointer", border: "none",
              display: "flex", alignItems: "center", gap: 6,
              letterSpacing: "-0.1px", whiteSpace: "nowrap", fontFamily: "inherit",
            }}>
              Check My AI Visibility <Ico p={P.arrow} size={13} />
            </button>
          </div>

          {/* Hamburger (mobile only) */}
          <button className="ciq-hamburger" onClick={() => setMobileOpen((p) => !p)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 8, borderRadius: 8, alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            aria-label="Toggle menu">
            <Ico p={mobileOpen ? P.x : P.menu} size={22} />
          </button>

        </nav>
      </div>
      {/* ── end sticky wrapper ─────────────────────────────────────────── */}

      {/* ── Mobile backdrop ───────────────────────────────────────────────── */}
      {mobileOpen && (
        <div onClick={closeAll} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 48, backdropFilter: "blur(4px)" }} />
      )}

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      <div style={{
        position: "fixed", top: 60, left: 0, right: 0,
        background: "#0c0c0e",
        borderBottom: "0.5px solid rgba(255,255,255,0.1)",
        zIndex: 49,
        transform: mobileOpen ? "translateY(0)" : "translateY(-110%)",
        transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: mobileOpen ? "all" : "none",
        overflowY: "auto", maxHeight: "calc(100dvh - 60px)",
      }}>

        {/* ── PRIMARY PAGES ── bold, large ─────────────────────────────── */}
        <div style={{ padding: "16px 0 8px" }}>
          {[
            { label: "Home",     to: "/",          icon: "home"    },
            { label: "Features", to: "/#features", icon: "sparkle" },
          ].map((item) => (
            <Link key={item.label} to={item.to} onClick={closeAll} className="ciq-mob-primary"
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 24px", textDecoration: "none", color: "#fff", fontSize: 16, fontWeight: 600, letterSpacing: "-0.3px" }}>
              <span style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: CYAN, flexShrink: 0 }}>
                <Ico p={P[item.icon]} size={15} />
              </span>
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ height: "0.5px", background: "rgba(255,255,255,0.07)", margin: "0 24px" }} />

        {/* ── SOLUTIONS ─────────────────────────────────────────────────── */}
        <div style={{ padding: "14px 24px 4px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 8 }}>Solutions</div>
          {[
            { label: "For Local Businesses", desc: "Free audit of your AI presence",           to: "/solutions/local"    },
            { label: "For Agencies",         desc: "Manage and report for multiple clients",   to: "/solutions/agencies" },
          ].map((item) => (
            <Link key={item.label} to={item.to} onClick={closeAll} className="ciq-mob-item"
              style={{ display: "flex", flexDirection: "column", padding: "10px 12px", marginBottom: 4, borderRadius: 9, textDecoration: "none" }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#fff" }}>{item.label}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{item.desc}</span>
            </Link>
          ))}
        </div>

        <div style={{ height: "0.5px", background: "rgba(255,255,255,0.07)", margin: "4px 24px" }} />

        {/* ── RESOURCES ─────────────────────────────────────────────────── */}
        <div style={{ padding: "14px 24px 4px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 8 }}>Resources</div>
          {[
            { label: "Blog",          desc: "GEO news, tactics and trends",    to: "/blog"   },
            { label: "GEO Guides",    desc: "Improve your AI citation rate",   to: "/guides" },
            { label: "Case Studies",  desc: "How agencies win with Stratena",to: "/cases"  },
            { label: "Documentation", desc: "API docs and integration guides", to: "/docs"   },
          ].map((item) => (
            <Link key={item.label} to={item.to} onClick={closeAll} className="ciq-mob-item"
              style={{ display: "flex", flexDirection: "column", padding: "9px 12px", marginBottom: 2, borderRadius: 9, textDecoration: "none" }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#fff" }}>{item.label}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{item.desc}</span>
            </Link>
          ))}
        </div>

        <div style={{ height: "0.5px", background: "rgba(255,255,255,0.07)", margin: "8px 24px" }} />

        {/* ── Sign in + CTA ─────────────────────────────────────────────── */}
        <div style={{ padding: "12px 24px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
          <Link to="/login" onClick={closeAll} style={{
            display: "block", textAlign: "center", padding: "13px",
            borderRadius: 9, border: "0.5px solid rgba(255,255,255,0.15)",
            color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 500,
            background: "rgba(255,255,255,0.04)",
          }}>
            Sign in
          </Link>
          <button onClick={() => { navigate("/audit"); closeAll(); }} style={{
            padding: "14px", borderRadius: 9, background: GRAD, color: "#fff",
            fontSize: 14, fontWeight: 700, cursor: "pointer", border: "none", fontFamily: "inherit",
            letterSpacing: "-0.2px",
          }}>
            Check My AI Visibility →
          </button>
        </div>

      </div>
    </>
  );
}
