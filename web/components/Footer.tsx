import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-word" aria-hidden="true">Dr. Atlanta</div>
        <div className="ftr-grid">
          <div>
            <h2 className="ftr-h">{SITE.doctor}</h2>
            <address style={{ fontStyle: 'normal' }}>
              <p>at {SITE.practice}<br />{SITE.street}<br />{SITE.city}, {SITE.region} {SITE.postal}</p>
            </address>
            <p style={{ marginTop: 14 }}><a href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a></p>
            <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          </div>
          <div>
            <h2 className="ftr-h">Care</h2>
            <ul>
              <li><Link href="/veneers/">Porcelain veneers</Link></li>
              <li><Link href="/results/">Before and after</Link></li>
              <li><Link href="/smile-design/">Shade studio</Link></li>
              <li><Link href="/fix-botched-veneers/">Fixing botched veneers</Link></li>
              <li><Link href="/why-licensed/">Licensed dentist vs. veneer tech</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="ftr-h">Practice</h2>
            <ul>
              <li><Link href="/about/">Dr. Ennuson</Link></li>
              <li><Link href="/pricing/">Veneer pricing and financing</Link></li>
              <li><Link href="/consultation/">Book a consultation</Link></li>
              <li><Link href="/veneers-lawrenceville-ga/">Veneers in Lawrenceville, GA</Link></li>
              <li><Link href="/contact/">Contact and directions</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="ftr-h">Elsewhere</h2>
            <ul>
              <li><a href={SITE.instagram} rel="noopener">Instagram</a></li>
              <li><a href={SITE.mapsUrl} rel="noopener">Directions</a></li>
            </ul>
          </div>
        </div>
        <div className="ftr-legal">
          <span>© 2026 {SITE.name}</span>
          <span>Licensed by the Georgia Board of Dentistry</span>
          <span><Link href="/privacy-policy/">Privacy</Link> &nbsp;·&nbsp; <Link href="/terms-of-service/">Terms</Link> &nbsp;·&nbsp; <Link href="/accessibility/">Accessibility</Link></span>
          <span>3D dentition model: “Human teeth” by Alexander Antipov, <a href="https://creativecommons.org/licenses/by/4.0/" rel="license noopener">CC BY 4.0</a></span>
        </div>
      </div>
    </footer>
  );
}
