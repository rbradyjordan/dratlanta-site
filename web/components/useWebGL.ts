'use client';

import { useEffect, useState } from 'react';

/** True once a WebGL context has been confirmed; false when the browser can't give us one. Null until checked. */
export function useWebGL() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      setOk(!!gl);
      (gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context')?.loseContext();
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}
