import { NavLink, Outlet } from 'react-router-dom'
import { CATEGORIES } from '../data/types'
import { TOPICS } from '../data/theory'
import { keyForDay } from '../data/keys'

export default function Layout() {
  const key = keyForDay()

  return (
    <div className="shell">
      <header className="masthead">
        <NavLink to="/" className="brand">
          <span className="brand-eyebrow">Jazz piano · level 4 → 6</span>
          <span className="brand-name">The Woodshed</span>
        </NavLink>
        <nav className="top-nav">
          <NavLink to="/keys">Keys</NavLink>
          <NavLink to="/regimen">Daily regimen</NavLink>
          <span className="key-chip" title="Key of the day, cycle of fourths">
            {key}
          </span>
        </nav>
      </header>

      <div className="body">
        <aside className="sidebar">
          {CATEGORIES.map((cat) => {
            const topics = TOPICS.filter((t) => t.category === cat)
            if (topics.length === 0) return null
            return (
              <div key={cat} className="nav-group">
                <div className="nav-heading">{cat}</div>
                <ul>
                  {topics.map((t) => (
                    <li key={t.slug}>
                      <NavLink to={`/wiki/${t.slug}`}>{t.title}</NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </aside>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
