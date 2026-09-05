import { describe, expect, it } from 'vitest'
import { TOPICS, getTopic } from './theory'
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
