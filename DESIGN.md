# Design System Strategy: The Nurtured Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Sanctuary."** In an era of parenting apps that feel clinical or overwhelming, this system prioritizes a high-end editorial feel—reminiscent of a luxury coffee table book—blended with the warmth of a modern nursery. 

We break the "template" look by eschewing rigid, boxy layouts in favor of **Intentional Asymmetry**. Elements are allowed to breathe, often overlapping backgrounds or breaking the grid to create a sense of organic growth. This is not a "utility" app; it is a curated experience that values the parent's peace of mind as much as the data it provides.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the earth: soft creams (`surface`), terracotta (`primary`), and sage greens (`secondary`).

### The "No-Line" Rule
**Designers are strictly prohibited from using 1px solid borders to define sections.** Boundaries must be created through tonal shifts. A `surface-container-low` section should sit directly on a `background` without a stroke. This creates a soft, tactile transition that feels premium rather than digital.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper. 
- **Base Layer:** `surface` (#fcf9f0)
- **Content Blocks:** `surface-container` (#f1eee5)
- **Interactive Cards:** `surface-container-lowest` (#ffffff) to create a natural "pop" against the cream backgrounds.

### The "Glass & Gradient" Rule
To add soul, use the **Signature Glow**. Hero areas should utilize soft radial gradients transitioning from `primary` (#9b3f2b) to `primary-container` (#bb5640). Floating elements, like navigation bars or status overlays, should use **Glassmorphism**: semi-transparent `surface` colors with a 20px-30px backdrop blur to allow the warm background tones to bleed through.

---

## 3. Typography: The Editorial Balance
We pair the authoritative elegance of a serif with the approachable clarity of a geometric sans-serif.

- **Display & Headlines (`newsreader`):** Used for questions, big milestones, and section titles. These should be set with tighter letter-spacing and generous leading to feel like a high-end magazine.
- **Body & Titles (`manrope`):** Used for instructional text and inputs. The clean, modern lines of Manrope provide a functional counter-balance to the expressive Newsreader headers.
- **Labels (`manrope`):** Always in `label-md` or `label-sm`, providing a technical but legible layer for secondary metadata.

---

## 4. Elevation & Depth
Elevation is conveyed through **Tonal Layering** and physics-based light simulation rather than structural lines.

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural lift. 
- **Ambient Shadows:** When a card needs to "float" (e.g., selection cards), use a shadow with a blur of `32px` at `6%` opacity. The shadow color must be a tinted version of `on-surface` (#1c1c17), never pure black.
- **The "Ghost Border" Fallback:** If accessibility requires a border, use the `outline-variant` token at **15% opacity**. High-contrast, 100% opaque borders are forbidden.
- **Roundedness:** Lean into the `xl` (3rem) and `lg` (2rem) scale. Large radii communicate safety, softness, and "huggability."

---

## 5. Components

### Buttons
- **Primary:** Terracotta (`primary`) background with white (`on-primary`) text. Use `full` (9999px) roundedness for a pill shape that feels friendly and tactile.
- **Tertiary:** No background or border. Use `primary` text with a subtle `3.5` (1.2rem) padding for a "ghost" interaction state.

### Cards & Lists
- **Rule:** Forbid divider lines.
- **Separation:** Use vertical white space from the Spacing Scale (typically `6` or `8`) to separate list items. 
- **Tactile Cards:** Selection cards (e.g., "I'm expecting") should use a subtle background tint of the category color (e.g., `secondary_container` for green) and a soft ambient shadow on hover/selection.

### Input Fields & Pickers
- **Date Pickers:** As seen in the "Digital Sanctuary" philosophy, the date picker should float on a `surface-container-lowest` sheet. Selected states use a soft `secondary_container` (#d6eab5) pill with a blur, rather than a sharp box.
- **Inputs:** Use `surface-container-highest` for the input track to give it a recessed, "pressed" feel into the cream paper background.

### Custom Journey Trackers (Context Specific)
Given the parenting context, use a "Curated Timeline" component. Instead of a thin line, use a wide, soft-colored gradient bar at the top of the screen to indicate progress, echoing the "No-Line" rule.

---

## 6. Do's and Don'ts

### Do
- **Do** use intentional asymmetry. A card might be slightly offset or an illustration might "spill" out of its container.
- **Do** use the Spacing Scale religiously. Consistent white space is what makes the "No-Line" rule work.
- **Do** prioritize large, custom illustrations that use the earthy palette to maintain the "premium" feel.

### Don't
- **Don't** use pure black (#000000) for text. Always use `on-surface` (#1c1c17) to maintain the warm, organic feel.
- **Don't** use standard "Material Design" shadows. They are too harsh for this system.
- **Don't** cram information. If a screen feels busy, increase the spacing tokens and move secondary info to a nested `surface-container`.