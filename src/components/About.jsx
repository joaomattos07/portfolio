import DesignCodeDemo from './DesignCodeDemo'
import Tools from './Tools'
import ProcessCarousel from './ProcessCarousel'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const { bio } = t.about
  const educations = t.education.items

  return (
    <section id="sobre" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-medium md:text-5xl">{t.about.title}</h2>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[380px_1fr]">
          <DesignCodeDemo />

          <div className="space-y-10">
            <p className="text-justify text-lg leading-relaxed hyphens-none break-normal md:text-xl">
              {bio.before}
              <span className="font-semibold">{bio.name}</span>
              {bio.middle}
              <span className="font-semibold text-accent">{bio.role}</span>
              {bio.after}
            </p>

            <ProcessCarousel />
          </div>
        </div>

        <Tools />

        <div id="formacao" className="mt-24">
          <h3 className="text-center text-3xl font-medium md:text-4xl">{t.education.title}</h3>

          <ul className="mx-auto mt-10 max-w-3xl space-y-6">
            {educations.map((item) => (
              <li
                key={item.course}
                className="flex flex-col gap-4 rounded-4xl border border-border bg-surface p-6 shadow-lg shadow-blue-500/10 sm:flex-row sm:items-center sm:justify-between sm:p-8"
              >
                <div>
                  <p className="text-sm text-muted">
                    {item.detail ? `${item.type} · ${item.detail}` : item.type}
                  </p>
                  <h4 className="mt-1 text-2xl font-medium">{item.course}</h4>
                  <p className="mt-1 text-muted">{item.school}</p>
                </div>

                <div className="sm:text-right">
                  <p className="text-lg">{item.period}</p>
                  <p className="mt-1 text-sm font-medium text-accent">{item.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}