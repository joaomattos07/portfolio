import { useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function Arrow({ direction, label, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d={direction === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  )
}

export default function ProcessCarousel() {
  const { t } = useLanguage()
  const steps = t.process.steps
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  const goTo = (i) => {
    const track = trackRef.current
    const card = track?.children[i]
    if (!card) return
    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
  }

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    let closest = 0
    let min = Infinity
    Array.from(track.children).forEach((card, i) => {
      const distance = Math.abs(card.offsetLeft - track.scrollLeft)
      if (distance < min) {
        min = distance
        closest = i
      }
    })
    setIndex(closest)
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl font-medium">{t.process.title}</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">
            {steps[index].n} / {String(steps.length).padStart(2, '0')}
          </span>
          <Arrow
            direction="prev"
            label={t.process.prev}
            disabled={index === 0}
            onClick={() => goTo(index - 1)}
          />
          <Arrow
            direction="next"
            label={t.process.next}
            disabled={index === steps.length - 1}
            onClick={() => goTo(index + 1)}
          />
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="relative mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {steps.map((step) => (
          <article key={step.n} className="w-full shrink-0 snap-start">
            <div className="h-full rounded-3xl border border-border bg-surface p-6 sm:p-8">
              <span className="text-5xl font-extralight text-accent">{step.n}</span>
              <h4 className="mt-4 text-xl font-medium">{step.title}</h4>
              <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        {steps.map((step, i) => (
          <button
            key={step.n}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${t.process.goTo} ${step.n}`}
            aria-current={index === i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === i ? 'w-8 bg-accent' : 'w-3 bg-border hover:bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  )
}