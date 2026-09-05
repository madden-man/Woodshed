import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRegimen, minutesFor, SESSION_LENGTHS, TOTAL_REGIMENS } from '../data/curriculum'
import { KEYS } from '../data/keys'
import { getTopic } from '../data/theory'
import { useProgress, type SyncState } from '../hooks/progress-context'
import { useTimer } from '../hooks/timer-context'
import SessionTimer from '../components/SessionTimer'

export default function RegimenPage() {
  const params = useParams<{ number?: string }>()
  const { completedBlocks, toggle, current, state, error } = useProgress()
  const timer = useTimer()
  const [length, setLength] = useState<number>(60)

  // No number in the URL means "wherever I left off".
  const number = params.number ? Number(params.number) : current
  if (!Number.isInteger(number) || number < 1 || number > TOTAL_REGIMENS) {
    return (
      <div className="page-head">
        <div className="eyebrow">Not found</div>
        <h1>No regimen {params.number}</h1>
        <p className="lede">
          The curriculum runs 1 to {TOTAL_REGIMENS}. <Link to="/curriculum">See the whole ladder</Link>.
        </p>
      </div>
    )
  }

  const regimen = getRegimen(number)
  const minutes = minutesFor(regimen.blocks, length)
  const done = completedBlocks(number)
  const info = KEYS[regimen.key]
  const timerBlocks = regimen.blocks.map((b, i) => ({ id: b.id, title: b.title, ms: minutes[i] * 60_000 }))
  const timingThis = timer.regimen === number && timer.status !== 'idle'

  return (
    <>
      <div className="page-head">
        <div className="regimen-meta">
          <span className="eyebrow">
            Unit {regimen.unit.id} · {regimen.unit.name}
          </span>
          <span className="level-chip">Level {regimen.level}</span>
        </div>
        <h1>
          <span className="regimen-number">{regimen.number}</span> {regimen.variant.name}
        </h1>
        <p className="lede">{regimen.variant.aim}</p>
      </div>

      <div className="regimen-strip">
        <div>
          <div className="eyebrow">Key</div>
          <div className="strip-key">{regimen.key}</div>
        </div>
        <div className="strip-prog">
          <div className="eyebrow">ii – V – I</div>
          <div className="mono">
            {info.ii} · {info.V} · {info.I}
          </div>
        </div>
        <div className="strip-goal">
          <div className="eyebrow">Unit is aiming at</div>
          <div>{regimen.unit.target}</div>
        </div>
      </div>

      <SessionTimer regimen={number} blocks={timerBlocks} />

      <div className="length-picker" role="group" aria-label="Session length">
        {SESSION_LENGTHS.map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={n === length}
            disabled={timingThis}
            title={timingThis ? 'Stop the timer to change the session length' : undefined}
            onClick={() => setLength(n)}
          >
            {n} min
          </button>
        ))}
        <span className="picker-count">
          {done.length} of {regimen.blocks.length} blocks
        </span>
      </div>

      <ol className="session">
        {regimen.blocks.map((block, i) => {
          const isDone = done.includes(block.id)
          const isActive = timingThis && timer.blockIndex === i
          let cls = 'block'
          if (isDone) cls += ' is-done'
          if (isActive) cls += ' is-active'
          return (
            <li key={block.id} className={cls}>
              <div className="block-gutter">
                <div className="block-num">Block {i + 1}</div>
                <div className="block-min">
                  {minutes[i]}
                  <em>min</em>
                </div>
              </div>
              <div className="block-body">
                <h2>{block.title}</h2>
                {block.purpose && <p className="block-purpose">{block.purpose}</p>}
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
                onClick={() => toggle(number, block.id)}
              >
                ✓
              </button>
            </li>
          )
        })}
      </ol>

      <nav className="regimen-nav">
        {number > 1 ? (
          <Link to={`/regimen/${number - 1}`} className="nav-prev">
            ← {getRegimen(number - 1).number}. {getRegimen(number - 1).variant.name}
          </Link>
        ) : (
          <span />
        )}
        {number < TOTAL_REGIMENS ? (
          <Link to={`/regimen/${number + 1}`} className="nav-next">
            {getRegimen(number + 1).number}. {getRegimen(number + 1).variant.name} →
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <section className="reading">
        <h2 className="section-head">What this unit reads on</h2>
        <div className="related-links">
          {regimen.unit.wiki.map((slug) => {
            const topic = getTopic(slug)
            return topic ? (
              <Link key={slug} to={`/wiki/${slug}`}>
                {topic.title}
              </Link>
            ) : null
          })}
        </div>
      </section>

      <SyncNotice state={state} error={error} />
    </>
  )
}

const SYNC_LABEL: Record<SyncState, string> = {
  loading: 'Loading your progress…',
  saving: 'Saving…',
  synced: 'Saved to piano-progress',
  offline: 'Not saving',
  error: 'Save failed',
}

function SyncNotice({ state, error }: { state: SyncState; error: string | null }) {
  if (state === 'offline') {
    return (
      <aside className="callout">
        <div className="callout-title">Not saving</div>
        <p>
          The practice API isn’t running, so check-offs reset on reload. Start the app with{' '}
          <span className="mono">npm start</span> rather than <span className="mono">npm run dev</span> to connect
          to Mongo.
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
