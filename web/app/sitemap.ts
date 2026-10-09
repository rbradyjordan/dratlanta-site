import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

/* lastModified is set by hand when a page's substance changes. A build-time "now" on every URL teaches crawlers to ignore it. */
const pages: { path: string; lastModified: string; priority: number }[] = [
  { path: '/', lastModified: '2026-10-08', priority: 1 },
  { path: '/veneers/', lastModified: '2026-10-08', priority: 0.9 },
  { path: '/pricing/', lastModified: '2026-10-08', priority: 0.9 },
  { path: '/results/', lastModified: '2026-10-08', priority: 0.8 },
  { path: '/consultation/', lastModified: '2026-10-08', priority: 0.8 },
  { path: '/fix-botched-veneers/', lastModified: '2026-10-08', priority: 0.8 },
  { path: '/veneers-lawrenceville-ga/', lastModified: '2026-10-08', priority: 0.8 },
  { path: '/smile-design/', lastModified: '2026-10-08', priority: 0.7 },
  { path: '/why-licensed/', lastModified: '2026-10-08', priority: 0.7 },
  { path: '/about/', lastModified: '2026-10-08', priority: 0.7 },
  { path: '/contact/', lastModified: '2026-10-08', priority: 0.6 },
  { path: '/privacy-policy/', lastModified: '2026-10-08', priority: 0.2 },
  { path: '/terms-of-service/', lastModified: '2026-10-08', priority: 0.2 },
  { path: '/accessibility/', lastModified: '2026-10-08', priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({ url: `${SITE.url}${p.path}`, lastModified: p.lastModified, priority: p.priority }));
}
