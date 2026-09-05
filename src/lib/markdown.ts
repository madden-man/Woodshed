/**
 * Just enough markdown for the assistant's answers: headings, paragraphs,
 * bullet and numbered lists, fenced code, and inline bold, code and links.
 * Anything else is rendered as the text it was.
 */

export type Inline =
  | { kind: 'text'; text: string }
  | { kind: 'bold'; text: string }
  | { kind: 'code'; text: string }
  | { kind: 'link'; text: string; href: string }

export type MdBlock =
  | { kind: 'heading'; level: number; inline: Inline[] }
  | { kind: 'paragraph'; inline: Inline[] }
  | { kind: 'list'; ordered: boolean; items: Inline[][] }
  | { kind: 'code'; text: string }

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g

export function parseInline(text: string): Inline[] {
  const out: Inline[] = []
  let last = 0
  for (const m of text.matchAll(INLINE)) {
    const start = m.index ?? 0
    if (start > last) out.push({ kind: 'text', text: text.slice(last, start) })
    const tok = m[0]
    if (tok.startsWith('**')) out.push({ kind: 'bold', text: tok.slice(2, -2) })
    else if (tok.startsWith('`')) out.push({ kind: 'code', text: tok.slice(1, -1) })
    else {
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(tok)!
      out.push({ kind: 'link', text: link[1], href: link[2] })
    }
    last = start + tok.length
  }
  if (last < text.length) out.push({ kind: 'text', text: text.slice(last) })
  return out
}

export function parseMarkdown(src: string): MdBlock[] {
  const lines = src.replace(/\r\n/g, '\n').split('\n')
  const blocks: MdBlock[] = []
  let para: string[] = []
  let list: { ordered: boolean; items: string[] } | null = null

  const flushPara = () => {
    if (para.length) blocks.push({ kind: 'paragraph', inline: parseInline(para.join(' ')) })
    para = []
  }
  const flushList = () => {
    if (list) blocks.push({ kind: 'list', ordered: list.ordered, items: list.items.map(parseInline) })
    list = null
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const fence = /^```/.test(line)
    if (fence) {
      flushPara()
      flushList()
      const code: string[] = []
      i++
      while (i < lines.length && !/^```/.test(lines[i])) code.push(lines[i++])
      blocks.push({ kind: 'code', text: code.join('\n') })
      continue
    }
    const heading = /^(#{1,4})\s+(.*)$/.exec(line)
    if (heading) {
      flushPara()
      flushList()
      blocks.push({ kind: 'heading', level: heading[1].length, inline: parseInline(heading[2]) })
      continue
    }
    const item = /^\s*(?:[-*•]|\d+[.)])\s+(.*)$/.exec(line)
    if (item) {
      flushPara()
      const ordered = /^\s*\d/.test(line)
      if (!list || list.ordered !== ordered) {
        flushList()
        list = { ordered, items: [] }
      }
      list.items.push(item[1])
      continue
    }
    if (line.trim() === '') {
      flushPara()
      flushList()
      continue
    }
    if (list && /^\s{2,}/.test(line)) {
      // A wrapped list item continues on an indented line.
      list.items[list.items.length - 1] += ` ${line.trim()}`
      continue
    }
    flushList()
    para.push(line.trim())
  }
  flushPara()
  flushList()
  return blocks
}
