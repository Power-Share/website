# Power Share FlexCo — Design Principles

## Brand Identity

**Power Share FlexCo** makes energy visible, shareable, and valuable for households and communities. The design communicates trust, clarity, and empowerment — never complexity.

### Logo: "Power Venn"

Two overlapping circles with an amber lightning bolt at the intersection.

- **Left circle** (teal-dark → teal): represents the individual household
- **Right circle** (teal → teal-light): represents the community/grid
- **Intersection**: where sharing happens — the bolt = energy exchanged
- **Flow arrows**: bidirectional, energy goes both ways
- **Concept**: a Venn diagram — where communities overlap, power is shared

**Logo variants:**
- `logo-mark.svg` — standalone mark, transparent background
- `logo-mark-dark-bg.svg` — mark on navy rounded rectangle (avatars, favicons)
- Full lockup: mark + "POWER SHARE" (extrabold, tight tracking) + "FLEXCO" (medium, wide tracking, teal)

**Clear space:** minimum 50% of mark width on all sides.

---

## Color System

### Brand Colors (constant in both modes)
| Token | Hex | Role |
|-------|-----|------|
| `teal` | `#0ABAB5` | Primary. CTAs, links, active states, energy flow lines |
| `teal-light` | `#3DD4CF` | Hover accents, right-side gradients |
| `teal-dark` | `#089E9A` | Pressed states, left-side gradients |
| `amber` | `#F5A623` | Solar/generation, lightning bolt, star ratings |
| `green` | `#34C759` | Success, battery status, live indicators |
| `coral` | `#FF6B6B` | Error, high consumption, alerts |

### Light Mode
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#FFFFFF` | Page background |
| `bg-secondary` | `#F8FAFB` | Alternating sections, card groups |
| `bg-surface` | `#FFFFFF` | Cards, panels, inputs |
| `text-primary` | `#111827` | Headlines, primary content |
| `text-secondary` | `#4B5563` | Body text, descriptions |
| `text-muted` | `#9CA3AF` | Labels, metadata, placeholders |
| `border` | `#E5E7EB` | Dividers, input borders |

### Dark Mode
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#0F1219` | Page background |
| `bg-secondary` | `#161B26` | Alternating sections |
| `bg-surface` | `#1A2332` | Cards, panels, inputs |
| `text-primary` | `#F3F4F6` | Headlines, primary content |
| `text-secondary` | `#D1D5DB` | Body text, descriptions |
| `text-muted` | `#6B7280` | Labels, metadata |
| `border` | `rgba(255,255,255,0.1)` | Dividers, input borders |

### Rules
- Brand colors (teal, amber, green, coral) stay **identical** in both modes — they're designed to work on both light and dark backgrounds.
- Teal on white: use `teal` (#0ABAB5). Teal on navy: same `teal` — sufficient contrast.
- Never use `navy` as text color in dark mode. Use `text-primary` tokens.
- The dashboard preview widget always uses navy background regardless of mode.

---

## Typography

**Font stack:** Inter (sans-serif), JetBrains Mono (monospace for data/metrics)

### Scale
| Name | Size | Weight | Use |
|------|------|--------|-----|
| Hero | clamp(2.25rem, 5vw, 3.75rem) | 700 | Page hero headlines |
| H2 | clamp(1.875rem, 3vw, 2.25rem) | 700 | Section titles |
| H3 | 1.25rem | 700 | Card titles, step names |
| Body Large | 1.125rem | 400 | Hero subtitles, lead paragraphs |
| Body | 1rem | 400 | Default body text |
| Small | 0.875rem | 400 | Card descriptions, form labels |
| Caption | 0.75rem | 500 | Dashboard labels, stat labels |
| Label | 0.625rem | 500, uppercase, tracked | Section badges, tiny labels |
| Mono Data | 0.875rem, mono | 500 | kWh readings, percentages, API data |

### Wordmark
- **POWER SHARE**: 17px, weight 800, tracking -0.025em, uppercase
- **FLEXCO**: 10px, weight 500, tracking 0.25em, teal color, uppercase

---

## Layout & Spacing

- **Max container width:** 80rem (1280px)
- **Container padding:** 1.5rem (24px) on each side
- **Section vertical padding:** 6rem (96px)
- **Card padding:** 2rem (32px)
- **Grid gaps:** 0.5rem / 1rem / 2rem / 3rem

---

## Components

### Buttons
- **Primary:** `bg-teal text-white`, full rounded (`border-radius: 9999px`), `px-7 py-3`, font-semibold
- **Ghost:** `border-2 border-teal text-teal`, full rounded, same padding. Hover: fill teal.
- **Text link:** `text-teal font-semibold`, with `→` arrow on hover

### Cards
- `border-radius: 1rem`, `bg-surface`, subtle shadow (`shadow-sm`)
- Hover: `shadow-md` transition
- Top accent border (4px) in brand color for feature cards
- Dark mode: `bg-navy-light`, `border-white/10`

### Inputs
- `border-radius: 0.5rem`, `border border-gray-300` / `dark:border-white/10`
- `px-4 py-3`, placeholder in `text-muted`
- Focus: `ring-2 ring-teal/40 border-teal`

### Dashboard Preview (widget)
- Always on `bg-navy` regardless of page theme
- Rounded 2xl, shadow-2xl, subtle glow behind (`bg-teal/10 blur-2xl`)
- Slight rotation (2deg) for dynamic feel
- Chart: SVG area chart with amber production fill, teal consumption line
- Stat pills: `bg-navy-light rounded-lg`, small text

---

## Animation

### Scroll reveals (Framer Motion)
- `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
- Duration: 0.5–0.6s
- Stagger: 0.1–0.15s between siblings
- Trigger: `useInView({ once: true })`

### Transitions
- Colors/borders: `transition-colors duration-300`
- Shadows: `transition-shadow`
- Transforms: `transition-transform`

### Energy-specific
- **Pulse:** Live indicator dots — `opacity 0.4→1→0.4, 2s ease-in-out infinite`
- **Flow dash:** Energy flow lines — `stroke-dashoffset -40, 2s linear infinite`
- **Count up:** Stats — requestAnimationFrame with cubic easing over 2s

---

## HEMS UI Application Notes

When applying this design system to the HEMS (Home Energy Management System) UI:

1. **Dashboard backgrounds** should always be `navy` / `navy-light` — even in light mode. This creates a clear visual distinction between "your data" (dark, focused) and "marketing content" (light, open).

2. **Energy data** uses the semantic color mapping:
   - Solar generation → `amber`
   - Battery state → `green`
   - Grid import → `teal`
   - Consumption → `coral` (when high) or `text-secondary` (when normal)
   - Flexibility shared → `teal-light`

3. **Real-time indicators** use the `energy-pulse` animation on a `green` dot.

4. **Charts** follow the website's dashboard preview pattern:
   - Area fill for production (amber, 30% opacity gradient to transparent)
   - Dashed line for consumption (teal)
   - Grid lines at 6% white opacity
   - Axis labels in `text-muted`

5. **Numeric readouts** use `font-mono` with `font-medium`.

6. **The logo mark** works as an app icon at 1024px, 512px, 192px, 48px. Use `logo-mark-dark-bg.svg` for app icons.
