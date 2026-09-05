import { describe, expect, it } from 'vitest'
import { MAX_TURN_CHARS, MAX_TURNS, validateTopic, validateTurns } from './ask-protocol'

describe('validateTurns', () => {
  it('accepts a question, and a conversation that alternates and ends on one', () => {
    expect(validateTurns([{ role: 'user', content: ' hi ' }])).toEqual({ turns: [{ role: 'user', content: 'hi' }] })
    const r = validateTurns([
      { role: 'user', content: 'a' },
      { role: 'assistant', content: 'b' },
      { role: 'user', content: 'c' },
    ])
    expect('turns' in r && r.turns.length).toBe(3)
  })

  it('refuses anything that is not a list of turns', () => {
    for (const bad of [null, 'x', {}, [], [null], [{ role: 'user' }], [{ role: 'x', content: 'y' }], [{ content: 'y' }]]) {
      expect('error' in validateTurns(bad), JSON.stringify(bad)).toBe(true)
    }
  })

  it('requires the turns to alternate, starting and ending with the user', () => {
    expect(validateTurns([{ role: 'assistant', content: 'a' }])).toHaveProperty('error')
    expect(validateTurns([{ role: 'user', content: 'a' }, { role: 'user', content: 'b' }])).toHaveProperty('error')
    expect(validateTurns([{ role: 'user', content: 'a' }, { role: 'assistant', content: 'b' }])).toHaveProperty('error')
  })

  it('caps the length of a turn and of the conversation', () => {
    expect(validateTurns([{ role: 'user', content: 'x'.repeat(MAX_TURN_CHARS + 1) }])).toHaveProperty('error')
    const long = Array.from({ length: MAX_TURNS + 2 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: 'x' }))
    expect(validateTurns(long)).toHaveProperty('error')
  })
})

describe('validateTopic', () => {
  it('keeps a slug and drops anything else', () => {
    expect(validateTopic('shell-voicings')).toBe('shell-voicings')
    expect(validateTopic('../etc')).toBeUndefined()
    expect(validateTopic(3)).toBeUndefined()
    expect(validateTopic(undefined)).toBeUndefined()
  })
})
