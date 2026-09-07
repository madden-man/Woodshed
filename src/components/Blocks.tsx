import { useEffect, useState } from 'react'
import type { Block, Topic } from '../data/types'
import Keyboard from './Keyboard'
import ListenThenRead from './ListenThenRead'
import { ascend } from '../lib/keyboard'
import { playNotes, playProgression, playRhythm, strikePositions } from '../lib/sound'
import { prime } from '../lib/notify'

/**
 * Renders the block union from a topic. One case per Block kind.
 *
 * `topic` is optional; when a tune page passes it, the "Listen, then read" row
 * is dropped in directly under the changes chart, where the method wants it.
 */
export default function Blocks({ blocks, topic }: { blocks: Block[]; topic?: Topic }) {
  const items: React.ReactNode[] = []
  let i = 0
  while (i < blocks.length) {
    const block = blocks[i]
    // Consecutive keyboard blocks over one span are the voice-leading
    // arrangement the README describes; they get a single control that plays
    // the chords in order, which is the whole lesson of the shells page.
    if (block.kind === 'keyboard' && block.span) {
      const run: Extract<Block, { kind: 'keyboard' }>[] = []
      const span = block.span.join('-')
      while (
        i < blocks.length &&
        blocks[i].kind === 'keyboard' &&
        (blocks[i] as Extract<Block, { kind: 'keyboard' }>).span?.join('-') === span
      ) {
        run.push(blocks[i] as Extract<Block, { kind: 'keyboard' }>)
        i++
      }
      if (run.length > 1) {
        items.push(<KeyboardRun key={`run-${i}`} blocks={run} />)
        continue
      }
      // A lone spanned diagram falls through to the ordinary single renderer.
      items.push(<BlockView key={i - 1} block={run[0]} topic={topic} />)
      continue
    }
    items.push(<BlockView key={i} block={block} topic={topic} />)
    i++
  }
  return <>{items}</>
}

function BlockView({ block, topic }: { block: Block; topic?: Topic }) {
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
          <figcaption>
            {block.label}
            <PlayButton
              label={`Play ${block.label}`}
              onPlay={() => playNotes(ascend(block.notes, block.startOctave))}
            />
          </figcaption>
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
      return (
        <>
          <ChangesChart block={block} />
          {topic && <ListenThenRead topic={topic} />}
        </>
      )
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

  // A steady practice tempo for the loop; the grid is not about speed.
  const BPM = 84
  const [stop, setStop] = useState<(() => void) | null>(null)
  const playing = stop !== null

  // Stop the loop if the grid unmounts while it is running.
  useEffect(() => () => stop?.(), [stop])

  function toggle() {
    if (stop) {
      stop()
      setStop(null)
      return
    }
    void prime()
    const halt = playRhythm({ left: block.left, right: block.right, beats, subdivision: sub, bpm: BPM })
    setStop(() => halt)
  }

  return (
    <figure className="rhythm">
      <figcaption>
        {block.label}
        <PlayButton label={`Play ${block.label}`} playing={playing} onPlay={toggle} />
      </figcaption>
      <div className="rhythm-scroll">
        <div className="rhythm-grid" style={{ gridTemplateColumns: `auto repeat(${cells}, 1fr)` }}>
          {hands.map((hand) => {
            const strikes = new Set(strikePositions(hand.pattern))
            return (
              <div key={hand.name} className="rhythm-row">
                <span className="rhythm-hand">{hand.name}</span>
                {Array.from({ length: cells }, (_, i) => {
                  const hit = strikes.has(i)
                  let cls = 'rhythm-cell'
                  if (hit) cls += ' is-hit'
                  if (i % sub === 0) cls += ' is-beat'
                  return <span key={i} className={cls} aria-label={hit ? 'strike' : 'rest'} />
                })}
              </div>
            )
          })}
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

type KeyboardBlock = Extract<Block, { kind: 'keyboard' }>

/**
 * A run of keyboard diagrams drawn over one span — a voice-led progression. The
 * diagrams draw as usual, and a single control plays the chords in order, so
 * you can hear the guide tone hold and then drop a half step, which the still
 * pictures can only show.
 */
function KeyboardRun({ blocks }: { blocks: KeyboardBlock[] }) {
  const chords = blocks.map((b) => ascend(b.notes, b.startOctave))
  return (
    <div className="keyboard-run">
      <div className="keyboard-run-control">
        <PlayButton label="Play the progression" onPlay={() => playProgression(chords)} />
        <span className="keyboard-run-hint">the chords in order</span>
      </div>
      {blocks.map((block, i) => (
        <figure key={i} className="keyboard-figure">
          <figcaption>
            {block.label}
            <PlayButton
              label={`Play ${block.label}`}
              onPlay={() => playNotes(ascend(block.notes, block.startOctave))}
            />
          </figcaption>
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
      ))}
    </div>
  )
}

/**
 * The play affordance. A speaker glyph that a click sounds; for looping content
 * (a rhythm) it stays pressed and stops on the next click. `prime()` is called
 * from the same gesture so nothing sounds before a click, exactly as the timer.
 */
function PlayButton({ label, onPlay, playing }: { label: string; onPlay: () => void; playing?: boolean }) {
  return (
    <button
      type="button"
      className={playing ? 'play-btn is-playing' : 'play-btn'}
      aria-label={label}
      aria-pressed={playing || undefined}
      onClick={() => {
        void prime()
        onPlay()
      }}
    >
      <span aria-hidden="true">{playing ? '■' : '▶'}</span>
    </button>
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
