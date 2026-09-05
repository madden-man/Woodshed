import { describe, expect, it } from 'vitest'
import { TOPICS, getTopic } from './theory'
import { ascend, layoutKeyboard } from '../lib/keyboard'
import { CATEGORIES } from './types'

describe('the wiki', () => {
  it('has unique slugs', () => {
    const slugs = TOPICS.map((t) => t.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('uses url-safe slugs', () => {
    for (const t of TOPICS) expect(t.slug).toMatch(/^[a-z0-9-]+$/)
  })

  it('files every topic under a known category', () => {
    for (const t of TOPICS) expect(CATEGORIES).toContain(t.category)
  })

  it('fills every category, so no sidebar heading is empty', () => {
    for (const cat of CATEGORIES) {
      expect(TOPICS.some((t) => t.category === cat)).toBe(true)
    }
  })

  it('gives every topic a title, a summary and some content', () => {
    for (const t of TOPICS) {
      expect(t.title.trim()).not.toBe('')
      expect(t.summary.trim()).not.toBe('')
      expect(t.blocks.length).toBeGreaterThan(0)
    }
  })

  it('explains every topic in plain terms before the jargon starts', () => {
    for (const t of TOPICS) {
      expect(t.inPlainTerms.length, t.slug).toBeGreaterThan(80)
    }
  })

  /**
   * The plain-terms opener is the one place a reader who does not yet know the
   * shorthand has to be able to land. A number in it defeats the purpose.
   */
  it('keeps chord shorthand out of the plain-terms opener', () => {
    for (const t of TOPICS) {
      expect(t.inPlainTerms, t.slug).not.toMatch(/[♭♯]\d|\b\d-\d|\bii?[-–]V\b|\bm7\b|\bmaj7\b/)
    }
  })

  it('shows its work wherever it leans on numbers', () => {
    // Any topic using a stacking formula like 1-7-3 must also spell it out.
    for (const t of TOPICS) {
      const prose = t.blocks
        .filter((b) => b.kind === 'prose' || b.kind === 'callout')
        .map((b) => (b.kind === 'prose' ? b.text : b.text))
        .join(' ')
      if (/\d-\d-\d/.test(prose)) {
        expect(t.blocks.some((b) => b.kind === 'worked'), `${t.slug} uses a formula but never works one`).toBe(true)
      }
    }
  })

  it('resolves every related link', () => {
    for (const t of TOPICS) {
      for (const slug of t.related ?? []) {
        expect(getTopic(slug), `${t.slug} -> ${slug}`).toBeDefined()
      }
    }
  })

  it('never links a topic to itself', () => {
    for (const t of TOPICS) expect(t.related ?? []).not.toContain(t.slug)
  })

  it('returns undefined for an unknown slug', () => {
    expect(getTopic('no-such-topic')).toBeUndefined()
  })
})

describe('content blocks', () => {
  it('have no empty prose, list items or callouts', () => {
    for (const t of TOPICS) {
      for (const block of t.blocks) {
        switch (block.kind) {
          case 'prose':
            expect(block.text.trim(), t.slug).not.toBe('')
            break
          case 'list':
            expect(block.items.length, t.slug).toBeGreaterThan(0)
            for (const i of block.items) expect(i.trim(), t.slug).not.toBe('')
            break
          case 'callout':
            expect(block.title.trim(), t.slug).not.toBe('')
            expect(block.text.trim(), t.slug).not.toBe('')
            break
          case 'progression':
            expect(block.chords.length, t.slug).toBeGreaterThan(0)
            break
          case 'table':
            expect(block.head.length, t.slug).toBeGreaterThan(0)
            break
          case 'worked':
            expect(block.label.trim(), t.slug).not.toBe('')
            expect(block.rows.length, t.slug).toBeGreaterThan(0)
            break
          case 'keyboard':
            expect(block.label.trim(), t.slug).not.toBe('')
            expect(block.notes.length, t.slug).toBeGreaterThan(1)
            break
        }
      }
    }
  })

  it('give every table row the same width as its header', () => {
    for (const t of TOPICS) {
      for (const block of t.blocks) {
        if (block.kind !== 'table') continue
        for (const row of block.rows) {
          expect(row, `${t.slug}: ${block.head.join('/')}`).toHaveLength(block.head.length)
        }
      }
    }
  })

  it('gives every worked row a symbol, a meaning and a result', () => {
    for (const t of TOPICS) {
      for (const block of t.blocks) {
        if (block.kind !== 'worked') continue
        for (const row of block.rows) {
          expect(row.symbol.trim(), `${t.slug}/${block.label}`).not.toBe('')
          expect(row.gives.trim(), `${t.slug}/${block.label}`).not.toBe('')
          // The middle column is the explanation; a bare restatement is useless.
          expect(row.means.length, `${t.slug}/${block.label}: ${row.symbol}`).toBeGreaterThan(15)
        }
      }
    }
  })

  it('keeps a progression highlight inside its chord list', () => {
    for (const t of TOPICS) {
      for (const block of t.blocks) {
        if (block.kind !== 'progression' || block.highlight === undefined) continue
        expect(block.highlight, t.slug).toBeGreaterThanOrEqual(0)
        expect(block.highlight, t.slug).toBeLessThan(block.chords.length)
      }
    }
  })
})

/**
 * The shell-voicing rows are the most error-prone content in the wiki: a
 * stacking order, a chord quality and three note names that all have to agree.
 * These parse the notes back and check them against the formula rather than
 * taking the prose at its word.
 */
describe('shell voicings are spelled correctly', () => {
  const PITCH: Record<string, number> = {
    C: 0, 'C♯': 1, 'D♭': 1, D: 2, 'D♯': 3, 'E♭': 3, E: 4,
    F: 5, 'F♯': 6, 'G♭': 6, G: 7, 'G♯': 8, 'A♭': 8, A: 9, 'A♯': 10, 'B♭': 10, B: 11,
  }

  /** Semitones above the root for each chord degree, by quality. */
  const QUALITY: Record<string, Record<number, number>> = {
    m7: { 1: 0, 3: 3, 5: 7, 7: 10 },
    7: { 1: 0, 3: 4, 5: 7, 7: 10 },
    maj7: { 1: 0, 3: 4, 5: 7, 7: 11 },
    'm7♭5': { 1: 0, 3: 3, 5: 6, 7: 10 },
  }

  function parseChord(name: string) {
    const root = name[1] === '♯' || name[1] === '♭' ? name.slice(0, 2) : name[0]
    const quality = name.slice(root.length)
    return { root: PITCH[root], quality }
  }

  /** Stack the degrees upward from the root, each above the last. */
  function stack(root: number, quality: string, degrees: number[]): number[] {
    const table = QUALITY[quality]
    let previous = root
    return degrees.map((d, i) => {
      if (i === 0) return root
      const target = (root + table[d]) % 12
      // Always ascend to the next occurrence of that pitch class.
      let pitch = target
      while (pitch <= previous) pitch += 12
      previous = pitch
      return pitch
    })
  }

  const topic = getTopic('shell-voicings')!
  const spelled = topic.blocks.find(
    (b) => b.kind === 'worked' && b.label === 'The ii–V–I in C, spelled out',
  )
  const bothWays = topic.blocks.find(
    (b) => b.kind === 'worked' && b.label === 'The same Dm7, stacked both ways',
  )

  it('has the blocks these assertions depend on', () => {
    expect(spelled?.kind).toBe('worked')
    expect(bothWays?.kind).toBe('worked')
  })

  it('spells the ii–V–I shells to match their stacking orders', () => {
    if (spelled?.kind !== 'worked') throw new Error('missing block')
    for (const row of spelled.rows) {
      // e.g. "Dm7 as 1-7-3"
      const [chordName, order] = row.symbol.split(' as ')
      const degrees = order.split('-').map(Number)
      const { root, quality } = parseChord(chordName)

      const expected = stack(root, quality, degrees)
      const actual = row.gives.split('–').map((n) => PITCH[n.trim()])

      // Compare as ascending pitch classes from the root.
      const expectedClasses = expected.map((p) => p % 12)
      expect(actual, `${row.symbol} → ${row.gives}`).toEqual(expectedClasses)
    }
  })

  it('shows both Dm7 stackings as the same three notes in a different order', () => {
    if (bothWays?.kind !== 'worked') throw new Error('missing block')
    const sets = bothWays.rows.map((r) => r.gives.split('–').map((n) => PITCH[n.trim()]))
    expect(sets).toHaveLength(2)
    // Same notes...
    expect([...sets[0]].sort()).toEqual([...sets[1]].sort())
    // ...different order.
    expect(sets[0]).not.toEqual(sets[1])
    // Both start on the root, D.
    for (const set of sets) expect(set[0]).toBe(PITCH.D)
  })

  /**
   * A shape wider than an octave means stretching, which is the wrong default
   * for a left hand that also has to move. 1-7-3 puts every chord in this
   * progression at a 10th, so the page teaches 1-3-7 first.
   */
  it('keeps every taught shape within an octave', () => {
    if (spelled?.kind !== 'worked') throw new Error('missing block')
    for (const row of spelled.rows) {
      const notes = row.gives.split('–').map((n) => PITCH[n.trim()])
      let previous = notes[0]
      let top = notes[0]
      for (const pc of notes.slice(1)) {
        let pitch = pc
        while (pitch <= previous) pitch += 12
        previous = pitch
        top = pitch
      }
      expect(top - notes[0], `${row.symbol} spans too far for one hand`).toBeLessThanOrEqual(12)
    }
  })

  it('leads with the two-note shell before the three-note one', () => {
    const labels = topic.blocks.filter((b) => b.kind === 'worked').map((b) => (b.kind === 'worked' ? b.label : ''))
    const two = labels.findIndex((l) => /two-note/i.test(l))
    const three = labels.findIndex((l) => l === 'The ii–V–I in C, spelled out')
    expect(two).toBeGreaterThanOrEqual(0)
    expect(two).toBeLessThan(three)
  })

  it('explains that the numbers are read bottom to top', () => {
    const text = topic.blocks
      .map((b) => (b.kind === 'prose' ? b.text : b.kind === 'callout' ? `${b.title} ${b.text}` : ''))
      .join(' ')
    expect(text).toMatch(/bottom to top/i)
  })
})

describe('keyboard diagrams', () => {
  const diagrams = TOPICS.flatMap((t) =>
    t.blocks.filter((b) => b.kind === 'keyboard').map((b) => ({ topic: t.slug, block: b })),
  )

  it('appear on the topics where the question is which notes', () => {
    const withDiagrams = new Set(diagrams.map((d) => d.topic))
    for (const slug of [
      'chord-numbers',
      'major-scale-modes',
      'melodic-minor-family',
      'bebop-scales',
      'diminished-and-blues',
      'shell-voicings',
      'rootless-voicings',
      'upper-structure-triads',
      'minor-two-five-one',
    ]) {
      expect(withDiagrams, `${slug} has no keyboard`).toContain(slug)
    }
  })

  it('name notes the keyboard can actually draw', () => {
    for (const { topic, block } of diagrams) {
      if (block.kind !== 'keyboard') continue
      expect(() => layoutKeyboard(block.notes), `${topic}: ${block.label}`).not.toThrow()
    }
  })

  it('light every note they were given', () => {
    for (const { topic, block } of diagrams) {
      if (block.kind !== 'keyboard') continue
      const { keys } = layoutKeyboard(block.notes)
      const lit = keys.filter((k) => k.highlight !== 'none')
      expect(lit.length, `${topic}: ${block.label}`).toBe(new Set(ascend(block.notes)).size)
    }
  })

  it('stay small enough to read without scrolling on a phone', () => {
    for (const { topic, block } of diagrams) {
      if (block.kind !== 'keyboard') continue
      const { width } = layoutKeyboard(block.notes)
      expect(width, `${topic}: ${block.label} is ${width}px wide`).toBeLessThanOrEqual(22 * 15)
    }
  })

  /** A diagram whose notes contradict the prose beside it is worse than none. */
  it('match the chord the worked rows spell, where both exist', () => {
    const shell = TOPICS.find((t) => t.slug === 'shell-voicings')!
    const spelled = shell.blocks.find((b) => b.kind === 'worked' && b.label === 'The ii–V–I in C, spelled out')
    if (spelled?.kind !== 'worked') throw new Error('missing block')

    for (const row of spelled.rows) {
      const chord = row.symbol.split(' as ')[0]
      const diagram = shell.blocks.find(
        (b) => b.kind === 'keyboard' && b.label === `${chord} as 1-3-7`,
      )
      if (diagram?.kind !== 'keyboard') throw new Error(`no keyboard for ${chord}`)
      expect(diagram.notes.join(' – '), chord).toBe(row.gives)
    }
  })
})
