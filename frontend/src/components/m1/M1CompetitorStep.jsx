import { motion } from "framer-motion";
import { getFaviconUrl } from "../../services/m1Service";

export default function M1CompetitorStep({
  domain, faviconUrl, suggestions, selected, onToggle, onStartScan,
}) {
  const atMax = selected.length >= 3;

  return (
    <div className="space-y-5">

      {/* Confirmed site header */}
      <div
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
        style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
      >
        <div className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center flex-shrink-0"
             style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
          <img
            src={faviconUrl}
            alt=""
            className="w-4 h-4 object-contain"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
        <span className="text-[13px] font-medium text-[#15803d] flex-1 truncate">{domain}</span>
        <span className="text-[11px] text-[#16a34a] flex items-center gap-1 flex-shrink-0">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
               stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Confirmed
        </span>
      </div>

      {/* Step label + headline */}
      <div>
        <p
          className="text-[11px] font-bold tracking-widest uppercase mb-1.5"
          style={{
            background: "linear-gradient(to right, #00E5FF, #3D6BFF, #A742FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Step 2 of 2 · Pick competitors
        </p>
        <h2
          className="text-[20px] font-extrabold leading-tight mb-1"
          style={{ color: "#111111", letterSpacing: "-0.02em" }}
        >
          Who do you compete against?
        </h2>
        <p className="text-[13px]" style={{ color: "#6b7280" }}>
          We'll compare your AI visibility against up to 3 competitors.
          Skip this step to scan without a comparison.
        </p>
      </div>

      {/* Selection counter */}
      <div className="flex items-center justify-between min-h-[24px]">
        <span className="text-[12px]" style={{ color: "#374151" }}>
          {selected.length === 0
            ? "None selected — optional"
            : `${selected.length} / 3 selected`}
        </span>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex gap-1"
          >
            {selected.map((c) => (
              <span
                key={c.domain}
                className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: "rgba(0,229,255,0.1)",
                  border: "1px solid rgba(0,229,255,0.3)",
                  color: "#00B8D9",
                }}
              >
                {c.name.split(" ")[0]}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Competitor grid */}
      <div className="grid grid-cols-2 gap-2">
        {suggestions.map((c, i) => {
          const isSelected = selected.some((s) => s.domain === c.domain);
          const isDisabled = !isSelected && atMax;

          return (
            <motion.button
              key={c.domain}
              type="button"
              onClick={() => !isDisabled && onToggle(c)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.035 }}
              whileHover={!isDisabled ? { scale: 1.018 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-150"
              style={{
                background:  isSelected ? "rgba(0,229,255,0.06)" : "#f9fafb",
                border:      isSelected ? "1.5px solid rgba(0,229,255,0.4)" : "1.5px solid #e5e7eb",
                boxShadow:   isSelected ? "0 0 0 2px rgba(0,229,255,0.08)" : "none",
                cursor:      isDisabled ? "not-allowed" : "pointer",
                opacity:     isDisabled ? 0.38 : 1,
              }}
            >
              {/* Competitor favicon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{ background: "#e5e7eb" }}
              >
                <img
                  src={getFaviconUrl(c.domain)}
                  alt=""
                  className="w-5 h-5 object-contain"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-semibold text-[#111111] truncate leading-tight">{c.name}</p>
                <p className="text-[11px] truncate leading-tight mt-0.5" style={{ color: "#9ca3af" }}>{c.domain}</p>
              </div>

              {/* Selected checkmark */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "#00E5FF" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                       stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {atMax && (
        <p className="text-center text-[11.5px]" style={{ color: "#9ca3af" }}>
          Max 3 competitors selected — deselect one to swap
        </p>
      )}

      {/* Scan button */}
      <motion.button
        type="button"
        onClick={onStartScan}
        whileHover={{ translateY: -1 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3.5 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 transition-all"
        style={{
          background: "linear-gradient(to right, #00E5FF, #3D6BFF, #A742FF)",
          color: "#fff",
          boxShadow: "0 4px 20px rgba(167,66,255,0.25)",
        }}
      >
        Scan my AI visibility
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </motion.button>

      <p className="text-center text-[11.5px]" style={{ color: "#9ca3af" }}>
        Scanning 4 AI engines · ~60 seconds
      </p>

    </div>
  );
}
