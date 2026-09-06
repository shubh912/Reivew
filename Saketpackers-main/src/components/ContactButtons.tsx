import { Phone, MapPin } from 'lucide-react';
import { BUSINESS } from '../lib/constants';
import { trackEvent } from '../lib/analytics';

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2.05 22l5.3-1.38a9.87 9.87 0 0 0 4.69 1.19h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.81.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

export { WhatsAppGlyph };

interface ContactButtonsProps {
  className?: string;
  includeMaps?: boolean;
  callLabel?: string;
  stacksOnMobile?: boolean;
}

/** Reusable Call / WhatsApp / Maps action buttons with conversion tracking. */
export default function ContactButtons({
  className = '',
  includeMaps = false,
  callLabel = `Call ${BUSINESS.phoneDisplay}`,
  stacksOnMobile = false,
}: ContactButtonsProps) {
  const wrap = stacksOnMobile ? 'flex-col sm:flex-row' : 'flex-row flex-wrap';
  return (
    <div className={`flex ${wrap} items-stretch gap-3 ${className}`}>
      <a
        href={BUSINESS.tel}
        onClick={() => trackEvent('call_click', { location: 'contact_buttons' })}
        className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-base font-bold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        aria-label={`Call Saket Packers and Movers Ayodhya on ${BUSINESS.phoneRaw}`}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        {callLabel}
      </a>
      <a
        href={BUSINESS.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { location: 'contact_buttons' })}
        className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-leaf-600 px-5 py-3 text-base font-bold text-white shadow-lg shadow-leaf-600/25 transition-all hover:-translate-y-0.5 hover:bg-leaf-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2"
        aria-label="Chat with Saket Packers and Movers Ayodhya on WhatsApp"
      >
        <WhatsAppGlyph className="h-5 w-5" />
        WhatsApp Us
      </a>
      {includeMaps && (
        <a
          href={BUSINESS.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('maps_click', { location: 'contact_buttons' })}
          className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl border-2 border-navy-200 bg-white px-5 py-3 text-base font-bold text-navy-700 transition-all hover:-translate-y-0.5 hover:border-navy-400 hover:bg-navy-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
          aria-label="Find Saket Packers and Movers Ayodhya on Google Maps"
        >
          <MapPin className="h-5 w-5 text-brand-600" aria-hidden="true" />
          View on Google Maps
        </a>
      )}
    </div>
  );
}
