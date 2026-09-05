import { describe, expect, it } from 'vitest'
import {
  allRegimens,
  getRegimen,
  minutesFor,
  BLOCK_PURPOSE,
  MIN_BLOCK_MINUTES,
  SESSION_LENGTHS,
  TOTAL_REGIMENS,
  UNITS,
  VARIANTS,
} from './curriculum'
import { CYCLE_OF_FOURTHS } from './keys'
import { TOPICS } from './theory'

const all = allRegimens()

describe('the ladder', () => {
  it('is a hundred sessions, ten units of ten', () => {
    expect(UNITS).toHaveLength(10)
    expect(VARIANTS).toHaveLength(10)
    expect(TOTAL_REGIMENS).toBe(100)
    expect(all).toHaveLength(100)
  })

  it('numbers them 1 to 100 in order', () => {
    expect(all.map((r) => r.number)).toEqual(Array.from({ length: 100 }, (_, i) => i + 1))
  })

  it('runs level 4.0 to 6.0', () => {
    expect(all[0].level).toBe('4.0')
    expect(all[99].level).toBe('6.0')
    const levels = all.map((r) => Number(r.level))
    expect(levels.every((l, i) => i === 0 || l >= levels[i - 1])).toBe(true)
  })

  it('changes unit every ten sessions', () => {
    expect(getRegimen(10).unit.id).toBe(1)
    expect(getRegimen(11).unit.id).toBe(2)
    expect(getRegimen(100).unit.id).toBe(10)
  })

  it('walks the same ten-step arc inside every unit', () => {
    for (const unit of UNITS) {
      const start = (unit.id - 1) * 10 + 1
      const names = Array.from({ length: 10 }, (_, i) => getRegimen(start + i).variant.name)
      expect(names).toEqual(VARIANTS.map((v) => v.name))
    }
  })

  it('advances one step around the cycle of fourths per session', () => {
    for (const r of all) {
      expect(r.key).toBe(CYCLE_OF_FOURTHS[(r.number - 1) % 12])
    }
  })

  it('gives every key eight or nine sessions', () => {
    const counts = new Map<string, number>()
    for (const r of all) counts.set(r.key, (counts.get(r.key) ?? 0) + 1)
    expect(counts.size).toBe(12)
    for (const n of counts.values()) expect(n).toBeGreaterThanOrEqual(8)
    for (const n of counts.values()) expect(n).toBeLessThanOrEqual(9)
  })

  it('clamps out-of-range requests to the ends', () => {
    expect(getRegimen(0).number).toBe(1)
    expect(getRegimen(-5).number).toBe(1)
    expect(getRegimen(101).number).toBe(100)
    expect(getRegimen(7.9).number).toBe(7)
  })
})

describe('every session', () => {
  it('has five blocks in a stable order', () => {
    for (const r of all) {
      expect(r.blocks.map((b) => b.id)).toEqual(['warmup', 'scales', 'voicings', 'independence', 'tune'])
    }
  })

  it('states what each block is for', () => {
    for (const r of all) {
      for (const b of r.blocks) {
        expect(b.purpose).toBe(BLOCK_PURPOSE[b.id])
        expect(b.purpose.length).toBeGreaterThan(30)
      }
    }
  })

  it('has non-empty instructions with nothing unsubstituted', () => {
    for (const r of all) {
      for (const b of r.blocks) {
        expect(b.items.length).toBeGreaterThan(0)
        for (const item of b.items) {
          expect(item.trim()).not.toBe('')
          expect(item).not.toMatch(/undefined|NaN|\$\{/)
        }
      }
    }
  })

  it('names its own key in the material', () => {
    for (const r of all) {
      const text = r.blocks.flatMap((b) => b.items).join(' ')
      expect(text).toContain(r.key)
    }
  })
})

describe('session length', () => {
  it('offers short sessions and caps at forty-five minutes', () => {
    expect(Math.min(...SESSION_LENGTHS)).toBe(15)
    expect(Math.max(...SESSION_LENGTHS)).toBe(45)
    expect([...SESSION_LENGTHS]).toEqual([...SESSION_LENGTHS].sort((a, b) => a - b))
  })

  it.each(SESSION_LENGTHS)('splits %i minutes across the blocks exactly', (total) => {
    for (const r of all) {
      const mins = minutesFor(r.blocks, total)
      expect(mins).toHaveLength(5)
      expect(mins.reduce((a, b) => a + b, 0)).toBe(total)
    }
  })

  it.each(SESSION_LENGTHS)('gives every block something usable at %i minutes', (total) => {
    for (const r of all) {
      for (const m of minutesFor(r.blocks, total)) {
        expect(m).toBeGreaterThanOrEqual(MIN_BLOCK_MINUTES)
      }
    }
  })

  /**
   * The bug this guards: the old allocator dumped the rounding remainder on the
   * last block, which at fifteen minutes left the tune — the heaviest block —
   * as the shortest of the five.
   */
  it.each(SESSION_LENGTHS)('keeps the block order matching the weights at %i minutes', (total) => {
    const r = getRegimen(1)
    const mins = minutesFor(r.blocks, total)
    const heaviest = r.blocks.reduce((a, b, i) => (b.weight > r.blocks[a].weight ? i : a), 0)
    const lightest = r.blocks.reduce((a, b, i) => (b.weight < r.blocks[a].weight ? i : a), 0)
    expect(mins[heaviest], 'the tune should never be the shortest block').toBe(Math.max(...mins))
    expect(mins[lightest], 'the warm-up should never be the longest block').toBe(Math.min(...mins))
  })

  it('stays close to each block’s share of the time', () => {
    const r = getRegimen(1)
    for (const total of SESSION_LENGTHS) {
      const mins = minutesFor(r.blocks, total)
      r.blocks.forEach((b, i) => {
        // A minute either side of fair, plus whatever the minimum forces.
        const ideal = total * b.weight
        expect(Math.abs(mins[i] - ideal), `${b.id} at ${total}min`).toBeLessThanOrEqual(
          Math.max(1.5, MIN_BLOCK_MINUTES - ideal + 1),
        )
      })
    }
  })

  it('handles a length nobody offers without breaking its own rules', () => {
    const r = getRegimen(1)
    for (const total of [10, 12, 25, 37, 60, 90]) {
      const mins = minutesFor(r.blocks, total)
      expect(mins.reduce((a, b) => a + b, 0), `${total} min`).toBe(total)
      for (const m of mins) expect(m, `${total} min`).toBeGreaterThanOrEqual(MIN_BLOCK_MINUTES)
    }
  })

  it('weights the five blocks to exactly one', () => {
    const sum = getRegimen(1).blocks.reduce((s, b) => s + b.weight, 0)
    expect(sum).toBeCloseTo(1, 10)
  })
})

describe('independence drills', () => {
  it('specify one for every session', () => {
    for (const r of all) {
      const block = r.blocks.find((b) => b.id === 'independence')!
      expect(block.drill, `#${r.number}`).toBeDefined()
    }
  })

  it('attach a drill to the independence block and nowhere else', () => {
    for (const r of all) {
      for (const b of r.blocks) {
        if (b.id === 'independence') expect(b.drill, `#${r.number}`).toBeDefined()
        else expect(b.drill, `#${r.number} ${b.id}`).toBeUndefined()
      }
    }
  })

  /**
   * The bug this guards: a drill that gives the rhythm and leaves you guessing
   * what to play. Both hands must be told what notes they are on.
   */
  it('say what each hand plays, not only when', () => {
    for (const unit of UNITS) {
      for (const key of CYCLE_OF_FOURTHS) {
        const d = unit.independence(key)
        expect(d.leftHand.length, `unit ${unit.id} LH`).toBeGreaterThan(40)
        expect(d.rightHand.length, `unit ${unit.id} RH`).toBeGreaterThan(40)
        expect(d.rhythm.length, `unit ${unit.id} rhythm`).toBeGreaterThan(30)
        expect(d.over.length, `unit ${unit.id} over`).toBeGreaterThan(15)
        expect(d.watchFor.length, `unit ${unit.id} watchFor`).toBeGreaterThan(40)
        expect(d.name.trim(), `unit ${unit.id} name`).not.toBe('')
      }
    }
  })

  it('name a pitch, a chord or a scale for each hand', () => {
    // A hand description that never mentions a note is a rhythm, not a part.
    const musical = /\b[A-G][♯♭]?\b|scale|arpeggio|shell|voicing|triad|root|melody|chord|third|fifth|seventh|voice|blues|pentatonic/i
    for (const unit of UNITS) {
      const d = unit.independence('C')
      expect(musical.test(d.leftHand), `unit ${unit.id} LH names nothing to play`).toBe(true)
      expect(musical.test(d.rightHand), `unit ${unit.id} RH names nothing to play`).toBe(true)
    }
  })

  it('is written for the session’s key, not a fixed one', () => {
    // The property that matters is that the drill is parameterised at all —
    // a drill hard-coded to C would read identically in every key.
    for (const unit of UNITS.filter((u) => u.id <= 8)) {
      const inC = JSON.stringify(unit.independence('C'))
      const inAflat = JSON.stringify(unit.independence('A♭'))
      expect(inC, `unit ${unit.id} reads the same in every key`).not.toBe(inAflat)
    }
  })

  /**
   * Same principle as unit material: a drill may name a tempo as the unit's
   * reference point, but must not read as today's order, or it contradicts
   * the Push and First-tempo-pass steps.
   */
  it('never states a bare tempo as an instruction', () => {
    for (const unit of UNITS) {
      const d = unit.independence('C')
      const text = [d.leftHand, d.rightHand, d.rhythm, d.over].join(' ')
      if (/♩=/.test(text)) {
        expect(text, `unit ${unit.id} gives a tempo with no deference to the step`).toMatch(
          /day’s step|first time you meet|target, not today’s/,
        )
      }
    }
  })

  it('tells you what key you are in', () => {
    for (const unit of UNITS.filter((u) => u.id <= 8)) {
      for (const key of CYCLE_OF_FOURTHS) {
        const d = unit.independence(key)
        const text = [d.leftHand, d.rightHand, d.over].join(' ')
        expect(text, `unit ${unit.id} in ${key} never names the key`).toContain(key)
      }
    }
  })
})

describe('units', () => {
  it('link only to wiki topics that exist', () => {
    const slugs = new Set(TOPICS.map((t) => t.slug))
    for (const unit of UNITS) {
      expect(unit.wiki.length).toBeGreaterThan(0)
      for (const slug of unit.wiki) expect(slugs).toContain(slug)
    }
  })

  it('cover every wiki topic across the curriculum', () => {
    const linked = new Set(UNITS.flatMap((u) => u.wiki))
    for (const topic of TOPICS) expect(linked).toContain(topic.slug)
  })

  it('state a target', () => {
    for (const unit of UNITS) expect(unit.target.length).toBeGreaterThan(10)
  })

  /**
   * Unit material says WHAT to play; the variant says HOW. A unit that bakes in
   * "hands together" contradicts the Introduce step, which says hands apart —
   * exactly the bug this guards against.
   */
  it('never dictate execution — that belongs to the variant', () => {
    const directive = /hands together|hands separately|hands apart|no click|metronome|♩=/i
    const offenders: string[] = []
    for (const key of CYCLE_OF_FOURTHS) {
      for (const unit of UNITS) {
        for (const item of [...unit.scales(key), ...unit.voicings(key), ...unit.tune(key)]) {
          if (directive.test(item)) offenders.push(`unit ${unit.id}: ${item}`)
        }
      }
    }
    expect([...new Set(offenders)]).toEqual([])
  })
})

describe('variants', () => {
  it('supply an instruction for each of the four material blocks', () => {
    for (const v of VARIANTS) {
      expect(v.aim.length).toBeGreaterThan(10)
      for (const line of [v.scales, v.voicings, v.independence, v.tune]) {
        expect(line.trim()).not.toBe('')
      }
    }
  })

  it('put the variant instruction last, after the unit material', () => {
    const r = getRegimen(1)
    const scales = r.blocks.find((b) => b.id === 'scales')!
    expect(scales.items[scales.items.length - 1]).toBe(r.variant.scales)
  })
})
