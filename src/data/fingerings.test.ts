import { describe, expect, it } from 'vitest'
import {
  BLACK_KEYS,
  MAJOR_SCALES,
  SCALE_GUIDANCE,
  VOICING_GUIDANCE,
  guidanceFor,
  showsScale,
} from './fingerings'
import { CYCLE_OF_FOURTHS, type KeyName } from './keys'
import { UNITS } from './curriculum'

const PITCH: Record<string, number> = {
  C: 0, 'C♯': 1, 'D♭': 1, D: 2, 'D♯': 3, 'E♭': 3, E: 4, 'F♭': 4,
  F: 5, 'F♯': 6, 'G♭': 6, G: 7, 'G♯': 8, 'A♭': 8, A: 9, 'A♯': 10, 'B♭': 10, B: 11, 'C♭': 11,
}

/** Tone-tone-semitone-tone-tone-tone-semitone. */
const MAJOR_STEPS = [2, 2, 1, 2, 2, 2, 1]

describe('major scale fingerings', () => {
  it('covers all twelve keys', () => {
    expect(Object.keys(MAJOR_SCALES).sort()).toEqual([...CYCLE_OF_FOURTHS].sort())
  })

  describe.each(CYCLE_OF_FOURTHS)('%s major', (key: KeyName) => {
    const scale = MAJOR_SCALES[key]

    it('starts and ends on the tonic', () => {
      expect(scale.notes[0]).toBe(key)
      expect(scale.notes[7]).toBe(key)
    })

    it('spells a major scale', () => {
      for (let i = 0; i < MAJOR_STEPS.length; i++) {
        const from = PITCH[scale.notes[i]]
        const to = PITCH[scale.notes[i + 1]]
        expect((to - from + 12) % 12, `${scale.notes[i]} to ${scale.notes[i + 1]}`).toBe(MAJOR_STEPS[i])
      }
    })

    it('uses one letter name per degree, never repeating', () => {
      const letters = scale.notes.slice(0, 7).map((n) => n[0])
      expect(new Set(letters).size).toBe(7)
    })

    it('gives a finger to every note in both hands', () => {
      expect(scale.rh).toHaveLength(8)
      expect(scale.lh).toHaveLength(8)
    })

    it('uses only real fingers', () => {
      for (const f of [...scale.rh, ...scale.lh]) {
        expect(f).toBeGreaterThanOrEqual(1)
        expect(f).toBeLessThanOrEqual(5)
      }
    })

    it('never moves more than one finger per step except across a thumb crossing', () => {
      for (const hand of [scale.rh, scale.lh]) {
        for (let i = 1; i < hand.length; i++) {
          const step = Math.abs(hand[i] - hand[i - 1])
          // A crossing resets the hand; anything else must be adjacent fingers.
          const crossing = hand[i] === 1 || hand[i - 1] === 1
          if (!crossing) expect(step, `${hand.join('')} at ${i}`).toBe(1)
        }
      }
    })

    it('never puts a thumb on a black key mid-scale', () => {
      // The octave arrival is exempt: the hand leaves the scale there.
      for (const hand of [scale.rh, scale.lh]) {
        for (let i = 0; i < 7; i++) {
          if (hand[i] === 1) expect(BLACK_KEYS.has(scale.notes[i]), `${key}: ${scale.notes[i]}`).toBe(false)
        }
      }
    })

    it('never uses the fifth finger mid-scale in the right hand', () => {
      // RH 5 is the octave arrival only; using it earlier strands the hand.
      expect(scale.rh.slice(0, 7)).not.toContain(5)
    })
  })
})

describe('guidance', () => {
  it('has scale guidance for every unit', () => {
    for (const unit of UNITS) expect(SCALE_GUIDANCE[unit.id], `unit ${unit.id}`).toBeDefined()
  })

  it('has voicing guidance for every unit', () => {
    for (const unit of UNITS) expect(VOICING_GUIDANCE[unit.id], `unit ${unit.id}`).toBeDefined()
  })

  it('says something substantial wherever it says anything', () => {
    for (const set of [...Object.values(SCALE_GUIDANCE), ...Object.values(VOICING_GUIDANCE)]) {
      for (const g of set) {
        expect(g.label.trim()).not.toBe('')
        expect(g.text.length).toBeGreaterThan(40)
      }
    }
  })

  it('offers nothing for blocks where fingering is not the point', () => {
    for (const unit of UNITS) {
      expect(guidanceFor(unit.id, 'tune')).toEqual([])
      expect(guidanceFor(unit.id, 'independence')).toEqual([])
    }
  })

  it('draws the scale only for blocks that play one', () => {
    expect(showsScale('warmup')).toBe(true)
    expect(showsScale('scales')).toBe(true)
    expect(showsScale('voicings')).toBe(false)
    expect(showsScale('tune')).toBe(false)
  })
})
