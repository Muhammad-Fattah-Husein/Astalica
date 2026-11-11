---
name: Astalica Haute Modesty
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#4e4639'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#7f7667'
  outline-variant: '#d1c5b4'
  surface-tint: '#775a19'
  primary: '#775a19'
  on-primary: '#ffffff'
  primary-container: '#c5a059'
  on-primary-container: '#4e3700'
  inverse-primary: '#e9c176'
  secondary: '#456553'
  on-secondary: '#ffffff'
  secondary-container: '#c4e8d1'
  on-secondary-container: '#496a57'
  tertiary: '#655e4d'
  on-tertiary: '#ffffff'
  tertiary-container: '#ada591'
  on-tertiary-container: '#403b2b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdea5'
  primary-fixed-dim: '#e9c176'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5d4201'
  secondary-fixed: '#c7ebd4'
  secondary-fixed-dim: '#abcfb8'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#2d4d3c'
  tertiary-fixed: '#ece2cc'
  tertiary-fixed-dim: '#cfc6b0'
  on-tertiary-fixed: '#201b0e'
  on-tertiary-fixed-variant: '#4c4636'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 68px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 38px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.01em
  display-md:
    fontFamily: Playfair Display
    fontSize: 44px
    fontWeight: '500'
    lineHeight: 54px
    letterSpacing: -0.01em
  display-md-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: 0em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 34px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses modest luxury with serene poise, graceful restraint, and modern Indonesian elegance. Designed for high-end modest fashion, it bridges haute couture refinement with everyday accessibility. 

The aesthetic is anchored in:
- **Minimalist Luxury**: Ample editorial whitespace, meticulous kerning, and architectural alignment.
- **Organic Warmth**: Soft champagne backgrounds, delicate tactile card layers, and lustrous gold metallic accents that avoid garish gloss.
- **Editorial Poise**: High-fashion typography contrasts pairing classic display serifs with ultra-legible, contemporary geometric sans-serifs.

The interface should evoke serenity, exclusivity, modesty, and trust, delivering an effortless digital atelier experience tailored for discerning modest fashion clientele.

## Colors

The color palette translates tactile textiles, silk weaves, and golden sunlight into a balanced digital canvas:

- **Primary (`#C5A059`) — Warm Satin Gold**: Used for hero key action highlights, delicate active indicators, subtle badges, and luxury framing accents.
- **Secondary (`#1B3B2B`) — Royal Forest Emerald**: Infuses deep contrast, grounded authority, and timeless modest elegance. Used for primary conversion CTA buttons, high-priority status chips, and brand emphasis.
- **Tertiary (`#E8DEC8`) — Sand Champagne**: Supplies subtle structure, delicate stroke borders, and surface dividers without visual harshness.
- **Neutral (`#1A1A1A`) — Soft Charcoal Noir**: Replaces stark pure black for body and title copy, maintaining readable, rich contrast against cream backdrops.
- **Surface Canvas (`#FDFBF7`) — Pearl Ivory**: The foundational background across all standard viewports, with `#F7F3EA` utilized for secondary container tiers.

### Functional Gradients
- **Gold Accent Sheen**: `linear-gradient(135deg, #DFC27D 0%, #C5A059 50%, #A8833E 100%)` for premium seals, hero badges, and promotional accent borders. Never applied to large body text containers.

## Typography

The type scale combines the high-fashion editorial presence of `Playfair Display` with the balanced, modern clarity of `Plus Jakarta Sans`.

- **Headlines & Editorial Titles**: `Playfair Display` handles editorial narratives, product names, banner headlines, and section introductions. Tracking is slightly tightened on larger display treatments to emulate printed high-fashion lookbooks.
- **Body & Functional UI**: `Plus Jakarta Sans` is strictly enforced for product specifications, checkout flows, pricing, reviews, and UI buttons.
- **Eyebrows & Luxury Badges**: Rendered in `label-sm` or `label-md` with uppercase styling and expanded letter spacing (`0.06em` - `0.08em`) for quiet elegance.

## Layout & Spacing

This design system adopts a 12-column responsive fluid grid with generous margins to preserve an airy, boutique atmosphere:

- **Desktop (≥1024px)**: 12 columns, `margin: 3rem`, `gutter: 1.5rem`, capped at a max-width of `1360px` centered canvas.
- **Tablet (768px – 1023px)**: 8 columns, `margin: 2rem`, `gutter: 1.25rem`.
- **Mobile (<768px)**: 4 columns, `margin-mobile: 1.25rem`, `gutter-mobile: 1rem`.

Elements must respect the internal padding hierarchy:
- Component containers and cards rely on `space-lg` to `space-xl` for breathing room.
- Interactive controls, inline badges, and input elements use `space-sm` to `space-md`.
- Vertical sections maintain at least `space-xl` * 2 between distinct merchandising stories.

## Elevation & Depth

Depth is established through low-contrast, warm-tinted ambient shadows paired with razor-thin champagne borders, rejecting aggressive artificial drops:

- **Surface Ground**: Ivory `#FDFBF7`.
- **Level 1 (Cards, Product Tiles)**: `#FFFFFF` or `#F7F3EA`, bordered by `1px solid #E8DEC8` with ambient shadow: `0px 4px 20px -2px rgba(27, 59, 43, 0.04)`.
- **Level 2 (Dropdowns, Quick Views, Flyout Cart)**: `#FFFFFF`, `1px solid #E8DEC8`, with shadow: `0px 12px 32px -4px rgba(26, 26, 26, 0.08)`.
- **Level 3 (Modals, Lookbook Viewers)**: Backdrop blur `blur(8px)` with semi-opaque scrim `rgba(26, 26, 26, 0.45)`, surfaced with shadow `0px 24px 48px -8px rgba(26, 26, 26, 0.12)`.

## Shapes

The design system maintains a refined, architectural curvature (`roundedness: 1`):
- Base interactive targets (inputs, secondary buttons, badges) use `0.25rem` (4px).
- Product cards, imagery tiles, lookbook showcases, and containers scale to `rounded-lg` (`0.5rem` / 8px).
- Curvature is kept intentionally restrained rather than pill-shaped to reinforce a structured, high-fashion aesthetic. 
- Circular geometry is exclusively reserved for floating action avatars, color swatch selectors, and close icon anchors.

## Components

### Buttons
- **Primary Luxury (Call to Action)**: Deep Emerald (`#1B3B2B`) background with pure ivory text (`#FDFBF7`), `roundedness: 1`, padded with `space-sm space-lg`. On hover, subtle tint elevation with `background-color: #2C533E`.
- **Secondary (Editorial / Exploration)**: Transparent background, `1px solid #C5A059`, warm gold text (`#C5A059`). Hover shifts to `#FDFBF7` with filled gold tint `rgba(197, 160, 89, 0.08)`.
- **Ghost Button**: Charcoal text, no borders, with an animated `1px` underline in Warm Gold appearing on hover.

### Product & Editorial Cards
- **Product Tiles**: Crisp white/cream background, `1px solid #E8DEC8`, subtle rounded corners (8px). 
- **Image Treatment**: Warm tonal ratio (4:5 vertical portrait aspect ratio for modest silhouettes).
- **Price & Swatch Area**: Clean sans-serif hierarchy; active color swatches framed in a dual concentric ring with a 1px gap.

### Inputs & Form Controls
- **Text Inputs**: Ivory surface (`#FDFBF7`), bottom border or full border in `#E8DEC8`, 4px radius. Focus state shifts border to `#C5A059` with a zero-offset focus ring of `rgba(197, 160, 89, 0.2)`. Label transitions smoothly from placeholder to floating eyebrow.
- **Checkboxes & Radios**: Emerald Green (`#1B3B2B`) active fill with Ivory check; inactive states feature a subtle `#E8DEC8` border.

### Badges & Chips
- **Curated Collections & Material Tags (Voile, Silk, Satin)**: Soft Ivory background, `1px solid #E8DEC8`, Charcoal text, `label-sm` with letter spacing `0.06em`.
- **Exclusive / Limited Edition**: Warm Gold Sheen gradient background with Dark Emerald (`#1B3B2B`) text.

### Hijab Fabric & Size Selectors
- **Fabric Picker Chips**: Rectangular tiles with subtle textile weave pattern previews, framed with a 1px `#E8DEC8` border that turns to a solid 1.5px `#C5A059` border when active.