import { useLanguage } from '../i18n/LanguageContext'

export default function Education() {
  const { t } = useLanguage()
  const educations = t.education.items

  return (
    <section id="formacao" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-medium md:text-5xl">
          {t.education.title}
        </h2>

        <div className="mt-12">
          <h3 className="border-b border-border pb-3 text-sm font-medium uppercase tracking-[0.22em] text-muted">
            {t.education.subtitle}
          </h3>

          <div className="mt-6 space-y-8">
            {educations.map((item) => (
              <article key={item.course}>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-slate-700"
                    />
                    <span>
                      {item.type} ·{' '}
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-800">
                        {item.school}
                      </span>
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-slate-700"
                    />
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-800">
                      {item.course}
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-slate-700"
                    />
                    <span>
                      {item.period} ·{' '}
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-800">
                        {item.status}
                      </span>
                    </span>
                  </li>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
