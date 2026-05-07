```markdown
# High-End Editorial Administrative Design System

## 1. Overview & Creative North Star
**Creative North Star: The Digital Atelier**
The administrative interface of this design system is not a "utility tool"—it is a curated workspace. We move away from the cluttered, line-heavy density of traditional SaaS dashboards and toward a "High-End Editorial" experience. Think of it as a luxury fashion house’s ledger: precise, spacious, and authoritative. 

The design breaks the "template" look through **intentional asymmetry** (e.g., wide margins on the left, condensed actions on the right) and **tonal depth**. We treat data as content and management as curation.

---

## 2. Colors & Surface Logic
The palette is rooted in a warm, "fine-paper" base (`#fbf9f8`) with a high-fashion accent (`#b60f40`).

### The "No-Line" Rule
**Strict Mandate:** Prohibit the use of 1px solid borders for sectioning. 
Structure must be defined through:
- **Background Shifts:** Use `surface-container-low` to define a workspace against the `surface` background.
- **Tonal Nesting:** Use the `surface-container` hierarchy (Lowest to Highest) to create physical layers. For example, an order summary card (`surface-container-lowest`) sits on a management grid (`surface-container-low`).

### Glass & Gradient Rule
Floating elements (modals, dropdowns, or hovering navigation) must use **Glassmorphism**.
- **Token:** Use `surface` at 80% opacity with a `20px` backdrop-blur. 
- **Signature Texture:** Apply a subtle linear gradient to primary action buttons, transitioning from `primary` (#b60f40) to `primary-container` (#d93057) at a 45-degree angle. This adds a "silk-like" sheen that flat colors lack.

---

## 3. Typography
We use a high-contrast pairing to balance heritage with modern efficiency.

- **Display & Headlines (Noto Serif):** Used for page titles and high-level metrics. It conveys authority and "Haute" heritage.
- **Functional UI (Inter):** Used for navigation, data points, and labels. The neutral, geometric nature of Inter ensures legibility in complex tables.
- **The Editorial Scale:**
    - **Page Titles:** `headline-lg` (Noto Serif) with generous bottom margin.
    - **Data Points:** `title-lg` (Inter) for large numbers, paired with `label-md` (Inter, All Caps) for descriptions.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are too "digital." We use **Ambient Layering**.

- **The Layering Principle:** Place `surface-container-lowest` (pure white/highest brightness) elements on top of `surface-container-low` to create a soft "lift."
- **Ambient Shadows:** For floating panels, use a shadow with a 40px blur, 0% spread, and 4% opacity, tinted with the `on-surface` color.
- **The "Ghost Border":** If accessibility requires a container boundary, use `outline-variant` at **15% opacity**. Never use a 100% opaque border.

---

## 5. Administrative Components

### Sidebar Navigation (The Vertical Gallery)
The sidebar is not a drawer; it is a fixed architectural element.
- **Background:** `surface-container-low`.
- **Active State:** No "active" background block. Instead, use a `primary` color change for the text and a subtle 2px vertical "needle" indicator on the far left.
- **Typography:** `title-sm` (Inter) with high letter spacing (0.05em).

### Complex Data Tables (The Ledger)
- **Header:** `label-md` (Inter, Uppercase, 60% opacity). No background color for the header row.
- **Rows:** Minimum height of 72px. No horizontal dividers. Use vertical white space to separate entries.
- **Hover State:** Transition the row background to `surface-container-high`.
- **Typography:** Product names in `title-sm` (Inter, Semi-bold); prices or SKUs in `body-md` (Inter, Monospaced-style tracking).

### Data Visualization (Bespoke Analytics)
Avoid generic chart libraries.
- **Sparklines:** Ultra-thin (1.5px) lines using `primary`. Use a subtle gradient fill below the line (from `primary` at 10% opacity to 0%).
- **Donut Charts:** Use a high "inner-radius" (thin rings) to maintain airiness.
- **Palette:**
    - Positive/Growth: `tertiary` (#006a3b).
    - Neutral/Steady: `secondary` (#5f5e5e).
    - Alert/Urgent: `primary` (#b60f40).

### Status Badges (The Signature Marker)
Do not use "pill" shapes with heavy backgrounds.
- **Style:** Small, square-cornered labels (`rounded-none` or `sm`).
- **Coloring:** Use a "tone-on-tone" approach. A `tertiary-container` background with `on-tertiary-fixed-variant` text.
- **Typography:** `label-sm` (Inter, Bold, Uppercase).

### Form Elements (Product Management)
- **Input Fields:** Bottom-border only (`outline-variant` at 30% opacity). On focus, the border transitions to `primary`.
- **Labels:** `label-md` floating above the input, always visible.
- **Buttons:**
    - **Primary:** Gradient-filled, `rounded-sm`, `title-sm` text.
    - **Secondary:** Transparent with a "Ghost Border" (15% opacity).

---

## 6. Do's and Don'ts

### Do
- **Do** use `surface-dim` for empty states to create a sense of "quiet" in the UI.
- **Do** treat "Low Stock" or "Error" states with the `primary` color, but use it sparingly to maintain its impact.
- **Do** allow for "Hero Metrics"—large Noto Serif numbers that give the user an immediate editorial summary of their business.

### Don't
- **Don't** use standard 8px or 12px border radii. Keep it sharp (`sm` or `none`) for a more sophisticated, architectural feel.
- **Don't** use zebra-striping in tables. Use generous padding and typography to guide the eye.
- **Don't** use pure black (#000) for text. Use `on-surface` (#1b1c1b) to maintain the soft, premium contrast against the off-white background.