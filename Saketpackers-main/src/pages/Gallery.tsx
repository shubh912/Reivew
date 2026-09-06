import { useEffect, useState } from 'react';
import { ImageOff, X } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import Breadcrumbs from '../components/Breadcrumbs';
import FinalCTA from '../components/FinalCTA';
import ContactButtons from '../components/ContactButtons';
import { absUrl } from '../lib/constants';
import { breadcrumbSchema } from '../lib/schema';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
  alt: string;
}

const CATEGORIES = [
  'All',
  'Packing',
  'Loading',
  'Vehicles',
  'House Shifting',
  'Office Shifting',
  'Transportation',
];

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/gallery')
      .then(async (r) => {
        if (!r.ok) throw new Error('Could not load gallery.');
        return r.json();
      })
      .then((rows) => {
        if (alive) setItems(Array.isArray(rows) ? rows : []);
      })
      .catch(() => {
        if (alive) setError('The gallery could not be loaded right now. Please try again shortly.');
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  const visible = filter === 'All' ? items : items.filter((i) => i.category === filter);

  return (
    <>
      <Seo
        title="Moving Services Gallery | Saket Packers and Movers Ayodhya"
        description="Moving services gallery of Saket Packers and Movers Ayodhya — packing, loading, vehicles, house shifting, office shifting and transportation work across Ayodhya, UP."
        path="/gallery"
        schema={breadcrumbSchema([
          { name: 'Home', url: absUrl('/') },
          { name: 'Gallery', url: absUrl('/gallery') },
        ])}
      />

      <section className="bg-navy-50 py-10 sm:py-14" aria-labelledby="gallery-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]} />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">Our Work</p>
            <h1 id="gallery-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-navy-800 sm:text-5xl">
              Moving Services Gallery
            </h1>
            <p className="mt-5 text-base leading-relaxed text-navy-600">
              A working gallery of our packing, loading, vehicle and transportation services in and
              around Ayodhya. Photos are updated as our team completes new packing, shifting and
              transport work across Ayodhya and intercity routes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1" role="tablist" aria-label="Filter gallery by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={filter === cat}
                onClick={() => setFilter(cat)}
                className={`min-h-[44px] shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                  filter === cat
                    ? 'border-navy-700 bg-navy-700 text-gold-300 shadow'
                    : 'border-navy-200 bg-white text-navy-600 hover:border-navy-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {error && (
            <div role="alert" className="mt-8 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm font-medium text-brand-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-navy-100" />
              ))}
            </div>
          ) : visible.length === 0 && !error ? (
            <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-navy-200 p-12 text-center">
              <ImageOff className="h-10 w-10 text-navy-300" aria-hidden="true" />
              <p className="mt-3 text-sm font-medium text-navy-500">
                No photos in this category yet — check back soon.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {visible.map((item, i) => (
                <Reveal key={item.id} delay={(i % 4) * 0.05}>
                  <button
                    type="button"
                    onClick={() => setLightbox(item)}
                    className="group block w-full overflow-hidden rounded-2xl bg-navy-100 text-left shadow-sm transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 hover:shadow-xl"
                    aria-label={`View photo: ${item.title}`}
                  >
                    <span className="block aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="block p-3">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-brand-600">
                        {item.category}
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-semibold text-navy-800">
                        {item.title}
                      </span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-12">
            <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6 text-center sm:p-8">
              <h2 className="font-display text-2xl font-bold text-navy-800">Planning a move like this?</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-navy-600">
                Call or WhatsApp us with your requirement and get a free quotation for packing,
                shifting or transportation from Ayodhya.
              </p>
              <ContactButtons className="mx-auto mt-5 max-w-md" stacksOnMobile />
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-h-full w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.image_url}
              alt={lightbox.alt}
              decoding="async"
              className="max-h-[78vh] w-full rounded-2xl object-contain"
            />
            <p className="mt-3 text-center text-sm font-semibold text-white">
              <span className="mr-2 rounded-full bg-brand-600 px-2.5 py-0.5 text-[11px] uppercase tracking-wider">
                {lightbox.category}
              </span>
              {lightbox.title}
            </p>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close photo"
              className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 shadow-lg transition-transform hover:scale-105"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
