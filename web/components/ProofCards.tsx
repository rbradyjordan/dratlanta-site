'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type PointerEvent } from 'react';

export type Proof = { k: string; title: string; body: string; href?: string; cta?: string; external?: boolean };

/** Credential plates. They rise in when scrolled to; a soft gold light follows the pointer across each one. */
export default function ProofCards({ cards }: { cards: Proof[] }) {
  const ref = useRef<HTMLUListElement>(null);
  // Visible by default. Only plates that start below the fold get the rise-in, and a safety
  // timer guarantees they show even if the observer never reports (hidden tab, odd runtimes).
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.9) return;
    setPending(true);
    const reveal = () => { setPending(false); io.disconnect(); window.clearTimeout(t); };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) reveal(); }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    const t = window.setTimeout(reveal, 6000);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, []);

  const onMove = (e: PointerEvent<HTMLLIElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <ul ref={ref} className={`proof ${pending ? 'is-pending' : ''}`}>
      {cards.map((c, i) => (
        <li key={c.title} className="proof-card" style={{ ['--i' as string]: i }} onPointerMove={onMove}>
          <div className="proof-in">
            <span className="proof-k">{c.k}</span>
            <h3 className="proof-t">{c.title}</h3>
            <p className="proof-b">{c.body}</p>
            {c.href && c.cta && (c.external
              ? <a className="proof-l" href={c.href} target="_blank" rel="noopener">{c.cta}</a>
              : <Link className="proof-l" href={c.href}>{c.cta}</Link>)}
          </div>
        </li>
      ))}
    </ul>
  );
}
