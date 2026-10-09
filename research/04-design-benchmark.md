# Design Benchmark — Award-Tier / $200K Patterns

Direct comp: **Aventura Dental Arts** (aventuradentalarts.com) — Awwwards SOTD Mar 2026, cosmetic dental practice. Two-color palette (#EAE8E8 warm off-white + #14151D ink), full-bleed photography, restrained interaction.

Other references: Ouronyx (ouronyx.com — luxury tone of voice, "mindful aesthetics"), Wimpole Street Dental (credential architecture: specialist titles + quantified outcomes, no badge walls), Harley Street Dental Studio (photograph tangible luxury details), Arch Aesthetics Denver (smile macro as beauty-product shot), Locomotive (7x Awwwards agency of year — editorial scroll pacing), Darkroom/Lenis (stable smooth scroll > more animation).

## Mechanics
- **Type:** editorial serif display (Canela/Playfair/GT Sectra class) + neutral grotesque body (Neue Haas/Inter class). Max 2 families. H1 clamp ~6–9vw, tracking -1% to -3%, sentence case, 3–7 words. Body 1.6–1.8 line-height. Scale ratio 1.25–1.5.
- **Color:** 2–3 total; accent < 5% of page. Dark = charcoal (#141517), never #000; light = warm bone, never #FFF.
- **Layout:** 12-col grid used asymmetrically (portrait cols 1–5, text 7–11, staggered offsets). 120–200px vertical rhythm. One idea per viewport.
- **Motion:** Lenis-style smooth scroll + GSAP-style reveals. Reveals 0.75–1.1s power3/power4/expo.out, opacity + translateY 20–40px, image scale 1.05→1, headline clip reveals. Hovers 150–350ms. Word stagger 0.035–0.07s. Nothing loops/bounces; prefers-reduced-motion respected. Never animate body copy mid-read.
- **Micro:** two-property hovers (underline draws + arrow nudges), button fill-sweep ~250ms, image hover zoom 1.03–1.05 over ~600ms, one designed load moment <1.5s.
- **Photography (biggest lever):** one warm slightly-desaturated grade everywhere; subject ~1/3 of frame, negative space carries headlines; doctor = magazine profile; smile macro = jewelry lighting; before/afters as one-case-per-page case studies with matched lighting. 6 great cases beat 60 thumbnails.
- **Performance:** sub-2s mobile; cheap first viewport, motion deferred. Fast + calm = luxury.

## Anti-patterns (cheap tells)
Teal dental palette, tooth clipart, mixed-temp stock, 4+ colors, 3+ fonts, 28px H1s, boxed alternating stripes, auto-rotating testimonial carousels, badge walls, red "Request Appointment!" everywhere, retractor-flash photo grids on homepage, laggy scroll.

## Spend-the-budget list
1. One-day editorial shoot, single color grade (doctor portraits, smile macros, interiors).
2. Real serif+grotesque pairing, subset + preloaded.
3. Two-color palette + <5% accent.
4. Oversized clamp() headlines in photographic negative space.
5. Smooth scroll + 0.8–1s ease-out reveals only.
6. Asymmetric 12-col layouts, 120–200px padding.
7. Before/afters as case-study pages.
8. Credential architecture in refined type.
9. Micro-layer craft (hovers, fill-sweeps, concierge-feel form).
10. Sub-2s mobile load as a feature.
