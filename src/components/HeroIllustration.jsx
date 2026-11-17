const palette = {
  pink: '#f472b6',
  blue: '#60a5fa',
  green: '#4ade80',
  orange: '#fb923c',
  cyan: '#22d3ee',
  slate: '#94a3b8',
}

const font = 'Montserrat, sans-serif'

const codeLines = [
  [0, [[22, 'pink'], [30, 'blue'], [18, 'slate']]],
  [1, [[26, 'cyan'], [36, 'slate'], [14, 'orange']]],
  [1, [[18, 'pink'], [44, 'green']]],
  [2, [[30, 'blue'], [22, 'slate'], [34, 'orange']]],
  [2, [[16, 'cyan'], [52, 'slate']]],
  [2, [[24, 'pink'], [20, 'blue'], [26, 'green']]],
  [1, [[14, 'slate']]],
  [1, [[22, 'pink'], [18, 'slate'], [30, 'cyan']]],
  [2, [[34, 'blue'], [18, 'orange'], [24, 'slate']]],
  [3, [[26, 'green'], [40, 'slate']]],
  [3, [[18, 'cyan'], [28, 'pink']]],
  [2, [[12, 'slate']]],
  [1, [[12, 'slate']]],
  [0, [[10, 'slate']]],
]

const U = 17.4
const mainRows = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.9],
  [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.4],
  [1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.1],
  [1.2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.7],
  [1.3, 1.1, 1.1, 1.1, 5.3, 1.3, 1, 0.9, 0.9, 0.9],
]
const rowY = (i) => 28 + i * 19.5

function layoutRow(widths) {
  let x = 12
  return widths.map((w) => {
    const key = { x, w: w * U - 2.4 }
    x += w * U
    return key
  })
}

const badges = [
  { label: 'FAN', text: 'Dual-Fan' },
  { label: 'N', text: 'NitroSense' },
  { label: 'WiFi', text: 'Wi-Fi 6' },
  { label: 'SSD', text: '2x PCIe SSD' },
  { label: 'D5', text: 'DDR5' },
]

const puffs = [
  { x: 148, delay: '0s', drift: '-10px', r: 7 },
  { x: 153, delay: '-0.7s', drift: '12px', r: 6 },
  { x: 146, delay: '-1.4s', drift: '-14px', r: 8 },
  { x: 152, delay: '-2.1s', drift: '9px', r: 6.5 },
  { x: 149, delay: '-2.8s', drift: '-8px', r: 7.5 },
  { x: 155, delay: '-3.5s', drift: '15px', r: 6 },
  { x: 147, delay: '-4.2s', drift: '-12px', r: 7 },
]

const phoneMatrix = 'matrix(0.866 -0.5 0.866 0.5 542 490)'
const phoneSideColor = (d) => (d === 1 ? '#000000' : d <= 5 ? '#000000' : '#000000')

const keyStyle = { fill: '#0f0f11', stroke: '#2a2826', strokeWidth: 0.7 }

export default function HeroIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 740 600" className={className} aria-hidden="true">
      <defs>
        <filter id="hero-smoke-blur" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="hero-smoke-mobile-blur" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      <polygon points="316,261 627.8,441 402.6,571 90.8,391" fill="#1e3a8a" opacity="0.22" />
      <ellipse cx="168" cy="272" rx="58" ry="26" fill="#1e3a8a" opacity="0.25" />

      <g>
        <path d="M104 180v80a46 26 0 0 0 92 0v-80z" fill="#172554" />
        <ellipse cx="150" cy="180" rx="46" ry="26" fill="#1e3a8a" />
        <ellipse cx="150" cy="182" rx="39" ry="20" fill="#92400e" />
        <ellipse cx="140" cy="178" rx="14" ry="6" fill="#d97706" opacity="0.55" />
        <path
          d="M104 200c-30-2-30 38 0 36"
          fill="none"
          stroke="#172554"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <g className="hero-smoke" filter="url(#hero-smoke-blur)">
          {puffs.map((p) => (
            <ellipse
              key={p.x + p.delay}
              className="puff"
              cx={p.x}
              cy="176"
              rx={p.r}
              ry={p.r * 0.8}
              fill="#ffffff"
              style={{ animationDelay: p.delay, '--drift': p.drift }}
            />
          ))}
        </g>
      </g>

      <polygon points="74.8,365 386.6,545 386.6,559 74.8,379" fill="#0b0b0d" stroke="#0b0b0d" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="611.8,415 386.6,545 386.6,559 611.8,429" fill="#111113" stroke="#111113" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="300,235 611.8,415 386.6,545 74.8,365" fill="#1c1a1b" stroke="#1c1a1b" strokeWidth="4" strokeLinejoin="round" />

      <g transform="matrix(0.866 0.5 -0.866 0.5 300 235)">
        {Array.from({ length: 15 }, (_, i) => (
          <rect key={`f${i}`} x={12 + i * 22.4} y="12" width="19" height="9" rx="2.5" {...keyStyle} />
        ))}
        {mainRows.map((widths, r) =>
          layoutRow(widths).map((k, c) => (
            <rect key={`m${r}-${c}`} x={k.x} y={rowY(r)} width={k.w} height="16" rx="3" {...keyStyle} />
          )),
        )}
        {[0, 1, 2, 3, 4].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect key={`n${r}-${c}`} x={280 + c * 17.3} y={rowY(r)} width="15" height="16" rx="3" {...keyStyle} />
          )),
        )}

        <rect x="84" y="150" width="150" height="92" rx="8" fill="#222021" stroke="#313032" />

        <g>
        <rect x="12" y="126" width="26" height="26" rx="2" fill="#0071c5" />
        <text x="15" y="134" fontSize="5.5" fontWeight="700" fill="#ffffff" fontFamily={font}>intel</text>
        <text x="15" y="144" fontSize="8" fontWeight="700" fill="#ffffff" fontFamily={font}>CORE</text>
        <text x="29" y="150" fontSize="5" fontWeight="700" fill="#ffffff" fontFamily={font}>i5</text>

        <rect x="42" y="126" width="32" height="26" rx="2" fill="#0b0b0b" />
        <rect x="42" y="126" width="32" height="8" rx="2" fill="#76b900" />
        <text x="45" y="132.3" fontSize="5" fontWeight="800" fill="#0b0b0b" fontFamily={font}>NVIDIA</text>
        <text x="45" y="142" fontSize="5.2" fontWeight="800" fill="#ffffff" fontFamily={font}>GEFORCE</text>
        <text x="45" y="149.5" fontSize="7" fontWeight="800" fill="#ffffff" fontFamily={font}>RTX</text>
        <rect x="42" y="150.5" width="32" height="1.5" fill="#76b900" />

        <text x="244" y="143" fontSize="11" fontWeight="800" fill="#f5f5f5" letterSpacing="-0.3" fontFamily={font}>
          NITRO V 15
        </text>
        <text x="262" y="160" fontSize="5.5" fontWeight="800" fill="#f5f5f5" fontFamily={font}>HDMI</text>
        <text x="292" y="160" fontSize="4.5" fontWeight="700" fill="#f5f5f5" fontFamily={font}>THUNDERBOLT</text>
        <rect x="240" y="170" width="108" height="14" rx="7" fill="#171516" stroke="#5a2630" strokeWidth="0.8" />
        {badges.map((b, i) => (
          <g key={b.text}>
            <circle cx={249 + i * 17.5} cy="177" r="4.5" fill="none" stroke="#d4d4d8" strokeWidth="0.8" />
            <text
              x={249 + i * 17.5}
              y="178.4"
              textAnchor="middle"
              fontSize="3.2"
              fontWeight="700"
              fill="#d4d4d8"
              fontFamily={font}
            >
              {b.label}
            </text>
          </g>
        ))}
        </g>
      </g>

      <polygon points="611.8,415 611.8,190 618.7,186 618.7,411" fill="#1a1a1d" />
      <polygon points="300,10 611.8,190 618.7,186 306.9,6" fill="#27272b" />

      <g transform="matrix(0.866 0.5 0 1 300 10)">
        <rect width="360" height="225" rx="2" fill="#0a0a0c" stroke="#0a0a0c" strokeWidth="2" />
        <rect x="6" y="6" width="348" height="197" rx="5" fill="#0b1224" />
        <line x1="186" y1="6" x2="186" y2="203" stroke="#1e293b" />

        {codeLines.map(([indent, parts], row) => {
          let x = 34 + indent * 12
          const y = 24 + row * 13
          return (
            <g key={row}>
              <rect x="14" y={y} width="8" height="5" rx="2.5" fill="#334155" />
              {parts.map(([w, color], i) => {
                const bar = (
                  <rect key={i} x={x} y={y} width={w} height="5" rx="2.5" fill={palette[color]} />
                )
                x += w + 4
                return bar
              })}
            </g>
          )
        })}

        <g transform="translate(192 12)" fill="none" stroke="#64748b" strokeWidth="1">
          <rect width="156" height="185" rx="3" />
          <rect x="6" y="5" width="16" height="4" rx="2" fill="#94a3b8" stroke="none" />
          <rect x="88" y="5" width="12" height="3" rx="1.5" fill="#64748b" stroke="none" />
          <rect x="106" y="5" width="12" height="3" rx="1.5" fill="#64748b" stroke="none" />
          <rect x="124" y="5" width="12" height="3" rx="1.5" fill="#64748b" stroke="none" />
          <line x1="0" y1="14" x2="156" y2="14" />
          <rect x="8" y="22" width="140" height="52" />
          <line x1="8" y1="22" x2="148" y2="74" stroke="#475569" />
          <line x1="148" y1="22" x2="8" y2="74" stroke="#475569" />
          <rect x="8" y="82" width="90" height="6" rx="3" fill="#94a3b8" stroke="none" />
          <rect x="8" y="92" width="120" height="4" rx="2" fill="#475569" stroke="none" />
          <rect x="8" y="100" width="100" height="4" rx="2" fill="#475569" stroke="none" />
          <rect x="8" y="110" width="36" height="12" rx="6" fill="#3b82f6" stroke="none" />
          {[8, 57, 106].map((x) => (
            <g key={x}>
              <rect x={x} y="132" width="42" height="46" />
              <rect x={x + 4} y="136" width="34" height="20" stroke="#475569" />
              <rect x={x + 4} y="162" width="26" height="4" rx="2" fill="#94a3b8" stroke="none" />
              <rect x={x + 4} y="170" width="34" height="3" rx="1.5" fill="#475569" stroke="none" />
            </g>
          ))}
        </g>

        <rect x="10" y="208" width="20" height="10" rx="2" fill="#e0c96a" />
        <text x="20" y="215.4" textAnchor="middle" fontSize="6" fontWeight="800" fill="#1a1a1a" fontFamily={font}>
          FHD
        </text>
        <rect x="33" y="208" width="28" height="10" rx="2" fill="#17150f" stroke="#c9b458" strokeWidth="0.8" />
        <text x="47" y="215.4" textAnchor="middle" fontSize="6" fontWeight="700" fill="#e0c96a" fontFamily={font}>
          165Hz
        </text>

        <polygon
          transform="translate(176.5 205) scale(0.058)"
          points="0,0 87,116 120,40 120,216 67,308 67,150 37,128 37,210 0,173"
          fill="#d4d4d8"
        />
      </g>

      <polygon points="552,504 681.9,429 739.1,462 609.2,537" fill="#1e3a8a" opacity="0.22" />

      {Array.from({ length: 10 }, (_, i) => 10 - i).map((d) => (
        <g key={d} transform={`translate(0 ${d})`}>
          <rect width="150" height="66" rx="12" fill={phoneSideColor(d)} transform={phoneMatrix} />
        </g>
      ))}

      <g transform={phoneMatrix}>
        <rect width="150" height="66" rx="12" fill="#101a3b" stroke="#3a548f" strokeWidth="1" />
        <rect x="4" y="4" width="142" height="58" rx="9" fill="#050a1f" />

        <rect x="113" y="8" width="4" height="16" rx="2" fill="#99f6e4" />
        <rect x="123" y="13" width="3" height="11" rx="1.5" fill="#5eead4" />

        <circle cx="66" cy="26" r="1.8" fill="#a78bfa" />
        <circle cx="72" cy="23" r="1.8" fill="#2dd4bf" />
        <circle cx="78" cy="26" r="1.8" fill="#3b82f6" />
        <circle cx="72" cy="29" r="1.8" fill="#f472b6" />
        <circle cx="66" cy="32" r="1.8" fill="#3b82f6" />
        <circle cx="78" cy="32" r="1.8" fill="#a78bfa" />

        <rect x="40" y="34" width="7" height="22" rx="3.5" fill="#14b8a6" />
        <rect x="53" y="40" width="4" height="16" rx="2" fill="#0f766e" />
      </g>
    </svg>
  )
}
