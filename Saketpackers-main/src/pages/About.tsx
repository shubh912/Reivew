import { MapPin, Package, Truck, Boxes, Bike, House, Building2, BadgeCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import ContactButtons from '../components/ContactButtons';
import FindUs from '../components/FindUs';
import FinalCTA from '../components/FinalCTA';
import Breadcrumbs from '../components/Breadcrumbs';
import { BUSINESS, absUrl } from '../lib/constants';
import { breadcrumbSchema } from '../lib/schema';

const WHAT_WE_DO = [
  { icon: House, text: 'Household shifting — packing, loading, transportation and unloading assistance', to: '/house-shifting-ayodhya' },
  { icon: Building2, text: 'Office and commercial shifting as per your requirements', to: '/office-shifting-ayodhya' },
  { icon: Package, text: 'Packing and moving, planned around your items', to: '/packing-moving-ayodhya' },
  { icon: Boxes, text: 'Loading and unloading of household and commercial goods', to: '/loading-unloading-ayodhya' },
  { icon: Bike, text: 'Bike packing and transportation, subject to requirements', to: '/bike-transportation-ayodhya' },
  { icon: Truck, text: 'Pickup, DCM and suitable vehicle transport options', to: '/transport-service-ayodhya' },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Us | Saket Packers and Movers Ayodhya"
        description="About Saket Packers and Movers Ayodhya — packing, moving, loading, unloading and transportation services from Cantt Road, Niyawa, Ayodhya, Uttar Pradesh. Call 9838494871."
        path="/about"
        schema={breadcrumbSchema([
          { name: 'Home', url: absUrl('/') },
          { name: 'About Us', url: absUrl('/about') },
        ])}
      />

      <section className="bg-navy-50 py-10 sm:py-14" aria-labelledby="about-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">About Us</p>
              <h1 id="about-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-navy-800 sm:text-5xl">
                About Saket Packers and Movers Ayodhya
              </h1>
              <p className="mt-5 text-base leading-relaxed text-navy-600 sm:text-lg">
                Saket Packers and Movers Ayodhya provides packing, moving, loading, unloading and
                transportation services for household and commercial relocation requirements. Based in
                Ayodhya, the business serves customers needing local or intercity moving and
                transportation assistance.
              </p>
              <p className="mt-4 text-base leading-relaxed text-navy-600">
                Our office sits on Cantt Road in Niyawa, in front of Sterling Hotel — easy to reach
                from anywhere in Ayodhya, and the starting point for local moves across the city as
                well as intercity relocations from Ayodhya to other cities, subject to availability.
              </p>
              <ContactButtons className="mt-7 max-w-md" stacksOnMobile />
            </div>
            <Reveal delay={0.1}>
              <div className="relative">
                <img
                  src="/uploads/house-shifting-services-ayodhya.jpg"
                  alt="Household goods packed in cartons during a move in Ayodhya"
                  loading="eager"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
                />
                <div className="board-stripes absolute -bottom-5 left-4 right-4 rounded-2xl bg-navy-900/95 p-4 shadow-xl backdrop-blur sm:left-8 sm:right-8">
                  <p className="flex items-start gap-2 text-sm font-semibold leading-snug text-white">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
                    {BUSINESS.addressFull}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="what-we-do-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Our Work"
            title="What We Do"
            sub="Every service below is available across Ayodhya — book individually or as part of a complete shifting plan."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_WE_DO.map((item, i) => (
              <Reveal key={item.text} delay={(i % 3) * 0.07}>
                <Link
                  to={item.to}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold leading-relaxed text-navy-700">{item.text}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dot-grid bg-navy-100/60 py-14 sm:py-16" aria-labelledby="why-heading">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <SectionTitle eyebrow="Why Customers Call Us" title="Straightforward Moving Help in Ayodhya" />
          <Reveal delay={0.1}>
            <ul className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
              {[
                'Ayodhya-based team you can visit on Cantt Road, Niyawa',
                'Packing done according to your items, not shortcuts',
                'Suitable vehicles — pickup, DCM and more, as per goods and availability',
                'Clear quotation discussed before any work begins',
                'Local moves in Ayodhya and intercity routes, subject to availability',
                'One call or WhatsApp message to plan your entire move',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5 rounded-xl bg-white p-4 text-sm font-medium leading-relaxed text-navy-700 shadow-sm">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
            >
              See all our moving services
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
