'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './ShadeStudio.module.css';
import { useWebGL } from './useWebGL';
import { useNearViewport } from './useNearViewport';

const PorcelainTabs = dynamic(() => import('./PorcelainTabs'), { ssr: false, loading: () => null });

function mixHex(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ch = (s: number) => Math.round(((pa >> s) & 255) * (1 - t) + ((pb >> s) & 255) * t);
  return `#${[16, 8, 0].map((s) => ch(s).toString(16).padStart(2, '0')).join('')}`;
}

/* Monk Skin Tone scale (10 points), light to deep. */
const TONES = [
  '#F6EDE4', '#F3E7DB', '#F7EAD0', '#EADABA', '#D7BD96',
  '#A07E56', '#825C43', '#604134', '#3A312A', '#292420',
];

/* Common porcelain shade tabs, cool/bright to warm. warmth 0..1 */
const SHADES = [
  { id: 'BL1', hex: '#F8F8F3', warmth: 0.05, label: 'Bleach 1' },
  { id: 'BL2', hex: '#F5F4ED', warmth: 0.15, label: 'Bleach 2' },
  { id: 'BL3', hex: '#F2F0E6', warmth: 0.3, label: 'Bleach 3' },
  { id: 'B1', hex: '#F0EBDB', warmth: 0.55, label: 'B1' },
  { id: 'A1', hex: '#EEE5D2', warmth: 0.7, label: 'A1' },
  { id: 'A2', hex: '#E7DBC3', warmth: 0.9, label: 'A2' },
];

type Undertone = 'cool' | 'neutral' | 'warm';
const UNDERTONE_TINT: Record<Undertone, string> = {
  cool: '#9FA8C4',
  neutral: 'transparent',
  warm: '#D99A5C',
};

function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

function reading(shade: (typeof SHADES)[number], toneIdx: number, undertone: Undertone, trans: number) {
  const delta = luminance(shade.hex) - luminance(TONES[toneIdx]);
  const toneWarmth = undertone === 'cool' ? 0.15 : undertone === 'warm' ? 0.85 : 0.5;
  const castGap = shade.warmth - toneWarmth; // negative = shade cooler than you
  const deep = toneIdx >= 5;

  let headline: string;
  let note: string;

  if (delta > 0.72 && castGap < -0.3) {
    headline = 'Reads chalky.';
    note = 'The value jump is hard and the cool cast fights your undertone. This is the most common mistake we correct.';
  } else if (delta > 0.72) {
    headline = 'Reads very bright.';
    note = deep
      ? 'Bold rather than natural against deeper skin. We can get here if that is the goal, but it is a choice, not a default.'
      : 'Bright, and it holds. On lighter skin this range stays natural if the translucency is right.';
  } else if (delta > 0.42) {
    if (Math.abs(castGap) <= 0.3) {
      headline = 'Reads bright and natural.';
      note = 'This is the range most of our cases land in. The porcelain lifts the smile without announcing itself.';
    } else {
      headline = castGap < 0 ? 'Bright, but leaning cool.' : 'Bright, but leaning warm.';
      note = castGap < 0
        ? 'The cast sits against your undertone. We would pull it a step warmer and let translucency carry the brightness.'
        : 'A touch warm for your undertone. One step cooler usually reads cleaner in photos.';
    }
  } else {
    headline = 'Reads soft.';
    note = 'Natural, but it can go dull in photographs. Translucency and surface texture do the work in this range.';
  }

  let transNote = '';
  if (trans < 22) transNote = 'Low translucency reads flat and denture-like at the edges.';
  else if (trans > 72) transNote = deep
    ? 'Very sheer porcelain lets the dark oral background through and can gray the edge.'
    : 'Very sheer edges read youthful here; we would hold the body opacity.';

  return { headline, note, transNote };
}

export default function ShadeStudio({ compact = false }: { compact?: boolean }) {
  const [tone, setTone] = useState(6);
  const [undertone, setUndertone] = useState<Undertone>('neutral');
  const [shade, setShade] = useState(2);
  const [trans, setTrans] = useState(45);
  const [touched, setTouched] = useState(false);
  const webgl = useWebGL();
  const [slot, near] = useNearViewport<HTMLDivElement>();
  const pick = (i: number) => { setShade(i); setTouched(true); };

  const skin = useMemo(() => {
    const tint = UNDERTONE_TINT[undertone];
    return tint === 'transparent' ? TONES[tone] : mixHex(TONES[tone], tint, 0.1);
  }, [tone, undertone]);

  const r = reading(SHADES[shade], tone, undertone, trans);

  /* CSS tabs: the WebGL fallback and the no-JS/first-paint state. */
  const cssTabs = (
    <div className={styles.row} role="radiogroup" aria-label="Porcelain shade">
          {SHADES.map((s, i) => {
            const edge = `color-mix(in oklab, ${s.hex} ${100 - trans}%, ${TONES[tone]} ${trans}%)`;
            return (
              <button
                key={s.id}
                role="radio"
                aria-checked={shade === i}
                aria-label={`${s.label}`}
                className={`${styles.tab} ${shade === i ? styles.on : ''}`}
                style={{
                  ['--d' as string]: `${0.35 + i * 0.07}s`,
                  background: `linear-gradient(to bottom, ${s.hex} 0%, ${s.hex} ${62 - trans * 0.25}%, ${edge} 100%)`,
                }}
                onClick={() => pick(i)}
              >
                <span className={styles.tabId}>{s.id}</span>
              </button>
            );
          })}
        </div>
  );

  return (
    <section className={`${styles.studio} ${compact ? styles.compact : ''}`} aria-label="Shade studio">
      <div
        ref={slot}
        className={styles.canvas}
        style={{ background: `radial-gradient(120% 110% at 50% 18%, ${mixHex(skin, '#ffffff', 0.08)} 0%, ${skin} 48%, ${mixHex(skin, '#000000', 0.16)} 100%)` }}
      >
        {webgl && near ? (
        <PorcelainTabs
          shades={SHADES}
          selected={shade}
          onSelect={pick}
          skin={skin}
          translucency={trans}
          fallback={cssTabs}
          compact={compact}
        />
        ) : (
          <div className={styles.cssStage}>{cssTabs}</div>
        )}
        {/* Keyboard/screen-reader path mirrors the 3D tabs. */}
        {webgl && near && <div className={styles.srTabs}>{cssTabs}</div>}
        <div className={`${styles.hint} ${touched ? styles.hintOff : ''}`} aria-hidden="true">Tap a tab to compare</div>
        <div className={styles.badge} aria-hidden="true">
          <span className={styles.badgeId}>{SHADES[shade].id}</span>
          <span className={styles.badgeName}>{SHADES[shade].label}{shade === 0 ? ' · brightest' : shade === SHADES.length - 1 ? ' · warmest' : ''}</span>
        </div>
      </div>

      <div className={styles.controls}>
        <ol className={styles.steps}>
          <li className={styles.stepItem}>
            <span className={styles.stepN}>01</span>
            <div className={styles.stepBody}>
              <div className={styles.ctlLabel}>Your skin tone</div>
              <div className={styles.tones} role="radiogroup" aria-label="Skin tone">
                {TONES.map((t, i) => (
                  <button
                    key={t}
                    role="radio"
                    aria-checked={tone === i}
                    aria-label={`Tone ${i + 1} of 10`}
                    className={`${styles.tone} ${tone === i ? styles.on : ''}`}
                    style={{ background: t }}
                    onClick={() => { setTone(i); setTouched(true); }}
                  />
                ))}
              </div>
              <div className={styles.scale} aria-hidden="true"><span>Lighter</span><span>Deeper</span></div>

              <div className={styles.ctlLabel} style={{ marginTop: 16 }}>Undertone <span className={styles.hintText}>Wrist veins look blue: cool. Green: warm. Can&rsquo;t tell: neutral.</span></div>
              <div className={styles.seg} role="radiogroup" aria-label="Undertone">
                {(['cool', 'neutral', 'warm'] as Undertone[]).map((u) => (
                  <button
                    key={u}
                    role="radio"
                    aria-checked={undertone === u}
                    className={`${styles.segBtn} ${undertone === u ? styles.on : ''}`}
                    onClick={() => { setUndertone(u); setTouched(true); }}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </li>

          <li className={styles.stepItem}>
            <span className={styles.stepN}>02</span>
            <div className={styles.stepBody}>
              <div className={styles.ctlLabel}>Pick a porcelain shade <span className={styles.hintText}>Or tap a tab in the picture.</span></div>
              <div className={styles.shades} role="radiogroup" aria-label="Porcelain shade">
                {SHADES.map((sh, i) => (
                  <button
                    key={sh.id}
                    role="radio"
                    aria-checked={shade === i}
                    className={`${styles.shadeBtn} ${shade === i ? styles.on : ''}`}
                    onClick={() => pick(i)}
                  >
                    <span className={styles.shadeSwatch} style={{ background: sh.hex }} />
                    <span className={styles.shadeId}>{sh.id}</span>
                  </button>
                ))}
              </div>
              <div className={styles.scale} aria-hidden="true"><span>Brighter, cooler</span><span>Softer, warmer</span></div>
            </div>
          </li>

          <li className={styles.stepItem}>
            <span className={styles.stepN}>03</span>
            <div className={styles.stepBody}>
              <label className={styles.ctlLabel} htmlFor={compact ? 'trans-c' : 'trans'}>
                Edge translucency <span className={styles.hintText}>How much light passes through the biting edge.</span>
              </label>
              <input
                id={compact ? 'trans-c' : 'trans'}
                className={styles.range}
                type="range" min={0} max={100} value={trans}
                onChange={(e) => { setTrans(Number(e.target.value)); setTouched(true); }}
              />
              <div className={styles.scale} aria-hidden="true"><span>Opaque</span><span>Natural</span><span>Sheer</span></div>
            </div>
          </li>
        </ol>

        <div className={styles.read} aria-live="polite">
          <span className={styles.readTag}>{SHADES[shade].label} on your tone</span>
          <span className={styles.readHead}>{r.headline}</span>
          <span className={styles.readNote}>{compact ? r.note : `${r.note}${r.transNote ? ` ${r.transNote}` : ''}`}</span>
        </div>

        <div className={styles.foot}>
          <p className="small">
            {compact
              ? 'A screen can only approximate this. The real decision happens with shade tabs against your skin, in daylight, with Dr. Ennuson.'
              : 'This approximates how value and cast interact. In the chair we do it with physical shade tabs against your skin, in daylight-balanced light, photographed for the lab.'}
          </p>
          <Link className="btn solid" href="/consultation/">Pick your shade in daylight</Link>
        </div>
      </div>
    </section>
  );
}
