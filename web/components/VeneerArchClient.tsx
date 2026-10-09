'use client';

import dynamic from 'next/dynamic';
import { useWebGL } from './useWebGL';

/** Client boundary so the WebGL scene is never server-rendered or in the initial bundle. */
const VeneerArch = dynamic(() => import('./VeneerArch'), {
  ssr: false,
  loading: () => <div style={{ height: 'clamp(300px, 46vw, 560px)', borderRadius: 6, background: 'var(--porcelain-2)' }} aria-hidden="true" />,
});

export default function VeneerArchClient() {
  const webgl = useWebGL();
  if (webgl === false) {
    return (
      <div style={{ padding: '32px 24px', borderRadius: 6, background: 'var(--porcelain-2)', color: 'var(--text-2)', maxWidth: '48ch' }}>
        The interactive arch needs WebGL, which this browser has turned off. The four visits below explain the same process.
      </div>
    );
  }
  return webgl ? <VeneerArch /> : null;
}
