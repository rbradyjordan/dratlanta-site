# SEO research and site pass — dratlanta.org rebuild (2026-10-08)

Three research tracks (keywords and competitors, technical/schema/local, AI search and E-E-A-T), a crawl of the rebuilt site before and after, and a production build measured with Lighthouse. Everything marked UNVERIFIED could not be confirmed from a primary source.

## 1. The strategic picture

- **The local pack for "veneers atlanta" is not winnable from Lawrenceville.** Proximity to the searcher is the #2 local-pack factor and "address in the city of search" is #4 (Whitespark 2026). The practice is about 30 miles from Midtown.
- **Organic is winnable on the gaps.** Six Atlanta competitors with 1,600 to 3,100-word veneer pages were fetched. None of them covers: a published full-arch price, unlicensed "veneer tech" risk, fixing botched or overseas veneers, shade chosen by skin tone and undertone, or financing with imperfect credit. Those are exactly this practice's differentiators.
- **Gwinnett is soft.** "veneers lawrenceville ga", Buford, Suwanee, Duluth, Dacula surface directory pages and 400 to 750-word template pages with no schema. "veneers gwinnett county" surfaced no practice at all.
- **News owns the veneer-tech queries.** ADA News, WSB-TV, Fox, Becker's. No dental practice ranks. A sourced explainer from a licensed Georgia dentist is the natural result.
- **AI answers.** Google says AI Overviews need nothing beyond normal indexing; llms.txt, special schema, and "chunking" are not used. For dentists, AI citations come overwhelmingly from Google Business Profile (57%) and Yelp (15%) (BrightLocal, Aug 2026). Page copy wins the informational queries; the profile and reviews win "who should I go to".

## 2. What the audit found (before)

| Area | Before |
|---|---|
| Canonical URLs | None on any page |
| Open Graph / Twitter cards | None; no share image |
| Sitemap, robots.txt | Neither existed |
| Favicon, app icons | None |
| 404 page | Framework default |
| Old-URL redirects | None for 22 indexed URLs on the live site |
| Titles | 72 to 91 characters, editorial, no location terms |
| H1s | Slogans with no topic words ("The price is the price.") |
| Thin pages | Results 239 words, consultation 300, about 316, pricing 481 |
| Alt text | 46 of 51 home images empty, including every case photo |
| Structured data | One flat Dentist node; no person, no page nodes, no services |
| Legal pages | None (the SMS program requires privacy and terms URLs) |
| Contact page | None |
| Hero video | 5 MB WebM listed first, `preload="auto"`, fetched immediately |
| Lighthouse mobile, home | Performance 35, total blocking time 4,790 ms |

## 3. What changed

**Foundation**
- `lib/site.ts`: one source for name, address (now with Suite 204, per brushdentistry.org), phone, email, URLs. `pageMeta()` gives every page an absolute title, description, canonical, Open Graph, and Twitter card.
- Canonical host set to `https://www.dratlanta.org` (the apex already 301s to www).
- `app/sitemap.ts`, `app/robots.ts` (both `force-static`; verified present in the export), favicon, app icons, web manifest, a 1200×630 share image, a real 404 page.
- `vercel.json` and `public/_redirects`: 301 map for the old URLs that changed.
- New pages at the old URLs: `/privacy-policy/`, `/terms-of-service/`, `/accessibility/`, `/contact/`, plus `/thank-you/` (noindex) for the form.

**Structured data** (`lib/schema.ts`)
- Site graph: WebSite, Dentist (address, geo, areaServed, services, price), Person (DDS, alumniOf, license credential), and the host practice, cross-referenced by `@id`.
- Page nodes: MedicalWebPage, ProfilePage, CollectionPage with ImageObject credits, Service with the $8,999 Offer, FAQPage.
- Deliberately absent: Review/AggregateRating (ineligible on your own business and a policy risk; the live site declares a 5.0/500 rating that should go), opening hours and license number (not confirmed), breadcrumbs (desktop-only, and no visible trail to match).
- FAQ rich results were retired by Google on 7 May 2026. The markup is kept because it is harmless and other engines read it, but nothing is expected from it.

**Titles and headings** — see the table in section 4.

**Content**
- `/veneers/` 728 → 1,515 words: definition-first lede, who veneers suit and who should wait, how much tooth is removed, veneers vs bonding/crowns/aligners/whitening, living with veneers, eight visible Q&As.
- `/pricing/` 481 → 1,085: price in the H1 and first sentence, what changes the cost, three ways to pay, eight visible Q&As, the Georgia fee disclosure.
- `/results/` 239 → 529: "How to read a veneer before and after" (six checks), image credits in schema.
- `/why-licensed/` 556 → 900: "Is a veneer tech legal in Georgia?" answered from O.C.G.A. § 43-11-17 and the ADA's May 2024 statement, how to check a license, what to do if it already happened. Sources listed on the page.
- `/smile-design/` 543 → 1,028: the shade chart in plain terms (BL1 to A2), four shade Q&As. Written for every skin tone; no page targets one group.
- `/about/` 316 → 503, `/consultation/` 300 → 480.
- **New `/fix-botched-veneers/`** (1,078 words): signs, the correction process, repair vs replace vs crown, overseas work, what to bring.
- **New `/veneers-lawrenceville-ga/`** (625 words): the local page for Gwinnett.
- Answers that mattered were moved out of accordions into visible Q&A blocks (Microsoft's guidance for AI answers; also better for skimmers).
- `PageNote` on every clinical page: who provides the treatment, how to verify the license, and sources. A "clinically reviewed" line appears only when `SITE.clinicalReview` holds a real date.

**Images**
- Real alt text on case photos, practice photos, and step photos. Carousel repeats are hidden from assistive tech and carry empty alts on purpose.

**Performance**
- Hero reel attaches only after the page has loaded, never on Save-Data or 2G/3G; the 5 MB WebM is gone (3 MB MP4 only).
- WebGL scenes (tooth model, shade tabs) mount only when near the viewport.
- Headline ledes and the hero portrait no longer start at `opacity: 0`, which had hidden them from Chrome's Largest Contentful Paint measurement.
- Italic display font no longer preloaded (about 130 KB off the critical path); a below-fold image no longer preloaded.
- Contrast: small gold and tertiary text darkened to pass AA on light backgrounds.

## 4. Keyword map as shipped

| Page | Primary target | Title |
|---|---|---|
| / | veneers atlanta, smile makeover atlanta | Veneers & Smile Makeovers in Metro Atlanta \| Dr. Atlanta |
| /veneers/ | porcelain veneers atlanta | Porcelain Veneers in Metro Atlanta \| Dr. Eric Ennuson, DDS |
| /pricing/ | veneers cost atlanta | Veneer Cost in Metro Atlanta: $8,999 Full Arch \| Dr. Atlanta |
| /results/ | veneers before and after atlanta | Veneers Before and After, Metro Atlanta \| Dr. Atlanta |
| /smile-design/ | veneer shade for skin tone | Veneer Shade Guide: Match Your Skin Tone \| Dr. Atlanta |
| /consultation/ | veneer consultation atlanta | Book a Veneer Consultation in Metro Atlanta \| Dr. Atlanta |
| /about/ | Eric Ennuson DDS | Eric Ennuson, DDS \| Veneers & Smile Design, Metro Atlanta |
| /why-licensed/ | veneer tech georgia | Licensed Dentist vs. Veneer Tech in Georgia \| Dr. Atlanta |
| /fix-botched-veneers/ | fix botched veneers atlanta | Fix Botched Veneers in Metro Atlanta \| Dr. Atlanta |
| /veneers-lawrenceville-ga/ | veneers lawrenceville ga | Veneers in Lawrenceville, GA & Gwinnett County \| Dr. Atlanta |
| /contact/ | brand + address | Contact and Directions \| Dr. Atlanta, Lawrenceville GA |

No search volumes are given because none could be sourced.

## 5. Measured results (production export, Lighthouse 12, mobile)

| Page | Performance before | After | Blocking time before | After |
|---|---|---|---|---|
| Home | 35 | 80 | 4,790 ms | 10 ms |
| Veneers | 45 | 87 | 7,140 ms | 30 ms |
| Pricing | not measured | 89 | — | 30 ms |

SEO 100 and best practices 100 on all three; accessibility 96 on home (the remaining flags are the difference-blend text in the pinned section, a false positive) and 100 on the others. CLS is 0.

Caveats: "before" used Lighthouse's simulated throttling and "after" used applied throttling, because simulation on localhost misattributes script loading to LCP. Under simulation the after-scores were 73 (home) and 76 (veneers) before the font change. The test server sent no compression; a real host with Brotli will be faster. First paint on slow 4G is still about 3 s.

## 6. Decisions worth knowing

- **No "veneers for dark skin" page.** The demand exists and no Atlanta competitor serves it, but the earlier direction was clear that the site must not single out a group. The shade guide answers the question for every skin tone instead.
- **No separate financing page.** The old site read like a credit infomercial. Financing is a section of the pricing page with the lender disclosures.
- **No user-agent sniffing for the intro.** Skipping the loader for crawlers would be a different experience for bots. The loader is an overlay over fully painted content, so it never gates indexing, but it is still about three seconds on a first visit. Shortening it is the cleanest further gain.
- **No llms.txt.** Google says Search does not use it and crawler logs show AI bots almost never fetch it.
- **"Cosmetic dentist" is used as a description, never as a credential.** Georgia recognizes twelve specialties and cosmetic dentistry is not one (Rule 150-11-.01).

## 7. Compliance flags for an attorney or the dentist

1. **Location claims.** Georgia Rule 150-10-.01(6)(c) treats claiming a practice location where the dentist does not regularly treat patients as misleading. "Metro Atlanta" plus a visible Lawrenceville address is the conservative reading; whether the "Dr. Atlanta" name itself is an issue is UNVERIFIED and needs a Georgia dental-advertising attorney.
2. **Fee advertising.** Rule 150-10-.01(3): the required "additional charges may be incurred…" sentence is now on the pricing page. The advertised fee must be honored for 60 days after last publication.
3. **Financing.** A stated monthly payment triggers Regulation Z disclosures (12 CFR 1026.24). The representative example carries APR, term, and total of payments; get the lenders' approved wording.
4. **Testimonials.** Marcus J. and Jessica L. are on the home page and unverified. FTC rule 16 CFR 465 applies.
5. **Clinical claims to confirm with Dr. Ennuson:** about half a millimeter of enamel removed; three to four visits; ten to fifteen years; composite four to seven years; the shade-chart suitability notes.
6. **Statute wording.** The veneer-tech answer cites § 43-11-17(a)(6) ("cosmetic covering"). The text was read on a 2016 mirror of the code; confirm against the current code.

## 8. What only the owner can do (ranked)

1. **Resolve the identity conflict first.** A directory lists Dr. Ennuson at MINT Dentistry Midtown (1010 W Peachtree, (404) 903-2006) and his NPI points there; CareCredit lists that same phone number for BRUSH Dentistry. Until name, address, and phone agree everywhere, every other local signal is diluted.
2. **Google Business Profile.** Per Google's guidelines a practitioner inside a branded practice is named "BRUSH Dentistry: Dr. Eric Ennuson" (sole public-facing practitioner) or just his name (multi-dentist practice). "Dr. Atlanta Cosmetic Dentistry" as the profile name risks suspension unless it is on the signage. Category "Cosmetic dentist" or "Dentist", services, photos, booking link to `/consultation/`.
3. **BRUSH Dentistry's own site has a "#1 Veneers in Lawrenceville, GA" page.** The host practice is competing for the same local query. Agree who targets what, and ask them to list Dr. Ennuson on their site with a link.
4. **Reviews.** Ask every patient with a plain link; no incentives, no gating (Google policy and the FTC rule).
5. **Listings with identical name, address, phone:** Yelp (the BRUSH listing is unclaimed), Apple Business Connect, Bing Places, Healthgrades, Zocdoc. Then update the NPI record.
6. **Confirm the Instagram handle** (`dr.atlanta` on the page, `dratlanta` in the old schema).
7. **Search Console and Bing Webmaster Tools**: verify www, submit the sitemap, watch the generative-AI report. Add "ChatGPT / AI" to the "how did you hear about us" question.
8. **Earned mentions.** Local press on the veneer-tech story, the USC alumni profile, dental society listings.
9. **Give me:** hours, the license number, the Google Maps pin, and a date after he has read the clinical copy, and I will add them to the schema and the page notes.

## 9. Sources

Google Search Central (local business, organization, profile page, image metadata, AI features, sitemaps, changelog); Google Business Profile guidelines; Whitespark Local Search Ranking Factors 2026; BrightLocal AI directory sources (Aug 2026); web.dev LCP and Core Web Vitals; Next.js static export and metadata docs; Georgia Rules 150-10 and 150-11; O.C.G.A. § 43-11-17; 12 CFR 1026.16 and 1026.24; FTC consumer reviews rule; ADA statement on veneer technicians (14 May 2024); Quality Rater Guidelines (11 Sep 2025); arXiv 2311.09735 and 2607.14035 (GEO); Ahrefs and Pew on AI Overviews; competitor pages fetched directly (Atlanta Smiles, Atlanta Dental Spa, Brightworks, Ponce Dental Studio, Dr. Langston, Atlanta Dental Center, ACCD).
