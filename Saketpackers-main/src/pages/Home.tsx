import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Phone,
  MapPin,
  ClipboardList,
  ArrowRight,
  Package,
  Building2,
  Boxes,
  Bike,
  Truck,
  BadgeCheck,
  PhoneCall,
  MessagesSquare,
  ClipboardCheck,
  CalendarCheck,
  House,
} from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import QuoteForm from '../components/QuoteForm';
import FaqAccordion from '../components/FaqAccordion';
import FindUs from '../components/FindUs';
import FinalCTA from '../components/FinalCTA';
import { SERVICE_CARD_LIST } from '../data/services';
import { FAQS } from '../data/faqs';
import { BUSINESS } from '../lib/constants';
import { organizationSchema, websiteSchema } from '../lib/schema';
import { trackEvent } from '../lib/analytics';
import { goToQuote } from '../lib/quoteNav';
import { WhatsAppGlyph } from '../components/ContactButtons';

const TRUST_POINTS = [
  { icon: MapPin, label: 'Ayodhya-Based Service', sub: 'Cantt Road, Niyawa' },
  { icon: House, label: 'Household & Office Shifting', sub: 'Local and intercity' },
  { icon: Package, label: 'Packing to Unloading', sub: 'Complete assistance' },
  { icon: Truck, label: 'Suitable Vehicle Options', sub: 'Pickup, DCM & more' },
];

const STEPS = [
  {
    icon: PhoneCall,
    title: 'Contact Us',
    text: `Call ${BUSINESS.phoneDisplay} or message us on WhatsApp to start your booking.`,
  },
  {
    icon: MessagesSquare,
    title: 'Share Details',
    text: 'Tell us your pickup location, destination, items and preferred moving date.',
  },
  {
    icon: ClipboardCheck,
    title: 'Discuss Requirement',
    text: 'We determine the required services — packing, loading, transport — and share your quotation.',
  },
  {
    icon: CalendarCheck,
    title: 'Plan Your Move',
    text: 'We coordinate the packing, vehicle and schedule, then carry out the move as planned.',
  },
];

const FLEET_POINTS = [
  { icon: Building2, text: 'Office & commercial relocation' },
  { icon: Boxes, text: 'Loading & unloading support' },
  { icon: Bike, text: 'Bike packing & transportation' },
  { icon: Truck, text: 'Pickup & DCM vehicle options' },
  { icon: Package, text: 'Packing as per your items' },
  { icon: BadgeCheck, text: 'Local & intercity support' },
];

interface GalleryThumb {
  id: number;
  title: string;
  category: string;
  image_url: string;
  alt: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [thumbs, setThumbs] = useState<GalleryThumb[]>([]);
  const [thumbsLoading, setThumbsLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch('/api/gallery')
      .then((r) => (r.ok ? r.json() : []))
      .then((rows: GalleryThumb[]) => {
        if (alive) setThumbs(Array.isArray(rows) ? rows.slice(0, 6) : []);
      })
      .catch(() => {
        if (alive) setThumbs([]);
      })
      .finally(() => {
        if (alive) setThumbsLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <Seo
        title="Saket Packers and Movers Ayodhya | House & Office Shifting"
        description="Saket Packers and Movers Ayodhya — house shifting, office shifting, packing, loading-unloading, bike transportation and transport services in Ayodhya, UP. Call or WhatsApp 9838494871 for a free quote."
        path="/"
        image={BUSINESS.heroImage}
        schema={[organizationSchema(), websiteSchema()]}
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-navy-950" aria-label="Saket Packers and Movers Ayodhya introduction">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={BUSINESS.heroImage}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy-950/70" />
          <div className="absolute inset-0 bg-linear-to-r from-navy-950/95 via-navy-900/85 to-navy-900/55" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-navy-950 to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:pb-24 lg:pt-20">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-navy-900/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Ayodhya · Uttar Pradesh
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-[3.4rem]">
                Saket Packers and Movers <span className="text-gold-400">Ayodhya</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <h2 className="mt-4 text-lg font-semibold leading-snug text-navy-100 sm:text-2xl">
                Reliable Packing, Moving & Transportation Services in Ayodhya
              </h2>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy-200 sm:text-base">
                House Shifting • Office Shifting • Packing • Loading &amp; Unloading • Bike
                Transportation • Local &amp; Intercity Moving Services
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('quote_open', { location: 'hero' });
                    goToQuote(navigate);
                  }}
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-gold-400 px-7 py-3.5 text-base font-bold text-navy-900 shadow-xl shadow-gold-500/25 transition-all hover:-translate-y-0.5 hover:bg-gold-300"
                >
                  <ClipboardList className="h-5 w-5" aria-hidden="true" />
                  Get Free Quote
                </button>
                <a
                  href={BUSINESS.tel}
                  onClick={() => trackEvent('call_click', { location: 'hero' })}
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-brand-600/30 transition-all hover:-translate-y-0.5 hover:bg-brand-500"
                  aria-label={`Call Saket Packers and Movers Ayodhya on ${BUSINESS.phoneRaw}`}
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Call {BUSINESS.phoneRaw}
                </a>
                <a
                  href={BUSINESS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'hero' })}
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-leaf-600 px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-leaf-600/30 transition-all hover:-translate-y-0.5 hover:bg-leaf-500"
                >
                  <WhatsAppGlyph className="h-5 w-5" />
                  WhatsApp Us
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.38}>
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('maps_click', { location: 'hero_address' })}
                className="mt-6 inline-flex max-w-full items-start gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-left text-sm font-medium leading-snug text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span>
                  Cantt Road, Niyawa, Front of Sterling Hotel, Ayodhya – 224001
                </span>
              </a>
            </Reveal>
          </div>

          {/* Quick contact card */}
          <Reveal delay={0.2} className="hidden lg:block">
            <div className="ml-auto max-w-sm rounded-2xl border border-white/15 bg-white/95 p-6 shadow-2xl backdrop-blur">
              <div className="flex items-center gap-3">
                <img
                  src={BUSINESS.logo}
                  alt="Saket Packers and Movers Ayodhya logo"
                  width={56}
                  height={56}
                  className="h-14 w-14 object-contain"
                />
                <div>
                  <p className="font-display text-lg font-bold leading-tight text-navy-800">
                    {BUSINESS.name}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                    Packers &amp; Movers · Ayodhya, UP
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-navy-600">
                Planning a house shift, office move or goods transport? Talk to us directly — we
                discuss your requirement and share a clear quotation.
              </p>
              <a
                href={BUSINESS.tel}
                onClick={() => trackEvent('call_click', { location: 'hero_card' })}
                className="mt-4 block rounded-xl bg-navy-700 px-4 py-3.5 text-center transition-colors hover:bg-navy-800"
              >
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
                  Call or WhatsApp
                </span>
                <span className="block font-display text-2xl font-bold tracking-wide text-white">
                  {BUSINESS.phoneDisplay}
                </span>
              </a>
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('maps_click', { location: 'hero_card' })}
                className="mt-2.5 flex items-center justify-center gap-2 rounded-xl border-2 border-navy-100 px-4 py-2.5 text-sm font-bold text-navy-700 transition-colors hover:border-navy-300 hover:bg-navy-50"
              >
                <MapPin className="h-4 w-4 text-brand-600" aria-hidden="true" />
                View on Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Trust strip ──────────────────────────────────── */}
      <section className="border-b border-gold-200 bg-gold-400" aria-label="Service highlights">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-4 px-4 py-5 sm:px-6 lg:grid-cols-4">
          {TRUST_POINTS.map((point) => (
            <div key={point.label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                <point.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-navy-900">{point.label}</p>
                <p className="text-xs font-medium text-navy-800/80">{point.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section className="py-14 sm:py-20" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="What We Do"
            title="Packers and Movers Services in Ayodhya"
            sub="From careful packing to final unloading — every moving service your home or office needs, handled by one Ayodhya-based team."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_CARD_LIST.map((service, i) => (
              <ServiceCard key={service.key} service={service} index={i} />
            ))}
          </div>
          <Reveal className="mt-8 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-navy-700 px-6 py-3 text-sm font-bold text-navy-700 transition-all hover:-translate-y-0.5 hover:bg-navy-700 hover:text-gold-300"
            >
              Explore All Moving Services in Detail
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="board-stripes bg-navy-950 py-14 sm:py-20" aria-labelledby="how-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Simple Process"
            title="How Your Move Works"
            sub="A clear four-step process — from your first call to a coordinated moving day."
            dark
          />
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <li className="relative h-full rounded-2xl border border-navy-800 bg-navy-900/70 p-6">
                  <span className="absolute right-5 top-4 font-display text-4xl font-bold text-navy-800" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400 text-navy-900">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-200">{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── About preview ────────────────────────────────── */}
      <section className="py-14 sm:py-20" aria-labelledby="about-preview-heading">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              <img
                src="/uploads/packing-services-ayodhya-cardboard-boxes.jpg"
                alt="Packing household cartons for moving in Ayodhya"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg"
              />
              <img
                src="/uploads/transport-service-ayodhya-truck-highway.jpg"
                alt="Transport truck carrying goods from Ayodhya on a highway"
                loading="lazy"
                decoding="async"
                className="mt-8 aspect-[4/5] w-full rounded-2xl object-cover shadow-lg"
              />
            </div>
          </Reveal>
          <div>
            <SectionTitle
              eyebrow="About Us"
              title="Your Neighbourhood Movers on Cantt Road, Ayodhya"
              align="left"
            />
            <Reveal delay={0.1}>
              <p className="mt-4 text-base leading-relaxed text-navy-600">
                Saket Packers and Movers Ayodhya provides packing, moving, loading, unloading and
                transportation services for household and commercial relocation requirements. Based
                in Ayodhya, the business serves customers needing local or intercity moving and
                transportation assistance.
              </p>
            </Reveal>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {FLEET_POINTS.map((point, i) => (
                <Reveal key={point.text} delay={0.12 + i * 0.05}>
                  <li className="flex items-center gap-3 rounded-xl border border-navy-100 bg-navy-50/60 px-4 py-3">
                    <point.icon className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                    <span className="text-sm font-semibold text-navy-700">{point.text}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.3}>
              <Link
                to="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700"
              >
                Read more about Saket Packers and Movers Ayodhya
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Quote form ───────────────────────────────────── */}
      <section id="quote" className="scroll-target dot-grid bg-navy-100/60 py-14 sm:py-20" aria-labelledby="quote-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionTitle
              eyebrow="Free Quotation"
              title="Get Your Moving Quote"
              sub="Share your pickup, destination and moving date — we will discuss your requirement and share a clear quotation. No obligation."
              align="left"
            />
            <Reveal delay={0.12}>
              <div className="board-stripes mt-8 rounded-2xl bg-navy-800 p-6 text-navy-100 shadow-lg">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
                  Prefer to talk directly?
                </p>
                <a
                  href={BUSINESS.tel}
                  onClick={() => trackEvent('call_click', { location: 'quote_section' })}
                  className="mt-2 flex items-center gap-3 font-display text-3xl font-bold tracking-wide text-white transition-colors hover:text-gold-300"
                >
                  <Phone className="h-7 w-7 text-gold-400" aria-hidden="true" />
                  {BUSINESS.phoneDisplay}
                </a>
                <p className="mt-3 text-sm leading-relaxed text-navy-200">
                  Available on call and WhatsApp for house shifting, office shifting, bike
                  transportation and goods transport enquiries across Ayodhya.
                </p>
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('maps_click', { location: 'quote_section' })}
                  className="mt-4 flex items-start gap-2 rounded-xl bg-navy-900/70 p-3 text-xs leading-relaxed text-navy-200 transition-colors hover:bg-navy-900"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                  {BUSINESS.addressFull}
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

      {/* ── Gallery preview ──────────────────────────────── */}
      <section className="py-14 sm:py-20" aria-labelledby="gallery-preview-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Our Work"
            title="Moving Services Gallery"
            sub="A look at our packing, loading, vehicles and transportation work in and around Ayodhya."
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {thumbsLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-navy-100" />
                ))
              : thumbs.map((thumb, i) => (
                  <Reveal key={thumb.id} delay={i * 0.05}>
                    <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-100 shadow-sm">
                      <img
                        src={thumb.image_url}
                        alt={thumb.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy-950/85 to-transparent p-3 text-xs font-semibold text-white">
                        {thumb.title}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
          </div>
          <Reveal className="mt-8 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              View the full moving services gallery
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ preview ──────────────────────────────────── */}
      <section className="bg-navy-50 py-14 sm:py-20" aria-labelledby="faq-preview-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Questions"
            title="Frequently Asked Questions"
            sub="Straight answers about our packers and movers services in Ayodhya."
          />
          <Reveal className="mt-10">
            <FaqAccordion items={FAQS.slice(0, 5)} />
          </Reveal>
          <Reveal className="mt-6 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              View all FAQs about our moving services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <FindUs />
      <FinalCTA />
    </>
  );
}
