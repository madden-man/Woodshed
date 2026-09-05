/**
 * The twelve keys and the harmony that hangs off each one.
 * This is the domain model the wiki and the daily regimen both read from.
 */

export const CYCLE_OF_FOURTHS = [
  'C', 'F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'B', 'E', 'A', 'D', 'G',
] as const

export type KeyName = (typeof CYCLE_OF_FOURTHS)[number]

export interface KeyInfo {
  /** Major ii - V - I */
  ii: string
  V: string
  I: string
  /** Minor ii - V - i */
  halfDim: string
  altered: string
  minorI: string
  /** Right-hand major triads over the V, in order: ♭II, VI, ♭VI, II */
  upperStructures: [string, string, string, string]
}

export const KEYS: Record<KeyName, KeyInfo> = {
  'C':  { ii: 'Dm7',  V: 'G7',  I: 'Cmaj7',  halfDim: 'Dm7♭5',  altered: 'G7alt',  minorI: 'Cm6/9',  upperStructures: ['A♭', 'E', 'E♭', 'A'] },
  'F':  { ii: 'Gm7',  V: 'C7',  I: 'Fmaj7',  halfDim: 'Gm7♭5',  altered: 'C7alt',  minorI: 'Fm6/9',  upperStructures: ['D♭', 'A', 'A♭', 'D'] },
  'B♭': { ii: 'Cm7',  V: 'F7',  I: 'B♭maj7', halfDim: 'Cm7♭5',  altered: 'F7alt',  minorI: 'B♭m6/9', upperStructures: ['G♭', 'D', 'D♭', 'G'] },
  'E♭': { ii: 'Fm7',  V: 'B♭7', I: 'E♭maj7', halfDim: 'Fm7♭5',  altered: 'B♭7alt', minorI: 'E♭m6/9', upperStructures: ['B', 'G', 'G♭', 'C'] },
  'A♭': { ii: 'B♭m7', V: 'E♭7', I: 'A♭maj7', halfDim: 'B♭m7♭5', altered: 'E♭7alt', minorI: 'A♭m6/9', upperStructures: ['E', 'C', 'B', 'F'] },
  'D♭': { ii: 'E♭m7', V: 'A♭7', I: 'D♭maj7', halfDim: 'E♭m7♭5', altered: 'A♭7alt', minorI: 'D♭m6/9', upperStructures: ['A', 'F', 'E', 'B♭'] },
  'G♭': { ii: 'A♭m7', V: 'D♭7', I: 'G♭maj7', halfDim: 'A♭m7♭5', altered: 'D♭7alt', minorI: 'G♭m6/9', upperStructures: ['D', 'B♭', 'A', 'E♭'] },
  'B':  { ii: 'C♯m7', V: 'F♯7', I: 'Bmaj7',  halfDim: 'C♯m7♭5', altered: 'F♯7alt', minorI: 'Bm6/9',  upperStructures: ['G', 'D♯', 'D', 'G♯'] },
  'E':  { ii: 'F♯m7', V: 'B7',  I: 'Emaj7',  halfDim: 'F♯m7♭5', altered: 'B7alt',  minorI: 'Em6/9',  upperStructures: ['C', 'G♯', 'G', 'C♯'] },
  'A':  { ii: 'Bm7',  V: 'E7',  I: 'Amaj7',  halfDim: 'Bm7♭5',  altered: 'E7alt',  minorI: 'Am6/9',  upperStructures: ['F', 'C♯', 'C', 'F♯'] },
  'D':  { ii: 'Em7',  V: 'A7',  I: 'Dmaj7',  halfDim: 'Em7♭5',  altered: 'A7alt',  minorI: 'Dm6/9',  upperStructures: ['B♭', 'F♯', 'F', 'B'] },
  'G':  { ii: 'Am7',  V: 'D7',  I: 'Gmaj7',  halfDim: 'Am7♭5',  altered: 'D7alt',  minorI: 'Gm6/9',  upperStructures: ['E♭', 'B', 'B♭', 'E'] },
}

export const UPPER_STRUCTURE_FUNCTIONS = [
  { degree: '♭II', gives: '♭9, 11, ♭13', color: 'full altered' },
  { degree: 'VI', gives: '13, ♭9, 3', color: 'bright and biting' },
  { degree: '♭VI', gives: '♭13, root, ♯9', color: 'the dark one' },
  { degree: 'II', gives: '9, ♯11, 13', color: 'lydian dominant' },
] as const

export function nextKey(key: KeyName): KeyName {
  const i = CYCLE_OF_FOURTHS.indexOf(key)
  return CYCLE_OF_FOURTHS[(i + 1) % 12]
}
