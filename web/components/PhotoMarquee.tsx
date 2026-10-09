const shots = [
  { src: '/photos/reception.webp', cap: 'Reception', alt: 'Dr. Eric Ennuson at the reception desk of the Lawrenceville practice' },
  { src: '/photos/treatment-room.webp', cap: 'Treatment room', alt: 'Dr. Ennuson and an assistant treating a patient in the treatment room' },
  { src: '/photos/loupes-macro.webp', cap: 'Magnification', alt: 'Close-up of dental magnification loupes with the headlight on' },
  { src: '/photos/operatory-light.webp', cap: 'Operatory', alt: 'Dr. Ennuson beside the operatory light' },
  { src: '/photos/glasses.webp', cap: 'Dr. Ennuson', alt: 'Dr. Eric Ennuson, DDS, smiling' },
  { src: '/photos/consult-screen.webp', cap: 'Consultation', alt: 'Dr. Ennuson reviewing images on screen with a patient during a consultation' },
  { src: '/photos/loupes-face.webp', cap: 'Loupes', alt: 'Dr. Ennuson wearing magnification loupes and a mask' },
];

/** The practice, drifting past. Pauses when you hover. */
export default function PhotoMarquee() {
  return (
    <div className="pm">
      <div className="pm-track" style={{ ['--duration' as string]: '95s', ['--gap' as string]: '14px' }}>
        {[0, 1, 2].map((copy) => (
          <div key={copy} aria-hidden={copy > 0 || undefined}>
            {shots.map((s) => (
              <figure key={s.src} className="pm-item">
                <img src={s.src} alt={copy === 0 ? s.alt : ''} loading="lazy" decoding="async" />
                <figcaption>{s.cap}</figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
