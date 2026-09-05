import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { TOPICS } from '../data/theory'
import { CATEGORIES } from '../data/types'
import { CYCLE_OF_FOURTHS, keyForDay } from '../data/keys'

export default function Home() {
  const [query, setQuery] = useState('')
  const key = keyForDay()

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
          A working reference for the material between level 4 and level 6: scales, voicings, and the technique
          that carries them. The daily regimen draws from these pages.
        </p>
      </div>

      <div className="today-strip">
        <div>
          <div className="eyebrow">Key of the day</div>
          <div className="today-key">{key}</div>
        </div>
        <div className="ring" aria-hidden="true">
          {CYCLE_OF_FOURTHS.map((k) => (
            <span key={k} className={k === key ? 'on' : undefined}>
              {k}
            </span>
          ))}
        </div>
        <Link to="/regimen" className="button">
          Today’s session
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
