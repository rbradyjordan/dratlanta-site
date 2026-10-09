import Link from 'next/link';
import { SITE } from '@/lib/site';

export type Source = { label: string; href: string };

export const SOURCES = {
  adaStatement: { label: 'American Dental Association, “Statement on Recent Reports of Veneer Technicians,” May 14, 2024', href: 'https://www.ada.org/about/press-releases/statement-on-recent-reports-of-veneer-technicians' },
  adaVeneers: { label: 'American Dental Association, MouthHealthy: Veneers', href: 'https://www.mouthhealthy.org/all-topics-a-z/veneers' },
  gaStatute: { label: 'Official Code of Georgia § 43-11-17, acts which constitute the practice of dentistry', href: 'https://law.onecle.com/georgia/title-43/43-11-17.html' },
  gaLookup: { label: 'Georgia Board of Dentistry, public license verification', href: SITE.licenseLookup },
  gaCease: { label: 'Georgia Board of Dentistry, unlicensed practice cease and desist orders', href: 'https://gbd.georgia.gov/unlicensed-practice-cease-and-desist-orders' },
  gaComplaints: { label: 'Georgia Board of Dentistry, complaints and investigations', href: 'https://gbd.georgia.gov/complaints-and-investigations' },
} satisfies Record<string, Source>;

/**
 * Who is responsible for the page, how to check him, and what the page rests on.
 * A clinical-review line appears only when SITE.clinicalReview holds a real date.
 */
export default function PageNote({ sources = [], results = false }: { sources?: Source[]; results?: boolean }) {
  const reviewed = SITE.clinicalReview
    ? new Date(`${SITE.clinicalReview}T12:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;
  return (
    <aside className="pnote" aria-label="About this page">
      <div className="wrap pnote-in">
        <div>
          <h2 className="pnote-h">About this page</h2>
          <p>
            Treatment described here is provided by <Link className="link" href="/about/">{SITE.doctor}</Link>, a graduate of the {SITE.school},
            licensed by the Georgia Board of Dentistry and practicing at {SITE.practice} in {SITE.city}, Georgia.
            {' '}<a className="link" href={SITE.licenseLookup} target="_blank" rel="noopener">Verify the license</a>.
          </p>
          {reviewed && <p>Clinically reviewed by Eric Ennuson, DDS, on {reviewed}.</p>}
          <p>
            This is general information, not a diagnosis. A treatment plan requires an examination.
            {results ? ' Photographs show patients of this practice, shared with their consent. Individual results vary.' : ''}
          </p>
        </div>
        {sources.length > 0 && (
          <div>
            <h2 className="pnote-h">Sources</h2>
            <ul>
              {sources.map((s) => <li key={s.href}><a className="link" href={s.href} target="_blank" rel="noopener">{s.label}</a></li>)}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
