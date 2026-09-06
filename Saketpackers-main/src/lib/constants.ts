/** Primary public origin used by crawlable URLs and structured data. */
export const SITE_URL = 'https://saketpackers.vercel.app';

/** Runtime origin (preview domain, custom domain or fallback) for canonical/meta/schema URLs. */
export function siteOrigin(): string {
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin;
  return SITE_URL;
}

/** Build an absolute URL for the current runtime origin. */
export function absUrl(path = '/'): string {
  return `${siteOrigin()}${path.startsWith('/') ? path : `/${path}`}`;
}

const WHATSAPP_PREFILL =
  'Hello Saket Packers and Movers Ayodhya, I want a quotation for my shifting/transportation requirement.';

export const BUSINESS = {
  name: 'Saket Packers and Movers Ayodhya',
  shortName: 'Saket Packers & Movers',
  tagline: 'Packers and Movers in Ayodhya, Uttar Pradesh',
  phoneDisplay: '98384 94871',
  phoneRaw: '9838494871',
  phoneIntl: '+91 98384 94871',
  tel: 'tel:+919838494871',
  whatsappUrl: `https://wa.me/919838494871?text=${encodeURIComponent(WHATSAPP_PREFILL)}`,
  whatsappMessage: WHATSAPP_PREFILL,
  addressStreet: 'Cantt Road, Niyawa, Front of Sterling Hotel',
  addressCity: 'Ayodhya',
  addressRegion: 'Uttar Pradesh',
  addressPin: '224001',
  addressCountry: 'India',
  addressFull: 'Cantt Road, Niyawa, Front of Sterling Hotel, Ayodhya, Uttar Pradesh – 224001, India',
  mapsUrl: 'https://maps.app.goo.gl/PmrQjR5NTiUqQTh5A',
  logo: '/uploads/saket-packers-movers-logo.png',
  heroImage: '/uploads/packers-movers-ayodhya-loading-truck.jpg',
} as const;

export const PROPERTY_TYPES = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK', 'Office', 'Other'] as const;

export const SERVICES_OFFERED = [
  'Packing',
  'Loading',
  'Transportation',
  'Unloading',
  'Bike Transportation',
  'Complete Shifting',
] as const;

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/faq', label: 'FAQs' },
  { to: '/contact', label: 'Contact' },
] as const;
