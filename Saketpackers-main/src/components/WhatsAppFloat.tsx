import { BUSINESS } from '../lib/constants';
import { trackEvent } from '../lib/analytics';
import { WhatsAppGlyph } from './ContactButtons';

export default function WhatsAppFloat() {
  return (
    <a
      href={BUSINESS.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { location: 'floating_button' })}
      aria-label="Chat with Saket Packers and Movers Ayodhya on WhatsApp"
      className="group fixed bottom-[84px] right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-leaf-500 text-white shadow-xl shadow-leaf-600/40 transition-all hover:scale-105 hover:bg-leaf-600 sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-leaf-500/40" aria-hidden="true" />
      <WhatsAppGlyph className="relative h-7 w-7" />
    </a>
  );
}
