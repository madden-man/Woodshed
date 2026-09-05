import { describe, expect, it } from 'vitest'
import { parseTimer, serializeTimer, type PersistedTimer } from './timer-storage'
import { elapsedAt, locate } from './session-clock'

const M = 60_000
const NOW = 1_700_000_000_000

const blocks = [
  { id: 'warmup', title: 'Warm-up', ms: 6 * M },
  { id: 'scales', title: 'Scales & arpeggios', ms: 13 * M },
  { id: 'voicings', title: 'Voicings', ms: 14 * M },
]

const saved: PersistedTimer = {
  regimen: 12,
  blocks,
  clock: { banked: 8 * M, runningSince: null },
  savedAt: NOW - 30_000,
}

const round = (t: PersistedTimer, now = NOW) => parseTimer(serializeTimer(t), now)

describe('round trip', () => {
  it('survives a refresh unchanged', () => {
    expect(round(saved)).toEqual(saved)
  })

  it('keeps a running clock running', () => {
    // runningSince is wall-clock, so time spent reloading still counts.
    const running: PersistedTimer = {
      ...saved,
      clock: { banked: 0, runningSince: NOW - 4 * M },
      savedAt: NOW - 4 * M,
    }
    const back = round(running)!
    expect(back.clock.runningSince).toBe(NOW - 4 * M)
    expect(elapsedAt(back.clock, NOW)).toBe(4 * M)
    expect(locate(back.blocks, elapsedAt(back.clock, NOW)).index).toBe(0)
  })

  it('keeps a paused clock frozen however long the reload took', () => {
    const back = round(saved, NOW + 10 * M)!
    expect(elapsedAt(back.clock, NOW + 10 * M)).toBe(8 * M)
  })

  it('restores the position, not just the numbers', () => {
    const back = round(saved)!
    const where = locate(back.blocks, elapsedAt(back.clock, NOW))
    expect(where.index).toBe(1)
    expect(where.intoBlockMs).toBe(2 * M)
  })
})

describe('what it refuses', () => {
  it('drops yesterday’s session', () => {
    expect(round({ ...saved, savedAt: NOW - 13 * 60 * M })).toBeNull()
  })

  it('keeps one from an hour ago', () => {
    expect(round({ ...saved, savedAt: NOW - 60 * M })).not.toBeNull()
  })

  it('drops a clock saved in the future, which means the machine’s time moved', () => {
    expect(round({ ...saved, savedAt: NOW + 10 * M })).toBeNull()
  })

  it('ignores an empty or absent value', () => {
    expect(parseTimer(null, NOW)).toBeNull()
    expect(parseTimer('', NOW)).toBeNull()
  })

  it('ignores anything that is not the shape it wrote', () => {
    for (const junk of [
      'not json at all',
      'null',
      '42',
      '"a string"',
      '[]',
      '{}',
      JSON.stringify({ ...saved, regimen: 'twelve' }),
      JSON.stringify({ ...saved, regimen: 1.5 }),
      JSON.stringify({ ...saved, blocks: [] }),
      JSON.stringify({ ...saved, blocks: [{ id: 'x', title: 'y' }] }),
      JSON.stringify({ ...saved, blocks: [{ id: 'x', title: 'y', ms: -1 }] }),
      JSON.stringify({ ...saved, clock: { banked: 'lots', runningSince: null } }),
      JSON.stringify({ ...saved, clock: { runningSince: null } }),
      JSON.stringify({ ...saved, clock: { banked: 0, runningSince: 'now' } }),
      JSON.stringify({ ...saved, savedAt: 'recently' }),
    ]) {
      expect(parseTimer(junk, NOW), junk.slice(0, 48)).toBeNull()
    }
  })

  it('accepts a null runningSince, which is just "paused"', () => {
    const back = parseTimer(JSON.stringify({ ...saved, clock: { banked: 0, runningSince: null } }), NOW)
    expect(back?.clock.runningSince).toBeNull()
  })
})
