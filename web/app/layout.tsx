import type { Metadata, Viewport } from 'next';
import { Hanken_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileCta from '@/components/MobileCta';
import SmoothScroll from '@/components/SmoothScroll';
import JsonLd from '@/components/JsonLd';
import ClosingCta from '@/components/ClosingCta';
import { SITE } from '@/lib/site';
import { siteGraph } from '@/lib/schema';
import './globals.css';
import './tailwind.css';

/* Newsreader, self-hosted and trimmed to the weights and optical sizes the site draws (see app/fonts/README.md):
   144 KB for both faces instead of 273 KB, so the headline type arrives with the page instead of after it. */
const newsreader = localFont({
  src: [
    { path: './fonts/newsreader-upright.woff2', weight: '300 400', style: 'normal' },
    { path: './fonts/newsreader-italic.woff2', weight: '300', style: 'italic' },
  ],
  variable: '--font-newsreader',
  display: 'swap',
  fallback: ['Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-hanken',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Veneers & Smile Makeovers in Metro Atlanta | Dr. Atlanta',
    template: '%s | Dr. Atlanta',
  },
  description:
    'Porcelain veneers and smile makeovers by Dr. Eric Ennuson, DDS, a licensed dentist serving metro Atlanta from Lawrenceville, GA. $8,999 full arch, published.',
  applicationName: SITE.name,
  authors: [{ name: SITE.doctor, url: `${SITE.url}/about/` }],
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: { type: 'website', siteName: SITE.name, locale: 'en_US', images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: `${SITE.doctor}, ${SITE.name}` }] },
  twitter: { card: 'summary_large_image', images: [SITE.ogImage] },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = { themeColor: '#16181B', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${hanken.variable}`}>
      <body>
        <JsonLd data={siteGraph} />
        <a className="skip" href="#main">Skip to content</a>
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <ClosingCta />
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
