# Launch Checklist — Dr. Atlanta Rebuild

## Client confirmations (blockers)
- [ ] **MINT affiliation**: NPI 1104554955 points to MINT Midtown (1010 W Peachtree St NW, Ste C-2). Still active? Determines NPI update + GBP address + directory strategy.
- [ ] **Final NAP**: exact public name, address format ("at BRUSH Dentistry"?), phone. Then update footer, contact info, and Dentist schema in `web/app/layout.tsx`.
- [ ] **Testimonials**: 6 on old site are unattributed — verify real/consented before adding back (currently omitted from rebuild).
- [ ] **Claims**: "500+ smiles", "patients from 10+ states", "98% approval" — dropped from rebuild; restore only what client can substantiate.
- [ ] **Photo releases**: signed, use-specific releases per gallery case (website + social named separately).
- [ ] **Financing**: confirm Cherry/Sunbit/HFD active; get lender-approved representative-example text to replace the placeholder disclosure on /pricing (Reg Z: any "$X/mo" requires APR/term disclosure).
- [ ] **Whitening offer**: still running? What qualifies?
- [ ] **Hours + email**: needed for GBP, schema, footer.

## Content/assets pending
- [x] Brand photography delivered (Downloads/Highlights, 73 frames, 1024px long edge) and placed — 11 frames as WebP in `web/public/photos/`. Unused but worth keeping: `loupes-face.webp`, `treatment-room.webp`.
- [ ] Request full-resolution exports of the placed frames (1024px is soft on retina for the About hero and any future full-bleed use).
- [x] Pulled the old site's six real transformations (Sarah R, Charlotte C, Dana B, Dov G + two unnamed) into `web/public/photos/cases/` as split before/after WebPs, plus the USC headshot. Excluded the two iStock images and the blurred-face composite.
- [ ] **Confirm photo releases** cover the new site for those six patients (they were already public on dratlanta.org, but the release should name this use). Get first names / treatment facts from the practice — the case pages currently state only "porcelain veneers" because nothing else is on record.
- [ ] New before/after case photography still outstanding — `CompareSlider` frames remain art-directed placeholders until standardized B/A pairs (same light/angle/distance/retraction; months-post noted) and signed releases arrive.
- [x] GoHighLevel embed wired (`components/GhlBooking.tsx`, form S6q7xzq2zw5JgBFtZ0nZ). Still to do in GHL itself: (1) if Eric wants a date-picker rather than a request form, set `NEXT_PUBLIC_GHL_EMBED_URL` to his calendar link (`…/widget/booking/<calendarId>`); (2) restyle the form inside GHL's form builder to match the site (Newsreader/Hanken, porcelain background, ink button) — the site cannot style inside the iframe; (3) add a custom field keyed `notes` so the three-tap planner summary prefills; (4) do a real test submission and confirm the SMS/workflow fires.
- [x] Legal pages ported (2026-10-08): `/privacy-policy/`, `/terms-of-service/`, `/accessibility/`, same URLs as the old site, carrying over its SMS commitments with the real address. Have counsel read them; the legal name used is "Eric Ennuson dba Smiles by Dr. Atlanta" to match the A2P registration.

## Local search sequence (post-NAP confirmation)
1. Create/verify Google Business Profile with final NAP.
2. Validate Dentist schema (Google Rich Results test) — must mirror GBP exactly.
3. Update NPPES NPI record address.
4. Submit to aggregators (Data Axle, Neustar Localeze, Foursquare).
5. Claim Healthgrades, WebMD, Vitals, Zocdoc.
6. Start compliant review engine (post-visit SMS asks, no incentives, no gating; target 50+ Google reviews).

## Hero reel
- [x] Reel delivered (`~/Desktop/web reel.mov`, 4K 24p, 19 s) and transcoded: `web/public/video/reel.mp4` (1080p H.264, 3.1 MB, no audio, faststart) + `reel.webm` (VP9, 5.2 MB). Poster = reel's first frame. Wired via `HERO_VIDEO` in `web/components/Hero.tsx`; suppressed under `prefers-reduced-motion`.
- [ ] Opening seconds show the operatory TV playing a Prime Video title card ("sterling point") — third-party branding in the hero. Either re-trim the in-point past it or replace the screen content; re-run the transcode commands in `research/06-design-v2-notes.md` afterwards.
- [ ] Source `.mov` lives on the Desktop only — archive it with the project assets.

## 3D dentition model
- [ ] `web/app/lab/teeth/` is a DEV-ONLY proving ground (noindex) for GLB candidates — delete before launch.
- [x] Real dentition GLB shipped: "Human teeth" by Alexander Antipov (CC BY 4.0), 774 KB WebP-textured, at `web/public/models/teeth.glb` via `components/TeethModel.tsx` on /veneers. Attribution in the footer and under the viewer; full provenance in `public/models/ATTRIBUTION.txt`. Backup candidates processed by the scour (Dundee "Permanent Dentition" CC-BY, 32 individual teeth, no gums; HuBMAP "Mouth, Male" CC-BY) live in the scratchpad `teeth/out/` folder — copy them into the project if you want to keep them.
- [ ] Have Dr. Ennuson sanity-check the "after" look (how far the front teeth are pushed toward porcelain, where the veneered zone stops) AND the "before" story (missing lateral, mesial-incisal chip on the central, diastema, crowded lateral, staining/calculus) — it should read as plausible, not cartoonish.
- [x] The poly.pizza "Teeth" test asset was removed (2026-10-08); only the Antipov GLB ships.
- [ ] `three-bvh-csg` needs `three-mesh-bvh@^0.9` at top level while drei pins 0.8 — installed with `--legacy-peer-deps`; keep that flag (or an `overrides` entry) in CI/deploy installs.
- [ ] Before launch, strip the dev-only `window.__teeth*` hooks or confirm they are tree-shaken (`process.env.NODE_ENV !== 'production'` guards are in place).
- [ ] Run a production `next build` once the shared dev server is free (the CSG/subdivision chunk is heavy in dev; check the client bundle size for /veneers).

## Design v2 review items
- [ ] Dr. Ennuson reviews Shade Studio verdict copy for clinical accuracy (heuristic: luminance delta + cast gap + translucency).
- [ ] Decide whether the studio's Monk-scale tone labels ("Tone 1–10") need a short "about this scale" note.
- [ ] Replace `Plate` frames with shoot output; captions are the shot list.

## Pre-launch QA
- [ ] Core Web Vitals on mobile: LCP ≤ 2.5s, INP ≤ 200ms, CLS < 0.1.
- [ ] All links live (zero `#` placeholders — a defect of the old site).
- [ ] WCAG AA contrast pass; prefers-reduced-motion verified.
- [ ] GA dental board advertising rules review (testimonials, financing claims).
- [x] 301 map written for all 16 changed old URLs in `web/vercel.json` and `web/public/_redirects` (2026-10-08). Verified on the Vercel deployment 2026-10-10: all 16 old URLs land on their new page (two hops: Vercel adds the trailing slash, then redirects, so the rules need the slashed source) and unknown URLs return 404. Re-test on www.dratlanta.org after the domain moves.

## Positioning and claims (Brady, 2026-10-07)
- [ ] Lead with **metro Atlanta** up front; keep the Lawrenceville/Buford street address to the footer, about/contact, and schema (NAP consistency for GBP). Hero + header done; page copy and metadata with the other session.
- [ ] No superlatives anywhere ("best smiles in Atlanta", "#1", "top", "premier") unless backed by a verifiable award — Georgia Board of Dentistry advertising rules and FTC substantiation. Safe phrasing: "smile design for metro Atlanta", "designed for your face, not from a template".
- [ ] Run final copy past the GA board's advertising rules before launch (testimonials, "specialist" language, financing terms).
- [ ] Intro sequence: confirm with Brady it should stay once-per-session (not once-per-visit) and that the reel's first frames (still the Prime title card until re-trimmed) are acceptable inside the letters.

## Home page content carried over from the old site (2026-10-07) — verify before launch
- [ ] Testimonials now on the home page: Marcus J. ("Best decision I ever made…") and Jessica L. ("I flew in from California…"). The old site had no source for either. Confirm they are real, consented patients or remove them. Georgia dental advertising rules treat testimonials as advertising; keep them factual and attributable.
- [ ] Georgia Board of Dentistry license lookup link (`gadch.mylicense.com/verification`). Confirm it resolves to the current verification portal and, ideally, deep-link to Dr. Ennuson's record.
- [ ] "Three visits, temporaries the same day" and "10 to 15 years" are the old site's claims. Confirm with Dr. Ennuson that both are typical for his cases.
- [ ] Complimentary whitening "with qualifying full-arch plans": confirm the qualifying rule so the word "qualifying" is defensible.
- [ ] Financing copy is now one FAQ answer plus three facts (Cherry/Sunbit/HFD, 24–60 months, soft inquiry). No "98% approval", no "$149/mo", no plan cards. Keep it that way.

## SEO pass (2026-10-08) — see research/07-seo-research.md
**Blocking**
- [ ] **Identity/NAP conflict:** directories list Dr. Ennuson at MINT Midtown with (404) 903-2006; CareCredit lists that number for BRUSH. Decide the one true name/address/phone and fix every listing before building citations.
- [ ] **Address suite:** site now says "1475 Buford Dr, Suite 204" (from brushdentistry.org). Confirm, or revert in `web/lib/site.ts`.
- [ ] **Google Business Profile name** must follow Google's practitioner rule ("BRUSH Dentistry: Dr. Eric Ennuson" or his name alone), not the brand name, unless the brand is on the signage.
- [ ] **BRUSH's own site** has a "#1 Veneers in Lawrenceville, GA" page competing with `/veneers-lawrenceville-ga/`. Agree targeting with them and get Dr. Ennuson listed and linked there.
- [ ] **Attorney review:** Georgia Rule 150-10-.01(6)(c) location claims vs. the "Dr. Atlanta" / "metro Atlanta" positioning; fee rule 150-10-.01(3); Reg Z wording on the payment example.
**Fill in `web/lib/site.ts` / `lib/schema.ts`**
- [ ] Opening hours → `openingHoursSpecification`. License number → Person credential `identifier`. Google Maps pin → replace the OpenStreetMap geocode and `hasMap`.
- [ ] Set `SITE.clinicalReview` to the date Dr. Ennuson actually approves the clinical copy; the "Clinically reviewed" line and `lastReviewed` appear only then.
- [ ] Confirm the Instagram handle (`dr.atlanta` vs `dratlanta`).
**Clinical claims Dr. Ennuson must confirm:** ~0.5 mm enamel removal; three to four visits; 10–15 years porcelain, 4–7 composite; the BL1–A2 "tends to suit" notes; the six signs and the repair/replace/crown table on `/fix-botched-veneers/`.
**After deploy**
- [ ] Verify www in Search Console + Bing Webmaster Tools; submit `/sitemap.xml`; run Rich Results test on `/`, `/about/`, `/pricing/`.
- [ ] Confirm the host serves Brotli/gzip and long cache headers for `/_next/static/`. Re-run Lighthouse on the live URL.
- [ ] Update `lastModified` dates in `web/app/sitemap.ts` by hand when a page's substance changes.
- [ ] Hero reel: `reel.webm` was removed (5 MB, heavier than the 3 MB MP4). Re-trim past the Prime title card when re-encoding.

## Payment card (2026-10-08)
- [ ] The slider shows 0% APR examples at 12, 24, 36, 48, and 60 months. Reg Z only allows advertising terms the lenders actually offer. Confirm with Cherry, Sunbit, and HFD which 0% terms exist and remove any stop that does not (edit `TERMS` in `web/components/PaymentSlider.tsx`).
- [ ] The one-line disclosure under the slider carries APR, down payment, and number and amount of payments. Have the lenders or counsel approve the wording before launch.
