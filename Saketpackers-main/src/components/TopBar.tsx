import { MapPin, Phone } from 'lucide-react';
import { BUSINESS } from '../lib/constants';
import { trackEvent } from '../lib/analytics';
import { WhatsAppGlyph } from './ContactButtons';

export default function TopBar() {
  return (
    <div className="hidden bg-navy-950 text-navy-100 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6">
        <p className="flex min-w-0 items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-400" aria-hidden="true" />
          <span className="truncate">{BUSINESS.addressFull}</span>
        </p>
        <div className="flex shrink-0 items-center gap-4">
          <a
            href={BUSINESS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'top_bar' })}
            className="flex items-center gap-1.5 font-semibold text-leaf-100 transition-colors hover:text-white"
          >
            <WhatsAppGlyph className="h-3.5 w-3.5 text-leaf-500" />
            WhatsApp Us
          </a>
          <a
            href={BUSINESS.tel}
            onClick={() => trackEvent('call_click', { location: 'top_bar' })}
            className="flex items-center gap-1.5 font-semibold transition-colors hover:text-gold-300"
          >
            <Phone className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
            Call: {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
