import { describe, expect, it } from 'vitest'
import { parseInline, parseMarkdown } from './markdown'

describe('parseInline', () => {
  it('finds bold, code and links and leaves the rest as text', () => {
    expect(parseInline('Play **D F C** on `Dm7`, see [Shells](/wiki/shell-voicings).')).toEqual([
      { kind: 'text', text: 'Play ' },
      { kind: 'bold', text: 'D F C' },
      { kind: 'text', text: ' on ' },
      { kind: 'code', text: 'Dm7' },
      { kind: 'text', text: ', see ' },
      { kind: 'link', text: 'Shells', href: '/wiki/shell-voicings' },
      { kind: 'text', text: '.' },
    ])
  })

  it('returns plain text untouched', () => {
    expect(parseInline('nothing here')).toEqual([{ kind: 'text', text: 'nothing here' }])
  })
})

describe('parseMarkdown', () => {
  it('splits paragraphs on blank lines and joins wrapped lines', () => {
    const b = parseMarkdown('one\ntwo\n\nthree')
    expect(b).toHaveLength(2)
    expect(b[0]).toEqual({ kind: 'paragraph', inline: [{ kind: 'text', text: 'one two' }] })
  })

  it('reads bullet and numbered lists, including wrapped items', () => {
    const b = parseMarkdown('- a\n- b\n  continued\n\n1. x\n2. y')
    expect(b[0]).toMatchObject({ kind: 'list', ordered: false })
    expect(b[0].kind === 'list' && b[0].items[1]).toEqual([{ kind: 'text', text: 'b continued' }])
    expect(b[1]).toMatchObject({ kind: 'list', ordered: true })
  })

  it('reads headings and fenced code', () => {
    const b = parseMarkdown('## Title\n```\nx = 1\n```\nafter')
    expect(b[0]).toMatchObject({ kind: 'heading', level: 2 })
    expect(b[1]).toEqual({ kind: 'code', text: 'x = 1' })
    expect(b[2]).toMatchObject({ kind: 'paragraph' })
  })

  it('never throws on odd input', () => {
    for (const s of ['', '```', '**', '[x](', '- ', '#']) expect(() => parseMarkdown(s)).not.toThrow()
  })
})
