import type { Topic } from '../types'

/** Practice method: the pages behind the variants' tune instructions. */
export const PRACTICE: Topic[] = [
  {
    slug: 'learning-a-tune',
    title: 'Learning a tune by ear',
    category: 'Practice',
    summary: 'The method the tune block follows every session: listen, sing, enter anywhere, transpose, and what from memory actually means.',
    inPlainTerms:
      'A tune you can only play from the top, reading the page, is not one you know. Knowing a tune means being able to sing it away from the piano, start it from the middle, and find it in another key by ear, and there is an order of steps that gets you there in a week.',
    blocks: [
      {
        kind: 'prose',
        text: 'The ten steps of every unit say something about the tune each day, and read in order they are a method. This page puts the method in one place so you can see it whole, and explains why each step is where it is.',
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Listen twice before you touch the keys, and do not play along. The first time follow only the melody; the second time follow only the bass. You are learning the shape of the tune, not shadowing a record.',
          'Sing the melody. All of it, sitting in a chair, without the piano. If you cannot, you do not know the tune yet, and no amount of playing it will fix that. Go back to the record.',
          'Play the melody in time, no chart. Slowly. Where it stalls is where the singing was vague.',
          'Enter at the bridge, from memory. Sing four bars of it first, then play them. If you can only start at bar one you have memorised a sequence of hand movements, not a tune.',
          'Bass line under the melody: roots only, then guide tones. Now you know the harmony as a sound rather than as symbols.',
          'A fourth up, by ear. Sing the first phrase in the new key before your hands move. Singing first is what stops you transposing shapes instead of hearing.',
          'Record a chorus and listen twice: once for time, once for tone. Write down one thing to fix.',
        ],
      },
      {
        kind: 'table',
        head: ['You think you know it if', 'You actually know it if'],
        rows: [
          ['You can play it with the chart', 'You can sing it in the car'],
          ['You can play it from the top', 'You can start at any eight-bar section'],
          ['You know the chord symbols', 'You can play the bass line without thinking'],
          ['You can play it in the key of the record', 'You can find the head in a new key by ear in under a minute'],
          ['You have played it a lot', 'You have played it with the lid down, listening to yourself'],
        ],
      },
      {
        kind: 'callout',
        title: 'Why singing is not optional',
        text: 'The hands will learn a sequence of movements long before the ear learns the tune, and a sequence of movements collapses under any pressure: a new key, a different tempo, someone else’s intro. Singing bypasses the hands. If the voice knows the tune, the hands can be taught it in any key; if only the hands know it, it lives in one key and one tempo.',
      },
    ],
    related: ['ear-training', 'recording-yourself', 'song-forms', 'transcription'],
  },
  {
    slug: 'reading-a-lead-sheet',
    title: 'Reading a lead sheet',
    category: 'Practice',
    summary: 'What a Real Book page is, what it leaves out, and the navigation signs that tell you where to go next.',
    inPlainTerms:
      'A lead sheet is a melody with chord names above it and nothing else. Everything a band actually plays has to be built from that, so reading one is less like reading music and more like reading a recipe: it tells you the ingredients and expects you to know the method.',
    blocks: [
      {
        kind: 'list',
        items: [
          'The melody, one line, usually with the lyric’s rhythm. Play it as written the first time and then never again: the recording you learned it from phrases it better than the page does.',
          'The chord symbols, above the stave, one or two per bar. The reading chord symbols page decodes the strange ones. A symbol lasts until the next one.',
          'The form, marked with repeats, endings and section letters. Read the whole page for signs before you play a bar, because the ending is often in the middle.',
          'What it does not have: voicings, a bass line, a rhythm, an intro, an ending, or any indication of how loud. All of that is yours.',
        ],
      },
      {
        kind: 'table',
        head: ['Sign', 'Means', 'Example'],
        rows: [
          ['Repeat bars ‖: :‖', 'Play the section between them twice', 'Beautiful Love is sixteen bars repeated'],
          ['1. and 2. brackets', 'First time through take the first ending, second time the second', 'Someday My Prince Will Come: bars 9 to 16 change on the repeat'],
          ['D.C.', 'Da capo — go back to the top', 'Common in tunes with a written intro'],
          ['D.S.', 'Dal segno — go back to the sign 𝄋', 'The head after the solos, skipping the intro'],
          ['Coda ⊕', 'On the last time, jump from the coda sign to the coda', 'The written ending'],
          ['Fine', 'Stop here, on the last time', 'Usually after a D.C. or D.S.'],
          ['A, B, C letters', 'Section names; the form is the sequence of them', 'AABA, ABAC'],
        ],
      },
      {
        kind: 'prose',
        text: 'Before you play a chart, do three things with a pencil. Bracket the sections and write the form in the margin. Circle every ii–V–I. Write the key centre over each section that is in a different key from the tune. Then the chart is a map of five or six places rather than thirty-two bars of symbols, and the major ii–V–I and song forms pages are the legend.',
      },
      {
        kind: 'callout',
        title: 'The chart is one version',
        text: 'Real Book charts have errors and simplifications, and the recording you love probably uses different changes in at least four bars. When the page and the record disagree, the record is right. Learn the tune from the record and use the page to check the bars you were not sure of; the learning a tune page says why that order matters.',
      },
    ],
    related: ['reading-chord-symbols', 'song-forms', 'major-two-five-one', 'learning-a-tune'],
  },
  {
    slug: 'ear-training',
    title: 'Ear training',
    category: 'Practice',
    summary: 'Intervals from tunes you already know, chord qualities by their one different note, and the bass line as the thing to hear first.',
    inPlainTerms:
      'Most ear training is done at the piano, which is the one place it does not stick, because the hands answer before the ear has to. The exercises that work are the ones done away from the keyboard, and they all come down to recognising a small number of sounds you have heard a thousand times already.',
    blocks: [
      {
        kind: 'table',
        head: ['Interval', 'Hear it as', 'Up or down'],
        rows: [
          ['Minor 2nd', 'The Jaws theme', 'Up'],
          ['Major 2nd', 'Happy Birthday, first two notes', 'Up'],
          ['Minor 3rd', 'Greensleeves, first two notes', 'Up'],
          ['Major 3rd', 'Oh When the Saints', 'Up'],
          ['Perfect 4th', 'Here Comes the Bride', 'Up'],
          ['Tritone', 'The Simpsons, first two notes', 'Up'],
          ['Perfect 5th', 'Twinkle Twinkle', 'Up'],
          ['Minor 6th', 'Love Story theme', 'Up'],
          ['Major 6th', 'My Bonnie Lies Over the Ocean', 'Up'],
          ['Minor 7th', 'Somewhere, from West Side Story', 'Up'],
          ['Major 7th', 'Take On Me, chorus', 'Up'],
          ['Octave', 'Somewhere Over the Rainbow', 'Up'],
        ],
      },
      {
        kind: 'prose',
        text: 'Chord qualities are easier than intervals, because you are listening for one note. Major or minor is the 3rd. Major seventh or dominant is the 7th. Half-diminished is minor with the 5th gone flat. Play the five qualities from one root with your eyes closed until you can name them from the first hearing, then have someone else play them.',
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Sing the root of every chord in the tune while it plays. Then sing the 3rd. Then the 7th. The regimen calls this the bass line, and the introduce step asks you to follow it on the second listen.',
          'Sing a phrase, then play it. Never the other way round. If you cannot sing it, you are about to play something you did not hear.',
          'Transcribe four bars a week, as the transcription page describes. Transcription is ear training with a result.',
          'Name the ii–V–Is on a recording you know, in real time, by ear. Then check against the chart. The ones you missed are the ones that were disguised, and the disguise is the reharmonisation page.',
        ],
      },
      {
        kind: 'callout',
        title: 'The transpose step is an ear test',
        text: 'The seventh session of every unit asks for the head a fourth up, found by ear, singing first. It is placed there because by that point the hands know the tune too well in the original key, and the only way to prove the ear knows it is to take the hands somewhere they have never been.',
      },
    ],
    related: ['learning-a-tune', 'transcription', 'seventh-chords-and-inversions', 'major-two-five-one'],
  },
  {
    slug: 'recording-yourself',
    title: 'Recording yourself, and what to listen for',
    category: 'Practice',
    summary: 'Why the consolidate step ends with a recording, the two listens, and the things a player cannot hear while playing.',
    inPlainTerms:
      'While you are playing, your attention is on the next note, and several things go wrong that you will never notice from the bench. A phone on the music stand hears them all, and listening back twice, for one thing each time, is the fastest way to find out what to practise next.',
    blocks: [
      {
        kind: 'prose',
        text: 'The tenth session of every unit says: record a full take, then listen twice with the piano lid down. First pass, time only. Second pass, tone only. Write down one thing to fix and decide nothing else. Every clause of that is deliberate.',
      },
      {
        kind: 'table',
        head: ['Listen', 'Only for', 'What you will find'],
        rows: [
          ['First', 'Time', 'Rushing into the bridge. Dragging on the ballad. The left hand hesitating under a busy right hand. Offbeats landing early'],
          ['Second', 'Tone', 'The left hand louder than the melody. A harsh accent on every thumb note. Pedal smearing the changes. The top note not on top'],
        ],
      },
      {
        kind: 'list',
        items: [
          'The lid down, or your eyes closed, or the recording played from another room. If you can see the keyboard you will listen with your hands.',
          'One thing per listen. Listening for everything hears nothing.',
          'Write the one thing down before you decide whether it matters. Deciding is a way of not writing it down.',
          'Do not fix it that day. The consolidate step is nothing new, and a fix is something new. It goes at the top of the next unit’s first session.',
          'Keep the recordings. In three months, the take from unit 1 is the only evidence you will believe that anything improved.',
        ],
      },
      {
        kind: 'callout',
        title: 'What a phone hears that you cannot',
        text: 'Balance, because low notes carry further than they feel. Time, because the player feels the intention and the listener hears the arrival. And the gaps: a hesitation of a tenth of a second before a hard chord is invisible from the bench and obvious from the chair. Unit 4 asks you to record your own comping and solo over it, and the drill works because the comping you hear back is never the comping you thought you played.',
      },
    ],
    related: ['touch-and-balance', 'tempo-targets', 'learning-a-tune', 'practice-log'],
  },
  {
    slug: 'transcription',
    title: 'Transcription, four bars at a time',
    category: 'Practice',
    summary: 'Taking a phrase off a record by ear, why four bars is the right amount, and what to transcribe in each unit.',
    inPlainTerms:
      'Learning a phrase from a recording by ear is the single practice that turns theory into a way of playing, because the phrase arrives with its rhythm, its accents and its place in the bar already attached. Four bars is enough to learn something and short enough to finish.',
    blocks: [
      {
        kind: 'list',
        ordered: true,
        items: [
          'Choose four bars you can already sing. If you cannot sing them, you do not yet like them enough to learn them.',
          'Loop them and sing along until the singing is exact: every note, every rhythm. Still no piano.',
          'Find the first note on the piano. Then the second. Do not write anything down until you can play all four bars from memory.',
          'Now write it down, and work out what each note is doing against the chord. The vocabulary page shows what that looks like.',
          'Play it in the key of the day, then a fourth up. A phrase in one key is a quotation; in twelve, it is yours.',
        ],
      },
      {
        kind: 'table',
        head: ['Unit', 'Transcribe', 'Because'],
        rows: [
          ['1 to 2', 'The melody of the tune, exactly as the record phrases it', 'The page has the notes; the record has the phrasing'],
          ['3', 'Four bars of Bill Evans comping, left hand only', 'The rootless voicings, in context, with their rhythm'],
          ['4', 'Four bars of a walking bass line', 'The approach notes, and where the chromatic ones go'],
          ['5 to 6', 'A phrase over a minor ii–V–i, and one over an altered dominant', 'The alterations as a horn player uses them'],
          ['7 to 8', 'Four bars of a blues solo', 'The slides, the repeated notes, the space'],
          ['9', 'Four bars of block chords, both hands', 'How the diminished chords fall between the sixth chords'],
          ['10', 'A whole chorus', 'You are ready'],
        ],
      },
      {
        kind: 'callout',
        title: 'Slow it down, not too much',
        text: 'Every phone can slow a recording without changing the pitch. Use it for finding notes, but do the final passes at full speed: a phrase learned at half tempo has half-tempo accents, and the accents are most of what you came for.',
      },
    ],
    related: ['ear-training', 'two-five-vocabulary', 'learning-a-tune', 'who-to-listen-to'],
  },
  {
    slug: 'practice-log',
    title: 'The practice log and the level ladder',
    category: 'Practice',
    summary: 'What to write down after a session, what the level numbers mean, and how the hundred sessions map onto them.',
    inPlainTerms:
      'Practice that is not measured does not compound, because you cannot tell whether today was better than last month. A log is one line a day: the key, the fastest clean tempo, and one thing to fix. The level numbers are the same idea across the whole curriculum.',
    blocks: [
      {
        kind: 'table',
        head: ['Level', 'Sessions', 'Means you can'],
        rows: [
          ['4.0', '1 to 10', 'Play every major scale evenly, hands together, and a shell under every chord'],
          ['4.2', '11 to 20', 'Hear modes as degrees of one scale, and play the scale in thirds'],
          ['4.4', '21 to 30', 'Comp a ii–V–I with rootless voicings, top note moving by step'],
          ['4.6', '31 to 40', 'Walk a bass line under a comp, and run a bebop scale that lands on chord tones'],
          ['4.8', '41 to 50', 'Play the minor ii–V–i in every key, from memory'],
          ['5.0', '51 to 60', 'Use the altered scale on any dominant without deriving it'],
          ['5.2', '61 to 70', 'Grab four upper structures over any dominant'],
          ['5.4', '71 to 80', 'Play a twelve-bar blues someone would want to hear'],
          ['5.6', '81 to 90', 'Arrange a tune for solo piano, start to finish'],
          ['5.8 to 6.0', '91 to 100', 'All of it, in every key, at tempo, without a chart'],
        ],
      },
      {
        kind: 'list',
        items: [
          'One line per session. The date, the session number, the key, and the fastest clean tempo for the scale block. That is the minimum and it takes twenty seconds.',
          'The number is the tempo at which it was clean three times in a row, with the click on 2 and 4. Not once. Not with the click on the downbeats.',
          'One thing to fix, from the consolidate recording, once a unit. Not a list; one thing.',
          'Once a month, read the log backwards. The tempo column is the only honest measure of whether the last month happened.',
        ],
      },
      {
        kind: 'prose',
        text: 'The session numbers in the table are where each level is taught, not where it is passed. Most people are a unit behind: comfortable with the material of the unit before the one they are in. That is expected, and the combine step in each unit exists so the previous unit keeps being practised while the new one is still hard.',
      },
      {
        kind: 'callout',
        title: 'Progress in this app is not the log',
        text: 'The check marks on the regimen page record that a session happened. The log records whether it was any good. Both matter; only the second one tells you what to do tomorrow. The tempo targets page gives the numbers to aim at for each level.',
      },
    ],
    related: ['tempo-targets', 'building-speed', 'recording-yourself', 'cycle-of-fourths'],
  },
]
