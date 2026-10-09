'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const TeethModel = dynamic(() => import('@/components/TeethModel'), { ssr: false });

const MODELS: { id: string; src: string; label: string; rotation?: [number, number, number] }[] = [
  { id: 'antipov', src: '/models/teeth.glb', label: 'Antipov "Human teeth" (CC-BY 4.0)', rotation: [0, 0, 0] },
];

export default function TeethLabClient() {
  // ?m=<index>&mix=<0-100> lets headless captures pick a variant without clicking.
  const [i, setI] = useState(0);
  useEffect(() => {
    const n = Number(new URLSearchParams(window.location.search).get('m'));
    if (Number.isFinite(n) && n >= 0 && n < MODELS.length) setI(n);
  }, []);
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {MODELS.map((m, idx) => (
          <button key={m.id} className={`btn${idx === i ? ' solid' : ''}`} onClick={() => setI(idx)}>{m.label}</button>
        ))}
      </div>
      <TeethModel key={MODELS[i].id} src={MODELS[i].src} rotation={MODELS[i].rotation} />
    </div>
  );
}
