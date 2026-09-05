import { describe, expect, it } from 'vitest'
import { TOPICS } from './theory'
import { UNITS } from './curriculum'
import { blockToText, curriculumToText, rhythmToText, topicToText, wikiToText } from './wiki-text'

describe('the wiki as text', () => {
  it('renders every topic with its title, page and opener', () => {
    for (const t of TOPICS) {
      const text = topicToText(t)
      expect(text, t.slug).toContain(`# ${t.title}`)
      expect(text, t.slug).toContain(`/wiki/${t.slug}`)
      expect(text, t.slug).toContain(t.inPlainTerms)
    }
  })

  it('renders every block to something, with no kind left out', () => {
    for (const t of TOPICS) {
      for (const b of t.blocks) {
        expect(blockToText(b).trim(), `${t.slug}: ${b.kind}`).not.toBe('')
      }
    }
  })

  it('spells a keyboard by its notes, without the octave numbers', () => {
    const text = blockToText({ kind: 'keyboard', label: 'Dm7 shell', notes: ['D3', 'F3', 'C4'], hand: 'LH', fingers: [5, 3, 1] })
    expect(text).toContain('D F C')
    expect(text).toContain('LH')
    expect(text).toContain('5 3 1')
    expect(text).not.toMatch(/[A-G][♯♭]?\d/)
  })

  it('names the strikes of a rhythm by their count', () => {
    expect(rhythmToText('x..x....', 4, 2)).toBe('1 · · 2& · · · ·')
    expect(rhythmToText('x.xx.xx.xx.x', 4, 3)).toBe('1 · 1a 2 · 2a 3 · 3a 4 · 4a')
  })

  it('lays a chart out by bar number with its sections', () => {
    const text = blockToText({
      kind: 'changes',
      label: 'Test',
      bars: ['Cm7', 'F7', 'B♭maj7', 'E♭maj7', 'Am7♭5', 'D7', 'Gm6', 'Gm6'],
      sections: [{ name: 'A', at: 1 }, { name: 'B', at: 5 }],
    })
    expect(text).toContain('[A] | 1: Cm7 | 2: F7 | 3: B♭maj7 | 4: E♭maj7 |')
    expect(text).toContain('[B] | 5: Am7♭5')
  })

  it('describes every unit and every step of the curriculum', () => {
    const text = curriculumToText()
    for (const u of UNITS) expect(text).toContain(`Unit ${u.id}: ${u.name}`)
    expect(text).toContain('10. Consolidate')
  })

  it('fits comfortably inside the model’s context', () => {
    const text = wikiToText()
    expect(text.length).toBeGreaterThan(100_000)
    // Roughly four characters a token: keep the whole wiki well under 150k tokens.
    expect(text.length).toBeLessThan(500_000)
  })
})
