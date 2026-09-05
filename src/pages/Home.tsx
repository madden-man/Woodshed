import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { TOPICS } from '../data/theory'
import { CATEGORIES } from '../data/types'
import { getRegimen, TOTAL_REGIMENS } from '../data/curriculum'
import { useProgress } from '../hooks/progress-context'

export default function Home() {
  const [query, setQuery] = useState('')
  const { current, finishedCount } = useProgress()
  const next = getRegimen(current)
  const pct = Math.round((finishedCount / TOTAL_REGIMENS) * 100)

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return TOPICS
    return TOPICS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <>
      <div className="page-head">
        <h1>Music theory, one key at a time</h1>
        <p className="lede">
          A working reference for the material between level 4 and level 6, and a hundred sessions that walk you
          through it in order.
        </p>
      </div>

      <Link to={`/regimen/${current}`} className="up-next">
        <div className="up-next-main">
          <div className="eyebrow">Up next · session {current}</div>
          <div className="up-next-title">
            {next.unit.name} · {next.variant.name}
          </div>
          <div className="up-next-aim">{next.variant.aim}</div>
        </div>
        <div className="up-next-side">
          <div className="up-next-key">{next.key}</div>
          <div className="up-next-level">Level {next.level}</div>
        </div>
      </Link>

      <div className="home-progress">
        <div className="summary-bar" aria-hidden="true">
          <i style={{ width: `${pct}%` }} />
        </div>
        <Link to="/curriculum" className="home-progress-link">
          {finishedCount} of {TOTAL_REGIMENS} sessions finished — see the whole ladder
        </Link>
      </div>

      <input
        className="search"
        type="search"
        value={query}
        placeholder="Filter topics — try “altered”, “voicing”, “tempo”"
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Filter topics"
      />

      {CATEGORIES.map((cat) => {
        const topics = matches.filter((t) => t.category === cat)
        if (topics.length === 0) return null
        return (
          <section key={cat}>
            <h2 className="section-head">{cat}</h2>
            <ul className="topic-list">
              {topics.map((t) => (
                <li key={t.slug}>
                  <Link to={`/wiki/${t.slug}`}>
                    <span className="topic-title">{t.title}</span>
                    <span className="topic-summary">{t.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}

      {matches.length === 0 && <p className="empty">No topic matches “{query}”.</p>}
    </>
  )
}
