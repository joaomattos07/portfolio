import { Link } from 'react-router-dom'
import { FaBehance, FaCode, FaFigma } from 'react-icons/fa'
import { useLanguage } from '../i18n/LanguageContext'
import { GitHubIcon } from './Icons'
import { toolIcons } from './Tools'

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

export default function ProjectCard({ project }) {
  const { t } = useLanguage()
  const cover = project.cover ?? project.images?.[0]
  const detailUrl = `/projetos/${project.slug}`
  const links = Object.entries(project.links ?? {})
  const tags = project.tags ?? [t.types[project.type]]

  return (
    <article className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center">
      <Link
        to={detailUrl}
        viewTransition
        aria-label={project.title}
        className={`aspect-[4/3] h-auto w-full shrink-0 overflow-hidden rounded-2xl border border-border bg-surface sm:aspect-auto sm:h-28 sm:w-40 ${project.slug === 'prismapay' ? 'project-card-cover--prismapay' : ''}`}
      >
        {cover ? (
          <img
            src={cover}
            alt={`Capa do projeto ${project.title}`}
            className="h-full w-full object-contain sm:object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            {t.card.noImage}
          </div>
        )}
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const Icon = toolIcons[tag] ?? FaCode

            return (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-xs text-muted transition-colors hover:text-accent"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {t.tools.labels[tag] ?? tag}
              </span>
            )
          })}
        </div>

        <h3 className="mt-3 text-xl font-medium">
          <Link
            to={detailUrl}
            viewTransition
            className="transition-colors hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 leading-relaxed text-muted">{project.summary}</p>

        {links.length > 0 && (
          <div className="mt-3 flex items-center gap-4">
            {links.map(([key, url]) => {
              const Icon = linkIcons[key]
              if (!Icon) return null

              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.card.links[key]}
                  title={t.card.links[key]}
                  className="text-muted transition-colors hover:text-accent"
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        )}
      </div>
    </article>
  )
}
