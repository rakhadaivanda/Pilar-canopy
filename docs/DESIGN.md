---
name: Tensile Structural Editorial
colors:
  surface: '#fcf9f3'
  surface-dim: '#dcdad4'
  surface-bright: '#fcf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ed'
  surface-container: '#f0eee8'
  surface-container-high: '#ebe8e2'
  surface-container-highest: '#e5e2dc'
  on-surface: '#1c1c18'
  on-surface-variant: '#444843'
  inverse-surface: '#31312d'
  inverse-on-surface: '#f3f0ea'
  outline: '#747873'
  outline-variant: '#c4c7c1'
  surface-tint: '#586158'
  primary: '#0f1610'
  on-primary: '#ffffff'
  primary-container: '#232b24'
  on-primary-container: '#8a9289'
  inverse-primary: '#c0c9be'
  secondary: '#8d4e29'
  on-secondary: '#ffffff'
  secondary-container: '#feab7e'
  on-secondary-container: '#783d19'
  tertiary: '#0e1710'
  on-tertiary: '#ffffff'
  tertiary-container: '#232b24'
  on-tertiary-container: '#899389'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce5da'
  primary-fixed-dim: '#c0c9be'
  on-primary-fixed: '#161d17'
  on-primary-fixed-variant: '#414941'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#703714'
  tertiary-fixed: '#dce5da'
  tertiary-fixed-dim: '#c0c9bf'
  on-tertiary-fixed: '#151d17'
  on-tertiary-fixed-variant: '#404941'
  background: '#fcf9f3'
  on-background: '#1c1c18'
  surface-variant: '#e5e2dc'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '300'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  spec-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.06em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.12em
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
  space-lg: 1.75rem
  space-xl: 3rem
---

## Brand & Style

This design system expresses a quiet, editorial luxury aesthetic tailored for tensile membrane engineering, structural canopy architecture, and precision steel hardware. Merging brutalist structural rigor with warm architectural minimalism, the interface mirrors the lightness, tension, and organic curves of tensile fabrics pinned against rigid steel structures. 

The visual style communicates structural confidence and refined craftsmanship. It departs entirely from generic industrial catalogs through expansive whitespace, muted architectural tones, precision technical data presentation, and deliberate framing. The aesthetic appeals to lead architects, public infrastructure planners, hospitality developers, and luxury sports facility directors seeking uncompromising structural integrity paired with sculptural elegance.

## Colors

The palette draws directly from architectural materials: weathered terracotta, oxidation primers, structural slate, and raw off-white membrane fabric.

- **Primary (`#232B24`)**: Deep architectural slate-forest. Evokes dark-coated structural steel, anchor assemblies, and solid framing. Serves as high-contrast body copy, dominant typography, and solid callouts.
- **Secondary (`#A25E38`)**: Rich architectural copper rust and terracotta. Derived directly from structural engineering specs and primer coatings. Used selectively for active tension points, key CTA accents, technical tags, and callouts.
- **Tertiary (`#4A534B`)**: Weathered slate-moss tint. Applied to secondary technical data, subtext, wireframe outlines, and engineering line work.
- **Neutral Surface Base (`#F4F1EB`) & Canvas Light (`#FAF8F5`)**: Gallery cream and unbleached membrane fabric. Delivers an editorial, tactile warmth that prevents clinical coldness.
- **Container Whites (`#FFFFFF`)**: Pure membrane white used within structural cards and photo viewports to allow canopy photography and steel detail renderings to stand forward cleanly.
- **Dividers & Wireframes (`#E2DDD5`)**: Subdued structural hairpins and grid lines, maintaining visual tension without adding weight.

## Typography

The typographic hierarchy balances structural precision with editorial restraint. 

1. **Editorial Headlines (`Plus Jakarta Sans`)**: Set with a light, disciplined hand at generous scales. Generous negative space and subtle negative tracking evoke architectural monographs and modern monographs.
2. **Body System (`Inter`)**: Chosen for neutral legibility across dense engineering specifications, case studies, and load capacity tables. Light (`300`) and regular (`400`) weights reinforce spatial openness.
3. **Hardware & Material Specifier (`JetBrains Mono`)**: Monospaced type delivers the feel of blueprinted structural engineering. Used exclusively for material grades (e.g., `Galvanized Steel WF/IWF`, `Turnbuckle Grade 316`), dimensions, coordinate tags, and technical metrics.
4. **All-Caps Eyebrows**: Rendered small, tracked out (`0.12em`), providing clear categorization without visual clutter.

## Layout & Spacing

The layout philosophy mirrors architectural framing: disciplined, proportional, and unhurried. 

- **Grid Structure**: A responsive 12-column system on desktop transitioning to an 8-column layout on tablet and a 4-column layout on mobile. Content spans asymmetrical ratios (e.g., 7:5 or 4:8) to mimic structural cantilevers and tension arches.
- **Section Pacing**: Macro section padding uses open intervals (`space-xl` multiplied for hero bands) to give canopy photography breathing room akin to an exhibition catalog.
- **Micro Rhythms**: Component internals use tight multiples of 4px (`space-xs` through `space-md`) to ensure engineering specification badges, material tables, and metadata chips remain compact and legible alongside large-scale structural imagery.

## Elevation & Depth

Visual hierarchy is maintained through tactile planar layering and hairline structural boundaries rather than artificial dropshadows:

- **Tonal Planes**: Depth is achieved by placing stark pure white (`#FFFFFF`) or chalk parchment panels over the warm base canvas (`#F4F1EB` / `#FAF8F5`). Surfaces feel like physical architectural board mountings.
- **Architectural Hairlines**: Elements are defined by fine 1px strokes in `#E2DDD5` (or `#232B24` at 15% opacity), referencing drafting pen lines and tension wires.
- **Floating Modals**: Where floating panels are required (e.g., technical schematics, zoomed detail inspections), use an ultra-diffused, ambient shadow: `0 20px 40px -15px rgba(35, 43, 36, 0.08)`. The shadow is tinted with the primary slate forest tone, preserving natural daylight illumination.

## Shapes

The shape system adopts a minimal corner treatment (`0.25rem` / `4px`). This slight softening removes digital harshness while preserving the crisp, squared discipline of modern steel and glass architecture. 

- **Cards & Architectural Viewports**: 4px radius (`rounded-sm`), retaining an intentional drafting-sheet edge.
- **Buttons & Chips**: 2px to 4px radius, crisp and industrial.
- **Pill Exceptions**: Strictly forbidden for buttons and standard containers; reserved solely for tension-point status indicators and small circular coordinate indicators.

## Components

### Buttons
- **Primary Action**: Solid `#232B24` (Slate Forest) background with white text, crisp 4px corners, uppercase or tracked label style, `space-sm` vertical and `space-lg` horizontal padding. On hover: background shifts smoothly to `#A25E38` (Copper Rust).
- **Secondary / Technical Action**: Transparent surface with 1px border in `#232B24` and text in `#232B24`. Hover transitions to a muted tint of `#F4F1EB`.
- **Accent Action**: Solid `#A25E38` (Copper Rust) for direct quote inquiries and structural calculations.

### Material & Specification Chips
- Rendered in `#FAF8F5` with a 1px border of `#E2DDD5`. 
- Typeface set in `JetBrains Mono` (`spec-code`), paired with a leading dot or micro-icon indicating material grades (e.g., *Steel WF/IWF*, *PVDF Membrane*, *Clamp Plate*).

### Structural Specification Cards
- Clean planar containers featuring a split layout: one side presenting high-resolution engineering photography (framing, clamp-plates, turnbuckles) and the adjacent panel rendered in `#A25E38` or `#232B24` carrying structured technical specs.
- Specs are organized with hairline horizontal rules, separating material names, finishing notes, and tension tolerances cleanly.

### Form Inputs & Inquiry Fields
- Understated input fields with a flat `#FFFFFF` background, framed by a 1px hairline border (`#D5CFCA`).
- On focus: the border transitions directly to `#232B24` with zero outer glow.
- Labels sit above inputs in `label-caps` (`#4A534B`), maintaining blueprint rigor.

### Interactive Technical Lists & Tables
- Border-bottom rows in `#E2DDD5`, featuring generous vertical padding (`space-md`).
- Primary column uses `headline-sm` or `body-md` bold, while technical parameters (span width, steel grade, wind load resistance) are aligned right in `JetBrains Mono`.