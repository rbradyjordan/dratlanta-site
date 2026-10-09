'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

/**
 * GoHighLevel (LeadConnector) embed. Works for a form (/widget/form/ID) or a booking
 * calendar (/widget/booking/ID). Set NEXT_PUBLIC_GHL_EMBED_URL to switch; the default is
 * the practice's existing form. `prefill` is appended as query params, which GHL reads
 * into matching fields (standard fields by name, custom fields by their key).
 */
const DEFAULT_URL = 'https://api.leadconnectorhq.com/widget/form/S6q7xzq2zw5JgBFtZ0nZ';
const EMBED_URL = process.env.NEXT_PUBLIC_GHL_EMBED_URL || DEFAULT_URL;

export default function GhlBooking({ prefill = {}, minHeight = 640 }: { prefill?: Record<string, string>; minHeight?: number }) {
  const [height, setHeight] = useState(minHeight);
  const [loaded, setLoaded] = useState(false);

  const params = new URLSearchParams(Object.entries(prefill).filter(([, v]) => v));
  const src = params.toString() ? `${EMBED_URL}?${params}` : EMBED_URL;
  const id = EMBED_URL.split('/').filter(Boolean).pop() ?? 'ghl';

  // GHL's embed script posts {formId, height}; mirror it so the frame never scrolls internally.
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (typeof e.origin !== 'string' || !/leadconnectorhq\.com$|msgsndr\.com$/.test(new URL(e.origin).hostname)) return;
      const d = e.data;
      const h = Array.isArray(d) ? Number(d[1]) : typeof d === 'object' && d ? Number(d.height ?? d.h) : NaN;
      if (Number.isFinite(h) && h > 200) setHeight(Math.max(minHeight, Math.ceil(h)));
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [minHeight]);

  return (
    <div className={`ghl ${loaded ? 'is-loaded' : ''}`}>
      <iframe
        src={src}
        id={`inline-${id}`}
        title="Request a consultation"
        style={{ width: '100%', height, border: 'none', display: 'block', borderRadius: 6 }}
        scrolling="no"
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-activation-type="alwaysActivated"
        data-deactivation-type="neverDeactivate"
        data-form-id={id}
        data-form-name="Consultation request"
        onLoad={() => setLoaded(true)}
      />
      <noscript>
        <p className="small">Call <a className="link" href="tel:+14043834574">(404) 383-4574</a> to book.</p>
      </noscript>
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}
