import { useState, useRef, useCallback } from "react";
import { submitAudit, pollAuditStatus } from "../services/auditService";

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
      const data = await pollAuditStatus(auditId);

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
      const { audit_id } = await submitAudit(formData);
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

