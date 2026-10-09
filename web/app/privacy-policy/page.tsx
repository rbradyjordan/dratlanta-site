import Link from 'next/link';
import { SITE, pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Privacy Policy | Dr. Atlanta Cosmetic Dentistry',
  description: 'How Dr. Atlanta Cosmetic Dentistry collects, uses, and protects your information, including consultation requests, photos, and text message consent.',
  path: '/privacy-policy/',
});

export default function Privacy() {
  return (
    <>
      <section className="band" style={{ paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 'var(--rhythm-s)' }}>
        <div className="wrap">
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>Privacy Policy</h1>
          <p className="small" style={{ marginTop: 16 }}>Last updated October 8, 2026</p>
        </div>
      </section>
      <section className="wrap prose" style={{ paddingBottom: 'var(--rhythm)' }}>
        <p>This policy explains what {SITE.legalName} (&ldquo;Dr. Atlanta Cosmetic Dentistry&rdquo;, &ldquo;we&rdquo;) collects through this website, how it is used, and the choices you have.</p>

        <h2>What we collect</h2>
        <ul>
          <li>Contact details you give us: name, email address, phone number, and mailing address.</li>
          <li>Consultation details: your smile goals, timeline, and anything else you write in a request.</li>
          <li>Photos and X-rays you choose to upload with a consultation request.</li>
          <li>Records of your consent to receive text messages.</li>
          <li>Website usage data such as IP address, browser type, pages visited, and time on site.</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To answer consultation requests and to schedule and confirm appointments.</li>
          <li>To send appointment reminders and follow-ups by text message and email.</li>
          <li>To share veneer education you asked for.</li>
          <li>To process payments, improve this website, and meet legal obligations.</li>
        </ul>

        <h2>Text messages</h2>
        <p>If you opt in, we send texts about consultations, appointments, education, and occasional offers. Message frequency varies. Message and data rates may apply. Reply <strong>STOP</strong> to any message to opt out, or <strong>HELP</strong> for help. We store your phone number and consent status.</p>
        <p><strong>We do not share mobile numbers or text message consent with third parties or affiliates for their marketing.</strong> Your number is used only for communications about consultations, appointments, and services you requested.</p>

        <h2>Cookies and analytics</h2>
        <p>We may use cookies and similar technologies to understand traffic and improve the site. You can manage cookies in your browser settings; some features may not work without them.</p>

        <h2>Service providers</h2>
        <p>We use GoHighLevel (LeadConnector) for our consultation form, messaging, and customer records. Providers process your information only to deliver those services to us. Text message consent and phone numbers are not sold, rented, or shared with third parties or affiliates for marketing.</p>

        <h2>Security and retention</h2>
        <p>We use reasonable safeguards, including encryption and access controls, but no system can be guaranteed secure. We keep information only as long as needed to provide services, meet legal duties, and resolve disputes.</p>

        <h2>Your choices</h2>
        <p>You may ask for a copy of your information, ask us to correct or delete it, opt out of marketing email and text messages, and withdraw text message consent at any time. Email <a className="link" href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a className="link" href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a>.</p>

        <h2>Changes</h2>
        <p>We may update this policy and will revise the date above when we do.</p>

        <h2>Contact</h2>
        <p>{SITE.legalName}<br />at {SITE.practice}, {SITE.street}, {SITE.city}, {SITE.region} {SITE.postal}<br /><a className="link" href={`mailto:${SITE.email}`}>{SITE.email}</a> &nbsp;·&nbsp; <a className="link" href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a></p>
        <p>See also our <Link className="link" href="/terms-of-service/">Terms of Service</Link>.</p>
      </section>
    </>
  );
}
