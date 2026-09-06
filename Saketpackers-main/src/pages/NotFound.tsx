import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Phone } from 'lucide-react';
import Seo from '../components/Seo';
import { BUSINESS } from '../lib/constants';
import { trackEvent } from '../lib/analytics';

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found | Saket Packers and Movers Ayodhya"
        description="The page you are looking for does not exist. Visit Saket Packers and Movers Ayodhya for house shifting, office shifting and transportation services."
        path="/404"
        noindex
      />
      <section className="dot-grid flex min-h-[60vh] items-center bg-navy-50 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-7xl font-bold text-brand-600 sm:text-8xl">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold text-navy-800">Page Not Found</h1>
          <p className="mt-3 text-base leading-relaxed text-navy-600">
            The page you are looking for may have moved — much like our customers. Head back home or
            explore our moving services in Ayodhya.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-navy-700 px-6 py-3 font-bold text-white transition-colors hover:bg-navy-800"
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              Back to Home
            </Link>
            <Link
              to="/services"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-navy-200 bg-white px-6 py-3 font-bold text-navy-700 transition-colors hover:border-navy-400"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              View Services
            </Link>
            <a
              href={BUSINESS.tel}
              onClick={() => trackEvent('call_click', { location: '404_page' })}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-bold text-white transition-colors hover:bg-brand-700"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
