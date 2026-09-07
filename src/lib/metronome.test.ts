import { describe, expect, it } from 'vitest'
import {
  beatClicks,
  beatDuration,
  clampBpm,
  isAccent,
  ticksIn,
  ticksInBar,
  MAX_BPM,
  MIN_BPM,
  type MetronomeSpec,
} from './metronome'

const allFour: MetronomeSpec = { bpm: 120, beatsPerBar: 4, mode: 'all' }
const backbeat: MetronomeSpec = { bpm: 120, beatsPerBar: 4, mode: 'backbeat' }

describe('beat duration', () => {
  it('is one second at 60 bpm and half at 120', () => {
    expect(beatDuration(60)).toBe(1)
    expect(beatDuration(120)).toBe(0.5)
  })
})

describe('a bar of ticks', () => {
  it('clicks every beat in "all" mode', () => {
    const ticks = ticksInBar(allFour)
    expect(ticks.map((t) => t.beat)).toEqual([1, 2, 3, 4])
  })

  it('clicks only 2 and 4 in backbeat mode', () => {
    const ticks = ticksInBar(backbeat)
    expect(ticks.map((t) => t.beat)).toEqual([2, 4])
  })

  it('accents 2 and 4 in both modes', () => {
    for (const t of ticksInBar(allFour)) expect(t.accent).toBe(t.beat === 2 || t.beat === 4)
    for (const t of ticksInBar(backbeat)) expect(t.accent).toBe(true)
  })

  it('places the ticks at the beat times', () => {
    // 120 bpm: half a second a beat.
    expect(ticksInBar(allFour).map((t) => t.time)).toEqual([0, 0.5, 1, 1.5])
    expect(ticksInBar(backbeat).map((t) => t.time)).toEqual([0.5, 1.5])
  })

  it('respects a three-four bar', () => {
    const waltz: MetronomeSpec = { bpm: 90, beatsPerBar: 3, mode: 'all' }
    expect(ticksInBar(waltz).map((t) => t.beat)).toEqual([1, 2, 3])
    // Only 2 accents; there is no 4 in a bar of 3.
    expect(ticksInBar(waltz).filter((t) => t.accent).map((t) => t.beat)).toEqual([2])
  })
})

describe('windowed queries', () => {
  const step = beatDuration(120) // 0.5s

  it('are half-open, so a boundary tick belongs to exactly one window', () => {
    // The tick at t=0.5 is the "until" of the first window and the "from" of the next.
    const first = ticksIn(allFour, 0, step)
    const second = ticksIn(allFour, step, 2 * step)
    expect(first.map((t) => t.time)).toEqual([0])
    expect(second.map((t) => t.time)).toEqual([step])
  })

  it('never emits a tick twice when stepped across a bar', () => {
    const bar = 4 * step
    const seen: number[] = []
    for (let w = 0; w < bar; w += step) {
      for (const t of ticksIn(allFour, w, w + step)) seen.push(t.time)
    }
    expect(seen).toEqual([0, 0.5, 1, 1.5])
    expect(new Set(seen).size).toBe(seen.length)
  })

  it('tiles a two-bar span exactly once whatever the window size', () => {
    const twoBars = 8 * step
    const collect = (win: number) => {
      const times: number[] = []
      for (let w = 0; w < twoBars; w += win) {
        for (const t of ticksIn(backbeat, w, Math.min(w + win, twoBars))) times.push(t.time)
      }
      return times
    }
    // Backbeat over two bars: 2, 4, 6, 8 beats -> 0.5, 1.5, 2.5, 3.5s.
    const expected = [0.5, 1.5, 2.5, 3.5]
    expect(collect(step / 3)).toEqual(expected)
    expect(collect(step)).toEqual(expected)
    expect(collect(2.7 * step)).toEqual(expected)
  })

  it('starts a window part-way through a beat without dropping the next tick', () => {
    // From just after beat 1 up to just after beat 3, in "all" mode.
    const ticks = ticksIn(allFour, 0.01, 1.01)
    expect(ticks.map((t) => t.time)).toEqual([0.5, 1])
  })

  it('returns nothing for an empty or inverted window', () => {
    expect(ticksIn(allFour, 1, 1)).toEqual([])
    expect(ticksIn(allFour, 2, 1)).toEqual([])
  })

  it('keeps the tick count honest across a long run', () => {
    // Ten bars in "all" mode is forty ticks; in backbeat, twenty.
    const tenBars = 40 * step
    expect(ticksIn(allFour, 0, tenBars)).toHaveLength(40)
    expect(ticksIn(backbeat, 0, tenBars)).toHaveLength(20)
  })
})

describe('helpers', () => {
  it('marks 2 and 4 as the accents', () => {
    expect([1, 2, 3, 4].map(isAccent)).toEqual([false, true, false, true])
  })

  it('clicks every beat only in "all" mode', () => {
    expect([1, 2, 3, 4].map((b) => beatClicks(b, 'all'))).toEqual([true, true, true, true])
    expect([1, 2, 3, 4].map((b) => beatClicks(b, 'backbeat'))).toEqual([false, true, false, true])
  })

  it('clamps a bpm into the usable range', () => {
    expect(clampBpm(120)).toBe(120)
    expect(clampBpm(0)).toBe(MIN_BPM)
    expect(clampBpm(9999)).toBe(MAX_BPM)
    expect(clampBpm(Number.NaN)).toBe(MIN_BPM)
    expect(clampBpm(88.4)).toBe(88)
  })
})
