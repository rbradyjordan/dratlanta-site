import ConsultPlanner from '@/components/ConsultPlanner';
import Photo from '@/components/Photo';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageNote from '@/components/PageNote';
import { SITE, pageMeta } from '@/lib/site';
import { pageGraph } from '@/lib/schema';

const META = {
  title: 'Book a Veneer Consultation in Metro Atlanta | Dr. Atlanta',
  description: 'A sixty-minute veneer consultation with Dr. Eric Ennuson, DDS, in Lawrenceville, GA: exam, photographs, shade, and the full price in writing.',
  path: '/consultation/',
};
export const metadata = pageMeta(META);

export default function Consultation() {
  return (
    <>
      <JsonLd data={pageGraph({ path: META.path, name: META.title, description: META.description })} />
      <section className="band" style={{ paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 'var(--rhythm-s)' }}>
        <div className="wrap grid">
          <div className="c-1-11">
            <h1>
              <span className="rise"><span>The veneer consultation.</span></span>
              <span className="rise"><span style={{ ['--d' as string]: '0.1s' }}>Sixty minutes.</span></span>
              <span className="rise"><span style={{ ['--d' as string]: '0.2s' }}><em>Zero pressure.</em></span></span>
            </h1>
          </div>
          <div className="c-8-13 fade-in" style={{ alignSelf: 'end' }}>
            <p className="lede">
              You leave knowing what is possible for your smile, what it costs, and what happens next — whether or not you ever book
              treatment. Evening and weekend appointments available. Or just call <a className="link" href="tel:+14043834574">(404) 383-4574</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 'var(--rhythm)' }}>
        <ConsultPlanner />
      </section>

      <section className="on-ink band">
        <div className="wrap grid">
          <div className="c-1-4">
            <Photo src="/photos/consult-screen.webp" alt="Dr. Ennuson walking a patient through images on screen" width={1024} height={1535} sizes="(max-width: 960px) 100vw, 33vw" />
          </div>
          <div className="c-5-13">
            <h2 style={{ marginBottom: 'clamp(32px, 5vw, 64px)', maxWidth: '12em' }}>The hour, in order.</h2>
          <ol className="steps" style={{ listStyle: 'none', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <li className="step">
              <h3>Talk first</h3>
              <p>What you want changed, what worries you, what your timeline and budget look like. No chair yet, no instruments.</p>
            </li>
            <li className="step">
              <h3>Exam and photographs</h3>
              <p>X-rays, a gum health check, and the same calibrated photography that guides the lab. If veneers are not right for you, this is where we say so.</p>
            </li>
            <li className="step">
              <h3>The plan</h3>
              <p>Shade direction against your skin in daylight, design approach, number of visits, and the full price in writing. Full-arch is $8,999, same as the website.</p>
            </li>
            <li className="step">
              <h3>You decide later</h3>
              <p>Take the plan home. Financing options if you want them, with a soft check only. Nobody follows you to the parking lot.</p>
            </li>
          </ol>
          </div>
        </div>
      </section>

      <section className="band" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            <div className="c-1-6"><h2>Where you&rsquo;ll be.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">{SITE.practice}, {SITE.street}, {SITE.city}, {SITE.region} {SITE.postal}. A fixed practice in metro Atlanta you can walk into. <Link className="link" href="/contact/">Directions and contact</Link>.</p></div>
          </div>
          <div className="gal3">
            <figure><Photo src="/photos/reception.webp" alt="The reception desk" width={1024} height={1535} ratio="4 / 5" sizes="(max-width: 960px) 100vw, 33vw" /><figcaption>Reception</figcaption></figure>
            <figure><Photo src="/photos/treatment-room.webp" alt="A treatment room" width={1024} height={1535} ratio="4 / 5" sizes="(max-width: 960px) 100vw, 33vw" /><figcaption>Treatment room</figcaption></figure>
            <figure><Photo src="/photos/operatory-light.webp" alt="Dr. Ennuson adjusting the operatory light" width={1024} height={1535} ratio="4 / 5" position="50% 30%" sizes="(max-width: 960px) 100vw, 33vw" /><figcaption>Operatory</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="band" style={{ paddingBottom: 0 }}>
        <div className="wrap grid">
          <div className="c-1-5">
            <h2>What to bring, and what you leave with.</h2>
          </div>
          <div className="c-6-13">
            <dl className="facts">
              <div><dt>Bring</dt><dd>Photographs of smiles you like and smiles you do not. They say more than adjectives.</dd></div>
              <div><dt>Bring</dt><dd>Any X-rays from the last year, or ask your dentist to send them. Otherwise they are taken here.</dd></div>
              <div><dt>Bring</dt><dd>Records of previous cosmetic work, especially if it was done abroad or you are unhappy with it.</dd></div>
              <div><dt>Leave with</dt><dd>An honest answer on whether veneers suit you, and what else would work if they do not.</dd></div>
              <div><dt>Leave with</dt><dd>A shade direction chosen against your skin in daylight.</dd></div>
              <div><dt>Leave with</dt><dd>The number of visits and the full price in writing. Full-arch is $8,999, the same as <Link className="link" href="/pricing/">the pricing page</Link>.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap grid">
          <div className="c-1-5">
            <h2>“What if I hate them?”</h2>
            <aside className="aside">
              <p className="aside-k">Rather talk first?</p>
              <a className="aside-tel" href="tel:+14043834574">(404) 383-4574</a>
              <p className="small">No obligation, no pressure, real answers.</p>
            </aside>
          </div>
          <div className="c-6-13">
            <p className="lede">
              You will never wake up to a permanent smile you have not seen. The design is proven twice before porcelain exists: a wax-up
              you can hold, then trial temporaries you wear in real life — work, photographs, dinner. Only a design you have approved is made.
            </p>
            <p style={{ marginTop: 20 }}>If the trial is not right, we change the design. That is not a favor. It is the process.</p>
          </div>
        </div>
      </section>
      <PageNote />
    </>
  );
}
