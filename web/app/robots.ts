import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

/*
 * Everything public is open. Being cited by Google, Bing, ChatGPT search, Claude, and Perplexity all depend on
 * their crawlers being allowed, and blocking the training crawlers would not change search visibility either way.
 * Utility pages (/thank-you/, /lab/) carry a noindex tag instead of a Disallow, because a crawler that is blocked
 * from a page can never see its noindex.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: ['Googlebot', 'Bingbot', 'Applebot', 'OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User'], allow: '/' },
      { userAgent: ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'CCBot'], allow: '/' },
      { userAgent: '*', allow: '/' },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
