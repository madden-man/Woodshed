import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatClock } from '../lib/notify'
import { getRegimen } from '../data/curriculum'
import { useTimer } from '../hooks/timer-context'

/**
 * Sticky under the masthead for the whole session, on every page. Carries the
 * controls, so pausing never means navigating back to the session — and the
 * full instructions for the block you're on, so you don't have to either.
 */
export default function SessionBar() {
  const timer = useTimer()
  if (timer.status === 'idle' || timer.regimen === null) return null

  const regimen = getRegimen(timer.regimen)

  if (timer.status === 'done') {
    return (
      <div className="session-bar is-done">
        <div className="bar-block">
          <span className="bar-step">Complete</span>
          <span className="bar-title">All five blocks timed out</span>
        </div>
        <div className="bar-spacer" />
        <div className="bar-controls">
          <Link to={`/regimen/${timer.regimen}`} className="btn ghost">
            Regimen {timer.regimen}
          </Link>
          <button type="button" className="btn" onClick={timer.stop}>
            Clear
          </button>
        </div>
      </div>
    )
  }

  const paused = timer.status === 'paused'
  const block = timer.block
  const detail = regimen.blocks[timer.blockIndex]
  const pct = block ? (timer.intoBlockMs / block.ms) * 100 : 0

  return (
    <div className={paused ? 'session-bar is-paused' : 'session-bar'}>
      <div className="bar-head">
        <div className="bar-block">
          <span className="bar-step">
            Block {timer.blockIndex + 1} of {timer.blocks.length}
          </span>
          <span className="bar-title">{block?.title}</span>
          <span className="bar-next">
            {timer.nextBlock ? `then ${timer.nextBlock.title}` : 'last block'}
          </span>
        </div>

        <div className="bar-progress">
          <div className="bar-track" aria-hidden="true">
            <i style={{ width: `${pct}%` }} />
          </div>
          <div className="bar-meta">
            <span>
              {formatClock(timer.remainingMs)} left
              {block && ` of ${Math.round(block.ms / 60_000)} min`}
            </span>
            <span>
              {formatClock(timer.totalRemainingMs)} left in the session
              {timer.permission === 'denied' && ' · chime only'}
            </span>
          </div>
        </div>

        <div className="bar-clock" aria-live="polite">
          {formatClock(timer.remainingMs)}
          {paused && <em>paused</em>}
        </div>

        <div className="bar-controls">
          {paused ? (
            <button type="button" className="btn" onClick={timer.resume}>
              Resume
            </button>
          ) : (
            <button type="button" className="btn ghost" onClick={timer.pause}>
              Pause
            </button>
          )}
          <button type="button" className="btn ghost" onClick={timer.skip}>
            Next
          </button>
          <button type="button" className="btn ghost" onClick={timer.stop}>
            Stop
          </button>
        </div>
      </div>

      {/* Keyed on the block, so a hand-off remounts this open with the new work. */}
      {detail && (
        <BlockDetail
          key={timer.blockIndex}
          purpose={detail.purpose}
          items={detail.items}
          context={`Regimen ${regimen.number} · ${regimen.unit.name} · ${regimen.variant.name} · key of ${regimen.key}`}
          target={regimen.unit.target}
          regimen={regimen.number}
        />
      )}
    </div>
  )
}

interface DetailProps {
  purpose: string
  items: string[]
  context: string
  target: string
  regimen: number
}

function BlockDetail({ purpose, items, context, target, regimen }: DetailProps) {
  // Remounting on each hand-off resets this to open, so new work is never hidden.
  const [open, setOpen] = useState(true)

  return (
    <div className="bar-detail">
      <button
        type="button"
        className="bar-detail-toggle"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="bar-detail-context">{context}</span>
        <span className="bar-detail-caret">{open ? 'Hide' : 'What to do'}</span>
      </button>

      {open && (
        <div className="bar-detail-body">
          <p className="bar-purpose">{purpose}</p>
          <ul className="bar-items">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="bar-target">
            <span className="bar-target-label">Unit is aiming at</span> {target}{' '}
            <Link to={`/regimen/${regimen}`}>Full session →</Link>
          </p>
        </div>
      )}
    </div>
  )
}
