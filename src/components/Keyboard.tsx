import { layoutKeyboard } from '../lib/keyboard'

export interface KeyboardProps {
  /** Bare names ascend from the last; names with an octave ("F4") land there. */
  notes: string[]
  /** Finger per note, aligned to `notes`. Printed on the key. */
  fingers?: (number | null)[]
  /** Which hand the fingering is for. */
  hand?: 'RH' | 'LH'
  /** Force the drawn range so several diagrams line up. */
  span?: [string, string]
  labels?: boolean
  startOctave?: number
}

/**
 * A keyboard with the notes in question marked.
 *
 * Marked keys get a dot rather than a fill: filling them turned a seven-note
 * scale into a solid block and left a marked black key nowhere to go. Where a
 * fingering is given the number sits inside the dot. The first note is the
 * root and takes the accent colour.
 */
export default function Keyboard({ notes, fingers, hand, span, labels = true, startOctave = 4 }: KeyboardProps) {
  const { keys, width, height } = layoutKeyboard(notes, { startOctave, span, fingers })
  const pad = labels ? 18 : 4
  const left = hand ? 26 : 0

  return (
    <svg
      className="keyboard"
      viewBox={`${-left - 1} -1 ${width + left + 2} ${height + pad + 2}`}
      width={width + left + 2}
      height={height + pad + 2}
      role="img"
      aria-label={`Keyboard showing ${notes.join(', ')}${hand ? `, ${hand} fingering` : ''}`}
    >
      {hand && (
        <text x={-left + 2} y={height / 2} className="keyboard-hand" dominantBaseline="middle">
          {hand}
        </text>
      )}

      {keys.map((key) => {
        const marked = key.highlight !== 'none'
        const mark = key.highlight === 'root' ? 'var(--felt)' : 'var(--brass)'
        const r = key.isBlack ? 5 : 7
        const dotY = key.height - (key.isBlack ? 12 : 16)

        return (
          <g key={key.pitch}>
            <rect
              x={key.x}
              y={key.isBlack ? -2 : 0}
              width={key.width}
              height={key.height + (key.isBlack ? 2 : 0)}
              rx={2.5}
              fill={key.isBlack ? 'var(--ink)' : 'var(--surface)'}
              stroke="var(--ink)"
              strokeWidth={0.8}
            />
            {marked && (
              <>
                <circle
                  cx={key.x + key.width / 2}
                  cy={dotY}
                  r={r}
                  fill={mark}
                  stroke={key.isBlack ? 'var(--surface)' : 'none'}
                  strokeWidth={key.isBlack ? 0.9 : 0}
                />
                {key.finger !== undefined && (
                  <text
                    x={key.x + key.width / 2}
                    y={dotY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="keyboard-finger"
                  >
                    {key.finger}
                  </text>
                )}
              </>
            )}
            {labels && marked && (
              <text
                x={key.x + key.width / 2}
                y={height + 13}
                textAnchor="middle"
                className={key.highlight === 'root' ? 'keyboard-label is-root' : 'keyboard-label'}
              >
                {key.name}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
