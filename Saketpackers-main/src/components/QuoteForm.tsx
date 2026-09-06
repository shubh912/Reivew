import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, AlertTriangle, ClipboardList, Send } from 'lucide-react';
import { BUSINESS, PROPERTY_TYPES, SERVICES_OFFERED } from '../lib/constants';
import { trackEvent } from '../lib/analytics';
import { WhatsAppGlyph } from './ContactButtons';

interface FormState {
  name: string;
  mobile: string;
  pickup: string;
  destination: string;
  movingDate: string;
  propertyType: string;
  services: string[];
  details: string;
  website: string; // honeypot — must stay empty
}

const initialState: FormState = {
  name: '',
  mobile: '',
  pickup: '',
  destination: '',
  movingDate: '',
  propertyType: '1 BHK',
  services: ['Complete Shifting'],
  details: '',
  website: '',
};

const inputCls =
  'w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-base text-navy-900 placeholder:text-navy-300 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

const errCls = 'mt-1.5 flex items-center gap-1 text-xs font-medium text-brand-600';

interface QuoteFormProps {
  compactHeading?: boolean;
}

export default function QuoteForm({ compactHeading = false }: QuoteFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successId, setSuccessId] = useState<number | null>(null);

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (service: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(service)
        ? f.services.filter((s) => s !== service)
        : [...f.services, service],
    }));
    setErrors((e) => ({ ...e, services: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.';
    const digits = form.mobile.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
    if (!/^[6-9][0-9]{9}$/.test(digits)) next.mobile = 'Enter a valid 10-digit mobile number.';
    if (form.pickup.trim().length < 3) next.pickup = 'Enter the pickup location.';
    if (form.destination.trim().length < 3) next.destination = 'Enter the destination.';
    if (form.services.length === 0) next.services = 'Select at least one required service.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as { id?: number; error?: string };
      if (!res.ok) throw new Error(data.error || 'Could not submit your enquiry. Please try again.');
      setSuccessId(data.id ?? null);
      trackEvent('quote_submit', { services: form.services.join(', ') });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (successId !== null) {
    return (
      <div className="rounded-2xl border border-leaf-100 bg-leaf-50 p-6 text-center sm:p-10">
        <CheckCircle2 className="mx-auto h-12 w-12 text-leaf-600" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl font-bold text-navy-800">Quote Request Received</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy-600">
          Thank you, {form.name.split(' ')[0]}. Your enquiry{successId ? ` (#${successId})` : ''} has been
          submitted. For a quicker response, reach us right now:
        </p>
        <div className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <a
            href={BUSINESS.tel}
            onClick={() => trackEvent('call_click', { location: 'quote_success' })}
            className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-bold text-white transition-colors hover:bg-brand-700"
          >
            Call {BUSINESS.phoneDisplay}
          </a>
          <a
            href={BUSINESS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'quote_success' })}
            className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-leaf-600 px-5 py-3 font-bold text-white transition-colors hover:bg-leaf-700"
          >
            <WhatsAppGlyph className="h-5 w-5" />
            WhatsApp Us
          </a>
        </div>
        <button
          type="button"
          onClick={() => {
            setSuccessId(null);
            setForm(initialState);
          }}
          className="mt-5 text-sm font-semibold text-navy-500 underline-offset-4 hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="text-left">
      {!compactHeading && (
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-700 text-gold-400">
            <ClipboardList className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold text-navy-800">Tell us about your move</h3>
            <p className="text-sm text-navy-500">Fields marked * are required</p>
          </div>
        </div>
      )}

      {/* Honeypot — invisible to humans, bots fill it and get dropped */}
      <div className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company-website">Website</label>
        <input
          id="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="qf-name" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Name *
          </label>
          <input
            id="qf-name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={inputCls}
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className={errCls}><AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="qf-mobile" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Mobile *
          </label>
          <input
            id="qf-mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            className={inputCls}
            value={form.mobile}
            onChange={(e) => set('mobile', e.target.value)}
            aria-invalid={!!errors.mobile}
          />
          {errors.mobile && <p className={errCls}><AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />{errors.mobile}</p>}
        </div>
        <div>
          <label htmlFor="qf-pickup" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Pickup Location *
          </label>
          <input
            id="qf-pickup"
            type="text"
            placeholder="e.g. Cantt Road, Ayodhya"
            className={inputCls}
            value={form.pickup}
            onChange={(e) => set('pickup', e.target.value)}
            aria-invalid={!!errors.pickup}
          />
          {errors.pickup && <p className={errCls}><AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />{errors.pickup}</p>}
        </div>
        <div>
          <label htmlFor="qf-destination" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Destination *
          </label>
          <input
            id="qf-destination"
            type="text"
            placeholder="e.g. Lucknow, Uttar Pradesh"
            className={inputCls}
            value={form.destination}
            onChange={(e) => set('destination', e.target.value)}
            aria-invalid={!!errors.destination}
          />
          {errors.destination && <p className={errCls}><AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />{errors.destination}</p>}
        </div>
        <div>
          <label htmlFor="qf-date" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Moving Date
          </label>
          <input
            id="qf-date"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className={inputCls}
            value={form.movingDate}
            onChange={(e) => set('movingDate', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="qf-property" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Property Type
          </label>
          <select
            id="qf-property"
            className={inputCls}
            value={form.propertyType}
            onChange={(e) => set('propertyType', e.target.value)}
          >
            {PROPERTY_TYPES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="mt-4">
        <legend className="mb-2 text-sm font-semibold text-navy-700">Required Services *</legend>
        <div className="flex flex-wrap gap-2">
          {SERVICES_OFFERED.map((service) => {
            const active = form.services.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                aria-pressed={active}
                className={`min-h-[44px] rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                  active
                    ? 'border-navy-700 bg-navy-700 text-gold-300 shadow'
                    : 'border-navy-200 bg-white text-navy-600 hover:border-navy-400'
                }`}
              >
                {service}
              </button>
            );
          })}
        </div>
        {errors.services && <p className={errCls}><AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />{errors.services}</p>}
      </fieldset>

      <div className="mt-4">
        <label htmlFor="qf-details" className="mb-1.5 block text-sm font-semibold text-navy-700">
          Additional Details
        </label>
        <textarea
          id="qf-details"
          rows={4}
          maxLength={800}
          placeholder="Major items, floor, lift availability, bike model, or anything else we should know"
          className={`${inputCls} resize-y`}
          value={form.details}
          onChange={(e) => set('details', e.target.value)}
        />
      </div>

      {submitError && (
        <div role="alert" className="mt-4 rounded-xl border border-brand-200 bg-brand-50 p-3 text-sm font-medium text-brand-700">
          {submitError} You can also call us directly on {BUSINESS.phoneDisplay}.
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending request…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden="true" />
            Request Free Quote
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs leading-relaxed text-navy-400">
        Your details are used only to prepare and discuss your quotation. Prefer to talk? Call{' '}
        <a href={BUSINESS.tel} className="font-semibold text-brand-600" onClick={() => trackEvent('call_click', { location: 'quote_form' })}>
          {BUSINESS.phoneDisplay}
        </a>{' '}
        anytime.
      </p>
    </form>
  );
}
