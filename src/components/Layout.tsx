import { NavLink, Outlet } from 'react-router-dom'
import { CATEGORIES } from '../data/types'
import { TOPICS } from '../data/theory'
import { TOTAL_REGIMENS } from '../data/curriculum'
import { useProgress } from '../hooks/progress-context'
import { useTimer } from '../hooks/timer-context'
import { formatClock } from '../lib/notify'

export default function Layout() {
  const { current, finishedCount } = useProgress()
  const timer = useTimer()

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
          {timer.regimen !== null && timer.status !== 'idle' ? (
            <NavLink
              to={`/regimen/${timer.regimen}`}
              className={timer.status === 'paused' ? 'timer-chip is-paused' : 'timer-chip'}
            >
              <span className="timer-chip-clock">
                {timer.status === 'done' ? 'done' : formatClock(timer.remainingMs)}
              </span>
              <span className="timer-chip-block">
                {timer.status === 'done'
                  ? `Regimen ${timer.regimen}`
                  : (timer.blocks[timer.blockIndex]?.title ?? '')}
              </span>
            </NavLink>
          ) : (
            <span className="key-chip" title={`${finishedCount} of ${TOTAL_REGIMENS} sessions finished`}>
              {finishedCount}/{TOTAL_REGIMENS}
            </span>
          )}
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
