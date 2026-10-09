import TeethLabClient from './TeethLabClient';

/* DEV ONLY — model proving ground. Remove before launch (see LAUNCH-CHECKLIST). */
export const metadata = { title: 'Lab — teeth model', robots: { index: false, follow: false } };

export default function TeethLab() {
  return (
    <section className="band">
      <div className="wrap">
        <h1 style={{ fontSize: '2rem', marginBottom: 24 }}>Teeth model lab</h1>
        <TeethLabClient />
      </div>
    </section>
  );
}
