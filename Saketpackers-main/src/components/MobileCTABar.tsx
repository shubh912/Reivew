import { useNavigate } from 'react-router-dom';
import { Phone, MapPin, ClipboardList } from 'lucide-react';
import { BUSINESS } from '../lib/constants';
import { trackEvent } from '../lib/analytics';
import { goToQuote } from '../lib/quoteNav';
import { WhatsAppGlyph } from './ContactButtons';

/** Fixed mobile action bar — Call | WhatsApp | Location | Quote */
export default function MobileCTABar() {
  const navigate = useNavigate();
  const itemCls =
    'flex min-h-[60px] flex-col items-center justify-center gap-0.5 text-[11px] font-bold transition-colors focus:outline-none focus-visible:bg-navy-50';

  return (
    <nav
      aria-label="Quick contact actions"
      className="fixed inset-x-0 bottom-0 left-0 right-0 z-50 grid w-full grid-cols-4 border-t border-navy-100 bg-white shadow-[0_-8px_30px_rgba(7,30,64,0.14)] lg:hidden"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <a
        href={BUSINESS.tel}
        onClick={() => trackEvent('call_click', { location: 'mobile_bar' })}
        className={`${itemCls} bg-brand-600 text-white active:bg-brand-700`}
        aria-label={`Call ${BUSINESS.name} on ${BUSINESS.phoneRaw}`}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call
      </a>
      <a
        href={BUSINESS.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { location: 'mobile_bar' })}
        className={`${itemCls} bg-leaf-600 text-white active:bg-leaf-700`}
        aria-label="WhatsApp Saket Packers and Movers Ayodhya"
      >
        <WhatsAppGlyph className="h-5 w-5" />
        WhatsApp
      </a>
      <a
        href={BUSINESS.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('maps_click', { location: 'mobile_bar' })}
        className={`${itemCls} bg-navy-700 text-gold-300 active:bg-navy-800`}
        aria-label="Open our location on Google Maps"
      >
        <MapPin className="h-5 w-5" aria-hidden="true" />
        Location
      </a>
      <button
        type="button"
        onClick={() => {
          trackEvent('quote_open', { location: 'mobile_bar' });
          goToQuote(navigate);
        }}
        className={`${itemCls} bg-gold-400 text-navy-900 active:bg-gold-500`}
        aria-label="Get a free moving quote"
      >
        <ClipboardList className="h-5 w-5" aria-hidden="true" />
        Quote
      </button>
    </nav>
  );
}
