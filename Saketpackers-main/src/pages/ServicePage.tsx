import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Phone, MapPin, ClipboardList, Navigation, ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionTitle from '../components/SectionTitle';
import QuoteForm from '../components/QuoteForm';
import FaqAccordion from '../components/FaqAccordion';
import { WhatsAppGlyph } from '../components/ContactButtons';
import { getService } from '../data/services';
import { BUSINESS, absUrl } from '../lib/constants';
import { breadcrumbSchema, faqPageSchema, serviceSchema } from '../lib/schema';
import { trackEvent } from '../lib/analytics';
import { goToQuote } from '../lib/quoteNav';

interface ServicePageProps {
  serviceKey: string;
}

export default function ServicePage({ serviceKey }: ServicePageProps) {
  const service = getService(serviceKey);
  const navigate = useNavigate();
  const related = service.related.map((key) => getService(key));

  return (
    <>
      <Seo
        title={service.metaTitle}
        description={service.metaDescription}
        path={service.path}
        image={service.image}
        schema={[
          serviceSchema({
            name: `${service.name} in Ayodhya`,
            description: service.metaDescription,
            url: absUrl(service.path),
            image: absUrl(service.image),
          }),
          faqPageSchema(service.faqs),
          breadcrumbSchema([
            { name: 'Home', url: absUrl('/') },
            { name: 'Services', url: absUrl('/services') },
            { name: service.cardTitle, url: absUrl(service.path) },
          ]),
        ]}
      />

      {/* ── Page hero ────────────────────────────────── */}
      <section className="bg-navy-50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Services', to: '/services' },
              { label: service.cardTitle },
            ]}
          />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
                {BUSINESS.name}
              </p>
              <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-navy-800 sm:text-[2.6rem]">
                {service.h1}
              </h1>
              <p className="mt-4 text-base font-medium leading-relaxed text-navy-700 sm:text-lg">
                {service.tagline}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('quote_open', { location: `service_${service.key}` });
                    goToQuote(navigate);
                  }}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gold-400 px-6 py-3 font-bold text-navy-900 shadow-lg shadow-gold-500/25 transition-all hover:-translate-y-0.5 hover:bg-gold-300"
                >
                  <ClipboardList className="h-5 w-5" aria-hidden="true" />
                  Get Free Quote
                </button>
                <a
                  href={BUSINESS.tel}
                  onClick={() => trackEvent('call_click', { location: `service_${service.key}` })}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-bold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Call {BUSINESS.phoneRaw}
                </a>
                <a
                  href={BUSINESS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: `service_${service.key}` })}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-leaf-600 px-6 py-3 font-bold text-white shadow-lg shadow-leaf-600/25 transition-all hover:-translate-y-0.5 hover:bg-leaf-700"
                >
                  <WhatsAppGlyph className="h-5 w-5" />
                  WhatsApp Us
                </a>
              </div>
            </div>
            <Reveal delay={0.1}>
              <img
                src={service.image}
                alt={service.imageAlt}
                loading="eager"
                decoding="async"
                className="aspect-[16/11] w-full rounded-3xl object-cover shadow-xl"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Intro + included ─────────────────────────── */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            {service.intro.map((para) => (
              <Reveal key={para.slice(0, 40)}>
                <p className="mb-4 text-base leading-relaxed text-navy-600">{para}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-lg sm:p-7">
              <h2 className="font-display text-2xl font-bold text-navy-800">{service.includedTitle}</h2>
              <ul className="mt-5 space-y-3.5">
                {service.included.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-navy-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Coverage anchors for local / intercity page ── */}
      {service.key === 'local-intercity' && (
        <section className="bg-navy-50 pb-14 sm:pb-20">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
            <Reveal>
              <div id="local" className="scroll-target h-full rounded-2xl border border-navy-100 bg-white p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Within the City</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-navy-800">
                  Local Shifting in Ayodhya &amp; Nearby Areas
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  Local packers and movers for moves within Ayodhya — from Niyawa and Cantt Road to
                  Civil Lines, Deokali, Rekabganj, Faizabad Road and nearby areas. The same packing,
                  loading, transportation and unloading assistance applies, sized to a local move with
                  a suitable vehicle.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div id="intercity" className="scroll-target h-full rounded-2xl border border-navy-100 bg-white p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Beyond Ayodhya</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-navy-800">
                  Intercity &amp; All-India Transportation from Ayodhya
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  Moving from Ayodhya to another city? We arrange intercity and all-India
                  transportation from Ayodhya, subject to availability. Routes towards Lucknow,
                  Gorakhpur, Varanasi, Prayagraj, Sultanpur and beyond are discussed and confirmed
                  while planning your move.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Local note ───────────────────────────────── */}
      <section className={`${service.key === 'local-intercity' ? '' : 'bg-navy-50 '}py-0 pb-14 sm:pb-20 ${service.key === 'local-intercity' ? '' : 'pt-14 sm:pt-20'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="board-stripes flex flex-col items-start gap-5 rounded-2xl bg-gold-400 p-7 sm:flex-row sm:items-center sm:p-9">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
                <Navigation className="h-7 w-7" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold text-navy-900">{service.localNote.title}</h2>
                <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-navy-900/85 sm:text-base">
                  {service.localNote.text}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Service FAQs ─────────────────────────────── */}
      <section className="pb-14 sm:pb-20" aria-labelledby="service-faq-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Common Questions"
            title={`${service.cardTitle} — FAQs`}
            sub="Quick answers about this service. For anything else, call or WhatsApp us directly."
          />
          <Reveal className="mt-10">
            <FaqAccordion items={service.faqs} />
          </Reveal>
        </div>
      </section>

      {/* ── Quote form ───────────────────────────────── */}
      <section id="quote" className="scroll-target dot-grid bg-navy-100/60 py-14 sm:py-20" aria-labelledby="service-quote-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionTitle
              eyebrow="Free Quotation"
              title="Get Your Moving Quote"
              sub="Tell us your pickup, destination and moving date — we will plan the service and share a clear quotation."
              align="left"
            />
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-3">
                <a
                  href={BUSINESS.tel}
                  onClick={() => trackEvent('call_click', { location: `service_quote_${service.key}` })}
                  className="flex items-center gap-3 rounded-xl border border-navy-200 bg-white p-4 transition-all hover:border-brand-300 hover:shadow"
                >
                  <Phone className="h-6 w-6 text-brand-600" aria-hidden="true" />
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-navy-500">
                      Call for a quick quote
                    </span>
                    <span className="block font-display text-xl font-bold text-navy-800">{BUSINESS.phoneDisplay}</span>
                  </span>
                </a>
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('maps_click', { location: `service_quote_${service.key}` })}
                  className="flex items-start gap-3 rounded-xl border border-navy-200 bg-white p-4 transition-all hover:border-brand-300 hover:shadow"
                >
                  <MapPin className="mt-1 h-6 w-6 shrink-0 text-brand-600" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-navy-600">{BUSINESS.addressFull}</span>
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

      {/* ── Related services ─────────────────────────── */}
      <section className="py-14 sm:py-20" aria-labelledby="related-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="Also Useful" title="Related Moving Services" />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {related.map((rel, i) => (
              <Reveal key={rel.key} delay={i * 0.07}>
                <Link
                  to={rel.path}
                  className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                >
                  <h3 className="font-display text-xl font-bold text-navy-800 transition-colors group-hover:text-brand-600">
                    {rel.name} in Ayodhya
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">{rel.cardText}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600">
                    View {rel.cardTitle} service
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
