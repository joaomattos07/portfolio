import { contacts } from '../data/contacts'
import { contactIcons } from './Icons'
import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative bg-linear-115 from-blue-600 via-blue-500 to-blue-400 px-6 pb-12 pt-28 text-white md:pt-40">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 top-0 block h-16 w-full -translate-y-px fill-bg md:h-28"
      >
        <path d="M0 0H1440V60Q720 140 0 60Z" />
      </svg>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
        <p className="text-sm">
          © {new Date().getFullYear()} João Pedro De Mattos. {t.footer.rights}
        </p>

        <div className="flex items-center gap-5">
          {contacts.map((c) => {
            const Icon = contactIcons[c.id]
            return (
              <a
                key={c.id}
                href={c.href}
                target={c.id === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={t.contactLabels[c.id]}
                className="text-white/80 transition-colors hover:text-white"
              >
                <Icon className="h-6 w-6" />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}