import { describe, expect, it } from 'vitest'
import { ascend, isBlackKey, layoutKeyboard, KEY_W, PITCH_CLASS } from './keyboard'

describe('ascending layout', () => {
  it('places a scale one octave apart, end to end', () => {
    const p = ascend(['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'])
    expect(p[7] - p[0]).toBe(12)
    expect(p).toEqual([...p].sort((a, b) => a - b))
  })

  it('stacks a voicing upward, so D–F–C puts the C above', () => {
    const [d, f, c] = ascend(['D', 'F', 'C'])
    expect(f - d).toBe(3) // minor 3rd
    expect(c - f).toBe(7) // fifth
    expect(c - d).toBe(10) // the whole shape is a minor 7th
  })

  it('spreads the wide stacking to a 10th', () => {
    const [d, , f] = ascend(['D', 'C', 'F'])
    expect(f - d).toBe(15)
  })

  it('always ascends, whatever order the names arrive in', () => {
    for (const notes of [
      ['B', 'F'],
      ['C', 'E', 'B'],
      ['G', 'B', 'F'],
      ['F', 'A', 'C', 'E'],
      ['A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F', 'G', 'A♭'],
    ]) {
      const p = ascend(notes)
      for (let i = 1; i < p.length; i++) expect(p[i], notes.join(' ')).toBeGreaterThan(p[i - 1])
    }
  })

  it('refuses a note it cannot spell', () => {
    expect(() => ascend(['H'])).toThrow(/unknown note/)
  })

  it('knows which spellings are black keys', () => {
    for (const n of ['C♯', 'D♭', 'E♭', 'F♯', 'G♭', 'A♭', 'B♭']) expect(isBlackKey(n), n).toBe(true)
    for (const n of ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C♭', 'F♭']) expect(isBlackKey(n), n).toBe(false)
  })
})

describe('drawing', () => {
  const scale = layoutKeyboard(['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'])

  it('draws every key in the range, white and black', () => {
    // C to C is 13 semitones inclusive: 8 white, 5 black.
    expect(scale.keys.filter((k) => !k.isBlack)).toHaveLength(8)
    expect(scale.keys.filter((k) => k.isBlack)).toHaveLength(5)
  })

  it('marks exactly the notes it was given', () => {
    const lit = scale.keys.filter((k) => k.highlight !== 'none')
    expect(lit).toHaveLength(8)
    expect(lit.every((k) => !k.isBlack)).toBe(true)
  })

  it('marks the first note as the root and the rest as ordinary', () => {
    const root = scale.keys.filter((k) => k.highlight === 'root')
    expect(root).toHaveLength(1)
    expect(root[0].pitch).toBe(Math.min(...scale.keys.filter((k) => k.highlight !== 'none').map((k) => k.pitch)))
  })

  it('lays white keys out edge to edge with no gaps or overlaps', () => {
    const whites = scale.keys.filter((k) => !k.isBlack).sort((a, b) => a.x - b.x)
    whites.forEach((k, i) => expect(k.x).toBe(i * KEY_W))
    expect(scale.width).toBe(whites.length * KEY_W)
  })

  it('keeps every black key inside the drawing and over a join', () => {
    for (const black of scale.keys.filter((k) => k.isBlack)) {
      expect(black.x, `${black.name} runs off the left`).toBeGreaterThan(0)
      expect(black.x + black.width, `${black.name} runs off the right`).toBeLessThan(scale.width)
      expect(black.height).toBeLessThan(scale.height)
    }
  })

  it('opens on a white key, never half a black one', () => {
    for (const notes of [['E', 'G', 'B'], ['F♯', 'A'], ['B♭', 'D', 'F'], ['A♭', 'C']]) {
      const { keys } = layoutKeyboard(notes)
      const first = keys.reduce((a, b) => (b.pitch < a.pitch ? b : a))
      expect(first.isBlack, notes.join(' ')).toBe(false)
    }
  })

  it('wastes no room to the left of the lowest note', () => {
    // The old version always began at the C below, which threw away most of an
    // octave whenever the lowest note was near the top of one.
    const { keys, width } = layoutKeyboard(['B', 'F', 'A♭', 'C', 'E♭'])
    const first = keys.reduce((a, b) => (b.pitch < a.pitch ? b : a))
    expect(first.pitch % 12).toBe(11) // starts on the B itself
    expect(width).toBeLessThan(22 * 13)
  })

  it('finishes on a white key', () => {
    for (const notes of [['C', 'E♭'], ['G', 'B♭'], ['A♭']]) {
      const { keys } = layoutKeyboard(notes)
      const last = keys.reduce((a, b) => (b.pitch > a.pitch ? b : a))
      expect(last.isBlack, notes.join(' ')).toBe(false)
    }
  })

  it('draws white keys before black ones so the blacks sit on top', () => {
    const firstBlack = scale.keys.findIndex((k) => k.isBlack)
    const lastWhite = scale.keys.map((k) => k.isBlack).lastIndexOf(false)
    expect(lastWhite).toBeLessThan(firstBlack)
  })

  it('shows the caller’s spelling on lit keys, and a plain letter elsewhere', () => {
    const { keys } = layoutKeyboard(['D♭', 'F', 'A♭'])
    const lit = keys.filter((k) => k.highlight !== 'none')
    expect(lit.map((k) => k.name).sort()).toEqual(['A♭', 'D♭', 'F'])
    for (const dark of keys.filter((k) => k.highlight === 'none' && !k.isBlack)) {
      expect(dark.name).toMatch(/^[A-G]$/)
    }
  })

  it('grows wide enough for a two-octave stack', () => {
    const wide = layoutKeyboard(['C', 'E', 'G', 'B', 'D', 'F', 'A'])
    const span = Math.max(...wide.keys.map((k) => k.pitch)) - Math.min(...wide.keys.map((k) => k.pitch))
    expect(span).toBeGreaterThan(12)
    expect(wide.width).toBeGreaterThan(scale.width)
  })
})

describe('pitch spellings', () => {
  it('maps enharmonics to the same key', () => {
    expect(PITCH_CLASS['C♯']).toBe(PITCH_CLASS['D♭'])
    expect(PITCH_CLASS['C♭']).toBe(PITCH_CLASS.B)
    expect(PITCH_CLASS['F♭']).toBe(PITCH_CLASS.E)
  })
})
