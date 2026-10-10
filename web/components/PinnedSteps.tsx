'use client';

import { useRef } from 'react';
import { useScrollProgress } from './useScrollProgress';
import styles from './PinnedSteps.module.css';

/** `pos` is the photo's focal point (CSS object-position) so faces stay in frame at every crop. */
export type Step = { title: string; body: string; src: string; alt: string; pos?: string };

/**
 * Captive scroll. The frame pins for N viewports; each step the photo crosses to the
 * other side; an ink tide rises from the floor as you scroll and the type, set in
 * difference blend, inverts wherever the tide has reached. Reduced motion → plain list.
 */
export default function PinnedSteps({ heading, steps }: { heading: string; steps: Step[]; dark?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useScrollProgress(ref, { start: 'top', end: 'bottom' });
  const n = steps.length;
  const fi = Math.min(n - 1, Math.max(0, p * n));
  const active = Math.min(n - 1, Math.floor(fi));
  const flipped = active % 2 === 1;
  // Tide: a little late to start, finished before the last step leaves.
  const tide = Math.min(1, Math.max(0, (p - 0.04) / 0.88));

  return (
    <section ref={ref} className={styles.wrap} style={{ height: `${n * 100}svh` }} aria-label={heading}>
      <div className={styles.pin}>
        <div className={styles.tide} style={{ height: `${tide * 100}%` }} aria-hidden="true" />

        <div className={`wrap ${styles.inner} ${flipped ? styles.flip : ''}`}>
          <div className={styles.media}>
            {steps.map((s, i) => (
              <img
                key={s.src}
                src={s.src}
                alt={s.alt}
                className={`${styles.img} ${i === active ? styles.imgOn : i < active ? styles.imgGone : ''}`}
                loading="lazy"
                decoding="async"
                style={s.pos ? { objectPosition: s.pos } : undefined}
              />
            ))}
            <span className={styles.count} aria-hidden="true">{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
          </div>

          <div className={styles.copy}>
            <h2 className={styles.heading}>{heading}</h2>
            <ol className={styles.list}>
              {steps.map((s, i) => {
                const state = i < active ? styles.done : i === active ? styles.on : styles.next;
                return (
                  <li key={s.title} className={`${styles.step} ${state}`} aria-current={i === active ? 'step' : undefined}>
                    <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className={styles.title}>{s.title}</h3>
                      <p className={styles.body}>{s.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
