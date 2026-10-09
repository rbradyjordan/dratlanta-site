import Link from 'next/link';
import Photo from '@/components/Photo';
import TextScrub from '@/components/TextScrub';
import JsonLd from '@/components/JsonLd';
import Qa, { type QaItem } from '@/components/Qa';
import PageNote, { SOURCES } from '@/components/PageNote';
import { SITE, pageMeta } from '@/lib/site';
import { pageGraph, service, faq } from '@/lib/schema';

const META = {
  title: 'Fix Botched Veneers in Metro Atlanta | Dr. Atlanta',
  description: 'Veneers that hurt, fell off, look bulky, or were placed by a veneer tech or abroad can usually be corrected. Exam and X-rays first, then a written plan.',
  path: '/fix-botched-veneers/',
  image: '/og/correction.jpg',
};
export const metadata = pageMeta(META);

const signs: [string, string][] = [
  ['Gums that bleed or stay red', 'Veneer edges that sit too deep, overhang, or trap cement keep the gum inflamed. It does not settle on its own.'],
  ['Veneers that loosen or fall off', 'Usually a bonding failure, a bite that was never adjusted, or porcelain glued over a surface that was not prepared for it.'],
  ['Pain or sensitivity that lingers', 'Sensitivity for a few days is normal. Weeks of pain to cold, heat, or biting points to over-preparation, decay, or an irritated nerve.'],
  ['A dark line or gap at the gum', 'The margin is open or the gum has receded from it. Bacteria and stain get in, and decay can start where you cannot see it.'],
  ['Teeth that feel thick or push the lip', 'Porcelain was added without making room for it. Bulky veneers are hard to clean and change how you speak and bite.'],
  ['A smell or taste you cannot brush away', 'Often trapped food or leaking cement under an edge. It is a sign of a gap, not of poor brushing.'],
];

const QA: QaItem[] = [
  { q: 'Can botched veneers be fixed?', text: 'Usually, yes. What is possible depends on how much healthy tooth is left underneath, which only an exam and X-rays can show. Options range from adjusting and re-bonding to replacing veneers or, where teeth were heavily cut down, crowns.',
    a: 'Usually, yes. What is possible depends on how much healthy tooth is left underneath, and only an exam and X-rays can show that. The options run from adjusting and re-bonding, to replacing the veneers, to crowns where teeth were cut down heavily.' },
  { q: 'How much does it cost to fix bad veneers?', text: 'Correction is quoted after X-rays and an exam, because the plan depends on what is salvageable. You get the full price in writing before anything starts. First-time full-arch veneers are $8,999 for reference.',
    a: <>It is quoted after X-rays and an exam, because what is salvageable decides the plan. You get the full price in writing before anything starts. For reference, a first-time full-arch case is <Link className="link" href="/pricing/">$8,999</Link>; corrections can be less or more than that.</> },
  { q: 'My veneers were done abroad. Can you work on them?', text: 'Yes. Work done in Turkey, Mexico, Colombia, or elsewhere is evaluated the same way as any other. Bring any records you have. Teeth filed down to pegs were prepared for crowns, which limits the options, but the first step is still an exam.',
    a: 'Yes. Work done in Turkey, Mexico, Colombia, or anywhere else is evaluated the same way. Bring whatever records you have. Teeth filed down to pegs were prepared for crowns, not veneers, and that narrows the options, but the first step is the same exam.' },
  { q: 'A veneer tech did mine. Will I be judged?', text: 'No. You will get X-rays, an honest read on what is salvageable, and a written plan with a price. Nobody here is going to lecture you.',
    a: 'No. You will get X-rays, an honest read on what is salvageable, and a written plan with a price. Nobody here is going to lecture you about how you got there.' },
  { q: 'Do all the veneers have to come off?', text: 'Not always. If some veneers are sound and the problem is isolated, only the failing ones are replaced. If the shade, shape, or bite is wrong across the set, replacing them together gives a better result.',
    a: 'Not always. If some are sound and the problem is isolated, only the failing ones are replaced. If the shade, the shape, or the bite is wrong across the whole set, replacing them together gives a result that matches.' },
  { q: 'How soon should I be seen?', text: 'Soon if there is pain, swelling, a loose veneer, or bleeding gums, because decay and infection under porcelain progress without being visible. If the concern is only appearance, there is no emergency.',
    a: 'Soon, if there is pain, swelling, a loose veneer, or gums that bleed. Decay and infection under porcelain progress where you cannot see them. If the only concern is how they look, there is no emergency, and you can take your time choosing who fixes them.' },
];

export default function FixBotchedVeneers() {
  return (
    <>
      <JsonLd data={pageGraph({
        path: META.path, name: META.title, description: META.description, type: 'MedicalWebPage',
        extra: [
          service(META.path, 'Veneer correction and replacement', 'Evaluation, repair, and replacement of failed, over-prepared, or poorly fitted veneers, including work done abroad or by unlicensed providers.'),
          faq(QA.map((x) => [x.q, x.text])),
        ],
      })} />

      <section className="band" style={{ paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 'var(--rhythm-s)' }}>
        <div className="wrap grid">
          <div className="c-1-11">
            <h1>
              <span className="rise"><span>Botched veneers</span></span>
              <span className="rise"><span style={{ ['--d' as string]: '0.1s' }}>can usually be fixed.</span></span>
              <span className="rise"><span style={{ ['--d' as string]: '0.2s' }}><em>X-rays first. No lecture.</em></span></span>
            </h1>
          </div>
          <div className="c-1-7 fade-in">
            <p className="lede">
              Veneers that hurt, fall off, look bulky, or were placed by someone without a license can usually be corrected.
              {' '}{SITE.doctor}, repairs and replaces veneer work for patients across metro Atlanta, including work done by veneer techs
              and work done abroad. The first visit is an exam, X-rays, and an honest read on what can be saved.
            </p>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <Link className="btn solid" href="/consultation/">Book a correction consult</Link>
              <a className="btn" href={`tel:${SITE.phoneE164}`}>Call {SITE.phone}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            <div className="c-1-6"><h2>Six signs veneers need attention.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">Any one of these is worth an exam. Several together usually mean the fit, the bond, or the tooth underneath has a problem.</p></div>
          </div>
          <ol className="qs">
            {signs.map(([t, d], i) => (
              <li key={t} className="qs-item"><span className="qs-n">{String(i + 1).padStart(2, '0')}</span><h3 className="qs-q">{t}</h3><p className="qs-a">{d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="on-ink band">
        <div className="wrap grid">
          <div className="c-1-5">
            <Photo src="/photos/chairside.webp" alt="Dr. Ennuson in loupes treating a patient chairside" width={1024} height={1535} ratio="4 / 5" position="50% 30%" sizes="(max-width: 960px) 100vw, 40vw" />
          </div>
          <div className="c-6-13" style={{ alignSelf: 'center' }}>
            <h2 style={{ marginBottom: 'clamp(28px, 4vw, 48px)' }}>How veneer correction works.</h2>
            <dl className="facts">
              <div><dt>1. Exam</dt><dd>X-rays, a gum check, photographs, and a look at the bite. This shows what is under the porcelain: decay, how much enamel is left, whether nerves are healthy.</dd></div>
              <div><dt>2. An honest read</dt><dd>What can be kept, what has to be replaced, and what cannot be promised. If a tooth needs a crown or a root canal, you hear it here, not halfway through.</dd></div>
              <div><dt>3. Health first</dt><dd>Decay and gum inflammation are treated before any new porcelain. New veneers on unhealthy teeth fail the same way the old ones did.</dd></div>
              <div><dt>4. Redesign</dt><dd>A wax-up and trial temporaries, so you see and wear the corrected shape and shade before anything is made.</dd></div>
              <div><dt>5. Placement</dt><dd>Lab-made porcelain, bonded and adjusted to your bite, with a written care plan.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            <div className="c-1-6"><h2>Repair, replace, or crown?</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">The answer comes from the tooth, not from a price list. These are the three routes and when each applies.</p></div>
          </div>
          <div className="opt">
            <div className="opt-row opt-head"><span>Route</span><span>What happens</span><span>When it fits</span><span>Tooth removed</span></div>
            <div className="opt-row"><span className="opt-k">Adjust or re-bond</span><span data-l="What">Edges are smoothed, the bite is corrected, or a loose veneer is cleaned and bonded again</span><span data-l="When">The porcelain is sound and the problem is fit or cement</span><span data-l="Removed">None</span></div>
            <div className="opt-row is-us"><span className="opt-k">Replace the veneers</span><span data-l="What">Old veneers are removed and new ones are designed, tried, and made</span><span data-l="When">Shade, shape, thickness, or margins are wrong and enough enamel remains</span><span data-l="Removed">Little or none beyond the first time</span></div>
            <div className="opt-row"><span className="opt-k">Crowns</span><span data-l="What">The whole tooth is covered</span><span data-l="When">Teeth were filed to pegs, are broken, or have large decay</span><span data-l="Removed">Already removed</span></div>
          </div>
        </div>
      </section>

      <section className="bleed">
        <div className="bleed-media" aria-hidden="true">
          <img src="/photos/loupes-light.webp" alt="" width={2048} height={1366} loading="lazy" decoding="async" />
        </div>
        <div className="wrap grid" style={{ padding: 'var(--rhythm-s) 0' }}>
          <div className="c-1-8">
            <TextScrub className="statement" text="Correction cases are more complex than first-time veneers, and we will be straight about what is involved. What we will not do is make it worse to make it fast." />
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap grid">
          <div className="c-1-5">
            <h2>What to bring.</h2>
            <p className="lede" style={{ marginTop: 20 }}>None of it is required. All of it helps.</p>
          </div>
          <div className="c-6-13">
            <dl className="facts">
              <div><dt>Records</dt><dd>Any X-rays, treatment notes, or invoices from whoever did the work, including clinics abroad. Ask them for copies.</dd></div>
              <div><dt>Materials</dt><dd>What you were told the veneers are made of. Porcelain, composite, and pre-made shells are corrected differently.</dd></div>
              <div><dt>Timeline</dt><dd>When the work was done and when each problem started.</dd></div>
              <div><dt>Photographs</dt><dd>Your smile before the work, if you have them. They help rebuild proportions that were lost.</dd></div>
            </dl>
            <p style={{ marginTop: 24, color: 'var(--text-2)' }}>
              If the work was done by someone without a dental license, you can report it to the Georgia Board of Dentistry. That is your
              choice, and it has no bearing on your care here. <Link className="link" href="/why-licensed/">What Georgia law says about veneer techs</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            <div className="c-1-6"><h2>Veneer correction questions.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">Call or text <a className="link" href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a> if yours is not here.</p></div>
          </div>
          <Qa items={QA} />
          <div className="btn-row" style={{ marginTop: 36 }}>
            <Link className="btn solid" href="/consultation/">Book a correction consult</Link>
            <Link className="btn" href="/results/">See finished cases</Link>
          </div>
        </div>
      </section>

      <PageNote sources={[SOURCES.adaStatement, SOURCES.adaVeneers, SOURCES.gaComplaints]} />
    </>
  );
}
