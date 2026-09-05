import type { Block, Topic } from './types'
import { TOPICS } from './theory'
import { UNITS, VARIANTS } from './curriculum'

/**
 * The wiki as plain text, for the chat assistant's context. Every block kind
 * renders to something a reader could act on — a keyboard becomes its notes,
 * a rhythm grid its pattern with the counts under it, a chart its bars.
 */

const COUNTS: Record<number, string[]> = {
  1: [''],
  2: ['', '&'],
  3: ['', '&', 'a'],
  4: ['', 'e', '&', 'a'],
}

/** "x..x...." over eighths becomes "1 · · 2& · · · ·" — the strikes named by their count. */
export function rhythmToText(pattern: string, beats: number, sub: number): string {
  const out: string[] = []
  for (let i = 0; i < beats * sub; i++) {
    const beat = Math.floor(i / sub) + 1
    const within = COUNTS[sub]?.[i % sub] ?? ''
    out.push(pattern[i] === 'x' ? `${beat}${within}` : '·')
  }
  return out.join(' ')
}

export function blockToText(b: Block): string {
  switch (b.kind) {
    case 'prose':
      return b.text
    case 'callout':
      return `${b.title}: ${b.text}`
    case 'list':
      return b.items.map((item, i) => (b.ordered ? `${i + 1}. ${item}` : `- ${item}`)).join('\n')
    case 'progression':
      return [`${b.label ?? 'Progression'}: ${b.chords.join(' → ')}`, b.note].filter(Boolean).join('\n')
    case 'table':
      return [b.head.join(' | '), ...b.rows.map((r) => r.join(' | '))].join('\n')
    case 'worked':
      return [
        `${b.label}:`,
        ...b.rows.map((r) => `- ${r.symbol}: ${r.means} → ${r.gives}`),
        b.note,
      ]
        .filter(Boolean)
        .join('\n')
    case 'keyboard': {
      const notes = b.notes.map((n) => n.replace(/-?\d+$/, '')).join(' ')
      const hand = b.hand ? `, ${b.hand}` : ''
      const fingers = b.fingers ? `, fingers ${b.fingers.map((f) => f ?? '-').join(' ')}` : ''
      return [`Keyboard — ${b.label}: ${notes}${hand}${fingers}`, b.note].filter(Boolean).join('\n')
    }
    case 'rhythm': {
      const beats = b.beats ?? 4
      const sub = b.subdivision ?? 2
      const lines = [`Rhythm — ${b.label} (${beats} beats, ${sub} per beat):`]
      if (b.right) lines.push(`  RH: ${rhythmToText(b.right, beats, sub)}`)
      if (b.left) lines.push(`  LH: ${rhythmToText(b.left, beats, sub)}`)
      if (b.note) lines.push(b.note)
      return lines.join('\n')
    }
    case 'changes': {
      const per = b.perLine ?? 4
      const starts = new Map((b.sections ?? []).map((s) => [s.at, s.name]))
      const lines = [`Chart — ${b.label}:`]
      for (let i = 0; i < b.bars.length; i += per) {
        const section = starts.get(i + 1)
        const bars = b.bars.slice(i, i + per).map((bar, j) => `${i + j + 1}: ${bar}`)
        lines.push(`  ${section ? `[${section}] ` : ''}| ${bars.join(' | ')} |`)
      }
      if (b.note) lines.push(b.note)
      return lines.join('\n')
    }
  }
}

export function topicToText(t: Topic): string {
  return [
    `# ${t.title}`,
    `Page: /wiki/${t.slug} · Category: ${t.category}`,
    t.summary,
    '',
    `In plain terms: ${t.inPlainTerms}`,
    '',
    ...t.blocks.map(blockToText).flatMap((s) => [s, '']),
    t.related?.length ? `See also: ${t.related.map((s) => `/wiki/${s}`).join(', ')}` : '',
  ]
    .join('\n')
    .trim()
}

/** The ten units and the ten steps, with the material shown in C. */
export function curriculumToText(): string {
  const units = UNITS.map((u) => {
    const drill = u.independence('C')
    return [
      `## Unit ${u.id}: ${u.name} (sessions ${(u.id - 1) * 10 + 1}–${u.id * 10}, level ${u.level})`,
      `Goal: ${u.goal}`,
      `Target: ${u.target}`,
      `Reads on: ${u.wiki.map((s) => `/wiki/${s}`).join(', ')}`,
      `Tune: ${u.tune('C').join(' ')} (page /wiki/${u.tuneWiki})`,
      `Scales, in C: ${u.scales('C').join(' · ')}`,
      `Voicings, in C: ${u.voicings('C').join(' · ')}`,
      `Independence drill — ${drill.name}: LH ${drill.leftHand} RH ${drill.rightHand} Rhythm: ${drill.rhythm} Over: ${drill.over} Watch for: ${drill.watchFor}`,
    ].join('\n')
  })
  const steps = VARIANTS.map(
    (v, i) =>
      `${i + 1}. ${v.name} — ${v.aim} Scales: ${v.scales} Voicings: ${v.voicings} Independence: ${v.independence} Tune: ${v.tune}`,
  )
  return [
    '# The curriculum',
    'A hundred sessions in ten units of ten. Each unit walks the same ten steps. The key advances one step around the cycle of fourths per session, so the material below is shown in C and transposes to the day’s key.',
    '',
    ...units.flatMap((u) => [u, '']),
    '## The ten steps every unit walks',
    ...steps,
  ].join('\n')
}

export function wikiToText(): string {
  return [...TOPICS.map(topicToText), curriculumToText()].join('\n\n---\n\n')
}
