# IA & Design Direction — Dr. Atlanta Rebuild

## Positioning sentence
Accredited-quality veneers at an honest, published price — from a named, licensed DDS with shade expertise for melanin-rich skin.

## Information architecture (8 pages)

| Page | Job | Pillar |
|---|---|---|
| `/` Home | Credibility in 3s (Licensed DDS · USC · real address), one financing number, gallery proof, book in two taps | — |
| `/veneers` | Veneer education pillar: process, porcelain vs composite, longevity, pain, candidacy + FAQ schema | Veneer education |
| `/smile-design` | Shade & smile design for melanin-rich skin — undertone-based shade selection, the wedge page | Shade/smile design |
| `/why-licensed` | Licensed-correction content: what a DDS license means, red flags, fixing botched work — post-scandal differentiation | Licensed correction |
| `/results` | Gallery as case studies: labeled (procedure, # veneers, timeline, months post), consistent standards, "no models, no filters" pledge | — |
| `/pricing` | ONE financing story: $8,999 full arch, payment table, Reg Z-safe representative example, Cherry/Sunbit/HFD | — |
| `/consultation` | "What to expect" (60 min, trial smile, "what if I hate it") + booking form — the conversion page | — |
| `/about` | Dr. Ennuson: bio, credentials, philosophy, BRUSH location, mentorship/Discord community | Behind-the-practice |

Nav: Veneers · Smile Design · Results · Pricing · About — CTA button "Book a consult". Footer: full NAP (flagged pending confirmation), hours, real social links only, license line.
Conversion path: every page → sticky mobile bar (Call / Book) → /consultation → GoHighLevel form or tel:. Two taps from anywhere.

## Design system
- **Palette (evolved from existing brand):** ink `#14151E` (primary dark), bone `#F5F1EA` (light ground), gold `#C9A961` (accent, <5% usage), muted line `#E3DDD2`, body text `#2A2B33` / `#B9B4A9` on dark. No pure black/white.
- **Type:** Fraunces (editorial serif, display — optical size, slight negative tracking) + Inter (body/UI). H1 clamp(2.5rem, 7vw, 5.5rem). Body 17px/1.7. Scale ~1.25.
- **Layout:** 12-col grid, asymmetric placements, 120–160px section rhythm, one idea per viewport.
- **Motion:** IntersectionObserver reveals only — opacity + 28px translateY, 0.9s cubic-bezier(0.22,1,0.36,1), 60–90ms staggers; hovers 200–300ms; `prefers-reduced-motion` kills all of it. Nothing loops.
- **Imagery:** placeholder frames art-directed for the client shoot (single warm grade, negative space, macro smile as product shot). No stock — the site claims none.
- **Trust architecture:** license/USC/address strip under hero; Wimpole-style credential lines, no badge walls.
- **Compliance:** monthly figures only inside a representative-example block with APR/term disclosure; FAQ + Dentist JSON-LD schema (NAP fields flagged for confirmation); WCAG AA contrast (gold never used for body text on light).
- **Performance:** static HTML/CSS/vanilla JS, no frameworks, system font fallbacks, preloaded fonts, explicit image dimensions, sub-2s mobile target.
