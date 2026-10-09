import type { Metadata } from 'next';

/** Single source of truth for name, address, phone, and URLs. Schema, metadata, footer, and contact all read from here. */
export const SITE = {
  url: 'https://www.dratlanta.org',
  name: 'Dr. Atlanta Cosmetic Dentistry',
  shortName: 'Dr. Atlanta',
  legalName: 'Eric Ennuson dba Smiles by Dr. Atlanta',
  doctor: 'Dr. Eric Ennuson, DDS',
  phone: '(404) 383-4574',
  phoneE164: '+14043834574',
  email: 'info@dratlanta.org',
  practice: 'BRUSH Dentistry',
  street: '1475 Buford Dr, Suite 204', // suite per brushdentistry.org; confirm with the practice
  streetShort: '1475 Buford Dr',
  city: 'Lawrenceville',
  region: 'GA',
  postal: '30043',
  county: 'Gwinnett County',
  geo: { lat: 34.00489, lng: -83.98626 }, // OpenStreetMap geocode of 1475 Buford Dr; replace with the Google Business Profile pin
  practiceUrl: 'https://brushdentistry.org/',
  licenseLookup: 'https://gadch.mylicense.com/verification/',
  school: 'USC Herman Ostrow School of Dentistry',
  /** Set to an ISO date only after Dr. Ennuson has actually read and approved the clinical copy. Until then no page claims a review. */
  clinicalReview: null as string | null,
  instagram: 'https://www.instagram.com/dr.atlanta',
  mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=1475+Buford+Dr%2C+Lawrenceville%2C+GA+30043',
  ogImage: '/og/default.jpg',
} as const;

type PageMeta = { title: string; description: string; path: string; image?: string; noindex?: boolean };

/** Per-page metadata: absolute title, canonical, Open Graph, and Twitter card in one call. */
export function pageMeta({ title, description, path, image = SITE.ogImage, noindex = false }: PageMeta): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'website',
      url: path,
      siteName: SITE.name,
      locale: 'en_US',
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: `${SITE.doctor}, ${SITE.name}` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
