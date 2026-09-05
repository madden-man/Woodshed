/**
 * Geometry for the keyboard diagrams in the wiki.
 *
 * Notes can be written two ways. A bare name — "F" — is placed ascending, at
 * the next occurrence above the note before it, which is how you read a chord
 * off the page. A name with an octave — "F4" — is placed exactly there.
 *
 * The octave form exists because register is the whole point of voice leading.
 * Drawing each chord of a ii–V–I from its own octave makes the shared guide
 * tone jump between diagrams, which is the opposite of what the shells are
 * teaching. Give the progression one `span` and absolute notes, and a held note
 * is visibly the same key in every picture.
 */

export const PITCH_CLASS: Record<string, number> = {
  'C♭': 11, C: 0, 'C♯': 1,
  'D♭': 1, D: 2, 'D♯': 3,
  'E♭': 3, E: 4, 'E♯': 5,
  'F♭': 4, F: 5, 'F♯': 6,
  'G♭': 6, G: 7, 'G♯': 8,
  'A♭': 8, A: 9, 'A♯': 10,
  'B♭': 10, B: 11, 'B♯': 0,
}

const BLACK = new Set([1, 3, 6, 8, 10])
const WHITE_NAME: Record<number, string> = { 0: 'C', 2: 'D', 4: 'E', 5: 'F', 7: 'G', 9: 'A', 11: 'B' }

export const KEY_W = 22
export const KEY_H = 92
export const BLACK_W = 13
export const BLACK_H = 57

/** Real keyboards splay the black keys within each group; centring them all reads wrong. */
const BLACK_NUDGE: Record<number, number> = { 1: -1.5, 3: 1.5, 6: -2, 8: 0, 10: 2 }

/** A diagram narrower than an octave gives the eye nothing to place the notes against. */
export const MIN_SEMITONES = 12

export type Highlight = 'none' | 'root' | 'on'

export interface KeyboardKey {
  pitch: number
  name: string
  isBlack: boolean
  x: number
  width: number
  height: number
  highlight: Highlight
  order?: number
  /** Finger number to print on the key, if one was given. */
  finger?: number
}

export interface KeyboardLayout {
  keys: KeyboardKey[]
  width: number
  height: number
}

export interface LayoutOptions {
  /** Octave for the first note when it has none of its own. */
  startOctave?: number
  /** Force the drawn range, e.g. ['G2', 'A4'] — use one span for a progression. */
  span?: [string, string]
  /** Finger per note, aligned to `notes`. */
  fingers?: (number | null)[]
}

export function isBlackKey(name: string): boolean {
  const pc = PITCH_CLASS[name]
  return pc !== undefined && BLACK.has(pc)
}

/** Split "A♭3" into its pitch class and octave; a bare "A♭" has no octave. */
export function parseNote(note: string): { pc: number; octave: number | null } {
  const match = /^([A-G][♯♭]?)(-?\d+)?$/.exec(note)
  if (!match) throw new Error(`unknown note "${note}"`)
  const pc = PITCH_CLASS[match[1]]
  if (pc === undefined) throw new Error(`unknown note "${note}"`)
  return { pc, octave: match[2] === undefined ? null : Number(match[2]) }
}

export function pitchOf(note: string, fallbackOctave: number): number {
  const { pc, octave } = parseNote(note)
  return (octave ?? fallbackOctave) * 12 + pc
}

/**
 * Absolute pitches for the notes. Anything carrying its own octave lands there;
 * anything bare is placed at the next occurrence above the note before it.
 */
export function ascend(notes: string[], startOctave = 4): number[] {
  const out: number[] = []
  for (const note of notes) {
    const { pc, octave } = parseNote(note)
    if (octave !== null) {
      out.push(octave * 12 + pc)
      continue
    }
    if (out.length === 0) {
      out.push(startOctave * 12 + pc)
      continue
    }
    const previous = out[out.length - 1]
    let pitch = Math.floor(previous / 12) * 12 + pc
    while (pitch <= previous) pitch += 12
    out.push(pitch)
  }
  return out
}

function downToWhite(pitch: number): number {
  let p = pitch
  while (BLACK.has(((p % 12) + 12) % 12)) p--
  return p
}

function upToWhite(pitch: number): number {
  let p = pitch
  while (BLACK.has(((p % 12) + 12) % 12)) p++
  return p
}

export function layoutKeyboard(notes: string[], options: LayoutOptions = {}): KeyboardLayout {
  const { startOctave = 4, span, fingers } = options
  const pitches = ascend(notes, startOctave)

  const marked = new Map<number, number>()
  pitches.forEach((p, i) => {
    if (!marked.has(p)) marked.set(p, i)
  })

  let from: number
  let to: number

  if (span) {
    from = downToWhite(pitchOf(span[0], startOctave))
    to = upToWhite(pitchOf(span[1], startOctave))
  } else {
    from = downToWhite(Math.min(...pitches))
    to = upToWhite(Math.max(...pitches))
    // Open it out to at least an octave so the notes have something to sit against.
    while (to - from < MIN_SEMITONES) {
      to = upToWhite(to + 1)
      if (to - from < MIN_SEMITONES) from = downToWhite(from - 1)
    }
  }

  const keys: KeyboardKey[] = []
  let whites = 0

  for (let pitch = from; pitch <= to; pitch++) {
    const pc = ((pitch % 12) + 12) % 12
    const order = marked.get(pitch)
    const highlight: Highlight = order === undefined ? 'none' : order === 0 ? 'root' : 'on'
    const name = order === undefined ? (WHITE_NAME[pc] ?? '') : notes[order].replace(/-?\d+$/, '')
    const finger = order === undefined ? undefined : (fingers?.[order] ?? undefined)

    if (BLACK.has(pc)) {
      keys.push({
        pitch, name, isBlack: true,
        x: whites * KEY_W - BLACK_W / 2 + (BLACK_NUDGE[pc] ?? 0),
        width: BLACK_W, height: BLACK_H, highlight, order,
        finger: finger ?? undefined,
      })
    } else {
      keys.push({
        pitch, name, isBlack: false,
        x: whites * KEY_W, width: KEY_W, height: KEY_H, highlight, order,
        finger: finger ?? undefined,
      })
      whites++
    }
  }

  // White keys first, so the black ones draw over them.
  keys.sort((a, b) => Number(a.isBlack) - Number(b.isBlack))

  return { keys, width: whites * KEY_W, height: KEY_H }
}
