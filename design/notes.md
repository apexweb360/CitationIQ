# CitationIQ Design References

## Inspiration Sites

### peec.ai — https://peec.ai/
**Use for:** UX workflow structure + gradient color palette

**Workflow structure to follow:**
1. Minimal nav (logo left, 2 CTAs right)
2. Hero — bold headline + subheadline + 2 CTAs (primary gradient, secondary ghost)
3. Product dashboard screenshot/animation floating below hero
4. Social proof logos strip (brands + agencies)
5. Feature walkthrough — tabbed or scroll-triggered sections with screenshots:
   - "Set up [X]" → "Use Data" → "Add Competitors" → "Choose Models" → "Find Sources" → "Act on Insights"
6. Metrics explainer (3-column: Visibility / Position / Sentiment → CitationIQ: Score / Rank / Gap)
7. Reports / exports section
8. Testimonials carousel
9. FAQ accordion
10. CTA footer with product screenshot behind gradient overlay

**Gradient palette (from peec.ai hero):**
- Primary gradient: cyan → purple → `linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)`
- Used on: headline accent words, CTA buttons, badge borders, score highlights
- Background stays very dark: #040c14 (keep CitationIQ's existing bg)
- Text stays: #e8edf2 (keep existing)

**Typography feel:** Large, bold, heavy-weight hero headlines. Gradient on key noun/verb. Clean sans-serif body.

---

### WiBiz — https://wibiz.com (screenshot saved)
**Use for:** Typography scale reference — the "Work Improvement / for Business." treatment
- Two-line hero: first line white, second line gradient italic
- Very large type, near-full-width on desktop

---

## CitationIQ Workflow HTML
**File:** `design/workflow.html`
**Status:** Base layout complete. Gradient colors to be applied.

**What's in it:**
- Dark theme (#040c14 bg, #00e5a0 green accent)
- Fonts: Space Mono (labels/mono) + DM Sans (body)
- Hero with domain input + Analyze CTA
- Score preview (6-card grid)
- 10 audit category cards
- 3 differentiator callouts
- 3-tier pricing (Free / Pro $49 / Agency $199)

**Gradient update:** Replace flat `#00e5a0` accents on hero headline em, badges, and score highlights with peec.ai-style cyan→purple gradient.
