// frontend/src/__tests__/smoke.test.js — CitationIQ Frontend Smoke Tests
// Run: cd frontend && npm test

import { describe, it, expect } from "vitest";

// ──────────────────────────────────────────────
// Audit request shape validation
// ──────────────────────────────────────────────

describe("AuditRequest shape", () => {
  const validPayload = {
    business_name: "Acme HVAC",
    website: "https://acmehvac.com",
    service_area: "Houston, TX",
    services: ["HVAC", "AC repair"],
    tier: "free",
  };

  it("has all required fields", () => {
    const required = ["business_name", "website", "service_area", "services", "tier"];
    required.forEach((field) => {
      expect(validPayload).toHaveProperty(field);
    });
  });

  it("services is a non-empty array", () => {
    expect(Array.isArray(validPayload.services)).toBe(true);
    expect(validPayload.services.length).toBeGreaterThan(0);
  });

  it("tier is one of the valid options", () => {
    const validTiers = ["free", "pro", "monitor"];
    expect(validTiers).toContain(validPayload.tier);
  });
});

// ──────────────────────────────────────────────
// Score display helpers
// ──────────────────────────────────────────────

describe("Score utilities", () => {
  const clampScore = (n) => Math.min(100, Math.max(0, Math.round(n)));

  it("clamps score below 0 to 0", () => {
    expect(clampScore(-10)).toBe(0);
  });

  it("clamps score above 100 to 100", () => {
    expect(clampScore(150)).toBe(100);
  });

  it("passes valid score through unchanged", () => {
    expect(clampScore(72)).toBe(72);
  });

  it("rounds fractional scores", () => {
    expect(clampScore(68.7)).toBe(69);
  });
});

// ──────────────────────────────────────────────
// Engine list
// ──────────────────────────────────────────────

describe("AI engines", () => {
  const ENGINES = ["chatgpt", "gemini", "perplexity", "claude"];

  it("includes all expected engines", () => {
    expect(ENGINES).toContain("chatgpt");
    expect(ENGINES).toContain("perplexity");
    expect(ENGINES).toContain("gemini");
  });

  it("has at least 3 engines for meaningful scoring", () => {
    expect(ENGINES.length).toBeGreaterThanOrEqual(3);
  });
});
