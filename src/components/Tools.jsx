import {
  FaBootstrap,
  FaCss3Alt,
  FaDatabase,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaMobileAlt,
  FaProjectDiagram,
  FaReact,
} from 'react-icons/fa'
import {
  SiNodedotjs,
  SiPhp,
  SiTailwindcss,
  SiVite,
} from 'react-icons/si'
import { useLanguage } from '../i18n/LanguageContext'

const stroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

function FigJamIcon({ className }) {
  return (
    <svg {...stroke} className={className}>
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M7 7h10v10H7zM9.5 10h5M9.5 13h3"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CSharpIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 1.5 21 6.7v10.6L12 22.5 3 17.3V6.7L12 1.5Z"
        fill="currentColor"
      />
      <path
        d="m3.5 7 8.5 5 8.5-5M12 12v10"
        fill="none"
        stroke="white"
        strokeWidth="0.8"
        opacity="0.45"
      />
      <path
        d="M14.2 7.7c-.7-.7-1.6-1-2.6-1-2.5 0-4.1 2.1-4.1 5.3s1.6 5.3 4.1 5.3c1 0 1.9-.3 2.6-1"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="m17.7 8.4-.9 6.8m3.2-6.8-.9 6.8m-2.6-4.5h4.7m-5.1 2.5h4.7"
        fill="none"
        stroke="white"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  )
}

function UiUxIcon({ className }) {
  return (
    <svg {...stroke} className={className}>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  )
}

function WireframeIcon({ className }) {
  return (
    <svg {...stroke} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3" />
      <path d="M3 3l18 18M21 3L3 21" />
    </svg>
  )
}

function PrototypeIcon({ className }) {
  return (
    <svg {...stroke} className={className}>
      <path d="M5 3l14 7-6 2.5L10.5 19z" />
      <path d="M13 12.5l5 5" />
    </svg>
  )
}

function DesignSystemIcon({ className }) {
  return (
    <svg {...stroke} className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

export const toolIcons = {
  JavaScript: FaJs,
  React: FaReact,
  'Tailwind CSS': SiTailwindcss,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  Vite: SiVite,
  Bootstrap: FaBootstrap,
  'Node.js': SiNodedotjs,
  PHP: SiPhp,
  'C#': CSharpIcon,
  SQL: FaDatabase,
  Git: FaGitAlt,
  GitHub: FaGithub,
  Figma: FaFigma,
  FigJam: FigJamIcon,
  'UI/UX Design': UiUxIcon,
  'UI/UX': UiUxIcon,
  Wireframes: WireframeIcon,
  Prototypes: PrototypeIcon,
  'Design System': DesignSystemIcon,
  'Mobile-first': FaMobileAlt,
  'User Flow': FaProjectDiagram,
}

const groups = [
  {
    id: 'frontend',
    items: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Vite', 'Bootstrap'],
  },
  {
    id: 'backend',
    items: ['Node.js', 'PHP', 'C#', 'SQL'],
  },
  {
    id: 'tools',
    items: [
      'Git',
      'GitHub',
      'Figma',
      'UI/UX Design',
      'FigJam',
      'Wireframes',
      'Prototypes',
      'Design System',
      'Mobile-first',
      'User Flow',
    ],
  },
]

const groupTitles = {
  pt: {
    frontend: 'Frontend',
    backend: 'Backend & Banco de Dados',
    tools: 'Ferramentas & UI/UX',
  },
  en: {
    frontend: 'Frontend',
    backend: 'Backend & Database',
    tools: 'Tools & UI/UX',
  },
}

function Item({ name, label }) {
  const Icon = toolIcons[name]

  return (
    <li className="group flex items-center gap-3 text-sm">
      {Icon && (
        <Icon className="h-5 w-5 shrink-0 text-slate-600 transition-colors group-hover:text-accent" />
      )}
      <span className="text-text">{label}</span>
    </li>
  )
}

export default function Tools() {
  const { t, lang } = useLanguage()

  return (
    <div id="skills">
      <h2 className="text-center text-4xl font-medium md:text-5xl">
        {t.tools.title}
      </h2>

      <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <section key={group.id}>
            <h3 className="border-b border-border pb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              {groupTitles[lang][group.id]}
            </h3>

            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
              {group.items.map((item) => (
                <Item
                  key={item}
                  name={item}
                  label={t.tools.labels[item] ?? item}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
