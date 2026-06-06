import { useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion"

// ── Design Tokens (Code SS) ───────────────────────────────────────────────────
const APEX_YELLOW = "#FFD93B"
const BLACK = "#0a0a0a"
const WHITE = "#ffffff"
const MUTED = "#888888"

// ── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedNumber({ value, suffix = "" }) {
  const ref = useRef(null)
  const motionVal = useMotionValue(0)
  const rounded = useTransform(motionVal, (v) => Math.round(v))
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      animate(motionVal, value, { duration: 1.8, ease: "easeOut" })
    }
  }, [inView, value, motionVal])

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

// ── Noise / grain overlay ─────────────────────────────────────────────────────
const grainStyle = {
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  zIndex: 0,
  opacity: 0.035,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  backgroundSize: "128px 128px",
}

// ── Nav Items ─────────────────────────────────────────────────────────────────
const navItems = [
  { label: "Home", active: true },
  { label: "SEO & GEO", dropdown: true },
  { label: "Web Design" },
  { label: "Results", dropdown: true },
]

// ── Stagger config ────────────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

// ── Logo SVG (inline, matches screenshot) ────────────────────────────────────
function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", alignItems: "center", gap: 10 }}
    >
      {/* Lettermark A with arrow */}
      <div style={{
        width: 52, height: 52,
        background: "linear-gradient(135deg, #2a2a2a 0%, #111 100%)",
        borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "1px solid #222",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* A letterform */}
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 32,
          color: WHITE,
          lineHeight: 1,
          letterSpacing: -1,
        }}>a</span>
        {/* Arrow accent */}
        <div style={{
          position: "absolute", right: 6, bottom: 8,
          width: 0, height: 0,
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderLeft: `8px solid ${APEX_YELLOW}`,
        }} />
      </div>
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function LandingHero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const gradX = useTransform(mouseX, [0, window?.innerWidth ?? 1440], [-15, 15])
  const gradY = useTransform(mouseY, [0, window?.innerHeight ?? 900], [-15, 15])

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        minHeight: "100vh",
        background: BLACK,
        color: WHITE,
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Google Fonts */}
      <style>{`
      
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-link {
          color: ${WHITE};
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.01em;
          padding: 6px 0;
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
          opacity: 0.85;
          transition: opacity 0.2s;
        }
        .nav-link:hover { opacity: 1; }
        .nav-link.active {
          text-decoration: underline;
          text-underline-offset: 4px;
          opacity: 1;
        }
        .cta-btn {
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.35);
          color: ${WHITE};
          font-family: 'DM Sans', sans-serif;
          font-size: 17px;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 20px 56px;
          border-radius: 100px;
          cursor: pointer;
          transition: border-color 0.25s, background 0.25s, color 0.25s, transform 0.2s;
          position: relative;
          overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: ${APEX_YELLOW};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
          border-radius: 100px;
        }
        .cta-btn:hover::before { transform: scaleX(1); }
        .cta-btn:hover { color: ${BLACK}; border-color: ${APEX_YELLOW}; transform: translateY(-2px); }
        .cta-btn span { position: relative; z-index: 1; }

        .stat-divider {
          width: 1px;
          height: 32px;
          background: rgba(255,255,255,0.15);
        }
      `}</style>

      {/* Grain overlay */}
      <div style={grainStyle} />

      {/* Radial glow, tracks mouse */}
      <motion.div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,217,59,0.07) 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          x: gradX,
          y: gradY,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Diagonal slash accent (Code SS) */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          right: "8%",
          top: "10%",
          width: 2,
          height: "55%",
          background: `linear-gradient(to bottom, transparent, ${APEX_YELLOW}33, transparent)`,
          transform: "rotate(12deg)",
          transformOrigin: "top",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          left: "5%",
          bottom: "15%",
          width: 2,
          height: "30%",
          background: `linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)`,
          transform: "rotate(12deg)",
          transformOrigin: "top",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── NAV ── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 36,
          padding: "28px 48px",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <Logo />
        <div style={{ display: "flex", gap: 32, marginLeft: 8 }}>
          {navItems.map((item) => (
            <a key={item.label} href="#" className={`nav-link${item.active ? " active" : ""}`}>
              {item.label}
              {item.dropdown && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "80px 24px 120px",
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        {/* Eyebrow badge */}
        <motion.div variants={fadeIn} style={{ marginBottom: 32 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,217,59,0.08)",
            border: `1px solid rgba(255,217,59,0.25)`,
            borderRadius: 100,
            padding: "6px 16px 6px 10px",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: APEX_YELLOW,
              boxShadow: `0 0 8px ${APEX_YELLOW}`,
            }} />
            <span style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: APEX_YELLOW,
            }}>
              Houston's GEO-First Web Agency
            </span>
          </div>
        </motion.div>

        {/* Headline line 1 */}
        <motion.div variants={fadeUp}>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(56px, 10vw, 112px)",
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
            color: WHITE,
            marginBottom: 0,
          }}>
            Custom Websites That
          </h1>
        </motion.div>

        {/* Headline line 2 — yellow accent */}
        <motion.div variants={fadeUp}>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(56px, 10vw, 112px)",
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
            marginBottom: 0,
            position: "relative",
            display: "inline-block",
          }}>
            {/* Glow behind yellow text */}
            <span style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at center, rgba(255,217,59,0.18) 0%, transparent 70%)`,
              pointerEvents: "none",
              filter: "blur(20px)",
            }} />
            <span style={{ color: APEX_YELLOW, position: "relative" }}>
              Get You Found{" "}
            </span>
            <span style={{ color: WHITE, position: "relative" }}>by</span>
          </h1>
        </motion.div>

        {/* Headline line 3 */}
        <motion.div variants={fadeUp}>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(56px, 10vw, 112px)",
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            color: WHITE,
            marginBottom: 28,
          }}>
            Google &amp; AI&#8209;Search
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: MUTED,
            maxWidth: 560,
            lineHeight: 1.65,
            fontWeight: 400,
            marginBottom: 52,
          }}
        >
          ApexWeb360 bilingual Houston&#8209;based web design, SEO,
          GEO and AI&#8209;Search optimization for local businesses
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp}>
          <button className="cta-btn">
            <span>Explore Solutions</span>
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            marginTop: 72,
            paddingTop: 40,
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {[
            { value: 4, suffix: "+", label: "AI Platforms Citing Us" },
            { value: 100, suffix: "%", label: "Bilingual EN / ES" },
            { value: 360, suffix: "°", label: "Full-Stack Coverage" },
          ].map((stat, i) => (
            <>
              {i > 0 && <div key={`div-${i}`} className="stat-divider" />}
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 36,
                  color: WHITE,
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{
                  fontSize: 11,
                  color: MUTED,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: 6,
                  fontWeight: 500,
                }}>
                  {stat.label}
                </div>
              </div>
            </>
          ))}
        </motion.div>
      </motion.main>

      {/* ── BOTTOM TICKER ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
          padding: "14px 0",
          zIndex: 1,
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          style={{ display: "flex", gap: 48, width: "max-content" }}
        >
          {Array(4).fill(["Web Design", "SEO", "GEO", "AI-Search", "Houston", "Bilingual", "Energy Corridor", "West Houston"]).flat().map((item, i) => (
            <span key={i} style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.18)",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}>
              {item}
              <span style={{ marginLeft: 48, color: APEX_YELLOW, opacity: 0.4 }}>·</span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
