const API_BASE = import.meta.env.VITE_API_URL ?? "/api/v1";

/**
 * Submits an audit request to the backend.
 * @param {Object} formData 
 * @returns {Promise<Object>} The submit status response with audit_id and progress.
 */
export async function submitAudit(formData) {
  const res = await fetch(`${API_BASE}/audit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? `Request failed: ${res.status}`);
  }

  return await res.json();
}

/**
 * Polls for the status/progress of a submitted audit.
 * @param {string} auditId 
 * @returns {Promise<Object>} The current status response of the audit.
 */
export async function pollAuditStatus(auditId) {
  const res = await fetch(`${API_BASE}/audit/${auditId}`);
  if (!res.ok) {
    throw new Error(`Poll failed: ${res.status}`);
  }
  return await res.json();
}
