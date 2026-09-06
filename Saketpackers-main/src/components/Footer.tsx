import { Link } from 'react-router-dom';
import { MapPin, Phone, ExternalLink, ChevronRight } from 'lucide-react';
import { BUSINESS } from '../lib/constants';
import { SERVICES } from '../data/services';
import { trackEvent } from '../lib/analytics';
import { WhatsAppGlyph } from './ContactButtons';

const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'All Services' },
  { to: '/house-shifting-ayodhya', label: 'House Shifting Ayodhya' },
  { to: '/office-shifting-ayodhya', label: 'Office Shifting Ayodhya' },
  { to: '/bike-transportation-ayodhya', label: 'Bike Transportation' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/faq', label: 'FAQs' },
  { to: '/contact', label: 'Contact Us' },
];

export default function Footer() {
  return (
    <footer className="board-stripes bg-navy-950 text-navy-100">
      <div className="route-line" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img
              src={BUSINESS.logo}
              alt="Saket Packers and Movers Ayodhya logo"
              width={52}
              height={52}
              loading="lazy"
              decoding="async"
              className="h-13 w-13 rounded-full bg-white/95 object-contain p-0.5"
            />
            <span className="leading-none">
              <span className="block font-display text-lg font-bold tracking-wide text-white">
                <span className="text-brand-500">SAKET</span> PACKERS & MOVERS
              </span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.34em] text-gold-400">
                Ayodhya
              </span>
            </span>
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-navy-200">
            Saket Packers and Movers Ayodhya provides packing, moving, loading, unloading and
            transportation services for household and commercial relocation requirements in Ayodhya,
            Uttar Pradesh.
          </p>
        </div>

        <nav aria-label="Quick links">
          <h2 className="font-display text-base font-bold uppercase tracking-wider text-gold-400">Quick Links</h2>
          <ul className="mt-4 grid grid-cols-1 gap-1.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="group inline-flex items-center gap-1.5 text-sm text-navy-200 transition-colors hover:text-white"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-brand-500 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Our services">
          <h2 className="font-display text-base font-bold uppercase tracking-wider text-gold-400">Our Services</h2>
          <ul className="mt-4 grid gap-1.5">
            {SERVICES.map((s) => (
              <li key={s.key}>
                <Link
                  to={s.path}
                  className="group inline-flex items-center gap-1.5 text-sm text-navy-200 transition-colors hover:text-white"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-brand-500 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  {s.name} in Ayodhya
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-base font-bold uppercase tracking-wider text-gold-400">Contact Us</h2>
          <address className="mt-4 space-y-4 text-sm not-italic text-navy-200">
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('maps_click', { location: 'footer_address' })}
              className="flex items-start gap-2.5 transition-colors hover:text-white"
            >
              <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-500" aria-hidden="true" />
              <span>
                {BUSINESS.name}
                <br />
                {BUSINESS.addressStreet}, {BUSINESS.addressCity}, {BUSINESS.addressRegion} – {BUSINESS.addressPin}
              </span>
            </a>
            <a
              href={BUSINESS.tel}
              onClick={() => trackEvent('call_click', { location: 'footer' })}
              className="flex items-center gap-2.5 font-semibold text-white transition-colors hover:text-gold-300"
            >
              <Phone className="h-4.5 w-4.5 shrink-0 text-brand-500" aria-hidden="true" />
              {BUSINESS.phoneRaw}
            </a>
          </address>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <a
              href={BUSINESS.tel}
              onClick={() => trackEvent('call_click', { location: 'footer_button' })}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-500"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Now
            </a>
            <a
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'footer_button' })}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg bg-leaf-600 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-leaf-500"
            >
              <WhatsAppGlyph className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('maps_click', { location: 'footer_button' })}
              className="col-span-2 inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border border-navy-600 px-3 py-2 text-sm font-bold text-navy-100 transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-navy-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-center text-xs text-navy-300 sm:flex-row sm:px-6 sm:text-left">
          <p>
            © {new Date().getFullYear()} {BUSINESS.name} · {BUSINESS.addressCity}, {BUSINESS.addressRegion} –{' '}
            {BUSINESS.addressPin}
          </p>
          <p className="flex items-center gap-3">
            <span>Packers and Movers in Ayodhya, Uttar Pradesh</span>
            <Link to="/admin" className="text-navy-400 underline-offset-2 hover:text-navy-200 hover:underline">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
