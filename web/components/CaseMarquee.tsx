import Link from 'next/link';

const cases = [
  { id: 'sarah', name: 'Sarah R.', w: 'porcelain veneers' }, { id: 'charlotte', name: 'Charlotte C.', w: 'porcelain veneers' },
  { id: 'dana', name: 'Dana B.', w: 'porcelain veneers' }, { id: 'dov', name: 'Dov G.', w: 'porcelain veneers' },
  { id: 'case05', name: 'Smile makeover', w: 'a porcelain veneer smile makeover' }, { id: 'case06', name: 'Full-face transformation', w: 'a smile makeover' },
];

/** Every case on record drifts past. Hover shows the before; on touch screens each card flips between the two on its own. */
export default function CaseMarquee() {
  return (
    <div className="cm">
      <div className="cm-track" style={{ ['--duration' as string]: '72s', ['--gap' as string]: '14px' }}>
        {[0, 1, 2].map((copy) => (
          <div key={copy} aria-hidden={copy > 0 || undefined}>
            {cases.map((c, i) => (
              <Link key={c.id} href="/results/" className="cm-item" style={{ ['--n' as string]: i }} tabIndex={copy > 0 ? -1 : undefined} aria-label={copy === 0 ? `${c.name}, before and after` : undefined}>
                <img src={`/photos/cases/${c.id}-before.webp`} alt={copy === 0 ? `${c.name} before ${c.w}` : ''} className="cm-before" loading="lazy" decoding="async" />
                <img src={`/photos/cases/${c.id}-after.webp`} alt={copy === 0 ? `${c.name} after ${c.w} by Dr. Eric Ennuson, DDS` : ''} className="cm-after" loading="lazy" decoding="async" />
                <span className="cm-cap" aria-hidden="true"><b>{c.name}</b><em className="cm-hint">Before</em></span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
