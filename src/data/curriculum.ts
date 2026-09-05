import { CYCLE_OF_FOURTHS, KEYS, nextKey, type KeyName } from './keys'

/**
 * A hundred sessions, in order, level 4 to level 6.
 *
 * Ten units of ten. Each unit introduces one body of material and every unit
 * walks the same ten-step arc — introduce, hands together, rearrange, first
 * tempo pass, push, apply, transpose, combine, speed, consolidate. The arc is
 * deliberately identical across units: it is the learning cycle, not filler,
 * and knowing what tomorrow's shape will be is what makes the sequence
 * followable for months.
 *
 * The key advances one step around the cycle of fourths per session, so each
 * key comes round roughly eight times across the hundred, always paired with
 * different material.
 */

export interface Unit {
  id: number
  name: string
  level: string
  goal: string
  /** Wiki slugs this unit builds on. */
  wiki: string[]
  scales: (key: KeyName) => string[]
  voicings: (key: KeyName) => string[]
  independence: string[]
  tune: (key: KeyName) => string[]
}

export const UNITS: Unit[] = [
  {
    id: 1,
    name: 'Ground floor',
    level: '4.0',
    goal: 'Every major scale clean and even, and a shell voicing under every chord.',
    wiki: ['cycle-of-fourths', 'major-scale-modes', 'shell-voicings', 'tempo-targets'],
    scales: (k) => [
      `${k} major, four octaves, hands together, eighth notes`,
      `${KEYS[k].I} arpeggio, all four inversions, four octaves`,
    ],
    voicings: (k) => [
      `Shells on the major ii–V–I in ${k}: 1-7-3 on ${KEYS[k].ii}, 1-3-7 on ${KEYS[k].V}, 1-7-3 on ${KEYS[k].I}`,
      'Watch the guide tones — the 7th of the ii falls a half step to the 3rd of the V. If your hand leaps, the shapes are in the wrong order.',
    ],
    independence: [
      'Charleston ostinato — left hand on beat 1 and the and-of-2, right hand running steady eighths',
    ],
    tune: () => ['Autumn Leaves — melody alone, in time, from memory. No chart.'],
  },
  {
    id: 2,
    name: 'The parent scale',
    level: '4.2',
    goal: 'Modes heard as degrees of one scale, and the first scales in 3rds.',
    wiki: ['major-scale-modes', 'shell-voicings'],
    scales: (k) => [
      `${k} major in 3rds, up and down — the level-5 requirement`,
      `Dorian on the 2nd degree, Lydian on the 4th, Mixolydian on the 5th, two octaves each`,
    ],
    voicings: (k) => [
      `Shells in ${k} with the 9 and the 13 added in the right hand`,
      'Four notes, one rule, and it already sounds professional. Keep the left hand quiet.',
    ],
    independence: ['Charleston ostinato displaced by an eighth — all four positions'],
    tune: () => ['Autumn Leaves — shells in the left hand, melody in the right, slow enough that the bridge never stumbles'],
  },
  {
    id: 3,
    name: 'Rootless',
    level: '4.4',
    goal: 'Both Bill Evans forms, voice-led so the top note barely moves.',
    wiki: ['rootless-voicings', 'shell-voicings'],
    scales: (k) => [
      `${k} major and Dorian in 3rds, four octaves`,
      `${KEYS[k].ii} arpeggio, all inversions — every m7 shape under the hand`,
    ],
    voicings: (k) => [
      `Rootless form A through the ii–V–I in ${k}, then the whole thing again in form B`,
      'Watch only the top note. Step or stay put across all three chords, or you picked the wrong form.',
    ],
    independence: ['Left hand roots on beats 1 and 3 under right-hand rootless voicings'],
    tune: () => ['Blue Bossa — melody from memory, then comping in rootless A behind it'],
  },
  {
    id: 4,
    name: 'The dominant',
    level: '4.6',
    goal: 'Mixolydian, the bebop scale, and chord tones landing on downbeats by themselves.',
    wiki: ['bebop-scales', 'major-scale-modes', 'hand-independence'],
    scales: (k) => [
      `Mixolydian on ${KEYS[k].V}, four octaves`,
      `Dominant bebop descending from the root — the natural 7 as a passing tone. Every downbeat a chord tone.`,
      `${KEYS[k].V} arpeggio with the 9th on top, all inversions`,
    ],
    voicings: (k) => [
      `Rootless B with the 13 on ${KEYS[k].V}`,
      `The ii–V–I in ${k}, then straight into ${nextKey(k)} without stopping`,
    ],
    independence: ['Walking bass in quarter notes under right-hand comping — ♩=60, and refuse to go faster'],
    tune: () => ['Take the A Train — head, then two choruses of comping recorded on your phone, then solo over it'],
  },
  {
    id: 5,
    name: 'Minor territory',
    level: '4.8',
    goal: 'The three minors told apart by ear, and the minor ii–V–i in the hands.',
    wiki: ['melodic-minor-family', 'minor-two-five-one'],
    scales: (k) => [
      `${k} natural, harmonic and melodic minor, same tonic, no pause between — hear which note moved`,
      `${KEYS[k].halfDim} arpeggio, all inversions, four octaves`,
    ],
    voicings: (k) => [
      `Minor ii–V–i in ${k}: ${KEYS[k].halfDim} → ${KEYS[k].altered} → ${KEYS[k].minorI}`,
      'Shells first, then rootless. Voice the tonic as m6/9, not m7 — the natural 6 is what makes it resolve.',
    ],
    independence: ['Walking bass under a minor ii–V–i, approaching every root chromatically'],
    tune: () => ['Beautiful Love — head and every minor ii–V–i in it, hands together'],
  },
  {
    id: 6,
    name: 'Altered',
    level: '5.0',
    goal: 'One scale that carries every alteration, on every dominant, without thinking.',
    wiki: ['melodic-minor-family', 'minor-two-five-one'],
    scales: (k) => [
      `Altered scale on ${KEYS[k].V} — melodic minor from a half step above the root`,
      `Lydian dominant on the same root, back to back, for the contrast`,
    ],
    voicings: (k) => [
      `${KEYS[k].altered} voiced with the ♭9 and ♭13 on top`,
      `Then the tritone sub in place of ${KEYS[k].V} — same guide tones, new root`,
    ],
    independence: ['Walking bass at ♩=80, right hand comping on the offbeats only'],
    tune: () => ['Solar — improvise using nothing but the altered scale over every dominant'],
  },
  {
    id: 7,
    name: 'Upper structures',
    level: '5.2',
    goal: 'Four triads over any dominant, grabbed as shapes rather than worked out.',
    wiki: ['upper-structure-triads', 'diminished-and-blues'],
    scales: (k) => [
      `Half-whole diminished from ${KEYS[k].V} — ♭9, ♯9 and ♯11 at once`,
      'Diminished 7th arpeggios — three shapes cover all twelve roots, prove it again',
    ],
    voicings: (k) => {
      const [flatII, VI, flatVI, II] = KEYS[k].upperStructures
      return [
        `Left hand on the shell of ${KEYS[k].V}; right hand plays ${flatII}, then ${VI}, then ${flatVI}, then ${II}`,
        `${flatII} gives ♭9/11/♭13 · ${VI} gives 13/♭9/3 · ${flatVI} gives ♭13/root/♯9 · ${II} gives 9/♯11/13`,
      ]
    },
    independence: ['3-over-2 — tap it first, then left hand quarters against right hand triplets, then swap hands'],
    tune: () => ['There Will Never Be Another You — an upper structure on every dominant in the form'],
  },
  {
    id: 8,
    name: 'Blues & symmetry',
    level: '5.4',
    goal: 'The idiom that has no theory behind it, next to the scales that are nothing but.',
    wiki: ['diminished-and-blues', 'bebop-scales'],
    scales: (k) => [
      `${k} blues scale and minor pentatonic, four octaves, then in 3rds`,
      `Whole tone from ${KEYS[k].V}, two octaves`,
    ],
    voicings: (k) => [
      `Blues in ${k} — the quick IV in bar 2, the turnaround in 11 and 12`,
      'Tritone subs through the last four bars',
    ],
    independence: ['4-over-3 — tapped first, then played. Then displace the melody by a half beat for a full chorus.'],
    tune: (k) => [`Blues in ${k} — twelve choruses, one idea developed across all of them`],
  },
  {
    id: 9,
    name: 'Solo piano',
    level: '5.6',
    goal: 'Melody, harmony and bass under two hands at the same time.',
    wiki: ['rootless-voicings', 'upper-structure-triads', 'hand-independence'],
    scales: (k) => [
      `${k} in 3rds at ♩=112, four octaves`,
      'Every arpeggio quality on the tonic — maj7, m7, dom7, m7♭5, dim7 — all inversions',
    ],
    voicings: () => [
      'Block chords — harmonize the melody four-way close, then drop the second voice from the top',
      'Add the 6th-diminished passing chords underneath',
    ],
    independence: ['Bach two-part invention No. 1, 8 or 13 — sixteen bars, each hand to memory, then together at half tempo'],
    tune: () => ['Someday My Prince Will Come — a full arrangement: intro, head, one chorus, ending'],
  },
  {
    id: 10,
    name: 'Fluency',
    level: '5.8',
    goal: 'Everything, in every key, at tempo, without a chart in front of you.',
    wiki: ['cycle-of-fourths', 'tempo-targets', 'major-scale-modes', 'melodic-minor-family'],
    scales: (k) => [
      `${k} at ♩=120 — major, Dorian, dominant bebop, altered, blues`,
      'Each of them in 3rds before you move on. This is the level-6 bar.',
    ],
    voicings: (k) => [
      `The whole ladder in ${k}: shells, rootless A, rootless B, upper structures, block chords`,
      'Same progression, five ways, no pause between them',
    ],
    independence: ['Walking bass, comping and melody all at once, ♩=100'],
    tune: () => ['All the Things You Are — solo piano, then the head in two more keys by ear'],
  },
]

export interface Variant {
  name: string
  aim: string
  scales: string
  voicings: string
  independence: string
  tune: string
}

/** The ten-step arc every unit walks. Position in the unit, not the calendar. */
export const VARIANTS: Variant[] = [
  {
    name: 'Introduce',
    aim: 'Meet the material. Slowly, hands apart, no metronome.',
    scales: 'Hands separately, no click, as slow as it takes to be perfect',
    voicings: 'Left hand alone until the shape is automatic, then right hand alone',
    independence: 'Each hand on its own first. Do not combine them today.',
    tune: 'Listen to a recording of it twice before you touch the keys',
  },
  {
    name: 'Hands together',
    aim: 'Combine, at half the tempo you think you need.',
    scales: 'Hands together at half your target tempo, no exceptions',
    voicings: 'Both hands, slowly, watching the voice leading rather than the chord symbols',
    independence: 'Both hands, half tempo, stopping the moment it gets ragged',
    tune: 'Melody in time, from memory, no chart',
  },
  {
    name: 'Rearrange',
    aim: 'Break the material out of the pattern you learned it in.',
    scales: 'In 3rds — up a third, down a third — and starting from a degree other than the root',
    voicings: 'Start the progression from the V, then from the I. Same voicings, new entry point.',
    independence: 'Displace the left hand by an eighth note and hold it there',
    tune: 'Start at the bridge. If you can only enter at bar 1, you do not know it.',
  },
  {
    name: 'First tempo pass',
    aim: 'The metronome joins, on 2 and 4.',
    scales: 'Click on 2 and 4. Find the fastest clean tempo and write the number down.',
    voicings: 'In time, comping rhythm rather than block-on-the-beat',
    independence: 'With the click, on the backbeat only',
    tune: 'One chorus in tempo, mistakes and all, without stopping',
  },
  {
    name: 'Push',
    aim: 'Four bpm past yesterday. Two mistakes and you drop six.',
    scales: 'Yesterday’s clean tempo plus 4 bpm. Break down twice and take it back 6.',
    voicings: 'At the new tempo, left hand only, then hands together',
    independence: 'Same drill, 4 bpm faster, no loss of evenness',
    tune: 'Two choruses at the new tempo',
  },
  {
    name: 'Apply',
    aim: 'Take it out of the exercise and into the music.',
    scales: 'Only as much scale work as it takes to warm up — the material goes into the tune today',
    voicings: 'Voice the whole tune with this unit’s voicings, no others',
    independence: 'Run the drill underneath the tune rather than on its own',
    tune: 'Improvise three choruses using only this unit’s material. Constraint is the point.',
  },
  {
    name: 'Transpose',
    aim: 'A fourth up, by ear rather than by shape.',
    scales: 'Same material a fourth above today’s key, worked out by ear',
    voicings: 'The progression a fourth up without writing anything down',
    independence: 'Same drill in the new key',
    tune: 'The head a fourth up. Relearn it by ear — do not transpose shapes.',
  },
  {
    name: 'Combine',
    aim: 'Fold in the previous unit so nothing decays behind you.',
    scales: 'Alternate this unit’s scales with the previous unit’s, bar for bar',
    voicings: 'Alternate voicing types chorus by chorus — this unit, then the last one',
    independence: 'Today’s drill for one chorus, the previous unit’s for the next',
    tune: 'Play the tune twice: once with the old material, once with the new',
  },
  {
    name: 'Speed',
    aim: 'All twelve keys, two octaves, no stopping.',
    scales: 'This unit’s scales in all twelve keys, two octaves, around the cycle of fourths. Keep going through mistakes.',
    voicings: 'The ii–V–I in all twelve keys, four bars each, no pause between',
    independence: 'Two minutes unbroken. Speed is not the point — not stopping is.',
    tune: 'One chorus at the fastest tempo you can hold',
  },
  {
    name: 'Consolidate',
    aim: 'Nothing new. Record a take and listen to it twice.',
    scales: 'Your three slowest keys from this unit, at a comfortable tempo',
    voicings: 'The progression you find hardest, ten times, slowly',
    independence: 'The drill you avoided most this unit',
    tune: 'Record a full take. Listen twice before you decide anything about it.',
  },
]

export interface RegimenBlock {
  id: string
  title: string
  /** Share of the session length; the five weights sum to 1. */
  weight: number
  items: string[]
}

export interface Regimen {
  number: number
  unit: Unit
  variant: Variant
  key: KeyName
  title: string
  level: string
  blocks: RegimenBlock[]
}

export const TOTAL_REGIMENS = UNITS.length * VARIANTS.length

/** Level runs 4.0 to 6.0 across the hundred, two decimal steps per unit. */
function levelFor(index: number): string {
  return (4 + (index / TOTAL_REGIMENS) * 2).toFixed(1)
}

/** Build regimen `n` (1-based). Deterministic — no clock, no calendar. */
export function getRegimen(n: number): Regimen {
  const index = Math.min(Math.max(Math.trunc(n), 1), TOTAL_REGIMENS) - 1
  const unit = UNITS[Math.floor(index / VARIANTS.length)]
  const variant = VARIANTS[index % VARIANTS.length]
  const key = CYCLE_OF_FOURTHS[index % CYCLE_OF_FOURTHS.length]
  const previous = UNITS[Math.max(0, unit.id - 2)]

  const blocks: RegimenBlock[] = [
    {
      id: 'warmup',
      title: 'Warm-up',
      weight: 0.1,
      items: [
        `Contrary motion from ${key}, two octaves out and back, thumbs together`,
        'Chord, let the arm weight drop, release completely. Ten times, no metronome.',
      ],
    },
    {
      id: 'scales',
      title: 'Scales & arpeggios',
      weight: 0.22,
      items: [...unit.scales(key), variant.scales],
    },
    {
      id: 'voicings',
      title: 'Voicings',
      weight: 0.24,
      items: [...unit.voicings(key), variant.voicings],
    },
    {
      id: 'independence',
      title: 'Hand independence',
      weight: 0.18,
      items: [
        ...unit.independence,
        variant.name === 'Combine'
          ? `${variant.independence} (unit ${previous.id}: ${previous.independence[0]})`
          : variant.independence,
      ],
    },
    {
      id: 'tune',
      title: 'The tune',
      weight: 0.26,
      items: [...unit.tune(key), variant.tune],
    },
  ]

  return {
    number: index + 1,
    unit,
    variant,
    key,
    title: `${unit.name} · ${variant.name}`,
    level: levelFor(index),
    blocks,
  }
}

/** All hundred, in order. */
export function allRegimens(): Regimen[] {
  return Array.from({ length: TOTAL_REGIMENS }, (_, i) => getRegimen(i + 1))
}

/** Split a session length across the blocks so the minutes add up exactly. */
export function minutesFor(blocks: RegimenBlock[], total: number): number[] {
  const mins = blocks.map((b) => Math.max(3, Math.round(total * b.weight)))
  const sum = mins.reduce((a, b) => a + b, 0)
  mins[mins.length - 1] += total - sum
  return mins
}

export const SESSION_LENGTHS = [30, 45, 60, 90] as const
