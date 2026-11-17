import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaBehance, FaFigma } from 'react-icons/fa'
import { projects, localize } from '../data/projects'
import { useLanguage } from '../i18n/LanguageContext'
import { GitHubIcon } from '../components/Icons'

const categoryLabels = {
  pt: {
    frontend: 'Frontend',
    uiux: 'UI/UX',
  },
  en: {
    frontend: 'Frontend',
    uiux: 'UI/UX',
  },
}

function GlobeIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 3 12 3z" />
    </svg>
  )
}

const linkIcons = {
  site: GlobeIcon,
  github: GitHubIcon,
  prototype: FaFigma,
  behance: FaBehance,
}

const linkOrder = ['site', 'github', 'prototype', 'behance']

const flowImageViewerLabels = {
  pt: {
    title: 'Fluxograma do PrismaPay ampliado',
    zoomOut: 'Diminuir zoom',
    zoomIn: 'Aumentar zoom',
    fit: 'Ajustar à tela',
    close: 'Fechar imagem ampliada',
  },
  en: {
    title: 'Enlarged PrismaPay flowchart',
    zoomOut: 'Zoom out',
    zoomIn: 'Zoom in',
    fit: 'Fit to screen',
    close: 'Close enlarged image',
  },
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t, lang } = useLanguage()
  const d = t.detail
  const [flowImageOpen, setFlowImageOpen] = useState(false)
  const [flowImageZoom, setFlowImageZoom] = useState(0.95)
  const flowViewerLabels = flowImageViewerLabels[lang] ?? flowImageViewerLabels.pt

  useEffect(() => {
    if (!flowImageOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') setFlowImageOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [flowImageOpen])

  const found = projects.find((project) => project.slug === slug)

  if (!found) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-medium">{d.notFound}</h1>
        <Link
          to="/#projetos"
          className="mt-6 inline-block font-medium text-accent"
        >
          {d.back}
        </Link>
      </section>
    )
  }

  const project = localize(found, lang)
  const links = linkOrder
    .filter((key) => project.links?.[key])
    .map((key) => [key, project.links[key]])

  const category =
    categoryLabels[lang]?.[project.type] ?? t.types[project.type]

  return (
    <article
      key={project.slug}
      className="project-detail-enter mx-auto max-w-4xl px-6 pb-24 pt-28"
    >
      <Link
        to="/#projetos"
        aria-label={d.back}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-slate-600 shadow-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M19 12H5m7 7-7-7 7-7" />
        </svg>
      </Link>

      <p className="mt-10 text-sm font-medium uppercase tracking-[0.22em] text-muted">
        {category}
      </p>

      <h1 className="mt-2 text-4xl font-light md:text-6xl">
        {project.title}
      </h1>

      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        {project.detailIntro ?? project.summary}
      </p>

      {links.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center gap-3">
            {links.map(([key, url]) => {
              const Icon = linkIcons[key]
              if (!Icon) return null

              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={d.links[key]}
                  title={d.links[key]}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-slate-600 shadow-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
          {project.links?.prototype && (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              {lang === 'en'
                ? 'This is a prototype, so some interactions may not work as expected. For the best experience, open it in the Figma mobile app.'
                : 'Por ser um protótipo, algumas interações podem não funcionar como esperado. Para uma melhor experiência, abra pelo app do Figma no celular.'}
            </p>
          )}
        </div>
      )}

      {project.slug === 'portfolio' && (
        <figure className="-mx-4 mt-[32px] md:-mx-6">
          <img
            src="/projects/portfolio/portfolio-preview.png"
            alt={
              lang === 'en'
                ? 'Portfolio displayed on a laptop and a mobile phone'
                : 'Portfólio exibido em um notebook e em um celular'
            }
            className="mx-auto block h-auto w-full"
            loading="lazy"
          />
        </figure>
      )}

      {project.slug === 'prismapay' && (
        <figure className="-mx-4 mt-[32px] md:-mx-6">
          <img
            src="/projects/prismapay/prismapay-showcase.png"
            alt={
              lang === 'en'
                ? 'PrismaPay home and Pix screens displayed on mobile phones'
                : 'Telas de início e Pix do PrismaPay exibidas em celulares'
            }
            className="mx-auto block h-auto w-full"
            loading="eager"
          />
        </figure>
      )}

      {project.problem && (
        <section className="mt-14">
          <h2 className="text-2xl font-medium md:text-3xl">
            {project.problemTitle ?? d.problem}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            {project.problem}
          </p>
        </section>
      )}

      {project.sections?.map((section) => (
        <section key={section.title} className="mt-10">
          <h2 className="text-2xl font-medium md:text-3xl">
            {section.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            {section.text}
          </p>
          {section.image && (
            <figure className="mt-6">
              <img
                src={section.image}
                alt={section.imageAlt}
                className="mx-auto block h-auto w-full max-w-3xl"
                loading="lazy"
                decoding="async"
              />
            </figure>
          )}
        </section>
      ))}

      {project.flowImage && (
        <figure className="mt-8">
          <button
            type="button"
            onClick={() => {
              setFlowImageZoom(0.95)
              setFlowImageOpen(true)
            }}
            aria-haspopup="dialog"
            aria-label={project.flowImageCaption}
            title={project.flowImageCaption}
            className="block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <img
              src={project.flowImage}
              alt={project.flowImageAlt}
              className="block h-auto w-full"
              loading="lazy"
            />
          </button>
          <figcaption className="mt-3 text-center text-sm text-muted">
            {project.flowImageCaption}
          </figcaption>
        </figure>
      )}

      {project.flowImage && flowImageOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={flowViewerLabels.title}
          className="fixed inset-0 z-[100] flex flex-col bg-slate-950/95 p-3 sm:p-5"
        >
          <div className="flex shrink-0 items-center justify-end gap-2 pb-3 text-white">
            <button
              type="button"
              onClick={() => setFlowImageZoom((zoom) => Math.max(0.5, zoom - 0.25))}
              aria-label={flowViewerLabels.zoomOut}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xl transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              −
            </button>
            <span className="min-w-14 text-center text-sm tabular-nums">
              {Math.round(flowImageZoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setFlowImageZoom((zoom) => Math.min(3, zoom + 0.25))}
              aria-label={flowViewerLabels.zoomIn}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xl transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => setFlowImageZoom(0.95)}
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/25 bg-white/10 px-3 text-sm transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {flowViewerLabels.fit}
            </button>
            <button
              type="button"
              onClick={() => setFlowImageOpen(false)}
              aria-label={flowViewerLabels.close}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-auto rounded-xl bg-white p-2">
            <div className="flex min-h-full min-w-full items-center justify-center">
              <img
                src={project.flowImage}
                alt={project.flowImageAlt}
                style={{ width: `${flowImageZoom * 100}vw` }}
                className="h-auto max-w-none shrink-0"
              />
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
