import { describe, expect, it } from 'vitest'
import {
  elapsedAt,
  locate,
  offsetOf,
  pauseAt,
  resumeAt,
  skipAt,
  totalOf,
  type ClockBlock,
  type ClockState,
} from './session-clock'

const M = 60_000

/** A 60-minute session split the way minutesFor() splits it. */
const blocks: ClockBlock[] = [
  { id: 'warmup', title: 'Warm-up', ms: 6 * M },
  { id: 'scales', title: 'Scales & arpeggios', ms: 13 * M },
  { id: 'voicings', title: 'Voicings', ms: 14 * M },
  { id: 'independence', title: 'Hand independence', ms: 11 * M },
  { id: 'tune', title: 'The tune', ms: 16 * M },
]

describe('locate', () => {
  it('totals the blocks', () => {
    expect(totalOf(blocks)).toBe(60 * M)
  })

  it('puts the boundary at the start of the next block, not the end of the last', () => {
    expect(locate(blocks, 6 * M - 1).index).toBe(0)
    expect(locate(blocks, 6 * M).index).toBe(1)
  })

  it('reports remaining and elapsed within the block', () => {
    expect(locate(blocks, 4 * M)).toEqual({ index: 0, remainingMs: 2 * M, intoBlockMs: 4 * M })
    expect(locate(blocks, 8 * M)).toEqual({ index: 1, remainingMs: 11 * M, intoBlockMs: 2 * M })
  })

  it('runs off the end once the session is over', () => {
    expect(locate(blocks, 60 * M).index).toBe(blocks.length)
    expect(locate(blocks, 99 * M).remainingMs).toBe(0)
  })

  it('offsets to the start of each block', () => {
    expect(offsetOf(blocks, 0)).toBe(0)
    expect(offsetOf(blocks, 2)).toBe(19 * M)
    expect(offsetOf(blocks, blocks.length)).toBe(60 * M)
  })
})

describe('pause and resume', () => {
  it('continues from where it stopped rather than restarting', () => {
    let t = 1_000_000
    let s: ClockState = { banked: 0, runningSince: t }

    t += 4 * M
    s = pauseAt(s, t)
    expect(s).toEqual({ banked: 4 * M, runningSince: null })

    // Half an hour goes by while paused.
    t += 30 * M
    expect(elapsedAt(s, t)).toBe(4 * M)
    expect(locate(blocks, elapsedAt(s, t)).remainingMs).toBe(2 * M)

    s = resumeAt(s, t)
    expect(elapsedAt(s, t)).toBe(4 * M)
    expect(locate(blocks, elapsedAt(s, t)).index).toBe(0)

    t += 1 * M
    expect(elapsedAt(s, t)).toBe(5 * M)
    expect(locate(blocks, elapsedAt(s, t)).remainingMs).toBe(1 * M)
  })

  it('neither loses nor doubles time across repeated cycles', () => {
    let t = 500_000
    let s: ClockState = { banked: 0, runningSince: t }
    for (let i = 0; i < 5; i++) {
      t += 2 * M
      s = pauseAt(s, t)
      t += 7 * M // paused, should not count
      s = resumeAt(s, t)
    }
    t += 1 * M
    expect(elapsedAt(s, t)).toBe(11 * M)
  })

  it('is idempotent — a second pause or resume changes nothing', () => {
    const t = 900_000
    const running: ClockState = { banked: 3 * M, runningSince: t }
    const paused = pauseAt(running, t + M)
    expect(pauseAt(paused, t + 10 * M)).toEqual(paused)
    expect(resumeAt(running, t + 10 * M)).toEqual(running)
  })

  it('freezes the clock while paused', () => {
    const s: ClockState = { banked: 7 * M, runningSince: null }
    expect(elapsedAt(s, 0)).toBe(7 * M)
    expect(elapsedAt(s, 10 ** 12)).toBe(7 * M)
  })

  it('never runs backwards if the clock reading precedes the segment start', () => {
    const s: ClockState = { banked: 2 * M, runningSince: 1000 }
    expect(elapsedAt(s, 500)).toBe(2 * M)
  })
})

describe('skip', () => {
  const t = 42_000

  it('jumps to the start of the next block', () => {
    expect(skipAt(blocks, { banked: 2 * M, runningSince: null }, t).banked).toBe(6 * M)
    expect(skipAt(blocks, { banked: 6 * M, runningSince: null }, t).banked).toBe(19 * M)
  })

  it('keeps running when running and paused when paused', () => {
    expect(skipAt(blocks, { banked: 2 * M, runningSince: t }, t).runningSince).toBe(t)
    expect(skipAt(blocks, { banked: 2 * M, runningSince: null }, t).runningSince).toBeNull()
  })

  it('clamps to the end of the session on the last block', () => {
    expect(skipAt(blocks, { banked: 59 * M, runningSince: null }, t).banked).toBe(60 * M)
    expect(skipAt(blocks, { banked: 60 * M, runningSince: null }, t).banked).toBe(60 * M)
  })

  it('walks every block in five skips', () => {
    let s: ClockState = { banked: 0, runningSince: null }
    const seen = [locate(blocks, s.banked).index]
    for (let i = 0; i < blocks.length; i++) {
      s = skipAt(blocks, s, t)
      seen.push(locate(blocks, s.banked).index)
    }
    expect(seen).toEqual([0, 1, 2, 3, 4, 5])
  })
})
