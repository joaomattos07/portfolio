import { useLanguage } from '../i18n/LanguageContext'

const options = [
  { code: 'pt', flag: 'br', label: 'PT' },
  { code: 'en', flag: 'us', label: 'EN' },
]

export default function LangSwitch({ className = '' }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div role="group" aria-label={t.header.language} className={`flex items-center gap-1 ${className}`}>
      {options.map(({ code, flag, label }) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-colors ${
            lang === code ? 'bg-slate-200/80 text-blue-900' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="text-[9px] font-medium uppercase">{flag}</span>
          <span className="font-mono text-sm">{label}</span>
        </button>
      ))}
    </div>
  )
}