'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * 0→1 as `ref` travels through the viewport. Default: 0 when the element's top
 * reaches the viewport bottom, 1 when its bottom reaches the viewport top.
 * Reads on scroll/resize via rAF; returns 1 under prefers-reduced-motion so
 * scroll-driven states render in their resolved form.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  opts: { start?: 'enter' | 'top'; end?: 'leave' | 'bottom' } = {},
) {
  const [p, setP] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced.current) { setP(1); return; }
    let raf = 0;
    const read = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const s = opts.start === 'top' ? -r.top : vh - r.top;          // distance travelled since start
      const total = opts.start === 'top'
        ? (opts.end === 'bottom' ? r.height - vh : r.height)
        : (opts.end === 'bottom' ? r.height : r.height + vh);
      const next = total <= 0 ? 1 : Math.min(1, Math.max(0, s / total));
      setP((prev) => (Math.abs(prev - next) < 0.001 ? prev : next));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, opts.start, opts.end]);

  return p;
}
