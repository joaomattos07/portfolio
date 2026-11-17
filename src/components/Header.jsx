import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LangSwitch from './LangSwitch'

const links = [
  { id: 'home', key: 'home', to: '/' },
  { id: 'projetos', key: 'projects', to: '/#projetos' },
  { id: 'skills', key: 'skills', to: '/#skills' },
  { id: 'formacao', key: 'education', to: '/#formacao' },
  { id: 'contato', key: 'contact', to: '/#contato' },
]

const sectionIds = links.filter((link) => link.id !== 'home').map((link) => link.id)

export default function Header() {
  const { pathname } = useLocation()
  const { t } = useLanguage()
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pathname !== '/') {
      setActive('')
      return
    }

    const update = () => {
      const line = window.scrollY + window.innerHeight * 0.35
      let current = 'home'

      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (
          element &&
          element.getBoundingClientRect().top + window.scrollY <= line
        ) {
          current = id
        }
      })

      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pathname])

  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="relative mx-auto max-w-6xl">
        <div
          className={`rounded-full border transition-all duration-300 ${
            scrolled
              ? 'border-slate-200 bg-white/75 shadow-lg shadow-blue-500/10 backdrop-blur-xl'
              : 'border-white/40 bg-white/55 backdrop-blur-md'
          }`}
        >
          <div className="flex h-14 items-center justify-between px-4 md:grid md:grid-cols-[1fr_auto_1fr] md:px-6">
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? t.header.closeMenu : t.header.openMenu}
              aria-expanded={open}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
            >
              <span
                className={`h-0.5 w-5 bg-slate-700 transition ${
                  open ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-slate-700 transition ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-slate-700 transition ${
                  open ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </button>

            <span className="hidden md:block" />

            <nav className="hidden items-center gap-1 md:flex">
              {links.map((link) => (
                <Link
                  key={link.id}
                  to={link.to}
                  className={`rounded-full px-4 py-2 text-[15px] transition-colors ${
                    active === link.id
                      ? 'font-medium text-accent'
                      : 'text-slate-600 hover:text-accent'
                  }`}
                >
                  {t.header.links[link.key]}
                </Link>
              ))}
            </nav>

            <LangSwitch className="md:justify-self-end" />
          </div>
        </div>

        {open && (
          <nav className="absolute inset-x-0 top-full mt-2 rounded-3xl border border-slate-200 bg-white/90 p-3 shadow-lg shadow-blue-500/10 backdrop-blur-xl md:hidden">
            <div className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.id}
                  to={link.to}
                  onClick={close}
                  className={`rounded-2xl px-4 py-3 text-lg transition-colors ${
                    active === link.id
                      ? 'font-medium text-accent'
                      : 'text-slate-600 hover:text-accent'
                  }`}
                >
                  {t.header.links[link.key]}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}