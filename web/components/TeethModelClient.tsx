'use client';

import dynamic from 'next/dynamic';
import { useWebGL } from './useWebGL';
import { useNearViewport } from './useNearViewport';

/** Client boundary: the WebGL dentition viewer is never server-rendered or in the initial bundle. */
const TeethModel = dynamic(() => import('./TeethModel'), {
  ssr: false,
  loading: () => <div className="model-wait" aria-hidden="true"><span>Preparing the model</span></div>,
});

export default function TeethModelClient() {
  const webgl = useWebGL();
  const [slot, near] = useNearViewport<HTMLDivElement>('60px', '900px');
  if (webgl === false) {
    return (
      <div style={{ padding: '32px 24px', borderRadius: 6, background: 'var(--porcelain-2)', color: 'var(--text-2)', maxWidth: '48ch' }}>
        The interactive model needs WebGL, which this browser has turned off. The visits below explain the same process.
      </div>
    );
  }
  return (
    <div ref={slot}>
      {webgl && near ? (
        <TeethModel
          src="/models/teeth.glb"
          zoom={1.2}
          credit="Model: “Human teeth” by Alexander Antipov, CC BY 4.0."
        />
      ) : (
        <div className="model-wait" aria-hidden="true"><span>Preparing the model</span></div>
      )}
    </div>
  );
}
