import type { KeyName } from './keys'

/**
 * Fingerings for the material in each block.
 *
 * Two different kinds of thing live here, and the distinction matters:
 *
 *  - MAJOR_SCALES is the standard fingering taught in method books. It is
 *    settled, and the same in every edition you will find.
 *  - Everything else is convention. Arpeggio and voicing fingerings vary with
 *    hand size and with what comes next in the phrase, so they are offered as
 *    a starting point rather than as the answer, and labelled that way in the
 *    UI. Where a scale type has no standard fingering at all — blues,
 *    pentatonic — the guidance says so instead of inventing one.
 *
 * The published fingerings hold throughout, including the one place where they
 * appear to break their own rule: G♭ major's left hand ends 4-3-2-1, putting
 * the thumb on the G♭ at the octave. That is the standard, it is intentional,
 * and it is not a typo to be tidied up — the hand leaves the scale there, so
 * the thumb-off-black-keys principle has nothing left to protect. The test
 * exempts the octave note for this reason and no other.
 */

export interface ScaleFingering {
  /** Tonic to tonic, ascending — eight note names. */
  notes: string[]
  /** Right hand, ascending, one per note. */
  rh: number[]
  /** Left hand, ascending, one per note. */
  lh: number[]
}

export const MAJOR_SCALES: Record<KeyName, ScaleFingering> = {
  'C':  { notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],       rh: [1, 2, 3, 1, 2, 3, 4, 5], lh: [5, 4, 3, 2, 1, 3, 2, 1] },
  'G':  { notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F♯', 'G'],      rh: [1, 2, 3, 1, 2, 3, 4, 5], lh: [5, 4, 3, 2, 1, 3, 2, 1] },
  'D':  { notes: ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯', 'D'],     rh: [1, 2, 3, 1, 2, 3, 4, 5], lh: [5, 4, 3, 2, 1, 3, 2, 1] },
  'A':  { notes: ['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯', 'A'],    rh: [1, 2, 3, 1, 2, 3, 4, 5], lh: [5, 4, 3, 2, 1, 3, 2, 1] },
  'E':  { notes: ['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯', 'E'],   rh: [1, 2, 3, 1, 2, 3, 4, 5], lh: [5, 4, 3, 2, 1, 3, 2, 1] },
  'B':  { notes: ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯', 'B'],  rh: [1, 2, 3, 1, 2, 3, 4, 5], lh: [4, 3, 2, 1, 4, 3, 2, 1] },
  'F':  { notes: ['F', 'G', 'A', 'B♭', 'C', 'D', 'E', 'F'],      rh: [1, 2, 3, 4, 1, 2, 3, 4], lh: [5, 4, 3, 2, 1, 3, 2, 1] },
  'B♭': { notes: ['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A', 'B♭'],    rh: [2, 1, 2, 3, 1, 2, 3, 4], lh: [3, 2, 1, 4, 3, 2, 1, 3] },
  'E♭': { notes: ['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D', 'E♭'],   rh: [3, 1, 2, 3, 4, 1, 2, 3], lh: [3, 2, 1, 4, 3, 2, 1, 3] },
  'A♭': { notes: ['A♭', 'B♭', 'C', 'D♭', 'E♭', 'F', 'G', 'A♭'],  rh: [3, 4, 1, 2, 3, 1, 2, 3], lh: [3, 2, 1, 4, 3, 2, 1, 3] },
  'D♭': { notes: ['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C', 'D♭'], rh: [2, 3, 1, 2, 3, 4, 1, 2], lh: [3, 2, 1, 4, 3, 2, 1, 3] },
  'G♭': { notes: ['G♭', 'A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F', 'G♭'], rh: [2, 3, 4, 1, 2, 3, 1, 2], lh: [4, 3, 2, 1, 4, 3, 2, 1] },
}

/** The black keys, by the spellings used above. */
export const BLACK_KEYS = new Set(['C♯', 'D♭', 'D♯', 'E♭', 'F♯', 'G♭', 'G♯', 'A♭', 'A♯', 'B♭'])

export interface Guidance {
  /** What this line is about, e.g. "Modes" or "Shell voicings". */
  label: string
  text: string
}

/**
 * How to finger each unit's scale material. Modes and the melodic minor family
 * are all reached from a parent major scale, so the note is usually "keep the
 * thumb where it already was" rather than a new set of numbers.
 */
export const SCALE_GUIDANCE: Record<number, Guidance[]> = {
  1: [
    {
      label: 'Arpeggios',
      text: 'Root position RH 1-2-3-5, LH 5-3-2-1. Each inversion rotates that: whichever note is now on the bottom takes the thumb going up in the right hand, the fifth going up in the left.',
    },
  ],
  2: [
    {
      label: 'Modes',
      text: 'A mode uses its parent major scale’s fingering. Dorian on the 2nd degree keeps the thumb on the same notes as the parent — do not re-finger it from its own tonic, or you lose the connection the whole unit is teaching.',
    },
    {
      label: 'In 3rds',
      text: 'Keep the scale fingering underneath and let the hand reach the third — the thumb still falls where the plain scale puts it. If you re-finger, the pattern stops transferring back to the straight scale.',
    },
  ],
  3: [
    {
      label: 'Dorian',
      text: 'Parent major scale fingering, started on the 2nd degree.',
    },
    {
      label: 'm7 arpeggios',
      text: 'RH 1-2-3-5, LH 5-3-2-1 in root position. On shapes with black keys, put 2 or 3 on the black note and keep the thumb on white — that rule decides most inversions for you.',
    },
  ],
  4: [
    {
      label: 'Mixolydian',
      text: 'Parent major scale fingering, started on the 5th degree.',
    },
    {
      label: 'Bebop scale',
      text: 'Eight notes to the octave, so the plain scale fingering does not fit. Add the passing tone to the group the hand is already in — usually an extra 3 or 4 before the thumb crosses, never an extra thumb.',
    },
  ],
  5: [
    {
      label: 'Minor family',
      text: 'Natural minor takes the relative major’s fingering. Harmonic and melodic minor keep that same fingering — only the notes change, not the hand, which is exactly why they are practised back to back.',
    },
  ],
  6: [
    {
      label: 'Altered',
      text: 'It is melodic minor from a half step above, so finger it as that melodic minor scale. Do not work out a new fingering from the dominant’s root.',
    },
  ],
  7: [
    {
      label: 'Half-whole diminished',
      text: 'Symmetrical, so the fingering repeats every minor third: RH 1-2-3-1-2-3-4-5 works from any root by treating each three-note group the same. Thumb on white where the shape allows.',
    },
    {
      label: 'dim7 arpeggios',
      text: 'RH 1-2-3-5, LH 5-3-2-1, moving up in minor thirds. Three shapes cover all twelve roots.',
    },
  ],
  8: [
    {
      label: 'Blues & pentatonic',
      text: 'No standard fingering exists for these, and that is not an oversight — they are idiomatic, and players finger them to suit the lick. Start with RH 1-2-3-1-2-3 and adjust so the ♭5 falls under a strong finger.',
    },
  ],
  9: [
    {
      label: 'All qualities',
      text: 'RH 1-2-3-5, LH 5-3-2-1 as the default for every 7th-chord arpeggio; keep the thumb off black keys and let 2 and 3 take them.',
    },
  ],
  10: [
    {
      label: 'Everything',
      text: 'By now the fingering should be automatic in all twelve. If a key still needs thinking about, that is the key to spend the session on.',
    },
  ],
}

/** How to finger each unit's voicing material. */
export const VOICING_GUIDANCE: Record<number, Guidance[]> = {
  1: [{ label: 'Shells', text: 'Left hand 5-3-1 on every 1-3-7 shape, whatever the chord quality — that is the point of stacking them this way. Two-note shells are 5-3 for a root-plus-third and 5-1 for a root-plus-seventh.' }],
  2: [{ label: 'Shells + extensions', text: 'Left hand 5-3-1 as unit 1. Right hand takes the 9 and 13 with 1 and 5, or 2 and 5 if the reach is awkward — keep the wrist level rather than stretching from the knuckles.' }],
  3: [{ label: 'Rootless A and B', text: 'Four notes in one hand: 1-2-3-5 going up. Form B often needs 1-2-4-5 instead, because the gap sits between the second and third notes rather than the third and fourth.' }],
  4: [{ label: 'Rootless B', text: '1-2-4-5 for the four notes. The walking bass underneath is fingered as a line, not a chord — 2 and 3 for chromatic approaches so the thumb stays free for the target root.' }],
  5: [{ label: 'Minor ii–V–i', text: 'Identical to the major ii–V–I — the m7♭5 shell is the same three notes as a plain m7, so it stays 5-3-1 and your left hand does not learn anything new. Voice the m6/9 with 1-2-3-5 in the right hand.' }],
  6: [{ label: 'Altered dominants', text: 'Left hand holds 3 and 7 with 5 and 1. The alterations go in the right hand with 1-2-3-5 — never try to take the ♭9 and ♭13 in the same hand as the shell.' }],
  7: [{ label: 'Upper structures', text: 'Right hand plays a plain major triad: 1-3-5 root position, 1-2-5 for first inversion, 1-3-5 for second. Left hand keeps the shell on 5 and 1. The point is that all four triads are the same shape in a different place.' }],
  8: [{ label: 'Blues comping', text: 'Shells in the left hand as before. Tritone subs in the last four bars keep the same 5-3-1 shape a tritone away — the fingers do not change, only where the hand sits.' }],
  9: [{ label: 'Block chords', text: 'Four-way close is 1-2-3-5 in the right hand with the melody on 5. Dropping the second voice from the top hands that note to the left hand — the right hand then plays 1-2-4 or 1-3-5 depending on the gap.' }],
  10: [{ label: 'The full ladder', text: 'Each voicing type keeps the fingering it had in its own unit. If one of them still feels unfamiliar, go back to that unit rather than pushing through here.' }],
}

/** Fingering notes for the warm-up, which is the same shape every session. */
export const WARMUP_GUIDANCE: Guidance[] = [
  {
    label: 'Contrary motion',
    text: 'Both thumbs start on the tonic and mirror each other, so the same finger number sounds in both hands at once. That is the whole reason contrary motion is the warm-up — the fingering is symmetrical, so you can watch tone instead of counting.',
  },
]

/** What to show under a given block. Blocks with nothing useful to say get nothing. */
export function guidanceFor(unitId: number, blockId: string): Guidance[] {
  switch (blockId) {
    case 'warmup':
      return WARMUP_GUIDANCE
    case 'scales':
      return SCALE_GUIDANCE[unitId] ?? []
    case 'voicings':
      return VOICING_GUIDANCE[unitId] ?? []
    default:
      return []
  }
}

/** The scale diagram belongs to blocks that are actually playing scales. */
export function showsScale(blockId: string): boolean {
  return blockId === 'warmup' || blockId === 'scales'
}
