import { useState, useRef } from "react";
import { motion } from "framer-motion";

/** Reusable tag-input: press Enter or comma to add, click × to remove */
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
    if (e.key === "Backspace" && !input && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  const remove = (tag) => setTags(tags.filter((t) => t !== tag));

  return (
    <div
      className="flex flex-wrap gap-2 p-3 rounded-xl border border-[var(--color-border)]
                 bg-[var(--color-surface)] cursor-text min-h-[52px]"
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm
                     bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30"
        >
          {tag}
          <button
            type="button"
            onClick={() => remove(tag)}
            className="ml-1 hover:text-white transition-colors leading-none"
            aria-label={`Remove ${tag}`}
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
        className="flex-1 min-w-[120px] bg-transparent outline-none text-sm
                   text-white placeholder-[var(--color-muted)]"
      />
    </div>
  );
}

const fieldClass = `
  w-full px-4 py-3 rounded-xl border border-[var(--color-border)]
  bg-[var(--color-surface)] text-white placeholder-[var(--color-muted)]
  outline-none focus:border-[#00E5FF] transition-colors text-sm
`.trim();

const labelClass = "block text-sm font-medium text-[var(--color-muted)] mb-2";

export default function AuditForm({ onSubmit, isLoading }) {
  const [businessName, setBusinessName]   = useState("");
  const [website, setWebsite]             = useState("");
  const [serviceArea, setServiceArea]     = useState("");
  const [services, setServices]           = useState([]);
  const [competitors, setCompetitors]     = useState([]);

  const canSubmit =
    businessName.trim() &&
    website.trim() &&
    serviceArea.trim() &&
    services.length > 0 &&
    !isLoading;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      business_name: businessName.trim(),
      website:       website.trim(),
      service_area:  serviceArea.trim(),
      services,
      competitors,
      tier:          "free",
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto space-y-6"
    >
      {/* Business name */}
      <div>
        <label htmlFor="business-name" className={labelClass}>
          Business name <span className="text-[#00E5FF]">*</span>
        </label>
        <input
          id="business-name"
          type="text"
          className={fieldClass}
          placeholder="e.g. Apex HVAC Services"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
        />
      </div>

      {/* Website */}
      <div>
        <label htmlFor="website" className={labelClass}>
          Website <span className="text-[#00E5FF]">*</span>
        </label>
        <input
          id="website"
          type="text"
          className={fieldClass}
          placeholder="e.g. https://apexhvac.com"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          required
        />
      </div>

      {/* Service area */}
      <div>
        <label htmlFor="service-area" className={labelClass}>
          Service area <span className="text-[#00E5FF]">*</span>
        </label>
        <input
          id="service-area"
          type="text"
          className={fieldClass}
          placeholder="e.g. Houston, TX"
          value={serviceArea}
          onChange={(e) => setServiceArea(e.target.value)}
          required
        />
      </div>

      {/* Services — tag input */}
      <div>
        <label htmlFor="services" className={labelClass}>
          Services <span className="text-[#00E5FF]">*</span>
          <span className="ml-2 font-normal text-xs opacity-60">Press Enter or comma to add</span>
        </label>
        <TagInput
          id="services"
          tags={services}
          setTags={setServices}
          placeholder="e.g. HVAC, AC repair, heating…"
        />
      </div>

      {/* Competitors — optional */}
      <div>
        <label htmlFor="competitors" className={labelClass}>
          Competitors
          <span className="ml-2 font-normal text-xs opacity-60">Optional — Press Enter or comma to add</span>
        </label>
        <TagInput
          id="competitors"
          tags={competitors}
          setTags={setCompetitors}
          placeholder="e.g. CoolAir Houston, ProHeat TX…"
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={!canSubmit}
        whileHover={canSubmit ? { scale: 1.02 } : {}}
        whileTap={canSubmit ? { scale: 0.98 } : {}}
        className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-200
          ${canSubmit
            ? "text-white hover:opacity-90 cursor-pointer"
            : "bg-[var(--color-surface)] text-[var(--color-muted)] border border-[var(--color-border)] cursor-not-allowed"
          }`}
        style={canSubmit ? { background: "linear-gradient(to right, #00E5FF, #3D6BFF, #A742FF)" } : {}}
      >
        {isLoading ? "Submitting…" : "Run Free Audit →"}
      </motion.button>

      <p className="text-center text-xs text-[var(--color-muted)]">
        Free audit · No credit card · Results in ~60 seconds
      </p>
    </motion.form>
  );
}
