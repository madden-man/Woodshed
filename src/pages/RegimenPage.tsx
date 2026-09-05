import { useState } from 'react'
import { buildSession, drillForDay, minutesFor, SESSION_LENGTHS } from '../data/regimen'
import { isoDay, keyForDay, nextKey, KEYS } from '../data/keys'
import { useDayProgress, type SyncState } from '../hooks/useDayProgress'

export default function RegimenPage() {
  const [length, setLength] = useState<number>(60)
  // Read the clock once, on mount, so the session doesn't shift under a re-render.
  const [today] = useState(() => new Date())

  const key = keyForDay(today)
  const date = isoDay(today)
  const blocks = buildSession(key, today.getDay(), drillForDay(today))
  const minutes = minutesFor(blocks, length)

  const { completed, toggle, state, error } = useDayProgress(date, key)
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
          <button key={n} type="button" aria-pressed={n === length} onClick={() => setLength(n)}>
            {n} min
          </button>
        ))}
        <span className="picker-count">
          {completed.length} of {blocks.length} blocks
        </span>
      </div>

      <ol className="session">
        {blocks.map((block, i) => {
          const isDone = completed.includes(block.id)
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
                disabled={state === 'loading'}
                onClick={() => toggle(block.id)}
              >
                ✓
              </button>
            </li>
          )
        })}
      </ol>

      <SyncNotice state={state} error={error} />
    </>
  )
}

const SYNC_LABEL: Record<SyncState, string> = {
  loading: 'Loading today’s progress…',
  saving: 'Saving…',
  synced: 'Saved to tommy-data',
  offline: 'Not saving',
  error: 'Save failed',
}

function SyncNotice({ state, error }: { state: SyncState; error: string | null }) {
  if (state === 'offline') {
    return (
      <aside className="callout">
        <div className="callout-title">Not saving</div>
        <p>
          The practice API isn’t running, so check-offs live in memory and reset on reload. Start the app with{' '}
          <span className="mono">npm start</span> (netlify dev) rather than <span className="mono">npm run dev</span>{' '}
          to connect to Mongo.
        </p>
      </aside>
    )
  }

  if (state === 'error') {
    return (
      <aside className="callout">
        <div className="callout-title">Save failed</div>
        <p>{error ?? 'Something went wrong writing to the database.'} Your check-offs are still on screen.</p>
      </aside>
    )
  }

  return (
    <p className={state === 'synced' ? 'sync-line is-synced' : 'sync-line'}>
      <span className="sync-dot" aria-hidden="true" />
      {SYNC_LABEL[state]}
    </p>
  )
}
