import Link from 'next/link';
import CompareSlider from '@/components/CompareSlider';
import Photo from '@/components/Photo';
import JsonLd from '@/components/JsonLd';
import PageNote from '@/components/PageNote';
import { SITE, pageMeta } from '@/lib/site';
import { pageGraph } from '@/lib/schema';

const META = {
  title: 'Veneers Before and After, Metro Atlanta | Dr. Atlanta',
  description: 'Porcelain veneer and smile makeover before-and-after photos of real patients of Dr. Eric Ennuson, DDS. No models, no filters. Individual results vary.',
  path: '/results/',
  image: '/og/results.jpg',
};
export const metadata = pageMeta(META);

/* Only what is on record for each case. Treatment detail is added as the practice confirms it. */
const cases = [
  { id: 'sarah', name: 'Sarah R.', treatment: 'Porcelain veneers', ratio: '2 / 1' },
  { id: 'charlotte', name: 'Charlotte C.', treatment: 'Porcelain veneers', ratio: '2 / 1' },
  { id: 'dana', name: 'Dana B.', treatment: 'Porcelain veneers', ratio: '2 / 1' },
  { id: 'dov', name: 'Dov G.', treatment: 'Porcelain veneers', ratio: '2 / 1' },
  { id: 'case05', name: 'Smile makeover', treatment: 'Porcelain veneers', ratio: '3 / 2' },
  { id: 'case06', name: 'Full-face transformation', treatment: 'Smile makeover', ratio: '1 / 1' },
];

export default function Results() {
  return (
    <>
      <JsonLd data={pageGraph({
        path: META.path, name: META.title, description: META.description, type: 'CollectionPage',
        extra: cases.flatMap((c) => (['before', 'after'] as const).map((k) => ({
          '@type': 'ImageObject',
          contentUrl: `${SITE.url}/photos/cases/${c.id}-${k}.webp`,
          caption: `${c.name}, ${k} ${c.treatment.toLowerCase()} by Dr. Eric Ennuson, DDS`,
          creditText: SITE.name,
          creator: { '@id': `${SITE.url}/#dentist` },
          copyrightNotice: `© ${SITE.name}`,
        }))),
      })} />
      <section className="band" style={{ paddingTop: 'clamp(56px, 8vw, 120px)', paddingBottom: 'var(--rhythm-s)' }}>
        <div className="wrap grid">
          <div className="c-1-11">
            <h1>
              <span className="rise"><span>Veneers, before and after.</span></span>
              <span className="rise"><span style={{ ['--d' as string]: '0.1s' }}><em>Real patients. No filters.</em></span></span>
            </h1>
          </div>
          <div className="c-8-13 fade-in" style={{ alignSelf: 'end' }}>
            <p className="lede">
              These are porcelain veneer and smile makeover cases by Dr. Eric Ennuson, DDS. Every person here is a patient of this
              practice. Scroll and each after reveals itself; drag the line to look as closely as you like. Judge anyone&apos;s work
              this way, including ours.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 'var(--rhythm)' }}>
        {cases.map((c, i) => (
          <article key={c.id} className="grid" style={{ borderTop: '1px solid var(--rule)', padding: 'clamp(32px, 5vw, 64px) 0' }}>
            <div className={`row1 ${i % 2 === 0 ? 'c-1-8' : 'c-5-13'}`}>
              <CompareSlider
                before={`/photos/cases/${c.id}-before.webp`}
                after={`/photos/cases/${c.id}-after.webp`}
                alt={`${c.name}, ${c.treatment.toLowerCase()} by Dr. Eric Ennuson`}
                ratio={c.ratio}
              />
            </div>
            <div className={`row1 ${i % 2 === 0 ? 'c-9-13' : 'c-1-4'}`} style={{ alignSelf: 'center' }}>
              <p className="kicker">Case {String(i + 1).padStart(2, '0')}</p>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)', marginTop: 8 }}>{c.name}</h2>
              <p style={{ marginTop: 12, color: 'var(--text-2)' }}>{c.treatment} by Dr. Eric Ennuson, DDS.</p>
            </div>
          </article>
        ))}
      </section>

      <section id="how-to-read" className="band anchor" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            <div className="c-1-6"><h2>How to read a veneer before and after.</h2></div>
            <div className="c-7-13" style={{ alignSelf: 'end' }}><p className="lede">Six things to look for in anyone&apos;s gallery. They separate careful work from a flattering photograph.</p></div>
          </div>
          <ol className="qs">
            <li className="qs-item"><span className="qs-n">01</span><h3 className="qs-q">Is the light the same?</h3><p className="qs-a">A brighter, warmer after makes any teeth look better. Compare the skin and lips: if they changed too, the lighting did.</p></li>
            <li className="qs-item"><span className="qs-n">02</span><h3 className="qs-q">Look at the gum line</h3><p className="qs-a">Healthy gums are pink and tight around each tooth. Red, puffy, or receding edges mean the porcelain does not fit the tissue.</p></li>
            <li className="qs-item"><span className="qs-n">03</span><h3 className="qs-q">Are the teeth individual?</h3><p className="qs-a">Natural teeth have slightly different lengths and visible edges between them. One flat white band is a design shortcut.</p></li>
            <li className="qs-item"><span className="qs-n">04</span><h3 className="qs-q">Does the shade suit the face?</h3><p className="qs-a">The right white depends on skin tone and undertone. A shade that glows against one face looks chalky on another. <Link className="link" href="/smile-design/">See how shade is chosen</Link>.</p></li>
            <li className="qs-item"><span className="qs-n">05</span><h3 className="qs-q">How thick do they look?</h3><p className="qs-a">From the side, veneers should follow the line of the lip. Bulk at the gum or teeth that push the lip forward mean porcelain was added without planning the space.</p></li>
            <li className="qs-item"><span className="qs-n">06</span><h3 className="qs-q">When was the after taken?</h3><p className="qs-a">Day-of photographs show swollen gums and nothing about how the work holds up. Ask how long after treatment the picture was made.</p></li>
          </ol>
        </div>
      </section>

      <section className="on-ink band">
        <div className="wrap grid">
          <div className="c-1-4">
            <Photo src="/photos/loupes-macro.webp" alt="Dr. Ennuson's magnification loupes and headlight" width={1024} height={626} ratio="4 / 5" position="50% 50%" sizes="(max-width: 960px) 100vw, 33vw" />
          </div>
          <div className="c-5-13" style={{ alignSelf: 'center' }}>
            <h2>How we photograph cases.</h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Before-and-after photos are easy to game: brighter light on the after, a kinder angle, a filter. New cases are photographed
              with the same camera settings, lighting, distance, and pose before and after, and we say how long after treatment the result
              was taken. Every patient shown has agreed to appear here.
            </p>
            <dl className="facts facts-tight" style={{ marginTop: 32 }}>
              <div><dt>Same settings</dt><dd>Camera, lens, distance, and exposure locked between the before and the after.</dd></div>
              <div><dt>Same light</dt><dd>Daylight-balanced, from the same side, so shade reads honestly.</dd></div>
              <div><dt>Dated</dt><dd>New cases say how long after treatment the after was taken.</dd></div>
            </dl>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <Link className="btn solid" href="/consultation/">Start your own case</Link>
              <Link className="btn" href="/veneers/">How porcelain veneers work</Link>
              <Link className="btn" href="/pricing/">What it costs</Link>
            </div>
          </div>
        </div>
      </section>

      <PageNote results />
    </>
  );
}
