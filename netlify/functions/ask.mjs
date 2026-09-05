import Anthropic from '@anthropic-ai/sdk'
import { wikiToText } from '../../src/data/wiki-text.ts'
import { getTopic } from '../../src/data/theory.ts'
import { validateTopic, validateTurns } from '../../src/lib/ask-protocol.ts'

/**
 * POST /api/ask  { turns: [{ role, content }], topic?: slug }
 *
 * Streams an answer about the wiki as NDJSON: {text} lines as they arrive,
 * then {done: true}, or {error} if something went wrong mid-stream.
 *
 * The whole wiki rides along as a cached system prompt. It is a fixed string
 * for the life of a deploy, so every question after the first is served from
 * the prompt cache; only the conversation itself is new tokens.
 */

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-5'

const PERSONA = `You are the teacher behind The Woodshed, a jazz piano wiki and practice curriculum for players between level 4 and level 6. The whole wiki and the curriculum are below. Answer questions about them, explain the material, and help the reader practise.

How to answer:
- Ground answers in the wiki. When a page covers the question, say what it says and link to it as [Page title](/wiki/slug). Link at most two or three pages per answer.
- Follow the wiki's house style: never leave a number unexplained. If you write 1-3-7 or ♭9, say what it means and spell the notes in a real key, preferably the key the reader is asking about.
- Be concrete. Name notes, chords, bars and fingers. Prefer one worked example over a general rule.
- Keep it short. A few sentences for a simple question; a short list for a comparison; never more than a few paragraphs. Do not open with a summary of the question or close with an offer.
- If the question goes beyond the wiki, say so in a sentence and answer from your own knowledge of jazz piano.
- If the wiki and standard practice disagree, explain the wiki's reasoning (its pages usually give it) rather than overriding it.
- Answer in the same register as the wiki: plain, direct, second person. Markdown is fine: bold, lists, and links. No headings unless the answer genuinely has sections.`

let client
function getClient() {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY is not set')
  if (!client) client = new Anthropic()
  return client
}

/** Built once per cold start; identical on every request so the cache prefix holds. */
let cachedSystem
function systemBlocks(topic) {
  if (!cachedSystem) {
    cachedSystem = {
      type: 'text',
      text: `${PERSONA}\n\n=== THE WIKI ===\n\n${wikiToText()}`,
      cache_control: { type: 'ephemeral', ttl: '1h' },
    }
  }
  const blocks = [cachedSystem]
  const page = topic ? getTopic(topic) : undefined
  if (page) {
    blocks.push({
      type: 'text',
      text: `The reader is currently on the page "${page.title}" (/wiki/${page.slug}). Assume questions without a subject are about that page.`,
    })
  }
  return blocks
}

export default async (req) => {
  if (req.method !== 'POST') return Response.json({ error: 'method not allowed' }, { status: 405 })

  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'body must be JSON' }, { status: 400 })
  }
  const checked = validateTurns(body?.turns)
  if ('error' in checked) return Response.json({ error: checked.error }, { status: 400 })
  const topic = validateTopic(body?.topic)

  let anthropic
  try {
    anthropic = getClient()
  } catch (error) {
    console.error('[ask]', error)
    return Response.json({ error: error.message }, { status: 500 })
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event) => controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`))
      try {
        const run = anthropic.beta.messages.stream({
          model: MODEL,
          max_tokens: 8000,
          system: systemBlocks(topic),
          messages: checked.turns,
          output_config: { effort: 'medium' },
          // If the model declines for a safety reason, let the API retry the
          // same request on a fallback model rather than returning nothing.
          betas: ['server-side-fallback-2026-07-01'],
          fallbacks: 'default',
        })
        run.on('text', (text) => send({ text }))
        const final = await run.finalMessage()
        if (final.stop_reason === 'refusal') {
          send({ error: 'The assistant declined to answer that one.' })
        } else if (final.stop_reason === 'max_tokens') {
          send({ error: 'The answer ran too long and was cut off. Ask for the rest.' })
        }
        console.log(
          `[ask] ${final.usage.input_tokens} in, ${final.usage.cache_read_input_tokens ?? 0} cached, ${final.usage.output_tokens} out`,
        )
        send({ done: true })
      } catch (error) {
        console.error('[ask]', error)
        send({ error: describe(error) })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}

function describe(error) {
  if (error instanceof Anthropic.AuthenticationError) return 'The Anthropic API key was rejected.'
  if (error instanceof Anthropic.RateLimitError) return 'Rate limited by the Anthropic API. Try again in a moment.'
  if (error instanceof Anthropic.BadRequestError) return `The request was refused: ${error.message}`
  if (error instanceof Anthropic.APIError) return `Anthropic API error ${error.status}: ${error.message}`
  if (error instanceof Anthropic.APIConnectionError) return 'Could not reach the Anthropic API.'
  return error?.message ?? 'Something went wrong.'
}

export const config = { path: '/api/ask' }
