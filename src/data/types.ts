export type Category = 'Scales' | 'Harmony' | 'Technique' | 'Practice'

export const CATEGORIES: Category[] = ['Scales', 'Harmony', 'Technique', 'Practice']

/**
 * One line of a derivation: the shorthand, what it means in words, and the
 * actual notes it produces. Chord shorthand is unreadable until someone spells
 * it out once, so anywhere a topic uses numbers it should also show this.
 */
export interface WorkedRow {
  /** The shorthand as a player would write it, e.g. "1-7-3" or "♭II triad". */
  symbol: string
  /** What that shorthand is telling you to do, in plain words. */
  means: string
  /** The notes you actually put your fingers on. */
  gives: string
}

/** A unit of content inside a wiki topic. Add new kinds here and render them in <Blocks />. */
export type Block =
  | { kind: 'prose'; text: string }
  | { kind: 'list'; items: string[]; ordered?: boolean }
  | { kind: 'progression'; label?: string; chords: string[]; highlight?: number; note?: string }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'callout'; title: string; text: string }
  | { kind: 'worked'; label: string; rows: WorkedRow[]; note?: string }
  | { kind: 'keyboard'; label: string; notes: string[]; note?: string; startOctave?: number }

export interface Topic {
  slug: string
  title: string
  category: Category
  /** One line, shown on the index and at the top of the page. */
  summary: string
  /**
   * The same idea with the jargon taken out, shown before anything else.
   * If you can't write this without using a number, you don't understand
   * the topic well enough to write the rest.
   */
  inPlainTerms: string
  blocks: Block[]
  related?: string[]
}
