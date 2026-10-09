import { SITE, pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Accessibility | Dr. Atlanta Cosmetic Dentistry',
  description: 'Our accessibility commitment for dratlanta.org, the standard we work toward, and how to report a barrier or ask for information another way.',
  path: '/accessibility/',
});

export default function Accessibility() {
  return (
    <>
      <section className="band" style={{ paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 'var(--rhythm-s)' }}>
        <div className="wrap">
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>Accessibility</h1>
          <p className="small" style={{ marginTop: 16 }}>Last updated October 8, 2026</p>
        </div>
      </section>
      <section className="wrap prose" style={{ paddingBottom: 'var(--rhythm)' }}>
        <p>We want everyone to be able to use this website, including people who rely on assistive technology.</p>

        <h2>The standard we work toward</h2>
        <p>This site is built toward the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA.</p>

        <h2>What that means here</h2>
        <ul>
          <li>Text alternatives on photographs, including before-and-after images.</li>
          <li>Keyboard access to navigation, the shade studio, the payment slider, and the comparison sliders.</li>
          <li>Color contrast checked against AA, and visible focus indicators.</li>
          <li>Motion that respects your device&rsquo;s reduced-motion setting, including the opening animation.</li>
          <li>Layouts that reflow on phones without horizontal scrolling.</li>
        </ul>

        <h2>Known limitations</h2>
        <p>The 3D tooth model and the embedded consultation form come from third-party tools and may not meet every criterion. If either gets in your way, call or email and we will take your request directly.</p>

        <h2>Tell us about a barrier</h2>
        <p>Email <a className="link" href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a className="link" href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a>. We aim to respond within five business days, and we can provide any information on this site another way.</p>
      </section>
    </>
  );
}
