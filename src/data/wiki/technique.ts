import type { Topic } from '../types'
import { MAJOR_SCALES } from '../fingerings'

/** Technique topics beyond hand independence. */
export const TECHNIQUE: Topic[] = [
  {
    slug: 'fingering-principles',
    title: 'Fingering: thumbs, crossings, borrowed fingerings',
    category: 'Technique',
    summary: 'The three rules behind every scale fingering in the book, and why a mode borrows its parent’s fingering rather than getting its own.',
    inPlainTerms:
      'Scale fingerings look like a table of arbitrary numbers, but they all come from three rules about where the thumb can go. Learn the rules and the table becomes obvious; learn the table and the rules stay hidden.',
    blocks: [
      {
        kind: 'list',
        ordered: true,
        items: [
          'The thumb crosses under after 3 or after 4, never after 5 or 2. So every scale is made of groups of three and four fingers, and a fingering is just the order of the groups.',
          'The thumb does not land on a black key in the middle of a scale. It is short, and putting it on a black key pulls the whole hand into the fallboard. So in flat keys the thumb waits for the next white key, and the scale starts on whichever finger makes that work.',
          'The hand should feel the same shape in both directions. A crossing on the way up is a crossing over on the way down, at the same note.',
        ],
      },
      {
        kind: 'keyboard',
        label: 'C major, left hand',
        notes: MAJOR_SCALES.C.notes,
        fingers: MAJOR_SCALES.C.lh,
        hand: 'LH',
        note: 'The left hand starts on 5 and crosses 3 over the thumb after the G. Four fingers, then three: the mirror image of the right hand’s three, then four.',
      },
      {
        kind: 'keyboard',
        label: 'B♭ major, right hand — the thumb waits for a white key',
        notes: MAJOR_SCALES['B♭'].notes,
        fingers: MAJOR_SCALES['B♭'].rh,
        hand: 'RH',
        note: 'It starts on 2 because the root is black. The thumb takes the C, the first white key, and from there the groups run as they do in C major. Rule two produced this whole fingering.',
      },
      {
        kind: 'worked',
        label: 'Reading a fingering as groups',
        rows: [
          { symbol: 'C major RH', means: 'three then four: the thumb crosses after 3, then after 4', gives: '123 · 1234 · 5' },
          { symbol: 'C major LH', means: 'four then three, starting from the little finger', gives: '5432 · 1 · 321' },
          { symbol: 'F major RH', means: 'four then three, because the B♭ pushes the first crossing earlier', gives: '1234 · 123 · 4' },
          { symbol: 'B♭ major RH', means: 'starts on 2 to keep the thumb off the black root, then the C major groups', gives: '2 · 123 · 1234' },
        ],
        note: 'Every major scale fingering is some arrangement of one group of three and one group of four, shifted so the thumb lands on white keys.',
      },
      {
        kind: 'table',
        head: ['These keys', 'Share the fingering of', 'Because'],
        rows: [
          ['C, G, D, A, E', 'C major', 'Their black keys never fall under the thumb'],
          ['F', 'Its own', 'The B♭ is where the thumb wanted to go, so the groups swap'],
          ['B♭, E♭, A♭, D♭', 'One pattern', 'All start on a black key; the thumb takes the first white one'],
          ['B and G♭', 'Each other, roughly', 'Nearly all black keys, so the thumb takes the two white ones and everything else follows'],
        ],
      },
      {
        kind: 'callout',
        title: 'A mode does not get its own fingering',
        text: 'D dorian is C major started from D, and it uses C major’s fingering started from D: 2 on the D, thumb on the E where C major puts it. Re-fingering the scale from every new tonic would throw away the very connection the modes page is teaching. The same goes for the altered scale, fingered as the melodic minor it comes from. The per-unit guidance under the regimen’s scale block says this each time it applies.',
      },
    ],
    related: ['major-scale-modes', 'chromatic-and-enharmonics', 'arpeggios-and-inversions', 'scales-in-thirds'],
  },
  {
    slug: 'arpeggios-and-inversions',
    title: 'Arpeggios in every inversion',
    category: 'Technique',
    summary: 'A seventh chord played one note at a time, from each of its four notes, and the fingering conventions that make it even.',
    inPlainTerms:
      'An arpeggio is a chord played as a line instead of all at once. Playing it from each of its notes in turn teaches the hand where the chord is everywhere on the keyboard, which is what lets a solo land on a chord tone from anywhere.',
    blocks: [
      {
        kind: 'worked',
        label: 'Cmaj7 as an arpeggio, one octave',
        rows: [
          { symbol: 'Root position', means: 'start on the root and play the chord tones up to the octave', gives: 'C E G B C' },
          { symbol: '1st inversion', means: 'start on the 3rd and go up through the same notes', gives: 'E G B C E' },
          { symbol: '2nd inversion', means: 'start on the 5th', gives: 'G B C E G' },
          { symbol: '3rd inversion', means: 'start on the 7th — the root is now the second note, a half step up', gives: 'B C E G B' },
        ],
        note: 'Four starting points, one set of notes. The unit asks for all four across four octaves, which is the point: by the end, there is no register where the hand does not know where Cmaj7 is.',
      },
      {
        kind: 'keyboard',
        label: 'Cmaj7 root position, right hand',
        notes: ['C', 'E', 'G', 'B', 'C'],
        fingers: [1, 2, 3, 4, 5],
        hand: 'RH',
        note: 'One octave fits under the hand without a crossing. For the second octave the thumb crosses under after the 4, so the pattern continues 1 2 3 4, 1 2 3 4, 5.',
      },
      {
        kind: 'keyboard',
        label: 'Cmaj7 root position, left hand',
        notes: ['C', 'E', 'G', 'B', 'C'],
        fingers: [5, 4, 3, 2, 1],
        hand: 'LH',
      },
      {
        kind: 'keyboard',
        label: '1st inversion, right hand — from the E',
        notes: ['E', 'G', 'B', 'C', 'E'],
        fingers: [1, 2, 3, 4, 5],
        hand: 'RH',
        note: 'Where two notes are a half step apart, as B and C are here, use adjacent fingers. Beyond that, arpeggio fingerings vary with hand size and with what comes next; these are conventions, not rules.',
      },
      {
        kind: 'prose',
        text: 'Play each quality the same way: the maj7, then the dominant, the m7, the m7♭5 and the dim7, all from the same root. Only one note changes between neighbours, so the hand learns the family as one shape with five small variants rather than as five shapes.',
      },
      {
        kind: 'callout',
        title: 'What the arpeggio is for',
        text: 'Not for playing arpeggios. In a solo, an arpeggio is how you get from one chord tone to another on the beat, and knowing every inversion is what lets you start that move from wherever the previous phrase left you. The chord tones first page is where this pays off.',
      },
    ],
    related: ['seventh-chords-and-inversions', 'fingering-principles', 'chord-tones-first', 'tempo-targets'],
  },
  {
    slug: 'touch-and-balance',
    title: 'Touch, tone and balance between the hands',
    category: 'Technique',
    summary: 'Why the left hand plays quieter than it thinks it does, and how to hear which voice is on top.',
    inPlainTerms:
      'On a piano the loudest note is the one the listener follows, and the left hand is usually louder than the player realises. Balance is the habit of deciding which note should be on top and playing everything else under it.',
    blocks: [
      {
        kind: 'prose',
        text: 'The instruction that appears most often in the regimen is some version of keep the left hand quiet. It is there because the left hand plays lower notes, and low notes carry. A chord that feels balanced from the bench is usually bottom-heavy from across the room.',
      },
      {
        kind: 'table',
        head: ['Voice', 'Relative weight', 'Why'],
        rows: [
          ['Melody or top note', 'Loudest', 'It is what the ear follows; if it is not on top, nothing is'],
          ['Bass note', 'Next', 'It tells the ear what chord it is; one clear note does that'],
          ['Inner voices and comping', 'Quietest', 'They are colour. Played at melody weight they turn into mud'],
        ],
      },
      {
        kind: 'list',
        items: [
          'Play a five-note chord and try to make only the top note audible. Then only the bottom. Then only the middle. If you cannot, the fingers are not yet independent in weight, and no amount of speed work will fix that.',
          'The weight comes from the arm, not the finger. Let the arm drop into the key and the finger merely transmits it; pressing with the finger alone gives a hard, thin tone and tires the hand.',
          'Record eight bars of comping and listen with the lid down. The left hand will be louder than you remember. It always is.',
          'Melody in the right hand over rootless voicings in the left: the left hand should sound like it is in the next room.',
        ],
      },
      {
        kind: 'callout',
        title: 'The consolidate step is a tone check',
        text: 'The last session of every unit asks for a recording and two listens, and the second listen is for tone only: is anything harsh or buried. Harsh usually means a finger pushed where the arm should have dropped. Buried usually means the left hand won. Both are balance, and both are audible only from a recording.',
      },
    ],
    related: ['hand-independence', 'recording-yourself', 'pedalling', 'arranging-a-tune'],
  },
  {
    slug: 'left-hand-patterns',
    title: 'Left-hand patterns: stride, walking, Charleston, bossa',
    category: 'Technique',
    summary: 'The five things a left hand does under a right hand, what each one is for, and the rhythm of each drawn out.',
    inPlainTerms:
      'When you play alone, your left hand is the rhythm section, and there are only a handful of jobs it can do: keep time with a walking line, mark the beat with a bass-and-chord bounce, stab on offbeats, or hold a Latin pulse. Knowing all of them means you can choose one rather than defaulting to the same one every time.',
    blocks: [
      {
        kind: 'table',
        head: ['Pattern', 'What the hand does', 'When to use it'],
        rows: [
          ['Walking bass', 'Quarter notes, one per beat, moving by step and chromatic approach', 'Medium swing, the default for solo playing'],
          ['Stride', 'Bass note on 1 and 3, chord on 2 and 4, leaping between them', 'Up-tempo, older tunes, when you want the room to move'],
          ['Two-feel', 'Root and 5th as half notes', 'The first chorus of a ballad or a medium tune, before the walk starts'],
          ['Charleston', 'A chord on 1 and on the and of 2, silence otherwise', 'Comping under a soloist, or under your own right hand'],
          ['Bossa', 'Root on 1 and the and of 2, 5th on 3 and the and of 4', 'Latin tunes — Blue Bossa, and any tune marked bossa'],
        ],
      },
      {
        kind: 'rhythm',
        label: 'Stride — bass on the beat, chord on the backbeat',
        left: 'x.x.x.x.',
        note: 'The same rhythm as a walking bass but alternating a low single note with a chord an octave or more above it. The leap is the difficulty and the sound.',
      },
      {
        kind: 'keyboard',
        label: 'The stride shape for Cmaj7 — a low root, then the shell above it',
        notes: ['C2', 'E3', 'G3', 'B3'],
        note: 'The C is struck alone on beat one, the three notes above it together on beat two. On beat three the bass note is usually the 5th, G, an octave below the chord.',
      },
      {
        kind: 'rhythm',
        label: 'Two-feel — root and 5th as half notes',
        left: 'x...x...',
      },
      {
        kind: 'rhythm',
        label: 'Charleston',
        left: 'x..x....',
        note: 'Beat one and the and of two. Unit 1 builds its independence drill on this exact pattern.',
      },
      {
        kind: 'rhythm',
        label: 'Bossa — root, then 5th, each anticipated',
        left: 'x..xx..x',
        note: 'Root on one and on the and of two; 5th on three and on the and of four. It is two dotted quarters and a quarter, twice, and it never stops.',
      },
      {
        kind: 'callout',
        title: 'One at a time',
        text: 'Each pattern is a separate skill. Walking bass is unit 4, the Charleston is unit 1, and stride and bossa are not in the curriculum at all; they are here so that when a tune wants one you know what it is asking for. Learn a pattern under one chord for a week before you take it through a tune.',
      },
    ],
    related: ['walking-bass', 'comping-rhythms', 'hand-independence', 'blue-bossa'],
  },
  {
    slug: 'bach-inventions',
    title: 'Bach two-part inventions as jazz technique',
    category: 'Technique',
    summary: 'Why a three-hundred-year-old exercise is in a jazz curriculum, which three to learn, and how to learn them.',
    inPlainTerms:
      'The two-part inventions are short pieces in which each hand plays a melody of equal importance, and neither is allowed to be the accompaniment. There is no better training for a left hand that has to think for itself, which is the single skill solo jazz piano depends on.',
    blocks: [
      {
        kind: 'prose',
        text: 'Every left-hand pattern in the curriculum is an accompaniment: it supports the right hand. An invention refuses that arrangement. Both hands carry a tune, the tunes imitate each other a bar apart, and the moment one hand goes quiet because the other has the harder line, the piece falls over. That is what makes it a jazz exercise.',
      },
      {
        kind: 'table',
        head: ['Invention', 'Key', 'Why this one'],
        rows: [
          ['No. 1', 'C major', 'The shortest and the most famous. Sixteen bars is the whole first half'],
          ['No. 8', 'F major', 'Fast, bright, and the hands chase each other a bar apart from the first note'],
          ['No. 13', 'A minor', 'The one that sounds like jazz: arpeggiated, minor, driving'],
        ],
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Pick one and stay with it for the unit. Switching between them halves the progress on each.',
          'Learn the left hand alone until you can play it from memory, then the right hand alone the same way. Not most of it: all of it, without the page.',
          'Only then together, at half the tempo you can manage hands apart. The first hands-together pass is not meant to sound like music.',
          'Sixteen bars a week. The independence block gives you ten minutes; that is enough for sixteen bars if each hand already knows its part.',
          'No metronome until each hand is memorised. Before that it is a distraction; after that it is the point.',
        ],
      },
      {
        kind: 'callout',
        title: 'What to listen for',
        text: 'Both hands at the same volume, both phrased, both breathing at the ends of phrases. If you record it and cannot tell which hand has the theme at any moment, it is working. If the left hand sounds like an accompaniment, it has not yet understood that it is not one.',
      },
    ],
    related: ['hand-independence', 'touch-and-balance', 'arranging-a-tune', 'recording-yourself'],
  },
  {
    slug: 'pedalling',
    title: 'Pedalling in jazz piano',
    category: 'Technique',
    summary: 'When the sustain pedal helps, when it smears everything, and the one technique that makes it invisible.',
    inPlainTerms:
      'The right pedal lets notes ring after the fingers have left them, which is wonderful on a ballad and disastrous under a walking bass line. Most jazz pedalling is a matter of using less than you want to, and changing it exactly when the chord changes.',
    blocks: [
      {
        kind: 'list',
        items: [
          'Legato pedalling: press the pedal just after the new chord sounds, not before. Fingers first, then foot. Done right, the chords join with no gap and no overlap, and nobody can hear the pedal at all.',
          'Change on every chord. A ii–V–I with the pedal held through it is three chords ringing at once. If you cannot change the pedal that fast, play the passage without it.',
          'No pedal under a walking bass, ever. The bass line is quarter notes and each one has to stop when the next begins. The pedal turns it into a drone.',
          'No pedal under comping. Short chords are the point; sustaining them removes the rhythm.',
          'Ballads: pedal by the harmony, not by the bar. A bar that holds one chord can ring; a bar with two chords changes in the middle.',
          'The middle pedal holds only the notes down when you press it. Useful for a bass note under a chord you need to re-strike; rare, and worth knowing about.',
        ],
      },
      {
        kind: 'prose',
        text: 'The test is simple: record eight bars with the pedal and eight without. If the pedalled version sounds smoother, keep it. If it sounds like the same eight bars in a bathroom, you have found where the pedal is hiding a sloppy finger legato, and the fix is the fingers.',
      },
      {
        kind: 'callout',
        title: 'The curriculum assumes no pedal',
        text: 'Every scale, arpeggio, voicing and drill in the hundred sessions is meant to be played dry. The connection between notes has to come from the hands. The one exception is the tune block in unit 9, where a solo arrangement of a ballad is allowed the pedal, and even there the rule is change on every chord.',
      },
    ],
    related: ['touch-and-balance', 'arranging-a-tune', 'walking-bass', 'recording-yourself'],
  },
  {
    slug: 'building-speed',
    title: 'Building speed without building mistakes',
    category: 'Technique',
    summary: 'Speed is a by-product of accuracy at a slightly lower tempo, and there are three ways to get there that do not involve trying to go faster.',
    inPlainTerms:
      'Playing faster than you can play cleanly teaches your hands to be messy at that speed. The way to get faster is to make the slower version so certain that the next few beats per minute are free, and there are a few tricks for making that happen sooner.',
    blocks: [
      {
        kind: 'prose',
        text: 'The tempo targets page gives the rule: two breakdowns and you drop six. This page is about what to do in between, so that the drops are rare. All three methods have the same idea underneath: play a small piece of the passage faster than the target while keeping the rest slow, so the hands learn the fast version in fragments they can manage.',
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Rhythms. Play the passage in long-short pairs, so every other note is fast and the note after it gives you time to prepare. Then short-long. Then straight. Each rhythm makes a different pair of notes the fast one, and by the end every transition has been practised at speed.',
          'Bursts. Four notes at full tempo, then stop. Then the next four from where you stopped. Then eight. The hand learns what the tempo feels like without ever having to sustain it, and the sustain comes later on its own.',
          'Chaining. Play the last bar at tempo. Then the last two. Then the last three. Every pass ends somewhere you already know, so the difficulty is always at the start of the passage rather than accumulating towards the end.',
        ],
      },
      {
        kind: 'table',
        head: ['Symptom', 'Likely cause', 'Fix'],
        rows: [
          ['Clean slow, falls apart at one particular tempo', 'A crossing the hand has not committed to', 'Bursts across the crossing only'],
          ['Speeds up when it gets easier', 'The click is on 1 and 3', 'Backbeat click, and count out loud'],
          ['Even hands apart, ragged together', 'One hand is leading and the other following it', 'Half tempo together, and make the left hand lead'],
          ['Clean once, then never again', 'The clean take was luck', 'Three clean in a row before the number goes in the log'],
        ],
      },
      {
        kind: 'callout',
        title: 'What the log is for',
        text: 'The number you write down is the fastest tempo at which the passage was clean three times running. Not once. A single clean take proves the tempo is possible; three prove it is yours. Speed built on single takes is the speed that disappears on a gig.',
      },
    ],
    related: ['tempo-targets', 'practice-log', 'scales-in-thirds', 'fingering-principles'],
  },
]
