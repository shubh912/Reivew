import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import Breadcrumbs from '../components/Breadcrumbs';
import FaqAccordion from '../components/FaqAccordion';
import ContactButtons from '../components/ContactButtons';
import FinalCTA from '../components/FinalCTA';
import { FAQS } from '../data/faqs';
import { absUrl } from '../lib/constants';
import { breadcrumbSchema, faqPageSchema } from '../lib/schema';

export default function Faq() {
  return (
    <>
      <Seo
        title="FAQs – Packers and Movers Ayodhya | Saket Packers and Movers"
        description="Frequently asked questions about packers and movers in Ayodhya — house shifting, office shifting, packing, loading, unloading, bike transportation and quotes. Call 9838494871."
        path="/faq"
        schema={[
          faqPageSchema(FAQS),
          breadcrumbSchema([
            { name: 'Home', url: absUrl('/') },
            { name: 'FAQs', url: absUrl('/faq') },
          ]),
        ]}
      />

      <section className="bg-navy-50 py-10 sm:py-14" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'FAQs' }]} />
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">Help Centre</p>
          <h1 id="faq-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-navy-800 sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-5 text-base leading-relaxed text-navy-600">
            Straight answers about our packers and movers services in Ayodhya — house shifting,
            office shifting, packing, loading, unloading, bike transportation, intercity moving and
            how to get a quotation.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <FaqAccordion items={FAQS} />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6 text-center sm:p-8">
              <h2 className="font-display text-2xl font-bold text-navy-800">Still have a question?</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy-600">
                Call or WhatsApp us — describe your shifting or transportation requirement and we will
                help you plan it.
              </p>
              <ContactButtons className="mx-auto mt-5 max-w-md" stacksOnMobile />
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
