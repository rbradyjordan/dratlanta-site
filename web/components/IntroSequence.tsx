'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Loader intro (home, once per session, click to skip, off under reduced motion).
 * Rendered in the server HTML so it is on screen from the first paint; an inline script
 * hides it before paint for visitors who have already seen it this session.
 * Ink plate → the Midtown skyline draws in gold → a dental arch draws beneath it →
 * counter reaches 100 → the plate lifts to reveal the hero.
 */
const DRAW_MS = 1100;
const HOLD_MS = 2500;
const LIFT_MS = 800;

/* Skip the intro for returning visitors and reduced motion. Crawlers get exactly what a first-time visitor gets:
   the page content is in the HTML and fully painted beneath the plate, which is an overlay, never a gate. */
const GATE = `(function(){try{if(sessionStorage.getItem('intro-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches){var s=document.createElement('style');s.textContent='.ld{display:none!important}';document.head.appendChild(s)}}catch(e){}})();`;

export default function IntroSequence() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in');
  const [count, setCount] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (sessionStorage.getItem('intro-seen') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPhase('done'); return; }
    sessionStorage.setItem('intro-seen', '1');
    window.__lenis?.stop();
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / (HOLD_MS - 200));
      setCount(Math.round(ease(t) * 100));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    const t1 = window.setTimeout(() => setPhase('out'), HOLD_MS);
    const t2 = window.setTimeout(() => setPhase('done'), HOLD_MS + LIFT_MS);
    return () => { cancelAnimationFrame(raf.current); window.clearTimeout(t1); window.clearTimeout(t2); };
  }, []);

  useEffect(() => { if (phase === 'done') window.__lenis?.start(); }, [phase]);

  if (phase === 'done') return null;

  const skip = () => {
    if (phase !== 'in') return;
    cancelAnimationFrame(raf.current); setCount(100); setPhase('out');
    window.setTimeout(() => setPhase('done'), LIFT_MS);
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: GATE }} />
      <div className={`ld ${phase}`} role="presentation" onClick={skip} style={{ ['--draw' as string]: `${DRAW_MS}ms` }}>
        <div className="ld-stage" aria-hidden="true">
          <div className="ld-sky-wrap">
            <div className="ld-sky" />
            <div className="ld-sky ld-sky-glow" />
          </div>

          {/* Dental arch, occlusal view: fourteen upper teeth outlined along the curve, drawn centre-out */}
          <svg className="ld-arch" viewBox="0 0 224 190" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
            <rect pathLength={1} x="-12.9" y="-10.5" width="25.8" height="21.0" rx="6.6" transform="translate(124.8 13.3) rotate(11.7)" style={{ animationDelay: 'calc(var(--draw) + 0.30s)' }} />
            <rect pathLength={1} x="-12.9" y="-10.5" width="25.8" height="21.0" rx="6.6" transform="translate(99.2 13.3) rotate(-11.7)" style={{ animationDelay: 'calc(var(--draw) + 0.30s)' }} />
            <rect pathLength={1} x="-9.9" y="-9.6" width="19.8" height="19.2" rx="6.6" transform="translate(147.3 22.3) rotate(31.3)" style={{ animationDelay: 'calc(var(--draw) + 0.37s)' }} />
            <rect pathLength={1} x="-9.9" y="-9.6" width="19.8" height="19.2" rx="6.6" transform="translate(76.7 22.3) rotate(-31.3)" style={{ animationDelay: 'calc(var(--draw) + 0.37s)' }} />
            <rect pathLength={1} x="-11.4" y="-12.0" width="22.8" height="24.0" rx="9.0" transform="translate(165.0 36.6) rotate(45.8)" style={{ animationDelay: 'calc(var(--draw) + 0.44s)' }} />
            <rect pathLength={1} x="-11.4" y="-12.0" width="22.8" height="24.0" rx="9.0" transform="translate(59.0 36.6) rotate(-45.8)" style={{ animationDelay: 'calc(var(--draw) + 0.44s)' }} />
            <rect pathLength={1} x="-10.5" y="-13.8" width="21.0" height="27.6" rx="9.0" transform="translate(179.4 54.9) rotate(57.4)" style={{ animationDelay: 'calc(var(--draw) + 0.51s)' }} />
            <rect pathLength={1} x="-10.5" y="-13.8" width="21.0" height="27.6" rx="9.0" transform="translate(44.6 54.9) rotate(-57.4)" style={{ animationDelay: 'calc(var(--draw) + 0.51s)' }} />
            <rect pathLength={1} x="-9.9" y="-13.8" width="19.8" height="27.6" rx="9.0" transform="translate(189.7 74.2) rotate(66.1)" style={{ animationDelay: 'calc(var(--draw) + 0.58s)' }} />
            <rect pathLength={1} x="-9.9" y="-13.8" width="19.8" height="27.6" rx="9.0" transform="translate(34.3 74.2) rotate(-66.1)" style={{ animationDelay: 'calc(var(--draw) + 0.58s)' }} />
            <rect pathLength={1} x="-15.3" y="-16.5" width="30.6" height="33.0" rx="10.8" transform="translate(198.5 99.4) rotate(75.1)" style={{ animationDelay: 'calc(var(--draw) + 0.65s)' }} />
            <rect pathLength={1} x="-15.3" y="-16.5" width="30.6" height="33.0" rx="10.8" transform="translate(25.5 99.4) rotate(-75.1)" style={{ animationDelay: 'calc(var(--draw) + 0.65s)' }} />
            <rect pathLength={1} x="-14.1" y="-15.9" width="28.2" height="31.8" rx="10.8" transform="translate(204.0 129.8) rotate(84.3)" style={{ animationDelay: 'calc(var(--draw) + 0.72s)' }} />
            <rect pathLength={1} x="-14.1" y="-15.9" width="28.2" height="31.8" rx="10.8" transform="translate(20.0 129.8) rotate(-84.3)" style={{ animationDelay: 'calc(var(--draw) + 0.72s)' }} />
          </svg>
        </div>

        <div className="ld-foot" aria-hidden="true">
          <div className="ld-mark">
            <span className="ld-mark-name">Dr. Atlanta</span>
            <span className="ld-mark-sub">Cosmetic Dentistry &nbsp;·&nbsp; Metro Atlanta</span>
          </div>
          <div className="ld-count">{String(count).padStart(2, '0')}<span className="ld-pct">%</span></div>
        </div>
        <span className="ld-skip">Click to skip</span>
      </div>
    </>
  );
}
