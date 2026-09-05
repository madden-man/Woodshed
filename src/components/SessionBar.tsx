import { Link } from 'react-router-dom'
import { formatClock } from '../lib/notify'
import { useTimer } from '../hooks/timer-context'

/**
 * Sticky under the masthead for the whole session, on every page. It carries
 * the controls too, so pausing never means navigating back to the session.
 */
export default function SessionBar() {
  const timer = useTimer()
  if (timer.status === 'idle' || timer.regimen === null) return null

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
  const pct = block ? (timer.intoBlockMs / block.ms) * 100 : 0

  return (
    <div className={paused ? 'session-bar is-paused' : 'session-bar'}>
      {/* keyed on the block so each hand-off re-runs the highlight */}
      <div className="bar-block" key={timer.blockIndex}>
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
            {formatClock(timer.remainingMs)} left in this block
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
  )
}
