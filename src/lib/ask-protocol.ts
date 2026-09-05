/**
 * The wire format between the chat page and /api/ask, and the checks the
 * function runs before anything reaches the model. Pure, so both sides can
 * share it and the checks can be tested.
 */

export interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

export interface AskRequest {
  turns: ChatTurn[]
  /** Slug of the page the reader is on, if any. */
  topic?: string
}

/** One line of the NDJSON stream the function answers with. */
export type AskEvent = { text: string } | { error: string } | { done: true }

export const MAX_TURNS = 40
export const MAX_TURN_CHARS = 4000

/** Returns the turns if they are usable, otherwise a message saying why not. */
export function validateTurns(input: unknown): { turns: ChatTurn[] } | { error: string } {
  if (!Array.isArray(input)) return { error: 'turns must be an array' }
  if (input.length === 0) return { error: 'turns is empty' }
  if (input.length > MAX_TURNS) return { error: `at most ${MAX_TURNS} turns per conversation` }

  const turns: ChatTurn[] = []
  for (const [i, raw] of input.entries()) {
    if (typeof raw !== 'object' || raw === null) return { error: `turn ${i} is not an object` }
    const { role, content } = raw as { role?: unknown; content?: unknown }
    if (role !== 'user' && role !== 'assistant') return { error: `turn ${i} has no role` }
    if (typeof content !== 'string' || content.trim() === '') return { error: `turn ${i} is empty` }
    if (content.length > MAX_TURN_CHARS) return { error: `turn ${i} is over ${MAX_TURN_CHARS} characters` }
    const expected = i % 2 === 0 ? 'user' : 'assistant'
    if (role !== expected) return { error: `turn ${i} should be from the ${expected}` }
    turns.push({ role, content: content.trim() })
  }
  if (turns[turns.length - 1].role !== 'user') return { error: 'the last turn must be a question' }
  return { turns }
}

export function validateTopic(input: unknown): string | undefined {
  if (typeof input !== 'string') return undefined
  return /^[a-z0-9-]{1,80}$/.test(input) ? input : undefined
}
