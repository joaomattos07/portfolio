import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const options = {
  color: [
    { value: 'blue', swatch: 'bg-blue-600' },
    { value: 'dark', swatch: 'bg-slate-900' },
    { value: 'green', swatch: 'bg-emerald-600' },
  ],
  variant: [{ value: 'filled' }, { value: 'outline' }],
  shape: [{ value: 'square' }, { value: 'rounded' }, { value: 'pill' }],
  size: [{ value: 'sm' }, { value: 'md' }, { value: 'lg' }],
}

const classes = {
  base: 'border-2 font-semibold transition-colors duration-200 active:scale-95',
  color: {
    filled: {
      blue: 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700',
      dark: 'border-slate-900 bg-slate-900 text-white hover:bg-slate-700',
      green: 'border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700',
    },
    outline: {
      blue: 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
      dark: 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white',
      green: 'border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white',
    },
  },
  shape: {
    square: 'rounded-none',
    rounded: 'rounded-lg',
    pill: 'rounded-full',
  },
  size: {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  },
}

function Group({ label, children }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-muted">{label}</p>
      {children}
    </div>
  )
}

function Segmented({ items, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(item.value)}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? 'border-accent bg-bg text-accent'
                : 'border-border text-muted hover:text-text'
            }`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

function Line({ depth = 0, children }) {
  return (
    <p className="whitespace-pre-wrap break-words" style={{ paddingLeft: `${depth * 0.9}rem` }}>
      {children}
    </p>
  )
}

export default function DesignCodeDemo() {
  const { t } = useLanguage()
  const d = t.demo

  const [tab, setTab] = useState('design')
  const [color, setColor] = useState('blue')
  const [variant, setVariant] = useState('filled')
  const [shape, setShape] = useState('rounded')
  const [size, setSize] = useState('md')
  const [flash, setFlash] = useState(null)
  const [pending, setPending] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (tab !== 'code' || !flash) return
    const timer = setTimeout(() => setFlash(null), 1600)
    return () => clearTimeout(timer)
  }, [tab, flash])

  const change = (group, setter) => (value) => {
    setter(value)
    setFlash({ group, at: Date.now() })
    if (tab === 'design') setPending(true)
  }

  const open = (next) => {
    setTab(next)
    if (next === 'code') setPending(false)
  }

  const withLabels = (list, labels) => list.map((o) => ({ ...o, label: labels[o.value] }))

  const lines = [
    { group: 'base', text: classes.base },
    { group: 'color', text: classes.color[variant][color] },
    { group: 'shape', text: classes.shape[shape] },
    { group: 'size', text: classes.size[size] },
  ]

  const buttonClass = lines.map((l) => l.text).join(' ')

  const codeText = `export function Button({ children }) {
  return (
    <button
      className="
${lines.map((l) => '        ' + l.text).join('\n')}
      "
    >
      {children}
    </button>
  )
}`

  async function copy() {
    try {
      await navigator.clipboard.writeText(codeText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  const tabClass = (active) =>
    `px-4 py-3 text-sm font-semibold transition-colors ${
      active
        ? 'text-accent shadow-[inset_0_-2px_0_var(--color-accent)]'
        : 'text-muted hover:text-text'
    }`

  const panelClass = (active) =>
    `col-start-1 row-start-1 transition-opacity duration-200 ${
      active ? 'opacity-100' : 'pointer-events-none invisible opacity-0'
    }`

  return (
    <div className="mx-auto w-full max-w-md lg:mx-0">
      <div className="overflow-hidden rounded-4xl border border-border bg-surface shadow-lg shadow-blue-500/10">
        <div className="border-b border-border px-5 py-3">
          <span className="font-mono text-xs text-muted">
            {tab === 'design' ? 'Figma · Button' : 'Button.jsx'}
          </span>
        </div>

        <div role="tablist" className="grid grid-cols-2 border-b border-border">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'design'}
            onClick={() => open('design')}
            className={tabClass(tab === 'design')}
          >
            {d.tabDesign}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'code'}
            onClick={() => open('code')}
            className={tabClass(tab === 'code')}
          >
            <span className="inline-flex items-center gap-2">
              {d.tabCode}
              {pending && <span className="h-2 w-2 rounded-full bg-accent" />}
            </span>
          </button>
        </div>

        <div className="grid">
          <div className={panelClass(tab === 'design')} aria-hidden={tab !== 'design'}>
            <div className="flex min-h-40 items-center justify-center bg-bg p-8">
              <button type="button" className={buttonClass}>
                {d.buttonLabel}
              </button>
            </div>

            <div className="space-y-5 border-t border-border p-5">
              <Group label={d.colorLabel}>
                <div className="flex gap-3">
                  {options.color.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      aria-label={d.colors[c.value]}
                      aria-pressed={color === c.value}
                      onClick={() => change('color', setColor)(c.value)}
                      className={`h-8 w-8 rounded-full ${c.swatch} ring-offset-2 ring-offset-surface ${
                        color === c.value ? 'ring-2 ring-accent' : 'ring-0'
                      }`}
                    />
                  ))}
                </div>
              </Group>

              <Group label={d.styleLabel}>
                <Segmented
                  items={withLabels(options.variant, d.variants)}
                  value={variant}
                  onChange={change('color', setVariant)}
                />
              </Group>

              <Group label={d.borderLabel}>
                <Segmented
                  items={withLabels(options.shape, d.shapes)}
                  value={shape}
                  onChange={change('shape', setShape)}
                />
              </Group>

              <Group label={d.sizeLabel}>
                <Segmented
                  items={withLabels(options.size, d.sizes)}
                  value={size}
                  onChange={change('size', setSize)}
                />
              </Group>
            </div>
          </div>

          <div className={panelClass(tab === 'code')} aria-hidden={tab !== 'code'}>
            <div className="flex h-full flex-col bg-slate-900 p-5">
              <div className="mb-3 flex justify-end">
                <button
                  type="button"
                  onClick={copy}
                  className="rounded-lg border border-slate-600 px-3 py-1 text-xs text-slate-300 transition-colors hover:border-blue-400 hover:text-blue-400"
                >
                  {copied ? d.copied : d.copy}
                </button>
              </div>

              <div className="font-mono text-[13px] leading-6">
                <Line>
                  <span className="text-blue-400">export function</span>{' '}
                  <span className="text-sky-300">Button</span>
                  <span className="text-slate-400">{'({ children }) {'}</span>
                </Line>
                <Line depth={1}>
                  <span className="text-blue-400">return</span>{' '}
                  <span className="text-slate-400">(</span>
                </Line>
                <Line depth={2}>
                  <span className="text-slate-400">{'<'}</span>
                  <span className="text-sky-300">button</span>
                </Line>
                <Line depth={3}>
                  <span className="text-emerald-300">className</span>
                  <span className="text-slate-400">{'="'}</span>
                </Line>

                {lines.map((l) => (
                  <Line key={l.group} depth={4}>
                    <span
                      className={`rounded px-1 transition-colors duration-500 ${
                        flash?.group === l.group ? 'bg-blue-500/30 text-white' : 'text-slate-200'
                      }`}
                    >
                      {l.text}
                    </span>
                  </Line>
                ))}

                <Line depth={3}>
                  <span className="text-slate-400">{'"'}</span>
                </Line>
                <Line depth={2}>
                  <span className="text-slate-400">{'>'}</span>
                </Line>
                <Line depth={3}>
                  <span className="text-slate-400">{'{children}'}</span>
                </Line>
                <Line depth={2}>
                  <span className="text-slate-400">{'</'}</span>
                  <span className="text-sky-300">button</span>
                  <span className="text-slate-400">{'>'}</span>
                </Line>
                <Line depth={1}>
                  <span className="text-slate-400">)</span>
                </Line>
                <Line>
                  <span className="text-slate-400">{'}'}</span>
                </Line>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-muted">{d.hint}</p>
    </div>
  )
}