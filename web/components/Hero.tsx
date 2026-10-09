'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import GlareHover from '@/components/GlareHover';
import IntroSequence from '@/components/IntroSequence';

/** Background reel (1080p, muted, no audio track). */
const HERO_VIDEO = '/video/reel.mp4';
const HERO_POSTER = '/photos/hero-poster.webp';

const cases = [
  { src: '/photos/cases/sarah-after.webp', name: 'Sarah R.' },
  { src: '/photos/cases/charlotte-after.webp', name: 'Charlotte C.' },
  { src: '/photos/cases/dana-after.webp', name: 'Dana B.' },
  { src: '/photos/cases/dov-after.webp', name: 'Dov G.' },
];

/**
 * The poster is the first paint and the LCP element. The reel is attached only after the page
 * has finished loading, and never on Save-Data or 2G/3G connections, so it cannot compete with
 * the content for bandwidth.
 */
function Backdrop({ reduced }: { reduced: boolean }) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || /(^|-)2g|3g/.test(conn?.effectiveType ?? '')) return;
    const start = () => setPlay(true);
    if (document.readyState === 'complete') { const t = window.setTimeout(start, 300); return () => window.clearTimeout(t); }
    window.addEventListener('load', start, { once: true });
    return () => window.removeEventListener('load', start);
  }, [reduced]);

  return (
    <div className="cine-slide on" aria-hidden="true">
      <img src={HERO_POSTER} alt="" width={2048} height={1152} fetchPriority="high" decoding="async" />
      {play && (
        <video autoPlay muted loop playsInline preload="auto" poster={HERO_POSTER}>
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const figure = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => { setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);

  // Pointer parallax: the backdrop drifts with the cursor, the portrait panel against it.
  useEffect(() => {
    const el = section.current, m = media.current, f = figure.current;
    if (!el || !m || !f || reduced) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const tick = () => {
      cx += (tx - cx) * 0.07; cy += (ty - cy) * 0.07;
      m.style.transform = `translate3d(${cx}px, ${cy}px, 0) scale(1.07)`;
      f.style.transform = `translate3d(${-cx * 0.6}px, ${-cy * 0.6}px, 0)`;
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) raf = requestAnimationFrame(tick); else raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = -((e.clientX - r.left) / r.width - 0.5) * 24;
      ty = -((e.clientY - r.top) / r.height - 0.5) * 16;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick); };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave); if (raf) cancelAnimationFrame(raf); };
  }, [reduced]);

  return (
    <>
    <IntroSequence />
    <section ref={section} className="cine" aria-label="Introduction">
      <div ref={media} className="cine-media" aria-hidden="true">
        <Backdrop reduced={reduced} />
      </div>
      <div className="cine-shade" aria-hidden="true" />
      <div className="cine-grain" aria-hidden="true" />

      <div className="wrap cine-stage">
        <div className="cine-copy">
          <h1 className="cine-h1">
            <span className="rise"><span>Veneers made</span></span>
            <span className="rise"><span style={{ ['--d' as string]: '0.1s' }}>for your face,</span></span>
            <span className="rise"><span style={{ ['--d' as string]: '0.2s' }}><em>not from a template.</em></span></span>
          </h1>
          <p className="cine-lede">
            Lab-made porcelain veneers, designed against your skin in daylight and placed by a licensed dentist serving
            metro Atlanta. You approve the design before anything permanent happens.
          </p>
          <div className="cine-actions">
            <Link className="btn solid" href="/consultation/">Book a consultation</Link>
            <Link className="btn" href="/results/">See the cases</Link>
          </div>

          <Link href="/results/" className="cine-cases" aria-label="See real patient transformations">
            <span className="cine-cases-thumbs" aria-hidden="true">
              {cases.map((c, i) => (
                <span key={c.src} className="cine-thumb" style={{ ['--i' as string]: i }}>
                  <img src={c.src} alt="" width={160} height={80} loading="lazy" decoding="async" />
                </span>
              ))}
            </span>
            <span className="cine-cases-text">
              <span className="cine-cases-k">Real patients, before and after</span>
              <span className="cine-cases-v">{cases.map((c) => c.name).join(' · ')}</span>
            </span>
          </Link>
        </div>

        <div ref={figure} className="cine-figure">
          <GlareHover width="100%" height="100%" background="transparent" borderRadius="22px" borderColor="rgba(242,241,237,0.18)" glareColor="#ffffff" glareOpacity={0.22} glareAngle={-32} glareSize={260} transitionDuration={900} className="cine-figure-glare">
            <img src="/photos/ennuson-hallway.webp" alt="Dr. Eric Ennuson, DDS, in the practice hallway" width={1024} height={1535} className="cine-figure-img" fetchPriority="high" />
          </GlareHover>
          <div className="cine-figure-cap">
            <span className="cine-figure-name">Dr. Eric Ennuson, DDS</span>
            <span className="cine-figure-sub">USC Herman Ostrow · Licensed, Georgia Board of Dentistry</span>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
