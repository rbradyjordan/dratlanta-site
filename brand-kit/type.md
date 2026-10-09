# Typography

## Faces

**Newsreader** (display serif, variable). Weights used: 300 and 400 only; italic at 300 only. Optical size axis 12–72 is live, so the same file renders fine detail at headline size and sturdier strokes small (`font-optical-sizing: auto`; h3 pins `opsz 40`). Self-hosted and trimmed — see `fonts/README.md`. Google Fonts original: https://fonts.google.com/specimen/Newsreader (SIL OFL).

**Hanken Grotesk** (text sans). Weights 400 and 500. Google Fonts: https://fonts.google.com/specimen/Hanken+Grotesk.

Fallbacks: Times New Roman / serif; -apple-system, Segoe UI / sans-serif.

## Roles

| Role | Face | Size (site) | Notes |
|---|---|---|---|
| H1 | Newsreader 300–400 | clamp(2.75rem, 7.6vw, 6.5rem) | Tracking −0.02em, line-height ~1.0. Emphasis is done with the **italic** in a second colour or lighter weight (hero: "for your face, *not from a template*." with the italic line in gold on dark). |
| H2 | Newsreader | clamp(2.1rem, 5vw, 4.25rem) | Sentence case, ends with a period. Headlines are statements: "The price is the price." "White is not one color." |
| H3 | Newsreader, opsz 40 | clamp(1.45rem, 2.4vw, 2rem) | Tracking −0.01em, line-height 1.1. |
| Lede | Hanken 400 | clamp(1.15rem, 1.7vw, 1.4rem) | Colour text-2, max 32em measure, line-height 1.45. |
| Body | Hanken 400 | 1rem–1.05rem | Colour text, line-height ~1.55. |
| Small / fine print | Hanken 400 | 0.74–0.82rem | Colour text-2 or text-3 (never lighter than #686B70 on porcelain). |
| Numbers (prices, counters) | Newsreader 400 | up to 2.1rem+ | `font-variant-numeric: tabular-nums`, tracking −0.02em. |
| Buttons / nav | Hanken 500 | 0.98rem | Pill shapes, 999px radius. |
| Wordmark | Newsreader 400 + Hanken 400 | 1.55rem + 0.82rem | Baseline-aligned, 10px gap, gold period via `::after`. |

## Rules

- Serif for anything that carries voice (headlines, prices, pull statements); sans for everything functional. Never the reverse.
- Headlines in sentence case with terminal punctuation. No ALL-CAPS eyebrows, no letterspaced labels, no numbered 01/02/03 ornaments unless the content is genuinely a sequence.
- Italics are the emphasis device; bold serif is not used (the trimmed font has no weight above 400 — heavier would be synthesized).
- Gold type only in the italic hero line on dark, or as `gold-text` (#7F6128) for small text on light.
- Generous rhythm: section spacing clamp(96px, 14vw, 200px); gutters clamp(20px, 4.5vw, 56px); max content width 1360px.
- Motion: ease `cubic-bezier(0.22, 1, 0.36, 1)`, in-out `cubic-bezier(0.65, 0, 0.35, 1)`, base duration 0.9s; text enters with masked "rise" lines, never per-section fade-ups.
