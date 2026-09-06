import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbLink {
  label: string;
  to?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbLink[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-navy-300" aria-hidden="true" />}
            {item.to ? (
              <Link to={item.to} className="text-navy-500 transition-colors hover:text-brand-600">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-navy-800" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
