import { describe, expect, it } from 'vitest'
import { CYCLE_OF_FOURTHS, KEYS, UPPER_STRUCTURE_FUNCTIONS, nextKey } from './keys'

const PITCH: Record<string, number> = {
  C: 0, 'C♯': 1, 'D♭': 1, D: 2, 'D♯': 3, 'E♭': 3, E: 4, 'F♭': 4,
  F: 5, 'F♯': 6, 'G♭': 6, G: 7, 'G♯': 8, 'A♭': 8, A: 9, 'A♯': 10, 'B♭': 10, B: 11, 'C♭': 11,
}

/** The root of a chord symbol: a letter plus an optional accidental. */
function rootOf(chord: string): number {
  const accidental = chord[1] === '♯' || chord[1] === '♭' ? chord.slice(0, 2) : chord[0]
  const pc = PITCH[accidental]
  if (pc === undefined) throw new Error(`unparseable root in "${chord}"`)
  return pc
}

const semitonesAbove = (root: number, interval: number) => (root + interval) % 12

describe('the cycle of fourths', () => {
  it('has all twelve keys, each a fourth above the last', () => {
    expect(CYCLE_OF_FOURTHS).toHaveLength(12)
    expect(new Set(CYCLE_OF_FOURTHS).size).toBe(12)
    for (let i = 0; i < 12; i++) {
      const here = PITCH[CYCLE_OF_FOURTHS[i]]
      const next = PITCH[CYCLE_OF_FOURTHS[(i + 1) % 12]]
      expect(next).toBe(semitonesAbove(here, 5))
    }
  })

  it('wraps at the end', () => {
    expect(nextKey('G')).toBe('C')
    expect(nextKey('C')).toBe('F')
  })
})

describe.each(CYCLE_OF_FOURTHS)('key of %s', (key) => {
  const info = KEYS[key]
  const tonic = PITCH[key]

  it('has a ii a whole step up, a V a fifth up, and a I on the tonic', () => {
    expect(rootOf(info.ii)).toBe(semitonesAbove(tonic, 2))
    expect(rootOf(info.V)).toBe(semitonesAbove(tonic, 7))
    expect(rootOf(info.I)).toBe(tonic)
  })

  it('has a minor ii–V–i on the same roots', () => {
    expect(rootOf(info.halfDim)).toBe(semitonesAbove(tonic, 2))
    expect(rootOf(info.altered)).toBe(semitonesAbove(tonic, 7))
    expect(rootOf(info.minorI)).toBe(tonic)
  })

  it('spells the chord qualities the progression needs', () => {
    expect(info.ii).toMatch(/m7$/)
    expect(info.V).toMatch(/7$/)
    expect(info.I).toMatch(/maj7$/)
    expect(info.halfDim).toMatch(/m7♭5$/)
    expect(info.altered).toMatch(/7alt$/)
    expect(info.minorI).toMatch(/m6\/9$/)
  })

  // ♭II, VI, ♭VI, II above the dominant's root — 1, 9, 8 and 2 semitones.
  it.each([
    [0, 1],
    [1, 9],
    [2, 8],
    [3, 2],
  ])('upper structure %i is %i semitones above the V', (slot, interval) => {
    const v = rootOf(info.V)
    expect(rootOf(info.upperStructures[slot])).toBe(semitonesAbove(v, interval))
  })

  it('lists four distinct upper structures', () => {
    expect(info.upperStructures).toHaveLength(4)
    expect(new Set(info.upperStructures.map(rootOf)).size).toBe(4)
  })
})

describe('upper structure functions', () => {
  it('describes the four slots in the order the key table stores them', () => {
    expect(UPPER_STRUCTURE_FUNCTIONS.map((u) => u.degree)).toEqual(['♭II', 'VI', '♭VI', 'II'])
  })
})
