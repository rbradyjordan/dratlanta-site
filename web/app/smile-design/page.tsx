import Link from 'next/link';
import ShadeStudio from '@/components/ShadeStudio';
import Photo from '@/components/Photo';
import TextScrub from '@/components/TextScrub';
import CaseMarquee from '@/components/CaseMarquee';
import JsonLd from '@/components/JsonLd';
import Qa, { type QaItem } from '@/components/Qa';
import PageNote from '@/components/PageNote';
import { pageMeta } from '@/lib/site';
import { pageGraph, faq } from '@/lib/schema';

const META = {
  title: 'Veneer Shade Guide: Match Your Skin Tone | Dr. Atlanta',
  description: 'Which veneer shade suits your skin tone and undertone? Try porcelain shades in the interactive studio, then choose in daylight with Dr. Eric Ennuson, DDS.',
  path: '/smile-design/',
  image: '/og/shade.jpg',
};
export const metadata = pageMeta(META);

const QA: QaItem[] = [
  { q: 'What veneer shade looks most natural?', text: 'For most people the most natural veneer shades are B1 and A1, the brightest shades that occur in natural teeth. Bleach shades (BL1 to BL4) are brighter than natural enamel and read as a deliberate choice.',
    a: 'For most people, B1 or A1: the brightest shades that occur in natural teeth. Bleach shades (BL1 to BL4) are brighter than any natural enamel. They can look striking, but they read as a decision, not as your own teeth.' },
  { q: 'Which veneer shade suits my skin tone?', text: 'It depends on contrast and undertone, not on a single rule. Deeper skin makes any shade read brighter, so a step warmer or softer often looks more natural. Cool undertones suit neutral whites; warm undertones suit shades with a little warmth.',
    a: 'It depends on contrast and undertone. Deeper skin makes any shade read brighter by contrast, so a step softer often looks more natural than the top of the chart. Cool undertones tend to suit neutral whites, and warm undertones suit shades with a little warmth in them. The studio above shows the effect; daylight and real shade tabs settle it.' },
  { q: 'Should veneers be whiter than the whites of my eyes?', text: 'A common rule of thumb is that teeth brighter than the whites of the eyes start to look artificial. It is a guide, not a limit, and some patients choose to go brighter on purpose.',
    a: 'A common rule of thumb says teeth brighter than the whites of your eyes start to look artificial. It is a guide, not a limit. Some patients go brighter on purpose, and that is their call once they have seen it on their own face.' },
  { q: 'Can I change the shade after veneers are placed?', text: 'No. Porcelain does not respond to whitening, and changing the shade means replacing the veneers. That is why the shade is tested with trial temporaries before the porcelain is made.',
    a: 'No. Porcelain does not respond to whitening, and changing the shade means replacing the veneers. That is the reason the shade is tested on trial temporaries, in your real life, before any porcelain is made.' },
];

export default function SmileDesign() {
  return (
    <>
      <JsonLd data={pageGraph({ path: META.path, name: META.title, description: META.description, extra: [faq(QA.map((x) => [x.q, x.text]))] })} />
      <section className="band" style={{ paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 'var(--rhythm-s)' }}>
        <div className="wrap">
          <h1 style={{ maxWidth: '13em' }}>
            <span className="rise"><span>Veneer shade,</span></span>
            <span className="rise"><span style={{ ['--d' as string]: '0.1s' }}>matched to you.</span></span>
            <span className="rise"><span style={{ ['--d' as string]: '0.2s' }}><em>Not to a chart.</em></span></span>
          </h1>
          <p className="lede fade-in" style={{ marginTop: 'clamp(24px, 3vw, 40px)' }}>
            The right veneer shade depends on your skin tone and undertone, because the same porcelain reads differently against every
            face. Most shades get picked off a chart held against the teeth alone. Pick your tone, tap a shade, and slide the
            translucency to see why that falls short.
          </p>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 'var(--rhythm)' }}>
        <ShadeStudio />
      </section>

      <section id="chart" className="band anchor" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            <div className="c-1-6"><h2>The veneer shade chart, in plain terms.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">Dental shades run from bleach whites that do not exist in nature to the warm tones most adult teeth actually are. These are the six most people choose between.</p></div>
          </div>
          <div className="opt">
            <div className="opt-row opt-head"><span>Shade</span><span>How it reads</span><span>Tends to suit</span><span>Family</span></div>
            <div className="opt-row"><span className="opt-k">BL1</span><span data-l="Reads">The brightest porcelain made. Unmistakably white.</span><span data-l="Suits">Patients who want a bold, high-contrast smile and have seen it on their own face first</span><span data-l="Family">Bleach</span></div>
            <div className="opt-row"><span className="opt-k">BL2</span><span data-l="Reads">Very bright with slightly more depth</span><span data-l="Suits">Cool or neutral undertones. Contrast makes it read brighter still on deeper skin</span><span data-l="Family">Bleach</span></div>
            <div className="opt-row"><span className="opt-k">BL3</span><span data-l="Reads">Bright, with the first hint of natural warmth</span><span data-l="Suits">A wide range of skin tones when the edges are kept translucent</span><span data-l="Family">Bleach</span></div>
            <div className="opt-row is-us"><span className="opt-k">B1</span><span data-l="Reads">The brightest shade found in natural teeth</span><span data-l="Suits">Nearly everyone. The usual answer for “white, but mine”</span><span data-l="Family">Natural</span></div>
            <div className="opt-row"><span className="opt-k">A1</span><span data-l="Reads">Bright with gentle warmth</span><span data-l="Suits">Warm undertones, and anyone matching veneers to natural teeth</span><span data-l="Family">Natural</span></div>
            <div className="opt-row"><span className="opt-k">A2</span><span data-l="Reads">Soft and warm, the average healthy adult tooth</span><span data-l="Suits">Single veneers that must disappear beside unwhitened teeth</span><span data-l="Family">Natural</span></div>
          </div>
          <p className="fine" style={{ marginTop: 20 }}>Shade names follow the VITA classical and bleach guides used by dental labs. A screen can only approximate porcelain; the decision is made with physical tabs in daylight.</p>
        </div>
      </section>

      <section className="on-ink band">
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>
            <div className="c-1-6"><h2>Three decisions most providers skip.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">A shade code on a lab form is one number. A face needs three.</p></div>
          </div>
          <ol className="dec">
            <li className="dec-card">
              <span className="dec-n">01</span>
              <h3>Undertone before shade</h3>
              <p>Warm, cool, or neutral undertones change how one shade reads. A tab that flatters one face reads chalky and flat on another. We test shade tabs against your skin in daylight-balanced light, not just against your teeth.</p>
            </li>
            <li className="dec-card">
              <span className="dec-n">02</span>
              <h3>Value and translucency, specified</h3>
              <p>Natural enamel is not opaque. Too sheer goes gray and dull; too opaque goes denture-flat. We specify the translucency with the ceramist layer by layer. That is what the word custom is supposed to mean.</p>
            </li>
            <li className="dec-card">
              <span className="dec-n">03</span>
              <h3>The gum line is part of the design</h3>
              <p>Margin placement and the transition at the gum are planned, not left to chance, so the porcelain meets the tissue and disappears. Every case is photographed to hold us to it.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="bleed">
        <div className="bleed-media" aria-hidden="true">
          <img src="/photos/loupes-light.webp" alt="" width={2048} height={1366} loading="lazy" decoding="async" />
        </div>
        <div className="wrap grid" style={{ padding: 'var(--rhythm-s) 0' }}>
          <div className="c-1-8">
            <TextScrub className="statement" text="Daylight does not lie. A shade that looks right under an operatory lamp and wrong on the sidewalk is wrong. So the tabs go against your skin by the window, and the photographs go to the lab with the color calibrated." />
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap grid">
          <div className="c-1-6">
            <Photo src="/photos/loupes-side.webp" alt="Dr. Ennuson wearing magnification loupes, lit from the window" width={1024} height={1536} />
          </div>
          <div className="c-7-13" style={{ alignSelf: 'center' }}>
            <h2>The lab sees what we see.</h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Every case is documented in color-calibrated photography — full face, smile, macro — so the ceramist is working
              from your face, not from a shade code on a form.
            </p>
            <p style={{ marginTop: 20 }}>
              Then the design is proven twice before porcelain exists: a wax-up you hold, and trial temporaries you wear in real life.
              If the value is wrong in daylight, we change the design, not your expectations.
            </p>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <Link className="btn solid" href="/consultation/">Pick your shade in daylight</Link>
              <Link className="btn" href="/results/">See cases across skin tones</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 style={{ marginBottom: 'clamp(28px, 4vw, 44px)', maxWidth: '14em' }}>Veneer shade questions.</h2>
          <Qa items={QA} />
        </div>
      </section>

      <section className="on-ink" style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="wrap"><p className="kicker">Cases across skin tones. Each one shows its before.</p></div>
        <CaseMarquee />
      </section>
      <PageNote results />
    </>
  );
}
