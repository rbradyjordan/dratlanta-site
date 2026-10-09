import Link from 'next/link';

export default function MobileCta() {
  return (
    <div className="mcta">
      <a className="call" href="tel:+14043834574">Call</a>
      <Link className="book" href="/consultation/#book">Book a consultation</Link>
    </div>
  );
}
