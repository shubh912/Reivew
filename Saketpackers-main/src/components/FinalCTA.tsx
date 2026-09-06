import { useNavigate } from 'react-router-dom';
import { Phone, MapPin, ClipboardList } from 'lucide-react';
import { BUSINESS } from '../lib/constants';
import { trackEvent } from '../lib/analytics';
import { goToQuote } from '../lib/quoteNav';
import { WhatsAppGlyph } from './ContactButtons';
import Reveal from './Reveal';

export default function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="final-cta-heading">
      <Reveal className="mx-auto max-w-6xl">
        <div className="board-stripes relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-600 via-brand-600 to-navy-800 px-6 py-12 text-center shadow-2xl sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-navy-950/35" aria-hidden="true" />
          <div className="relative">
            <h2 id="final-cta-heading" className="font-display text-3xl font-bold text-white sm:text-4xl">
              Planning Your Move?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-navy-50 sm:text-lg">
              Contact Saket Packers and Movers Ayodhya for packing, shifting, loading, unloading and
              transportation requirements.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <a
                href={BUSINESS.tel}
                onClick={() => trackEvent('call_click', { location: 'final_cta' })}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-bold text-navy-800 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-navy-50"
              >
                <Phone className="h-5 w-5 text-brand-600" aria-hidden="true" />
                Call {BUSINESS.phoneDisplay}
              </a>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { location: 'final_cta' })}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-leaf-600 px-4 py-3 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-leaf-700"
              >
                <WhatsAppGlyph className="h-5 w-5" />
                WhatsApp Us
              </a>
              <button
                type="button"
                onClick={() => {
                  trackEvent('quote_open', { location: 'final_cta' });
                  goToQuote(navigate);
                }}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gold-400 px-4 py-3 font-bold text-navy-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gold-300"
              >
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
                Get Free Quote
              </button>
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('maps_click', { location: 'final_cta' })}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-white/50 px-4 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                <MapPin className="h-5 w-5" aria-hidden="true" />
                Find Us on Google Maps
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
