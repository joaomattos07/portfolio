import { contacts } from '../data/contacts'
import { contactIcons, DownloadIcon } from './Icons'
import { useLanguage } from '../i18n/LanguageContext'

function EyeIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export default function Contact() {
  const { t, lang } = useLanguage()
  const iconOrder = ['email', 'linkedin', 'github']
  const viewCvLabel = lang === 'pt' ? 'Ver CV' : 'View CV'

  return (
    <section id="contato" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-medium md:text-5xl">{t.contact.title}</h2>

        <div className="mt-10 flex justify-center gap-4">
          {iconOrder.map((id) => {
            const contact = contacts.find((item) => item.id === id)
            const Icon = contactIcons[id]

            return (
              <a
                key={id}
                href={contact.href}
                aria-label={id === 'email' ? 'E-mail' : t.contactLabels[id]}
                target={id === 'email' ? undefined : '_blank'}
                rel={id === 'email' ? undefined : 'noreferrer'}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface text-slate-600 shadow-sm transition-colors hover:border-solid hover:border-accent hover:text-accent"
              >
                <Icon className="h-6 w-6" />
              </a>
            )
          })}
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={t.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3 font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            <EyeIcon />
            {viewCvLabel}
          </a>

          <a
            href={t.cv}
            download
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3 font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            <DownloadIcon className="h-5 w-5" />
            {t.contact.downloadCv}
          </a>
        </div>
      </div>
    </section>
  )
}