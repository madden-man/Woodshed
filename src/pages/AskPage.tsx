import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ask } from '../api/ask'
import { ApiUnavailable } from '../api/progress'
import { getTopic } from '../data/theory'
import type { ChatTurn } from '../lib/ask-protocol'
import { MAX_TURN_CHARS, MAX_TURNS } from '../lib/ask-protocol'
import Markdown from '../components/Markdown'

const STORAGE_KEY = 'woodshed-ask'

const STARTERS = [
  'Why does this wiki stack shells 1-3-7 when most books say 1-7-3?',
  'What do I play over the G7 in Solar, and why?',
  'What is the difference between the altered scale and lydian dominant?',
  'I have fifteen minutes today. What should I practise in unit 5?',
  'Explain the Charleston drill as if I had never heard of it.',
]

interface Draft {
  turns: ChatTurn[]
  /** The answer currently streaming in, or the one that failed. */
  pending?: { text: string; error?: string }
}

function load(): ChatTurn[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as ChatTurn[]) : []
  } catch {
    return []
  }
}

function save(turns: ChatTurn[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(turns))
  } catch {
    // Storage is a convenience; losing it changes nothing.
  }
}

export default function AskPage() {
  const [params] = useSearchParams()
  const topic = params.get('topic') ?? undefined
  const page = topic ? getTopic(topic) : undefined

  const [draft, setDraft] = useState<Draft>(() => ({ turns: load() }))
  const [question, setQuestion] = useState('')
  const [unavailable, setUnavailable] = useState(false)
  const abort = useRef<AbortController | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  const busy = draft.pending !== undefined && draft.pending.error === undefined

  useEffect(() => () => abort.current?.abort(), [])
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [draft])

  async function send(text: string) {
    const content = text.trim()
    if (!content || busy) return
    const turns: ChatTurn[] = [...draft.turns, { role: 'user', content }]
    setQuestion('')
    setDraft({ turns, pending: { text: '' } })

    const controller = new AbortController()
    abort.current = controller
    let answer = ''
    try {
      await ask(
        turns,
        topic,
        (chunk) => {
          answer += chunk
          setDraft({ turns, pending: { text: answer } })
        },
        controller.signal,
      )
      const done: ChatTurn[] = [...turns, { role: 'assistant', content: answer }]
      save(done)
      setDraft({ turns: done })
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        // Keep whatever arrived, as an answer, so the conversation stays well formed.
        const done: ChatTurn[] = answer ? [...turns, { role: 'assistant', content: answer }] : draft.turns
        save(done)
        setDraft({ turns: done })
        return
      }
      if (error instanceof ApiUnavailable) setUnavailable(true)
      setDraft({ turns, pending: { text: answer, error: (error as Error).message } })
    } finally {
      abort.current = null
    }
  }

  function retry() {
    const turns = draft.turns
    const last = turns[turns.length - 1]
    if (!last || last.role !== 'user') return
    setDraft({ turns: turns.slice(0, -1) })
    void send(last.content)
  }

  function clear() {
    abort.current?.abort()
    save([])
    setDraft({ turns: [] })
  }

  const full = draft.turns.length >= MAX_TURNS - 1

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Ask</div>
        <h1>Ask the teacher</h1>
        <p className="lede">
          A question about anything on this wiki, or about the session in front of you. The answers come from the wiki’s
          own pages, and link to them.
        </p>
      </div>

      {page && (
        <div className="ask-context">
          Asking about <Link to={`/wiki/${page.slug}`}>{page.title}</Link>
          <Link to="/ask" className="ask-context-clear">
            any page
          </Link>
        </div>
      )}

      {unavailable && (
        <aside className="callout">
          <div className="callout-title">Not available here</div>
          <p>
            The assistant runs as a Netlify function, so it needs <span className="mono">npm start</span> rather than{' '}
            <span className="mono">npm run dev</span>, and an <span className="mono">ANTHROPIC_API_KEY</span> on the
            site.
          </p>
        </aside>
      )}

      <section className="chat" aria-live="polite">
        {draft.turns.length === 0 && !draft.pending && (
          <div className="chat-empty">
            <div className="eyebrow">Try one of these</div>
            <ul className="chat-starters">
              {STARTERS.map((s) => (
                <li key={s}>
                  <button type="button" onClick={() => void send(s)}>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {draft.turns.map((t, i) => (
          <div key={i} className={`chat-turn is-${t.role}`}>
            <div className="chat-who">{t.role === 'user' ? 'You' : 'Teacher'}</div>
            {t.role === 'user' ? <p>{t.content}</p> : <Markdown text={t.content} />}
          </div>
        ))}

        {draft.pending && (
          <div className="chat-turn is-assistant is-pending">
            <div className="chat-who">Teacher</div>
            {draft.pending.text ? <Markdown text={draft.pending.text} /> : !draft.pending.error && <p className="chat-thinking">Thinking…</p>}
            {draft.pending.error && (
              <div className="chat-error">
                <span>{draft.pending.error}</span>
                <button type="button" onClick={retry}>
                  Try again
                </button>
              </div>
            )}
          </div>
        )}
        <div ref={endRef} />
      </section>

      <form
        className="ask-form"
        onSubmit={(e) => {
          e.preventDefault()
          void send(question)
        }}
      >
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value.slice(0, MAX_TURN_CHARS))}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              void send(question)
            }
          }}
          placeholder={full ? 'This conversation is full — start a new one.' : 'Ask something… (Enter to send, Shift+Enter for a new line)'}
          rows={2}
          disabled={busy || full}
          aria-label="Your question"
        />
        <div className="ask-actions">
          {busy ? (
            <button type="button" className="button" onClick={() => abort.current?.abort()}>
              Stop
            </button>
          ) : (
            <button type="submit" className="button" disabled={!question.trim() || full}>
              Ask
            </button>
          )}
          {(draft.turns.length > 0 || draft.pending) && (
            <button type="button" className="ask-clear" onClick={clear}>
              New conversation
            </button>
          )}
        </div>
      </form>
    </>
  )
}
