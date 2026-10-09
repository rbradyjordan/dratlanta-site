import { SITE } from './site';

const ID = {
  site: `${SITE.url}/#website`,
  dentist: `${SITE.url}/#dentist`,
  person: `${SITE.url}/about/#person`,
  brush: `${SITE.url}/#host-practice`,
};

const address = {
  '@type': 'PostalAddress',
  streetAddress: SITE.street,
  addressLocality: SITE.city,
  addressRegion: SITE.region,
  postalCode: SITE.postal,
  addressCountry: 'US',
};

/**
 * Site-wide graph: the website, the practice entity (Dentist is the most specific LocalBusiness subtype),
 * the dentist as a person, and the host practice the address belongs to.
 * Deliberately absent: Review/AggregateRating (self-serving markup is ineligible and a policy risk),
 * opening hours (not confirmed), and a license number (not confirmed). See LAUNCH-CHECKLIST.
 */
export const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': ID.site, url: `${SITE.url}/`, name: SITE.name, alternateName: SITE.shortName, inLanguage: 'en-US', publisher: { '@id': ID.dentist } },
    {
      '@type': 'Dentist',
      '@id': ID.dentist,
      name: SITE.name,
      alternateName: [SITE.doctor, 'Smiles by Dr. Atlanta'],
      description: 'Porcelain veneers, smile makeovers, and veneer correction by Dr. Eric Ennuson, DDS, serving metro Atlanta from Lawrenceville, Georgia.',
      url: `${SITE.url}/`,
      logo: `${SITE.url}/og/icon-512.png`,
      image: [`${SITE.url}/og/default.jpg`, `${SITE.url}/photos/ennuson-hallway.webp`, `${SITE.url}/photos/brush-sign.webp`],
      telephone: SITE.phoneE164,
      email: SITE.email,
      priceRange: '$8,999 full-arch smile design',
      isAcceptingNewPatients: true,
      medicalSpecialty: 'https://schema.org/Dentistry',
      address,
      geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
      hasMap: SITE.mapsUrl,
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Metro Atlanta' },
        { '@type': 'AdministrativeArea', name: 'Gwinnett County, GA' },
        ...['Lawrenceville', 'Buford', 'Suwanee', 'Duluth', 'Dacula', 'Sugar Hill', 'Snellville', 'Atlanta'].map((name) => ({ '@type': 'City', name: `${name}, GA` })),
      ],
      containedInPlace: { '@id': ID.brush },
      employee: { '@id': ID.person },
      availableService: ['Porcelain veneers', 'Smile makeover', 'Veneer correction and replacement'].map((name) => ({ '@type': 'MedicalProcedure', name })),
      sameAs: [SITE.instagram],
    },
    {
      '@type': 'Person',
      '@id': ID.person,
      name: 'Eric Ennuson',
      honorificPrefix: 'Dr.',
      honorificSuffix: 'DDS',
      jobTitle: 'Dentist',
      url: `${SITE.url}/about/`,
      image: `${SITE.url}/photos/ennuson-hallway.webp`,
      alumniOf: { '@type': 'CollegeOrUniversity', name: SITE.school },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        name: 'Georgia dental license',
        recognizedBy: { '@type': 'Organization', name: 'Georgia Board of Dentistry', url: 'https://gbd.georgia.gov/' },
      },
      knowsAbout: ['Porcelain veneers', 'Smile design', 'Veneer shade selection', 'Veneer correction'],
      worksFor: { '@id': ID.dentist },
      affiliation: { '@id': ID.brush },
      sameAs: [SITE.instagram],
    },
    { '@type': 'Dentist', '@id': ID.brush, name: SITE.practice, url: SITE.practiceUrl, address },
  ],
};

type PageSchema = { path: string; name: string; description: string; type?: 'WebPage' | 'ProfilePage' | 'CollectionPage' | 'ContactPage' | 'MedicalWebPage'; extra?: Record<string, unknown>[] };

/** Per-page node that ties the page to the site entities. `extra` carries Service / FAQPage / image nodes for that page. */
export function pageGraph({ path, name, description, type = 'WebPage', extra = [] }: PageSchema) {
  const url = `${SITE.url}${path}`;
  const page: Record<string, unknown> = {
    '@type': type,
    '@id': `${url}#page`,
    url,
    name,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': ID.site },
    about: { '@id': ID.dentist },
    author: { '@id': ID.person },
  };
  if (type === 'ProfilePage') page.mainEntity = { '@id': ID.person };
  if (SITE.clinicalReview && (type === 'MedicalWebPage')) { page.lastReviewed = SITE.clinicalReview; page.reviewedBy = { '@id': ID.person }; }
  return { '@context': 'https://schema.org', '@graph': [page, ...extra] };
}

export const service = (path: string, name: string, description: string, offer?: { price: string; description: string }) => ({
  '@type': 'Service',
  '@id': `${SITE.url}${path}#service`,
  name,
  serviceType: name,
  description,
  provider: { '@id': ID.dentist },
  areaServed: [{ '@type': 'AdministrativeArea', name: 'Metro Atlanta' }, { '@type': 'AdministrativeArea', name: 'Gwinnett County, GA' }],
  ...(offer ? { offers: { '@type': 'Offer', priceCurrency: 'USD', price: offer.price, description: offer.description, url: `${SITE.url}/pricing/` } } : {}),
});

export const faq = (items: [string, string][]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});
