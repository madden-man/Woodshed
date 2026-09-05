import type { Block } from '../data/types'
import Keyboard from './Keyboard'

/** Renders the block union from a topic. One case per Block kind. */
export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'prose':
      return <p className="prose">{block.text}</p>

    case 'list':
      return block.ordered ? (
        <ol className="steps">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="bullets">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )

    case 'progression':
      return (
        <figure className="progression">
          {block.label && <figcaption>{block.label}</figcaption>}
          <div className="chords">
            {block.chords.map((chord, i) => (
              <span key={i}>
                <span className={i === block.highlight ? 'chord is-v' : 'chord'}>{chord}</span>
                {i < block.chords.length - 1 && <span className="arrow">→</span>}
              </span>
            ))}
          </div>
          {block.note && <p className="note">{block.note}</p>}
        </figure>
      )

    case 'table':
      return (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={j === 0 ? 'lead-cell' : undefined}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'callout':
      return (
        <aside className="callout">
          <div className="callout-title">{block.title}</div>
          <p>{block.text}</p>
        </aside>
      )

    case 'keyboard':
      return (
        <figure className="keyboard-figure">
          <figcaption>{block.label}</figcaption>
          <div className="keyboard-scroll">
            <Keyboard
              notes={block.notes}
              fingers={block.fingers}
              hand={block.hand}
              span={block.span}
              startOctave={block.startOctave}
            />
          </div>
          {block.note && <p className="note">{block.note}</p>}
        </figure>
      )

    case 'worked':
      return (
        <figure className="worked">
          <figcaption>{block.label}</figcaption>
          <div className="worked-rows">
            {block.rows.map((row, i) => (
              <div key={i} className="worked-row">
                <span className="worked-symbol">{row.symbol}</span>
                <span className="worked-means">{row.means}</span>
                <span className="worked-gives">{row.gives}</span>
              </div>
            ))}
          </div>
          {block.note && <p className="note">{block.note}</p>}
        </figure>
      )

    case 'rhythm':
      return <RhythmGrid block={block} />

    case 'changes':
      return <ChangesChart block={block} />
  }
}

type RhythmBlock = Extract<Block, { kind: 'rhythm' }>
type ChangesBlock = Extract<Block, { kind: 'changes' }>

/** Which cells begin a beat, so the grid can rule them off. */
function RhythmGrid({ block }: { block: RhythmBlock }) {
  const beats = block.beats ?? 4
  const sub = block.subdivision ?? 2
  const cells = beats * sub
  const hands: { name: string; pattern: string }[] = []
  if (block.right) hands.push({ name: 'RH', pattern: block.right })
  if (block.left) hands.push({ name: 'LH', pattern: block.left })

  return (
    <figure className="rhythm">
      <figcaption>{block.label}</figcaption>
      <div className="rhythm-scroll">
        <div className="rhythm-grid" style={{ gridTemplateColumns: `auto repeat(${cells}, 1fr)` }}>
          {hands.map((hand) => (
            <div key={hand.name} className="rhythm-row">
              <span className="rhythm-hand">{hand.name}</span>
              {Array.from({ length: cells }, (_, i) => {
                const hit = hand.pattern[i] === 'x'
                let cls = 'rhythm-cell'
                if (hit) cls += ' is-hit'
                if (i % sub === 0) cls += ' is-beat'
                return <span key={i} className={cls} aria-label={hit ? 'strike' : 'rest'} />
              })}
            </div>
          ))}
          <div className="rhythm-row rhythm-counts">
            <span className="rhythm-hand" />
            {Array.from({ length: cells }, (_, i) => (
              <span key={i} className={i % sub === 0 ? 'rhythm-count is-beat' : 'rhythm-count'}>
                {countFor(i, sub)}
              </span>
            ))}
          </div>
        </div>
      </div>
      {block.note && <p className="note">{block.note}</p>}
    </figure>
  )
}

/** "1 & 2 &" for eighths, "1 & a" for triplets, "1 e & a" for sixteenths. */
function countFor(cell: number, sub: number): string {
  const beat = Math.floor(cell / sub) + 1
  const within = cell % sub
  if (within === 0) return String(beat)
  if (sub === 2) return '&'
  if (sub === 3) return within === 1 ? '&' : 'a'
  return ['', 'e', '&', 'a'][within]
}

function ChangesChart({ block }: { block: ChangesBlock }) {
  const perLine = block.perLine ?? 4
  const startsSection = new Map((block.sections ?? []).map((s) => [s.at, s.name]))
  const lines: { bar: number; chords: string }[][] = []
  block.bars.forEach((chords, i) => {
    if (i % perLine === 0) lines.push([])
    lines[lines.length - 1].push({ bar: i + 1, chords })
  })

  return (
    <figure className="changes">
      <figcaption>{block.label}</figcaption>
      <div className="changes-scroll">
        {lines.map((line, i) => {
          const section = startsSection.get(line[0].bar)
          return (
            <div key={i} className="changes-line">
              <span className="changes-section">{section ?? ''}</span>
              {line.map(({ bar, chords }) => (
                <span key={bar} className="changes-bar">
                  <span className="changes-num">{bar}</span>
                  {chords.split(' ').map((c, j) => (
                    <span key={j} className="changes-chord">
                      {c}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          )
        })}
      </div>
      {block.note && <p className="note">{block.note}</p>}
    </figure>
  )
}
