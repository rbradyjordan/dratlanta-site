import Link from 'next/link';
import Photo from '@/components/Photo';
import TeethModelClient from '@/components/TeethModelClient';
import CaseMarquee from '@/components/CaseMarquee';
import JsonLd from '@/components/JsonLd';
import Qa, { type QaItem } from '@/components/Qa';
import PageNote, { SOURCES } from '@/components/PageNote';
import { pageMeta } from '@/lib/site';
import { pageGraph, service, faq } from '@/lib/schema';

const META = {
  title: 'Porcelain Veneers in Metro Atlanta | Dr. Eric Ennuson, DDS',
  description: 'Porcelain veneers by a licensed dentist serving metro Atlanta and Gwinnett: who they suit, how much tooth is removed, the visits, lifespan, and cost.',
  path: '/veneers/',
  image: '/og/veneers.jpg',
};
export const metadata = pageMeta(META);

const QA: QaItem[] = [
  { q: 'Do veneers hurt?', text: 'Preparation is done under local anesthesia. Most patients report pressure rather than sharp pain, and some sensitivity for a few days afterward is normal. You leave with temporaries the same day.',
    a: 'Preparation is done under local anesthesia. Most patients report pressure rather than sharp pain, and some sensitivity for a few days afterward is normal. You leave with temporaries the same day, so you are never walking around mid-treatment.' },
  { q: 'Do veneers ruin your teeth?', text: 'Veneers are not reversible, because a thin layer of enamel is removed so the porcelain sits flush. Done conservatively on healthy teeth, the tooth underneath stays alive and intact. Damage comes from over-preparation and from bonding over untreated decay or gum disease.',
    a: 'Veneers are not reversible, because a thin layer of enamel is removed so the porcelain sits flush. Done conservatively on healthy teeth, the tooth underneath stays alive and intact. The damage people see online comes from over-preparation, and from porcelain bonded over untreated decay or gum disease.' },
  { q: 'Do you shave the teeth down to pegs?', text: 'No. Peg-shaped preparation is crown preparation. Veneer preparation removes a thin layer from the front surface only, roughly the thickness of the porcelain that replaces it.',
    a: 'No. Teeth filed to pegs have been prepared for crowns, not veneers, and that is a hallmark of aggressive overseas work. Veneer preparation removes a thin layer from the front surface only, roughly the thickness of the porcelain that replaces it.' },
  { q: 'Can you get veneers without shaving?', text: 'Sometimes. No-prep or minimal-prep veneers can work when teeth are small, set back, or gapped. On teeth that are already full-sized or flared, adding porcelain without removing anything makes them bulky.',
    a: 'Sometimes. No-prep or minimal-prep veneers can work when teeth are small, set back, or gapped. On teeth that are already full-sized or flared, adding porcelain without removing anything makes them look bulky. The photographs and wax-up show which case you are.' },
  { q: 'How long do porcelain veneers last?', text: 'Ten to fifteen years is typical with proper care. Grinding without a night guard, nail biting, and using teeth as tools shorten that. A guard, normal brushing and flossing, and regular cleanings extend it.',
    a: 'Ten to fifteen years is typical with proper care. What shortens that: grinding without a night guard, nail biting, opening packages with your teeth. What extends it: a guard, normal brushing and flossing, regular cleanings.' },
  { q: 'Will they look fake?', text: 'Veneers look fake when they are one flat shade of white or shaped without regard to the face. Shade and translucency are matched to your skin and the shapes are designed from your facial photography.',
    a: <>Veneers look fake for two reasons: one flat shade of white, and shapes that ignore the face around them. Here the shade and translucency are <Link className="link" href="/smile-design/">matched to your skin</Link> and the shapes are designed from your facial photography.</> },
  { q: 'What if I hate them?', text: 'You approve a wax-up preview, then wear trial temporaries shaped like the final design in your real life. The design is revised until you approve it. Porcelain is only made from a design you have already lived with.',
    a: 'You approve a wax-up you can hold, then wear trial temporaries shaped like the final design in your real life: talking, eating, photographs. The design is revised until you approve it. Porcelain is only made from a design you have already lived with.' },
  { q: 'How much do veneers cost?', text: 'A full-arch smile design is $8,999, published on the pricing page. Smaller cases are quoted in writing at the consultation. Financing is available through third-party lenders, subject to credit approval.',
    a: <>A full-arch smile design is $8,999, published on the <Link className="link" href="/pricing/">pricing page</Link> and the same everywhere. Smaller cases are quoted in writing at your consultation. Financing through third-party lenders is available, subject to credit approval.</> },
];

const visits = [
  { t: 'Consultation', b: 'Sixty minutes. Photography, facial analysis, a gum health check, and an honest answer to whether veneers are right for you at all.', src: '/photos/consult-screen.webp', alt: 'Dr. Ennuson reviewing images with a patient at a veneer consultation' },
  { t: 'Smile planning', b: 'Shade chosen against your skin in daylight, a wax-up preview of the design, and the full price in writing.', src: '/photos/consult-whitecoat.webp', alt: 'Dr. Eric Ennuson, DDS, during smile planning' },
  { t: 'Prep and temporaries', b: 'Conservative preparation, fully numbed. You leave the same day wearing temporaries shaped like your final design.', src: '/photos/loupes-side.webp', alt: 'Dr. Ennuson in magnification loupes during veneer preparation' },
  { t: 'Final placement', b: 'Your porcelain is bonded, the bite is refined, and you get a written care plan for the next ten to fifteen years.', src: '/photos/chairside.webp', alt: 'Dr. Ennuson bonding porcelain veneers at final placement' },
];

const vs = [
  ['Made where', 'In a dental lab, from your approved design', 'Sculpted chairside from filling material'],
  ['Typical lifespan', 'Ten to fifteen years', 'Four to seven years'],
  ['Stain', 'Resists stain and holds its polish', 'Stains and dulls over time'],
  ['Design proof', 'Wax-up, then trial temporaries you live with', 'Shaped in the chair, in one sitting'],
  ['Repair', 'Replaceable decades from now if tooth structure is preserved', 'Patched; usually replaced sooner'],
];

export default function Veneers() {
  return (
    <>
      <JsonLd data={pageGraph({
        path: META.path, name: META.title, description: META.description, type: 'MedicalWebPage',
        extra: [
          service(META.path, 'Porcelain veneers', 'Lab-fabricated porcelain veneers placed by a licensed dentist, with the design approved through a wax-up and trial temporaries before fabrication.', { price: '8999', description: 'Full-arch smile design, up to ten porcelain veneers' }),
          faq(QA.map((x) => [x.q, x.text])),
        ],
      })} />

      <section className="band" style={{ paddingTop: 'clamp(56px, 8vw, 120px)' }}>
        <div className="wrap grid">
          <div className="c-1-11">
            <h1>
              <span className="rise"><span>Porcelain veneers.</span></span>
              <span className="rise"><span style={{ ['--d' as string]: '0.1s' }}>Lab-made, conservative.</span></span>
              <span className="rise"><span style={{ ['--d' as string]: '0.2s' }}><em>No guesswork.</em></span></span>
            </h1>
          </div>
          <div className="c-8-13 fade-in" style={{ alignSelf: 'end' }}>
            <p className="lede">
              A porcelain veneer is a thin ceramic shell, made in a dental lab and bonded to the front of a tooth to change its
              color, shape, or size. Dr. Eric Ennuson, DDS, places them for patients across metro Atlanta from his practice in
              Lawrenceville. He removes only what the porcelain needs to fit and last, and you approve the design before anything
              permanent happens.
            </p>
          </div>
        </div>
      </section>

      {/* What porcelain changes — a real anatomical model you can drag, not a patient */}
      <section className="band" style={{ paddingTop: 0 }}>
        <div className="wrap grid" style={{ marginBottom: 'clamp(24px, 4vw, 40px)' }}>
          <div className="c-1-6"><h2>What porcelain changes.</h2></div>
          <div className="c-7-13" style={{ alignSelf: 'end' }}>
            <p className="lede">Shade, surface, and the edges that catch light — on the teeth that show when you smile. Drag from before to after; the back teeth stay as they are, because that is where veneers stop.</p>
          </div>
        </div>
        <div className="wrap"><TeethModelClient /></div>
      </section>

      <section className="band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>
            <div className="c-1-6"><h2>Who veneers suit, and who should wait.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">Veneers change how healthy teeth look. They do not treat disease, and bonding porcelain over a problem only hides it. The exam decides which list you are on.</p></div>
          </div>
          <div className="cand">
            <div className="cand-col">
              <h3>Usually a good fit</h3>
              <ul>
                <li><b>Stains whitening cannot lift,</b> including tetracycline and fluorosis marks.</li>
                <li><b>Chips, worn edges, and uneven lengths</b> on otherwise sound teeth.</li>
                <li><b>Gaps and small or uneven teeth</b> you would rather not treat with braces.</li>
                <li><b>Mild crowding or rotation</b> where the bite itself is healthy.</li>
                <li><b>Old bonding or veneers</b> that have stained, chipped, or aged.</li>
              </ul>
            </div>
            <div className="cand-col cand-wait">
              <h3>Something else comes first</h3>
              <ul>
                <li><b>Gum disease or decay.</b> Both are treated before any cosmetic work.</li>
                <li><b>Heavy grinding or clenching.</b> Possible, with a night guard built into the plan.</li>
                <li><b>Significant crowding or bite problems.</b> Aligners first, then veneers on straight teeth.</li>
                <li><b>Very little enamel left.</b> A crown may protect the tooth better than a veneer.</li>
                <li><b>Color is the only concern.</b> Professional whitening is cheaper and takes nothing away.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="band anchor" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>
            <div className="c-1-6"><h2>Three to four visits, in order.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">Consultation and planning are often the same appointment. Nothing permanent happens until preparation, and porcelain is not made until you have worn the design.</p></div>
          </div>
          <ol className="vsteps">
            {visits.map((v, i) => (
              <li key={v.t} className="vstep">
                <div className="vstep-ph"><img src={v.src} alt={v.alt} loading="lazy" decoding="async" /></div>
                <span className="vstep-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{v.t}</h3>
                <p>{v.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band" style={{ paddingTop: 0 }}>
        <div className="wrap grid">
          <div className="c-1-5"><h2>How much tooth is removed?</h2></div>
          <div className="c-6-13">
            <p className="lede">
              Usually about half a millimeter of enamel from the front of the tooth, close to the thickness of a fingernail and
              close to the thickness of the porcelain that replaces it.
            </p>
            <p style={{ marginTop: 20 }}>
              The amount depends on where your teeth sit now. A tooth that is set back or small may need almost nothing. A tooth that
              flares forward or is heavily stained needs a little more room so the result is not bulky or gray. Preparation is planned
              on the wax-up before it is ever done in the mouth, and it is carried out under magnification.
            </p>
            <dl className="facts" style={{ marginTop: 32 }}>
              <div><dt>Anesthesia</dt><dd>Local anesthetic for preparation. You drive yourself home.</dd></div>
              <div><dt>Temporaries</dt><dd>Placed the same day, shaped like the approved design, and worn while the lab makes the porcelain.</dd></div>
              <div><dt>Reversible?</dt><dd>No. Once enamel is removed the tooth will always need a covering, which is why the design is proven first.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            <div className="c-1-6"><h2>Veneers, or something else?</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">Veneers are one of five ways to change a smile. An honest consultation covers all of them, including the ones that cost less.</p></div>
          </div>
          <div className="opt">
            <div className="opt-row opt-head"><span>Option</span><span>What it is</span><span>Suits</span><span>Typically lasts</span></div>
            <div className="opt-row is-us"><span className="opt-k">Porcelain veneers</span><span data-l="What">Lab-made ceramic bonded to the front of the tooth</span><span data-l="Suits">Color, shape, size, and small gaps across several teeth at once</span><span data-l="Lasts">10 to 15 years</span></div>
            <div className="opt-row"><span className="opt-k">Composite bonding</span><span data-l="What">Tooth-colored resin sculpted in the chair</span><span data-l="Suits">One or two chips or small gaps, on a smaller budget</span><span data-l="Lasts">4 to 7 years</span></div>
            <div className="opt-row"><span className="opt-k">Crowns</span><span data-l="What">A cap covering the whole tooth</span><span data-l="Suits">Teeth that are broken, heavily filled, or root-canal treated</span><span data-l="Lasts">10 to 15 years</span></div>
            <div className="opt-row"><span className="opt-k">Clear aligners</span><span data-l="What">Removable trays that move teeth</span><span data-l="Suits">Crowding, spacing, and bite problems, with nothing removed</span><span data-l="Lasts">With a retainer</span></div>
            <div className="opt-row"><span className="opt-k">Whitening</span><span data-l="What">Professional bleaching of natural enamel</span><span data-l="Suits">Color only, on teeth whose shape you already like</span><span data-l="Lasts">Months to a few years</span></div>
          </div>
        </div>
      </section>

      <section className="on-ink band">
        <div className="wrap grid">
          <div className="c-1-6">
            <Photo src="/photos/loupes-macro.webp" alt="Close-up of Dr. Ennuson's magnification loupes and headlight" width={1024} height={626} ratio="4 / 3" />
          </div>
          <div className="c-7-13" style={{ alignSelf: 'center' }}>
            <h2>Why porcelain, not composite.</h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Composite veneers are sculpted chairside from filling material. Faster and cheaper, and they stain, chip, and usually
              need replacing in four to seven years.
            </p>
            <p style={{ marginTop: 20, color: 'var(--on-ink-2)' }}>
              Porcelain is made in a dental lab from your approved design. It resists stain, holds its polish, and typically lasts
              ten to fifteen years. We plan smiles in decades. If composite is genuinely the right call for your case, we will say so.
            </p>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 'clamp(40px, 6vw, 80px)' }}>
          <div className="vs">
            <div className="vs-row vs-head"><span /><span className="vs-gold">Porcelain</span><span>Composite</span></div>
            {vs.map(([k, a, b]) => (
              <div key={k} className="vs-row"><span className="vs-k">{k}</span><span className="vs-gold">{a}</span><span className="vs-b">{b}</span></div>
            ))}
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 'clamp(40px, 6vw, 80px)' }}>
          <p className="kicker">Porcelain, placed. Each case shows its before.</p>
        </div>
        <CaseMarquee />
      </section>

      <section className="band">
        <div className="wrap grid">
          <div className="c-1-5">
            <h2>Living with veneers.</h2>
            <p className="lede" style={{ marginTop: 20 }}>Care is ordinary. The few rules that matter are about force, not cleaning.</p>
          </div>
          <div className="c-6-13">
            <dl className="facts">
              <div><dt>Daily</dt><dd>Brush and floss as usual with a non-abrasive toothpaste. Porcelain does not decay, but the tooth and gum around it can.</dd></div>
              <div><dt>At night</dt><dd>If you clench or grind, wear the night guard. It is the single biggest factor in how long veneers last.</dd></div>
              <div><dt>Force</dt><dd>No ice, pens, nails, or packaging. Bite hard foods with your back teeth.</dd></div>
              <div><dt>Color</dt><dd>Porcelain resists stain and does not whiten. Whiten natural teeth before the shade is chosen, not after.</dd></div>
              <div><dt>Checkups</dt><dd>Cleanings twice a year. Tell the hygienist you have veneers so the right polish is used.</dd></div>
              <div><dt>Later</dt><dd>Veneers are replaced when they wear, chip, or the gum line changes. Conservative preparation now is what makes that straightforward.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section id="faq" className="band anchor" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            <div className="c-1-6"><h2>Veneer questions, answered plainly.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}>
              <p className="lede">Ask the rest in person. Evening and weekend consultations, no obligation: <a className="link" href="tel:+14043834574">(404) 383-4574</a>.</p>
            </div>
          </div>
          <Qa items={QA} />
          <div className="btn-row" style={{ marginTop: 36 }}>
            <Link className="btn solid" href="/consultation/">Book a consultation</Link>
            <Link className="btn" href="/pricing/">See the price</Link>
            <Link className="btn" href="/fix-botched-veneers/">Fixing veneers done elsewhere</Link>
          </div>
        </div>
      </section>

      <PageNote sources={[SOURCES.adaVeneers, SOURCES.adaStatement, SOURCES.gaLookup]} />
    </>
  );
}
