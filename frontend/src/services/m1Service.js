/**
 * M1 Visibility Scan — service layer (stubbed)
 * TODO: replace stub functions with real API calls once backend is wired
 */

const API_BASE = import.meta.env.VITE_API_URL ?? "/api/v1";

/* ── URL helpers ─────────────────────────────────────────── */

export function normalizeUrl(raw) {
  try {
    const url = raw.startsWith("http") ? raw : `https://${raw}`;
    return new URL(url).href.replace(/\/$/, "");
  } catch {
    return raw;
  }
}

export function getDomain(raw) {
  try {
    const url = raw.startsWith("http") ? raw : `https://${raw}`;
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return raw;
  }
}

/** Google's favicon CDN — works client-side, no backend needed */
export function getFaviconUrl(raw) {
  try {
    const domain = getDomain(raw);
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return null;
  }
}

/* ── Stub: meta scrape ───────────────────────────────────── */

/**
 * Scrape meta title / description / industry from the target URL.
 * TODO: wire to GET /api/v1/meta-scrape?url=
 */
export async function fetchBusinessMeta(url) {
  await delay(500);
  const domain = getDomain(url);
  const name = domain.split(".")[0].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: name,
    industry: "Local Business",
    description: `${name} — serving the local community.`,
  };
}

/* ── Stub: competitor suggestions ───────────────────────── */

/**
 * LLM-powered competitor suggestions for the given URL.
 * TODO: wire to POST /api/v1/suggest-competitors (returns industry-aware list)
 */
export async function fetchCompetitorSuggestions(url, _meta) {
  await delay(1000);
  // STUB — real version sends URL + meta to LLM, returns domain-specific competitors
  return [
    { name: "Local Leader Pro",    domain: "localleaderpro.com"   },
    { name: "Area Best Choice",    domain: "areabestchoice.com"   },
    { name: "City Top Rated",      domain: "citytoprated.com"     },
    { name: "Premier Services Co", domain: "premierservices.co"   },
    { name: "Quick Fix Experts",   domain: "quickfixexperts.com"  },
    { name: "Trusted Locals Inc",  domain: "trustedlocals.com"    },
    { name: "Pro Service Group",   domain: "proservicegroup.com"  },
    { name: "Elite Local Co",      domain: "elitelocal.co"        },
  ];
}

/* ── Stub: M1 scan ───────────────────────────────────────── */

const ENGINES = ["ChatGPT", "Perplexity", "Gemini", "Claude"];

/**
 * Run the M1 visibility scan.
 * Calls onProgress({ pct, engine, msg }) as it advances.
 * TODO: replace with POST /api/v1/m1-scan + GET /api/v1/m1-scan/:id polling
 *
 * @param {{ url: string, competitors: Array<{name, domain}> }} params
 * @param {(step: {pct, engine, msg}) => void} onProgress
 * @returns {Promise<M1Result>}
 */
export async function runM1Scan({ url, competitors }, onProgress) {
  const steps = [
    { pct: 5,   engine: null,         msg: "Generating AI visibility prompts…"     },
    { pct: 14,  engine: null,         msg: "Sending prompts to 4 AI engines…"      },
    { pct: 28,  engine: "ChatGPT",    msg: "Querying ChatGPT…"                     },
    { pct: 46,  engine: "Perplexity", msg: "Querying Perplexity…"                  },
    { pct: 64,  engine: "Gemini",     msg: "Querying Gemini…"                      },
    { pct: 80,  engine: "Claude",     msg: "Querying Claude…"                      },
    { pct: 91,  engine: null,         msg: "Calculating visibility score…"         },
    { pct: 100, engine: null,         msg: "Report ready."                         },
  ];

  for (const step of steps) {
    await delay(1300 + Math.random() * 700);
    onProgress(step);
  }

  const domain = getDomain(url);
  const score = Math.floor(Math.random() * 28) + 18; // 18-46 — typically low for unknown sites

  return {
    url,
    domain,
    overall_score: score,
    prompts_fired: 20,
    engine_results: ENGINES.map((engine, i) => ({
      engine,
      mentioned: i === 0 || (score > 32 && i === 1),
      mention_count:
        i === 0 ? Math.max(1, Math.floor(score / 7)) :
        score > 32 && i === 1 ? Math.floor(score / 14) :
        0,
    })),
    competitor_teasers: competitors.slice(0, 3).map((c) => ({
      name:         c.name,
      domain:       c.domain,
      beats_you_on: Math.floor(Math.random() * 7) + 3,
      total_queries: 20,
    })),
    missing_signals_preview: ["Google Business Profile", "Schema.org markup"],
    missing_signals_locked:  ["Industry directory citations", "Review signals", "Local data aggregators"],
    detail_locked: true,
  };
}

/* ── util ────────────────────────────────────────────────── */
function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
