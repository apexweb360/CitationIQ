import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { getFaviconUrl, getDomain } from "../../services/m1Service";

const ENGINES = [
  { label: "ChatGPT",    color: "#10a37f" },
  { label: "Perplexity", color: "#20b2aa" },
  { label: "Gemini",     color: "#4285F4" },
  { label: "Claude",     color: "#D97706" },
];

export default function M1UrlStep({ onConfirm, loading }) {
  const [url,        setUrl]        = useState("");
  const [favicon,    setFavicon]    = useState(null);
  const [faviconOk,  setFaviconOk]  = useState(false);
  const [faviconErr, setFaviconErr] = useState(false);
  const debounceRef = useRef(null);

  const handleChange = (val) => {
    setUrl(val);
    setFaviconOk(false);
    setFaviconErr(false);
    clearTimeout(debounceRef.current);

    if (val.length < 5) { setFavicon(null); return; }
    debounceRef.current = setTimeout(() => setFavicon(getFaviconUrl(val)), 380);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canContinue) return;
    onConfirm(url.trim());
  };

  const domain      = url ? getDomain(url) : null;
  const showPreview = favicon && (faviconOk || faviconErr);
  const canContinue = url.trim().length > 4 && !loading;

  return (
    <div className="space-y-6">

      {/* Eyebrow + headline */}
      <div>
        <p
          className="text-[11px] font-bold tracking-widest uppercase mb-2.5"
          style={{
            background: "linear-gradient(to right, #00E5FF, #3D6BFF, #A742FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Stratena M1 · Visibility Scan
        </p>
        <h1
          className="text-[26px] sm:text-[30px] font-extrabold leading-tight mb-2"
          style={{ color: "#111111", letterSpacing: "-0.02em" }}
        >
          How visible is your<br />business to AI?
        </h1>
        <p className="text-[13.5px] leading-relaxed" style={{ color: "#6b7280" }}>
          Enter your website URL and we'll scan ChatGPT, Perplexity, Gemini &amp; Claude
          — then score how often AI recommends you over competitors.
        </p>
      </div>

      {/* URL form */}
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div>
          <label htmlFor="m1-url" className="flex items-center gap-1.5 text-[13px] font-semibold text-[#374151] mb-1.5">
            Your website URL
            <span style={{
              background: "linear-gradient(to right, #00E5FF, #3D6BFF, #A742FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: 14,
            }}>*</span>
          </label>

          <div className="relative">
            <input
              id="m1-url"
              type="text"
              value={url}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="yourbusiness.com"
              autoComplete="url"
              autoFocus
              required
              className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-150
                         bg-white border border-[#d1d5db] text-[#111111] placeholder-[#9ca3af]
                         focus:border-[#00E5FF] focus:shadow-[0_0_0_3px_rgba(0,229,255,0.14)]"
              style={{ paddingRight: favicon ? "52px" : "16px" }}
            />

            {/* Favicon preview inside input */}
            {favicon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg overflow-hidden
                              flex items-center justify-center bg-[#f3f4f6] border border-[#e5e7eb]">
                <img
                  src={favicon}
                  alt=""
                  className="w-5 h-5 object-contain"
                  onLoad={() => setFaviconOk(true)}
                  onError={() => setFaviconErr(true)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Site confirmation card — appears once favicon resolves */}
        {showPreview && domain && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
              style={{ background: "#fff", border: "1px solid #e5e7eb" }}
            >
              {faviconOk
                ? <img src={favicon} alt="" className="w-5 h-5 object-contain" />
                : <GlobeIcon />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[#15803d] truncate">{domain}</p>
              <p className="text-[11px] text-[#16a34a]">Site confirmed — ready to scan</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </motion.div>
        )}

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={!canContinue}
          whileHover={canContinue ? { translateY: -1 } : {}}
          whileTap={canContinue ? { scale: 0.98 } : {}}
          className="w-full py-3.5 rounded-xl font-bold text-[15px] transition-all duration-200 flex items-center justify-center gap-2"
          style={
            canContinue
              ? {
                  background: "linear-gradient(to right, #00E5FF, #3D6BFF, #A742FF)",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(167,66,255,0.25)",
                  cursor: "pointer",
                }
              : {
                  background: "#e5e7eb",
                  color: "#9ca3af",
                  cursor: "not-allowed",
                }
          }
        >
          {loading ? (
            <><Spinner /> Finding your competitors…</>
          ) : (
            <>
              Check my AI visibility
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </>
          )}
        </motion.button>
      </form>

      {/* AI engines row */}
      <div className="flex flex-wrap gap-1.5">
        {ENGINES.map(({ label, color }) => (
          <span key={label}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
            style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151" }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>

      {/* Trust line */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px]" style={{ color: "#6b7280" }}>
        {["Free scan", "No sign-up required", "Results in ~60 seconds"].map((item, i, arr) => (
          <span key={item} className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                 stroke="#10a37f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {item}
            {i < arr.length - 1 && <span className="ml-3" style={{ color: "#d1d5db" }}>·</span>}
          </span>
        ))}
      </div>

    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  );
}
