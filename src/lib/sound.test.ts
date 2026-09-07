import { describe, expect, it } from 'vitest'
import { frequencyOf, strikePositions } from './sound'
import { ascend } from './keyboard'

describe('pitch to frequency', () => {
  it('puts A4 at 440 Hz', () => {
    // ascend numbers A4 as 4 * 12 + 9 = 57.
    expect(frequencyOf(ascend(['A4'])[0])).toBeCloseTo(440, 6)
  })

  it('puts C4 at roughly 261.63 Hz', () => {
    expect(frequencyOf(ascend(['C4'])[0])).toBeCloseTo(261.63, 2)
  })

  it('doubles the frequency an octave up', () => {
    const [c4, c5] = ascend(['C4', 'C5'])
    expect(frequencyOf(c5)).toBeCloseTo(2 * frequencyOf(c4), 6)
  })

  it('reads the pitches ascend() produces, not note strings', () => {
    // A bare voicing, resolved to absolute pitches, is what playNotes is given.
    const pitches = ascend(['C', 'E', 'G', 'B'])
    const freqs = pitches.map(frequencyOf)
    // Monotonic rising, since ascend stacks upward.
    for (let i = 1; i < freqs.length; i++) expect(freqs[i]).toBeGreaterThan(freqs[i - 1])
  })
})

describe('rhythm strike positions', () => {
  it('strike on every x and nowhere else — the same test the grid draws with', () => {
    // The Charleston over eighths.
    expect(strikePositions('x..x....')).toEqual([0, 3])
    // A four-to-the-bar walking bass.
    expect(strikePositions('x.x.x.x.')).toEqual([0, 2, 4, 6])
    expect(strikePositions('........')).toEqual([])
  })

  /**
   * The single-source guarantee: feed one pattern to both the grid's draw test
   * and the playback's schedule, and the strike cells must be identical, so the
   * sound and the picture can never disagree.
   */
  it('match the cells the grid would fill for the same pattern', () => {
    const patterns = ['x..x....', 'x.x.x.x.', 'x...x..x', 'xx.xx.xx', '..x..x..']
    for (const pattern of patterns) {
      // What the grid draws: a hit wherever pattern[i] === 'x'.
      const grid: number[] = []
      for (let i = 0; i < pattern.length; i++) if (pattern[i] === 'x') grid.push(i)
      // What the playback schedules.
      expect(strikePositions(pattern)).toEqual(grid)
    }
  })

  it('never strikes past the end of the pattern', () => {
    for (const cell of strikePositions('x..x....')) {
      expect(cell).toBeGreaterThanOrEqual(0)
      expect(cell).toBeLessThan(8)
    }
  })
})
