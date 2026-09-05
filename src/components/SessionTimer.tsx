import { formatClock } from '../lib/notify'
import { useTimer, type TimerBlock } from '../hooks/timer-context'

interface Props {
  regimen: number
  blocks: TimerBlock[]
}

/**
 * The start affordance on a session page. Once running, the sticky
 * <SessionBar /> carries the clock and the controls, so this steps aside
 * rather than showing a second set of them.
 */
export default function SessionTimer({ regimen, blocks }: Props) {
  const timer = useTimer()
  if (timer.regimen === regimen && timer.status !== 'idle') return null

  const total = blocks.reduce((s, b) => s + b.ms, 0)
  const elsewhere = timer.regimen !== null && timer.regimen !== regimen

  return (
    <div className="timer-idle">
      <button type="button" className="btn" onClick={() => timer.start(regimen, blocks)}>
        Start session
      </button>
      <p className="timer-hint">
        {formatClock(total)} across {blocks.length} blocks — {blocks.map((b) => Math.round(b.ms / 60_000)).join(' · ')} min.
        You’ll get a chime and a notification at each hand-off, and the controls stay pinned to the top of every
        page. To pick up mid-session, use <span className="mono">Start here</span> on any block below instead.
        {elsewhere && <> Regimen {timer.regimen} is still running — starting here replaces it.</>}
      </p>
    </div>
  )
}
