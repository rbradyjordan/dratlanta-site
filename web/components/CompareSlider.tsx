'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useScrollProgress } from './useScrollProgress';
import styles from './CompareSlider.module.css';

type Props = {
  before: string;
  after: string;
  alt: string;
  ratio?: string;            // CSS aspect-ratio
  /** Wipe from before → after as the frame scrolls through view, until the visitor takes over. */
  scrollDriven?: boolean;
  labels?: [string, string];
};

export default function CompareSlider({ before, after, alt, ratio = '2 / 1', scrollDriven = true, labels = ['Before', 'After'] }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref);
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!scrollDriven || touched) return;
    // Hold "before" until the frame is well into view, then wipe to "after" by the time it's centred.
    const t = Math.min(1, Math.max(0, (p - 0.25) / 0.35));
    setPos(Math.round(8 + 84 * t));
  }, [p, scrollDriven, touched]);

  return (
    <div ref={ref} className={styles.cmp} style={{ aspectRatio: ratio }}>
      <img className={styles.layer} src={before} alt={`${alt} — before`} loading="lazy" decoding="async" />
      <img className={styles.layer} src={after} alt={`${alt} — after`} loading="lazy" decoding="async" style={{ clipPath: `inset(0 0 0 ${pos}%)` }} />
      <span className={styles.cap} aria-hidden="true">{labels[0]}</span>
      <span className={`${styles.cap} ${styles.capR}`} aria-hidden="true">{labels[1]}</span>
      <div className={styles.handle} style={{ left: `${pos}%` }} aria-hidden="true"><span className={styles.knob} /></div>
      <label htmlFor={id} className={styles.srOnly}>Reveal the after photo</label>
      <input
        id={id}
        className={styles.range}
        type="range" min={0} max={100} value={pos}
        onPointerDown={() => setTouched(true)}
        onKeyDown={() => setTouched(true)}
        onChange={(e) => { setTouched(true); setPos(Number(e.target.value)); }}
        aria-valuetext={`${pos}% after`}
      />
    </div>
  );
}
