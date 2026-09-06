import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, ClipboardList } from 'lucide-react';
import { BUSINESS, NAV_LINKS } from '../lib/constants';
import { SERVICES } from '../data/services';
import { trackEvent } from '../lib/analytics';
import { goToQuote } from '../lib/quoteNav';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
      isActive ? 'bg-navy-50 text-brand-600' : 'text-navy-700 hover:bg-navy-50 hover:text-navy-900'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="Saket Packers and Movers Ayodhya — Home">
          <img
            src={BUSINESS.logo}
            alt="Saket Packers and Movers Ayodhya logo"
            width={48}
            height={48}
            className="h-11 w-11 shrink-0 rounded-full object-contain sm:h-12 sm:w-12"
          />
          <span className="min-w-0 leading-none">
            <span className="block truncate font-display text-lg font-bold tracking-wide text-navy-800 sm:text-xl">
              <span className="text-brand-600">SAKET</span> PACKERS <span className="hidden sm:inline">AND</span>{' '}
              <span className="sm:hidden">&</span> MOVERS
            </span>
            <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.34em] text-gold-600 sm:text-[11px]">
              Ayodhya
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) =>
            link.label === 'Services' ? (
              <div key={link.to} className="group relative">
                <NavLink to={link.to} className={linkCls}>
                  <span className="inline-flex items-center gap-1">
                    Services
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" />
                  </span>
                </NavLink>
                <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-xl shadow-navy-900/10">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.key}
                        to={s.path}
                        className="block px-5 py-2.5 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-brand-600"
                      >
                        {s.name} in Ayodhya
                      </Link>
                    ))}
                    <Link
                      to="/services"
                      className="block border-t border-navy-100 bg-navy-50 px-5 py-3 text-sm font-bold text-brand-600 transition-colors hover:bg-navy-100"
                    >
                      View All Moving Services →
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkCls}>
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={BUSINESS.tel}
            onClick={() => trackEvent('call_click', { location: 'header' })}
            className="hidden items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700 sm:inline-flex"
            aria-label={`Call ${BUSINESS.name} on ${BUSINESS.phoneRaw}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={() => {
              trackEvent('quote_open', { location: 'header' });
              goToQuote(navigate);
            }}
            className="hidden items-center gap-2 rounded-xl bg-gold-400 px-4 py-2.5 text-sm font-bold text-navy-900 shadow-md transition-all hover:-translate-y-0.5 hover:bg-gold-300 md:inline-flex"
          >
            <ClipboardList className="h-4 w-4" aria-hidden="true" />
            Get Free Quote
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-navy-100 text-navy-800 transition-colors hover:bg-navy-50 lg:hidden"
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 top-[65px] z-40 overflow-y-auto bg-white transition-transform duration-300 sm:top-[69px] lg:hidden ${
          open ? 'translate-y-0' : '-translate-y-[110%]'
        }`}
        aria-hidden={!open}
      >
        <nav className="space-y-1 px-4 py-5" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) =>
            link.label === 'Services' ? (
              <div key={link.to} className="rounded-xl border border-navy-100">
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left text-base font-semibold text-navy-800"
                >
                  Services
                  <ChevronDown
                    className={`h-5 w-5 text-brand-600 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <div className={`${servicesOpen ? 'block' : 'hidden'} border-t border-navy-100 pb-2`}>
                  <Link to="/services" className="block px-6 py-2.5 text-[15px] font-bold text-brand-600">
                    All Packers and Movers Services
                  </Link>
                  {SERVICES.map((s) => (
                    <Link
                      key={s.key}
                      to={s.path}
                      className="block px-6 py-2.5 text-[15px] font-medium text-navy-600"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3.5 text-base font-semibold transition-colors ${
                    isActive ? 'bg-navy-700 text-gold-300' : 'text-navy-800 hover:bg-navy-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
          <div className="mt-5 space-y-2.5 border-t border-navy-100 pt-5">
            <a
              href={BUSINESS.tel}
              onClick={() => trackEvent('call_click', { location: 'mobile_menu' })}
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-base font-bold text-white"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {BUSINESS.phoneDisplay}
            </a>
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('maps_click', { location: 'mobile_menu' })}
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-navy-200 px-4 py-3 text-base font-bold text-navy-700"
            >
              {BUSINESS.addressStreet}, {BUSINESS.addressCity}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
