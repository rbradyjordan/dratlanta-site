import Link from 'next/link';
import Photo from '@/components/Photo';
import TextScrub from '@/components/TextScrub';
import ProofCards from '@/components/ProofCards';
import { proof } from '@/lib/content';
import JsonLd from '@/components/JsonLd';
import Qa, { type QaItem } from '@/components/Qa';
import PageNote, { SOURCES } from '@/components/PageNote';
import { SITE, pageMeta } from '@/lib/site';
import { pageGraph, faq } from '@/lib/schema';

const META = {
  title: 'Licensed Dentist vs. Veneer Tech in Georgia | Dr. Atlanta',
  description: 'Is a veneer tech legal in Georgia? No. Fitting veneers is the practice of dentistry and requires a license. How to verify a dentist before you book.',
  path: '/why-licensed/',
  image: '/og/licensed.jpg',
};
export const metadata = pageMeta(META);

const QA: QaItem[] = [
  { q: 'Is a veneer tech legal in Georgia?', text: 'No. Under Georgia law, fitting a cosmetic covering to teeth directly for a patient is the practice of dentistry and requires a dental license. Georgia issues no veneer technician license.',
    a: <>No. Under Georgia law, supplying or fitting any &ldquo;cosmetic covering&rdquo; on teeth directly for a patient is the practice of dentistry (O.C.G.A. § 43-11-17), and practicing dentistry requires a license. Georgia issues no &ldquo;veneer technician&rdquo; license. A certificate from a weekend course is not one.</> },
  { q: 'What does the American Dental Association say?', text: 'In May 2024 the ADA urged the public to be cautious of veneer technicians, citing infection from unsterilized materials, veneers placed over decayed or diseased teeth, nerve injury from grinding, and choking during placement.',
    a: 'In May 2024 the ADA publicly urged caution about “veneer technicians.” The risks it named: infection from unsterilized materials and curing lights, veneers placed over decayed or diseased teeth, nerve injury from excessive grinding, and choking during placement.' },
  { q: 'How do I check a dentist’s license in Georgia?', text: 'Use the Georgia Board of Dentistry public license verification. Search the person’s name, confirm the license type is Dentist and the status is active, and check for public board orders.',
    a: <>Open the Georgia Board of Dentistry&rsquo;s <a className="link" href={SITE.licenseLookup} target="_blank" rel="noopener">public license verification</a> and search the person&rsquo;s name. Confirm three things: the license type is Dentist, the status is active, and whether any public board orders are attached. No result means no license.</> },
  { q: 'What if an unlicensed person already placed my veneers?', text: 'See a licensed dentist for an exam and X-rays, even if nothing hurts, because decay and gum inflammation under veneers are often silent early on. You can also report unlicensed practice to the Georgia Board of Dentistry.',
    a: <>See a licensed dentist for an exam and X-rays, even if nothing hurts yet. Decay and gum inflammation under veneers are often silent early on. Bring whatever paperwork or messages you have. You can also report unlicensed practice to the Georgia Board of Dentistry. <Link className="link" href="/fix-botched-veneers/">How correction works here</Link>.</> },
];

export default function WhyLicensed() {
  return (
    <>
      <JsonLd data={pageGraph({ path: META.path, name: META.title, description: META.description, type: 'MedicalWebPage', extra: [faq(QA.map((x) => [x.q, x.text]))] })} />
      <section className="band" style={{ paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 'var(--rhythm-s)' }}>
        <div className="wrap grid">
          <div className="c-1-11">
            <h1>
              <span className="rise"><span>Anyone can buy porcelain.</span></span>
              <span className="rise"><span style={{ ['--d' as string]: '0.1s' }}><em>Not everyone should touch your teeth.</em></span></span>
            </h1>
          </div>
          <div className="c-1-7 fade-in">
            <p className="lede">
              In Georgia, placing veneers is the practice of dentistry and requires a dental license. Metro Atlanta learned why the
              hard way: self-described veneer technicians with no license, working out of studios, leaving people with damaged
              enamel, failing gums, and no one to call. Here is what a license protects you from, and how to check anyone&rsquo;s,
              including ours.
            </p>
          </div>
        </div>
      </section>

      <section className="on-ink band">
        <div className="wrap grid">
          <div className="c-1-4">
            <Photo src="/photos/chairside.webp" alt="Dr. Ennuson in gown, gloves, and loupes treating a patient" width={1024} height={1535} sizes="(max-width: 960px) 100vw, 33vw" />
          </div>
          <div className="c-5-13">
            <h2 style={{ marginBottom: 'clamp(28px, 4vw, 48px)' }}>Veneers are a medical procedure.</h2>
            <dl className="facts">
              <div><dt>Diagnosis</dt><dd>A dentist takes X-rays and checks gum health, decay, and bite before any cosmetic plan. Unlicensed operators glue porcelain onto whatever is there — including decay that then progresses underneath.</dd></div>
              <div><dt>Anesthesia</dt><dd>Local anesthesia, sterilized instruments, and clinical standards are legal requirements of a dental practice. Outside one, none of it is guaranteed, and preparation without proper anesthesia is how enamel gets butchered.</dd></div>
              <div><dt>Accountability</dt><dd>A licensed dentist answers to the Georgia Board of Dentistry, carries malpractice coverage, and has a license to lose. When unlicensed work fails there is no board, no coverage, and usually no one left to reach.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            <div className="c-1-6"><h2>Veneer techs and Georgia law.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">The short answers, with the sources at the bottom of this page.</p></div>
          </div>
          <Qa items={QA} />
        </div>
      </section>

      <section className="band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            <div className="c-1-6"><h2>Six questions to ask anyone offering veneers.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">Ask them of us too. A real practice has nothing to lose by answering.</p></div>
          </div>
          <ol className="qs">
            {[
              ['Are you a licensed dentist in this state?', 'Verify at the Georgia Board of Dentistry’s public license lookup. It takes two minutes.'],
              ['Will you take X-rays and examine my gums before quoting me?', 'Porcelain over decay or inflamed tissue fails, and takes the tooth with it.'],
              ['Is this porcelain from a dental lab, or composite applied in one sitting?', 'They are different materials with different lifespans. You should know which you are buying.'],
              ['If something fails in a year, who fixes it, under what coverage?', 'A licensed practice carries malpractice coverage and answers to a board.'],
              ['Can I see full cases, before and after in the same light?', 'Afters alone, in better light, prove nothing.'],
              ['Where exactly is your practice?', 'A real practice has a fixed address you can walk into. Pop-ups and hotel-room appointments are the biggest red flag there is.'],
            ].map(([q, note], i) => (
              <li key={q} className="qs-item">
                <span className="qs-n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="qs-q">{q}</h3>
                <p className="qs-a">{note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bleed">
        <div className="bleed-media" aria-hidden="true">
          <img src="/photos/chairside.webp" alt="" width={1024} height={1535} loading="lazy" decoding="async" style={{ objectPosition: '50% 30%' }} />
        </div>
        <div className="wrap grid" style={{ padding: 'var(--rhythm-s) 0' }}>
          <div className="c-1-8">
            <TextScrub className="statement" text="A meaningful part of Dr. Ennuson’s caseload is correcting veneer work done cheaply, quickly, or outside a license, here and overseas. If that is you, you will not get a lecture." />
          </div>
        </div>
      </section>

      <section className="on-ink band" style={{ paddingTop: 0 }}>
        <div className="wrap grid" style={{ paddingTop: 'var(--rhythm)' }}>
          <div className="c-1-5"><h2>If it already went wrong.</h2></div>
          <div className="c-6-13">
            <p className="lede">
              A meaningful part of Dr. Ennuson's caseload is correcting veneer work done cheaply, quickly, or outside a license — here and
              overseas. If that is you, you will not get a lecture. You will get X-rays, an honest read on what is salvageable, and a written
              plan with a real price.
            </p>
            <p style={{ marginTop: 20, color: 'var(--on-ink-2)' }}>Correction cases are more complex than first-time veneers and we will be straight about what is involved. What we will not do is make it worse to make it fast.</p>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <Link className="btn solid" href="/consultation/">Book a correction consult</Link>
              <Link className="btn" href="/fix-botched-veneers/">How veneer correction works</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap grid">
          <div className="c-1-5"><h2>Check ours.</h2></div>
          <div className="c-6-13">
            <p className="lede">The same six questions, answered for this practice.</p>
            <ProofCards cards={proof} />
          </div>
        </div>
      </section>
      <PageNote sources={[SOURCES.gaStatute, SOURCES.adaStatement, SOURCES.gaLookup, SOURCES.gaCease, SOURCES.gaComplaints]} />
    </>
  );
}
