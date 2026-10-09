'use client';

import { useState } from 'react';
import styles from './ConsultPlanner.module.css';
import GhlBooking from './GhlBooking';

const Q = [
  {
    key: 'goal',
    prompt: 'What do you want to change?',
    options: ['The color', 'Shape or gaps', 'Everything — a full smile', 'Fixing work I already had done', 'Not sure yet'],
  },
  {
    key: 'history',
    prompt: 'Have you had cosmetic dental work before?',
    options: ['Never', 'Whitening only', 'Bonding or composite', 'Veneers elsewhere'],
  },
  {
    key: 'when',
    prompt: 'When are you thinking?',
    options: ['As soon as possible', 'In the next few months', 'Before an event', 'Just researching'],
  },
] as const;

type Answers = Partial<Record<(typeof Q)[number]['key'], string>>;

/** Three taps that prefill the request, so the first text from the team is already specific. */
export default function ConsultPlanner() {
  const [a, setA] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const done = step >= Q.length;

  const choose = (key: keyof Answers, v: string) => {
    setA((prev) => ({ ...prev, [key]: v }));
    setStep((s) => s + 1);
  };

  const summary = [a.goal, a.history, a.when].filter(Boolean).join(' · ');

  return (
    <div className={styles.wrap}>
      <div className={styles.planner}>
        <div className={styles.progress} aria-hidden="true">
          {Q.map((_, i) => <span key={i} className={`${styles.dot} ${i < step ? styles.done : ''} ${i === step ? styles.cur : ''}`} />)}
        </div>
        {!done ? (
          <div key={step} className={styles.q}>
            <h3 className={styles.prompt}>{Q[step].prompt}</h3>
            <div className={styles.opts}>
              {Q[step].options.map((o) => (
                <button key={o} className={styles.opt} onClick={() => choose(Q[step].key, o)}>{o}</button>
              ))}
            </div>
            {step > 0 && <button className={styles.back} onClick={() => setStep(step - 1)}>Back</button>}
          </div>
        ) : (
          <div className={styles.q}>
            <h3 className={styles.prompt}>Got it. Where should we text you?</h3>
            <p className="small">{summary}</p>
            <button className={styles.back} onClick={() => { setStep(0); setA({}); }}>Start over</button>
          </div>
        )}
      </div>

      <div id="book" className={`form ${styles.form}`}>
        <p className="small" style={{ marginBottom: 14 }}>You'll get one text from the team to pick a time. Nothing else, ever.</p>
        <GhlBooking prefill={{ notes: summary }} />
      </div>
    </div>
  );
}
