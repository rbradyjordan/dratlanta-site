import Link from 'next/link';
import { SITE, pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Terms of Service | Dr. Atlanta Cosmetic Dentistry',
  description: 'Terms for using dratlanta.org and for the Smiles by Dr. Atlanta text message program: message types, frequency, opt-out, and support.',
  path: '/terms-of-service/',
});

export default function Terms() {
  return (
    <>
      <section className="band" style={{ paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 'var(--rhythm-s)' }}>
        <div className="wrap">
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>Terms of Service</h1>
          <p className="small" style={{ marginTop: 16 }}>Last updated October 8, 2026</p>
        </div>
      </section>
      <section className="wrap prose" style={{ paddingBottom: 'var(--rhythm)' }}>
        <h2>Text message program</h2>
        <p>The &ldquo;Smiles by Dr. Atlanta SMS Notifications&rdquo; program sends texts about consultation confirmations, appointment reminders, treatment follow-ups, veneer education, and promotional offers. You may receive up to 10 messages per month; frequency varies.</p>
        <ul>
          <li><strong>Opt out:</strong> reply STOP to any message. You will receive one confirmation text. You can also email <a className="link" href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a className="link" href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a>.</li>
          <li><strong>Help:</strong> reply HELP, or contact us at the email or phone number above.</li>
          <li><strong>Cost:</strong> message and data rates may apply, depending on your carrier and plan.</li>
          <li><strong>Carriers:</strong> carriers are not liable for delayed or undelivered messages.</li>
          <li><strong>Age:</strong> the program is for people 18 or older.</li>
        </ul>
        <p>How we handle your number is described in the <Link className="link" href="/privacy-policy/">Privacy Policy</Link>.</p>

        <h2>Using this website</h2>
        <p>Use this site lawfully. Its content is general information and is not medical or dental advice. A diagnosis and treatment plan require an examination by a licensed dentist.</p>

        <h2>Results, pricing, and financing</h2>
        <p>Photographs show real patients of the practice and are shared with their consent. Individual results vary, and no outcome is guaranteed. Published prices are confirmed in writing before treatment begins. Financing is offered by third-party lenders and is subject to credit approval; payment figures on this site are examples, not offers of credit.</p>

        <h2>Changes</h2>
        <p>We may update these terms and will revise the date above when we do. Continued use of the site means you accept the current terms.</p>

        <h2>Contact</h2>
        <p>{SITE.legalName}<br /><a className="link" href={`mailto:${SITE.email}`}>{SITE.email}</a> &nbsp;·&nbsp; <a className="link" href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a></p>
      </section>
    </>
  );
}
