import type { Topic } from './types'

/**
 * The wiki. Add a topic by appending an object here — the index, sidebar and
 * routing all read from this array, so nothing else needs touching.
 *
 * House style: never leave a number unexplained. Chord shorthand like "1-7-3"
 * is opaque until someone spells it out, so every topic that uses numbers also
 * shows the notes those numbers produce, in a real key, with the arithmetic
 * visible. `inPlainTerms` has to survive without any number at all.
 */
export const TOPICS: Topic[] = [
  {
    slug: 'chord-numbers',
    title: 'What the numbers mean',
    category: 'Harmony',
    summary: 'Reading 1-3-5-7, extensions, alterations and roman numerals — the shorthand everything else assumes.',
    inPlainTerms:
      'Musicians describe chords by counting steps up from a starting note instead of naming every note, because then one description works in all twelve keys. Learn the counting once and every other page here stops looking like a phone number.',
    blocks: [
      {
        kind: 'prose',
        text: 'Take any major scale and number the notes from one to seven. In C that is C=1, D=2, E=3, F=4, G=5, A=6, B=7. Every chord symbol you will ever read is a set of instructions about which of those numbers to play, and which to bend.',
      },
      {
        kind: 'worked',
        label: 'The numbers, in C',
        rows: [
          { symbol: '1', means: 'the root — the note the chord is named after', gives: 'C' },
          { symbol: '3', means: 'the third — decides major or minor', gives: 'E (♭3 would be E♭)' },
          { symbol: '5', means: 'the fifth — usually leave it out, it says nothing', gives: 'G' },
          { symbol: '7', means: 'the seventh — decides the chord’s flavour', gives: 'B (♭7 would be B♭)' },
          { symbol: '9', means: 'the 2nd, an octave up', gives: 'D' },
          { symbol: '11', means: 'the 4th, an octave up', gives: 'F' },
          { symbol: '13', means: 'the 6th, an octave up', gives: 'A' },
        ],
        note: 'Numbers above 7 are just the low numbers moved up an octave: 9 is 2, 11 is 4, 13 is 6. They get the bigger name because they sit above the seventh rather than inside the basic chord.',
      },
      {
        kind: 'keyboard',
        label: 'The C major scale — the notes you are counting',
        notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
        fingers: [1, 2, 3, 1, 2, 3, 4, 5],
        hand: 'RH',
        note: 'Seven white keys and back to the start. Every number in every chord symbol is counted along these, then bent if the symbol says so.',
      },
      {
        kind: 'prose',
        text: 'A flat or sharp in front lowers or raises that note by a half step. So ♭9 over C is D♭, and ♯11 over C is F♯. That is the whole system — count up the scale, then bend the note if the symbol says to.',
      },
      {
        kind: 'worked',
        label: 'Reading four common chord symbols in C',
        rows: [
          { symbol: 'Cmaj7', means: '1, 3, 5 and the natural 7', gives: 'C E G B' },
          { symbol: 'C7', means: 'same, but the 7th flattened — that is what makes it a dominant', gives: 'C E G B♭' },
          { symbol: 'Cm7', means: 'the 3rd and the 7th both flattened', gives: 'C E♭ G B♭' },
          { symbol: 'Cm7♭5', means: 'the 3rd, 5th and 7th all flattened', gives: 'C E♭ G♭ B♭' },
        ],
        note: 'Notice how little changes between them. One flattened note is the entire difference between a major 7th and a dominant 7th chord.',
      },
      {
        kind: 'keyboard',
        label: 'Cmaj7 — 1, 3, 5, 7',
        notes: ['C', 'E', 'G', 'B'],
        fingers: [1, 2, 3, 5],
        hand: 'RH',
      },
      {
        kind: 'keyboard',
        label: 'C7 — the same, with the 7th flattened',
        notes: ['C', 'E', 'G', 'B♭'],
        fingers: [1, 2, 3, 5],
        hand: 'RH',
        note: 'One key to the left, and the chord stops sounding at rest and starts wanting to move somewhere.',
      },
      {
        kind: 'keyboard',
        label: 'Cm7 — the 3rd flattened as well',
        notes: ['C', 'E♭', 'G', 'B♭'],
        fingers: [1, 2, 3, 5],
        hand: 'RH',
      },
      {
        kind: 'prose',
        text: 'When you see a shape written as 1-7-3, that is not a chord symbol — it is a stacking order. It says: play the root, then the seventh above it, then the third above that. Same notes as the chord symbol, arranged in a particular way with your hand.',
      },
      {
        kind: 'callout',
        title: 'Roman numerals number the chords, not the notes',
        text: 'Uppercase and lowercase roman numerals count chords built on each degree of the key. In C, ii is the chord on the 2nd degree (Dm7) and V is the chord on the 5th (G7). Lowercase means the chord is minor, uppercase means major. So "ii–V–I in C" is Dm7 → G7 → Cmaj7, and the same three numerals give you a different set of chords in every key — which is the whole point of writing it that way.',
      },
      {
        kind: 'table',
        head: ['Numeral', 'Degree', 'Chord in C', 'Chord in F'],
        rows: [
          ['I', '1st', 'Cmaj7', 'Fmaj7'],
          ['ii', '2nd', 'Dm7', 'Gm7'],
          ['iii', '3rd', 'Em7', 'Am7'],
          ['IV', '4th', 'Fmaj7', 'B♭maj7'],
          ['V', '5th', 'G7', 'C7'],
          ['vi', '6th', 'Am7', 'Dm7'],
          ['viiø', '7th', 'Bm7♭5', 'Em7♭5'],
        ],
      },
    ],
    related: ['shell-voicings', 'cycle-of-fourths'],
  },
  {
    slug: 'cycle-of-fourths',
    title: 'The cycle of fourths',
    category: 'Practice',
    summary: 'Why the key rotation is not yours to choose, and how twelve days closes the circle.',
    inPlainTerms:
      'There is a fixed order for moving through all twelve keys that matches the way music actually moves. Practise in that order and you never skip the keys you dislike, because the order picks for you.',
    blocks: [
      {
        kind: 'prose',
        text: 'Start on C, count up four letters — C, D, E, F — and you land on F. Do it again from F and you get B♭. Keep going and you pass through every one of the twelve keys before arriving back at C. That path is the cycle of fourths: C, F, B♭, E♭, A♭, D♭, G♭, B, E, A, D, G.',
      },
      {
        kind: 'callout',
        title: 'Why fourths and not just chromatically',
        text: 'Moving up a fourth is the strongest root motion in tonal music — it is exactly what a V chord does when it resolves to a I. Nearly every progression in the standard repertoire is built from it. So practising in this order trains the modulation at the same time as the material, rather than just shuffling keys.',
      },
      {
        kind: 'prose',
        text: 'The order also front-loads the easy keys and buries the hard ones in the middle, which is where they need to be. By the time you reach G♭ and B you are eight days into the habit and the momentum carries you through the keys you would otherwise avoid forever.',
      },
      {
        kind: 'list',
        items: [
          'The cycle picks the key, not your mood.',
          'One key per session, deep. The session before it gets a fast review at the top.',
          'Every twelfth session closes the circle and starts it again against new material.',
        ],
      },
    ],
    related: ['chord-numbers', 'tempo-targets', 'shell-voicings'],
  },
  {
    slug: 'major-scale-modes',
    title: 'Major scale & modes',
    category: 'Scales',
    summary: 'Modes as degrees of one parent scale, not seven shapes to memorise separately.',
    inPlainTerms:
      'A mode is not a new scale. It is the same seven notes you already know, started from a different one of them — so learning seven modes is really learning one scale and where to begin.',
    blocks: [
      {
        kind: 'prose',
        text: 'Play the white keys from C to C and you have C major. Play the same white keys from D to D and you have D dorian. Nothing changed except where you started and stopped. That is a mode.',
      },
      {
        kind: 'worked',
        label: 'All seven, from the white keys',
        rows: [
          { symbol: 'Ionian', means: 'start on the 1st degree — this is just the major scale', gives: 'C D E F G A B' },
          { symbol: 'Dorian', means: 'start on the 2nd', gives: 'D E F G A B C' },
          { symbol: 'Phrygian', means: 'start on the 3rd', gives: 'E F G A B C D' },
          { symbol: 'Lydian', means: 'start on the 4th', gives: 'F G A B C D E' },
          { symbol: 'Mixolydian', means: 'start on the 5th', gives: 'G A B C D E F' },
          { symbol: 'Aeolian', means: 'start on the 6th — the natural minor scale', gives: 'A B C D E F G' },
          { symbol: 'Locrian', means: 'start on the 7th', gives: 'B C D E F G A' },
        ],
        note: 'Seven modes, one set of notes. Learning them as seven separate fingerings is the level-4 mistake; learning them as positions inside one scale is what makes them usable at speed.',
      },
      {
        kind: 'keyboard',
        label: 'D dorian — the same white keys, started on D',
        notes: ['D', 'E', 'F', 'G', 'A', 'B', 'C', 'D'],
        fingers: [2, 3, 1, 2, 3, 4, 1, 2],
        hand: 'RH',
        note: 'Not one black key anywhere. The only thing that changed from C major is where you begin and end.',
      },
      {
        kind: 'prose',
        text: 'Each mode gets its character from how it differs from the major scale on the same root. D dorian is not "C major from D" to your ear — it sounds like a D minor scale with one bright note in it. Compare it to D major to hear why.',
      },
      {
        kind: 'worked',
        label: 'Why dorian sounds the way it does',
        rows: [
          { symbol: 'D major', means: 'the reference point — the ordinary major scale on D', gives: 'D E F♯ G A B C♯' },
          { symbol: 'D dorian', means: 'the same scale with the 3rd and 7th flattened, which is what makes it minor', gives: 'D E F G A B C' },
          { symbol: 'The 6th', means: 'left alone — B natural, where a normal minor scale would flatten it to B♭', gives: 'B' },
        ],
        note: 'A natural minor scale on D would have B♭. Dorian keeps the B natural, and that single note is why it sounds hopeful rather than sad. It is the default sound for minor chords in jazz.',
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
        text: 'Straight scales up and down are a level-4 skill you already have. Playing them in 3rds — up a third, down a third, four octaves, hands together at ♩=120 — is the bar for level 5 and 6. Practise them in thirds from the start and the straight version comes free.',
      },
    ],
    related: ['chord-numbers', 'bebop-scales', 'tempo-targets'],
  },
  {
    slug: 'melodic-minor-family',
    title: 'The melodic minor family',
    category: 'Scales',
    summary: 'One scale that generates the altered dominant, the lydian dominant, and the minor tonic.',
    inPlainTerms:
      'There are three different minor scales, and they differ by one or two notes. Once you can hear which note moved, the third of them turns out to be the source of almost every colourful sound in jazz.',
    blocks: [
      {
        kind: 'prose',
        text: 'Play all three from the same starting note, back to back, with no pause. That is the only way they stop blurring together — you hear exactly one note move.',
      },
      {
        kind: 'worked',
        label: 'The three minors, all from C',
        rows: [
          { symbol: 'Natural minor', means: 'flatten the 3rd, 6th and 7th of the major scale', gives: 'C D E♭ F G A♭ B♭' },
          { symbol: 'Harmonic minor', means: 'put the 7th back — B natural instead of B♭', gives: 'C D E♭ F G A♭ B' },
          { symbol: 'Melodic minor', means: 'put the 6th back too — A and B natural', gives: 'C D E♭ F G A B' },
        ],
        note: 'Melodic minor is a major scale with one flattened note: the 3rd. That is genuinely all it is, and thinking of it that way is faster than thinking of it as a minor scale with things raised.',
      },
      {
        kind: 'keyboard',
        label: 'C natural minor — three flats',
        notes: ['C', 'D', 'E♭', 'F', 'G', 'A♭', 'B♭', 'C'],
      },
      {
        kind: 'keyboard',
        label: 'C melodic minor — only the ♭3 is left',
        notes: ['C', 'D', 'E♭', 'F', 'G', 'A', 'B', 'C'],
        note: 'Put the A and the B back and you have a major scale with one black key in it. That is the whole scale.',
      },
      {
        kind: 'prose',
        text: 'Classical players change melodic minor on the way down. Jazz players do not — they use the ascending form in both directions and call it the jazz minor. Its modes are where the real value lies, because two of them are the scales you will reach for over dominant chords for the rest of your playing life.',
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
        kind: 'worked',
        label: 'Why "melodic minor a half step up" gives you an altered G7',
        rows: [
          { symbol: 'Start here', means: 'a half step above G is A♭, so play A♭ melodic minor', gives: 'A♭ B♭ C♭ D♭ E♭ F G' },
          { symbol: 'A♭ over G', means: 'a half step above the root', gives: '♭9' },
          { symbol: 'B♭ over G', means: 'a step and a half above the root', gives: '♯9' },
          { symbol: 'C♭ over G', means: 'C♭ is the same key as B — the 3rd of G7', gives: '3' },
          { symbol: 'D♭ over G', means: 'the tritone — dead opposite the root, six half steps either way', gives: '♯11' },
          { symbol: 'E♭ over G', means: 'a flattened 6th, an octave up', gives: '♭13' },
          { symbol: 'F over G', means: 'the flat 7th — the other note that makes it a dominant', gives: '♭7' },
        ],
        note: 'Seven notes, and they hand you the 3rd, the ♭7 and every alteration there is. That one sentence — "melodic minor from a half step above the root" — replaces memorising ♭9, ♯9, ♯11 and ♭13 as four separate objects.',
      },
      {
        kind: 'keyboard',
        label: 'A♭ melodic minor — what you play over G7alt',
        notes: ['A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F', 'G', 'A♭'],
        fingers: [3, 4, 1, 2, 3, 1, 2, 3],
        hand: 'RH',
        note: 'Find G on the keyboard, go up one key to A♭, and play a melodic minor scale from there. Every alteration on the G7 is in it.',
      },
    ],
    related: ['chord-numbers', 'upper-structure-triads', 'minor-two-five-one'],
  },
  {
    slug: 'bebop-scales',
    title: 'Bebop scales',
    category: 'Scales',
    summary: 'An eight-note scale that puts chord tones on the downbeats automatically.',
    inPlainTerms:
      'Ordinary scales have seven notes, which means that when you play them in a steady stream they drift out of alignment with the beat. Adding one extra note fixes the alignment, and your lines suddenly land where they should without you steering them.',
    blocks: [
      {
        kind: 'prose',
        text: 'Play a seven-note scale in continuous eighth notes and the notes of the chord land on a downbeat only half the time. The other half you land on a passing note and the line sounds like an exercise rather than music. Adding one chromatic passing tone makes the scale eight notes long — and eight notes fit a bar of eighth notes exactly.',
      },
      {
        kind: 'worked',
        label: 'G7 descending, a bar of eighth notes',
        rows: [
          { symbol: 'G mixolydian', means: 'seven notes — the ordinary scale on the 5th degree of C', gives: 'G A B C D E F' },
          { symbol: 'Add F♯', means: 'one chromatic note between the F and the G', gives: 'G F♯ F E D C B A' },
          { symbol: 'Beats 1 2 3 4', means: 'the notes that land on the numbers', gives: 'G · F · D · B' },
          { symbol: 'Check them', means: 'G7 is spelled G B D F', gives: 'all four are chord tones' },
        ],
        note: 'Nothing is being steered here. The extra note shifts everything by one eighth, and the chord tones fall on the beat by themselves for a whole octave. That is the entire trick.',
      },
      {
        kind: 'keyboard',
        label: 'G mixolydian — seven notes',
        notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
      },
      {
        kind: 'keyboard',
        label: 'G dominant bebop — the F♯ added',
        notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F', 'F♯', 'G'],
        note: 'One extra black key, squeezed between the F and the G. Eight notes now, which is why a bar of eighth notes lines up.',
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
        text: 'Start on the root and go down an octave in straight eighth notes. Every downbeat should be a chord tone. If one is not, the passing note is in the wrong place — stop and find it rather than pushing on, because the whole value of the scale is that alignment.',
      },
    ],
    related: ['chord-numbers', 'major-scale-modes', 'diminished-and-blues'],
  },
  {
    slug: 'diminished-and-blues',
    title: 'Diminished & blues scales',
    category: 'Scales',
    summary: 'The most symmetric scale and the least, and why they belong on the same practice day.',
    inPlainTerms:
      'One of these scales is built from a rigid repeating pattern and can be worked out with arithmetic. The other has no logic at all and only makes sense from listening. Practising them side by side keeps you honest about which kind of musician you are being.',
    blocks: [
      {
        kind: 'prose',
        text: 'The half-whole diminished scale alternates half steps and whole steps from the root of a dominant chord: up one key, up two, up one, up two, and so on. Because the pattern repeats every three half steps, the scale repeats itself every minor third.',
      },
      {
        kind: 'worked',
        label: 'Half-whole from G, and what it gives you over G7',
        rows: [
          { symbol: 'The pattern', means: 'half step, whole step, half, whole, half, whole, half, whole', gives: 'G A♭ B♭ B C♯ D E F' },
          { symbol: 'A♭', means: 'a half step above the root', gives: '♭9' },
          { symbol: 'B♭', means: 'a step and a half above', gives: '♯9' },
          { symbol: 'B', means: 'the 3rd — so it still sounds like G7', gives: '3' },
          { symbol: 'C♯', means: 'the tritone — the note dead opposite G', gives: '♯11' },
          { symbol: 'E', means: 'the natural 6th, an octave up', gives: '13' },
          { symbol: 'F', means: 'the flat 7th — the note that makes G a dominant rather than major', gives: '♭7' },
        ],
        note: 'Compare this to the altered scale. Both give you ♭9, ♯9 and ♯11 — but this one keeps the natural 13 where altered gives you a ♭13. That difference is the whole reason to know both.',
      },
      {
        kind: 'keyboard',
        label: 'Half-whole diminished from G',
        notes: ['G', 'A♭', 'B♭', 'B', 'C♯', 'D', 'E', 'F', 'G'],
        note: 'Look at the gaps rather than the names: one key, two keys, one, two, all the way up. The shape repeats every three keys, which is why there are only three of these scales.',
      },
      {
        kind: 'callout',
        title: 'Three shapes cover twelve roots',
        text: 'Because the pattern repeats every minor third, there are only three distinct diminished scales in existence. Work that out once at the keyboard and you have permanently reduced twelve fingerings to three.',
      },
      {
        kind: 'prose',
        text: 'The blues scale is the opposite in every way: no symmetry, no arithmetic, nothing to derive. It is minor pentatonic with one extra note, and it exists because of how it is played rather than how it is spelled — which is exactly why it sits next to the diminished scale in the rotation, as a corrective.',
      },
      {
        kind: 'worked',
        label: 'C blues, and where it comes from',
        rows: [
          { symbol: 'C minor pentatonic', means: 'five notes — 1, ♭3, 4, 5, ♭7', gives: 'C E♭ F G B♭' },
          { symbol: 'Add the ♭5', means: 'one note between the 4th and the 5th', gives: 'C E♭ F G♭ G B♭' },
          { symbol: 'That added note', means: 'the "blue note" — it is passed through, not landed on', gives: 'G♭' },
        ],
        note: 'The ♭5 is a note you slide off, not one you rest on. Nothing in the spelling tells you that, which is why this scale has to be learned by ear from records rather than from a page.',
      },
      {
        kind: 'keyboard',
        label: 'The C blues scale',
        notes: ['C', 'E♭', 'F', 'G♭', 'G', 'B♭', 'C'],
        note: 'Six notes. The G♭ and G sit next to each other — that pair is the sound, and you pass through the G♭ rather than landing on it. No fingering is marked here because none is standard: this is a scale players finger to suit the lick.',
      },
    ],
    related: ['bebop-scales', 'upper-structure-triads'],
  },
  {
    slug: 'shell-voicings',
    title: 'Shell voicings',
    category: 'Harmony',
    summary: 'Root, third and seventh — the smallest voicing that still says what the chord is.',
    inPlainTerms:
      'A four-note chord has one note that does nothing. Drop it, keep the two that carry the sound, and your left hand has a shape it can play under anything — small enough that nothing has to stretch, and close enough to the next chord that barely a finger moves.',
    blocks: [
      {
        kind: 'prose',
        text: 'A chord’s identity lives in its third and its seventh. The third tells you major or minor; the seventh tells you what kind of chord it is. The fifth tells you nothing at all and is nearly always disposable, and the root only needs playing when nobody else is playing it. Those two notes — third and seventh — are called the guide tones, and they are what a shell voicing is built to carry.',
      },
      {
        kind: 'prose',
        text: 'Start with the smallest thing that works: the root plus one guide tone. Two notes. Which guide tone you pick is decided by what the next chord needs, and if you choose well, the moving voice barely moves at all.',
      },
      {
        kind: 'worked',
        label: 'Two-note shells through the ii–V–I in C',
        rows: [
          { symbol: 'Dm7', means: 'root plus its ♭3 — a minor third, so your hand is barely open', gives: 'D – F' },
          { symbol: 'G7', means: 'root plus its ♭7. F again: the ♭3 of Dm7 is also the ♭7 of G7', gives: 'G – F' },
          { symbol: 'Cmaj7', means: 'root plus its 3rd, one half step down from the F', gives: 'C – E' },
        ],
        note: 'The guide tone goes F, F, E across the whole progression — it holds, then drops one key. The hand shapes span 3, 10 and 4 semitones, so nothing stretches. This is the version to learn first, and it is still what you will play behind a busy melody years from now.',
      },
      {
        kind: 'keyboard',
        label: 'Dm7 — root and ♭3',
        notes: ['D3', 'F3'],
        fingers: [5, 3],
        hand: 'LH',
        span: ['G2', 'B3'],
      },
      {
        kind: 'keyboard',
        label: 'G7 — root and ♭7. The F has not moved.',
        notes: ['G2', 'F3'],
        fingers: [5, 1],
        hand: 'LH',
        span: ['G2', 'B3'],
      },
      {
        kind: 'keyboard',
        label: 'Cmaj7 — root and 3rd. The F dropped one key to E.',
        notes: ['C3', 'E3'],
        fingers: [5, 3],
        hand: 'LH',
        span: ['G2', 'B3'],
      },
      {
        kind: 'keyboard',
        label: 'The three of them, stacked up',
        notes: ['D3', 'F3', 'G2', 'C3', 'E3'],
        span: ['G2', 'B3'],
        note: 'All three diagrams are drawn over the same keys, so you can compare them directly: the F is literally the same key in the first two pictures. Note the G is below the D — the roots fall, and that is what lets the guide tone stay put.',
      },
      {
        kind: 'prose',
        text: 'When you want both guide tones, add the other one on top. Now the shorthand matters, because three notes can be stacked in two orders — and the numbers describe that order read bottom to top, like the notes sit on the keyboard. 1-3-7 means root at the bottom, third above it, seventh on top. 1-7-3 is the same three notes with the top two swapped.',
      },
      {
        kind: 'callout',
        title: 'The numbers are an order, not a list',
        text: 'This trips up nearly everyone once. 1-3-7 is not telling you which degrees the chord contains — a m7 chord always contains its 3rd and its 7th, whatever you do. It is telling you the order to stack them in, from the bottom of your hand upwards. So a Dm7 played 1-7-3 still has F in it; F is simply the note on top, which is why 3 comes last.',
      },
      {
        kind: 'worked',
        label: 'The ii–V–I in C, spelled out',
        rows: [
          { symbol: 'Dm7 as 1-7-3', means: 'D, then the ♭7 above it, then the ♭3 on top — so the F lands high', gives: 'D – C – F' },
          { symbol: 'G7 as 1-3-7', means: 'G, then the 3rd above it, then the ♭7 on top — the same F, in the same place', gives: 'G – B – F' },
          { symbol: 'Cmaj7 as 1-7-3', means: 'C, then the natural 7 above it, then the 3rd on top', gives: 'C – B – E' },
        ],
        note: 'The orders alternate, and that is not decoration. It is what puts the shared note in the same octave on both chords, so your hand does not have to go and find it.',
      },
      {
        kind: 'keyboard',
        label: 'Dm7 as 1-7-3',
        notes: ['D3', 'C4', 'F4'],
        fingers: [5, 2, 1],
        hand: 'LH',
        span: ['C3', 'F4'],
      },
      {
        kind: 'keyboard',
        label: 'G7 as 1-3-7. The F stays exactly where it was.',
        notes: ['G3', 'B3', 'F4'],
        fingers: [5, 3, 1],
        hand: 'LH',
        span: ['C3', 'F4'],
      },
      {
        kind: 'keyboard',
        label: 'Cmaj7 as 1-7-3. Now the B stays and the F drops to E.',
        notes: ['C3', 'B3', 'E4'],
        fingers: [5, 2, 1],
        hand: 'LH',
        span: ['C3', 'F4'],
        note: 'One key held and one key moving a single step, both times — and you can see it, because all three are drawn over the same range. This is why the two stacking orders alternate.',
      },
      {
        kind: 'prose',
        text: 'Now look at the top two notes of each shape. One of them is always a note the next chord also contains — and because the orders alternate, it stays on the same key rather than turning up an octave away.',
      },
      {
        kind: 'worked',
        label: 'What the guide tones do',
        rows: [
          { symbol: 'Dm7 → G7', means: 'F is in both chords — the ♭3 of Dm7 is the ♭7 of G7, so it simply stays', gives: 'F held' },
          { symbol: 'Dm7 → G7', means: 'C drops one key to B — the ♭7 of Dm7 becomes the 3rd of G7', gives: 'C – B' },
          { symbol: 'G7 → Cmaj7', means: 'B is in both — the 3rd of G7 is the 7th of Cmaj7, so it stays put', gives: 'B held' },
          { symbol: 'G7 → Cmaj7', means: 'F drops one key to E — the ♭7 of G7 becomes the 3rd of Cmaj7', gives: 'F – E' },
        ],
        note: 'One note held and one note moving a half step, every time. That is what "voice leading" means: not a rule imposed on you, but the reason one arrangement feels easy and another feels like a leap.',
      },
      {
        kind: 'callout',
        title: 'What this costs, and the way out',
        text: 'The 1-7-3 shapes are a stretch: Dm7 as D–C–F spans a minor 10th. Two of the three chords here do. If that is beyond your hand today, do not fix it by stacking everything 1-3-7 — that keeps every shape inside a 7th but throws the shared note an octave, which is the one thing these voicings exist to avoid. Use the two-note shells above instead; they are small and they hold the note. And the real answer is on the next page: stop playing the root, and both guide tones fit under four fingers with nothing to reach for.',
      },
      {
        kind: 'worked',
        label: 'The same Dm7, stacked both ways',
        rows: [
          { symbol: '1-3-7', means: 'D on the bottom. Up a minor 3rd to F, the ♭3. Up a fifth to C, the ♭7. Ten semitones in all.', gives: 'D – F – C' },
          { symbol: '1-7-3', means: 'D on the bottom. Up a minor 7th to C, the ♭7. Up a fourth to F, the ♭3. Fifteen semitones — a 10th.', gives: 'D – C – F' },
        ],
        note: 'Identical notes, identical chord, one is half again as wide as the other. Both are correct voicings of Dm7; only one of them is comfortable.',
      },
      {
        kind: 'keyboard',
        label: 'Dm7 as 1-3-7 — a minor 7th under the hand',
        notes: ['D', 'F', 'C'],
      },
      {
        kind: 'keyboard',
        label: 'Dm7 as 1-7-3 — the same notes, spread to a 10th',
        notes: ['D', 'C', 'F'],
        note: 'Same three keys are lit in both. The difference is only how far apart they are, and the second one is a genuine stretch.',
      },
      {
        kind: 'prose',
        text: 'With the shell in the left hand, the right hand adds colour on top. The usual pair is the 9 and the 13 — in C, that is D and A over the Cmaj7. Five notes total, built from one rule, and it sounds like a record.',
      },
      {
        kind: 'worked',
        label: 'Adding the right hand over the same three chords',
        rows: [
          { symbol: 'Dm7', means: 'left hand D–F–C, right hand takes the 9 and the 11', gives: 'E and G on top' },
          { symbol: 'G7', means: 'left hand G–B–F, right hand takes the 9 and the 13', gives: 'A and E on top' },
          { symbol: 'Cmaj7', means: 'left hand C–E–B, right hand takes the 9 and the 13', gives: 'D and A on top' },
        ],
        note: 'The right hand notes move by step too — G to E, then E to D. The same principle, an octave higher.',
      },
    ],
    related: ['chord-numbers', 'rootless-voicings', 'minor-two-five-one'],
  },
  {
    slug: 'rootless-voicings',
    title: 'Rootless voicings (A & B)',
    category: 'Harmony',
    summary: 'The Bill Evans forms: drop the root, keep the colour, let the bass do its job.',
    inPlainTerms:
      'When someone else is playing the bass note, you playing it too just makes mud. Take it out, and the four notes you have left are richer than the five you started with. There are two ways to stack them, and you alternate between them so your hand stops moving.',
    blocks: [
      {
        kind: 'prose',
        text: 'In a trio the bassist plays the root, so the pianist stops playing it. What remains is the third, fifth, seventh and ninth, arranged into two four-note shapes. Form A is built from the third upwards; form B is built from the seventh upwards. Every chord has both.',
      },
      {
        kind: 'worked',
        label: 'Both forms of Dm9, spelled out',
        rows: [
          { symbol: 'Form A', means: 'start on the 3rd and stack: 3, 5, ♭7, 9', gives: 'F – A – C – E' },
          { symbol: 'Form B', means: 'start on the 7th and stack: ♭7, 9, 3, 5', gives: 'C – E – F – A' },
        ],
        note: 'Identical notes, different bottom note. Form B is simply form A with the top two moved underneath, which is why they fit together so well when you alternate them.',
      },
      {
        kind: 'keyboard',
        label: 'Dm9, form A — from the 3rd',
        notes: ['F', 'A', 'C', 'E'],
        fingers: [1, 2, 3, 5],
        hand: 'RH',
      },
      {
        kind: 'keyboard',
        label: 'Dm9, form B — from the 7th',
        notes: ['C', 'E', 'F', 'A'],
        fingers: [1, 2, 4, 5],
        hand: 'RH',
        note: 'No D in either — the bassist has that. The same four letters, sitting in a different octave arrangement.',
      },
      {
        kind: 'table',
        head: ['Chord type', 'Form A (from the 3rd)', 'Form B (from the 7th)'],
        rows: [
          ['m7', '3 5 ♭7 9', '♭7 9 3 5'],
          ['7', '3 13 ♭7 9', '♭7 9 3 13'],
          ['maj7', '3 5 7 9', '7 9 3 5'],
        ],
      },
      {
        kind: 'prose',
        text: 'The reason to know both is that alternating them makes a ii–V–I almost motionless. Play the ii in form A and the V in form B and only one note in the entire hand changes.',
      },
      {
        kind: 'worked',
        label: 'ii–V–I in C, alternating the forms',
        rows: [
          { symbol: 'Dm9, form A', means: '3, 5, ♭7, 9 of Dm7', gives: 'F – A – C – E' },
          { symbol: 'G13, form B', means: '♭7, 9, 3, 13 of G7', gives: 'F – A – B – E' },
          { symbol: 'What moved', means: 'C dropped one key to B. Nothing else moved at all.', gives: 'one note' },
          { symbol: 'Cmaj9, form A', means: '3, 5, 7, 9 of Cmaj7', gives: 'E – G – B – D' },
          { symbol: 'What moved', means: 'F to E, A to G, E to D — all by step; B stayed put', gives: 'three notes, one key each' },
        ],
        note: 'Take the ii in form B instead and the V wants form A. The rule is just: alternate. Whichever form the ii takes, the V takes the other one.',
      },
      {
        kind: 'callout',
        title: 'The test',
        text: 'Play the progression and watch only the top note of the chord. If it moves by one key or stays where it is across all three chords, you picked the right forms. If it leaps, you used the same form twice — swap one and try again.',
      },
    ],
    related: ['chord-numbers', 'shell-voicings', 'upper-structure-triads'],
  },
  {
    slug: 'upper-structure-triads',
    title: 'Upper structure triads',
    category: 'Harmony',
    summary: 'A plain major triad in the right hand over a dominant shell, and four colours fall out.',
    inPlainTerms:
      'All those frightening symbols on dominant chords can be played as an ordinary major triad — the kind you learned in your first year — as long as your left hand is holding the right two notes underneath. There are four triads worth knowing, and they are all shapes you already own.',
    blocks: [
      {
        kind: 'prose',
        text: 'Left hand holds just the third and the seventh of the dominant. Over G7 that is B and F — two notes, nothing else. Then your right hand plays a plain major triad on top. Which triad you choose decides which alterations come out, and because they are ordinary triads you can grab them as shapes instead of working out spellings mid-solo.',
      },
      {
        kind: 'worked',
        label: 'The four triads over G7 — left hand holds B and F throughout',
        rows: [
          { symbol: 'A♭ major', means: 'A♭ C E♭ — counting each against G gives ♭9, 11, ♭13', gives: 'the fully altered sound' },
          { symbol: 'E major', means: 'E G♯ B — that is 13, ♭9 and the 3rd', gives: 'bright and biting' },
          { symbol: 'E♭ major', means: 'E♭ G B♭ — that is ♭13, the root, and ♯9', gives: 'the dark one' },
          { symbol: 'A major', means: 'A C♯ E — that is 9, ♯11, 13', gives: 'lydian dominant, no alterations' },
        ],
        note: 'Every one of those is a triad you can already play without thinking. The work is not in the triad — it is in knowing which one to reach for, which is why they are drilled as four grabs in one key before moving around the cycle.',
      },
      {
        kind: 'keyboard',
        label: 'The left hand alone — the 3rd and ♭7 of G7',
        notes: ['B3', 'F4'],
        fingers: [5, 1],
        hand: 'LH',
        span: ['G3', 'B4'],
        note: 'Two notes. This never changes while you try the four triads above it.',
      },
      {
        kind: 'keyboard',
        label: 'Add an A♭ major triad on top — the fully altered sound',
        notes: ['B3', 'F4', 'A♭4', 'C5', 'E♭5'],
        fingers: [5, 1, 1, 3, 5],
        span: ['G3', 'F5'],
      },
      {
        kind: 'keyboard',
        label: 'Or an A major triad — lydian dominant, no alterations',
        notes: ['B3', 'F4', 'A4', 'C♯5', 'E5'],
        fingers: [5, 1, 1, 3, 5],
        span: ['G3', 'F5'],
        note: 'Same two notes underneath, an ordinary major triad on top, and the entire character of the chord changes. The lower pair is the left hand — 5 and 1 — and the triad is the right, 1-3-5. Both diagrams are drawn over the same keys, so you can see the shell has not moved.',
      },
      {
        kind: 'prose',
        text: 'Where do the four come from? Each is built on a particular degree above the dominant’s root. Written in roman numerals they are ♭II, VI, ♭VI and II — meaning a triad on the flattened 2nd degree above G, on the 6th, on the flattened 6th, and on the 2nd.',
      },
      {
        kind: 'table',
        head: ['Numeral', 'Count up from G', 'Triad', 'Extensions it adds'],
        rows: [
          ['♭II', 'one half step', 'A♭', '♭9, 11, ♭13'],
          ['VI', 'nine half steps', 'E', '13, ♭9, 3'],
          ['♭VI', 'eight half steps', 'E♭', '♭13, root, ♯9'],
          ['II', 'two half steps', 'A', '9, ♯11, 13'],
        ],
      },
      {
        kind: 'callout',
        title: 'Learn them as four grabs, not four spellings',
        text: 'Four triads over one shell, in one key, until the hand finds them without thought. Only then move it round the cycle of fourths. Trying to derive the alterations in real time is exactly what keeps people stuck at level 4 — the whole device exists to save you from that arithmetic.',
      },
    ],
    related: ['chord-numbers', 'melodic-minor-family', 'rootless-voicings'],
  },
  {
    slug: 'minor-two-five-one',
    title: 'The minor ii–V–i',
    category: 'Harmony',
    summary: 'Half-diminished into an altered dominant into a minor 6/9 — the progression most people skip.',
    inPlainTerms:
      'The most common three-chord move in jazz has a minor-key version that is genuinely a different animal, not just the major one with a sad note. Most people at your level can play the major one fluently and fudge this one. Learning it properly is the single biggest step available.',
    blocks: [
      {
        kind: 'progression',
        label: 'Minor ii – V – i in C',
        chords: ['Dm7♭5', 'G7alt', 'Cm6/9'],
        highlight: 1,
        note: 'Three chords, three different scale sources — which is exactly why it takes longer to learn than the major version.',
      },
      {
        kind: 'worked',
        label: 'What each chord actually is',
        rows: [
          { symbol: 'Dm7♭5', means: 'a Dm7 with the 5th flattened: D, ♭3, ♭5, ♭7', gives: 'D – F – A♭ – C' },
          { symbol: 'G7alt', means: 'a G7 whose 5th and 9th are all bent — play A♭ melodic minor over it', gives: 'G – B – F plus alterations' },
          { symbol: 'Cm6/9', means: 'a minor chord with a natural 6th and a 9th, not a ♭7', gives: 'C – E♭ – A – D' },
        ],
        note: 'The "ø" symbol you will see on charts means the same thing as m7♭5 — half-diminished. Two names, one chord.',
      },
      {
        kind: 'prose',
        text: 'Almost everyone arrives at level 4 with fluent major ii–V–Is and a vague, improvised approach to the minor one. The differences are real: the ii is half-diminished rather than plain minor, the V is nearly always altered rather than plain, and the tonic is a minor 6 or minor-major 7 rather than a m7. Practising it daily, in every key, is the highest-yield harmonic habit available at this stage.',
      },
      {
        kind: 'worked',
        label: 'The same progression as shells, left hand only',
        rows: [
          { symbol: 'Dm7♭5 as 1-♭3-♭7', means: 'root, the ♭3 above it, the ♭7 on top — a minor 7th, same shape as a plain Dm7', gives: 'D – F – C' },
          { symbol: 'G7alt as 1-3-♭7', means: 'root, the 3rd above it, the ♭7 on top — the same 5-3-1 shape again', gives: 'G – B – F' },
          { symbol: 'Cm6/9 as 1-♭3-6', means: 'root, the ♭3 above it, the natural 6th on top', gives: 'C – E♭ – A' },
        ],
        note: 'Read bottom to top, as always. The shell of the half-diminished ii is identical to the shell of a plain Dm7 — the ♭5 lives in the right hand, so your left hand barely has to change between the major and minor versions of the progression.',
      },
      {
        kind: 'keyboard',
        label: 'Dm7♭5 — the full chord',
        notes: ['D', 'F', 'A♭', 'C'],
        fingers: [1, 2, 3, 5],
        hand: 'RH',
        note: 'The A♭ is the flattened 5th. Leave it out and what remains — D, F, C — is the same shell you already play on a plain Dm7.',
      },
      {
        kind: 'keyboard',
        label: 'Cm6/9 — the minor tonic',
        notes: ['C', 'E♭', 'A', 'D'],
        fingers: [1, 2, 3, 5],
        hand: 'RH',
        note: 'An A natural, not a B♭. That natural 6th is what makes it sound finished instead of hanging.',
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Shell the whole thing first, using the three shapes above.',
          'Add the ♭9 and ♭13 over the V in the right hand, taken from the altered scale.',
          'Voice the tonic as m6/9 rather than m7 — the natural 6th is what makes it sound resolved instead of suspended.',
          'Then play the same progression a fourth higher, without stopping.',
        ],
      },
    ],
    related: ['chord-numbers', 'melodic-minor-family', 'shell-voicings'],
  },
  {
    slug: 'hand-independence',
    title: 'Hand independence',
    category: 'Technique',
    summary: 'Six drills in rotation, built on the principle that each hand must be automatic before they combine.',
    inPlainTerms:
      'Playing two different rhythms at once is not a talent some people are born with. It is a sequence: make one hand automatic, make the other hand automatic, then put them together far slower than feels necessary. Skipping the middle step is why people plateau.',
    blocks: [
      {
        kind: 'prose',
        text: 'Independence is not a gift, it is an order of operations: one hand automatic, then the other hand automatic, then both at half tempo. Practising hands together before either hand is automatic is the single most common reason this stops improving.',
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Charleston ostinato — left hand plays on beat 1 and on the "and" of beat 2, while the right runs steady eighth notes. Then shift the left hand pattern one eighth later and do it again. Four positions in total.',
          'Walking bass and comping — left hand plays quarter notes moving into each new chord by a half step, right hand plays chords only on the offbeats. Start at ♩=60.',
          'Polyrhythms — three evenly-spaced notes in one hand against two in the other, said out loud as "cold cup of tea". When that is automatic, four against three: "pass the god-damn butter".',
          'Bach two-part inventions — No. 1, 8 or 13. Sixteen bars a week, each hand memorised alone before you combine them.',
          'Sing one, play the other — left hand walks the bass while you sing the melody, then swap. Short, unpleasant, and it separates the two parts in your head faster than anything else.',
          'Rhythmic displacement — hold a steady pulse on beats 2 and 4 in one hand while the melody starts a half beat late and stays there for a full chorus.',
        ],
      },
      {
        kind: 'callout',
        title: 'Walking bass is the one that pays',
        text: 'Of the six, left-hand walking bass under right-hand offbeat comping is the drill that converts directly into being able to play alone. It has to be slow enough to be boring before it is fast enough to be useful, and going faster sooner does not speed that up.',
      },
    ],
    related: ['tempo-targets', 'shell-voicings'],
  },
  {
    slug: 'tempo-targets',
    title: 'Tempo targets & the two-mistake rule',
    category: 'Practice',
    summary: 'What to log, what the target is, and when to slow down.',
    inPlainTerms:
      'Practice only compounds if you can tell whether today was better than three weeks ago, which means writing a number down. And going faster than you can play cleanly does not build speed — it builds mistakes, very reliably.',
    blocks: [
      {
        kind: 'callout',
        title: 'Put the click on 2 and 4',
        text: 'Not on 1 and 3. With the metronome on the backbeat, your own sense of time has to hold the downbeat — which is the actual skill. On 1 and 3 the machine holds it for you and you learn nothing while feeling like you practised.',
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
        text: 'One number per key, written down: the fastest tempo at which you played it cleanly, in eighth notes, four octaves, hands together. Without that number you have no way of knowing whether anything is improving, and practice that you cannot measure does not compound.',
      },
      {
        kind: 'callout',
        title: 'The two-mistake rule',
        text: 'Break down twice at a tempo and take it back 6 bpm. Repetition installs whatever you actually played, mistakes included — so clean at 80 beats sloppy at 110 every single time, and it is not close.',
      },
    ],
    related: ['cycle-of-fourths', 'hand-independence'],
  },
]

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug)
}
