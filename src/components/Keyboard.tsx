import { layoutKeyboard } from '../lib/keyboard'

interface Props {
  /** Note names in playing order; laid out ascending, each above the last. */
  notes: string[]
  /** Print the note name under each marked key. */
  labels?: boolean
  startOctave?: number
}

/**
 * A small keyboard with the notes in question marked.
 *
 * Marked keys get a dot rather than a fill. Filling them meant a seven-note
 * scale turned the whole drawing into a solid block, and a marked black key
 * had nowhere to go — a dot reads on both, and the thing still looks like a
 * keyboard. The first note is the root and takes the accent colour.
 */
export default function Keyboard({ notes, labels = true, startOctave = 4 }: Props) {
  const { keys, width, height } = layoutKeyboard(notes, startOctave)
  const pad = labels ? 18 : 4

  return (
    <svg
      className="keyboard"
      viewBox={`-1 -1 ${width + 2} ${height + pad + 2}`}
      width={width + 2}
      height={height + pad + 2}
      role="img"
      aria-label={`Keyboard showing ${notes.join(', ')}`}
    >
      {keys.map((key) => {
        const marked = key.highlight !== 'none'
        const mark = key.highlight === 'root' ? 'var(--felt)' : 'var(--brass)'
        const dotY = key.height - (key.isBlack ? 11 : 15)

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
              <circle
                cx={key.x + key.width / 2}
                cy={dotY}
                r={key.isBlack ? 4.4 : 6}
                fill={mark}
                stroke={key.isBlack ? 'var(--surface)' : 'none'}
                strokeWidth={key.isBlack ? 0.9 : 0}
              />
            )}
            {labels && marked && !key.isBlack && (
              <text
                x={key.x + key.width / 2}
                y={height + 13}
                textAnchor="middle"
                className={key.highlight === 'root' ? 'keyboard-label is-root' : 'keyboard-label'}
              >
                {key.name}
              </text>
            )}
            {labels && marked && key.isBlack && (
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
