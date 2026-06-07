import { useState, useRef } from "react";
import { motion } from "framer-motion";

/* ── Light-card field styles ─────────────────────────────── */
const fieldClass = [
  "w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all duration-150",
  "bg-white border border-[#d1d5db] text-[#111111] placeholder-[#9ca3af]",
  "focus:border-[#00E5FF] focus:shadow-[0_0_0_3px_rgba(0,229,255,0.14)]",
].join(" ");

const labelClass = "flex items-center gap-1.5 text-[13px] font-semibold text-[#374151] mb-1.5";

/* ── Tag input (light theme) ─────────────────────────────── */
function TagInput({ tags, setTags, placeholder, id }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const addTag = () => {
    const val = input.trim().replace(/,$/, "");
    if (val && !tags.includes(val)) setTags([...tags, val]);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); }
    if (e.key === "Backspace" && !input && tags.length) setTags(tags.slice(0, -1));
  };

  return (
    <div
      className="flex flex-wrap items-center gap-1.5 p-2.5 rounded-xl cursor-text min-h-[46px]
                 transition-all duration-150"
      style={{
        background: "#fff",
        border: "1px solid #d1d5db",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[12px] font-medium"
          style={{
            background: "#e0f9ff",
            border: "1px solid #bae6fd",
            color: "#0e7490",
          }}
        >
          {tag}
          <button
            type="button"
            onClick={() => setTags(tags.filter((t) => t !== tag))}
            className="leading-none hover:opacity-100 opacity-70 transition-opacity text-[15px]"
            aria-label={`Remove ${tag}`}
            style={{ color: "#0891b2" }}
          >
            ×
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={addTag}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[100px] text-sm text-[#111111] placeholder-[#9ca3af] outline-none"
        style={{ background: "transparent", border: "none", boxShadow: "none", padding: "2px 4px" }}
      />
    </div>
  );
}

/* ── Geolocation hook ────────────────────────────────────── */
function useGeolocation(onResult, onError) {
  const [loading, setLoading] = useState(false);

  const detect = () => {
    if (!navigator.geolocation) { onError("Not supported"); return; }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
          );
          const d = await r.json();
          const city  = d.address?.city || d.address?.town || d.address?.village || "";
          const state = d.address?.state_code || d.address?.state || "";
          const zip   = d.address?.postcode || "";
          const val   = zip
            ? `${city ? city + ", " : ""}${state} ${zip}`.trim()
            : `${city}${state ? ", " + state : ""}`.trim();
          onResult(val);
        } catch { onError("Could not resolve location"); }
        finally  { setLoading(false); }
      },
      (err) => {
        setLoading(false);
        onError(err.code === 1 ? "Location permission denied" : "Detection failed");
      },
      { timeout: 8000 }
    );
  };

  return { detect, loading };
}

/* ── Optional badge ──────────────────────────────────────── */
function OptBadge() {
  return (
    <span
      className="text-[11px] font-normal rounded px-1.5 py-px"
      style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#9ca3af" }}
    >
      Optional
    </span>
  );
}

/* ── Required star ───────────────────────────────────────── */
function ReqStar() {
  return (
    <span
      style={{
        background: "linear-gradient(to right, #00E5FF, #3D6BFF, #A742FF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontSize: 14,
      }}
    >
      *
    </span>
  );
}

/* ── Hint ────────────────────────────────────────────────── */
function Hint({ children }) {
  return (
    <p className="mt-1.5 text-[11.5px] leading-snug" style={{ color: "#9ca3af" }}>
      {children}
    </p>
  );
}

/* ── Main form ───────────────────────────────────────────── */
export default function AuditForm({ onSubmit, isLoading }) {
  const [businessName, setBusinessName] = useState("");
  const [website,      setWebsite]      = useState("");
  const [serviceArea,  setServiceArea]  = useState("");
  const [services,     setServices]     = useState([]);
  const [competitors,  setCompetitors]  = useState([]);
  const [geoHint,      setGeoHint]      = useState("");

  const { detect, loading: geoLoading } = useGeolocation(
    (val) => { setServiceArea(val); setGeoHint("✓ Location detected — edit if needed"); },
    (msg) => setGeoHint(msg)
  );

  const canSubmit =
    businessName.trim() && website.trim() && serviceArea.trim() && !isLoading;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      business_name: businessName.trim(),
      website:       website.trim(),
      service_area:  serviceArea.trim(),
      services,
      competitors,
      tier: "free",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>

      {/* Business name */}
      <div>
        <label htmlFor="business-name" className={labelClass}>
          Business Name <ReqStar />
        </label>
        <input
          id="business-name"
          type="text"
          className={fieldClass}
          placeholder="e.g. Sunrise Dental Katy"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          autoComplete="organization"
          required
        />
      </div>

      {/* Website */}
      <div>
        <label htmlFor="website" className={labelClass}>
          Website <ReqStar />
        </label>
        <input
          id="website"
          type="text"
          className={fieldClass}
          placeholder="https://yourbusiness.com"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          autoComplete="url"
          required
        />
      </div>

      {/* Service area + geolocation */}
      <div>
        <label htmlFor="service-area" className={labelClass}>
          Service Area <ReqStar />
        </label>
        <div className="relative">
          <input
            id="service-area"
            type="text"
            className={fieldClass + " pr-10"}
            placeholder="City or ZIP code"
            value={serviceArea}
            onChange={(e) => setServiceArea(e.target.value)}
            autoComplete="postal-code"
            required
          />
          <button
            type="button"
            onClick={detect}
            disabled={geoLoading}
            title="Auto-detect my location"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md
                       transition-colors disabled:opacity-40"
            style={{ color: "#9ca3af" }}
            onMouseEnter={e => e.currentTarget.style.color = "#0891b2"}
            onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}
          >
            <svg
              className={geoLoading ? "animate-spin" : ""}
              width="17" height="17" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>
            </svg>
          </button>
        </div>
        {geoHint
          ? <Hint>{geoHint}</Hint>
          : <Hint>Tap ⊕ to auto-fill your city &amp; ZIP</Hint>
        }
      </div>

      {/* Services — optional */}
      <div>
        <label htmlFor="services" className={labelClass}>
          Services Offered <OptBadge />
        </label>
        <TagInput
          id="services"
          tags={services}
          setTags={setServices}
          placeholder="e.g. HVAC, AC repair, heating…"
        />
        <Hint>Press Enter or comma to add · We detect services from your site automatically</Hint>
      </div>

      {/* Competitors — optional */}
      <div>
        <label htmlFor="competitors" className={labelClass}>
          Competitors <OptBadge />
        </label>
        <TagInput
          id="competitors"
          tags={competitors}
          setTags={setCompetitors}
          placeholder="e.g. CoolAir Houston, ProHeat TX…"
        />
        <Hint>Press Enter or comma to add</Hint>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={!canSubmit}
        whileHover={canSubmit ? { translateY: -1 } : {}}
        whileTap={canSubmit ? { scale: 0.98 } : {}}
        className="w-full py-3.5 rounded-xl font-bold text-[15px] transition-all duration-200 flex items-center justify-content-center gap-2"
        style={
          canSubmit
            ? {
                background: "linear-gradient(to right, #00E5FF, #3D6BFF, #A742FF)",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(167,66,255,0.25)",
                cursor: "pointer",
                justifyContent: "center",
              }
            : {
                background: "#e5e7eb",
                color: "#9ca3af",
                cursor: "not-allowed",
                justifyContent: "center",
              }
        }
      >
        {isLoading ? "Launching audit…" : (
          <>
            Run Free Audit
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </>
        )}
      </motion.button>

      {/* Trust line */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px]" style={{ color: "#6b7280" }}>
        {["Free audit", "No credit card required", "Results in ~60 seconds"].map((item, i, arr) => (
          <span key={item} className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10a37f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {item}
            {i < arr.length - 1 && <span className="ml-3" style={{ color: "#d1d5db" }}>·</span>}
          </span>
        ))}
      </div>

    </form>
  );
}
