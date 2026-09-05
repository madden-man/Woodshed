import { KEYS, dayNumber, nextKey, type KeyName } from './keys'

/** The six-drill hand-independence rotation, one per day. */
export const DRILLS = [
  {
    title: 'Charleston ostinato',
    detail:
      'Left hand stabs the Charleston — beat 1 and the and-of-2 — while the right hand runs the day’s scale in unbroken eighth notes. Then displace the ostinato by an eighth and do it again. Four positions.',
  },
  {
    title: 'Walking bass + comping',
    detail:
      'Left hand walks quarter notes through the ii–V–I, approaching each root chromatically from above or below. Right hand comps rootless voicings on the offbeats only. Start at ♩=60 and refuse to go faster until it is boring.',
  },
  {
    title: 'Polyrhythm ladder',
    detail:
      '3-over-2 first: tap it saying “cold cup of tea”, then left hand quarters against right hand triplets, then swap hands. When that is automatic, 4-over-3 with “pass the god-damn butter”.',
  },
  {
    title: 'Bach, two-part invention',
    detail:
      'No. 1, 8 or 13. Sixteen bars a week: each hand separately to memory, then together at half tempo. Nothing else builds true independence this efficiently.',
  },
  {
    title: 'Sing one, play the other',
    detail:
      'Left hand walks the bass while you sing the melody. Then right hand plays the melody while you sing the bass line. Brutal, short, and it moves the two parts into separate places in your head.',
  },
  {
    title: 'Rhythmic displacement',
    detail:
      'Right hand plays the melody, left hand holds a fixed pulse on 2 and 4. Now start the melody a half beat late and keep it there for a full chorus without the left hand moving.',
  },
] as const

/** Weekday scale focus, indexed by Date#getDay() — 0 is Sunday. */
export const FOCUS = [
  {
    name: 'Speed round',
    blurb:
      'All twelve keys today, not one. Two octaves each, no stopping, then stop playing and listen for twenty minutes.',
    scales: () => [
      'Major, Dorian and dominant bebop in all twelve keys, two octaves, around the cycle of fourths',
      'No repeats, no restarts — if it falls apart, keep going and note the key',
      'Finish with twenty minutes of listening: one record, no piano',
    ],
  },
  {
    name: 'Major & modes',
    blurb: 'The bright half of the harmony. Modes built off the parent scale, not learned as separate shapes.',
    scales: (k: KeyName) => [
      `${k} major, four octaves, hands together, eighth notes`,
      'Dorian on the 2nd degree, Lydian on the 4th, Mixolydian on the 5th',
      'The major scale in 3rds, up and down — this is the level-5 jump',
      `Arpeggio: ${KEYS[k].I}, all four inversions, four octaves`,
    ],
  },
  {
    name: 'Minor family',
    blurb: 'Natural, harmonic and melodic from the same tonic, back to back, so you hear exactly which note moved.',
    scales: (k: KeyName) => [
      `${k} natural minor, then harmonic, then melodic — same tonic, no pause between`,
      'Melodic minor in 3rds, ascending form both directions (jazz minor)',
      `Arpeggio: ${KEYS[k].ii} and ${KEYS[k].minorI}, all inversions`,
    ],
  },
  {
    name: 'Dominant family',
    blurb: 'Everything that lives on the V chord. The bebop scale is what makes your lines land on the right beat.',
    scales: (k: KeyName) => [
      `Mixolydian on ${KEYS[k].V}, four octaves`,
      'Dominant bebop — Mixolydian plus the natural 7 as a passing tone, so chord tones fall on downbeats',
      'Whole tone from the same root',
      `Arpeggio: ${KEYS[k].V} with the 9th on top, all inversions`,
    ],
  },
  {
    name: 'Symmetric & blues',
    blurb: 'Diminished and blues on the same day: the most structured scale and the least, side by side.',
    scales: (k: KeyName) => [
      `Half-whole diminished from ${KEYS[k].V} — the sound of ♭9, ♯9 and ♯11 at once`,
      `${k} blues scale and minor pentatonic, four octaves, then in 3rds`,
      'Arpeggio: diminished 7th — three shapes cover all twelve roots, prove it to yourself',
    ],
  },
  {
    name: 'Altered',
    blurb: 'Melodic minor a half step above the dominant. One scale, and every alteration is in it.',
    scales: (k: KeyName) => [
      `Altered scale on ${KEYS[k].V} — melodic minor from a half step above the root`,
      'Lydian dominant (4th mode of melodic minor) on the same root, for comparison',
      `Arpeggio: ${KEYS[k].halfDim}, all inversions, four octaves`,
    ],
  },
  {
    name: 'Weak keys',
    blurb: 'No new material. Your three slowest keys from the tempo log, run through the whole week’s families.',
    scales: () => [
      'Take your three lowest tempos from the log',
      'Run Monday through Friday’s families in each of them, two octaves',
      'Raise each by 4 bpm and log it — that is the entire job today',
    ],
  },
] as const

/** Which independence drill comes up today — a six-day rotation. */
export function drillForDay(date: Date = new Date()): number {
  return ((dayNumber(date) % DRILLS.length) + DRILLS.length) % DRILLS.length
}

export interface SessionBlock {
  id: string
  title: string
  /** Share of the session length. The five weights sum to 1. */
  weight: number
  lede: string
  items: string[]
}

/** Build today's five blocks for a given key, weekday and drill. */
export function buildSession(key: KeyName, weekday: number, drillIndex: number): SessionBlock[] {
  const focus = FOCUS[weekday]
  const drill = DRILLS[drillIndex]
  const following = nextKey(key)

  return [
    {
      id: 'warmup',
      title: 'Warm-up, no metronome',
      weight: 0.1,
      lede: 'Hands and ears, not speed. Nothing here is timed or measured.',
      items: [
        `Contrary motion from ${key}, two octaves out and back, thumbs together`,
        'Slow chord-and-release: play, let the arm weight drop, release completely. Ten times.',
        `Any five-finger pattern you like — transposed to ${key}, never in C by habit`,
      ],
    },
    {
      id: 'scales',
      title: 'Scales & arpeggios',
      weight: 0.22,
      lede: `Metronome on 2 and 4. Today's family: ${focus.name.toLowerCase()}. Log your top clean tempo.`,
      items: [...focus.scales(key)],
    },
    {
      id: 'voicings',
      title: 'Voicings — ii–V–I of the day',
      weight: 0.24,
      lede: 'Four passes, eight bars each, all in the key of the day.',
      items: [
        'Pass 1 shells, pass 2 rootless A and B, pass 3 the minor ii–V–i, pass 4 upper structures',
        'Every pass hands separately first, then together with the click on 2 and 4',
        `Finish by playing the same ii–V–I in ${following} without stopping — practice the modulation, not just the shape`,
      ],
    },
    {
      id: 'independence',
      title: 'Hand independence',
      weight: 0.18,
      lede: 'Today’s rotation. One drill, done properly, beats four rushed.',
      items: [`${drill.title} — ${drill.detail}`],
    },
    {
      id: 'tune',
      title: 'The tune',
      weight: 0.26,
      lede: 'One tune for two weeks. Move up the tune ladder only when the current rung is dull.',
      items: [
        'Whichever rung you are on — melody, shells, comping, walking bass, or the key change',
        'Record ninety seconds on your phone and listen back once before you stop',
        'Improvise one chorus using only today’s scale family. Constraint is the point.',
      ],
    },
  ]
}

/** Split a session length across the blocks so the minutes add up exactly. */
export function minutesFor(blocks: SessionBlock[], total: number): number[] {
  const mins = blocks.map((b) => Math.max(3, Math.round(total * b.weight)))
  const sum = mins.reduce((a, b) => a + b, 0)
  mins[mins.length - 1] += total - sum
  return mins
}

export const SESSION_LENGTHS = [30, 45, 60, 90] as const
