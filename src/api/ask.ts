import { ApiUnavailable } from './progress'
import type { AskEvent, ChatTurn } from '../lib/ask-protocol'

/**
 * Ask the assistant. Text arrives through `onText` as it streams; the promise
 * settles when the answer is complete, or rejects with the function's error.
 */
export async function ask(
  turns: ChatTurn[],
  topic: string | undefined,
  onText: (text: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  let res: Response
  try {
    res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ turns, topic }),
      signal,
    })
  } catch (error) {
    if ((error as Error).name === 'AbortError') throw error
    throw new ApiUnavailable()
  }
  // Plain `vite` has no functions: the SPA fallback answers with HTML.
  const type = res.headers.get('content-type') ?? ''
  if (res.status === 404 || type.includes('text/html')) throw new ApiUnavailable()
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(body?.error ?? `Request failed (${res.status})`)
  }
  if (!res.body) throw new Error('No answer came back.')

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  for (;;) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    let nl: number
    while ((nl = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, nl).trim()
      buffer = buffer.slice(nl + 1)
      if (line) handle(JSON.parse(line) as AskEvent, onText)
    }
  }
  if (buffer.trim()) handle(JSON.parse(buffer) as AskEvent, onText)
}

function handle(event: AskEvent, onText: (text: string) => void) {
  if ('text' in event) onText(event.text)
  else if ('error' in event) throw new Error(event.error)
}
