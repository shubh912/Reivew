import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { BUSINESS } from '../lib/constants';
import { trackEvent } from '../lib/analytics';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';

/**
 * "Find us" section — links ONLY to the verified Google Maps listing.
 * No invented coordinates; the exact listing is one tap away.
 */
export default function FindUs() {
  return (
    <section className="bg-navy-50 py-14 sm:py-20" aria-labelledby="find-us-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Visit Us"
          title="Find Saket Packers and Movers Ayodhya"
          sub="Our office is easy to reach — located on Cantt Road, Niyawa, right in front of Sterling Hotel, Ayodhya."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
              <div>
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <MapPin className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 id="find-us-heading" className="font-display text-xl font-bold text-navy-800">
                      {BUSINESS.name}
                    </h3>
                    <address className="mt-1 text-base not-italic leading-relaxed text-navy-600">
                      {BUSINESS.addressStreet},
                      <br />
                      {BUSINESS.addressCity}, {BUSINESS.addressRegion} – {BUSINESS.addressPin}
                    </address>
                  </div>
                </div>
                <p className="mt-5 rounded-xl bg-navy-50 p-4 text-sm leading-relaxed text-navy-600">
                  <strong className="text-navy-800">Landmark:</strong> in front of Sterling Hotel, on Cantt Road,
                  Niyawa, Ayodhya. Tap any button below to open our exact, verified location in Google Maps.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('maps_click', { location: 'find_us_view' })}
                  className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-bold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  <ExternalLink className="h-5 w-5" aria-hidden="true" />
                  View on Google Maps
                </a>
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('maps_click', { location: 'find_us_directions' })}
                  className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl border-2 border-navy-200 bg-white px-5 py-3 font-bold text-navy-700 transition-all hover:-translate-y-0.5 hover:border-navy-400 hover:bg-navy-50"
                >
                  <Navigation className="h-5 w-5 text-leaf-600" aria-hidden="true" />
                  Get Directions
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('maps_click', { location: 'find_us_panel' })}
              className="board-stripes group relative flex h-full min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-navy-800 via-navy-900 to-navy-950 p-8 text-center shadow-lg"
              aria-label="Open Saket Packers and Movers Ayodhya on Google Maps"
            >
              <span className="relative mb-5 flex h-24 w-24 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400/30" aria-hidden="true" />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gold-400 text-navy-900 shadow-xl shadow-gold-500/30 transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="h-10 w-10" aria-hidden="true" />
                </span>
              </span>
              <p className="font-display text-2xl font-bold text-white">Cantt Road, Niyawa</p>
              <p className="mt-1 text-sm font-medium text-gold-300">
                Front of Sterling Hotel · Ayodhya, UP – 224001
              </p>
              <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-white/20">
                Open exact location in Google Maps
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </p>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
