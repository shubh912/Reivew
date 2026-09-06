import Reveal from './Reveal';

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export default function SectionTitle({ eyebrow, title, sub, align = 'center', dark = false }: SectionTitleProps) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <Reveal className={`max-w-2xl ${alignCls}`}>
      <p
        className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase ${
          dark ? 'text-gold-400' : 'text-brand-600'
        }`}
      >
        <span className={`h-px w-6 ${dark ? 'bg-gold-400' : 'bg-brand-500'}`} aria-hidden="true" />
        {eyebrow}
        <span className={`h-px w-6 ${dark ? 'bg-gold-400' : 'bg-brand-500'}`} aria-hidden="true" />
      </p>
      <h2
        className={`mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl ${
          dark ? 'text-white' : 'text-navy-800'
        }`}
      >
        {title}
      </h2>
      {sub ? <p className={`mt-3 text-base leading-relaxed ${dark ? 'text-navy-100' : 'text-navy-600'}`}>{sub}</p> : null}
    </Reveal>
  );
}
