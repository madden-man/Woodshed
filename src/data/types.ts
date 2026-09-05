export type Category = 'Scales' | 'Harmony' | 'Technique' | 'Practice'

export const CATEGORIES: Category[] = ['Scales', 'Harmony', 'Technique', 'Practice']

/** A unit of content inside a wiki topic. Add new kinds here and render them in <Blocks />. */
export type Block =
  | { kind: 'prose'; text: string }
  | { kind: 'list'; items: string[]; ordered?: boolean }
  | { kind: 'progression'; label?: string; chords: string[]; highlight?: number; note?: string }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'callout'; title: string; text: string }

export interface Topic {
  slug: string
  title: string
  category: Category
  /** One line, shown on the index and at the top of the page. */
  summary: string
  blocks: Block[]
  related?: string[]
}
