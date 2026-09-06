import { useEffect, useState } from 'react';
import { Phone, MapPin, Clock, Navigation } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import Breadcrumbs from '../components/Breadcrumbs';
import QuoteForm from '../components/QuoteForm';
import FindUs from '../components/FindUs';
import { WhatsAppGlyph } from '../components/ContactButtons';
import { BUSINESS, absUrl } from '../lib/constants';
import { breadcrumbSchema } from '../lib/schema';
import { trackEvent } from '../lib/analytics';

const FALLBACK_HOURS = 'Open daily — please call us to confirm availability for your preferred date and time.';

export default function Contact() {
  const [hours, setHours] = useState(FALLBACK_HOURS);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    let alive = true;
    fetch('/api/settings')
      .then((r) => (r.ok ? r.json() : {}))
      .then((data: Record<string, string>) => {
        if (!alive) return;
        if (data?.working_hours) setHours(data.working_hours);
        if (data?.announcement) setAnnouncement(data.announcement);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <Seo
        title="Contact Saket Packers and Movers Ayodhya | 9838494871"
        description="Contact Saket Packers and Movers Ayodhya — call or WhatsApp 9838494871. Located at Cantt Road, Niyawa, Front of Sterling Hotel, Ayodhya, UP 224001. Get a free moving quote."
        path="/contact"
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: `Contact ${BUSINESS.name}`,
            url: absUrl('/contact'),
            about: { '@id': absUrl('/#business') },
          },
          breadcrumbSchema([
            { name: 'Home', url: absUrl('/') },
            { name: 'Contact', url: absUrl('/contact') },
          ]),
        ]}
      />

      <section className="bg-navy-50 py-10 sm:py-14" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">Contact Us</p>
            <h1 id="contact-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-navy-800 sm:text-5xl">
              Contact Saket Packers and Movers Ayodhya
            </h1>
            <p className="mt-5 text-base leading-relaxed text-navy-600 sm:text-lg">
              One call is enough to start planning your move. Reach us on phone or WhatsApp, visit our
              office on Cantt Road in Niyawa, or send your requirement through the quote form below.
            </p>
            {announcement && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gold-300 bg-gold-100 px-4 py-2.5 text-sm font-semibold text-navy-800">
                {announcement}
              </p>
            )}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal>
              <a
                href={BUSINESS.tel}
                onClick={() => trackEvent('call_click', { location: 'contact_card' })}
                className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Phone className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-lg font-bold text-navy-800">Call Us</h2>
                <p className="mt-1 font-display text-2xl font-bold tracking-wide text-brand-600 transition-colors group-hover:text-brand-700">
                  {BUSINESS.phoneDisplay}
                </p>
                <p className="mt-1 text-xs text-navy-500">Tap to call directly</p>
              </a>
            </Reveal>
            <Reveal delay={0.05}>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { location: 'contact_card' })}
                className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-leaf-200 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-50 text-leaf-600 transition-colors group-hover:bg-leaf-600 group-hover:text-white">
                  <WhatsAppGlyph className="h-6 w-6" />
                </span>
                <h2 className="mt-4 font-display text-lg font-bold text-navy-800">WhatsApp</h2>
                <p className="mt-1 font-display text-2xl font-bold tracking-wide text-leaf-600">
                  {BUSINESS.phoneDisplay}
                </p>
                <p className="mt-1 text-xs text-navy-500">Pre-filled quote message included</p>
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('maps_click', { location: 'contact_card' })}
                className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-navy-200 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition-colors group-hover:bg-navy-700 group-hover:text-gold-300">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-lg font-bold text-navy-800">Visit Us</h2>
                <address className="mt-1 text-sm font-medium not-italic leading-relaxed text-navy-600">
                  {BUSINESS.addressStreet}, {BUSINESS.addressCity}, {BUSINESS.addressRegion} –{' '}
                  {BUSINESS.addressPin}
                </address>
                <p className="mt-1 text-xs text-navy-500">Tap for Google Maps directions</p>
              </a>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-100 text-gold-600">
                  <Clock className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-lg font-bold text-navy-800">Working Hours</h2>
                <p className="mt-1 flex-1 text-sm font-medium leading-relaxed text-navy-600">{hours}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="quote" className="scroll-target dot-grid bg-navy-100/60 py-14 sm:py-20" aria-labelledby="contact-quote-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionTitle
              eyebrow="Free Quotation"
              title="Get Your Moving Quote"
              sub="Fill in the details and submit — or simply call us. Either way, we will discuss your requirement and share a clear quotation."
              align="left"
            />
            <Reveal delay={0.1}>
              <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-navy-800">
                  <Navigation className="h-5 w-5 text-brand-600" aria-hidden="true" />
                  Getting to our office
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  We are on Cantt Road in Niyawa, directly in front of Sterling Hotel, Ayodhya — a
                  short ride from Ayodhya Cantt railway station side and the main city areas.
                </p>
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('maps_click', { location: 'contact_directions' })}
                  className="mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-navy-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-navy-800"
                >
                  <MapPin className="h-4 w-4 text-gold-400" aria-hidden="true" />
                  Get Directions on Google Maps
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-xl sm:p-8">
              <QuoteForm />
            </div>
          </Reveal>
        </div>
      </section>

      <FindUs />
    </>
  );
}
