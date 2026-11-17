import { useLayoutEffect, useRef, useState } from 'react'
import HeroIllustration from './HeroIllustration'
import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero
  const introRef = useRef(null)
  const [introLines, setIntroLines] = useState([h.intro])

  useLayoutEffect(() => {
    const paragraph = introRef.current
    if (!paragraph) return

    const measureLines = () => {
      const width = paragraph.clientWidth
      if (!width) return

      const style = window.getComputedStyle(paragraph)
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) return

      context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`

      const words = h.intro.trim().split(/\s+/)
      const lines = []
      let line = ''

      words.forEach((word) => {
        const candidate = line ? `${line} ${word}` : word

        if (line && context.measureText(candidate).width > width - 2) {
          lines.push(line)
          line = word
        } else {
          line = candidate
        }
      })

      if (line) lines.push(line)

      setIntroLines((currentLines) =>
        currentLines.join('\n') === lines.join('\n') ? currentLines : lines,
      )
    }

    measureLines()

    const observer = new ResizeObserver(measureLines)
    observer.observe(paragraph)

    return () => observer.disconnect()
  }, [h.intro])

  return (
    <section className="relative overflow-hidden bg-linear-115 from-blue-600 via-blue-500 to-blue-400 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-28 pt-28 sm:gap-10 sm:px-6 sm:pb-36 sm:pt-32 lg:grid-cols-2 lg:gap-12 lg:pb-48 lg:pt-40">
        <div>
          <h1
            key={h.title}
            className="hero-title-enter text-6xl font-extralight leading-none tracking-tight sm:text-8xl md:text-9xl"
          >
            {h.title}
          </h1>

          <p
            key={h.intro}
            ref={introRef}
            className="mt-6 max-w-xl text-base leading-relaxed sm:mt-8 sm:text-lg"
          >
            {introLines.map((line, index) => (
              <span
                key={`${h.intro}-${index}`}
                className="hero-intro-line"
                style={{ animationDelay: `${250 + index * 170}ms` }}
              >
                {line}
              </span>
            ))}
          </p>
        </div>

        <HeroIllustration className="mx-auto h-auto w-full max-w-xl lg:max-w-none" />
      </div>

      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 block h-16 w-full fill-bg md:h-28"
      >
        <path d="M0 120V60Q720 -20 1440 60V120Z" />
      </svg>
    </section>
  )
}
