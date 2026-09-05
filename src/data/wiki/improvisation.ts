import type { Topic } from '../types'

/** Improvisation: the curriculum improvises from unit 4 onward; this is the how. */
export const IMPROVISATION: Topic[] = [
  {
    slug: 'chord-tones-first',
    title: 'Chord tones first: soloing on 3rds and 7ths',
    category: 'Improvisation',
    summary: 'The first solo is not a scale. It is the guide tones of each chord, on the beat, with nothing else, until they are automatic.',
    inPlainTerms:
      'A solo that outlines the chords sounds right even when it is simple, and one that runs scales over them sounds wrong even when it is fast. So the first thing to improvise with is the two notes that define each chord, placed on the strong beats, and everything else is added to that skeleton later.',
    blocks: [
      {
        kind: 'prose',
        text: 'Every chord has two notes that say what it is: the 3rd and the 7th. A solo that lands on one of them at every chord change tells the listener the harmony without a chord being played. That is the skeleton, and the scales, approach notes and vocabulary on the other pages are flesh on it, not replacements for it.',
      },
      {
        kind: 'worked',
        label: 'The skeleton of a ii–V–I in C',
        rows: [
          { symbol: 'Dm7', means: 'the ♭3 and the ♭7 — F and C', gives: 'F · C' },
          { symbol: 'G7', means: 'the 3rd and the ♭7 — B and F; the F is the note that held', gives: 'B · F' },
          { symbol: 'Cmaj7', means: 'the 3rd and the 7th — E and B; the B held this time', gives: 'E · B' },
          { symbol: 'The 3rds alone', means: 'F, then B, then E — a line that falls a half step and then a tritone', gives: 'F B E' },
        ],
        note: 'Play only those three notes, one per chord, as whole notes. It sounds like the progression. That is the proof that the 3rd carries the harmony.',
      },
      {
        kind: 'keyboard',
        label: 'The three 3rds — F, B, E — the line a solo can hang on',
        notes: ['F4', 'B4', 'E5'],
        note: 'Everything else in a solo over this progression is a way of getting from one of these notes to the next.',
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Roots only, whole notes, one per chord, through the whole tune. Boring, and the point: you have to know where the chord changes are before you can play through them.',
          'The 3rd of each chord, whole notes. This already sounds like music.',
          'The 3rd on beat one, the 7th on beat three. Two notes a bar, both guide tones.',
          'An arpeggio from the 3rd: 3, 5, 7, 9 in quarter notes. Every note a chord tone, every chord change landed on its 3rd.',
          'Now scales between the arpeggio notes, and approach notes into the 3rd. The solo has arrived, and it was built from the harmony out.',
        ],
      },
      {
        kind: 'callout',
        title: 'The rule to keep after everything else is forgotten',
        text: 'On beat one of a new chord, be on a chord tone, and prefer the 3rd. Play whatever you like in between. A solo that obeys this sounds like it knows the tune; a solo that ignores it sounds like a scale exercise in the wrong key, however fast it goes.',
      },
    ],
    related: ['guide-tone-lines', 'arpeggios-and-inversions', 'approach-notes-and-enclosures', 'building-a-solo'],
  },
  {
    slug: 'approach-notes-and-enclosures',
    title: 'Approach notes & enclosures',
    category: 'Improvisation',
    summary: 'How bebop lines arrive on a chord tone: from a half step below, from a scale step above, or from both sides in turn.',
    inPlainTerms:
      'Bebop lines sound the way they do because they never simply land on the important note; they approach it from next door, or circle it from both sides first. The chord tone is the target and the notes before it are the aim, and there are only a few ways to aim.',
    blocks: [
      {
        kind: 'prose',
        text: 'Take the 3rd of Cmaj7, the E, as the target. It can be reached in four standard ways, and every one of them puts a non-chord tone on the weak beat and the E on the strong one. That placement is the whole reason the scale pages care about which notes land on downbeats.',
      },
      {
        kind: 'worked',
        label: 'Four ways to arrive on E',
        rows: [
          { symbol: 'Chromatic from below', means: 'the key directly below, whatever the scale says', gives: 'D♯ – E' },
          { symbol: 'Diatonic from above', means: 'the scale note above — in C major that is F', gives: 'F – E' },
          { symbol: 'Enclosure', means: 'above, then below, then the target: it is surrounded before it is hit', gives: 'F – D♯ – E' },
          { symbol: 'Double chromatic', means: 'two half steps from below, so the line slides up into it', gives: 'D – D♯ – E' },
        ],
        note: 'The approach notes are not in the chord and often not in the key. They work because they are short and because they resolve: the ear hears the E and forgives the D♯ that led to it.',
      },
      {
        kind: 'keyboard',
        label: 'The neighbours of E — the notes it is approached from',
        notes: ['E4', 'D♯4', 'F4'],
        note: 'The E is the target. D♯ is the chromatic approach from below, F the diatonic approach from above. Every enclosure is some ordering of these three.',
      },
      {
        kind: 'list',
        items: [
          'Practise the enclosure on every chord tone of the arpeggio: surround the root, then the 3rd, then the 5th, then the 7th, up and down.',
          'Then on the 3rd of every chord in the tune, on beat one. The line before beat one is the enclosure; beat one is the chord tone.',
          'The approach from below is nearly always chromatic; the approach from above is nearly always diatonic. That asymmetry is what makes it sound like jazz rather than like a chromatic scale.',
        ],
      },
      {
        kind: 'callout',
        title: 'Where the bebop scale fits',
        text: 'The dominant bebop scale is a chromatic approach note built into the scale, so that running it puts an approach before every chord tone automatically. The enclosure is the same idea done deliberately, on the one note that matters most in the bar.',
      },
    ],
    related: ['chord-tones-first', 'bebop-scales', 'two-five-vocabulary', 'chromatic-and-enharmonics'],
  },
  {
    slug: 'constraint-improvising',
    title: 'Constraint improvising',
    category: 'Improvisation',
    summary: 'Why the apply step says to use only this unit’s material, and how a limit produces better solos than freedom does.',
    inPlainTerms:
      'Given every note and every technique, most players fall back on the three things they already do. Given one thing and forbidden everything else, they find out what that one thing can do, and the solo has a shape because it could not have been otherwise.',
    blocks: [
      {
        kind: 'prose',
        text: 'The sixth session of every unit says to improvise three choruses using only that unit’s material, and adds that the constraint is the point. This page is the argument for that sentence. A constraint removes the choice of what to play, which is the choice that stalls most solos, and leaves only the choice of when and how, which is where music happens.',
      },
      {
        kind: 'table',
        head: ['Unit', 'The constraint', 'What it forces you to find'],
        rows: [
          ['1', 'Chord tones of the major scale only, no chromatic notes', 'That the changes can be heard from the notes alone'],
          ['2', 'One mode per chord, starting on the 3rd', 'The colour note of each mode'],
          ['3', 'Right hand lines, left hand rootless A only', 'Comping and soloing at once'],
          ['4', 'The bebop scale descending only', 'That downbeats look after themselves'],
          ['5', 'Melodic minor over the whole minor ii–V–i', 'One scale that covers three chords'],
          ['6', 'Altered scale over every dominant, nothing else on the dominants', 'How much darkness a tune can take'],
          ['7', 'Upper structure triads only, as lines', 'Triads as a melodic shape, not a chord'],
          ['8', 'One idea developed across twelve choruses', 'Motivic development, by force'],
          ['9', 'Block chords for the whole solo', 'Soloing in harmony'],
          ['10', 'Anything — the first time', 'Whether the nine constraints have become choices'],
        ],
      },
      {
        kind: 'list',
        items: [
          'When the constraint runs out of ideas, that is the moment to keep going. The first two choruses use up what you already knew; the third is where the material teaches you something.',
          'Break the constraint once per chorus, deliberately, and notice how loud the break is. That loudness is what the material sounds like against everything else, and it is the reason to use it sparingly later.',
          'Record the constrained solo. Unconstrained solos all sound alike on playback; constrained ones sound like a person with a plan.',
        ],
      },
      {
        kind: 'callout',
        title: 'Other constraints worth a session',
        text: 'Only quarter notes. Only the top five keys of the keyboard. No note longer than a beat. Only two notes per bar. Rests on every downbeat. Each of these will produce a solo you could not have played on purpose, and each of them is a fair answer to the question of what to practise on a day when the material feels stale.',
      },
    ],
    related: ['motivic-development', 'building-a-solo', 'chord-tones-first', 'recording-yourself'],
  },
  {
    slug: 'two-five-vocabulary',
    title: 'Vocabulary over the ii–V',
    category: 'Improvisation',
    summary: 'One bebop line through a ii–V–I, taken apart to show why every note is where it is, so you can build your own.',
    inPlainTerms:
      'Jazz players learn phrases the way speakers learn idioms: whole, from records, and then take them apart to see how they work. One good line through the basic progression, understood, is worth a hundred copied ones, and this page understands one.',
    blocks: [
      {
        kind: 'prose',
        text: 'Two bars of eighth notes, then a landing. It is not a famous lick; it is a plain one, chosen because every device on the other improvisation pages is in it and nothing else is. Read the downbeats first, then the notes between them.',
      },
      {
        kind: 'worked',
        label: 'Bar 1, over Dm7 — the arpeggio up to the 9th and back',
        rows: [
          { symbol: 'Beat 1', means: 'the root of Dm7, on the downbeat', gives: 'D' },
          { symbol: 'and', means: 'the ♭3, the next chord tone up', gives: 'F' },
          { symbol: 'Beat 2', means: 'the 5th, a chord tone on the beat again', gives: 'A' },
          { symbol: 'and', means: 'the ♭7, the top of the plain chord', gives: 'C' },
          { symbol: 'Beat 3', means: 'the 9th — the top of the arpeggio', gives: 'E' },
          { symbol: 'and · 4 · and', means: 'back down through the chord: 1, then ♭7, then 5', gives: 'D C A' },
        ],
        note: 'Every downbeat is a chord tone, because the line is an arpeggio. D, A, E, C on the beats.',
      },
      {
        kind: 'worked',
        label: 'Bar 2, over G7 — the ♭9 and a scale down to the 3rd of C',
        rows: [
          { symbol: 'Beat 1', means: 'the 3rd of G7 — the guide tone, on the downbeat', gives: 'B' },
          { symbol: 'and', means: 'the 5th of G7, between two chord tones', gives: 'D' },
          { symbol: 'Beat 2', means: 'the ♭7 of G7 — the other guide tone, on a beat', gives: 'F' },
          { symbol: 'and', means: 'the ♭9 — one altered note, on a weak beat', gives: 'A♭' },
          { symbol: 'Beat 3 · and', means: 'the root, then down the scale', gives: 'G F' },
          { symbol: 'Beat 4 · and', means: 'the 13 on the beat, then the 5th — heading down towards E', gives: 'E D' },
          { symbol: 'Bar 3, beat 1', means: 'the 3rd of Cmaj7, held', gives: 'E' },
        ],
        note: 'Downbeats B, F, G, E, and then the landing on E. The A♭ is the only note outside C major in the whole line, and it sits on an offbeat, resolving down to G.',
      },
      {
        kind: 'keyboard',
        label: 'The notes of the G7 bar — B on the beat, A♭ as the colour',
        notes: ['B3', 'D4', 'E4', 'F4', 'G4', 'A♭4'],
      },
      {
        kind: 'list',
        items: [
          'Play it in the key of the day, by ear, before you write it out. Transposing it is the drill.',
          'Change one thing: start the first bar on the 3rd instead of the root, or replace the A♭ with a B♭ for the ♯9. Each change is a new line that you now own.',
          'Then stop playing it. A line you can play in twelve keys and have varied ten ways is vocabulary; a line you play the same way every time is a tic.',
        ],
      },
      {
        kind: 'callout',
        title: 'Where to get more',
        text: 'Records, four bars at a time, as the transcription page describes. Charlie Parker over the ii–V–I in Confirmation, Bud Powell over anything, Wynton Kelly for lines that are simpler than they sound. Each line you take from a record, take apart like the one above before you keep it.',
      },
    ],
    related: ['chord-tones-first', 'approach-notes-and-enclosures', 'bebop-scales', 'transcription'],
  },
  {
    slug: 'playing-outside',
    title: 'Playing outside',
    category: 'Improvisation',
    summary: 'Leaving the key on purpose: side-slipping a half step, the altered sound as colour, and the rule that makes any of it work.',
    inPlainTerms:
      'Once the inside notes are automatic, the wrong notes become a tool. A phrase moved a half step away from the key sounds deliberately outside, and the ear accepts it as long as it comes back somewhere it recognises. The coming back is the skill; the leaving is easy.',
    blocks: [
      {
        kind: 'prose',
        text: 'The simplest way out is the side-slip: play a phrase inside the key, play the same phrase a half step up or down, then play it inside again. The middle phrase is entirely wrong, and it sounds like a choice because it is the same shape as the phrases either side of it.',
      },
      {
        kind: 'worked',
        label: 'A side-slip over Cmaj7',
        rows: [
          { symbol: 'Inside', means: 'C major pentatonic — five safe notes', gives: 'C D E G A' },
          { symbol: 'Outside', means: 'the same shape a half step up: D♭ major pentatonic, no note of which is in C major', gives: 'D♭ E♭ F A♭ B♭' },
          { symbol: 'Inside again', means: 'back to C, landing on a chord tone on a downbeat', gives: 'C D E G A' },
        ],
        note: 'The outside bar has zero notes in common with the key. That is why it works: half in and half out sounds like a mistake, all the way out sounds like a decision.',
      },
      {
        kind: 'keyboard',
        label: 'D♭ major pentatonic — the outside shape',
        notes: ['D♭', 'E♭', 'F', 'A♭', 'B♭', 'D♭'],
        note: 'Every note is a black key. Over Cmaj7 it is as far out as five notes can be, and one bar of it followed by a C on beat one is a complete musical idea.',
      },
      {
        kind: 'table',
        head: ['Device', 'What it is', 'How far out'],
        rows: [
          ['Altered scale on the V', 'Every extension bent — but the 3rd and 7th are still there', 'Barely: it is inside, spelled darkly'],
          ['Side-slip', 'A phrase repeated a half step away', 'All the way, briefly'],
          ['Half-whole diminished', 'Alternating half and whole steps from the root of the dominant', 'Half out: four chord tones and four colour tones'],
          ['Upper structures as lines', 'A triad from a remote key, as an arpeggio', 'Out on the way up, in on the landing'],
          ['Chromatic sequences', 'A short shape moved by half steps three or four times', 'Progressively out, then a landing'],
        ],
      },
      {
        kind: 'callout',
        title: 'The one rule',
        text: 'Come back on a chord tone, on a downbeat, at the end of a phrase. If the return is strong, the excursion can be anything. If the return is weak, the excursion was a wrong note however far out it went. Practise the landings, not the leaving.',
      },
    ],
    related: ['pentatonic-scales', 'melodic-minor-family', 'upper-structure-triads', 'diminished-and-blues'],
  },
  {
    slug: 'motivic-development',
    title: 'Motivic development',
    category: 'Improvisation',
    summary: 'One short idea, changed one thing at a time across a whole chorus, which is what a solo with a shape is made of.',
    inPlainTerms:
      'A solo that keeps introducing new ideas sounds like a list. A solo that takes one small idea and changes it a little at a time sounds like a story, and the ways of changing it are few enough to name and practise.',
    blocks: [
      {
        kind: 'prose',
        text: 'A motif is three or four notes with a rhythm. Unit 8 asks for twelve choruses of blues on one idea, and the way that is possible is that every chorus does something different to the same idea. Here is one motif and the standard things to do with it.',
      },
      {
        kind: 'keyboard',
        label: 'The motif — C, up to E, down to D',
        notes: ['C4', 'E4', 'D4'],
        note: 'Up a third, down a step. Three notes and a rhythm. It is deliberately nothing much: what matters is what happens to it next.',
      },
      {
        kind: 'worked',
        label: 'One motif, six ways',
        rows: [
          { symbol: 'Repeat', means: 'the same notes again, in the same place in the bar — the listener now knows the idea', gives: 'C E D' },
          { symbol: 'Transpose', means: 'the same shape from the next scale degree up', gives: 'D F E' },
          { symbol: 'Invert', means: 'the intervals turned upside down: down a third, up a step', gives: 'C A B' },
          { symbol: 'Augment', means: 'the same notes at twice the length — quarters become halves', gives: 'C E D, slowly' },
          { symbol: 'Displace', means: 'the same notes starting an eighth later, or a beat later', gives: 'C E D, late' },
          { symbol: 'Fragment', means: 'only the last two notes, repeated until they become the new motif', gives: 'E D' },
        ],
        note: 'Combine any two and a three-note idea has a chorus in it. The transposition follows the chords, the displacement follows the rhythm section, and the fragment becomes the idea for the next chorus.',
      },
      {
        kind: 'list',
        items: [
          'Take the first three notes of the tune’s melody as the motif. Everyone in the room already knows them, which makes every change audible.',
          'Change one thing per phrase, not several. The listener has to be able to hear what stayed the same.',
          'Leave space. A motif followed by silence is a question; the changed motif after the silence is the answer. Call and response is motivic development with rests.',
          'When it stops working, fragment. The last two notes of a tired idea are a fresh one.',
        ],
      },
      {
        kind: 'callout',
        title: 'Who does this',
        text: 'Sonny Rollins on Blue 7 is the textbook: an entire solo from a three-note idea. Thelonious Monk does it to his own melodies. Wynton Kelly on Freddie Freeloader plays almost nothing but the blues scale and it never repeats, because each phrase answers the one before. Listen for the idea, not the notes.',
      },
    ],
    related: ['constraint-improvising', 'rhythmic-displacement', 'blues-language', 'building-a-solo'],
  },
  {
    slug: 'blues-language',
    title: 'Blues language',
    category: 'Improvisation',
    summary: 'The devices that make a line sound like the blues: the minor 3rd against the major chord, the slide, the crushed note and the answer to every call.',
    inPlainTerms:
      'The blues is not a scale; it is a way of bending notes that the piano cannot bend, and a handful of tricks that fake the bend convincingly. Add those tricks to the notes and the scale starts to sound like the records. Leave them out and it sounds like a scale.',
    blocks: [
      {
        kind: 'prose',
        text: 'The defining sound is a minor 3rd played over a major chord. Singers and horn players slide between the two; the piano cannot, so it plays both, quickly, the minor one first. Every other device on this page is a version of that: two adjacent notes standing in for one bent one.',
      },
      {
        kind: 'keyboard',
        label: 'C blues with the major 3rd added — the E next to the E♭',
        notes: ['C', 'E♭', 'E', 'F', 'G♭', 'G', 'B♭', 'C'],
        note: 'Two pairs of adjacent keys: E♭ and E, G♭ and G. The blues lives in those two pairs. Play the first of each pair short and the second long.',
      },
      {
        kind: 'worked',
        label: 'The devices, over C7',
        rows: [
          { symbol: 'The slide', means: 'the ♭3 as a quick grace note into the 3rd — the piano’s bend', gives: 'E♭ → E' },
          { symbol: 'The crush', means: 'the ♭3 and 3 struck together, the ♭3 released first', gives: 'E♭ + E' },
          { symbol: 'The blue 5th', means: 'the ♭5 passed through between the 4th and the 5th, never landed on', gives: 'F – G♭ – G' },
          { symbol: 'The ♭7 on the I', means: 'B♭ over C, where a major key would have B — the note that makes the I chord a dominant', gives: 'B♭' },
          { symbol: 'The ♯9 on the V', means: 'the ♭3 of the key, held over the G7 — B♭ against B', gives: 'B♭ over G7' },
        ],
      },
      {
        kind: 'rhythm',
        label: 'Call and response — two bars of phrase, two of silence',
        beats: 4,
        subdivision: 2,
        right: 'x.xx.x..',
        note: 'One bar of the two shown. The phrase stops on the and of three and the rest of the bar is empty. The next phrase answers it. A blues chorus is six of these pairs, and the silence is half the language.',
      },
      {
        kind: 'list',
        items: [
          'Repeat a note. Three or four times, the same note, with rhythm. Horn players do this by accident; pianists have to do it on purpose.',
          'Fewer notes than you think, and lower than you think. The blues lives in the middle of the keyboard, not the top.',
          'Learn it from records, not from this page. Wynton Kelly on Freddie Freeloader, Red Garland on anything in F, Oscar Peterson when he slows down. The scale is on the diminished and blues page; the sound is only on the records.',
        ],
      },
      {
        kind: 'callout',
        title: 'Why it sits next to the diminished scale in unit 8',
        text: 'The diminished scale can be worked out with arithmetic and the blues cannot be worked out at all. Practising them in the same session keeps you honest about which kind of musician you are being that day, and reminds you that the second kind is the one people pay to hear.',
      },
    ],
    related: ['diminished-and-blues', 'blues-forms', 'motivic-development', 'pentatonic-scales'],
  },
  {
    slug: 'building-a-solo',
    title: 'Building a solo across choruses',
    category: 'Improvisation',
    summary: 'What each chorus of a solo is for, where the peak goes, and how to stop before you run out.',
    inPlainTerms:
      'A solo is a short piece of music with a beginning, a rise and an end, and most bad solos fail not on the notes but on the shape: they start at full intensity and have nowhere to go. Deciding in advance what each chorus is for solves most of that before a note is played.',
    blocks: [
      {
        kind: 'table',
        head: ['Chorus', 'Job', 'How'],
        rows: [
          ['1', 'Say the tune', 'Stay near the melody. Simple rhythms, chord tones, a lot of space. The listener is learning your voice'],
          ['2', 'Develop', 'Take the best idea from chorus one and do the motivic development page to it. Wider range, denser rhythm'],
          ['3', 'Peak', 'Highest register, fastest notes, loudest, and the outside devices if you use them. It is a peak: one chorus, not two'],
          ['4', 'Come down', 'Back to the middle of the keyboard, fewer notes, a quote from the melody. End before the last bar so the tune can come back'],
        ],
      },
      {
        kind: 'prose',
        text: 'Four choruses is a long solo. Two is more common, and then the shape compresses: the first chorus does the first two jobs, the second does the last two. One chorus is a statement, not a solo, and the shape is a single rise and fall across thirty-two bars.',
      },
      {
        kind: 'list',
        items: [
          'Range is the cheapest tool. Start low and end high and the solo has a shape even if the notes are the same.',
          'Density is the second: quarter notes in the first chorus, eighths in the second, and only then anything faster.',
          'Volume is the third and the one pianists forget. If chorus one is loud, chorus three has nowhere to go.',
          'The last phrase of the solo should be something the listener has heard already. A returning idea says the solo was planned; a new idea in the last bar says it ran out.',
          'Record it and count the ideas. A good solo has two or three; a bad one has fifteen.',
        ],
      },
      {
        kind: 'callout',
        title: 'Stop early',
        text: 'End the solo at least two bars before the form ends, and let the rhythm section, or your own left hand, carry the last bars into the head. A solo that runs to the last beat of the form and then the melody starts on top of it sounds unfinished even when it was good. The silence before the head is part of the solo.',
      },
    ],
    related: ['motivic-development', 'constraint-improvising', 'chord-tones-first', 'recording-yourself'],
  },
]
