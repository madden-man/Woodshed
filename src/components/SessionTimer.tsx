import { formatClock } from '../lib/notify'
import { useTimer, type TimerBlock } from '../hooks/timer-context'

interface Props {
  regimen: number
  blocks: TimerBlock[]
}

export default function SessionTimer({ regimen, blocks }: Props) {
  const timer = useTimer()
  const isThis = timer.regimen === regimen && timer.status !== 'idle'

  if (!isThis) {
    return (
      <div className="timer timer-idle">
        <button type="button" className="btn" onClick={() => timer.start(regimen, blocks)}>
          Start session
        </button>
        <p className="timer-hint">
          {formatClock(blocks.reduce((s, b) => s + b.ms, 0))} across five blocks. You’ll get a chime and a
          notification at each hand-off.
          {timer.regimen !== null && timer.regimen !== regimen && (
            <> Regimen {timer.regimen} is running — starting here replaces it.</>
          )}
        </p>
      </div>
    )
  }

  if (timer.status === 'done') {
    return (
      <div className="timer timer-done">
        <div>
          <div className="eyebrow">Session complete</div>
          <div className="timer-block-name">All five blocks timed out</div>
        </div>
        <button type="button" className="btn ghost" onClick={timer.stop}>
          Clear
        </button>
      </div>
    )
  }

  const current = timer.blocks[timer.blockIndex]
  const pct = current ? ((current.ms - timer.remainingMs) / current.ms) * 100 : 0

  return (
    <div className={timer.status === 'paused' ? 'timer is-paused' : 'timer'}>
      <div className="timer-clock">{formatClock(timer.remainingMs)}</div>

      <div className="timer-main">
        <div className="timer-block-name">
          <span className="timer-index">Block {timer.blockIndex + 1}</span>
          {current?.title}
          {timer.status === 'paused' && <span className="timer-paused-tag">paused</span>}
        </div>
        <div className="timer-bar" aria-hidden="true">
          <i style={{ width: `${pct}%` }} />
        </div>
        <div className="timer-total">{formatClock(timer.totalRemainingMs)} left in the session</div>
      </div>

      <div className="timer-controls">
        {timer.status === 'running' ? (
          <button type="button" className="btn ghost" onClick={timer.pause}>
            Pause
          </button>
        ) : (
          <button type="button" className="btn" onClick={timer.resume}>
            Resume
          </button>
        )}
        <button type="button" className="btn ghost" onClick={timer.skip}>
          Next block
        </button>
        <button type="button" className="btn ghost" onClick={timer.stop} aria-label="Stop the timer">
          Stop
        </button>
      </div>

      {timer.permission === 'denied' && (
        <p className="timer-note">
          Notifications are blocked for this site, so hand-offs will chime but won’t raise a system notification.
        </p>
      )}
    </div>
  )
}
