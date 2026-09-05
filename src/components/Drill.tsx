import type { DrillSpec } from '../data/curriculum'

/**
 * An independence drill laid out by hand. A rhythm on its own leaves you
 * guessing what to play, so each hand gets its own line and the notes come
 * before the timing.
 */
export default function Drill({ drill, variant = 'page' }: { drill: DrillSpec; variant?: 'page' | 'bar' }) {
  return (
    <div className={variant === 'bar' ? 'drill-card is-bar' : 'drill-card'}>
      <div className="drill-name">{drill.name}</div>

      <dl className="drill-hands">
        <div className="drill-hand">
          <dt>Left hand</dt>
          <dd>{drill.leftHand}</dd>
        </div>
        <div className="drill-hand">
          <dt>Right hand</dt>
          <dd>{drill.rightHand}</dd>
        </div>
        <div className="drill-hand">
          <dt>How they line up</dt>
          <dd>{drill.rhythm}</dd>
        </div>
        <div className="drill-hand">
          <dt>Over</dt>
          <dd>{drill.over}</dd>
        </div>
      </dl>

      <p className="drill-watch">
        <span className="drill-watch-label">Watch for</span>
        {drill.watchFor}
      </p>
    </div>
  )
}
