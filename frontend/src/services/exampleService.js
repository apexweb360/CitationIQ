// services/exampleService.js — All fetch() calls live here. Never in components.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export async function fetchExample() {
  try {
    const res = await fetch(`${API_BASE}/example`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: 'hello' })
    })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return res.json()
  } catch (e) {
    throw new Error(`fetchExample failed: ${e.message}`)
  }
}
