/**
 * Stratena — Brand System
 * Source of truth for asset paths, colors, and gradients.
 * Import into components: import { STRATENA_ASSETS, STRATENA_GRADIENT } from '@/lib/brand'
 */

// ─── Colors ──────────────────────────────────────────────────────────────────

export const STRATENA_COLORS = {
  background:    '#000000',
  white:         '#FFFFFF',
  gradientCyan:  '#00E5FF',
  gradientBlue:  '#3D6BFF',
  gradientPurple:'#A742FF',
  taglineKnow:   '#A8F0FF',
  taglineWin:    '#A742FF',
}

// ─── Gradient ─────────────────────────────────────────────────────────────────

/** CSS gradient string — always L→R, never reversed */
export const STRATENA_GRADIENT =
  `linear-gradient(to right, ${STRATENA_COLORS.gradientCyan}, ${STRATENA_COLORS.gradientBlue}, ${STRATENA_COLORS.gradientPurple})`

// ─── Asset Paths (all relative to /public, served at root by Vite) ───────────

export const STRATENA_ASSETS = {
  // Primary logo — full wordmark
  logoFull:       '/brand/stratena-full.png',

  // Icon-only mark
  icon:           '/brand/stratena-icon.png',
  iconSvg:        '/brand/stratena-icon.svg',

  // Favicons
  faviconSvg:     '/brand/stratena-fav.svg',
  favicon32:      '/brand/stratena-fav-32.png',
  appleTouch:     '/brand/stratena-apple-touch.png',

  // OG / social sharing
  ogImage:        '/brand/stratena-og.png',

  // Social exports
  social: {
    instagram:    '/brand/social/stratena-ig.png',
    linkedin:     '/brand/social/stratena-li.png',
    tiktok:       '/brand/social/stratena-tt.png',
    facebook:     '/brand/social/stratena-fb.png',
    x:            '/brand/social/stratena-x.png',
  },
}

// ─── Legacy aliases (remove once all imports are updated) ────────────────────
export const CIQ_ASSETS   = STRATENA_ASSETS
export const CIQ_GRADIENT = STRATENA_GRADIENT
export const CIQ_COLORS   = STRATENA_COLORS

// ─── Usage guide ─────────────────────────────────────────────────────────────
//
//   import { STRATENA_ASSETS } from '../lib/brand'
//
//   <img src={STRATENA_ASSETS.logoFull} alt="Stratena" height={40} />
//   <img src={STRATENA_ASSETS.icon}     alt="Stratena" width={32} />
//
// For gradient text, add className="stratena-gradient-text" (defined in globals.css)
