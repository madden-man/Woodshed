import { Link } from 'react-router-dom'
import { UNITS, VARIANTS, TOTAL_REGIMENS, getRegimen } from '../data/curriculum'
import { getTopic } from '../data/theory'
import { useProgress } from '../hooks/progress-context'

export default function CurriculumPage() {
  const { isComplete, completedBlocks, current, finishedCount } = useProgress()
  const pct = Math.round((finishedCount / TOTAL_REGIMENS) * 100)

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">The ladder</div>
        <h1>One hundred sessions, level 4 to 6</h1>
        <p className="lede">
          Ten units of ten, in order. Each unit introduces one body of material and walks the same ten-step arc —
          introduce, hands together, rearrange, first tempo pass, push, apply, transpose, combine, speed,
          consolidate. Work them in sequence; there is no calendar, only the next one.
        </p>
      </div>

      <div className="ladder-summary">
        <div>
          <div className="eyebrow">Finished</div>
          <div className="summary-figure">
            {finishedCount}
            <em>/ {TOTAL_REGIMENS}</em>
          </div>
        </div>
        <div className="summary-bar" aria-hidden="true">
          <i style={{ width: `${pct}%` }} />
        </div>
        <Link to={`/regimen/${current}`} className="button">
          Resume at {current}
        </Link>
      </div>

      <section className="arc-legend">
        <h2 className="section-head">The ten-step arc</h2>
        <ol className="arc-steps">
          {VARIANTS.map((v) => (
            <li key={v.name}>
              <span className="arc-name">{v.name}</span>
              <span className="arc-aim">{v.aim}</span>
            </li>
          ))}
        </ol>
      </section>

      {UNITS.map((unit) => {
        const numbers = Array.from({ length: VARIANTS.length }, (_, i) => (unit.id - 1) * VARIANTS.length + i + 1)
        const doneInUnit = numbers.filter(isComplete).length

        return (
          <section key={unit.id} className="unit">
            <div className="unit-head">
              <div>
                <div className="eyebrow">
                  Unit {unit.id} · Level {unit.level} · sessions {numbers[0]}–{numbers[numbers.length - 1]}
                </div>
                <h2>{unit.name}</h2>
                <p className="unit-goal">{unit.goal}</p>
              </div>
              <div className={doneInUnit === numbers.length ? 'unit-count is-done' : 'unit-count'}>
                {doneInUnit}/{numbers.length}
              </div>
            </div>

            <div className="related-links unit-reading">
              {unit.wiki.map((slug) => {
                const topic = getTopic(slug)
                return topic ? (
                  <Link key={slug} to={`/wiki/${slug}`}>
                    {topic.title}
                  </Link>
                ) : null
              })}
            </div>

            <ol className="ladder">
              {numbers.map((n) => {
                const regimen = getRegimen(n)
                const complete = isComplete(n)
                const started = !complete && completedBlocks(n).length > 0
                const isCurrent = n === current

                let cls = 'rung'
                if (complete) cls += ' is-complete'
                else if (started) cls += ' is-started'
                if (isCurrent) cls += ' is-current'

                return (
                  <li key={n} className={cls}>
                    <Link to={`/regimen/${n}`}>
                      <span className="rung-num">{n}</span>
                      <span className="rung-name">{regimen.variant.name}</span>
                      <span className="rung-key">{regimen.key}</span>
                      <span className="rung-state">
                        {complete ? '✓' : started ? `${completedBlocks(n).length}/5` : ''}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}
    </>
  )
}
