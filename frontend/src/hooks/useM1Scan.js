import { useState, useCallback } from "react";
import {
  normalizeUrl,
  getDomain,
  getFaviconUrl,
  fetchBusinessMeta,
  fetchCompetitorSuggestions,
  runM1Scan,
} from "../services/m1Service";

/**
 * useM1Scan — state machine for the M1 Visibility Scan flow.
 *
 * Phases:
 *   "url"         — URL input (idle)
 *   "loading"     — fetching meta + competitor suggestions
 *   "competitors" — user selects up to 3 competitors
 *   "scanning"    — scan running
 *   "results"     — scan complete
 *   "failed"      — error
 */
export function useM1Scan() {
  const [phase,       setPhase]       = useState("url");
  const [url,         setUrl]         = useState("");
  const [domain,      setDomain]      = useState("");
  const [faviconUrl,  setFaviconUrl]  = useState(null);
  const [meta,        setMeta]        = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selected,    setSelected]    = useState([]);
  const [progress,    setProgress]    = useState({ pct: 0, engine: null, msg: "" });
  const [result,      setResult]      = useState(null);
  const [error,       setError]       = useState(null);

  /** Step 1: user confirms URL → fetch meta + competitor suggestions in parallel */
  const confirmUrl = useCallback(async (rawUrl) => {
    const normalized = normalizeUrl(rawUrl);
    const dom        = getDomain(normalized);

    setUrl(normalized);
    setDomain(dom);
    setFaviconUrl(getFaviconUrl(normalized));
    setError(null);
    setPhase("loading");

    try {
      const [metaData, competitorList] = await Promise.all([
        fetchBusinessMeta(normalized),
        fetchCompetitorSuggestions(normalized, {}),
      ]);
      setMeta(metaData);
      setSuggestions(competitorList);
      setPhase("competitors");
    } catch (err) {
      setError(err.message ?? "Failed to load competitor suggestions");
      setPhase("failed");
    }
  }, []);

  /** Toggle a competitor card on/off (max 3) */
  const toggleCompetitor = useCallback((competitor) => {
    setSelected((prev) => {
      const exists = prev.some((c) => c.domain === competitor.domain);
      if (exists) return prev.filter((c) => c.domain !== competitor.domain);
      if (prev.length >= 3) return prev;
      return [...prev, competitor];
    });
  }, []);

  /** Step 2: kick off the scan */
  const startScan = useCallback(async () => {
    setPhase("scanning");
    setProgress({ pct: 0, engine: null, msg: "Starting…" });

    try {
      const res = await runM1Scan(
        { url, competitors: selected },
        (p) => setProgress(p),
      );
      setResult(res);
      setPhase("results");
    } catch (err) {
      setError(err.message ?? "Scan failed");
      setPhase("failed");
    }
  }, [url, selected]);

  /** Reset everything back to the URL step */
  const reset = useCallback(() => {
    setPhase("url");
    setUrl("");
    setDomain("");
    setFaviconUrl(null);
    setMeta(null);
    setSuggestions([]);
    setSelected([]);
    setProgress({ pct: 0, engine: null, msg: "" });
    setResult(null);
    setError(null);
  }, []);

  return {
    // state
    phase, url, domain, faviconUrl, meta,
    suggestions, selected,
    progress, result, error,
    // actions
    confirmUrl, toggleCompetitor, startScan, reset,
  };
}
