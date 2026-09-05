export type Category =
  | 'Scales'
  | 'Harmony'
  | 'Technique'
  | 'Rhythm'
  | 'Improvisation'
  | 'Practice'
  | 'Repertoire'

export const CATEGORIES: Category[] = [
  'Scales',
  'Harmony',
  'Technique',
  'Rhythm',
  'Improvisation',
  'Practice',
  'Repertoire',
]

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
  | {
      kind: 'keyboard'
      label: string
      /** Bare names ascend from the last; names with an octave ("F4") land there. */
      notes: string[]
      /** Finger per note, aligned to `notes`. */
      fingers?: (number | null)[]
      hand?: 'RH' | 'LH'
      /** Force the drawn range, so several diagrams of one progression line up. */
      span?: [string, string]
      note?: string
      startOctave?: number
    }
  | {
      /**
       * A rhythm grid: one row per hand, one cell per subdivision. A hand is a
       * pattern string, `x` for a strike and `.` for silence, so the Charleston
       * over eighths is "x..x....". Keyboards cannot show a rhythm; this can.
       */
      kind: 'rhythm'
      label: string
      /** Beats in the bar. Default 4. */
      beats?: number
      /** Cells per beat: 1 for quarters, 2 for eighths, 3 for triplets, 4 for sixteenths. Default 2. */
      subdivision?: 1 | 2 | 3 | 4
      left?: string
      right?: string
      note?: string
    }
  | {
      /**
       * A chord chart: one string per bar, two symbols separated by a space
       * where a bar is split, sections named by the bar they start on.
       */
      kind: 'changes'
      label: string
      bars: string[]
      /** Bars per line. Default 4. */
      perLine?: number
      sections?: { name: string; at: number }[]
      note?: string
    }

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
