import Seo from '../components/Seo';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import Breadcrumbs from '../components/Breadcrumbs';
import FinalCTA from '../components/FinalCTA';
import Reveal from '../components/Reveal';
import ContactButtons from '../components/ContactButtons';
import { SERVICE_CARD_LIST } from '../data/services';
import { BUSINESS, absUrl } from '../lib/constants';
import { breadcrumbSchema } from '../lib/schema';

export default function Services() {
  return (
    <>
      <Seo
        title="Packers and Movers Services in Ayodhya | Saket Packers and Movers"
        description="All moving services in Ayodhya — house shifting, office shifting, packing & moving, loading unloading, bike transportation and transport services. Free quote: 9838494871."
        path="/services"
        schema={breadcrumbSchema([
          { name: 'Home', url: absUrl('/') },
          { name: 'Services', url: absUrl('/services') },
        ])}
      />

      <section className="bg-navy-50 py-10 sm:py-14" aria-labelledby="services-page-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">Our Services</p>
            <h1 id="services-page-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-navy-800 sm:text-5xl">
              Packers and Movers Services in Ayodhya
            </h1>
            <p className="mt-5 text-base leading-relaxed text-navy-600 sm:text-lg">
              Every move is different — a 1 BHK across town, an office across the state, a single bike
              to another city. Saket Packers and Movers Ayodhya covers the full range of moving
              services below, each bookable on its own or combined into a complete shifting plan.
            </p>
            <ContactButtons className="mt-7 max-w-lg" stacksOnMobile />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_CARD_LIST.map((service, i) => (
              <ServiceCard key={service.key} service={service} index={i} />
            ))}
          </div>
          <Reveal className="mt-12">
            <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6 text-center sm:p-8">
              <h2 className="font-display text-2xl font-bold text-navy-800">
                Not sure which service your move needs?
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-navy-600">
                Describe your requirement on call or WhatsApp — we will suggest the right combination
                of packing, loading, transportation and unloading, then share a quotation.
              </p>
              <a
                href={BUSINESS.tel}
                className="mt-5 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-brand-600 px-8 py-3 font-bold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
              >
                Call {BUSINESS.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
