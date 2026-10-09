import Link from 'next/link';
import Photo from '@/components/Photo';
import PhotoMarquee from '@/components/PhotoMarquee';
import ProofCards from '@/components/ProofCards';
import { proof } from '@/lib/content';
import JsonLd from '@/components/JsonLd';
import { SITE, pageMeta } from '@/lib/site';
import { pageGraph } from '@/lib/schema';

const META = {
  title: 'Eric Ennuson, DDS | Veneers & Smile Design, Metro Atlanta',
  description: 'Dr. Eric Ennuson, DDS, is a USC-trained, Georgia-licensed dentist focused on porcelain veneers and smile makeovers, practicing in Lawrenceville, GA.',
  path: '/about/',
  image: '/og/about.jpg',
};
export const metadata = pageMeta(META);

export default function About() {
  return (
    <>
      <JsonLd data={pageGraph({ path: META.path, name: META.title, description: META.description, type: 'ProfilePage' })} />
      <section className="band" style={{ paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 'var(--rhythm-s)' }}>
        <div className="wrap grid">
          <div className="c-1-11">
            <h1>
              <span className="rise"><span>Eric Ennuson, DDS.</span></span>
              <span className="rise"><span style={{ ['--d' as string]: '0.1s' }}><em>Known as Dr. Atlanta.</em></span></span>
            </h1>
          </div>
          <div className="c-8-13 fade-in" style={{ alignSelf: 'end' }}>
            <p className="lede">
              Dr. Eric Ennuson is a dentist trained at the USC Herman Ostrow School of Dentistry and licensed by the Georgia Board of
              Dentistry. He sees patients from across metro Atlanta at BRUSH Dentistry in Lawrenceville, and his practice is focused on
              one thing: porcelain veneers and smile makeovers built on photography, facial analysis, and modern porcelain.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap grid" style={{ paddingBottom: 'var(--rhythm)' }}>
        <div className="c-1-6">
          <Photo src="/photos/ennuson-hallway.webp" alt="Dr. Eric Ennuson, arms crossed, in the practice hallway" width={1024} height={1535} />
        </div>
        <div className="c-7-13" style={{ alignSelf: 'center' }}>
          <p className="statement">
            The photographs come first. Full face, smile, macro — calibrated, so the ceramist is working from a person and not a shade code.
            Then the plan: conservative by conviction, because the best long-term result is the one that leaves you the most options
            decades from now.
          </p>
        </div>
      </section>

      <section className="on-ink band">
        <div className="wrap grid">
          <div className="c-1-4">
            <Photo src="/photos/reception.webp" alt="Dr. Ennuson at the BRUSH Dentistry reception" width={1024} height={1535} sizes="(max-width: 960px) 100vw, 33vw" />
          </div>
          <div className="c-5-13">
            <h2 style={{ marginBottom: 'clamp(28px, 4vw, 48px)' }}>The paperwork matters.</h2>
            <dl className="facts">
              <div><dt>Degree</dt><dd>Doctor of Dental Surgery, USC Herman Ostrow School of Dentistry</dd></div>
              <div><dt>License</dt><dd>Georgia Board of Dentistry. <a className="link" href={SITE.licenseLookup} target="_blank" rel="noopener">Verify any Georgia dentist&rsquo;s license</a> at the board&rsquo;s public lookup, including this one.</dd></div>
              <div><dt>Focus</dt><dd><Link className="link" href="/veneers/">Porcelain veneers</Link>, smile makeovers, and <Link className="link" href="/fix-botched-veneers/">correction of veneer work done elsewhere</Link>.</dd></div>
              <div><dt>Practice</dt><dd>{SITE.practice}, {SITE.street}, {SITE.city}, {SITE.region} {SITE.postal}. A fixed address you can walk into. <Link className="link" href="/contact/">Directions</Link></dd></div>
              <div><dt>Phone</dt><dd><a className="link" href="tel:+14043834574">(404) 383-4574</a> — evening and weekend consultation slots available</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="band" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            <div className="c-1-6"><h2>How Dr. Ennuson works.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">Four habits that do not change from case to case.</p></div>
          </div>
          <ol className="qs">
            <li className="qs-item"><span className="qs-n">01</span><h3 className="qs-q">Photographs before opinions</h3><p className="qs-a">Full face, smile, and macro images, color-calibrated, taken before any plan is discussed. The ceramist works from the same pictures.</p></li>
            <li className="qs-item"><span className="qs-n">02</span><h3 className="qs-q">The least preparation that works</h3><p className="qs-a">Enamel does not grow back. Preparation is planned on a wax-up and carried out under magnification, so the porcelain fits without taking more tooth than it needs.</p></li>
            <li className="qs-item"><span className="qs-n">03</span><h3 className="qs-q">Shade chosen against your skin</h3><p className="qs-a">Shade tabs are held against your face in daylight, not just against your teeth, because the same white reads differently on every person. <Link className="link" href="/smile-design/">Try the shade studio</Link>.</p></li>
            <li className="qs-item"><span className="qs-n">04</span><h3 className="qs-q">Nothing permanent until you approve</h3><p className="qs-a">A wax-up you can hold, then trial temporaries you wear in real life. Porcelain is made only from a design you have already lived with, at <Link className="link" href="/pricing/">a price you saw in writing</Link>.</p></li>
          </ol>
        </div>
      </section>

      <section style={{ padding: 'clamp(40px, 6vw, 80px) 0 0' }}>
        <div className="wrap"><p className="kicker" style={{ marginBottom: 20 }}>Around the practice</p></div>
        <PhotoMarquee />
      </section>

      <section className="band">
        <div className="wrap grid">
          <div className="c-1-5"><h2>Standards you can check.</h2></div>
          <div className="c-6-13">
            <p className="lede">
              Every case here is photographed the same way, planned the same way, and priced the same way. The license is public, the
              address is real, and the number on this site is the number you pay.
            </p>
            <ProofCards cards={proof} />
            <div className="btn-row" style={{ marginTop: 32 }}>
              <Link className="btn" href="/why-licensed/">Why the license matters</Link>
              <Link className="btn solid" href="/consultation/">Book a consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
