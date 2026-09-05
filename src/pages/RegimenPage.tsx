import { useState } from 'react'
import { buildSession, drillForDay, minutesFor, SESSION_LENGTHS } from '../data/regimen'
import { keyForDay, nextKey, KEYS } from '../data/keys'

export default function RegimenPage() {
  const [length, setLength] = useState<number>(60)
  const [done, setDone] = useState<Set<string>>(new Set())
  // Read the clock once, on mount, so the session doesn't shift under a re-render.
  const [today] = useState(() => new Date())

  const key = keyForDay(today)
  const blocks = buildSession(key, today.getDay(), drillForDay(today))
  const minutes = minutesFor(blocks, length)

  function toggle(id: string) {
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const info = KEYS[key]

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">
          {today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
        <h1>Today’s session in {key}</h1>
        <p className="lede">
          Five blocks, scaled to the time you have. The ii–V–I of the day is{' '}
          <span className="mono">
            {info.ii} · {info.V} · {info.I}
          </span>
          , resolving into {nextKey(key)} at the end of block three.
        </p>
      </div>

      <div className="length-picker" role="group" aria-label="Session length">
        {SESSION_LENGTHS.map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={n === length}
            onClick={() => setLength(n)}
          >
            {n} min
          </button>
        ))}
        <span className="picker-count">
          {done.size} of {blocks.length} blocks
        </span>
      </div>

      <ol className="session">
        {blocks.map((block, i) => {
          const isDone = done.has(block.id)
          return (
            <li key={block.id} className={isDone ? 'block is-done' : 'block'}>
              <div className="block-gutter">
                <div className="block-num">Block {i + 1}</div>
                <div className="block-min">
                  {minutes[i]}
                  <em>min</em>
                </div>
              </div>
              <div className="block-body">
                <h2>{block.title}</h2>
                <p className="block-lede">{block.lede}</p>
                <ul className="bullets">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="check"
                aria-pressed={isDone}
                aria-label={`Mark ${block.title} complete`}
                onClick={() => toggle(block.id)}
              >
                ✓
              </button>
            </li>
          )
        })}
      </ol>

      <aside className="callout">
        <div className="callout-title">Not saved yet</div>
        <p>
          Check-offs live in component state for now, so they reset on reload. Persistence and a practice history
          are the next pass — the session shape and the block ids in <span className="mono">data/regimen.ts</span>{' '}
          are already stable enough to key a store off.
        </p>
      </aside>
    </>
  )
}
