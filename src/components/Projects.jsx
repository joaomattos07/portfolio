import { projects, localize } from '../data/projects'
import ProjectCard from './ProjectCard'
import { useLanguage } from '../i18n/LanguageContext'

export default function Projects() {
  const { t, lang } = useLanguage()
  const visible = projects.map((project) => localize(project, lang))

  return (
    <section id="projetos" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl font-medium md:text-5xl">
            {t.projectsSection.title}
          </h2>

          <p className="mt-3 text-sm font-medium uppercase tracking-[0.22em] text-muted">
            Frontend &amp; UI/UX
          </p>
        </div>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}