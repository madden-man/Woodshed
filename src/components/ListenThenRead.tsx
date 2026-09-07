import type { Topic } from '../data/types'

/**
 * The "Listen, then read" row: the recordings and lead-sheet citation a tune
 * page carries. The method puts listening first — two listens before you touch
 * the keys — so this renders above the wiki reading links on the tune block and
 * in the session bar, and under the changes chart on the tune's own page.
 *
 * These are the app's first outbound links. They open in a new tab: a session
 * in progress has a timer running, and a full page unload is exactly what the
 * sticky bar exists to survive but has no reason to invite.
 */
export default function ListenThenRead({ topic, variant = 'page' }: { topic: Topic; variant?: 'page' | 'bar' }) {
  const { listening, leadSheet } = topic
  if (!listening?.length && !leadSheet) return null

  return (
    <div className={variant === 'bar' ? 'listen-read is-bar' : 'listen-read'}>
      <div className="listen-read-label">Listen, then read</div>

      {listening && listening.length > 0 && (
        <ul className="listen-list">
          {listening.map((rec, i) => (
            <li key={i}>
              {rec.url ? (
                <a href={rec.url} target="_blank" rel="noreferrer noopener">
                  {rec.artist} — <span className="listen-album">{rec.album}</span>
                </a>
              ) : (
                <>
                  {rec.artist} — <span className="listen-album">{rec.album}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {leadSheet && (
        <p className="lead-sheet">
          <span className="lead-sheet-label">Lead sheet</span>
          {leadSheet.url ? (
            <a href={leadSheet.url} target="_blank" rel="noreferrer noopener">
              {leadSheet.source}
            </a>
          ) : (
            leadSheet.source
          )}
        </p>
      )}
    </div>
  )
}
