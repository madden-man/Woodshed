/**
 * Geometry for the little keyboard diagrams in the wiki.
 *
 * Notes come in as names, in the order you play them, and are laid out
 * ascending — each one at the next occurrence of its pitch class above the
 * last. That is the same rule the shell voicings use, so "D, F, C" draws D and
 * F together with the C an octave up, exactly as it sits under the hand.
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

/** Pitch classes with a black key. */
const BLACK = new Set([1, 3, 6, 8, 10])

/** Letter name of each white pitch class, for keys the caller didn't name. */
const WHITE_NAME: Record<number, string> = { 0: 'C', 2: 'D', 4: 'E', 5: 'F', 7: 'G', 9: 'A', 11: 'B' }

export const KEY_W = 22
export const KEY_H = 86
export const BLACK_W = 13
export const BLACK_H = 53

/**
 * How far a black key sits off the boundary between its neighbours, in pixels.
 * Real keyboards splay them outward within each group; centring them all looks
 * subtly wrong, and this is enough to fix it.
 */
const BLACK_NUDGE: Record<number, number> = { 1: -1.5, 3: 1.5, 6: -2, 8: 0, 10: 2 }

export type Highlight = 'none' | 'root' | 'on'

export interface KeyboardKey {
  pitch: number
  /** The spelling to show — the caller's if they named it, else the letter. */
  name: string
  isBlack: boolean
  x: number
  width: number
  height: number
  highlight: Highlight
  /** Where this note falls in the caller's list, for ordered labels. */
  order?: number
}

export interface KeyboardLayout {
  keys: KeyboardKey[]
  width: number
  height: number
}

export function isBlackKey(name: string): boolean {
  const pc = PITCH_CLASS[name]
  return pc !== undefined && BLACK.has(pc)
}

/** Place the named notes ascending, each above the last. Returns absolute pitches. */
export function ascend(notes: string[], startOctave = 4): number[] {
  const out: number[] = []
  for (const name of notes) {
    const pc = PITCH_CLASS[name]
    if (pc === undefined) throw new Error(`unknown note "${name}"`)
    if (out.length === 0) {
      out.push(startOctave * 12 + pc)
      continue
    }
    let pitch = Math.floor(out[out.length - 1] / 12) * 12 + pc
    while (pitch <= out[out.length - 1]) pitch += 12
    out.push(pitch)
  }
  return out
}

/**
 * Draw just enough keyboard to hold the notes, from the white key at or below
 * the lowest to the white key at or above the highest. Starting from the C
 * below instead would waste most of an octave whenever the lowest note is a B,
 * and these diagrams have to stay readable on a phone. Both ends land on white
 * keys so no black key is ever drawn half off the edge.
 */
export function layoutKeyboard(notes: string[], startOctave = 4): KeyboardLayout {
  const pitches = ascend(notes, startOctave)
  const marked = new Map<number, number>()
  pitches.forEach((p, i) => {
    if (!marked.has(p)) marked.set(p, i)
  })

  let lowest = Math.min(...pitches)
  let highest = Math.max(...pitches)
  // Land on white keys at both ends, so no black key is drawn half off the edge.
  while (BLACK.has(((lowest % 12) + 12) % 12)) lowest--
  while (BLACK.has(((highest % 12) + 12) % 12)) highest++

  const from = lowest

  const keys: KeyboardKey[] = []
  let whites = 0

  for (let pitch = from; pitch <= highest; pitch++) {
    const pc = ((pitch % 12) + 12) % 12
    const order = marked.get(pitch)
    const highlight: Highlight = order === undefined ? 'none' : order === 0 ? 'root' : 'on'
    const name = order === undefined ? (WHITE_NAME[pc] ?? '') : notes[order]

    if (BLACK.has(pc)) {
      // Sits over the join between the white key just placed and the next.
      keys.push({
        pitch,
        name,
        isBlack: true,
        x: whites * KEY_W - BLACK_W / 2 + (BLACK_NUDGE[pc] ?? 0),
        width: BLACK_W,
        height: BLACK_H,
        highlight,
        order,
      })
    } else {
      keys.push({
        pitch,
        name,
        isBlack: false,
        x: whites * KEY_W,
        width: KEY_W,
        height: KEY_H,
        highlight,
        order,
      })
      whites++
    }
  }

  // White keys first so the black ones draw over them.
  keys.sort((a, b) => Number(a.isBlack) - Number(b.isBlack))

  return { keys, width: whites * KEY_W, height: KEY_H }
}
