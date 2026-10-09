import type { Proof } from '@/components/ProofCards';

/** The three credentials, used wherever trust is the point (home, about, why-licensed). */
export const proof: Proof[] = [
  {
    k: 'License', title: 'Georgia Board of Dentistry',
    body: 'Doctor of Dental Surgery. Diagnosis, anesthesia, sterile instruments, and a board to answer to. Look the license up yourself.',
    href: 'https://gadch.mylicense.com/verification/', cta: 'Verify the license', external: true,
  },
  {
    k: 'Training', title: 'USC Herman Ostrow School of Dentistry',
    body: 'Photography-led planning and conservative preparation: the approach is to leave you the most tooth, and the most options, decades from now.',
    href: '/about/', cta: 'About Dr. Ennuson',
  },
  {
    k: 'Practice', title: 'A fixed address in metro Atlanta',
    body: 'A real practice you can walk into, not a studio or a hotel room. Most cases take three to four visits, with temporaries the same day as preparation.',
    href: '/consultation/', cta: 'Book a consultation',
  },
];
