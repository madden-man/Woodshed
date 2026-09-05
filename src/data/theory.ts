import type { Topic } from './types'

/**
 * The wiki. Add a topic by appending an object here — the index, sidebar and
 * routing all read from this array, so nothing else needs touching.
 */
export const TOPICS: Topic[] = [
  {
    slug: 'cycle-of-fourths',
    title: 'The cycle of fourths',
    category: 'Practice',
    summary: 'Why the key rotation is not yours to choose, and how twelve days closes the circle.',
    blocks: [
      {
        kind: 'prose',
        text: 'Every key is a fourth above the last: C, F, B♭, E♭, A♭, D♭, G♭, B, E, A, D, G, and back to C. Twelve steps closes the circle. Practising one key per day in this order means every key gets deep work roughly two and a half times a month, and none of them get skipped.',
      },
      {
        kind: 'callout',
        title: 'Why fourths and not chromatically',
        text: 'Root motion by a fourth is the strongest movement in tonal harmony — it is what a V does to a I, and it is what nearly every progression in the standard repertoire is built from. Practising in that order trains the modulation at the same time as the material.',
      },
      {
        kind: 'prose',
        text: 'The order also front-loads the easy keys and buries the hard ones in the middle, which is exactly where they need to be: by the time you reach G♭ and B you are eight days into the habit and the momentum carries you through the keys you would otherwise avoid forever.',
      },
      {
        kind: 'list',
        items: [
          'The cycle picks the key, not your mood.',
          'One key per day, deep. Yesterday’s key gets a fast review at the top of the session.',
          'Sunday breaks the pattern: all twelve keys, two octaves, no stopping.',
        ],
      },
    ],
    related: ['tempo-targets', 'shell-voicings'],
  },
  {
    slug: 'major-scale-modes',
    title: 'Major scale & modes',
    category: 'Scales',
    summary: 'Modes as degrees of one parent scale, not seven shapes to memorise separately.',
    blocks: [
      {
        kind: 'prose',
        text: 'The seven modes are the same notes started from different degrees. Learning them as separate fingerings is the level-4 mistake; learning them as positions within one parent scale is what makes them usable at tempo.',
      },
      {
        kind: 'table',
        head: ['Mode', 'Degree', 'Sound', 'Used over'],
        rows: [
          ['Ionian', '1', 'major', 'Imaj7'],
          ['Dorian', '2', 'minor with a natural 6', 'iim7, any minor vamp'],
          ['Phrygian', '3', 'minor with a ♭2', 'iiim7, Spanish colour'],
          ['Lydian', '4', 'major with a ♯11', 'IVmaj7, floating major'],
          ['Mixolydian', '5', 'major with a ♭7', 'V7, blues and funk'],
          ['Aeolian', '6', 'natural minor', 'vim7'],
          ['Locrian', '7', 'diminished, ♭5 and ♭2', 'viim7♭5'],
        ],
      },
      {
        kind: 'callout',
        title: 'The level-5 requirement',
        text: 'Straight scales up and down are a level-4 skill. Scales in 3rds — up a third, down a third, four octaves, hands together at ♩=120 — is the bar for level 5/6. Practise them in 3rds from the start and the straight version comes free.',
      },
      { kind: 'list', items: ['Four octaves, hands together, eighth notes.', 'Dorian on 2, Lydian on 4, Mixolydian on 5 — the three that carry jazz.', 'Then the same scale in 3rds, both directions.'] },
    ],
    related: ['bebop-scales', 'tempo-targets'],
  },
  {
    slug: 'melodic-minor-family',
    title: 'The melodic minor family',
    category: 'Scales',
    summary: 'One scale that generates the altered dominant, the lydian dominant, and the minor tonic.',
    blocks: [
      {
        kind: 'prose',
        text: 'Play natural, harmonic and melodic minor from the same tonic back to back, with no pause between them, and you hear exactly which note moved. That is the only way these three stop blurring together.',
      },
      {
        kind: 'table',
        head: ['Scale', 'Formula', 'What changed'],
        rows: [
          ['Natural minor', '1 2 ♭3 4 5 ♭6 ♭7', '—'],
          ['Harmonic minor', '1 2 ♭3 4 5 ♭6 7', 'raised 7th'],
          ['Melodic minor', '1 2 ♭3 4 5 6 7', 'raised 6th and 7th'],
        ],
      },
      {
        kind: 'prose',
        text: 'Jazz uses the ascending form in both directions and calls it the jazz minor. Its modes are where the real value is:',
      },
      {
        kind: 'table',
        head: ['Mode', 'Degree', 'Name', 'Use'],
        rows: [
          ['Jazz minor', '1', 'melodic minor', 'minor tonic, m6/9 chords'],
          ['Lydian dominant', '4', '♯11 dominant', 'unaltered dominants, tritone subs'],
          ['Altered', '7', 'super-locrian', 'V7alt — every alteration at once'],
        ],
      },
      {
        kind: 'callout',
        title: 'The altered scale shortcut',
        text: 'The altered scale on any dominant is just melodic minor starting a half step above the root. Over G7alt, play A♭ melodic minor. That single sentence replaces memorising ♭9, ♯9, ♯11 and ♭13 as separate objects.',
      },
    ],
    related: ['upper-structure-triads', 'minor-two-five-one'],
  },
  {
    slug: 'bebop-scales',
    title: 'Bebop scales',
    category: 'Scales',
    summary: 'An eight-note scale that puts chord tones on the downbeats automatically.',
    blocks: [
      {
        kind: 'prose',
        text: 'A seven-note scale played in eighth notes puts a chord tone on the downbeat only half the time — the other half you land on a passing tone and the line sounds like an exercise. Adding one chromatic passing tone makes the scale eight notes long, so over a bar of eighths the chord tones land on every downbeat.',
      },
      {
        kind: 'table',
        head: ['Bebop scale', 'Built from', 'Added note'],
        rows: [
          ['Dominant bebop', 'Mixolydian', 'natural 7 between ♭7 and root'],
          ['Major bebop', 'Ionian', '♯5 between 5 and 6'],
          ['Minor bebop', 'Dorian', 'natural 3 between ♭3 and 4'],
        ],
      },
      {
        kind: 'callout',
        title: 'Practise it descending',
        text: 'Start on the root and descend an octave in straight eighths. Every downbeat should be a chord tone. If it is not, you have put the passing note in the wrong place — go back and find it rather than pushing through.',
      },
    ],
    related: ['major-scale-modes', 'diminished-and-blues'],
  },
  {
    slug: 'diminished-and-blues',
    title: 'Diminished & blues scales',
    category: 'Scales',
    summary: 'The most symmetric scale and the least, and why they belong on the same practice day.',
    blocks: [
      {
        kind: 'prose',
        text: 'The half-whole diminished scale alternates half and whole steps from the root of a dominant chord. It contains the ♭9, ♯9, ♯11 and natural 13 all at once — the sound of a dominant that is coloured but not fully altered.',
      },
      {
        kind: 'callout',
        title: 'Three shapes cover twelve roots',
        text: 'Because the scale is symmetric, there are only three distinct diminished scales. Prove it to yourself once at the keyboard and you have permanently reduced twelve fingerings to three.',
      },
      {
        kind: 'prose',
        text: 'The blues scale is the opposite: no symmetry, no theory to lean on, entirely idiomatic. Minor pentatonic plus the ♭5. It exists because of how it is played, not how it is spelled — which is why it goes next to the diminished scale in the rotation, as a corrective.',
      },
      {
        kind: 'list',
        items: [
          'Half-whole diminished from the V of the day, four octaves.',
          'Blues scale and minor pentatonic in the key of the day, then in 3rds.',
          'Diminished 7th arpeggios, all inversions.',
        ],
      },
    ],
    related: ['bebop-scales', 'upper-structure-triads'],
  },
  {
    slug: 'shell-voicings',
    title: 'Shell voicings',
    category: 'Harmony',
    summary: 'Root, third and seventh — the smallest voicing that still says what the chord is.',
    blocks: [
      {
        kind: 'prose',
        text: 'A chord’s identity lives in its third and seventh. The fifth is nearly always disposable, and the root is only needed when nobody else is playing it. Root–3–7 and root–7–3 are therefore the two left-hand shapes that carry every tune you will ever play.',
      },
      {
        kind: 'progression',
        label: 'ii – V – I in C',
        chords: ['Dm7', 'G7', 'Cmaj7'],
        highlight: 1,
        note: 'Left hand plays 1-7-3 on the ii, 1-3-7 on the V, 1-7-3 on the I. Alternating the two shapes keeps the guide tones moving by step instead of leaping.',
      },
      {
        kind: 'callout',
        title: 'Voice leading is the whole point',
        text: 'The 7th of the ii falls a half step to the 3rd of the V; the 3rd of the ii is the 7th of the V. Two notes, moving as little as possible. If your hand is jumping around, you have the shapes in the wrong order.',
      },
      { kind: 'prose', text: 'With the shell established, the right hand adds the 9 and the 13 above it. That is a complete, professional-sounding voicing built from four notes and one rule.' },
    ],
    related: ['rootless-voicings', 'minor-two-five-one'],
  },
  {
    slug: 'rootless-voicings',
    title: 'Rootless voicings (A & B)',
    category: 'Harmony',
    summary: 'The Bill Evans forms: drop the root, keep the colour, let the bass do its job.',
    blocks: [
      {
        kind: 'prose',
        text: 'In a trio the bassist plays the root, so the pianist stops. What is left is the 3rd, 5th, 7th and 9th arranged into two four-note shapes. Form A builds from the 3rd; form B builds from the 7th. Every chord has both, and they alternate through a ii–V–I so that the top voice barely moves.',
      },
      {
        kind: 'table',
        head: ['Chord', 'Form A (from the 3rd)', 'Form B (from the 7th)'],
        rows: [
          ['m7', '3 5 7 9', '7 9 3 5'],
          ['7', '3 13 7 9', '7 9 3 13'],
          ['maj7', '3 5 7 9', '7 9 3 5'],
        ],
      },
      {
        kind: 'progression',
        label: 'Rootless in C',
        chords: ['Dm9', 'G13', 'Cmaj9'],
        highlight: 1,
        note: 'Run the whole progression in form A, then the whole thing in form B, then add a walking root underneath in the other hand.',
      },
      {
        kind: 'callout',
        title: 'The test',
        text: 'Play the progression and watch only the top note. If it moves by step or stays put across all three chords, the voice leading is right. If it leaps, you have picked the wrong form for one of them.',
      },
    ],
    related: ['shell-voicings', 'upper-structure-triads'],
  },
  {
    slug: 'upper-structure-triads',
    title: 'Upper structure triads',
    category: 'Harmony',
    summary: 'A plain major triad in the right hand over a dominant shell, and four colours fall out.',
    blocks: [
      {
        kind: 'prose',
        text: 'Left hand holds the 3rd and 7th of the dominant. Right hand plays an ordinary major triad on top. Which triad you choose decides which alterations you get — and because they are just major triads, you can grab them as shapes rather than working out spellings mid-solo.',
      },
      {
        kind: 'table',
        head: ['Triad', 'Over G7', 'Gives', 'Colour'],
        rows: [
          ['♭II', 'A♭', '♭9, 11, ♭13', 'full altered'],
          ['VI', 'E', '13, ♭9, 3', 'bright and biting'],
          ['♭VI', 'E♭', '♭13, root, ♯9', 'the dark one'],
          ['II', 'A', '9, ♯11, 13', 'lydian dominant'],
        ],
      },
      {
        kind: 'callout',
        title: 'Learn them as four grabs',
        text: 'Four triads over one shell, in one key, until the hand finds them without thought. Then move it around the cycle of fourths. Trying to derive the alterations in real time is what keeps people stuck at level 4.',
      },
    ],
    related: ['melodic-minor-family', 'rootless-voicings'],
  },
  {
    slug: 'minor-two-five-one',
    title: 'The minor ii–V–i',
    category: 'Harmony',
    summary: 'Half-diminished into an altered dominant into a minor 6/9 — the progression most people skip.',
    blocks: [
      {
        kind: 'progression',
        label: 'Minor ii – V – i in C',
        chords: ['Dm7♭5', 'G7alt', 'Cm6/9'],
        highlight: 1,
        note: 'Three different scale sources in three bars: locrian (or locrian ♮2), altered, and melodic minor.',
      },
      {
        kind: 'prose',
        text: 'Almost everyone arrives at level 4 with fluent major ii–V–Is and a vague, improvised approach to the minor one. It is a genuinely different animal — the ii is half-diminished, the V is nearly always altered, and the tonic is a minor 6 or m(maj7) rather than a m7. Practising it daily, in every key, is the single highest-yield harmonic habit at this stage.',
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Shell the whole thing first: 1-♭7-♭3 on the iiø, 1-3-♭7 on the V, 1-♭7-♭3 on the i.',
          'Add the ♭9 and ♭13 over the V from the altered scale.',
          'Voice the tonic as m6/9 rather than m7 — the natural 6 is what makes it sound resolved rather than suspended.',
          'Then play the same progression a fourth up, without stopping.',
        ],
      },
    ],
    related: ['melodic-minor-family', 'shell-voicings'],
  },
  {
    slug: 'hand-independence',
    title: 'Hand independence',
    category: 'Technique',
    summary: 'Six drills in rotation, built on the principle that each hand must be automatic before they combine.',
    blocks: [
      {
        kind: 'prose',
        text: 'Independence is not a talent, it is a sequence: one hand automatic, then the other hand automatic, then both at half tempo. Skipping the separate stage is why hands-together practice plateaus.',
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Charleston ostinato — left hand on beat 1 and the and-of-2 while the right runs steady eighths, then displace by an eighth. Four positions.',
          'Walking bass + comping — left hand walks quarters with chromatic approaches, right hand comps on offbeats only. Start at ♩=60.',
          'Polyrhythm ladder — 3-over-2 (“cold cup of tea”), then 4-over-3 (“pass the god-damn butter”), then swap hands.',
          'Bach two-part inventions — No. 1, 8 or 13. Sixteen bars a week, each hand to memory first.',
          'Sing one, play the other — left hand walks while you sing the melody, then reverse.',
          'Rhythmic displacement — hold a fixed pulse on 2 and 4 while the melody starts a half beat late for a full chorus.',
        ],
      },
      {
        kind: 'callout',
        title: 'Walking bass is the one that pays',
        text: 'Of the six, left-hand walking bass under right-hand offbeat comping is the drill that converts directly into solo-piano playing. It has to be slow enough to be boring before it is fast enough to be useful.',
      },
    ],
    related: ['tempo-targets', 'shell-voicings'],
  },
  {
    slug: 'tempo-targets',
    title: 'Tempo targets & the two-mistake rule',
    category: 'Practice',
    summary: 'What to log, what the target is, and when to slow down.',
    blocks: [
      {
        kind: 'callout',
        title: 'Click on 2 and 4',
        text: 'Never 1 and 3. With the metronome on the backbeat your internal time has to hold the downbeat, which is the entire skill. On 1 and 3 the machine holds it for you and you learn nothing.',
      },
      {
        kind: 'table',
        head: ['Material', 'Level 4', 'Level 5/6 target'],
        rows: [
          ['Major scale, 4 octaves, hands together', '♩=88', '♩=120'],
          ['Scale in 3rds, 4 octaves', '—', '♩=100'],
          ['Seventh arpeggios, all inversions', '♩=72', '♩=112'],
          ['Walking bass + comping', '—', '♩=100'],
        ],
      },
      {
        kind: 'prose',
        text: 'One number per key, logged: the fastest tempo at which you played it cleanly, eighth notes, four octaves, hands together. Untracked practice does not compound, because you have no way of knowing whether today was better than three weeks ago.',
      },
      {
        kind: 'callout',
        title: 'The two-mistake rule',
        text: 'Break down twice at a tempo and take it back 6 bpm. Clean at 80 beats sloppy at 110 every single time — repetition installs whatever you actually played, including the mistakes.',
      },
    ],
    related: ['cycle-of-fourths', 'hand-independence'],
  },
]

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug)
}
