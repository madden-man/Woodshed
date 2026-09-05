import { describe, expect, it } from 'vitest'
import { TOPICS, getTopic } from './theory'
import { ascend, layoutKeyboard } from '../lib/keyboard'
import { MAJOR_SCALES } from './fingerings'
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
   * The shapes taught first have to fit an ordinary hand. The three-note
   * versions run to a 10th, which is allowed only because the page says so and
   * offers a way round it — the wider shape is a choice, not a surprise.
   */
  it('keeps the shapes it teaches first inside one hand', () => {
    const first = topic.blocks.filter(
      (b) => b.kind === 'keyboard' && /root and/.test(b.label),
    )
    expect(first.length, 'the two-note shells should be taught first').toBeGreaterThanOrEqual(3)
    for (const block of first) {
      if (block.kind !== 'keyboard') continue
      const p = ascend(block.notes)
      expect(Math.max(...p) - Math.min(...p), block.label).toBeLessThanOrEqual(12)
    }
  })

  it('warns about the reach wherever a shape exceeds an octave', () => {
    if (spelled?.kind !== 'worked') throw new Error('missing block')
    const widest = Math.max(
      ...spelled.rows.map((row) => {
        const p = ascend(row.gives.split('–').map((n) => n.trim()))
        return Math.max(...p) - Math.min(...p)
      }),
    )
    if (widest > 12) {
      const prose = topic.blocks
        .map((b) => (b.kind === 'callout' ? `${b.title} ${b.text}` : b.kind === 'prose' ? b.text : ''))
        .join(' ')
      expect(prose, 'a 10th is taught with no mention of the stretch').toMatch(/10th|stretch|reach/i)
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
    // Every Scales and Harmony topic answers "which notes" somewhere.
    const expected = TOPICS.filter((t) => t.category === 'Scales' || t.category === 'Harmony').map((t) => t.slug)
    expect(expected.length).toBeGreaterThanOrEqual(9)
    for (const slug of expected) {
      expect(withDiagrams, `${slug} has no keyboard`).toContain(slug)
    }
  })

  /**
   * Any shape drawn for one hand has to fit one hand. A page may teach a
   * wider shape only if it says so — the shells page warns about its 10ths.
   */
  it('fit one hand wherever they name one', () => {
    for (const t of TOPICS) {
      const prose = t.blocks
        .map((b) =>
          b.kind === 'callout' ? `${b.title} ${b.text}` : b.kind === 'prose' ? b.text : b.kind === 'keyboard' ? (b.note ?? '') : '',
        )
        .join(' ')
      const warns = /10th|9th|stretch|reach/i.test(prose)
      for (const b of t.blocks) {
        if (b.kind !== 'keyboard' || !b.hand) continue
        const p = ascend(b.notes)
        const width = Math.max(...p) - Math.min(...p)
        if (width > 12) expect(warns, `${t.slug}: ${b.label} spans ${width} semitones for one hand`).toBe(true)
      }
    }
  })

  it('name notes the keyboard can actually draw', () => {
    for (const { topic, block } of diagrams) {
      if (block.kind !== 'keyboard') continue
      expect(() => layoutKeyboard(block.notes, { span: block.span }), `${topic}: ${block.label}`).not.toThrow()
    }
  })

  it('light every note they were given', () => {
    for (const { topic, block } of diagrams) {
      if (block.kind !== 'keyboard') continue
      const { keys } = layoutKeyboard(block.notes, { span: block.span })
      const lit = keys.filter((k) => k.highlight !== 'none')
      expect(lit.length, `${topic}: ${block.label}`).toBe(new Set(ascend(block.notes)).size)
    }
  })

  it('are at least an octave wide, so the notes have somewhere to sit', () => {
    for (const { topic, block } of diagrams) {
      if (block.kind !== 'keyboard') continue
      const { keys } = layoutKeyboard(block.notes, { span: block.span })
      const pitches = keys.map((k) => k.pitch)
      expect(Math.max(...pitches) - Math.min(...pitches), `${topic}: ${block.label}`).toBeGreaterThanOrEqual(12)
    }
  })

  it('give a finger to every note, or to none of them', () => {
    for (const { topic, block } of diagrams) {
      if (block.kind !== 'keyboard' || !block.fingers) continue
      expect(block.fingers.length, `${topic}: ${block.label}`).toBe(block.notes.length)
      for (const f of block.fingers) {
        if (f === null) continue
        expect(f, `${topic}: ${block.label}`).toBeGreaterThanOrEqual(1)
        expect(f, `${topic}: ${block.label}`).toBeLessThanOrEqual(5)
      }
    }
  })

  it('match the standard fingering where the app already states one', () => {
    // The C major diagram must agree with what the regimen tells you to play.
    const c = TOPICS.flatMap((t) => t.blocks).find(
      (b) => b.kind === 'keyboard' && /C major scale/.test(b.label),
    )
    if (c?.kind !== 'keyboard') throw new Error('missing C major diagram')
    expect(c.fingers).toEqual(MAJOR_SCALES.C.rh)
    expect(c.hand).toBe('RH')
  })

  it('stay small enough to read without scrolling on a phone', () => {
    for (const { topic, block } of diagrams) {
      if (block.kind !== 'keyboard') continue
      const { width } = layoutKeyboard(block.notes, { span: block.span })
      expect(width, `${topic}: ${block.label} is ${width}px wide`).toBeLessThanOrEqual(22 * 15)
    }
  })

  /** A diagram whose notes contradict the prose beside it is worse than none. */
  it('match the chord the worked rows spell, where both exist', () => {
    const shell = TOPICS.find((t) => t.slug === 'shell-voicings')!
    const spelled = shell.blocks.find((b) => b.kind === 'worked' && b.label === 'The ii–V–I in C, spelled out')
    if (spelled?.kind !== 'worked') throw new Error('missing block')

    for (const row of spelled.rows) {
      const diagram = shell.blocks.find((b) => b.kind === 'keyboard' && b.label.startsWith(row.symbol))
      if (diagram?.kind !== 'keyboard') throw new Error(`no keyboard for "${row.symbol}"`)
      const drawn = diagram.notes.map((n) => n.replace(/-?\d+$/, '')).join(' – ')
      expect(drawn, row.symbol).toBe(row.gives)
    }
  })

  /**
   * The bug this exists for: every chord of the ii–V–I was drawn from its own
   * octave, so the shared guide tone appeared as F4 on one diagram and F5 on
   * the next. Voice leading is about register — a note that "stays" has to be
   * visibly the same key.
   */
  it('voice-lead between consecutive chords of a progression', () => {
    const shell = TOPICS.find((t) => t.slug === 'shell-voicings')!
    const bySpan = new Map<string, string[][]>()
    for (const b of shell.blocks) {
      if (b.kind !== 'keyboard' || !b.span) continue
      // Only the per-chord diagrams; the summary one shows every note at once.
      if (/stacked up|both ways/i.test(b.label)) continue
      const key = b.span.join('-')
      bySpan.set(key, [...(bySpan.get(key) ?? []), b.notes])
    }

    expect(bySpan.size, 'no progression is drawn over a shared span').toBeGreaterThan(0)

    for (const [span, chords] of bySpan) {
      expect(chords.length, span).toBeGreaterThanOrEqual(3)
      for (let i = 1; i < chords.length; i++) {
        // The root is free to leap — it is the guide tones above it that must
        // either hold or move by a single key.
        const before = ascend(chords[i - 1]).slice(1)
        const now = ascend(chords[i]).slice(1)
        expect(now.length, span).toBe(before.length)

        for (const pitch of now) {
          const nearest = Math.min(...before.map((p) => Math.abs(p - pitch)))
          expect(
            nearest,
            `${span}: between chords ${i} and ${i + 1}, ${pitch} is ${nearest} keys from anything before it`,
          ).toBeLessThanOrEqual(1)
        }
      }
    }
  })

  it('draw a progression’s chords over one span, not each from its own octave', () => {
    const shell = TOPICS.find((t) => t.slug === 'shell-voicings')!
    for (const b of shell.blocks) {
      if (b.kind !== 'keyboard' || !b.span) continue
      // A shared span is only meaningful if the notes say which octave they are in.
      for (const n of b.notes) expect(n, `${b.label}: "${n}" has no octave`).toMatch(/\d$/)
    }
  })
})

describe('rhythm grids', () => {
  const grids = TOPICS.flatMap((t) =>
    t.blocks.filter((b) => b.kind === 'rhythm').map((b) => ({ topic: t.slug, block: b })),
  )

  it('appear on every Rhythm topic', () => {
    const withGrids = new Set(grids.map((g) => g.topic))
    for (const t of TOPICS.filter((t) => t.category === 'Rhythm')) {
      expect(withGrids, `${t.slug} has no rhythm grid`).toContain(t.slug)
    }
  })

  it('fill the bar exactly, in strikes and rests only', () => {
    for (const { topic, block } of grids) {
      if (block.kind !== 'rhythm') continue
      const cells = (block.beats ?? 4) * (block.subdivision ?? 2)
      const hands = [block.left, block.right].filter((h): h is string => h !== undefined)
      expect(hands.length, `${topic}: ${block.label} has no hand`).toBeGreaterThan(0)
      for (const hand of hands) {
        expect(hand.length, `${topic}: ${block.label}`).toBe(cells)
        expect(hand, `${topic}: ${block.label}`).toMatch(/^[x.]+$/)
        expect(hand, `${topic}: ${block.label} is silent`).toContain('x')
      }
    }
  })
})

describe('chord charts', () => {
  const charts = TOPICS.flatMap((t) =>
    t.blocks.filter((b) => b.kind === 'changes').map((b) => ({ topic: t.slug, block: b })),
  )

  const TUNES = [
    'autumn-leaves',
    'blue-bossa',
    'take-the-a-train',
    'beautiful-love',
    'solar',
    'there-will-never-be-another-you',
    'someday-my-prince-will-come',
    'all-the-things-you-are',
  ]

  it('give every tune page exactly one chart, for the whole form', () => {
    for (const slug of TUNES) {
      const own = charts.filter((c) => c.topic === slug)
      expect(own.length, slug).toBe(1)
      expect(getTopic(slug)?.category, slug).toBe('Repertoire')
    }
  })

  it('run a whole number of phrases', () => {
    for (const { topic, block } of charts) {
      if (block.kind !== 'changes') continue
      const n = block.bars.length
      expect([12, 16, 32].includes(n) || n % 4 === 0, `${topic}: ${block.label} is ${n} bars`).toBe(true)
    }
  })

  it('put a chord in every bar, and at most two', () => {
    for (const { topic, block } of charts) {
      if (block.kind !== 'changes') continue
      for (const bar of block.bars) {
        const chords = bar.trim().split(/\s+/)
        expect(chords.length, `${topic}: "${bar}"`).toBeGreaterThanOrEqual(1)
        expect(chords.length, `${topic}: "${bar}"`).toBeLessThanOrEqual(2)
        for (const c of chords) expect(c, `${topic}: "${bar}"`).toMatch(/^[A-G][♯♭]?/)
      }
    }
  })

  it('start every section inside the chart, in order', () => {
    for (const { topic, block } of charts) {
      if (block.kind !== 'changes' || !block.sections) continue
      let last = 0
      for (const s of block.sections) {
        expect(s.at, `${topic}: ${s.name}`).toBeGreaterThan(last)
        expect(s.at, `${topic}: ${s.name}`).toBeLessThanOrEqual(block.bars.length)
        expect(s.name.trim(), topic).not.toBe('')
        last = s.at
      }
    }
  })
})
