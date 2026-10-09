import Link from 'next/link';
import { SITE, pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Request received | Dr. Atlanta Cosmetic Dentistry',
  description: 'Your consultation request was received. The team will text you to pick a time.',
  path: '/thank-you/',
  noindex: true,
});

export default function ThankYou() {
  return (
    <section className="band" style={{ paddingTop: 'clamp(56px, 8vw, 120px)' }}>
      <div className="wrap grid">
        <div className="c-1-8">
          <h1>
            <span className="rise"><span>Got it.</span></span>
            <span className="rise"><span style={{ ['--d' as string]: '0.1s' }}><em>We&rsquo;ll text you to pick a time.</em></span></span>
          </h1>
        </div>
        <div className="c-8-13" style={{ alignSelf: 'end' }}>
          <p className="lede">One text from the team, usually within a business day. If you would rather not wait, call <a className="link" href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a>.</p>
          <div className="btn-row" style={{ marginTop: 28 }}>
            <Link className="btn solid" href="/results/">See the cases</Link>
            <Link className="btn" href="/pricing/">What it costs</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
