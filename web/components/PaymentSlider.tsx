'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NumberTicker } from '@/components/ui/number-ticker';
import styles from './PaymentSlider.module.css';

const PRICE = 8999;
const TERMS = [12, 24, 36, 48, 60];
const LAST = TERMS.length - 1;

/**
 * The monthly figure is the hero; the price stays present but quiet. Everything in the card answers the drag:
 * the color field drifts and changes hue, the months fill in, the smile under the number widens.
 * Reg Z: a stated payment has to travel with its APR, down payment, and term, so one plain line always does.
 */
export default function PaymentSlider({ dark = false }: { dark?: boolean }) {
  const [pos, setPos] = useState(2);          // continuous while dragging, so the visuals follow the thumb
  const i = Math.min(LAST, Math.max(0, Math.round(pos)));
  const term = TERMS[i];
  const monthly = Math.ceil(PRICE / term);
  const t = pos / LAST;                        // 0 → 1 across the track
  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const snap = () => setPos(i);

  return (
    <div
      className={`${styles.card} ${dark ? styles.onDark : ''}`}
      style={{ ['--t' as string]: t.toFixed(3), ['--p' as string]: `${(t * 100).toFixed(1)}%` }}
    >
      <div className={styles.field} aria-hidden="true">
        <span className={`${styles.blob} ${styles.b1}`} />
        <span className={`${styles.blob} ${styles.b2}`} />
        <span className={`${styles.blob} ${styles.b3}`} />
        <span className={`${styles.blob} ${styles.b4}`} />
      </div>

      <div className={styles.body}>
        <p className={styles.what}>Full-arch smile design <span>{fmt(PRICE)}</span></p>

        <div className={styles.hero}>
          <div className={styles.figure} aria-live="polite" aria-label={`${fmt(monthly)} per month for ${term} months`}>
            <div className={styles.monthly}>
              <span className={styles.cur}>$</span>
              {/* Seeded with the real first value so server HTML is correct; the spring only runs when the term changes. */}
              <NumberTicker value={monthly} startValue={Math.ceil(PRICE / TERMS[2])} className={styles.num} />
              <span className={styles.per}>/month</span>
            </div>
            <svg className={styles.smile} viewBox="0 0 200 44" fill="none" aria-hidden="true">
              <path d={`M8 8 Q 100 ${(10 + 30 * t).toFixed(1)} 192 8`} />
            </svg>
            <p className={styles.terms}><b>{term}</b> payments <i /> <b>0%</b> APR <i /> <b>$0</b> down</p>
          </div>

          <div className={styles.months} aria-hidden="true">
            {Array.from({ length: 60 }, (_, k) => (
              <span key={k} className={`${styles.dot} ${k < term ? styles.dotOn : ''}`} style={{ ['--k' as string]: k % 12 }} />
            ))}
            <span className={styles.monthsCap}>{term / 12} {term === 12 ? 'year' : 'years'}</span>
          </div>
        </div>

        <div className={styles.control}>
          <label htmlFor={dark ? 'term-home' : 'term'} className={styles.srOnly}>Payment term in months</label>
          <input
            id={dark ? 'term-home' : 'term'} className={styles.range} type="range"
            min={0} max={LAST} step={0.01} value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            onPointerUp={snap} onKeyUp={snap} onBlur={snap}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setPos(Math.min(LAST, i + 1)); }
              if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setPos(Math.max(0, i - 1)); }
            }}
            aria-valuetext={`${term} months, ${fmt(monthly)} per month`}
          />
          <div className={styles.ticks} aria-hidden="true">
            {TERMS.map((m, idx) => (
              <button key={m} className={`${styles.tick} ${idx === i ? styles.tickOn : ''}`} onClick={() => setPos(idx)} tabIndex={-1}>{m} mo</button>
            ))}
          </div>
        </div>

        <div className={styles.foot}>
          <Link className={`btn solid ${styles.go}`} href="/consultation/">Get your written number</Link>
          <p className={styles.disc}>
            Example: {fmt(PRICE)} at 0% APR, $0 down, is {term} monthly payments of {fmt(monthly)}. For qualified applicants through
            Cherry, Sunbit, or HFD; others may be offered 5.99% to 35.99% APR, which raises the payment. Subject to credit approval.
            Not an offer of credit.
          </p>
        </div>
      </div>
    </div>
  );
}
