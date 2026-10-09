import Link from 'next/link';
import Photo from '@/components/Photo';
import CaseMarquee from '@/components/CaseMarquee';
import JsonLd from '@/components/JsonLd';
import Qa, { type QaItem } from '@/components/Qa';
import PageNote from '@/components/PageNote';
import { SITE, pageMeta } from '@/lib/site';
import { pageGraph, service, faq } from '@/lib/schema';

const META = {
  title: 'Veneers in Lawrenceville, GA & Gwinnett County | Dr. Atlanta',
  description: 'Porcelain veneers in Lawrenceville, GA, by Dr. Eric Ennuson, DDS, at 1475 Buford Dr. Serving Buford, Suwanee, Duluth, and Gwinnett. $8,999 full arch.',
  path: '/veneers-lawrenceville-ga/',
  image: '/og/lawrenceville.jpg',
};
export const metadata = pageMeta(META);

const towns = ['Lawrenceville', 'Buford', 'Suwanee', 'Duluth', 'Dacula', 'Sugar Hill', 'Snellville', 'Grayson', 'Norcross', 'Braselton', 'Johns Creek'];

const QA: QaItem[] = [
  { q: 'Where can I get porcelain veneers in Lawrenceville, GA?', text: 'Dr. Eric Ennuson, DDS, places porcelain veneers at BRUSH Dentistry, 1475 Buford Dr, Suite 204, Lawrenceville, GA 30043. Consultations are by appointment, including evenings and weekends.',
    a: <>{SITE.doctor}, places porcelain veneers at {SITE.practice}, {SITE.street}, {SITE.city}, {SITE.region} {SITE.postal}. Consultations are by appointment, including evening and weekend times. <Link className="link" href="/contact/">Directions</Link>.</> },
  { q: 'How much do veneers cost in Lawrenceville?', text: 'A full-arch porcelain veneer smile design is $8,999 at this practice. Cases of one to eight veneers are quoted in writing at the consultation.',
    a: <>A full-arch porcelain veneer smile design is $8,999 here, published on the <Link className="link" href="/pricing/">pricing page</Link>. Cases of one to eight veneers are quoted in writing at the consultation.</> },
  { q: 'Do patients come from Atlanta?', text: 'Yes. Patients come from across metro Atlanta. The consultation, photographs, and plan happen in one visit, and later visits can be scheduled to keep trips to a minimum.',
    a: 'Yes, from across metro Atlanta. The consultation, photographs, and plan happen in one visit, and the team schedules preparation and placement to keep your trips to a minimum.' },
  { q: 'Is Dr. Ennuson a licensed dentist?', text: 'Yes. Dr. Eric Ennuson, DDS, is licensed by the Georgia Board of Dentistry. Anyone can verify a Georgia dental license on the board’s public lookup.',
    a: <>Yes. He is licensed by the Georgia Board of Dentistry, and you can <a className="link" href={SITE.licenseLookup} target="_blank" rel="noopener">verify that yourself</a>. Check anyone who offers you veneers the same way. <Link className="link" href="/why-licensed/">Why it matters</Link>.</> },
];

export default function VeneersLawrenceville() {
  return (
    <>
      <JsonLd data={pageGraph({
        path: META.path, name: META.title, description: META.description,
        extra: [
          service(META.path, 'Porcelain veneers in Lawrenceville, GA', 'Porcelain veneers, smile makeovers, and veneer correction at 1475 Buford Dr, Lawrenceville, for patients across Gwinnett County and metro Atlanta.', { price: '8999', description: 'Full-arch smile design, up to ten porcelain veneers' }),
          faq(QA.map((x) => [x.q, x.text])),
        ],
      })} />

      <section className="band" style={{ paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 'var(--rhythm-s)' }}>
        <div className="wrap grid">
          <div className="c-1-11">
            <h1>
              <span className="rise"><span>Porcelain veneers</span></span>
              <span className="rise"><span style={{ ['--d' as string]: '0.1s' }}>in Lawrenceville, GA.</span></span>
              <span className="rise"><span style={{ ['--d' as string]: '0.2s' }}><em>Close to home in Gwinnett.</em></span></span>
            </h1>
          </div>
          <div className="c-1-7 fade-in">
            <p className="lede">
              {SITE.doctor}, designs and places porcelain veneers at {SITE.practice} on Buford Drive in Lawrenceville. The practice is
              in the middle of Gwinnett County, a short drive from Buford, Suwanee, Duluth, and Dacula, and patients come from across
              metro Atlanta. A full-arch smile design is $8,999, published.
            </p>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <Link className="btn solid" href="/consultation/">Book a consultation</Link>
              <a className="btn" href={SITE.mapsUrl} target="_blank" rel="noopener">Get directions</a>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap grid" style={{ paddingBottom: 'var(--rhythm)' }}>
        <div className="c-1-6">
          <Photo src="/photos/brush-sign.webp" alt="Dr. Eric Ennuson at BRUSH Dentistry, 1475 Buford Dr, Lawrenceville, GA" width={1024} height={1535} ratio="4 / 5" position="50% 35%" />
        </div>
        <div className="c-7-13" style={{ alignSelf: 'center' }}>
          <h2 style={{ marginBottom: 'clamp(24px, 3vw, 36px)' }}>The practice.</h2>
          <dl className="facts">
            <div>
              <dt>Address</dt>
              <dd><address style={{ fontStyle: 'normal' }}>{SITE.name}<br />at {SITE.practice}<br />{SITE.street}<br />{SITE.city}, {SITE.region} {SITE.postal}</address></dd>
            </div>
            <div><dt>Phone</dt><dd><a className="link" href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a> &nbsp;call or text</dd></div>
            <div><dt>Hours</dt><dd>Consultations by appointment, including evenings and weekends.</dd></div>
            <div><dt>Dentist</dt><dd><Link className="link" href="/about/">{SITE.doctor}</Link>, {SITE.school}. Licensed by the Georgia Board of Dentistry.</dd></div>
          </dl>
        </div>
      </section>

      <section className="on-ink band">
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>
            <div className="c-1-6"><h2>What you can have done here.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">One dentist, one focus. Everything below is planned from photographs and proven on trial temporaries before porcelain is made.</p></div>
          </div>
          <ol className="dec">
            <li className="dec-card">
              <span className="dec-n">01</span>
              <h3>Porcelain veneers</h3>
              <p>Lab-made porcelain for color, shape, chips, and gaps, on one tooth or a full smile. Conservative preparation, shade chosen against your skin in daylight. <Link className="link" href="/veneers/">How veneers work</Link>.</p>
            </li>
            <li className="dec-card">
              <span className="dec-n">02</span>
              <h3>Smile makeovers</h3>
              <p>A full-arch design of up to ten veneers with planning, temporaries, and placement for $8,999. <Link className="link" href="/pricing/">What the price includes</Link>.</p>
            </li>
            <li className="dec-card">
              <span className="dec-n">03</span>
              <h3>Veneer correction</h3>
              <p>Repair and replacement of veneers that failed, look wrong, or were placed without a license or abroad. <Link className="link" href="/fix-botched-veneers/">How correction works</Link>.</p>
            </li>
          </ol>
        </div>
        <div className="wrap" style={{ marginTop: 'clamp(40px, 6vw, 80px)' }}>
          <p className="kicker">Patients of the practice. Each case shows its before.</p>
        </div>
        <CaseMarquee />
      </section>

      <section className="band">
        <div className="wrap grid">
          <div className="c-1-5">
            <h2>Serving Gwinnett County and metro Atlanta.</h2>
          </div>
          <div className="c-6-13">
            <p className="lede">
              The practice sits on Buford Drive (GA-20) in Lawrenceville. Patients come from the towns around it and from across metro
              Atlanta.
            </p>
            <ul className="areas areas-light">
              {towns.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <p style={{ marginTop: 24, color: 'var(--text-2)' }}>
              Veneers usually take three to four visits over a few weeks: a consultation with photographs, preparation with same-day
              temporaries, and placement. Evening and weekend times are available so the visits fit around work.
            </p>
          </div>
        </div>
      </section>

      <section className="band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 style={{ marginBottom: 'clamp(28px, 4vw, 44px)', maxWidth: '14em' }}>Veneers in Lawrenceville: quick answers.</h2>
          <Qa items={QA} />
          <div className="btn-row" style={{ marginTop: 36 }}>
            <Link className="btn solid" href="/consultation/">Book a consultation</Link>
            <Link className="btn" href="/results/">See before and after</Link>
          </div>
        </div>
      </section>

      <PageNote results />
    </>
  );
}
