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
  /**
   * The standard this unit is aiming at. Context, not a daily instruction —
   * how to play a thing on any given day is the variant's business, so unit
   * material must never bake in hands-together, a tempo, or a metronome.
   */
  target: string
  /** Wiki slugs this unit builds on. */
  wiki: string[]
  scales: (key: KeyName) => string[]
  voicings: (key: KeyName) => string[]
  independence: (key: KeyName) => DrillSpec
  tune: (key: KeyName) => string[]
}

/**
 * An independence drill, specified properly. A rhythm on its own is not a
 * drill — you have to know what each hand is actually playing, over what, and
 * what going wrong looks like.
 */
export interface DrillSpec {
  name: string
  /** The notes the left hand plays, not just when it plays them. */
  leftHand: string
  /** The notes the right hand plays. */
  rightHand: string
  /** How the two line up in time. */
  rhythm: string
  /** The harmony or form it happens over. */
  over: string
  /** The failure this drill is usually failing at, so you can hear it. */
  watchFor: string
}

export const UNITS: Unit[] = [
  {
    id: 1,
    name: 'Ground floor',
    level: '4.0',
    goal: 'Every major scale clean and even, and a shell voicing under every chord.',
    target: 'Every major scale even at ♩=100, hands together.',
    wiki: ['chord-numbers', 'cycle-of-fourths', 'major-scale-modes', 'shell-voicings', 'tempo-targets'],
    scales: (k) => [
      `${k} major — four octaves up and back down, eighth notes, even tone throughout`,
      `${KEYS[k].I} arpeggio — root position, then 1st, 2nd and 3rd inversion, four octaves each`,
    ],
    voicings: (k) => [
      `Two-note shells first through the ii–V–I in ${k}: root plus the ♭3 on ${KEYS[k].ii}, root plus the ♭7 on ${KEYS[k].V}, root plus the 3rd on ${KEYS[k].I}. The guide tone holds, then drops a half step.`,
      `Then three-note shells, all 1-3-7: root, 3rd, 7th, bottom to top. Nothing wider than a 7th and the same 5-3-1 fingering on every chord.`,
    ],
    independence: (k) => ({
      name: 'Charleston ostinato',
      leftHand: `The shell of the chord, struck as a block — for ${KEYS[k].I} that is ${k}, the 7th above it, the 3rd above that. One shape, no movement.`,
      rightHand: `${k} major in unbroken eighth notes, four octaves, up and back down. It never stops or bumps.`,
      rhythm: 'Left hand plays beat 1 and the "and" of beat 2. Nothing on 3 or 4 — the silence is the drill.',
      over: `Eight bars on ${KEYS[k].I}, then the ii–V–I in ${k}, two bars a chord.`,
      watchFor: 'The right hand flinching where the left hand strikes. If the eighths bump at all, halve the tempo.',
    }),
    tune: () => ['Autumn Leaves — melody alone, in time, from memory. No chart.'],
  },
  {
    id: 2,
    name: 'The parent scale',
    level: '4.2',
    goal: 'Modes heard as degrees of one scale, and the first scales in 3rds.',
    target: 'The major scale in 3rds at ♩=88, and modes without stopping to work out the parent.',
    wiki: ['major-scale-modes', 'shell-voicings'],
    scales: (k) => [
      `${k} major in 3rds — up a third, down a third, four octaves`,
      `Dorian on the 2nd degree, Lydian on the 4th, Mixolydian on the 5th, two octaves each`,
    ],
    voicings: (k) => [
      `1-3-7 shells in ${k} with the 9 and the 13 added in the right hand`,
      'Five notes, one rule, and it already sounds professional. Keep the left hand quiet and let the right hand carry the colour.',
    ],
    independence: (k) => ({
      name: 'Displaced Charleston',
      leftHand: 'The same shells, but the two-hit pattern starts one eighth later each pass: beat 1, then the "and" of 1, then beat 2, then the "and" of 2.',
      rightHand: `${k} major in 3rds, four octaves, steady eighths throughout.`,
      rhythm: 'Four positions, eight bars each, no stopping in between. Count the position out loud on its first bar.',
      over: `The ii–V–I in ${k}, two bars a chord, round and round.`,
      watchFor: 'Losing track of which displacement you are in and drifting back to the easy one on beat 1.',
    }),
    tune: () => ['Autumn Leaves — shells in the left hand, melody in the right, slow enough that the bridge never stumbles'],
  },
  {
    id: 3,
    name: 'Rootless',
    level: '4.4',
    goal: 'Both Bill Evans forms, voice-led so the top note barely moves.',
    target: 'Rootless A and B on any ii–V–I, top voice moving by step or not at all.',
    wiki: ['chord-numbers', 'rootless-voicings', 'shell-voicings'],
    scales: (k) => [
      `${k} major and Dorian in 3rds, four octaves`,
      `${KEYS[k].ii} arpeggio, all inversions — every m7 shape under the hand`,
    ],
    voicings: (k) => [
      `Rootless form A through the ii–V–I in ${k}, then the whole thing again in form B`,
      'Watch only the top note. Step or stay put across all three chords, or you picked the wrong form.',
    ],
    independence: (k) => ({
      name: 'Roots under rootless',
      leftHand: `Single notes, roots only — ${KEYS[k].ii[0]}, then ${KEYS[k].V[0]}, then ${k}. No shell, no fifth, nothing else.`,
      rightHand: 'The rootless voicings themselves, form A: the 3rd, 5th, 7th and 9th of each chord as one four-note block.',
      rhythm: 'Left hand on beats 1 and 3. Right hand on the "and" of 2 and the "and" of 4 — the hands never sound together.',
      over: `ii–V–I in ${k}, two bars a chord.`,
      watchFor: 'The hands creeping into unison. If they ever land on the same eighth, the drill has stopped doing anything.',
    }),
    tune: () => ['Blue Bossa — melody from memory, then comping in rootless A behind it'],
  },
  {
    id: 4,
    name: 'The dominant',
    level: '4.6',
    goal: 'Mixolydian, the bebop scale, and chord tones landing on downbeats by themselves.',
    target: 'Dominant bebop at ♩=100, chord tones landing on the downbeats by themselves.',
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
    independence: (k) => ({
      name: 'Walking bass and comping',
      leftHand: `Quarter notes: the root on beat 1, two chord or scale tones on 2 and 3, then a note a half step above or below the next chord's root on beat 4. Through ${KEYS[k].ii} to ${KEYS[k].V}, that is root, 3rd, 5th, then a half step into ${KEYS[k].V[0]}.`,
      rightHand: `Rootless form B on each chord — one stab per bar to begin with, nothing more.`,
      rhythm: 'Left hand four to the bar, dead even. Right hand only on the "and" of 2.',
      over: `ii–V–I in ${k}, one bar a chord. ♩=60 the first time you meet this; after that the day’s step sets the tempo.`,
      watchFor: 'The bass line hesitating whenever the right hand plays. The left hand must not know the right hand exists.',
    }),
    tune: () => ['Take the A Train — head, then two choruses of comping recorded on your phone, then solo over it'],
  },
  {
    id: 5,
    name: 'Minor territory',
    level: '4.8',
    goal: 'The three minors told apart by ear, and the minor ii–V–i in the hands.',
    target: 'The minor ii–V–i in all twelve keys, from memory.',
    wiki: ['melodic-minor-family', 'minor-two-five-one'],
    scales: (k) => [
      `${k} natural, harmonic and melodic minor, same tonic, no pause between — hear which note moved`,
      `${KEYS[k].halfDim} arpeggio, all inversions, four octaves`,
    ],
    voicings: (k) => [
      `Minor ii–V–i in ${k}: ${KEYS[k].halfDim} → ${KEYS[k].altered} → ${KEYS[k].minorI}`,
      'Shells first, then rootless. Voice the tonic as m6/9, not m7 — the natural 6 is what makes it resolve.',
    ],
    independence: (k) => ({
      name: 'Walking the minor ii–V–i',
      leftHand: `The same quarter-note walk through ${KEYS[k].halfDim} → ${KEYS[k].altered} → ${KEYS[k].minorI}, approaching every root by a half step from above or below on beat 4.`,
      rightHand: 'Shells for the first chorus, then the rootless minor voicings — the m7♭5, the altered dominant, the m6/9.',
      rhythm: 'Left hand four to the bar. Right hand on the "and" of 2 and the "and" of 4.',
      over: `Minor ii–V–i in ${k}, two bars a chord.`,
      watchFor: 'The left hand reaching for the ♭5 or the alterations. Its only job is the line — colour lives in the right hand.',
    }),
    tune: () => ['Beautiful Love — the head, and every minor ii–V–i inside it'],
  },
  {
    id: 6,
    name: 'Altered',
    level: '5.0',
    goal: 'One scale that carries every alteration, on every dominant, without thinking.',
    target: 'The altered scale on any dominant at ♩=100, without deriving it first.',
    wiki: ['melodic-minor-family', 'minor-two-five-one'],
    scales: (k) => [
      `Altered scale on ${KEYS[k].V} — melodic minor from a half step above the root`,
      `Lydian dominant on the same root, back to back, for the contrast`,
    ],
    voicings: (k) => [
      `${KEYS[k].altered} voiced with the ♭9 and ♭13 on top`,
      `Then the tritone sub in place of ${KEYS[k].V} — same guide tones, new root`,
    ],
    independence: (k) => ({
      name: 'Offbeat comping',
      leftHand: `The walking line through the ii–V–I in ${k}, now with a chromatic passing tone on beat 4 of every bar.`,
      rightHand: `${KEYS[k].altered} voiced with the ♭9 and ♭13 on top; the ii and the I as rootless form A.`,
      rhythm: 'Right hand plays on offbeats only — the "and" of 1, 2, 3 or 4, never a downbeat, for a full chorus.',
      over: `ii–V–I in ${k}, one bar a chord. ♩=80 once it is comfortable, but the day’s step has the last word.`,
      watchFor: 'Sneaking onto a downbeat exactly where the chord changes. That is the habit this drill exists to remove.',
    }),
    tune: () => ['Solar — improvise using nothing but the altered scale over every dominant'],
  },
  {
    id: 7,
    name: 'Upper structures',
    level: '5.2',
    goal: 'Four triads over any dominant, grabbed as shapes rather than worked out.',
    target: 'Four upper structures over any dominant, grabbed as shapes.',
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
    independence: (k) => ({
      name: 'Three against two',
      leftHand: `Two evenly spaced notes per bar: the root and the fifth of ${KEYS[k].V}, on beats 1 and 3.`,
      rightHand: `Three evenly spaced notes across the same span — the upper structure triad, one note each. Over ${KEYS[k].V} that is ${KEYS[k].upperStructures[0]}.`,
      rhythm: 'Three against two. Say "cold cup of tea": only "cold" is both hands together, and after that they alternate.',
      over: `Eight bars on ${KEYS[k].V}, the V of ${k}, then swap which hand carries the three.`,
      watchFor: 'Playing it as a shuffle. If the three notes are not perfectly even you are feeling it in 6/8, not as a polyrhythm.',
    }),
    tune: () => ['There Will Never Be Another You — an upper structure on every dominant in the form'],
  },
  {
    id: 8,
    name: 'Blues & symmetry',
    level: '5.4',
    goal: 'The idiom that has no theory behind it, next to the scales that are nothing but.',
    target: 'A twelve-bar blues you would actually play for someone.',
    wiki: ['diminished-and-blues', 'bebop-scales'],
    scales: (k) => [
      `${k} blues scale and minor pentatonic, four octaves, then in 3rds`,
      `Whole tone from ${KEYS[k].V}, two octaves`,
    ],
    voicings: (k) => [
      `Blues in ${k} — the quick IV in bar 2, the turnaround in 11 and 12`,
      'Tritone subs through the last four bars',
    ],
    independence: (k) => ({
      name: 'Four against three',
      leftHand: `Three even notes per bar — the root, ♭7 and ♭3 of the chord under you.`,
      rightHand: `Four even notes across the same span, taken from the ${k} blues scale.`,
      rhythm: 'Four against three: "pass the god-damn butter". Only the first syllable is both hands. Tap it on the fallboard before you play it.',
      over: `A twelve-bar blues in ${k}, one chord a bar.`,
      watchFor: 'The two settling into a shuffle. The composite has to sound even before it goes anywhere near the keys.',
    }),
    tune: (k) => [`Blues in ${k} — twelve choruses, one idea developed across all of them`],
  },
  {
    id: 9,
    name: 'Solo piano',
    level: '5.6',
    goal: 'Melody, harmony and bass under two hands at the same time.',
    target: 'One tune as a complete solo arrangement, start to finish.',
    wiki: ['rootless-voicings', 'upper-structure-triads', 'hand-independence'],
    scales: (k) => [
      `${k} in 3rds, four octaves`,
      'Every arpeggio quality on the tonic — maj7, m7, dom7, m7♭5, dim7 — all inversions',
    ],
    voicings: () => [
      'Block chords — harmonize the melody four-way close, then drop the second voice from the top',
      'Add the 6th-diminished passing chords underneath',
    ],
    independence: () => ({
      name: 'Bach two-part invention',
      leftHand: 'The lower voice alone, sixteen bars, memorised before the hands ever meet.',
      rightHand: 'The upper voice alone, the same sixteen bars, memorised separately.',
      rhythm: 'As written. No metronome until each hand is memorised, then both together at half tempo.',
      over: 'Invention No. 1 in C, No. 8 in F, or No. 13 in A minor. Pick one and stay with it for the whole unit.',
      watchFor: 'One hand going quiet when the other has the harder line. Both parts are melodies; neither is an accompaniment.',
    }),
    tune: () => ['Someday My Prince Will Come — a full arrangement: intro, head, one chorus, ending'],
  },
  {
    id: 10,
    name: 'Fluency',
    level: '5.8',
    goal: 'Everything, in every key, at tempo, without a chart in front of you.',
    target: 'All twelve keys at ♩=120, in 3rds, no chart.',
    wiki: ['cycle-of-fourths', 'tempo-targets', 'major-scale-modes', 'melodic-minor-family'],
    scales: (k) => [
      `${k} — major, Dorian, dominant bebop, altered, blues`,
      'Each of them in 3rds before you move on. This is the level-6 bar.',
    ],
    voicings: (k) => [
      `The whole ladder in ${k}: shells, rootless A, rootless B, upper structures, block chords`,
      'Same progression, five ways, no pause between them',
    ],
    independence: () => ({
      name: 'All three at once',
      leftHand: 'Walking quarter notes through the tune’s changes, chromatic approach into every new root.',
      rightHand: 'The melody, with a chord voicing dropped into the gaps between phrases.',
      rhythm: 'Bass four to the bar, melody as written, voicings only where the melody rests.',
      over: 'One chorus of your tune. ♩=100 is the unit’s target, not today’s instruction — the day’s step decides.',
      watchFor: 'The bass collapsing to roots on beat 1 whenever the melody gets busy. Record it — you will not hear it happening.',
    }),
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

/**
 * What each block is for. The same every session, because a block's role in
 * the hour never changes — only the material inside it does.
 */
export const BLOCK_PURPOSE: Record<string, string> = {
  warmup:
    'Loosen the hands and get the ear switched on. Nothing here is timed or measured — if any of it feels like effort, go slower.',
  scales:
    'The raw vocabulary. Evenness before speed: every note the same weight, in both hands. A metronome only joins at step 4 of the unit — before that, slow enough to be perfect.',
  voicings:
    'Turning harmony into shapes your hands find without you working them out. Left hand first, every time; it carries the chord.',
  independence:
    'Teaching each hand to hold a part the other is not playing. Separately until each is automatic, then together at half tempo. This is the slowest block and it is meant to be.',
  tune:
    'Where the day’s material becomes music. The only block that has to sound like anything — and the one to protect if you run out of time.',
}

export interface RegimenBlock {
  id: string
  title: string
  /** Share of the session length; the five weights sum to 1. */
  weight: number
  /** Why this block exists — stable across all hundred sessions. */
  purpose: string
  items: string[]
  /** Present on the independence block: what each hand actually plays. */
  drill?: DrillSpec
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

  const blocks: Omit<RegimenBlock, 'purpose'>[] = [
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
      drill: unit.independence(key),
      items: [
        `${unit.independence(key).name} — see the breakdown below`,
        variant.name === 'Combine'
          ? `${variant.independence} — unit ${previous.id}'s was ${previous.independence(key).name}`
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
    blocks: blocks.map((b) => ({ ...b, purpose: BLOCK_PURPOSE[b.id] ?? '' })),
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
