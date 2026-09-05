import type { Topic } from '../types'

/** Rhythm: what the independence drills and comping instructions assume you can already feel. */
export const RHYTHM: Topic[] = [
  {
    slug: 'swing-feel',
    title: 'Swing feel & the triplet underneath',
    category: 'Rhythm',
    summary: 'Why swung eighth notes are not written down, what they actually are, and how the feel changes with the tempo.',
    inPlainTerms:
      'Jazz eighth notes are written as if they were equal but played as if each beat were divided into three, with the first note taking two of the three parts. The ride cymbal keeps that three-way split going the whole time, and everything you play sits on top of it.',
    blocks: [
      {
        kind: 'rhythm',
        label: 'Straight eighths — the way they are written',
        right: 'xxxxxxxx',
        subdivision: 2,
      },
      {
        kind: 'rhythm',
        label: 'Swung eighths — the way they are played',
        right: 'x.xx.xx.xx.x',
        subdivision: 3,
        note: 'Each beat is three cells. The first eighth takes two of them and the second takes one, so the offbeat lands late, on the last third of the beat. That last third is where the whole feel lives.',
      },
      {
        kind: 'rhythm',
        label: 'The ride cymbal pattern the eighths sit on',
        right: 'x..x.xx..x.x',
        subdivision: 3,
        note: 'Beat, beat, skip-beat, beat, beat, skip-beat: ding, ding-da-ding. Sing this while you play scales in eighths and your offbeats will find the right place on their own.',
      },
      {
        kind: 'prose',
        text: 'The two-to-one ratio is a description, not a rule. At slow tempos players swing harder, closer to a dotted eighth and sixteenth. At fast tempos the ratio flattens towards straight, because there is no room for the offbeat to be late. What stays constant is that the offbeat is accented and slightly delayed; how much is the tempo’s business.',
      },
      {
        kind: 'table',
        head: ['Tempo', 'Feel', 'What to do'],
        rows: [
          ['Under ♩=100', 'Heavy swing, almost dotted', 'Lean on the offbeats; let the downbeats be soft'],
          ['♩=120 to 200', 'Triplet swing, the textbook feel', 'Sing the ride pattern under everything'],
          ['Over ♩=240', 'Nearly straight', 'Stop trying to swing the eighths and let the accents do it'],
        ],
      },
      {
        kind: 'callout',
        title: 'Scales swing too',
        text: 'The scale block says eighth notes, and it means swung eighths from the first day, because a straight scale practised for a hundred sessions is a straight scale on the gig. Put the metronome on 2 and 4, feel the triplet, and let the offbeats fall late. If the scale sounds like an exercise, it is because it is not swinging.',
      },
    ],
    related: ['counting-and-the-click', 'comping-rhythms', 'tempo-targets', 'bebop-scales'],
  },
  {
    slug: 'counting-and-the-click',
    title: 'Counting, subdivision and the click on 2 and 4',
    category: 'Rhythm',
    summary: 'How to count a bar so the offbeats have names, and why the metronome belongs on the backbeat.',
    inPlainTerms:
      'You cannot place a note where you cannot name the spot, so the first rhythmic skill is having a word for every subdivision of the beat. The second is keeping time yourself while a click marks only the weak beats, because that is what playing with a drummer feels like.',
    blocks: [
      {
        kind: 'rhythm',
        label: 'The click on 2 and 4 — you hold 1 and 3',
        right: '.x.x',
        subdivision: 1,
        note: 'The metronome is the snare drum. If you lose the downbeat, nothing in the room will give it back to you, and that is the exercise.',
      },
      {
        kind: 'rhythm',
        label: 'Eighths — one and two and',
        right: 'xxxxxxxx',
        subdivision: 2,
      },
      {
        kind: 'rhythm',
        label: 'Triplets — one and a, two and a',
        right: 'xxxxxxxxxxxx',
        subdivision: 3,
      },
      {
        kind: 'rhythm',
        label: 'Sixteenths — one e and a',
        right: 'xxxxxxxxxxxxxxxx',
        subdivision: 4,
        note: 'The counts under each grid are the words to say. Say them aloud while you play until the words are automatic; then stop saying them and notice that you can still hear them.',
      },
      {
        kind: 'prose',
        text: 'Every rhythm in the curriculum is written in this vocabulary. The Charleston is one and the and of two. The offbeat comping drill wants the and of any beat and never the number. Walking bass is the numbers only. If a drill says a place in the bar and you cannot instantly tap that place, the drill is not ready to be played yet.',
      },
      {
        kind: 'list',
        items: [
          'Set the click at half the tempo and hear it as 2 and 4. At ♩=60 on the click, you are playing at ♩=120.',
          'Count out loud for the first pass of anything new. The voice is a second instrument and it does not get distracted by the hands.',
          'When the time drifts, it drifts on the offbeats first. Check the ands before you check the numbers.',
          'A bar you cannot count is a bar you cannot fix. Slow it down until every note has a name.',
        ],
      },
      {
        kind: 'callout',
        title: 'Why not on 1 and 3',
        text: 'With the click on the downbeats the machine keeps the time and you follow it, which feels like practising and teaches nothing. On the backbeat the click can only confirm that you were right; it cannot rescue you. Every tempo in the log is measured this way, and the first-tempo-pass step says so.',
      },
    ],
    related: ['tempo-targets', 'swing-feel', 'comping-rhythms', 'polyrhythms'],
  },
  {
    slug: 'rhythmic-displacement',
    title: 'Rhythmic displacement',
    category: 'Rhythm',
    summary: 'The same figure started one eighth note later, and what that does to a listener who thought they knew where the beat was.',
    inPlainTerms:
      'Take a rhythm you know and start it slightly late, then keep it there. Nothing about the rhythm changes, but it now sits against the beat instead of on it, and that tension is one of the main tools for making a simple idea sound like a musician played it.',
    blocks: [
      {
        kind: 'prose',
        text: 'Unit 2 takes the Charleston and moves it one eighth later each pass. Four positions, and the fourth is back where the second started with the hits swapped. Here are the four, so you can see that they are one figure and not four.',
      },
      {
        kind: 'rhythm',
        label: 'Position 1 — the Charleston as written',
        left: 'x..x....',
      },
      {
        kind: 'rhythm',
        label: 'Position 2 — one eighth later',
        left: '.x..x...',
      },
      {
        kind: 'rhythm',
        label: 'Position 3 — on beat 2 and the and of 3',
        left: '..x..x..',
      },
      {
        kind: 'rhythm',
        label: 'Position 4 — both hits on offbeats',
        left: '...x..x.',
        note: 'The gap between the two hits is always three eighths. Only where the pair sits in the bar changes, and the ear hears each position as a different groove.',
      },
      {
        kind: 'prose',
        text: 'The same thing works on a melody. Play the first phrase of the tune starting on the and of one instead of on one, and keep every note the same length. The tune is unchanged and the phrase now leans forward. Do it for a whole chorus and the listener spends the chorus waiting for it to land, which is the effect the rearrange step is after.',
      },
      {
        kind: 'callout',
        title: 'The failure to watch for',
        text: 'Drifting back to position 1. The body wants the hits on the beat, and after eight bars of position 3 it will quietly put them there without telling you. Count the position aloud on its first bar every time, and record the drill: if the recording is all position 1, you were not displacing anything.',
      },
    ],
    related: ['comping-rhythms', 'counting-and-the-click', 'hand-independence', 'motivic-development'],
  },
  {
    slug: 'comping-rhythms',
    title: 'Comping rhythms',
    category: 'Rhythm',
    summary: 'Five rhythms for placing a chord under a melody, from the one that is always safe to the one that is nearly always wrong.',
    inPlainTerms:
      'Comping is playing chords under someone else’s line, or under your own, and the question is never which chord but when. A handful of rhythms cover almost every situation, and the skill is choosing one and then not playing it every bar.',
    blocks: [
      {
        kind: 'prose',
        text: 'Every grid below has the bass walking in quarter notes on the bottom row and the chord on top. Play the bottom row with the left hand and the top with the right, over one chord, until the right hand can land anywhere on the grid without the left hand noticing.',
      },
      {
        kind: 'rhythm',
        label: 'The Charleston — the one to learn first',
        left: 'x.x.x.x.',
        right: 'x..x....',
        note: 'One, and the and of two. It leaves beats three and four empty, which is where the soloist usually is.',
      },
      {
        kind: 'rhythm',
        label: 'The anticipation — the and of four, into the next bar',
        left: 'x.x.x.x.',
        right: '.......x',
        note: 'The chord arrives an eighth before the bar does, and the next bar’s downbeat is silent. This is the most common comping rhythm in recorded jazz, and it is how a chord change is made to push rather than sit.',
      },
      {
        kind: 'rhythm',
        label: 'Ands of two and four — Red Garland’s pattern',
        left: 'x.x.x.x.',
        right: '...x...x',
        note: 'Both hits on offbeats. Unit 3’s drill uses this exact placement against roots on one and three, so the hands never sound together.',
      },
      {
        kind: 'rhythm',
        label: 'Four to the bar — Freddie Green',
        left: 'x.x.x.x.',
        right: 'x.x.x.x.',
        note: 'A chord on every beat, short and even, at the same weight as the bass. It is the rhythm-guitar sound and it works under a singer; under a busy soloist it is too much.',
      },
      {
        kind: 'rhythm',
        label: 'Block on the beat — the one to avoid',
        left: 'x.x.x.x.',
        right: 'x...x...',
        note: 'A chord on one and three. It is what the hands do when nobody has told them otherwise, and it flattens everything. The first-tempo-pass step says comping rhythm rather than block-on-the-beat, and this is what it means.',
      },
      {
        kind: 'callout',
        title: 'Less than you think',
        text: 'One chord per bar is plenty; one every two bars is often better. The gaps are where the melody goes. Unit 6’s drill makes you play offbeats only for a full chorus, because the habit it is removing is the downbeat chord on every change, and the way to remove a habit is to forbid it for a while.',
      },
    ],
    related: ['left-hand-patterns', 'rhythmic-displacement', 'walking-bass', 'hand-independence'],
  },
  {
    slug: 'walking-bass',
    title: 'Walking bass',
    category: 'Rhythm',
    summary: 'A quarter-note line that lands on the root of every new chord and gets there by step: how it is built, one bar at a time.',
    inPlainTerms:
      'A walking bass line is four even notes a bar that tell the listener what chord it is and where the next one is coming. There is a recipe: the root on the first beat, chord tones in the middle, and a note next door to the coming root on the last beat, so the line arrives rather than jumps.',
    blocks: [
      {
        kind: 'worked',
        label: 'A bar of Dm7 walking into G7',
        rows: [
          { symbol: 'Beat 1', means: 'the root of the chord you are on', gives: 'D' },
          { symbol: 'Beat 2', means: 'a chord tone — the ♭3', gives: 'F' },
          { symbol: 'Beat 3', means: 'another chord tone — the 5th', gives: 'A' },
          { symbol: 'Beat 4', means: 'a half step above or below the next root, G — here from above', gives: 'A♭' },
          { symbol: 'Next beat 1', means: 'the root of G7, arrived at by a half step', gives: 'G' },
        ],
        note: 'D, F, A, A♭, G. The last two notes are the whole trick: the ear hears the A♭ and knows the G is coming.',
      },
      {
        kind: 'keyboard',
        label: 'The Dm7 bar — root, ♭3, 5, then the approach note',
        notes: ['D3', 'F3', 'A3', 'A♭3'],
        note: 'Played in order, one note per beat. The A♭ is below the A, so the line rises for three beats and then folds back to approach the G from above.',
      },
      {
        kind: 'keyboard',
        label: 'The G7 bar — root, 3rd, 5th, then a half step into C',
        notes: ['G2', 'B2', 'D3', 'D♭3'],
        note: 'G, B, D, D♭, and then C on the next downbeat. The same recipe from the new root.',
      },
      {
        kind: 'rhythm',
        label: 'The bass four to the bar, the comp on the and of two',
        left: 'x.x.x.x.',
        right: '...x....',
        note: 'Unit 4’s drill. The left hand must not know the right hand exists: if the bass hesitates when the chord lands, play the bass alone for another week.',
      },
      {
        kind: 'table',
        head: ['Beat', 'Rule', 'Alternatives once the rule is automatic'],
        rows: [
          ['1', 'The root, always', 'The 3rd or 5th, once a chorus, for surprise'],
          ['2 and 3', 'Chord tones, or scale tones between them', 'A chromatic passing note between two chord tones'],
          ['4', 'A half step above or below the next root', 'The 5th of the next chord, from above'],
          ['Two chords a bar', 'Root then approach, root then approach', 'Root then 3rd if the roots are already a step apart'],
        ],
      },
      {
        kind: 'callout',
        title: 'Why this drill pays',
        text: 'Of everything in the independence block, this is the one that turns directly into being able to play alone: a walking bass under a melody is a trio with the piano as the whole band. Unit 6 adds a chromatic passing tone on beat four, unit 10 walks the whole tune under the melody, and the first time you do it in public you will wish you had spent more of the ten minutes on it.',
      },
    ],
    related: ['left-hand-patterns', 'comping-rhythms', 'hand-independence', 'chord-tones-first'],
  },
  {
    slug: 'polyrhythms',
    title: 'Polyrhythms: three against two, four against three',
    category: 'Rhythm',
    summary: 'Two even pulses in the same time, one in each hand, and the two phrases that make them feel like one rhythm.',
    inPlainTerms:
      'A polyrhythm is two different steady pulses played at once so that they line up only at the start. It feels impossible until you hear the two together as a single lumpy rhythm, and there is a spoken phrase for each that gives you that rhythm ready-made.',
    blocks: [
      {
        kind: 'rhythm',
        label: 'Three against two — say "cold cup of tea"',
        beats: 2,
        subdivision: 3,
        left: 'x..x..',
        right: 'x.x.x.',
        note: 'Six cells. The two lands on cells one and four; the three on one, three and five. Only the first cell is both hands, and after that they alternate: cold (both), cup (right), of (left), tea (right).',
      },
      {
        kind: 'rhythm',
        label: 'Four against three — say "pass the god-damn butter"',
        beats: 4,
        subdivision: 3,
        left: 'x...x...x...',
        right: 'x..x..x..x..',
        note: 'Twelve cells. The three lands every four cells, the four every three. Only the first syllable is both hands. Tap it on the fallboard with the two hands before either of them touches a key.',
      },
      {
        kind: 'prose',
        text: 'The way in is never to think of the two pulses separately. Say the phrase, tap the composite rhythm with both hands together on a table, and only then separate the hands so that one takes the syllables belonging to the three and the other the syllables belonging to the two. If the composite is not even, the separated version cannot be.',
      },
      {
        kind: 'table',
        head: ['Failure', 'What it sounds like', 'Fix'],
        rows: [
          ['The shuffle', 'Three against two turning into a swung pair', 'The three must be perfectly even; feel it in six, not in two'],
          ['The gallop', 'Four against three turning into a dotted figure', 'Back to the phrase, and slower'],
          ['One hand leading', 'The other hand waits and then catches up', 'Swap which hand has which pulse, as the unit 7 drill does'],
        ],
      },
      {
        kind: 'callout',
        title: 'What it is for',
        text: 'Not for playing polyrhythms. It is the purest form of hand independence: two hands that share a downbeat and nothing else. A player who can hold four against three cleanly has no trouble with an offbeat comp under a walking bass, because that is a much simpler version of the same thing.',
      },
    ],
    related: ['hand-independence', 'counting-and-the-click', 'rhythmic-displacement', 'swing-feel'],
  },
]
