import type { Topic } from '../types'

/** Scale topics beyond the core four in theory.ts. */
export const SCALES: Topic[] = [
  {
    slug: 'scales-in-thirds',
    title: 'Scales in 3rds and other patterns',
    category: 'Scales',
    summary: 'The level-6 bar for every scale: broken into thirds, then fourths, then the patterns that turn a scale into a line.',
    inPlainTerms:
      'Playing a scale straight up and down proves you know the notes. Playing it as a chain of skips proves your hand knows where every note is from every other note, and that is the thing that makes a scale usable in a solo instead of only in a warm-up.',
    blocks: [
      {
        kind: 'prose',
        text: 'A scale in thirds is the scale played as pairs: each note followed by the one two steps above it, then the next note and its partner, all the way up. The line skips and steps alternately, which is what melodies actually do, and it forces the crossings to happen in unfamiliar places.',
      },
      {
        kind: 'worked',
        label: 'C major in 3rds, ascending',
        rows: [
          { symbol: 'C – E', means: 'the first note and the one two steps above it', gives: 'C E' },
          { symbol: 'D – F', means: 'up one step, then the third above that', gives: 'D F' },
          { symbol: 'E – G', means: 'and again — every pair is a third, every pair starts a step higher', gives: 'E G' },
          { symbol: 'F – A, G – B', means: 'the pattern continues through the scale', gives: 'F A G B' },
          { symbol: 'A – C, B – D, C – E', means: 'up to the octave and past it, so the line does not stop on a leap', gives: 'A C B D C E' },
        ],
        note: 'Read as one line: C E D F E G F A G B A C B D C E. Sixteen notes for an octave, so a bar of eighth notes covers half a scale and four octaves takes eight bars.',
      },
      {
        kind: 'keyboard',
        label: 'The notes the pairs are drawn from — C major, one octave',
        notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
        note: 'There is no single standard fingering for broken thirds. Keep the thumb crossings where the straight scale has them and let the other fingers reach; the hand sorts it out within a week.',
      },
      {
        kind: 'table',
        head: ['Pattern', 'C major, first bar', 'What it trains'],
        rows: [
          ['3rds', 'C E D F E G F A', 'Skips inside the scale — the level-6 bar'],
          ['4ths', 'C F D G E A F B', 'Wider skips, awkward crossings, the modern sound'],
          ['Up four, back one', 'C D E F D E F G', 'Sequences — the shape of most bebop lines'],
          ['Triplets', 'C D E · D E F · E F G', 'Displacing the accent: the downbeat lands on a different degree each beat'],
          ['Contrary motion', 'Hands apart from one C, back together', 'Independence of the two thumbs'],
        ],
      },
      {
        kind: 'callout',
        title: 'The order to learn them in',
        text: 'Thirds first, in the key of the day, straight after the plain scale. Nothing else until thirds are even at the target tempo. Fourths and sequences are unit 10 material; before that they cost more than they pay.',
      },
    ],
    related: ['major-scale-modes', 'tempo-targets', 'fingering-principles', 'building-speed'],
  },
  {
    slug: 'half-diminished-scale',
    title: 'The half-diminished scale',
    category: 'Scales',
    summary: 'Two scales fit the ii chord of a minor key, and they differ by one note: the 2nd.',
    inPlainTerms:
      'The first chord of the minor progression is the one people run out of ideas over, because the obvious scale for it has a note that grates against the root. Raise that one note and you get a brighter scale from the melodic minor family that fits the chord perfectly.',
    blocks: [
      {
        kind: 'prose',
        text: 'Dm7♭5 is the ii of C minor. The scale that comes with it for free is D locrian, the seventh mode of E♭ major: every note of E♭ major, started from D. It fits the chord, but its 2nd degree is E♭, a half step above the root, and lines that land on it sound wrong.',
      },
      {
        kind: 'worked',
        label: 'Two scales for Dm7♭5',
        rows: [
          { symbol: 'D locrian', means: 'E♭ major from its 7th degree — the ♭2 is the problem note', gives: 'D E♭ F G A♭ B♭ C' },
          { symbol: 'D locrian ♯2', means: 'the same scale with the 2nd raised to E — the 6th mode of F melodic minor', gives: 'D E F G A♭ B♭ C' },
          { symbol: 'What changed', means: 'one note, E♭ to E, and the scale now has a natural 9 to land on', gives: 'E' },
        ],
        note: 'Locrian ♯2 is the scale players mean by "the half-diminished scale". The chord is the same; the 9 is available.',
      },
      {
        kind: 'keyboard',
        label: 'D locrian — the E♭ grates against the D',
        notes: ['D', 'E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D'],
      },
      {
        kind: 'keyboard',
        label: 'D locrian ♯2 — the E replaces it',
        notes: ['D', 'E', 'F', 'G', 'A♭', 'B♭', 'C', 'D'],
        note: 'Finger it as F melodic minor, which is what it is. The thumb lands where F melodic minor puts it, not where a scale from D would.',
      },
      {
        kind: 'callout',
        title: 'Which to use',
        text: 'If the melody has an E♭ over the Dm7♭5, the tune is in locrian and so should you be. Otherwise locrian ♯2: it is brighter, it lines up with the rootless voicing that puts the 9 on top, and it leads more naturally into the altered scale on the G7 that follows.',
      },
    ],
    related: ['melodic-minor-family', 'minor-two-five-one', 'rootless-minor-voicings', 'major-scale-modes'],
  },
  {
    slug: 'harmonic-minor-modes',
    title: 'Harmonic minor & its fifth mode',
    category: 'Scales',
    summary: 'The minor scale with the raised 7th, and the mode of it that is the classic scale for a V chord going to a minor key.',
    inPlainTerms:
      'The harmonic minor scale exists to give a minor key a proper dominant chord, and started from that dominant it produces a scale with a distinctive Spanish-sounding gap in it. That scale is the traditional choice over a dominant resolving to minor, older than the altered scale and darker in a different way.',
    blocks: [
      {
        kind: 'worked',
        label: 'C harmonic minor and what it is for',
        rows: [
          { symbol: 'C natural minor', means: 'the 3rd, 6th and 7th flattened — its V chord is Gm7, which does not pull anywhere', gives: 'C D E♭ F G A♭ B♭' },
          { symbol: 'Raise the 7th', means: 'B♭ becomes B, and the chord on G becomes G7 — a real dominant', gives: 'C D E♭ F G A♭ B' },
          { symbol: 'The gap', means: 'A♭ to B is three half steps in a row with nothing between — the sound of the scale', gives: 'A♭ – B' },
        ],
      },
      {
        kind: 'keyboard',
        label: 'C harmonic minor — the B is the raised note',
        notes: ['C', 'D', 'E♭', 'F', 'G', 'A♭', 'B', 'C'],
        fingers: [1, 2, 3, 1, 2, 3, 4, 5],
        hand: 'RH',
        note: 'Same fingering as C major and C natural minor. The raised 7th does not move the thumb.',
      },
      {
        kind: 'prose',
        text: 'Now start the same seven notes from G. This is the fifth mode of harmonic minor, called phrygian dominant, and it is the scale of the G7 in C minor. It has the ♭9 and the ♭13, so it sounds altered, but it keeps the natural 5th, which the altered scale throws away.',
      },
      {
        kind: 'worked',
        label: 'G phrygian dominant, over G7',
        rows: [
          { symbol: 'G', means: 'the root of the dominant chord', gives: '1' },
          { symbol: 'A♭', means: 'a half step above the root', gives: '♭9' },
          { symbol: 'B', means: 'the major 3rd — so it is still a dominant', gives: '3' },
          { symbol: 'C', means: 'the 4th, the note the chord resolves to', gives: '11' },
          { symbol: 'D', means: 'the natural 5th — the note the altered scale does not have', gives: '5' },
          { symbol: 'E♭', means: 'a half step above the 5th', gives: '♭13' },
          { symbol: 'F', means: 'the flat 7th, the other note that makes it a dominant', gives: '♭7' },
        ],
        note: 'Compared with G altered: no ♯9, no ♯11, and the 5th is back. The two scales share the ♭9 and ♭13 and differ everywhere else.',
      },
      {
        kind: 'keyboard',
        label: 'G phrygian dominant — C harmonic minor from G',
        notes: ['G', 'A♭', 'B', 'C', 'D', 'E♭', 'F', 'G'],
        note: 'The A♭ to B gap is now at the bottom of the scale. Finger it as C harmonic minor started on the 5th, thumb on C.',
      },
      {
        kind: 'callout',
        title: 'When to reach for it instead of altered',
        text: 'When the melody over the dominant has a natural 5th in it, or when you want the older sound: this is what Bud Powell played over a V going to minor, and what every flamenco guitarist plays over everything. Altered is the modern default; this is the one it replaced, and it is still right for a lot of tunes.',
      },
    ],
    related: ['melodic-minor-family', 'minor-two-five-one', 'altered-dominant-voicings', 'chord-scale-reference'],
  },
  {
    slug: 'lydian-dominant',
    title: 'Lydian dominant',
    category: 'Scales',
    summary: 'Mixolydian with a raised 4th: the scale for a dominant that is not going home, and for every tritone sub.',
    inPlainTerms:
      'Some dominant chords do not resolve where the ear expects, and over those the ordinary dominant scale sounds slightly wrong. Raising one note fixes it, and the scale that results turns out to be the melodic minor scale seen from a different starting note.',
    blocks: [
      {
        kind: 'worked',
        label: 'G lydian dominant',
        rows: [
          { symbol: 'G mixolydian', means: 'the plain dominant scale — C major from G', gives: 'G A B C D E F' },
          { symbol: 'Raise the 4th', means: 'C becomes C♯, and the scale no longer wants to fall to C', gives: 'G A B C♯ D E F' },
          { symbol: 'Which is', means: 'D melodic minor started from its 4th degree, G', gives: 'D E F G A B C♯' },
        ],
        note: 'One note. The C in mixolydian is the note that pulls the chord home; sharpen it and the pull disappears. That is what makes this the scale for a dominant that is staying put.',
      },
      {
        kind: 'keyboard',
        label: 'G lydian dominant — the C♯ is the raised note',
        notes: ['G', 'A', 'B', 'C♯', 'D', 'E', 'F', 'G'],
        note: 'Finger it as D melodic minor, thumb on D. The melodic minor family page gives the fingering rule for every mode of the scale.',
      },
      {
        kind: 'table',
        head: ['Where it belongs', 'Example in C', 'Why'],
        rows: [
          ['The II7 chord', 'D7♯11 in Take the A Train', 'It goes to Dm7, not to G — the 4th of D would have been G, the note it is not going to'],
          ['A tritone substitute', 'D♭7 in place of G7', 'D♭ lydian dominant is A♭ melodic minor, which is the same notes as G altered'],
          ['A ♭VII7', 'B♭7 going to Cmaj7', 'The backdoor dominant resolves up a step, so it does not want the plain 4th'],
          ['Any 7♯11 or 7♭5', 'C7♯11', 'The ♯11 is in the chord symbol'],
        ],
      },
      {
        kind: 'callout',
        title: 'Altered and lydian dominant are one scale',
        text: 'G altered is A♭ melodic minor. D♭ lydian dominant is also A♭ melodic minor. So the tritone sub and the altered dominant share their scale as well as their guide tones, and unit 6 practises them back to back so you can hear that they are the same seven notes with a different root underneath.',
      },
    ],
    related: ['melodic-minor-family', 'tritone-substitution', 'major-scale-modes', 'chord-scale-reference'],
  },
  {
    slug: 'chromatic-and-enharmonics',
    title: 'The chromatic scale, and why C♭ is B',
    category: 'Scales',
    summary: 'All twelve keys in a row, the one fingering that covers them, and why some scales spell a white key with a flat.',
    inPlainTerms:
      'Every key on the piano is a half step from the next, and the scale that plays all of them in order is the one all the others are cut from. It also explains why the same key can have two names: the name depends on which scale you arrived by, not on the key itself.',
    blocks: [
      {
        kind: 'keyboard',
        label: 'C chromatic, right hand — thumb on the white keys, 3 on the black',
        notes: ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B', 'C'],
        fingers: [1, 3, 1, 3, 1, 2, 3, 1, 3, 1, 3, 1, 2],
        hand: 'RH',
        note: 'This is the standard fingering and it is the only one worth learning: the thumb takes every white key, 3 takes every black key, and 2 takes the second of the two white keys that sit together, E to F and B to C.',
      },
      {
        kind: 'prose',
        text: 'The same twelve keys carry more than twelve names. Every black key has two, and so do four of the white ones: C♭ is B, F♭ is E, B♯ is C and E♯ is F. Which name is right depends on the scale you are in, because a scale uses each letter exactly once.',
      },
      {
        kind: 'worked',
        label: 'Why A♭ melodic minor has a C♭ in it',
        rows: [
          { symbol: 'The letters', means: 'a seven-note scale takes seven consecutive letters, A through G, starting on its root', gives: 'A B C D E F G' },
          { symbol: 'From A♭', means: 'so the third note is some kind of C', gives: 'A♭ B♭ C?' },
          { symbol: 'The ♭3', means: 'a minor 3rd above A♭ is the key we usually call B — but the letter has to be C, so it is written C♭', gives: 'C♭' },
          { symbol: 'The scale', means: 'each letter once, and the fingers do not care what it is called', gives: 'A♭ B♭ C♭ D♭ E♭ F G' },
        ],
        note: 'Write it as B and the scale has two Bs and no C, and reading it becomes guesswork. The spelling is for the eye; the key is the same.',
      },
      {
        kind: 'table',
        head: ['Written', 'Same key as', 'Where you meet it'],
        rows: [
          ['C♭', 'B', 'G♭ major, A♭ melodic minor, D♭7 as a tritone sub'],
          ['F♭', 'E', 'D♭ minor, rarely'],
          ['E♯', 'F', 'F♯ major, the altered scale on E'],
          ['B♯', 'C', 'C♯ major, the altered scale on B'],
          ['B♭♭', 'A', 'The 7th of a diminished seventh chord on C'],
        ],
      },
      {
        kind: 'callout',
        title: 'What this page is for',
        text: 'Not to make you spell correctly, but so that a C♭ on a chart or on this wiki does not stop you. See it, play B, move on. The one time the spelling matters to your hands is fingering: the chromatic fingering above puts 3 on every black key regardless of what the chart calls it.',
      },
    ],
    related: ['melodic-minor-family', 'fingering-principles', 'tritone-substitution', 'seventh-chords-and-inversions'],
  },
  {
    slug: 'whole-half-diminished',
    title: 'Whole-half diminished over dim7',
    category: 'Scales',
    summary: 'The other diminished scale: the same three sets of notes, started from the other place, for the diminished chord itself.',
    inPlainTerms:
      'The symmetric eight-note scale can be started on either of its two step sizes. Start it on the larger step and it belongs to the diminished chord itself rather than to a dominant, and because there are only three of these scales, learning them is cheap.',
    blocks: [
      {
        kind: 'worked',
        label: 'C whole-half, over Cdim7',
        rows: [
          { symbol: 'The pattern', means: 'whole step, half step, whole, half, whole, half, whole, half', gives: 'C D E♭ F G♭ A♭ A B' },
          { symbol: 'The chord tones', means: 'C, E♭, G♭ and A — every other note of the scale is a note of Cdim7', gives: 'C E♭ G♭ A' },
          { symbol: 'The colour tones', means: 'D, F, A♭ and B — each a whole step above a chord tone', gives: 'D F A♭ B' },
        ],
        note: 'The A is properly B♭♭. Every note of the scale is either in the chord or a whole step above a note in the chord, which is why nothing in it clashes.',
      },
      {
        kind: 'keyboard',
        label: 'C whole-half diminished',
        notes: ['C', 'D', 'E♭', 'F', 'G♭', 'A♭', 'A', 'B', 'C'],
        note: 'Two keys, one key, two, one, all the way up. The half-whole scale on the diminished and blues page is the same idea started on the small step.',
      },
      {
        kind: 'prose',
        text: 'Whole-half from C is the same eight notes as half-whole from B. That is not a coincidence: Cdim7 is B7♭9 with its root removed, so the scale for the diminished chord is the scale for the dominant a half step below it. The secondary dominants page explains the chord side of that; this is the scale side.',
      },
      {
        kind: 'table',
        head: ['Diminished chord', 'Scale', 'Same notes as'],
        rows: [
          ['Cdim7, E♭dim7, G♭dim7, Adim7', 'C whole-half', 'B half-whole'],
          ['C♯dim7, Edim7, Gdim7, B♭dim7', 'C♯ whole-half', 'C half-whole'],
          ['Ddim7, Fdim7, A♭dim7, Bdim7', 'D whole-half', 'C♯ half-whole'],
        ],
      },
      {
        kind: 'callout',
        title: 'Three scales, twelve chords',
        text: 'Each row of the table is four chords and one scale. Learn the three scales and every diminished chord on every chart is covered, which is why unit 7 asks you to prove the three-shapes fact again with arpeggios: the arpeggios and the scales share the same economy.',
      },
    ],
    related: ['diminished-and-blues', 'secondary-dominants', 'sixth-diminished', 'chord-scale-reference'],
  },
  {
    slug: 'pentatonic-scales',
    title: 'Major & minor pentatonic',
    category: 'Scales',
    summary: 'Five notes with no half steps, so nothing in them can clash, and the reason they fit over more chords than they seem to.',
    inPlainTerms:
      'Take a scale and remove the two notes that are a half step from their neighbours. What is left cannot produce a wrong note against most chords, which is why it is the first scale most players improvise with and the one the blues is built on.',
    blocks: [
      {
        kind: 'worked',
        label: 'The two pentatonics',
        rows: [
          { symbol: 'C major pentatonic', means: 'C major without the 4th and 7th — the two notes that sit a half step from something', gives: 'C D E G A' },
          { symbol: 'A minor pentatonic', means: 'the same five notes started from A, the relative minor', gives: 'A C D E G' },
          { symbol: 'C minor pentatonic', means: 'the minor pentatonic built on C — the skeleton of the C blues scale', gives: 'C E♭ F G B♭' },
        ],
        note: 'Major and minor pentatonic are one set of notes with two names, the same relationship as C major and A minor.',
      },
      {
        kind: 'keyboard',
        label: 'C major pentatonic',
        notes: ['C', 'D', 'E', 'G', 'A', 'C'],
        note: 'No two adjacent keys anywhere. That is the property: without half steps there is nothing to resolve, so every note can be held.',
      },
      {
        kind: 'keyboard',
        label: 'C minor pentatonic',
        notes: ['C', 'E♭', 'F', 'G', 'B♭', 'C'],
        note: 'Add a G♭ and this is the blues scale. No standard fingering exists for either; players finger them to suit the line, and the wiki does not invent one.',
      },
      {
        kind: 'prose',
        text: 'The scale is more useful than five notes suggests because you can play a pentatonic from a note other than the root. Over a major chord, the pentatonic from the 5th gives the 9 and the 7th instead of the root and the 4th; the one from the 2nd gives the lydian sound. Same shape, moved.',
      },
      {
        kind: 'table',
        head: ['Over', 'Play', 'Which gives you'],
        rows: [
          ['Cmaj7', 'C major pentatonic', '1, 9, 3, 5, 13 — plain and safe'],
          ['Cmaj7', 'G major pentatonic', '5, 13, 7, 9, 3 — no root, more colour'],
          ['Cmaj7', 'D major pentatonic', '9, 3, ♯11, 13, 7 — the lydian sound'],
          ['Cm7', 'C minor pentatonic', '1, ♭3, 11, 5, ♭7'],
          ['Cm7', 'D minor pentatonic', '9, 11, 5, 13, 1 — dorian without the 3rd'],
          ['C7', 'C minor pentatonic', 'The blues: ♭3 against the major chord'],
          ['C7alt', 'D♭ minor pentatonic', '♯11, ♭13, ♭7, ♭9, ♯9 — five alterations and nothing else'],
        ],
      },
      {
        kind: 'callout',
        title: 'Why unit 8 puts it in 3rds',
        text: 'A pentatonic has no half steps, so playing it in thirds gives some pairs that are a major third and some a fourth, and the hand cannot pattern-match its way through. It is the shortest scale and the hardest one to play in thirds evenly, which is exactly what makes it a good test.',
      },
    ],
    related: ['diminished-and-blues', 'blues-language', 'playing-outside', 'scales-in-thirds'],
  },
  {
    slug: 'whole-tone-scale',
    title: 'The whole tone scale',
    category: 'Scales',
    summary: 'Six notes, every one a whole step from the next, for the dominant with a raised 5th.',
    inPlainTerms:
      'A scale made only of whole steps has no home note, because every note is the same distance from its neighbours, so it floats. That floating quality is exactly what a dominant chord with a sharpened fifth sounds like, and there are only two of these scales in existence.',
    blocks: [
      {
        kind: 'worked',
        label: 'G whole tone, over G7♯5',
        rows: [
          { symbol: 'G', means: 'the root of the chord', gives: '1' },
          { symbol: 'A', means: 'a whole step up — the 9th, unaltered', gives: '9' },
          { symbol: 'B', means: 'the major 3rd — so it is a dominant', gives: '3' },
          { symbol: 'C♯', means: 'the tritone, dead opposite the root', gives: '♯11' },
          { symbol: 'D♯', means: 'the raised 5th — the note the chord symbol asks for', gives: '♯5' },
          { symbol: 'F', means: 'properly E♯, the same key — the ♭7', gives: '♭7' },
        ],
        note: 'No natural 5th, no ♭9, no ♯9. It is the dominant with the 5th sharpened and nothing else altered.',
      },
      {
        kind: 'keyboard',
        label: 'G whole tone — six notes, all two keys apart',
        notes: ['G', 'A', 'B', 'C♯', 'D♯', 'F', 'G'],
        note: 'There are only two of these. This one, and the one starting a half step higher on A♭. Every other whole tone scale is one of those two with a different starting note.',
      },
      {
        kind: 'prose',
        text: 'Because there are only two, learning them is nothing. The difficulty is hearing when to use one: the chord symbol will say 7♯5, 7+ or 9♯5, and the melody over it will usually have the ♯5 in it. Someday My Prince Will Come has two in its first four bars, and unit 8 plays the scale from the V of the day’s key so you have it ready.',
      },
      {
        kind: 'callout',
        title: 'The other symmetric scales',
        text: 'The diminished scale repeats every three keys and has three versions. This one repeats every two keys and has two. The chromatic scale repeats every key and has one. Symmetry means fewer scales to learn and less sense of a root: the whole tone scale is the most rootless sound in common use, which is why it turns up under a chord that is about to go somewhere.',
      },
    ],
    related: ['diminished-and-blues', 'chord-scale-reference', 'someday-my-prince-will-come', 'chromatic-and-enharmonics'],
  },
  {
    slug: 'major-bebop-scale',
    title: 'The major bebop scale',
    category: 'Scales',
    summary: 'The eight-note major scale that puts the notes of a sixth chord on the downbeats, and why it is the 6th-diminished scale in another coat.',
    inPlainTerms:
      'The dominant bebop scale adds one note so that a running line lands on chord tones by itself. The major version does the same for the home chord, and the note it adds turns out to be the same note that makes block chords work.',
    blocks: [
      {
        kind: 'worked',
        label: 'C major bebop, descending from the root',
        rows: [
          { symbol: 'C major', means: 'seven notes, and a bar of eighths does not come out even', gives: 'C D E F G A B' },
          { symbol: 'Add the ♯5', means: 'G♯, one key between G and A — the same key as the A♭ in the 6th-diminished scale', gives: 'C D E F G G♯ A B' },
          { symbol: 'Descend in eighths', means: 'start on C and run down through the eight notes', gives: 'C B A G♯ G F E D' },
          { symbol: 'The downbeats', means: 'first, third, fifth and seventh notes', gives: 'C A G E' },
          { symbol: 'Check them', means: 'C6 is spelled C E G A', gives: 'all four are chord tones' },
        ],
        note: 'Same trick as the dominant bebop scale. The added note pushes every chord tone onto a beat and every other note between beats.',
      },
      {
        kind: 'keyboard',
        label: 'C major bebop — the G♯ is the added note',
        notes: ['C', 'D', 'E', 'F', 'G', 'G♯', 'A', 'B', 'C'],
        note: 'Eight notes. Run it descending first, as the bebop scales page recommends, and listen for the C6 chord falling out of it.',
      },
      {
        kind: 'prose',
        text: 'These are the same eight notes as the C 6th-diminished scale, spelled with a G♯ instead of an A♭. Played as a line, it is the bebop scale; harmonised in block chords, it is Barry Harris’s system. Unit 9 uses both in the same session, and this is why: they are one object.',
      },
      {
        kind: 'callout',
        title: 'Over which chords',
        text: 'Cmaj7, C6, C6/9, and also Am7, since A minor is the same notes. Not over a ii–V: the dominant bebop scale is for the V and the plain dorian for the ii. The major bebop scale is for the bar where you have arrived.',
      },
    ],
    related: ['bebop-scales', 'sixth-diminished', 'block-chords', 'chord-scale-reference'],
  },
]
