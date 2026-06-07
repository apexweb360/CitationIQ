import { useState, useRef, useCallback } from "react";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api/v1";
const POLL_INTERVAL_MS = 2000;

/**
 * useAudit — manages the full audit lifecycle.
 *
 * Returns:
 *   submit(formData)  → kicks off POST /audit, starts polling
 *   reset()           → clears state back to idle
 *   phase             → "idle" | "submitting" | "running" | "complete" | "failed"
 *   progress          → 0–100
 *   result            → AuditResult | null
 *   error             → string | null
 */
export function useAudit() {
  const [phase, setPhase]       = useState("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState(null);
  const pollRef = useRef(null);

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  const poll = useCallback(async (auditId) => {
    try {
      const res = await fetch(`${API_BASE}/audit/${auditId}`);
      if (!res.ok) throw new Error(`Poll failed: ${res.status}`);
      const data = await res.json();

      setProgress(data.progress ?? 0);

      if (data.status === "complete") {
        stopPolling();
        setResult(data.result);
        setPhase("complete");
      } else if (data.status === "failed") {
        stopPolling();
        setError("Audit failed. Check your API keys and try again.");
        setPhase("failed");
      }
    } catch (err) {
      stopPolling();
      setError(err.message);
      setPhase("failed");
    }
  }, []);

  const submit = useCallback(async (formData) => {
    setPhase("submitting");
    setProgress(0);
    setResult(null);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/audit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail ?? `Request failed: ${res.status}`);
      }

      const { audit_id } = await res.json();
      setPhase("running");

      // Start polling immediately, then every POLL_INTERVAL_MS
      poll(audit_id);
      pollRef.current = setInterval(() => poll(audit_id), POLL_INTERVAL_MS);
    } catch (err) {
      setError(err.message);
      setPhase("failed");
    }
  }, [poll]);

  const reset = useCallback(() => {
    stopPolling();
    setPhase("idle");
    setProgress(0);
    setResult(null);
    setError(null);
  }, []);

  return { submit, reset, phase, progress, result, error };
}
