import Link from 'next/link';
import Hero from '@/components/Hero';
import ShadeStudio from '@/components/ShadeStudio';
import PaymentSlider from '@/components/PaymentSlider';
import CompareSlider from '@/components/CompareSlider';
import PinnedSteps from '@/components/PinnedSteps';
import TextScrub from '@/components/TextScrub';
import Photo from '@/components/Photo';
import Ticker from '@/components/Ticker';
import ProofCards from '@/components/ProofCards';
import CaseMarquee from '@/components/CaseMarquee';
import TeethModelClient from '@/components/TeethModelClient';
import { proof } from '@/lib/content';
import JsonLd from '@/components/JsonLd';
import { pageMeta } from '@/lib/site';
import { pageGraph } from '@/lib/schema';

const META = {
  title: 'Veneers & Smile Makeovers in Metro Atlanta | Dr. Atlanta',
  description: 'Porcelain veneers and smile makeovers by Dr. Eric Ennuson, DDS, a licensed dentist serving metro Atlanta from Lawrenceville, GA. $8,999 full arch, published.',
  path: '/',
};
export const metadata = pageMeta(META);

const steps = [
  {
    title: 'Talk first',
    body: 'Sixty minutes. What you want changed, what worries you, what your timeline and budget look like. No chair yet, no instruments, and an honest answer if veneers are not right for you.',
    src: '/photos/consult-screen.webp', alt: 'Dr. Ennuson reviewing images on screen with a patient at a veneer consultation',
  },
  {
    title: 'Photographs and a plan',
    body: 'Calibrated photography, facial analysis, a gum health check. Shade is chosen against your skin in daylight. You leave with the full price in writing.',
    src: '/photos/consult-whitecoat.webp', alt: 'Dr. Eric Ennuson, DDS, in a white coat during smile planning',
  },
  {
    title: 'Try the smile before it exists',
    body: 'A wax-up you can hold, then trial temporaries shaped like the final design that you wear in real life. The design changes until you approve it.',
    src: '/photos/loupes-side.webp', alt: 'Dr. Ennuson wearing magnification loupes during veneer preparation',
  },
  {
    title: 'Porcelain, placed',
    body: 'Lab-made porcelain bonded by a licensed dentist, the bite refined, and a written care plan for the next ten to fifteen years.',
    src: '/photos/chairside.webp', alt: 'Dr. Ennuson placing porcelain veneers chairside',
  },
];


const fixes = [
  ['Gaps', 'Close unwanted spaces'], ['Chips', 'Rebuild worn or broken edges'], ['Stains', 'Cover discoloration whitening cannot reach'],
  ['Size', 'Balance proportions across the smile'], ['Rotation', 'Straighten the look without braces'], ['Shape', 'Refine contours to the face'],
];

export default function Home() {
  return (
    <>
      <JsonLd data={pageGraph({ path: META.path, name: META.title, description: META.description })} />
      <Hero />

      <Ticker />

      {/* Credibility: who is doing this, and how to check */}
      <section className="band">
        <div className="wrap grid">
          <div className="c-1-4">
            <Photo src="/photos/brush-sign.webp" alt="Dr. Ennuson in front of the practice sign" width={1024} height={1535} sizes="(max-width: 960px) 100vw, 33vw" />
          </div>
          <div className="c-5-13">
            <h2>Licensed. Trained. Findable.</h2>
            <p className="lede" style={{ marginTop: 20, maxWidth: '36em' }}>
              Veneers are a medical procedure, and metro Atlanta has seen what happens when they are sold like a beauty treatment.
              Here is who is doing yours, and how to check.
            </p>
            <ProofCards cards={proof} />
            <p className="small" style={{ marginTop: 28, maxWidth: '40em' }}>
              Every patient pictured on this site is a patient of this practice. No models, no filters, no stock photography.
              {' '}<Link className="link" href="/why-licensed/">Why a licensed dentist, not a veneer tech</Link>
              {' '}&nbsp;·&nbsp; <Link className="link" href="/fix-botched-veneers/">Fixing veneers that went wrong</Link>
            </p>
          </div>
        </div>
      </section>

      {/* One transformation, wiped by your scroll, then yours to drag */}
      <section className="on-ink band">
        <div className="wrap grid">
          <div className="c-1-8">
            <CompareSlider before="/photos/cases/sarah-before.webp" after="/photos/cases/sarah-after.webp" alt="Sarah R., porcelain veneers" />
          </div>
          <div className="c-9-13" style={{ alignSelf: 'center' }}>
            <h2>Real veneers, before and after.</h2>
            <p className="lede" style={{ marginTop: 16 }}>Sarah R., porcelain veneers. Keep scrolling and the after reveals itself; drag the line to look closer.</p>
            <blockquote className="quote">
              <p>&ldquo;Best decision I ever made. My confidence has skyrocketed.&rdquo;</p>
              <cite>Marcus J., single veneer</cite>
            </blockquote>
            <p style={{ marginTop: 24 }}><Link className="btn" href="/results/">See every transformation</Link></p>
          </div>
        </div>

        <div className="wrap grid" style={{ marginTop: 'clamp(56px, 8vw, 112px)' }}>
          <div className="c-1-5">
            <h3 className="fix-h">What veneers fix.</h3>
            <p className="small" style={{ marginTop: 12, maxWidth: '26em' }}>
              Most people arrive with two or three of these at once. The plan treats the smile as one design, not six repairs.
            </p>
          </div>
          <ul className="fix c-6-13">
            {fixes.map(([t, d], i) => (
              <li key={t} className="fix-item">
                <span className="fix-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="fix-t">{t}</span>
                <span className="fix-d">{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <CaseMarquee />
      </section>

      {/* The change itself, on a model you can turn */}
      <section id="model" className="band model-band anchor">
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(24px, 4vw, 40px)' }}>
            <div className="c-1-6"><h2>See what porcelain changes.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}>
              <p className="lede">
                Drag from before to after. Stains, a chip, a gap, and a tooth out of line on the teeth that show when you
                smile, then the same teeth in porcelain.
              </p>
            </div>
          </div>
          <TeethModelClient />
          <p style={{ marginTop: 28 }}><Link className="link" href="/veneers/">How porcelain veneers work</Link></p>
        </div>
      </section>

      {/* Captive scroll: the process, pinned */}
      <PinnedSteps heading="How a smile gets made here." steps={steps} />

      {/* The idea, made touchable */}
      <section className="band">
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>
            <div className="c-1-6">
              <h2>White isn&apos;t one color.</h2>
            </div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}>
              <p className="lede">
                The same porcelain reads differently on every face, which is why shade is chosen against your skin in daylight
                and never off a chart. Here is the idea, roughly — then you do it for real with Dr. Ennuson.
              </p>
            </div>
          </div>
          <ShadeStudio compact />
        </div>
      </section>

      {/* Price */}
      <section className="on-ink band">
        <div className="wrap grid">
          <div className="c-1-5">
            <h2>The number, before the chair.</h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Most practices will not tell you what veneers cost until you are in the chair. We publish it. Slide to see it by the month.
            </p>
            <p style={{ marginTop: 24 }}><Link className="link" href="/pricing/">What the price includes</Link></p>
          </div>
          <div className="c-7-13">
            <PaymentSlider dark />
          </div>
        </div>
      </section>

      {/* The questions people actually have */}
      <section className="band">
        <div className="wrap grid">
          <div className="c-1-5">
            <h2>What people actually ask at midnight.</h2>
            <aside className="aside">
              <p className="aside-k">Still up? Call or text.</p>
              <a className="aside-tel" href="tel:+14043834574">(404) 383-4574</a>
              <p className="small">Evening and weekend consultations. No obligation, no pressure, real answers.</p>
            </aside>
          </div>
          <div className="c-6-13 faq">
            <details>
              <summary>Does it hurt?</summary>
              <p className="a">Preparation is conservative and fully numbed. Most people describe pressure, not pain, and you leave the same day wearing temporaries. A few days of sensitivity afterward is normal and passes on its own.</p>
            </details>
            <details>
              <summary>How many visits does it take?</summary>
              <p className="a">Usually three, sometimes four when planning needs its own visit. The consultation and photographs; preparation, with temporaries placed the same day; then placement of the finished porcelain. Trial temporaries live between the second and third, for as long as you need to be sure of the design.</p>
            </details>
            <details>
              <summary>How long do veneers last?</summary>
              <p className="a">Ten to fifteen years is typical with porcelain and proper care. Night grinding without a guard shortens that; a guard, normal brushing, and cleanings extend it. We plan the bite so force is spread. Longevity is designed, not hoped for.</p>
            </details>
            <details>
              <summary>What if I hate them?</summary>
              <p className="a">You never find out at the end. You approve a wax-up you can hold, then wear trial temporaries shaped like the final design in your real life. The design changes until you approve it. Porcelain is only made from a design you have already lived with.</p>
            </details>
            <details>
              <summary>Do I need a large down payment?</summary>
              <p className="a">Many patients qualify for little or no money down through Cherry, Sunbit, or HFD. Seeing your options is a soft inquiry that does not affect your score, and the team can walk you through it at the consultation. The representative example on this page shows exactly how a plan is structured.</p>
            </details>
            <p style={{ marginTop: 28 }}><Link className="btn solid" href="/consultation/">See what a consultation involves</Link></p>
          </div>
        </div>
      </section>

      {/* Full-bleed statement, words filling as you scroll */}
      <section className="bleed">
        <div className="bleed-media" aria-hidden="true">
          <img src="/photos/loupes-light.webp" alt="" width={2048} height={1366} loading="lazy" decoding="async" />
        </div>
        <div className="wrap grid" style={{ padding: 'var(--rhythm-s) 0' }}>
          <div className="c-1-8">
            <TextScrub className="statement" text="Magnification, calibrated photography, lab-made porcelain. The parts of the job nobody sees are the parts that decide whether a smile still looks right in fifteen years." />
            <p style={{ marginTop: 28 }}><Link className="btn" href="/veneers/">How porcelain veneers work</Link></p>
          </div>
        </div>
      </section>

      {/* Behind the practice */}
      <section className="band">
        <div className="wrap grid">
          <div className="c-1-5">
            <Photo src="/photos/usc-headshot.webp" alt="Dr. Eric Ennuson in his USC Herman Ostrow School of Dentistry white coat" width={720} height={1080} ratio="4 / 5" position="50% 20%" />
          </div>
          <div className="c-7-13" style={{ alignSelf: 'center' }}>
            <TextScrub className="statement" text="He works the same way on every case: the photographs on the table, the shade tabs against the skin, the plan in writing before anything is permanent. Standards that hold whether anyone is watching or not." />
            <blockquote className="quote quote-ink">
              <p>&ldquo;I flew in from California specifically for Dr. Atlanta&rsquo;s expertise. Worth every penny and every mile.&rdquo;</p>
              <cite>Jessica L., full smile makeover</cite>
            </blockquote>
            <p style={{ marginTop: 24 }}><Link className="link" href="/about/">About Dr. Ennuson</Link></p>
          </div>
        </div>
      </section>
    </>
  );
}
