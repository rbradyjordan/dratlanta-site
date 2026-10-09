import Link from 'next/link';

export const metadata = { title: { absolute: 'Page not found | Dr. Atlanta' }, robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="band" style={{ paddingTop: 'clamp(56px, 8vw, 120px)' }}>
      <div className="wrap grid">
        <div className="c-1-8">
          <h1>
            <span className="rise"><span>That page moved,</span></span>
            <span className="rise"><span style={{ ['--d' as string]: '0.1s' }}><em>or never existed.</em></span></span>
          </h1>
        </div>
        <div className="c-8-13" style={{ alignSelf: 'end' }}>
          <p className="lede">The site was rebuilt and some addresses changed. These are the pages people are usually looking for.</p>
        </div>
      </div>
      <div className="wrap" style={{ marginTop: 'clamp(32px, 5vw, 64px)' }}>
        <ul className="nf">
          <li><Link href="/veneers/">Porcelain veneers</Link><span>The process, the visits, and honest answers</span></li>
          <li><Link href="/pricing/">Pricing and financing</Link><span>The published number and what it includes</span></li>
          <li><Link href="/results/">Before and after</Link><span>Real patients of the practice</span></li>
          <li><Link href="/consultation/">Book a consultation</Link><span>Sixty minutes, no pressure</span></li>
          <li><Link href="/contact/">Contact and directions</Link><span>Address, phone, and how to reach us</span></li>
        </ul>
      </div>
    </section>
  );
}
