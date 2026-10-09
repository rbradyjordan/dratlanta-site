'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * True once the referenced element is within `margin` of the viewport AND the page has finished loading.
 * Used to keep Three.js (code, shaders, and the model file) off the main thread until someone can actually
 * see the canvas, so it never competes with first paint, LCP, or early interaction. `wideMargin` gives large
 * screens (which have the headroom) a longer lead so the scene is ready before it scrolls into view.
 */
export function useNearViewport<T extends Element>(margin = '300px', wideMargin?: string) {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (!('IntersectionObserver' in window)) { setNear(true); return; }
    let io: IntersectionObserver | null = null;
    const watch = () => {
      const m = wideMargin && window.matchMedia('(min-width: 961px)').matches ? wideMargin : margin;
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io?.disconnect(); } }, { rootMargin: m });
      io.observe(el);
    };
    if (document.readyState === 'complete') watch();
    else window.addEventListener('load', watch, { once: true });
    return () => { io?.disconnect(); window.removeEventListener('load', watch); };
  }, [margin, wideMargin, near]);

  return [ref, near] as const;
}
