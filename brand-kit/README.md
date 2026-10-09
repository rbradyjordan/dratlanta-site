# Dr. Atlanta Cosmetic Dentistry — brand kit (source assets)

Everything in this folder is lifted from the live site build (`web/`) as of 2026-10-08, so it matches what is on screen exactly. Use `claude-design-prompt.md` to have Claude Design turn it into a full brand book and application set.

## What's here

| Folder / file | Contents |
|---|---|
| `logos/` | Transparent PNGs rendered at 2× from the site's own type and tokens: horizontal wordmark with descriptor (`wordmark-*`), name-only wordmark (`name-*`), and the `A.` monogram (`monogram-*`). `-ink` versions go on light backgrounds, `-porcelain` on dark. `preview-*-on-ink.png` show the reversed marks on ink. `source/` holds the HTML used to render them (regenerate with headless Chrome at any size). |
| `icons/` | The shipped app icon (512 / 192), a 1024 monogram-on-ink square, and the default 1200×630 social share image. |
| `fonts/` | Newsreader (variable, weights 300–400, optical size 12–72, upright + italic) as self-hosted WOFF2, with the trimming notes. Hanken Grotesk is loaded from Google Fonts (weights 400 and 500). |
| `photos/` | Brand photography (16 frames, 1024px long edge, WebP) and the six real before/after cases in `photos/cases/`. Full-resolution exports and signed releases are still owed by the practice — see `LAUNCH-CHECKLIST.md`. |
| `colors.json` | Every colour token with hex, role, and the proportion rule. |
| `type.md` | Typefaces, weights, scale, spacing, and the rules for how the serif and sans are paired. |
| `claude-design-prompt.md` | The prompt to paste into Claude Design, with the facts, voice rules, and deliverables. |

## The mark in one paragraph

The logo is typographic: **Dr. Atlanta** set in Newsreader (weight 400, −0.015em tracking), ending in a **gold period** (#B9975B) — the only coloured element — followed on the same baseline by **Cosmetic Dentistry** in Hanken Grotesk at 53% of the name's size in secondary grey (#5C5F64). The monogram is the serif capital **A** with the same gold dot, used for the favicon and app icon on an ink (#16181B) square. The gold is punctuation: it never becomes a fill, a gradient, or a large area.

## Facts that must stay exact

- Name: **Dr. Atlanta Cosmetic Dentistry**. Doctor: **Dr. Eric Ennuson, DDS** — USC Herman Ostrow School of Dentistry, licensed by the Georgia Board of Dentistry.
- Positioning: smile design and porcelain veneers for **metro Atlanta**. The street address (at BRUSH Dentistry, 1475 Buford Dr, Lawrenceville, GA 30043) appears only in footers, contact blocks and schema — never as the lead.
- Price: a full-arch smile design is **$8,999**, published and confirmed in writing before treatment. Monthly figures must travel with their terms (representative example: 36 payments at 0% APR, $0 down; subject to credit approval; lenders Cherry, Sunbit, HFD).
- Phone: (404) 383-4574. Evening and weekend consultations.

## Words that are off-limits

No superlatives or comparatives ("best", "#1", "top", "premier", "painless", "specialist") — Georgia Board of Dentistry advertising rule 150-10-.01(6). No "melanin-rich" or any skin-tone-led framing; the shade story is written as "matched to you, not a chart" / "white is not one color". No stock-photo smiles: the brand uses its own patients and its own doctor.
