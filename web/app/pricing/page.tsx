import Link from 'next/link';
import PaymentSlider from '@/components/PaymentSlider';
import Photo from '@/components/Photo';
import TextScrub from '@/components/TextScrub';
import JsonLd from '@/components/JsonLd';
import Qa, { type QaItem } from '@/components/Qa';
import PageNote from '@/components/PageNote';
import { pageMeta } from '@/lib/site';
import { pageGraph, service, faq } from '@/lib/schema';

const META = {
  title: 'Veneer Cost in Metro Atlanta: $8,999 Full Arch | Dr. Atlanta',
  description: 'Veneers cost $8,999 for a full-arch smile design with Dr. Eric Ennuson, DDS. See what is included, what changes the price, and how financing works.',
  path: '/pricing/',
  image: '/og/pricing.jpg',
};
export const metadata = pageMeta(META);

const QA: QaItem[] = [
  { q: 'How much do veneers cost in metro Atlanta?', text: 'At this practice a full-arch porcelain veneer smile design is $8,999, covering up to ten lab-made veneers, planning, temporaries, and placement. Cases of one to eight veneers are quoted in writing at the consultation.',
    a: 'At this practice a full-arch porcelain veneer smile design is $8,999. That covers up to ten lab-made veneers, planning, temporaries, and placement. Cases of one to eight veneers are quoted in writing at the consultation, before you decide anything.' },
  { q: 'Why do other practices hide their prices?', text: 'Often because the price is decided in the chair, where it is harder to say no. Publishing the number lets you decide whether veneers fit your life before you talk to anyone.',
    a: 'Often because the price is decided in the chair, where it is harder to say no. We think you should be able to decide whether veneers fit your life from your couch, at midnight, without talking to anyone. That is why the number is published.' },
  { q: 'Will my quote change after the consultation?', text: 'Full-arch is $8,999. If your case needs other work first, such as gum therapy or a filling, it is identified at the exam, priced separately in writing, and explained before anything starts.',
    a: 'Full-arch is $8,999, the number you see here. If your case needs other work first, such as gum therapy or a filling, it is identified at the exam, priced separately in writing, and explained before anything starts.' },
  { q: 'Can I pay monthly?', text: 'Yes. Financing is offered through third-party lenders Cherry, Sunbit, and HFD, on terms the lender sets, subject to credit approval. The representative example on this page shows how one plan is structured.',
    a: 'Yes. Financing is offered through third-party lenders (Cherry, Sunbit, and HFD) on terms the lender sets, subject to credit approval. The representative example above shows exactly how one plan is structured, including the total you would pay.' },
  { q: 'Does checking my options hurt my credit?', text: 'Seeing what you may qualify for is a soft inquiry and does not affect your score. A hard inquiry happens only if you accept a plan, and the lender tells you before that point.',
    a: 'Seeing what you may qualify for is a soft inquiry and does not affect your score. A hard inquiry happens only if you accept a plan, and the lender tells you before that point.' },
  { q: 'What if my credit is not great?', text: 'Each lender uses its own criteria, so being declined by one does not mean being declined by all. Approval is the lender’s decision and cannot be promised. A smaller case or a larger down payment can also change what is possible.',
    a: 'Each lender uses its own criteria, so a no from one is not a no from all three. Approval is the lender’s decision and nobody here can promise it. A smaller first phase or a larger down payment can also change what is possible, and the team will lay those out without pressure.' },
  { q: 'Does insurance cover veneers?', text: 'Dental insurance generally does not cover cosmetic veneers. Where part of a case is restorative, such as replacing failed work, we help you document it for any benefits you have.',
    a: 'Dental insurance generally does not cover cosmetic veneers. Where part of a case is restorative, correction work especially, we help you document it for any benefits you have.' },
  { q: 'Are cheaper veneers worth it?', text: 'Price differences usually come from material, lab work, and time spent on planning. Composite costs less and lasts fewer years. Very low prices can also mean no exam, no X-rays, or an unlicensed provider.',
    a: <>Price differences usually come from three things: the material, the lab, and the time spent on planning. Composite costs less and lasts fewer years. Very low prices can also mean no exam, no X-rays, or <Link className="link" href="/why-licensed/">someone without a dental license</Link>. Ask what is included before comparing numbers.</> },
];

export default function Pricing() {
  return (
    <>
      <JsonLd data={pageGraph({
        path: META.path, name: META.title, description: META.description,
        extra: [
          service(META.path, 'Full-arch porcelain veneer smile design', 'Up to ten lab-fabricated porcelain veneers with consultation, photography, wax-up, trial temporaries, placement, and a written care plan.', { price: '8999', description: 'Full-arch smile design, up to ten porcelain veneers. Additional charges may be incurred for related services which may be required in individual cases.' }),
          faq(QA.map((x) => [x.q, x.text])),
        ],
      })} />
      <section className="band" style={{ paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 'var(--rhythm-s)' }}>
        <div className="wrap grid">
          <div className="c-1-11">
            <h1>
              <span className="rise"><span>Full-arch veneers, $8,999.</span></span>
              <span className="rise"><span style={{ ['--d' as string]: '0.1s' }}><em>The price is the price.</em></span></span>
            </h1>
          </div>
          <div className="c-8-13 fade-in" style={{ alignSelf: 'end' }}>
            <p className="lede">
              A full-arch porcelain veneer smile design with Dr. Eric Ennuson, DDS, costs $8,999. Most cosmetic practices will not
              tell you what veneers cost until you are in the chair. We publish it, it is the same on every page of this site, and
              it is confirmed in writing before treatment begins.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 'var(--rhythm)' }}>
        <PaymentSlider />
        <p className="fine" style={{ marginTop: 20 }}>Additional charges may be incurred for related services which may be required in individual cases. Any such services are identified at the examination and quoted in writing before treatment begins.</p>
      </section>

      <section className="bleed bleed-low">
        <div className="bleed-media" aria-hidden="true">
          <img src="/photos/glasses.webp" alt="" width={1024} height={683} loading="lazy" decoding="async" style={{ objectPosition: '50% 30%' }} />
        </div>
        <div className="wrap grid" style={{ padding: 'var(--rhythm-s) 0' }}>
          <div className="c-1-7">
            <TextScrub className="statement" text="The number on this page is the number on the consent form. It is the same on every page of this site, and it is confirmed in writing before anyone touches a tooth." />
          </div>
        </div>
      </section>

      <section className="on-ink band">
        <div className="wrap grid">
          <div className="c-1-5">
            <h2>What $8,999 includes.</h2>
            <p className="lede" style={{ marginTop: 20 }}>Everything from the first photograph to the written care plan. Nothing added on placement day.</p>
            <div style={{ marginTop: 'clamp(28px, 4vw, 48px)', maxWidth: 420 }}>
              <Photo src="/photos/operatory-light.webp" alt="Dr. Ennuson adjusting the operatory light" width={1024} height={1535} ratio="4 / 5" position="50% 30%" sizes="(max-width: 960px) 100vw, 33vw" />
            </div>
          </div>
          <div className="c-6-13">
            <dl className="facts">
              <div><dt>Planning</dt><dd>Sixty-minute consultation, color-calibrated photography, facial analysis, shade selection in daylight</dd></div>
              <div><dt>Design</dt><dd>Wax-up preview and trial temporaries, revised until you approve</dd></div>
              <div><dt>Porcelain</dt><dd>Up to ten lab-fabricated veneers, specified layer by layer with the ceramist</dd></div>
              <div><dt>Placement</dt><dd>Bonding, bite refinement, and a written care plan</dd></div>
              <div><dt>Whitening</dt><dd>Complimentary professional whitening with qualifying full-arch plans</dd></div>
            </dl>
            <dl className="facts" style={{ marginTop: 40 }}>
              <div><dt>Partial cases</dt><dd>One to eight veneers vary too much for one honest flat number. Quoted in writing at the consultation, before you decide anything.</dd></div>
              <div><dt>Correction work</dt><dd>Quoted after X-rays and an exam, because what is salvageable decides the plan.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section id="cost" className="band anchor">
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            <div className="c-1-6"><h2>What changes the cost of veneers.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">Full-arch is one flat number. For smaller and more complex cases, these are the four things a written quote is built from.</p></div>
          </div>
          <ol className="qs">
            <li className="qs-item"><span className="qs-n">01</span><h3 className="qs-q">How many teeth</h3><p className="qs-a">A smile shows six to ten upper teeth. Treating fewer costs less, but the veneers then have to match the natural teeth beside them exactly, which is its own kind of work.</p></li>
            <li className="qs-item"><span className="qs-n">02</span><h3 className="qs-q">The material</h3><p className="qs-a">Lab-made porcelain costs more than composite sculpted in the chair and typically lasts about twice as long. Everything priced on this page is porcelain.</p></li>
            <li className="qs-item"><span className="qs-n">03</span><h3 className="qs-q">What has to happen first</h3><p className="qs-a">Gum treatment, fillings, whitening of the teeth that will not be veneered, or aligners to straighten things. Each is quoted separately so you can see it.</p></li>
            <li className="qs-item"><span className="qs-n">04</span><h3 className="qs-q">Whether it is a correction</h3><p className="qs-a">Replacing failed or over-prepared veneers depends on what is left underneath. That is quoted after X-rays and an exam, never before. <Link className="link" href="/fix-botched-veneers/">How correction works</Link>.</p></li>
          </ol>
        </div>
      </section>

      <section className="on-ink band">
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            <div className="c-1-6"><h2>Three ways to pay.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">None of them changes the price of the work.</p></div>
          </div>
          <ol className="dec">
            <li className="dec-card">
              <span className="dec-n">01</span>
              <h3>In full</h3>
              <p>Card, check, or transfer, scheduled around your visits. Nothing is due until you have a written plan you have agreed to.</p>
            </li>
            <li className="dec-card">
              <span className="dec-n">02</span>
              <h3>Monthly, through a lender</h3>
              <p>Cherry, Sunbit, and HFD are third-party lenders. Each sets its own terms and makes its own approval decision. Checking what you may qualify for is a soft inquiry. The example above shows one plan in full, including the total of payments.</p>
            </li>
            <li className="dec-card">
              <span className="dec-n">03</span>
              <h3>Insurance, where it applies</h3>
              <p>Cosmetic veneers are generally not covered. Restorative parts of a case sometimes are, and we help you document them. Ask your plan administrator whether health savings funds apply to your situation.</p>
            </li>
          </ol>
          <p className="fine" style={{ marginTop: 32 }}>Financing is provided by third-party lenders and is subject to credit approval. Payment figures on this site are representative examples, not offers of credit. Your rate, term, and payment are set by the lender.</p>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            <div className="c-1-6"><h2>Veneer cost questions, answered plainly.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}>
              <p className="lede">Prefer to ask a person? Call or text <a className="link" href="tel:+14043834574">(404) 383-4574</a>.</p>
            </div>
          </div>
          <Qa items={QA} />
          <div className="btn-row" style={{ marginTop: 36 }}>
            <Link className="btn solid" href="/consultation/">Get your written number</Link>
            <Link className="btn" href="/veneers/">How porcelain veneers work</Link>
          </div>
        </div>
      </section>

      <PageNote />
    </>
  );
}
