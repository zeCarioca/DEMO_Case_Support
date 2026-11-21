---
version: alpha
name: Notion Analysis
description: Notion design language: warm paper-calm productivity system on off-white canvas, near-black Inter type, single blue action color, playful sticker palette.

colors:
  primary: "#0075de"
  primary-active: "#005bab"
  secondary: "#213183"
  on-primary: "#ffffff"
  canvas: "#ffffff"
  canvas-soft: "#f6f5f4"
  surface: "#ffffff"
  ink: "#000000"
  ink-secondary: "#31302e"
  ink-muted: "#615d59"
  ink-faint: "#a39e98"
  hairline: "#e6e6e6"
  accent-sky: "#62aef0"
  accent-purple: "#d6b6f6"
  accent-purple-deep: "#391c57"
  accent-pink: "#ff64c8"
  accent-orange: "#dd5b00"
  accent-orange-deep: "#793400"
  accent-teal: "#2a9d99"
  accent-green: "#1aae39"
  accent-brown: "#523410"

typography:
  display-1:
    fontFamily: NotionInter
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: -2.125px
  display-2:
    fontFamily: NotionInter
    fontSize: 54px
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: -1.875px
  heading-1:
    fontFamily: NotionInter
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -1px
  heading-2:
    fontFamily: NotionInter
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1.23
    letterSpacing: -0.625px
  heading-3:
    fontFamily: NotionInter
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.27
    letterSpacing: -0.25px
  title:
    fontFamily: NotionInter
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: -0.125px
  body-md:
    fontFamily: NotionInter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: NotionInter
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: 0
  button:
    fontFamily: NotionInter
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: NotionInter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  eyebrow:
    fontFamily: NotionInter
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: 0.125px

rounded:
  xs: 4px
  sm: 5px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 28px
  xxl: 32px

components:
  nav-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    padding: 16px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
  button-primary-pressed:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
  button-utility:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 4px 14px
  button-icon-circular:
    backgroundColor: "rgba(0, 0, 0, 0.05)"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  badge-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.full}"
    padding: 4px 8px
  feature-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  feature-card-elevated:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 24px
  pricing-plan-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 24px
  pricing-plan-card-featured:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 24px
  text-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xs}"
    padding: 6px
  hero-band:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.display-1}"
    padding: 32px
  footer:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.caption}"
    padding: 32px

  # ─── Examples (illustrative) — auto-derived; resolve any TO_FILL markers below ───
  ex-pricing-tier:
    description: "Default Pricing tier card. Re-uses feature-card chrome with brand canvas-soft surface."
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  ex-pricing-tier-featured:
    description: "Featured/highlighted tier — polarity-flipped surface (dark fill + light text in light mode, light fill + dark text in dark mode)."
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  ex-product-selector:
    description: "What's Included summary card — re-purposed for SaaS / B2B verticals (NOT a literal product gallery)."
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  ex-cart-drawer:
    description: "Subscription summary — re-purposed for SaaS / B2B (line items per add-on, not literal cart)."
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
    item-divider: "{colors.hairline}"
  ex-app-shell-row:
    description: "Sidebar nav row inside the App Shell example. Active state uses brand primary as the indicator."
    backgroundColor: "{colors.canvas}"
    activeIndicator: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm} {spacing.md}"
  ex-data-table-cell:
    description: "Default data-table th + td chrome. Header uses mono-caps eyebrow typography; body uses body-sm."
    headerBackground: "{colors.canvas-soft}"
    headerTypography: "{typography.eyebrow}"
    bodyTypography: "{typography.body-sm}"
    cellPadding: "{spacing.sm} {spacing.md}"
    rowBorder: "{colors.hairline}"
  ex-auth-form-card:
    description: "Sign-in / sign-up card. Re-uses feature-card chrome with text-input primitives inside."
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  ex-modal-card:
    description: "Modal dialog surface — same chrome as feature-card with elevated shadow."
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  ex-empty-state-card:
    description: "Empty-state illustration frame."
    backgroundColor: "{colors.canvas-soft}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xxl}"
    captionTypography: "{typography.body-md}"
  ex-toast:
    description: "Toast notification surface — feature-card shape + medium shadow."
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.sm} {spacing.md}"
    typography: "{typography.body-sm}"

---

## Overview

Notion design: organized desk in daylight. Dominant canvas: warm paper-soft off-white `{colors.canvas-soft}` (#f6f5f4), document calm over app glare. Type: `NotionInter` near-black `{colors.ink}` at heavy, tightly-tracked weights (`{typography.display-1}` −2.125px tracking at 64px). Single action color: Notion blue `{colors.primary}` (#0075de) for CTAs + links.

Brand personality carried by **multi-color sticker palette** (purple, pink, orange, teal, green, sky-blue) in illustrated blocks, app icons, category dots. Sticker colors decorate only, never structure layout or CTAs. Single exception to daylight: homepage hero inverts to deep indigo night band (`{colors.secondary}`) with white type + sticker constellations.

Surfaces use hairlines + faint layered shadows. Cards round at 12px (`{rounded.lg}`), marketing CTAs full-pill (`{rounded.full}`), utility buttons 8px (`{rounded.md}`).

**Key Characteristics:**
- Warm paper canvas `{colors.canvas-soft}` over pure white.
- Near-black `{colors.ink}` `NotionInter` type, tight display tracking (`{typography.display-1}`).
- Single structural accent: Notion blue `{colors.primary}` for CTAs + links.
- Decorative sticker palette (`{colors.accent-purple}`, `{colors.accent-pink}`, `{colors.accent-orange}`, `{colors.accent-teal}`, `{colors.accent-green}`, `{colors.accent-sky}`).
- Pill marketing CTAs (`{rounded.full}`) vs 8px utility buttons (`{rounded.md}`).
- Elevation via hairline + faint layered shadow.
- Dark indigo hero band (`{colors.secondary}`).

## Colors

### Brand & Accent
- **Notion Blue** (`{colors.primary}` — #0075de): primary CTA fill ("Get Notion free"), inline links, active/focus. Only action color.
- **Pressed Blue** (`{colors.primary-active}` — #005bab): pressed CTA state.
- **Deep Indigo** (`{colors.secondary}` — #213183): dark hero band background, inverted sections.

Decorative sticker palette (illustrated blocks, icon stickers, category dots only; no CTAs or structural fills):
- **Sticker Sky** (`{colors.accent-sky}` — #62aef0)
- **Sticker Purple** (`{colors.accent-purple}` — #d6b6f6) / **Deep Purple** (`{colors.accent-purple-deep}` — #391c57)
- **Sticker Pink** (`{colors.accent-pink}` — #ff64c8)
- **Sticker Orange** (`{colors.accent-orange}` — #dd5b00) / **Deep Orange** (`{colors.accent-orange-deep}` — #793400)
- **Sticker Teal** (`{colors.accent-teal}` — #2a9d99)
- **Sticker Green** (`{colors.accent-green}` — #1aae39)
- **Sticker Brown** (`{colors.accent-brown}` — #523410)

### Surface
- **White** (`{colors.canvas}` / `{colors.surface}` — #ffffff): cards, panels, nav, form fields.
- **Warm Paper** (`{colors.canvas-soft}` — #f6f5f4): page canvas + footer.
- **Hairline** (`{colors.hairline}` — #e6e6e6): 1px borders + dividers.

### Text
- **Ink** (`{colors.ink}` — #000000): primary headings + body (~95% alpha).
- **Warm Charcoal** (`{colors.ink-secondary}` — #31302e): secondary body + footer.
- **Stone** (`{colors.ink-muted}` — #615d59): supporting text.
- **Ash** (`{colors.ink-faint}` — #a39e98): captions, metadata, placeholders.

### Semantic
No dedicated error/success palette in chrome. Status carried by sticker palette (e.g. `{colors.accent-green}` ticks).

## Typography

### Font Family
Single family: **`NotionInter`** (tuned Inter cut). Fallback: `Inter, -apple-system, system-ui, "Segoe UI", Helvetica, Arial`. OpenType `lnum` + `locl` enabled.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-1}` | 64px | 700 | 1.0 | −2.125px | Hero headline ("Meet the night shift") |
| `{typography.display-2}` | 54px | 700 | 1.04 | −1.875px | Large section headlines |
| `{typography.heading-1}` | 40px | 700 | 1.1 | −1px | Section headlines ("Plans and features") |
| `{typography.heading-2}` | 26px | 700 | 1.23 | −0.625px | Sub-section headings |
| `{typography.heading-3}` | 22px | 700 | 1.27 | −0.25px | Card titles |
| `{typography.title}` | 20px | 600 | 1.4 | −0.125px | Feature titles, callouts |
| `{typography.body-md}` | 16px | 400 | 1.5 | 0 | Default body copy |
| `{typography.body-sm}` | 15px | 400 | 1.33 | 0 | Dense body, table rows, nav |
| `{typography.button}` | 16px | 500 | 1.5 | 0 | Button labels |
| `{typography.caption}` | 14px | 400 | 1.43 | 0 | Captions, footnotes |
| `{typography.eyebrow}` | 12px | 600 | 1.33 | +0.125px | Pill badges, small labels |

### Principles
Type voice: tight, heavy, quiet-confident. Headlines: weight 700, aggressive negative tracking. Body: 1.5 line-height, weight 400. High contrast between 700 headline and 400 body drives hierarchy.

### Note on Font Substitutes
Substitute open-source **Inter** directly. Apply negative tracking from table explicitly.

## Layout

### Spacing System
- Base unit: 8px.
- Tokens: `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 28px · `{spacing.xxl}` 32px.
- Card padding: `{spacing.lg}` (24px); utility buttons: 4px/14px; forms: 6px.

### Grid & Container
Centered column (1080–1300px desktop) with generous gutters. Feature sections: full-width text or 2-up/3-up card grids. Pricing: 4-column plan table. Hero: full-bleed.

### Whitespace Philosophy
Whitespace groups content. Large vertical gaps separate sections; hairline borders frame cards on warm canvas. Document-like, airy.

### Responsive Strategy

#### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| Wide | 1440px+ | Full multi-column grids, widest container |
| Desktop | 1080–1300px | Standard centered container, 3-up grids |
| Tablet | 768–840px | 2-up grids, condensed nav |
| Mobile | ≤600px | Single-column stacks, hamburger nav, full-width CTAs |

#### Touch Targets
44×44px minimum hit area on mobile.

#### Collapsing Strategy
Nav collapses to hamburger below tablet. Grids stack to single column. Pricing reflows to stacked cards.

#### Image Behavior
Screenshots in `{rounded.lg}` frames, scale fluidly. Stickers: fixed-scale decorative assets.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | Hairline border `{colors.hairline}`, no shadow | Default cards on warm canvas |
| 1 — Soft | Micro-shadow: `rgba(0,0,0,0.01) 0 0.175px 1.041px`, `0.02 0 0.8px 2.925px`, `0.027 0 2.025px 7.847px`, `0.04 0 4px 18px` | Raised feature cards, floating buttons |
| 2 — Elevated | 5-stop stack ending in `rgba(0,0,0,0.05) 0 23px 52px` | Modals, popovers, elevated hero pill |

Shadows built from multi-stop faint layers. Most cards use hairline only.

### Decorative Depth
Depth via illustration: night hero (`{colors.secondary}`) starfield + glowing stickers, color-blocked illustration tiles on white cards.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Form fields, small tags, inline chips |
| `{rounded.sm}` | 5px | Menu items, list rows, status pills |
| `{rounded.md}` | 8px | Utility / nav buttons, smaller cards |
| `{rounded.lg}` | 12px | Feature cards, illustration frames, tiles |
| `{rounded.xl}` | 16px | Large containers, image wells |
| `{rounded.full}` | 9999px | Marketing pill CTAs, badges, circular buttons |

### Photography Geometry
Screenshots framed in `{rounded.lg}` / `{rounded.xl}` wells, hairline edge. Illustration tiles use color-blocked header bands. Avatars/stickers small, often circular (`{rounded.full}`).

## Components

### Navigation
**`nav-bar`** — Top nav. White surface `{colors.canvas}`, `{colors.ink}` text at `{typography.body-sm}`, padding `{spacing.md}`. Sticky bar: wordmark left, links center, login + `button-utility` CTA right. Hamburger below tablet.

### Buttons
**`button-primary`** — Primary CTA ("Get Notion free"). Background `{colors.primary}`, text `{colors.on-primary}`, `{typography.button}`, pill `{rounded.full}`. Single blue action per page. Press: `button-primary-pressed` + `scale(0.9)`.

**`button-primary-pressed`** — Background `{colors.primary-active}`, text `{colors.on-primary}`.

**`button-secondary`** — Secondary CTA ("Request a demo"). Surface `{colors.surface}`, text `{colors.ink}`, `{typography.button}`, pill `{rounded.full}`, Level-1 shadow. Pairs beside primary in hero.

**`button-utility`** — Nav / plan-select button. Surface `{colors.surface}`, text `{colors.ink}`, `{typography.button}`, `{rounded.md}` (8px), padding `4px 14px`, 1px `{colors.hairline}`.

**`button-icon-circular`** — Media control. Circular `{rounded.full}`, `rgba(0,0,0,0.05)` fill, `{colors.on-primary}` icon, `scale(0.9)` press.

### Cards & Containers
**`feature-card`** — Surface `{colors.surface}`, `{colors.ink}` text, `{typography.body-md}`, `{rounded.lg}` (12px), padding `{spacing.lg}` (24px). Optional color-blocked sticker header. Flat elevation (hairline).

**`feature-card-elevated`** — Same chrome as `feature-card` + Level-1 shadow for floating cards.

**`pricing-plan-card`** — Surface `{colors.surface}`, `{colors.ink}` text, `{typography.body-sm}`, `{rounded.md}` (8px), padding `{spacing.lg}`. Price + checklist + `button-utility`.

**`pricing-plan-card-featured`** — Recommended tier. Warm `{colors.canvas-soft}` fill, `{rounded.md}`, surface tint distinction.

### Inputs & Forms
**`text-input`** — Surface `{colors.surface}`, `{colors.ink}`, `{typography.body-sm}`, 1px border `rgb(221,221,221)`, `{rounded.xs}` (4px), padding `6px`. Focus: Level-1 shadow.

### Signature Components
**`hero-band`** — Dark night hero. Full-bleed `{colors.secondary}` band, `{typography.display-1}` white headline, sticker starfield, `button-primary` + `button-secondary` pair. Single inverted section.

**`badge-pill`** — Category/eyebrow pill. Surface `{colors.surface}`, `{colors.primary}` text, `{typography.eyebrow}` (12px / 600), pill `{rounded.full}`, padding `4px 8px`.

**`footer`** — Warm `{colors.canvas-soft}` band, `{colors.ink-secondary}` at `{typography.caption}`, padding `{spacing.xxl}`. Multi-column directory.

### Examples (illustrative)
- **`ex-pricing-tier`**: Pricing tier card on `{colors.canvas-soft}`.
- **`ex-pricing-tier-featured`**: Featured tier with inverted surface.
- **`ex-product-selector`**: What's Included summary card for SaaS/B2B.
- **`ex-cart-drawer`**: Subscription line items summary.
- **`ex-app-shell-row`**: Sidebar nav row with `{colors.primary}` indicator.
- **`ex-data-table-cell`**: Table header (`{colors.canvas-soft}`, `{typography.eyebrow}`) + body (`{typography.body-sm}`).
- **`ex-auth-form-card`**: Sign-in/up card with text-input primitives.
- **`ex-modal-card`**: Modal dialog + Level-2 shadow.
- **`ex-empty-state-card`**: Empty-state illustration frame.
- **`ex-toast`**: Toast notification + medium shadow.

## Do's and Don'ts

### Do
- Reserve `{colors.primary}` for primary action, inline links, active/focus signal.
- Keep page on warm `{colors.canvas-soft}` canvas; use pure white `{colors.surface}` for cards/fields.
- Restrict sticker palette (`{colors.accent-pink}`, `{colors.accent-teal}`, `{colors.accent-orange}`, …) to illustrations, icon tiles, dots.
- Set headlines in heavy `{typography.display-1}`/`{typography.heading-1}` with negative tracking.
- Use pill `{rounded.full}` for marketing CTAs and `{rounded.md}` for utility buttons.
- Define surfaces with `{colors.hairline}` + Level-1 shadow, not heavy drop-shadows.
- Limit deep indigo `{colors.secondary}` to single hero moment.

### Don't
- Don't paint CTAs or structural fills in sticker palette colors.
- Don't introduce second structural accent alongside `{colors.primary}`.
- Don't use pill `{rounded.full}` on form fields; keep `{rounded.xs}` (4px).
- Don't use heavy shadows.
- Don't set body copy in heavy weights; keep 400.
- Don't use clinical pure white for full pages; warm `{colors.canvas-soft}` is core.
