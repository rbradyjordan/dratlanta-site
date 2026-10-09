import Link from 'next/link';
import Photo from '@/components/Photo';
import { SITE, pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Contact and Directions | Dr. Atlanta, Lawrenceville GA',
  description: 'Dr. Eric Ennuson, DDS, sees veneer patients at BRUSH Dentistry, 1475 Buford Dr, Lawrenceville, GA 30043. Call or text (404) 383-4574.',
  path: '/contact/',
  image: '/og/lawrenceville.jpg',
});

const areas = ['Lawrenceville', 'Buford', 'Suwanee', 'Duluth', 'Dacula', 'Sugar Hill', 'Snellville', 'Grayson', 'Norcross', 'Johns Creek', 'Braselton', 'Atlanta'];

export default function Contact() {
  return (
    <>
      <section className="band" style={{ paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 'var(--rhythm-s)' }}>
        <div className="wrap grid">
          <div className="c-1-11">
            <h1>
              <span className="rise"><span>A real address.</span></span>
              <span className="rise"><span style={{ ['--d' as string]: '0.1s' }}><em>One you can walk into.</em></span></span>
            </h1>
          </div>
          <div className="c-8-13 fade-in" style={{ alignSelf: 'end' }}>
            <p className="lede">
              {SITE.doctor}, sees veneer and smile makeover patients at {SITE.practice} in {SITE.city}, Georgia, serving metro Atlanta
              and {SITE.county}.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap grid" style={{ paddingBottom: 'var(--rhythm)' }}>
        <div className="c-1-6">
          <Photo src="/photos/brush-sign.webp" alt="Dr. Eric Ennuson in front of the BRUSH Dentistry sign at 1475 Buford Dr, Lawrenceville" width={1024} height={1535} ratio="4 / 5" position="50% 35%" />
        </div>
        <div className="c-7-13" style={{ alignSelf: 'center' }}>
          <dl className="facts">
            <div>
              <dt>Address</dt>
              <dd>
                <address style={{ fontStyle: 'normal' }}>
                  {SITE.name}<br />at {SITE.practice}<br />{SITE.street}<br />{SITE.city}, {SITE.region} {SITE.postal}
                </address>
                <a className="link" href={SITE.mapsUrl} target="_blank" rel="noopener" style={{ display: 'inline-block', marginTop: 10 }}>Get directions</a>
              </dd>
            </div>
            <div><dt>Phone</dt><dd><a className="link" href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a> &nbsp;call or text</dd></div>
            <div><dt>Email</dt><dd><a className="link" href={`mailto:${SITE.email}`}>{SITE.email}</a></dd></div>
            <div><dt>Consultations</dt><dd>By appointment, including evening and weekend times. Sixty minutes, no obligation.</dd></div>
          </dl>
          <div className="btn-row" style={{ marginTop: 28 }}>
            <Link className="btn solid" href="/consultation/">Book a consultation</Link>
            <a className="btn" href={`tel:${SITE.phoneE164}`}>Call {SITE.phone}</a>
          </div>
        </div>
      </section>

      <section className="on-ink band">
        <div className="wrap grid">
          <div className="c-1-5">
            <h2>Where patients come from.</h2>
          </div>
          <div className="c-6-13">
            <p className="lede">
              The practice is on Buford Drive in Lawrenceville, in the middle of Gwinnett County. Patients drive in from across the
              northeast side of metro Atlanta and beyond for veneer and correction work.
            </p>
            <ul className="areas">
              {areas.map((a) => <li key={a}>{a}</li>)}
            </ul>
            <p style={{ marginTop: 24, color: 'var(--on-ink-2)' }}>
              <Link className="link" href="/veneers-lawrenceville-ga/" style={{ color: 'var(--on-ink)' }}>Veneers in Lawrenceville and Gwinnett County</Link>.
              {' '}Coming from farther away? The consultation, photographs, and plan happen in one visit, and the team can schedule
              preparation and placement to keep your trips to a minimum.
            </p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap grid">
          <div className="c-1-5"><h2>Before you come in.</h2></div>
          <div className="c-6-13 faq">
            <details>
              <summary>Is the consultation really free of pressure?</summary>
              <p className="a">Yes. You leave with photographs, an honest read on whether veneers suit you, and the full price in writing. What happens next is your call, on your timeline. <Link className="link" href="/consultation/">See how the hour runs</Link>.</p>
            </details>
            <details>
              <summary>Do I need a referral or recent X-rays?</summary>
              <p className="a">No referral. If you have X-rays from the last year, bring them or have your dentist send them; otherwise they are taken at the visit.</p>
            </details>
            <details>
              <summary>Can I verify Dr. Ennuson&rsquo;s license?</summary>
              <p className="a">You should, for him and for anyone else offering veneers. The Georgia Board of Dentistry runs a public license lookup. <Link className="link" href="/why-licensed/">Why the license matters</Link>.</p>
            </details>
            <details>
              <summary>What will it cost?</summary>
              <p className="a">A full-arch smile design is $8,999, published on the <Link className="link" href="/pricing/">pricing page</Link>. Smaller cases are quoted in writing at the consultation.</p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
