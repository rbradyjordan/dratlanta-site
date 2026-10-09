'use client';

import { useRef } from 'react';
import { useScrollProgress } from './useScrollProgress';

/** A statement whose words fill in as it crosses the viewport. */
export default function TextScrub({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const p = useScrollProgress(ref);
  const words = text.split(' ');
  // Fill across the middle 60% of the travel so it reads while centred.
  const t = Math.min(1, Math.max(0, (p - 0.2) / 0.6));
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => {
        const k = Math.min(1, Math.max(0, t * words.length - i + 1));
        return (
          <span key={i} aria-hidden="true" style={{ opacity: 0.22 + 0.78 * k, transition: 'opacity 0.25s linear' }}>
            {w}{i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </p>
  );
}
