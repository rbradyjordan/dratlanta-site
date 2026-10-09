'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/site';

/* Pages that are already the destination, or are fine print, end without the invitation. */
const QUIET = ['/consultation', '/thank-you', '/privacy-policy', '/terms-of-service', '/accessibility', '/lab'];

/** The last thing on every page before the footer: one invitation, said once, the same everywhere. */
export default function ClosingCta() {
  const path = usePathname() ?? '/';
  if (QUIET.some((p) => path.startsWith(p))) return null;
  const correction = path.startsWith('/fix-botched-veneers');
  return (
    <section className="cta" aria-labelledby="cta-h">
      <div className="wrap cta-in">
        <h2 id="cta-h" className="cta-h">
          {correction ? 'Start with an exam.' : 'Start with a conversation.'}
          <em>{correction ? 'An honest read, in writing.' : 'Sixty minutes, no pressure.'}</em>
        </h2>
        <div className="cta-side">
          <p className="cta-lede">
            {correction
              ? 'X-rays, photographs, and a straight answer on what can be saved. You leave with a written plan and price, whatever you decide.'
              : 'You leave knowing whether veneers suit you, what the design would be, and the full price in writing. What happens next is your call.'}
          </p>
          <div className="btn-row">
            <Link className="btn solid cta-btn" href="/consultation/">{correction ? 'Book a correction consult' : 'Book a consultation'}</Link>
            <a className="btn" href={`tel:${SITE.phoneE164}`}>Call or text {SITE.phone}</a>
          </div>
          <p className="cta-fine">Evening and weekend times &nbsp;·&nbsp; {SITE.city}, {SITE.region} &nbsp;·&nbsp; Serving metro Atlanta</p>
        </div>
      </div>
    </section>
  );
}
