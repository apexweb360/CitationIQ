/**
 * Code CIQ — CitationIQ Brand System
 * Source of truth for asset paths, colors, and gradients.
 * Import into components: import { CIQ_ASSETS, CIQ_GRADIENT } from '@/lib/brand'
 */

// ─── Colors ──────────────────────────────────────────────────────────────────

export const CIQ_COLORS = {
  background:    '#000000',
  white:         '#FFFFFF',
  gradientCyan:  '#00E5FF',
  gradientBlue:  '#3D6BFF',
  gradientPurple:'#A742FF',
  taglineKnow:   '#A8F0FF',   // "KNOW."
  taglineOutrank:'#A742FF',   // "OUTRANK."
}

// ─── Gradient ─────────────────────────────────────────────────────────────────

/** CSS gradient string — always L→R, never reversed */
export const CIQ_GRADIENT =
  `linear-gradient(to right, ${CIQ_COLORS.gradientCyan}, ${CIQ_COLORS.gradientBlue}, ${CIQ_COLORS.gradientPurple})`

// ─── Asset Paths (all relative to /public, served at root by Vite) ───────────

export const CIQ_ASSETS = {
  // Primary logo — full wordmark + tagline (PNG, drop SVG here when ready)
  logoFull:       '/brand/ciq-full.png',         // CIQ-FULL: "CitationIQ — Know. Compare. Outrank."

  // Icon-only mark (C + white IQ)
  icon:           '/brand/ciq-icon.png',         // CIQ-ICON
  iconSvg:        '/brand/ciq-icon.svg',         // SVG version (same mark)

  // Placeholder paths — drop files here when ready
  faviconC:       '/brand/ciq-fav-c.svg',        // CIQ-FAV-C: gradient C only
  faviconIQ:      '/brand/ciq-fav-iq.svg',       // CIQ-FAV-IQ: gradient IQ only
  appleTouch:     '/brand/ciq-apple-touch.png',  // 180×180

  // OG / social sharing
  ogImage:        '/brand/ciq-og.jpg',            // 1200×630

  // Social exports
  social: {
    instagram:    '/brand/social/ciq-ig.png',    // 1080×1080
    linkedin:     '/brand/social/ciq-li.png',    // 1200×627
    tiktok:       '/brand/social/ciq-tt.png',    // 1080×1080
    facebook:     '/brand/social/ciq-fb.png',    // 1200×630
    x:            '/brand/social/ciq-x.png',     // 400×400
  },
}

// ─── Usage guide ─────────────────────────────────────────────────────────────
// In a component:
//
//   import { CIQ_ASSETS } from '../lib/brand'
//
//   <img src={CIQ_ASSETS.logoFull} alt="CitationIQ" height={40} />
//   <img src={CIQ_ASSETS.icon}     alt="CitationIQ" width={32} />
//
// For gradient text, add className="ciq-gradient-text" (defined in globals.css)
