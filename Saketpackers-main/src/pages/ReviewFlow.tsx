import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Car,
  Check,
  Clock,
  Hand,
  Home,
  MapPin,
  Package,
  RotateCcw,
  Sofa,
  Sparkles,
  Star,
  Truck,
  UserRoundCheck,
  Warehouse,
  Boxes,
  MousePointerClick,
} from 'lucide-react'
import {
  SERVICES,
  HIGHLIGHTS,
  IMPROVEMENTS,
  RATING_LABELS,
  RATING_PROMPTS,
  GOOGLE_REVIEW_URL,
} from '../lib/reviewData'
import { generateReview, lengthLabel, type GeneratedReview } from '../lib/reviewCompose'
import { copyText } from '../lib/reviewClipboard'
import { Brand, Shell, Step, StepHeader, Stars, Chip, PrimaryButton, GhostButton, TextButton, Note } from '../components/ReviewUI'

type StepName = 'welcome' | 'rating' | 'service' | 'liked' | 'improve' | 'working' | 'review'

const SERVICE_ICONS: Record<string, typeof Home> = {
  home: Home,
  pin: MapPin,
  truck: Truck,
  office: Building2,
  package: Package,
  hand: Hand,
  car: Car,
  sofa: Sofa,
  warehouse: Warehouse,
  boxes: Boxes,
}

export default function ReviewFlow() {
  const [step, setStep] = useState<StepName>('welcome')
  const [rating, setRating] = useState(0)
  const [serviceId, setServiceId] = useState('')
  const [liked, setLiked] = useState<string[]>([])
  const [improve, setImprove] = useState<string[]>([]
  )
  const [review, setReview] = useState<GeneratedReview | null>(null)
  const [text, setText] = useState('')
  const [words, setWords] = useState(0)
  const [copied, setCopied] = useState<'idle' | 'ok' | 'fail'>('idle')
  const [blocked, setBlocked] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const timers = useRef<number[]>([])

  const service = useMemo(() => SERVICES.find((s) => s.id === serviceId), [serviceId])

  useEffect(() => {
    return () => timers.current.forEach((t) => window.clearTimeout(t))
  }, [])

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms)
    timers.current.push(id)
  }

  const toggle = (list: string[], set: (v: string[]) => void, id: string) => {
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id])
  }

  const openGoogle = () => {
    const win = window.open(GOOGLE_REVIEW_URL, '_blank')
    if (win) {
      try {
        win.opener = null
      } catch {
        /* noop */
      }
      setBlocked(false)
    } else {
      setBlocked(true)
    }
  }

  const regenerate = () => {
    if (!service) return
    const g = generateReview({ rating, serviceId, liked, improve })
    setReview(g)
    setText(g.text)
    setWords(g.words)
  }

  const goToGoogle = async () => {
    const value = text.trim()
    if (!value) return
    const ok = await copyText(value)
    setCopied(ok ? 'ok' : 'fail')
    openGoogle()
    later(() => setCopied('idle'), 4000)
  }

  const onPickRating = (r: number) => {
    setRating(r)
    later(() => setStep('service'), 280)
  }

  const startWriting = () => {
    if (!service) return
    setStep('working')
    const g = generateReview({ rating, serviceId, liked, improve })
    setReview(g)
    setText(g.text)
    setWords(g.words)
    later(() => setStep('review'), 1500)
  }

  /* ------------------------------ render ------------------------------ */

  return (
    <Shell>
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <Step k="welcome">
            <div className="relative -mx-5 -mt-5">
              <picture>
                <img
                  src="/images/review-hero.jpg"
                  alt="Moving crew loading wrapped furniture into a relocation truck at dusk"
                  width={1000}
                  height={558}
                  className="h-[36vh] min-h-[220px] w-full object-cover object-[58%_45%]"
                  fetchPriority="high"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-5">
                <Brand />
                <span className="rounded-full border border-line bg-ink/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-mist backdrop-blur">
                  Google Reviews
                </span>
              </div>
            </div>

            <h1 className="mt-6 text-balance2 font-review-display text-[40px] leading-[1.02] font-semibold tracking-[-0.02em] text-white">
              Thank you for
              <br />
              choosing us!
            </h1>
            <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-mist">
              A quick review helps other families across Ayodhya choose with confidence. It takes about 20 seconds.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { Icon: Clock, label: '20 seconds' },
                { Icon: UserRoundCheck, label: 'No login' },
                { Icon: MousePointerClick, label: 'You press Post' },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 rounded-full border border-line bg-white/[0.035] px-3 py-1.5 text-[11.5px] font-semibold text-mist"
                >
                  <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={2} />
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-9">
              <PrimaryButton onClick={() => setStep('rating')} icon={<ArrowRight className="h-4.5 w-4.5" />}>
                Start
              </PrimaryButton>
            </div>
          </Step>
        )}

        {step === 'rating' && (
          <Step k="rating">
            <StepHeader step={1} />
            <h2 className="mt-4 text-[29px] leading-tight font-semibold tracking-[-0.01em] text-white">
              How was your experience?
            </h2>
            <p className="mt-2 text-[14.5px] text-mist">Be honest — good or bad, it helps us improve.</p>

            <div className="mt-9 flex justify-center py-2">
              <Stars value={rating} onChange={onPickRating} />
            </div>

            <div className="mt-7 min-h-[62px] text-center">
              <AnimatePresence mode="wait">
                {rating > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="font-review-display text-[24px] font-semibold text-gold">{RATING_LABELS[rating - 1]}</p>
                    <p className="mt-1 text-[13.5px] text-mist">{RATING_PROMPTS[rating]}</p>
                  </motion.div>
                ) : (
                  <p className="text-[13.5px] text-mist/60">Tap a star to begin</p>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-auto pt-8">
              <Note>Your rating stays on this device — nothing is uploaded.</Note>
            </div>
          </Step>
        )}

        {step === 'service' && (
          <Step k="service">
            <StepHeader step={2} />
            <h2 className="mt-4 text-[29px] leading-tight font-semibold tracking-[-0.01em] text-white">
              What did we help you with?
            </h2>
            <p className="mt-2 text-[14.5px] text-mist">Pick the service that fits your move.</p>

            <div className="hide-scroll -mx-5 mt-6 flex-1 overflow-y-auto px-5">
              <div className="grid grid-cols-2 gap-2.5">
                {SERVICES.map((s) => {
                  const Icon = SERVICE_ICONS[s.icon] ?? Home
                  const selected = serviceId === s.id
                  return (
                    <Chip key={s.id} selected={selected} onClick={() => setServiceId(s.id)}>
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${selected ? 'bg-gold/20 text-gold' : 'bg-white/[0.06] text-mist'}`}
                      >
                        <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[13.5px] font-bold">{s.label}</span>
                        <span className="block truncate text-[11px] font-medium text-mist/80">{s.hint}</span>
                      </span>
                      {selected && <Check className="ml-auto h-4 w-4 shrink-0 text-gold" strokeWidth={3} />}
                    </Chip>
                  )
                })}
              </div>
            </div>

            <div className="mt-auto space-y-3 pt-6">
              <PrimaryButton onClick={() => setStep('liked')} disabled={!service}>
                {service ? 'Continue' : 'Choose a service'}
              </PrimaryButton>
            </div>
          </Step>
        )}

        {step === 'liked' && (
          <Step k="liked">
            <StepHeader step={3} />
            <h2 className="mt-4 text-[29px] leading-tight font-semibold tracking-[-0.01em] text-white">
              What did you like most?
            </h2>
            <p className="mt-2 text-[14.5px] text-mist">
              Choose everything that applied. These become the specifics in your review.
            </p>

            <div className="hide-scroll -mx-5 mt-6 flex-1 overflow-y-auto px-5">
              <div className="flex flex-wrap gap-2">
                {HIGHLIGHTS.map((h) => {
                  const selected = liked.includes(h.id)
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => toggle(liked, setLiked, h.id)}
                      className={`tap flex items-center gap-1.5 rounded-full border px-3.5 py-2.5 text-[13px] font-semibold transition-all duration-200 active:scale-[0.97] ${
                        selected
                          ? 'border-gold/60 bg-gold/12 text-white'
                          : 'border-line bg-white/[0.035] text-mist hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {selected && <Check className="h-3 w-3 text-gold" strokeWidth={3.5} />}
                      {h.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-auto pt-6">
              <PrimaryButton
                onClick={() => setStep('improve')}
                disabled={liked.length === 0}
              >
                {liked.length === 0 ? 'Pick at least one' : `Continue · ${liked.length} selected`}
              </PrimaryButton>
            </div>
          </Step>
        )}

        {step === 'improve' && (
          <Step k="improve">
            <StepHeader step={4} />
            <h2 className="mt-4 text-[29px] leading-tight font-semibold tracking-[-0.01em] text-white">
              What could be better?
            </h2>
            <p className="mt-2 text-[14.5px] text-mist">
              Optional, but honest feedback is what actually fixes things.
            </p>

            <div className="hide-scroll -mx-5 mt-6 flex-1 overflow-y-auto px-5">
              <div className="flex flex-wrap gap-2">
                {IMPROVEMENTS.map((h) => {
                  const selected = improve.includes(h.id)
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => toggle(improve, setImprove, h.id)}
                      className={`tap flex items-center gap-1.5 rounded-full border px-3.5 py-2.5 text-[13px] font-semibold transition-all duration-200 active:scale-[0.97] ${
                        selected
                          ? 'border-gold/60 bg-gold/12 text-white'
                          : 'border-line bg-white/[0.035] text-mist hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {selected && <Check className="h-3 w-3 text-gold" strokeWidth={3.5} />}
                      {h.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-auto space-y-3 pt-7">
              <PrimaryButton onClick={startWriting}>
                {improve.length ? `Continue · ${improve.length} selected` : 'Continue'}
              </PrimaryButton>
              <TextButton onClick={startWriting}>Skip this step</TextButton>
            </div>
          </Step>
        )}

        {step === 'working' && (
          <Step k="working">
            <div className="flex flex-1 flex-col items-center justify-center gap-8 pb-16">
              <div className="relative grid h-24 w-24 place-items-center">
                <motion.span
                  className="absolute inset-0 rounded-[28px] border border-gold/35"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'linear' }}
                />
                <motion.span
                  className="absolute inset-2 rounded-[22px] border border-dashed border-gold/20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />
                <Sparkles className="h-8 w-8 text-gold" strokeWidth={1.6} />
              </div>
              <div className="text-center">
                <p className="font-review-display text-[21px] font-semibold text-white">Writing your review</p>
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="block h-1.5 w-1.5 rounded-full bg-gold"
                      animate={{ opacity: [0.25, 1, 0.25], y: [0, -4, 0] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Step>
        )}

        {step === 'review' && review && (
          <Step k="review">
            <StepHeader step={4} />
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[27px] leading-tight font-semibold tracking-[-0.01em] text-white">
                  Your review draft
                </h2>
                <p className="mt-1.5 text-[13px] text-mist">
                  {service?.label} · {lengthLabel(words)} · {words} words
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1.5 text-[12px] font-extrabold text-gold">
                {rating}
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              </span>
            </div>

            <div className="mt-4 rounded-3xl border border-line bg-white/[0.04] p-4">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => {
                  setText(e.target.value)
                  setWords(e.target.value.trim().split(/\s+/).filter(Boolean).length)
                }}
                spellCheck
                aria-label="Your review text"
                rows={7}
                className="w-full resize-none bg-transparent text-[15.5px] leading-[1.68] text-white outline-none"
              />
            </div>
            <p className="mt-2.5 text-[11.5px] text-mist/70">
              Tap the text to edit — it's yours before it goes anywhere.
            </p>

            {copied === 'ok' && (
              <p className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-mint">
                <Check className="h-3.5 w-3.5" strokeWidth={3} /> Review copied — now paste it in Google.
              </p>
            )}
            {copied === 'fail' && (
              <p className="mt-2 text-[12px] font-semibold text-gold">
                Your browser blocked automatic copying. Tap &ldquo;Copy review text&rdquo; then press and hold to paste.
              </p>
            )}
            {blocked && (
              <p className="mt-2 text-[12px] font-semibold text-gold">
                The new tab was blocked. Tap{' '}
                <button type="button" onClick={openGoogle} className="underline underline-offset-2">
                  Open Google again
                </button>
                .
              </p>
            )}

            <div className="mt-auto space-y-2.5 pt-7">
              <PrimaryButton
                onClick={goToGoogle}
                disabled={!text.trim()}
                icon={<Star className="h-4.5 w-4.5 fill-current" />}
              >
                Continue to Google
              </PrimaryButton>
              <GhostButton
                onClick={regenerate}
                icon={<RotateCcw className="h-4 w-4" />}
              >
                Make it different
              </GhostButton>
              <div className="pt-2">
                <Note>
                  Written only from what you selected. Nothing is posted automatically — you always press Post yourself.
                </Note>
              </div>
            </div>
          </Step>
        )}
      </AnimatePresence>
    </Shell>
  )
}
