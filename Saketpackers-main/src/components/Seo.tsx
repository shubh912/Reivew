import { useEffect } from 'react';
import { BUSINESS, siteOrigin } from '../lib/constants';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
  schema?: object | object[] | null;
  noindex?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Per-page document head manager: unique title, meta description, canonical,
 * Open Graph / Twitter tags and page-specific JSON-LD.
 * Sitewide MovingCompany schema lives statically in index.html.
 */
export default function Seo({ title, description, path, image, type, schema, noindex }: SeoProps) {
  const schemaJson = schema ? JSON.stringify(schema) : '';

  useEffect(() => {
    const origin = siteOrigin();
    const url = `${origin}${path}`;
    const imageUrl = image
      ? image.startsWith('http')
        ? image
        : `${origin}${image}`
      : `${origin}${BUSINESS.heroImage}`;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:image:alt', `${BUSINESS.name} moving services in Ayodhya`);
    upsertMeta('property', 'og:type', type || 'website');
    upsertMeta('property', 'og:site_name', BUSINESS.name);
    upsertMeta('property', 'og:locale', 'en_IN');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);
    upsertMeta('name', 'twitter:image:alt', `${BUSINESS.name} moving services in Ayodhya`);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const injected: HTMLScriptElement[] = [];
    if (schemaJson) {
      const list = JSON.parse(schemaJson) as object | object[];
      const arr = Array.isArray(list) ? list : [list];
      arr.forEach((obj) => {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.setAttribute('data-seo-page', 'true');
        s.textContent = JSON.stringify(obj);
        document.head.appendChild(s);
        injected.push(s);
      });
    }
    return () => injected.forEach((s) => s.remove());
  }, [title, description, path, image, type, noindex, schemaJson]);

  return null;
}
