import { Link } from 'react-router-dom';
import { ArrowRight, House, Building2, Package, Boxes, Bike, Truck, MapPin, Route } from 'lucide-react';
import type { ServiceDef, ServiceIcon } from '../data/services';
import Reveal from './Reveal';

export const SERVICE_ICONS: Record<ServiceIcon, typeof House> = {
  house: House,
  office: Building2,
  package: Package,
  loading: Boxes,
  bike: Bike,
  truck: Truck,
  local: MapPin,
  route: Route,
};

export default function ServiceCard({ service, index = 0 }: { service: ServiceDef; index?: number }) {
  const Icon = SERVICE_ICONS[service.icon];
  return (
    <Reveal delay={(index % 4) * 0.07} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-navy-200 hover:shadow-xl hover:shadow-navy-700/10">
        <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
          <img
            src={service.image}
            alt={service.imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800/90 text-gold-400 shadow-lg backdrop-blur">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-xl font-bold text-navy-800">{service.cardTitle}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">{service.cardText}</p>
          <Link
            to={service.path}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 transition-colors hover:text-brand-700"
            aria-label={`Learn more about ${service.cardTitle} in Ayodhya`}
          >
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
