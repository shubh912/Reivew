import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

/* ------------------------------- Brand ------------------------------- */

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-gold/15 ring-1 ring-gold/30">
        <Star className="h-4 w-4 fill-gold text-gold" />
      </span>
      <span className="leading-tight">
        <span className="block text-[11px] font-extrabold uppercase tracking-[0.22em] text-white">Saket</span>
        {!compact && (
          <span className="block text-[9.5px] font-semibold uppercase tracking-[0.18em] text-mist">
            Packers &amp; Movers
          </span>
        )}
      </span>
    </div>
  )
}

/* ------------------------------- Shell ------------------------------- */

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[460px] flex-col px-5 pt-5 pb-7">
      {children}
    </div>
  )
}

/* ---------------------------- Step wrapper --------------------------- */

export function Step({ k, children }: { k: string; children: ReactNode }) {
  return (
    <motion.div
      key={k}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  )
}

/* --------------------------- Progress bars --------------------------- */

export function StepHeader({ step, total = 4 }: { step: number; total?: number }) {
  return (
    <div className="mb-6 flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.span
          key={i}
          className="h-[3px] flex-1 rounded-full"
          initial={false}
          animate={{ backgroundColor: i < step ? 'rgb(245 184 65)' : 'rgba(255,255,255,0.10)' }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  )
}

/* ----------------------------- Star rating --------------------------- */

export function Stars({
  value,
  onChange,
  size = 'lg',
}: {
  value: number
  onChange?: (n: number) => void
  size?: 'lg' | 'sm'
}) {
  const cls = size === 'lg' ? 'h-11 w-11' : 'h-6 w-6'
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((r) => (
        <button
          key={r}
          type="button"
          disabled={!onChange}
          aria-label={`${r} star${r > 1 ? 's' : ''}`}
          onClick={() => onChange?.(r)}
          className={`tap transition-transform ${onChange ? 'active:scale-90 cursor-pointer' : 'cursor-default'}`}
        >
          <motion.span
            animate={{ scale: value === r ? [1, 1.18, 1] : 1 }}
            transition={{ duration: 0.3 }}
            className="block"
          >
            <Star
              className={`${cls} transition-colors duration-200 ${r <= value ? 'fill-gold text-gold' : 'fill-transparent text-white/22'}`}
              strokeWidth={1.6}
            />
          </motion.span>
        </button>
      ))}
    </div>
  )
}

/* -------------------------------- Chip ------------------------------- */

export function Chip({
  selected,
  onClick,
  children,
}: {
  selected?: boolean
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`tap relative flex items-center gap-2 rounded-2xl border px-4 py-3 text-left text-[14px] font-semibold transition-all duration-200 active:scale-[0.98] ${
        selected
          ? 'border-gold/60 bg-gold/12 text-white shadow-[0_0_0_1px_rgba(245,184,65,0.25),0_8px_24px_-12px_rgba(245,184,65,0.6)]'
          : 'border-line bg-white/[0.035] text-mist hover:border-white/20 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}

/* ------------------------------ Buttons ------------------------------ */

export function PrimaryButton({
  children,
  onClick,
  disabled,
  icon,
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  icon?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`tap group relative flex h-[54px] w-full items-center justify-center gap-2 overflow-hidden rounded-2xl text-[15px] font-extrabold tracking-tight transition-all duration-200 active:scale-[0.985] ${
        disabled
          ? 'cursor-not-allowed bg-white/[0.06] text-white/30'
          : 'bg-gradient-to-b from-gold to-gold2 text-ink shadow-[0_10px_30px_-10px_rgba(245,184,65,0.75)] hover:brightness-105'
      }`}
    >
      {icon}
      <span>{children}</span>
    </button>
  )
}

export function GhostButton({
  children,
  onClick,
  icon,
}: {
  children: ReactNode
  onClick?: () => void
  icon?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="tap flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl border border-line bg-white/[0.04] text-[14.5px] font-bold text-white transition-all duration-200 active:scale-[0.985] hover:bg-white/[0.07]"
    >
      {icon}
      <span>{children}</span>
    </button>
  )
}

export function TextButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="tap mx-auto flex w-fit items-center gap-1.5 text-[13px] font-semibold text-mist/80 transition-colors hover:text-white"
    >
      {children}
    </button>
  )
}

/* -------------------------------- Note ------------------------------- */

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2 text-[12.5px] leading-relaxed text-mist">
      <span className="mt-[3px] block h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
      <span>{children}</span>
    </p>
  )
}
