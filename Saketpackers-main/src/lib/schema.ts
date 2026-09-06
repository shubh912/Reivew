import { BUSINESS, SITE_URL, siteOrigin } from './constants';

/** Sitewide MovingCompany structured data — only verified business facts. */
export function movingCompanySchema() {
  const origin = siteOrigin();
  return {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    '@id': `${origin}/#business`,
    name: BUSINESS.name,
    url: origin,
    telephone: '+919838494871',
    image: `${origin}${BUSINESS.heroImage}`,
    logo: `${origin}${BUSINESS.logo}`,
    hasMap: BUSINESS.mapsUrl,
    sameAs: [BUSINESS.mapsUrl],
    description:
      'Saket Packers and Movers Ayodhya provides packing, moving, loading, unloading and transportation services for household and commercial relocation requirements in Ayodhya, Uttar Pradesh.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.addressStreet,
      addressLocality: BUSINESS.addressCity,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.addressPin,
      addressCountry: 'IN',
    },
    areaServed: [
      { '@type': 'City', name: 'Ayodhya' },
      { '@type': 'State', name: 'Uttar Pradesh' },
      { '@type': 'Country', name: 'India' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Packing and Moving Services',
      itemListElement: [
        'House Shifting',
        'Office Shifting',
        'Packing & Moving',
        'Loading & Unloading',
        'Bike Transportation',
        'Pickup & DCM Transportation',
        'Local Shifting in Ayodhya',
        'Intercity / All-India Transportation',
      ].map((serviceName) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: serviceName,
          areaServed: { '@type': 'City', name: 'Ayodhya' },
          provider: { '@id': `${origin}/#business` },
        },
      })),
    },
  };
}

export function organizationSchema() {
  const origin = siteOrigin();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: BUSINESS.name,
    url: origin,
    telephone: '+919838494871',
    logo: `${origin}${BUSINESS.logo}`,
    sameAs: [BUSINESS.mapsUrl],
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.addressStreet,
      addressLocality: BUSINESS.addressCity,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.addressPin,
      addressCountry: 'IN',
    },
  };
}

export function websiteSchema() {
  const origin = siteOrigin();
  const idBase = typeof window !== 'undefined' ? origin : SITE_URL;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${idBase}/#website`,
    url: origin,
    name: BUSINESS.name,
    publisher: { '@id': `${origin}/#business` },
    inLanguage: 'en-IN',
  };
}

export interface Crumb {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

/** Only attach this to pages where every listed Q&A is visible on the page. */
export function faqPageSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  url: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: input.url,
    image: input.image,
    serviceType: input.name,
    provider: { '@id': `${siteOrigin()}/#business` },
    areaServed: [
      { '@type': 'City', name: 'Ayodhya' },
      { '@type': 'State', name: 'Uttar Pradesh' },
    ],
  };
}
