import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { CATEGORIES } from '../data/types'
import { TOPICS } from '../data/theory'
import { TOTAL_REGIMENS } from '../data/curriculum'
import { useProgress } from '../hooks/progress-context'
import { useScrollToTop } from '../hooks/scroll-to-top'
import SessionBar from './SessionBar'

export default function Layout() {
  const { current, finishedCount } = useProgress()
  useScrollToTop()
  // Narrow screens fold the wiki index behind this; the toggle is display:none
  // on the desktop grid, where the sidebar is always shown.
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="shell">
      <header className="masthead">
        <NavLink to="/" className="brand">
          <span className="brand-eyebrow">Jazz piano · level 4 → 6</span>
          <span className="brand-name">The Woodshed</span>
        </NavLink>
        <nav className="top-nav">
          <NavLink to="/keys">Keys</NavLink>
          <NavLink to="/curriculum">Curriculum</NavLink>
          <NavLink to="/regimen" end>
            Session {current}
          </NavLink>
          <span className="key-chip" title={`${finishedCount} of ${TOTAL_REGIMENS} sessions finished`}>
            {finishedCount}/{TOTAL_REGIMENS}
          </span>
        </nav>
      </header>

      <SessionBar />

      <div className="body">
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={navOpen}
          aria-controls="wiki-nav"
          onClick={() => setNavOpen((open) => !open)}
        >
          <span>Wiki topics</span>
          <span className="nav-toggle-mark" aria-hidden="true">
            {navOpen ? 'Close' : `${TOPICS.length} pages`}
          </span>
        </button>

        <aside
          id="wiki-nav"
          className={navOpen ? 'sidebar is-open' : 'sidebar'}
          // Following a link closes the drawer, so you land on the page rather
          // than on the list you just left.
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('a')) setNavOpen(false)
          }}
        >
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
