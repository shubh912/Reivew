/**
 * Lightweight analytics bridge.
 *
 * To enable Google Analytics 4 / Google Ads conversion tracking:
 * 1. Paste your GA4 gtag snippet (or GTM snippet) into index.html.
 * 2. Events pushed to window.dataLayer below will flow to GA4 automatically.
 *
 * Conversion events tracked by this app:
 *  - call_click        (phone number taps)
 *  - whatsapp_click    (WhatsApp taps)
 *  - maps_click        (Google Maps / directions taps)
 *  - quote_submit      (successful quote form submissions)
 *  - quote_open        (Quote CTA taps on the mobile action bar)
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type TrackEvent =
  | 'call_click'
  | 'whatsapp_click'
  | 'maps_click'
  | 'quote_submit'
  | 'quote_open';

export function trackEvent(event: TrackEvent, params: Record<string, unknown> = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, params);
    }
  } catch {
    /* analytics must never break the UI */
  }
}
