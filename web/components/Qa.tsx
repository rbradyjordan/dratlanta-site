import type { ReactNode } from 'react';

export type QaItem = { q: string; a: ReactNode; text: string };

/** Questions with their answers on the page, not folded away: readable by people skimming and by anything parsing the page. */
export default function Qa({ items }: { items: QaItem[] }) {
  return (
    <div className="qa">
      {items.map((it) => (
        <div key={it.q} className="qa-item">
          <h3 className="qa-q">{it.q}</h3>
          <p className="qa-a">{it.a}</p>
        </div>
      ))}
    </div>
  );
}
