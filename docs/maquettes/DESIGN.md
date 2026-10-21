---
name: Mobilo E-Commerce
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#434655'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#7f2500'
  on-tertiary: '#ffffff'
  tertiary-container: '#a73400'
  on-tertiary-container: '#ffc9b7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59c'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#832700'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  price-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  price-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 26px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system establishes a focused, hyper-legible e-commerce experience tailored for mobile hardware purchasing. Rooted in utility and structural minimalism, the interface deliberately eliminates visual noise—rejecting gradients, skeuomorphic textures, and carousel gimmicks in favor of crisp product presentation, immediate scannability, and straightforward checkout ergonomics.

Targeted at technology buyers seeking transparent product specifications and straightforward purchasing flows, the design evokes precision, efficiency, and engineering discipline. Visual architecture is expressed through strict grid alignments, intentional semantic contrast, and high-visibility keyboard focus treatments that guarantee absolute usability across standard web browsers and assistive tools alike. All microcopy, labels, and metadata are presented in French, with currency normalized to USD ($).

## Colors

The palette employs high-contrast, restrained neutrals counterbalanced by a deep technical blue accent. 

- **Primary Canvas & Surfaces**: The default canvas is pure white (`#FFFFFF`). Secondary structures, card backings, and structural wells utilize neutral off-white (`#F8FAFC`).
- **Brand & Action**: The primary action color (`#1D4ED8`) commands primary interactive elements, links, and selected states. Focus outlines strictly utilize `#2563EB` to guarantee WCAG AAA contrast ratios against white and off-white backings.
- **Structural Neutral & Text**: Slate dark gray (`#1E293B`) serves as primary copy, product titles, and high-emphasis labels. Subordinate metadata and secondary descriptions use slate mid-gray (`#475569`).
- **Borders & Dividers**: Subdued light slate (`#E2E8F0`) establishes spatial partition without heavy visual weight.
- **Feedback Accents**: Error states rely on `#DC2626`, success confirmation relies on `#16A34A`, and warning indicators rely on `#D97706`. None of these states employ gradients or saturated fills; they use solid glyphs, standard outlines, and tinted functional backgrounds.

## Typography

The design system implements `Inter` across all structural tiers (with `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` as zero-latency fallbacks). 

- **Hierarchy & Proportions**: Headings deploy tight negative letter tracking (`-0.01em` to `-0.02em`) to maintain editorial punch without sacrificing structural clarity.
- **Numbers & E-Commerce Metrics**: Price elements make use of `font-feature-settings: "cv05", "tnum"` (tabular figures) to guarantee precise vertical alignment within carts, checkout manifests, and comparison grids.
- **Accessibility & Scalability**: Text sizes never drop below `12px`. Line heights remain generous across all long-form specification descriptions (`1.5` to `1.6`) to maintain readability on high-DPI smartphone displays.

## Layout & Spacing

The layout philosophy adheres to a strict 12-column CSS Grid architecture on desktop displays, scaling to a 2-column or 1-column responsive Flexbox/Grid format on small viewports. Carousels and swipe sliders are strictly prohibited; multi-image listings and alternative phone angles are handled via structured thumbnail stacks or predictable multi-column gallery grids.

- **Breakpoints**:
  - `Mobile`: `< 640px` (Margin: `1rem`, Gutter: `1rem`, single-column product feed).
  - `Tablet`: `640px - 1024px` (Margin: `1.5rem`, Gutter: `1.25rem`, two-column product feed).
  - `Desktop`: `> 1024px` (Margin: `2rem`, Gutter: `1.5rem`, max content container width of `1200px` centered via `margin-inline: auto`, four-column product feed).
- **Rhythm Model**: Built upon a predictable 4px / 8px baseline rhythm. Component internal paddings match standard spacing tokens (`space-sm` for compact form tags, `space-md` for standard inputs, and `space-lg` for card bodies).

## Elevation & Depth

Visual hierarchy is communicated through structural layering and razor-thin perimeter boundaries rather than prominent drop shadows:

- **Low-Contrast Outlines**: Cards, containers, and table divisions rely on a crisp `1px solid #E2E8F0` border.
- **Background Layering**: Depth is reinforced using tonal shifts between `#FFFFFF` (the main card/interactive surface) and `#F8FAFC` (the body backdrop or inset specification panels).
- **Shadow Profile**: Where physical separation is required (such as sticky mobile navigation or open dropdown menus), use a single, minimal shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.08)`. Aggressive blurs and decorative colored glows are strictly forbidden.
- **Keyboard Focus Layering**: Active and focused elements receive a distinct `2px solid #2563EB` with an explicit `2px` white outline offset (`outline: 2px solid #2563EB; outline-offset: 2px;`), preserving accessibility without triggering layout shifts.

## Shapes

The design uses a clean, modern corner radius of `8px` (`0.5rem`) for standard interface cards, input containers, buttons, and preview panels. 

- **Interactive Nodes**: Buttons, input boxes, selection chips, and modals consistently adopt `border-radius: 8px`.
- **System Badges & Color Swatches**: Secondary status chips or memory-size filter tags take `border-radius: 6px` (`0.375rem`), maintaining visual harmony with parent card perimeters.
- **Full Circles**: Restrict `border-radius: 9999px` exclusively to circular phone color selector swatches (e.g., Titanium, Phantom Black) and user avatar placeholders.

## Components

### Buttons
- **Primary**: Solid `#1D4ED8` background, white text (`#FFFFFF`), `font-weight: 600`, minimum touch target of `44px` height. Hover transitions to `#1E40AF`.
- **Secondary**: Surface `#FFFFFF`, border `1px solid #E2E8F0`, text `#1E293B`. Hover transitions to `#F8FAFC` background and border `#CBD5E1`.
- **Accessibility**: All button variants define `:focus-visible { outline: 2px solid #2563EB; outline-offset: 2px; }`.

### Product Cards
- Built using standard Flexbox columns, with `background: #FFFFFF`, `border: 1px solid #E2E8F0`, and `border-radius: 8px`.
- Image wells sit atop the card with `background: #F8FAFC` and `padding: 1.5rem`. Images maintain natural aspect ratios with `object-fit: contain` to prevent phone stretching.
- Product titles utilize `headline-sm` with text truncation after two lines. Prices are emphasized via `price-md` in `#1E293B`, accompanied by tax-inclusive badges in French (e.g., "TVA incluse").

### Input Fields & Search
- Neutral state: `background: #FFFFFF`, `border: 1px solid #E2E8F0`, `border-radius: 8px`, `padding: 0.625rem 0.875rem`, text `#1E293B`, placeholder `#94A3B8`.
- Focus state: `border-color: #1D4ED8`, `outline: 2px solid #2563EB`, `outline-offset: 0`.

### Selection Chips & Filter Pills
- Used for hardware parameters (e.g., "128 Go", "256 Go", "5G", "Reconditionné").
- Unselected: `background: #F8FAFC`, `border: 1px solid #E2E8F0`, text `#475569`.
- Selected: `background: #EFF6FF`, `border: 1px solid #1D4ED8`, text `#1D4ED8`, `font-weight: 600`.

### Checkboxes & Radios
- Size: `18px x 18px`, `border: 1px solid #CBD5E1`, `border-radius: 4px` (checkbox) or `9999px` (radio).
- Checked: `background-color: #1D4ED8`, displaying a white tick or inner center circle.

### Product Specification Tables
- Clean key-value pairs formatted in plain HTML `<table>` or CSS grid rows.
- Alternating subtle rows with `background: #F8FAFC` against `#FFFFFF`, bordered bottom by `1px solid #E2E8F0`, with keys in `#475569` and technical values in `#1E293B` bold.

### Cart Line Items
- Horizontal flex structures containing product thumbnail (`64px x 64px`, rounded `6px`, light gray frame), title, quantity stepper (`- 1 +`), and unit price in `price-md`.
- Simple remove trigger styled with text link in `#DC2626` ("Supprimer").