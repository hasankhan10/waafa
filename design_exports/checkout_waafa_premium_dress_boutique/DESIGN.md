---
name: WAAFA Haute Aesthetic
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#5a4042'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#8e6f72'
  outline-variant: '#e2bec0'
  surface-tint: '#ba1342'
  primary: '#b60f40'
  on-primary: '#ffffff'
  primary-container: '#d93057'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb2b9'
  secondary: '#5a5d73'
  on-secondary: '#ffffff'
  secondary-container: '#dbdef8'
  on-secondary-container: '#5e6177'
  tertiary: '#854c47'
  on-tertiary: '#ffffff'
  tertiary-container: '#a1645e'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdadc'
  primary-fixed-dim: '#ffb2b9'
  on-primary-fixed: '#400010'
  on-primary-fixed-variant: '#91002f'
  secondary-fixed: '#dee1fa'
  secondary-fixed-dim: '#c2c5de'
  on-secondary-fixed: '#161b2d'
  on-secondary-fixed-variant: '#42465a'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#feb4ac'
  on-tertiary-fixed: '#360e0b'
  on-tertiary-fixed-variant: '#6c3833'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-xl:
    fontFamily: Noto Serif
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.15em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 2rem
  margin-x: 5vw
  section-gap: 8rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
---

## Brand & Style

The design system is anchored in the concept of "Digital Couture." It prioritizes an ultra-premium, ethereal experience that mirrors the hushed luxury of a high-end fashion boutique. The brand personality is sophisticated, vibrant yet controlled, and deeply feminine.

The visual style is a fusion of **Minimalism** and **Glassmorphism**. By using generous white space and architectural layouts, we allow the vibrant colors of the brand logo to act as atmospheric accents rather than overwhelming elements. This approach ensures that the "Elegance in each fabric" tagline is felt through the interface's lightness and precision. Subtle transitions and blurred gradient backgrounds create a sense of depth and movement, evoking the flow of premium textiles.

## Colors

The palette is built on a foundation of "Luxurious Neutrals" to allow product photography to remain the focal point.
- **Primary:** A sophisticated Magenta (#ED4064) derived from the logo, used for primary calls to action and key brand moments.
- **Secondary:** A deep, authoritative Charcoal Blue (#282C3F) used for typography and structural elements to provide "weight" and premium contrast.
- **Accents:** Vibrant Blue and Orange/Yellow gradients are used sparingly as "light leaks" or soft background blurs, mimicking the brand’s iconic "W" logo.
- **Backgrounds:** Use pure white (#FFFFFF) for the primary canvas, with very light gray transitions to define sections without the use of heavy lines.

## Typography

This design system utilizes a high-contrast typographic pairing to establish an editorial feel.
- **Headlines:** `notoSerif` is the voice of the brand. It should be used for all editorial headings, product names, and the tagline "Elegance in each fabric." Large scale and generous leading are essential for the "premium boutique" look.
- **Body & UI:** `manrope` provides a clean, modern, and highly legible counterpoint. Its geometric yet friendly nature ensures that functional information is easy to digest.
- **Micro-copy:** All labels and navigation items should use `manrope` in uppercase with increased letter spacing to evoke the feeling of luxury brand tags.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** with intentional asymmetry. The system relies on a 12-column grid but encourages "breaking the grid" for editorial sections to create a sense of movement. 

Whitespace is treated as a design element. Horizontal margins are wide (5vw) to create a "framed" gallery effect. Vertical spacing between sections is intentionally oversized (8rem) to allow the user to breathe and focus on one collection at a time. Elements should never feel crowded; if in doubt, increase the padding.

## Elevation & Depth

Depth in this design system is achieved through **Glassmorphism** and **Tonal Layers** rather than traditional shadows.
- **Surface Elevation:** Use semi-transparent white overlays (80-90% opacity) with a high backdrop-blur (20px-40px) for navigation bars and modal overlays.
- **Shadows:** When necessary, use "Ambient Shadows"—ultra-diffused, low-opacity (5-8%) shadows with a slight tint of the secondary color (#282C3F) to avoid a "muddy" look.
- **Depth Cues:** Use the brand's colorful gradients as soft, out-of-focus glows behind primary content cards to create a sense of luminosity.

## Shapes

The shape language is **Soft (1)**. This ensures a contemporary feel that is more approachable than sharp "Couture" edges but more sophisticated than "bubbly" consumer apps.
- **Base Corner Radius:** 0.25rem for small components like checkboxes and inputs.
- **Container Radius:** 0.5rem (rounded-lg) for product cards and buttons.
- **Media:** Product imagery should maintain sharp 0px corners to emphasize the architectural quality of the fabrics, while the UI elements surrounding them remain soft.

## Components

### Buttons
Primary buttons use a solid fill of the primary color (#ED4064) with white text. Secondary buttons are "Ghost" style—thin 1px borders in the secondary color with high letter-spaced uppercase text. Hover states should feature a subtle expansion of the button width or a soft gradient shift.

### Input Fields
Inputs should be minimalist, consisting of a single bottom border (1px) in a light gray. Upon focus, the border transitions to the primary magenta. Labels remain small and uppercase above the field.

### Product Cards
Cards are borderless with a clean white background. Information (Title, Price) is center-aligned using `notoSerif` for the title and `manrope` for the price. Use a subtle scale-up animation on the image when hovered.

### Navigation
The header is a persistent glassmorphic bar. Links are executed in `manrope` uppercase with a 1.5px underline that animates from the center on hover.

### Chips & Tags
Used for categories or sizes, these are pill-shaped with a very light tint of the primary color and dark text, ensuring they look like soft fabric labels.