'use client';

import { ScrollVelocityContainer, ScrollVelocityRow } from '@/components/ui/scroll-based-velocity';

const items = [
  'Porcelain veneers', 'Smile makeovers', 'Metro Atlanta', 'Transparent pricing', 'Clean results',
  'No overseas risk', 'Evening and weekend consultations', 'Licensed, Georgia Board of Dentistry',
];

/** Thin editorial ticker under the hero. Drifts on its own, speeds with your scroll. */
export default function Ticker() {
  return (
    <div className="tk" aria-hidden="true">
      <ScrollVelocityContainer>
        <ScrollVelocityRow baseVelocity={2.4} direction={1} className="tk-row">
          {items.map((t) => (
            <span key={t} className="tk-item">{t}<i className="tk-dot" /></span>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
}
