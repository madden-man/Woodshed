import type { Topic } from '../types'

/**
 * Repertoire: song forms, the blues, and one page per tune the curriculum
 * uses. Each tune page has exactly one `changes` block for the whole form,
 * with the sections the tune block refers to ("the bridge") marked.
 */
export const REPERTOIRE: Topic[] = [
  {
    slug: 'song-forms',
    title: 'Song forms: 12-bar, AABA, ABAC',
    category: 'Repertoire',
    summary: 'The three shapes almost every standard takes, how to tell them apart on a chart, and what the bridge is.',
    inPlainTerms:
      'Nearly every tune in the repertoire is built from eight-bar sections arranged in one of a few patterns, and once you know the pattern you know where the tune is going before you have read the chords. The section that differs from the others is the one people mean when they say the bridge.',
    blocks: [
      {
        kind: 'table',
        head: ['Form', 'Length', 'Shape', 'Tunes in the curriculum'],
        rows: [
          ['Twelve-bar blues', '12', 'One section, three phrases of four', 'The unit 8 blues'],
          ['Sixteen-bar', '16', 'Two phrases of eight, or one of sixteen', 'Blue Bossa, Beautiful Love (repeated)'],
          ['AABA', '32', 'A section twice, a contrasting B, then A again', 'Take the A Train, Someday My Prince Will Come'],
          ['ABAC', '32', 'A, a different B, A again, then a C that ends the tune', 'There Will Never Be Another You, Autumn Leaves (as AABC)'],
          ['Extended', '36', 'AABA with a twelve-bar last A', 'All the Things You Are'],
        ],
      },
      {
        kind: 'prose',
        text: 'In an AABA tune the bridge is the B: eight bars in the middle that go somewhere else, usually a new key, before the last A brings the tune home. In an ABAC tune there is no single bridge, and the rearrange step’s instruction to start at the bridge means the B section, bars nine to sixteen. The tune pages mark the sections so there is no guessing.',
      },
      {
        kind: 'list',
        items: [
          'Read the section letters before the chords. If the chart has none, look for the repeat: the first eight bars appearing again at bar seventeen is an AABA.',
          'The bridge is the part that gets forgotten first and stumbles on the gig. Learn it before the A sections, not after.',
          'The last two bars of every A section are a turnaround back to the top, and the last two bars of the tune are a turnaround too unless the chart writes an ending.',
          'A twelve-bar blues has no bridge and no sections. Its shape is three phrases: a statement, the same statement over the IV, and an answer over the V.',
        ],
      },
      {
        kind: 'callout',
        title: 'Why the form matters more than the changes',
        text: 'A player who loses a chord recovers in a bar. A player who loses the form is lost until the next chorus, and everyone can hear it. Count the sections out loud the first few times through any tune, and when you improvise, know which eight bars you are in at every moment. The building a solo page assumes you do.',
      },
    ],
    related: ['reading-a-lead-sheet', 'turnarounds', 'blues-forms', 'learning-a-tune'],
  },
  {
    slug: 'autumn-leaves',
    title: 'Autumn Leaves',
    category: 'Repertoire',
    summary: 'Kosma, 1945. Thirty-two bars in G minor that are nothing but ii–V–Is, major and minor, which is why it is the first tune.',
    inPlainTerms:
      'This is the tune everyone learns first because its harmony is the basic progression, over and over, in a major key and in its relative minor. Learn it and you have learned the two progressions the whole curriculum is built on, inside a melody you already know.',
    blocks: [
      {
        kind: 'changes',
        label: 'Autumn Leaves in G minor — 32 bars',
        bars: [
          'Cm7', 'F7', 'B♭maj7', 'E♭maj7', 'Am7♭5', 'D7', 'Gm6', 'Gm6',
          'Cm7', 'F7', 'B♭maj7', 'E♭maj7', 'Am7♭5', 'D7', 'Gm6', 'Gm6',
          'Am7♭5', 'D7', 'Gm6', 'Gm6', 'Cm7', 'F7', 'B♭maj7', 'E♭maj7',
          'Am7♭5', 'D7', 'Gm7 C7', 'Fm7 B♭7', 'E♭maj7', 'Am7♭5 D7', 'Gm6', 'Gm6',
        ],
        sections: [
          { name: 'A', at: 1 },
          { name: 'A', at: 9 },
          { name: 'B', at: 17 },
          { name: 'C', at: 25 },
        ],
        note: 'The Real Book puts it in G minor; many recordings, including the Cannonball Adderley one, are in E minor. Some charts end bar 32 with a turnaround, Am7♭5 D7, back to the top.',
      },
      {
        kind: 'worked',
        label: 'What the first eight bars are',
        rows: [
          { symbol: 'Bars 1 – 3', means: 'a major ii–V–I in B♭: Cm7, F7, B♭maj7', gives: 'ii – V – I in B♭' },
          { symbol: 'Bar 4', means: 'the IV of B♭, which is also the ♭VI of G minor — the hinge between the two keys', gives: 'E♭maj7' },
          { symbol: 'Bars 5 – 7', means: 'a minor ii–V–i in G: Am7♭5, D7, Gm', gives: 'ii – V – i in G minor' },
          { symbol: 'Bar 8', means: 'a second bar of the minor tonic, and the phrase is over', gives: 'Gm6' },
        ],
        note: 'Eight bars, two progressions, one shared note collection. Every A section is this; the B and C sections rearrange the same pieces.',
      },
      {
        kind: 'table',
        head: ['The regimen says', 'Which means'],
        rows: [
          ['The bridge', 'Bars 17 to 24: the minor ii–V–i first, then the major one'],
          ['Every ii–V–I inside it', 'Six: major in bars 1, 9 and 21; minor in bars 5, 13, 17, 25 and 30'],
          ['Shells in the left hand', 'The guide-tone lines page walks bars 1 to 8 with them'],
          ['A fourth up', 'C minor, with the major ii–V–I landing in E♭'],
        ],
      },
      {
        kind: 'callout',
        title: 'Listen to',
        text: 'Cannonball Adderley’s Somethin’ Else, 1958, with Miles Davis: the definitive slow version, with an intro worth stealing. Bill Evans on Portrait in Jazz, 1959, for what a trio can do with the form. Keith Jarrett’s Standards trio for how far the tune stretches.',
      },
    ],
    related: ['major-two-five-one', 'minor-two-five-one', 'guide-tone-lines', 'song-forms'],
  },
  {
    slug: 'blue-bossa',
    title: 'Blue Bossa',
    category: 'Repertoire',
    summary: 'Kenny Dorham, 1963. Sixteen bars in C minor with one excursion to D♭, and the first tune the rootless voicings go under.',
    inPlainTerms:
      'A short minor tune with a Latin feel, built from the minor progression at home and a major one a half step up, so it teaches the difference between the two in the space of sixteen bars. It is short enough to memorise in a session and rich enough to comp over for a month.',
    blocks: [
      {
        kind: 'changes',
        label: 'Blue Bossa in C minor — 16 bars',
        bars: [
          'Cm7', 'Cm7', 'Fm7', 'Fm7',
          'Dm7♭5', 'G7', 'Cm7', 'Cm7',
          'E♭m7', 'A♭7', 'D♭maj7', 'D♭maj7',
          'Dm7♭5', 'G7', 'Cm7', 'Dm7♭5 G7',
        ],
        sections: [
          { name: 'A', at: 1 },
          { name: 'B', at: 9 },
        ],
        note: 'The last bar is a turnaround back to the top. The G7 is usually played altered, since it is heading to a minor chord.',
      },
      {
        kind: 'worked',
        label: 'Two keys, a half step apart',
        rows: [
          { symbol: 'Bars 1 – 8', means: 'C minor: the i, the iv, and a minor ii–V–i back to the i', gives: 'Cm7 · Fm7 · Dm7♭5 G7 · Cm7' },
          { symbol: 'Bars 9 – 12', means: 'a major ii–V–I in D♭, a half step above the home key', gives: 'E♭m7 · A♭7 · D♭maj7' },
          { symbol: 'Bars 13 – 16', means: 'the minor ii–V–i again, and a turnaround', gives: 'Dm7♭5 · G7 · Cm7' },
        ],
        note: 'D♭maj7 to Dm7♭5 is a half-step move. The whole tune turns on that one bar line.',
      },
      {
        kind: 'table',
        head: ['The regimen says', 'Which means'],
        rows: [
          ['Rootless A comping behind the melody', 'Cm7 as E♭ G B♭ D; Fm7 as A♭ C E♭ G; the D♭ major bars with the major forms'],
          ['The bridge', 'There is no B section in the AABA sense; the regimen means bars 9 to 12, the D♭ excursion'],
          ['The bossa feel', 'The left-hand patterns page draws the bass rhythm'],
          ['A fourth up', 'F minor, with the excursion landing in G♭'],
        ],
      },
      {
        kind: 'callout',
        title: 'Listen to',
        text: 'Joe Henderson’s Page One, 1963, with Dorham himself: the original, and the tempo to learn it at. Dexter Gordon’s Biting the Apple for a harder swing on the same changes.',
      },
    ],
    related: ['minor-two-five-one', 'rootless-voicings', 'left-hand-patterns', 'rootless-minor-voicings'],
  },
  {
    slug: 'take-the-a-train',
    title: 'Take the A Train',
    category: 'Repertoire',
    summary: 'Strayhorn, 1939. The AABA form with a II7 chord in the third bar that makes it the tune for lydian dominant.',
    inPlainTerms:
      'A bright, simple tune in C whose one surprising chord, a dominant built on the second degree, is the reason it is in the curriculum: that chord wants a particular scale, and this is the tune where you meet it. The rest is a plain progression and a bridge in the key of the fourth.',
    blocks: [
      {
        kind: 'changes',
        label: 'Take the A Train in C — 32 bars, AABA',
        bars: [
          'C6', 'C6', 'D7♯11', 'D7♯11', 'Dm7', 'G7', 'C6', 'Dm7 G7',
          'C6', 'C6', 'D7♯11', 'D7♯11', 'Dm7', 'G7', 'C6', 'C7',
          'Fmaj7', 'Fmaj7', 'Fmaj7', 'Fmaj7', 'D7', 'D7', 'Dm7', 'G7',
          'C6', 'C6', 'D7♯11', 'D7♯11', 'Dm7', 'G7', 'C6', 'C6',
        ],
        sections: [
          { name: 'A', at: 1 },
          { name: 'A', at: 9 },
          { name: 'B', at: 17 },
          { name: 'A', at: 25 },
        ],
        note: 'The second A ends on C7, the V of F, to set up the bridge. The last A ends on the tonic. Charts differ on whether the D7 carries the ♯11; the melody has a G♯ in it, so it does.',
      },
      {
        kind: 'worked',
        label: 'The chord that matters',
        rows: [
          { symbol: 'D7♯11', means: 'a dominant on the 2nd degree of C — the V of V, a secondary dominant', gives: 'D F♯ A C, with G♯ on top' },
          { symbol: 'Where it goes', means: 'not to G but to Dm7 — it does not resolve, it dissolves', gives: 'D7 → Dm7' },
          { symbol: 'The scale', means: 'lydian dominant on D: A melodic minor from its 4th degree', gives: 'D E F♯ G♯ A B C' },
        ],
        note: 'The G♯ in the melody is the ♯11. That is why the plain mixolydian scale sounds wrong here and lydian dominant sounds like the record.',
      },
      {
        kind: 'table',
        head: ['The regimen says', 'Which means'],
        rows: [
          ['The bridge', 'Bars 17 to 24: four bars of Fmaj7, two of D7, and a ii–V back to C'],
          ['Record two choruses of comping', 'Rootless B on the C6 as E G A D; on the D7 as F♯ A C E with the G♯ on top'],
          ['Every ii–V–I', 'Bars 5 to 7, 13 to 15, 23 to 25, 29 to 31'],
          ['A fourth up', 'F, with the II7 on G'],
        ],
      },
      {
        kind: 'callout',
        title: 'Listen to',
        text: 'Duke Ellington, 1941: the record that made it the band’s theme, with the intro every pianist should know. Oscar Peterson’s Night Train for the trio version. Ella Fitzgerald with Ellington for the tempo it was written at.',
      },
    ],
    related: ['lydian-dominant', 'secondary-dominants', 'rootless-voicings', 'song-forms'],
  },
  {
    slug: 'beautiful-love',
    title: 'Beautiful Love',
    category: 'Repertoire',
    summary: 'Victor Young, 1931. Sixteen bars in D minor, repeated with a second ending, and a minor ii–V–i in nearly every phrase.',
    inPlainTerms:
      'A minor-key ballad whose harmony is the minor progression at home, the major progression in the relative major, and back again, which makes it the tune for hearing how the two relate. It is short, and every phrase starts with the chord the unit is teaching.',
    blocks: [
      {
        kind: 'changes',
        label: 'Beautiful Love in D minor — 16 bars with a repeat, 32 in all',
        bars: [
          'Em7♭5', 'A7♭9', 'Dm', 'Dm', 'Gm7', 'C7', 'Fmaj7', 'Em7♭5 A7',
          'Dm', 'Gm7', 'B♭7♯11', 'Em7♭5 A7♯5', 'Dm', 'G7♯11', 'Em7♭5', 'A7♭9',
          'Em7♭5', 'A7♭9', 'Dm', 'Dm', 'Gm7', 'C7', 'Fmaj7', 'Em7♭5 A7',
          'Dm', 'Gm7', 'B♭7♯11', 'Em7♭5 A7♯5', 'Dm', 'B♭7 A7', 'Dm', 'Dm',
        ],
        sections: [
          { name: 'A', at: 1 },
          { name: '1st end', at: 13 },
          { name: 'A', at: 17 },
          { name: '2nd end', at: 29 },
        ],
        note: 'Bars 1 to 12 are played twice. The first time through, bars 13 to 16 turn around to the top; the second time, bars 29 to 32 end on the tonic. Often played in three-four as well as four-four.',
      },
      {
        kind: 'worked',
        label: 'The harmony, phrase by phrase',
        rows: [
          { symbol: 'Bars 1 – 4', means: 'the minor ii–V–i in D', gives: 'Em7♭5 · A7 · Dm' },
          { symbol: 'Bars 5 – 7', means: 'the major ii–V–I in F, the relative major', gives: 'Gm7 · C7 · Fmaj7' },
          { symbol: 'Bar 8', means: 'the minor ii–V again, in one bar, back to D', gives: 'Em7♭5 A7' },
          { symbol: 'Bars 10 – 12', means: 'the iv, then a tritone substitute for the V of V, then the ii–V once more', gives: 'Gm7 · B♭7 · Em7♭5 A7' },
        ],
        note: 'The B♭7 is the tritone sub of E7, which would be the V of A7. It arrives as a ♭VI7 and slides down a half step into the A7. The tritone substitution page explains why that works.',
      },
      {
        kind: 'table',
        head: ['The regimen says', 'Which means'],
        rows: [
          ['Every minor ii–V–i inside it', 'Bars 1, 8, 12 and 15, and the same again on the repeat'],
          ['The bridge', 'There is none; the regimen means bars 9 to 12, the second phrase'],
          ['The head', 'Sixteen bars, sung, then the second ending'],
          ['A fourth up', 'G minor, with the relative major in B♭'],
        ],
      },
      {
        kind: 'callout',
        title: 'Listen to',
        text: 'Bill Evans on Explorations, 1961: the version every pianist learns it from, in four-four with the trio pushing. Also his solo version on Alone, for the harmony with nobody else holding it up.',
      },
    ],
    related: ['minor-two-five-one', 'rootless-minor-voicings', 'tritone-substitution', 'half-diminished-scale'],
  },
  {
    slug: 'solar',
    title: 'Solar',
    category: 'Repertoire',
    summary: 'Miles Davis, 1954. Twelve bars that are not a blues: a chain of ii–V–Is falling through four keys, each dominant an invitation to alter.',
    inPlainTerms:
      'A twelve-bar tune that behaves nothing like a blues: it starts in a minor key and steps down through three major keys before turning around, so that a dominant chord arrives every two bars and every one of them can take the dark scale. It is the tune for learning to alter without stopping to think.',
    blocks: [
      {
        kind: 'changes',
        label: 'Solar in C minor — 12 bars',
        bars: [
          'Cm(maj7)', 'Cm(maj7)', 'Gm7', 'C7',
          'Fmaj7', 'Fmaj7', 'Fm7', 'B♭7',
          'E♭maj7', 'E♭m7 A♭7', 'D♭maj7', 'Dm7♭5 G7',
        ],
        note: 'Credited to Davis; the tune is Chuck Wayne’s Sonny with the first chord changed. The first chord is often played as a plain Cm7 or Cm6, but the melody has the B natural in it.',
      },
      {
        kind: 'worked',
        label: 'Four keys in twelve bars',
        rows: [
          { symbol: 'Bars 1 – 2', means: 'the minor tonic, with its major 7th — melodic minor country', gives: 'Cm(maj7)' },
          { symbol: 'Bars 3 – 5', means: 'a ii–V–I into F, a fourth above', gives: 'Gm7 · C7 · Fmaj7' },
          { symbol: 'Bars 7 – 9', means: 'a ii–V–I into E♭, a whole step down from F', gives: 'Fm7 · B♭7 · E♭maj7' },
          { symbol: 'Bars 10 – 11', means: 'a ii–V–I into D♭, a whole step down again, in half the time', gives: 'E♭m7 A♭7 · D♭maj7' },
          { symbol: 'Bar 12', means: 'the minor ii–V back to C, and round again', gives: 'Dm7♭5 G7' },
        ],
        note: 'Four dominants: C7, B♭7, A♭7, G7. Unit 6 asks you to play the altered scale over every one of them and nothing else. That is one melodic minor scale per dominant, a half step above each root.',
      },
      {
        kind: 'table',
        head: ['The regimen says', 'Which means'],
        rows: [
          ['Only the altered scale over every dominant', 'D♭ melodic minor over C7, B melodic minor over B♭7, A melodic minor over A♭7, A♭ melodic minor over G7'],
          ['The bridge', 'None; the regimen means bars 7 to 9'],
          ['A fourth up', 'F minor, and the keys fall B♭, A♭, G♭'],
        ],
      },
      {
        kind: 'callout',
        title: 'Listen to',
        text: 'Miles Davis on Walkin’, 1954, with Horace Silver: the original, brisk and unfussy. Keith Jarrett’s Standards trio for the long version. Bill Evans on Sunday at the Village Vanguard, with the Scott LaFaro bass lines.',
      },
    ],
    related: ['melodic-minor-family', 'altered-dominant-voicings', 'major-two-five-one', 'constraint-improvising'],
  },
  {
    slug: 'there-will-never-be-another-you',
    title: 'There Will Never Be Another You',
    category: 'Repertoire',
    summary: 'Harry Warren, 1942. Thirty-two bars ABAC in E♭ with a dominant chord of a different kind in nearly every phrase.',
    inPlainTerms:
      'A bright major tune whose harmony visits the relative minor, the fourth, and a dominant borrowed from the minor key, all in the first sixteen bars, so that almost every kind of dominant chord appears somewhere in it. That variety is why it is the tune for putting a different upper structure on each one.',
    blocks: [
      {
        kind: 'changes',
        label: 'There Will Never Be Another You in E♭ — 32 bars, ABAC',
        bars: [
          'E♭maj7', 'E♭maj7', 'Dm7♭5', 'G7', 'Cm7', 'Cm7', 'B♭m7', 'E♭7',
          'A♭maj7', 'D♭7', 'E♭maj7', 'Am7♭5 D7', 'Gm7', 'C7', 'Fm7', 'B♭7',
          'E♭maj7', 'E♭maj7', 'Dm7♭5', 'G7', 'Cm7', 'Cm7', 'B♭m7', 'E♭7',
          'A♭maj7', 'D♭7', 'E♭maj7', 'Am7♭5 D7', 'Gm7 C7', 'Fm7 B♭7', 'E♭maj7', 'Fm7 B♭7',
        ],
        sections: [
          { name: 'A', at: 1 },
          { name: 'B', at: 9 },
          { name: 'A', at: 17 },
          { name: 'C', at: 25 },
        ],
        note: 'The last eight bars vary more between charts than any other part of the tune. This version compresses the B section’s turnaround into bars 29 and 30; others put E♭maj7 A♭7 in bar 29. Ask the bass player.',
      },
      {
        kind: 'worked',
        label: 'The dominants, and what each one is',
        rows: [
          { symbol: 'G7, bar 4', means: 'the V of C minor, the relative minor — altered', gives: 'V of vi' },
          { symbol: 'E♭7, bar 8', means: 'the tonic turned into a dominant, heading to A♭ — plain, or with the 13', gives: 'V of IV' },
          { symbol: 'D♭7, bar 10', means: 'a dominant on the lowered 7th degree, borrowed from E♭ minor — lydian dominant', gives: '♭VII7' },
          { symbol: 'D7, bar 12', means: 'the V of G minor, the iii — altered', gives: 'V of iii' },
          { symbol: 'C7, bar 14', means: 'the V of F minor, the ii — altered, or with the ♭9', gives: 'V of ii' },
          { symbol: 'B♭7, bar 16', means: 'the V of the key at last', gives: 'V' },
        ],
        note: 'Six dominants in sixteen bars, five of them secondary. Unit 7 asks for an upper structure on each: the choice of triad follows the kind of dominant, and the table on the upper structures page says which.',
      },
      {
        kind: 'table',
        head: ['The regimen says', 'Which means'],
        rows: [
          ['The bridge', 'Bars 9 to 16, the B section'],
          ['An upper structure on every dominant', 'Six per half; the altered ones take the ♭II or ♭VI triad, the D♭7 takes the II'],
          ['Every ii–V–I', 'Bars 3 to 5 (minor), 7 to 9, 12 to 13, 14 to 17, and again in the second half'],
          ['A fourth up', 'A♭, with the ♭VII7 on G♭'],
        ],
      },
      {
        kind: 'callout',
        title: 'Listen to',
        text: 'Chet Baker, 1954, for the tempo and the phrasing of the head. Sonny Stitt for the changes played straight and fast. Nat King Cole for the lyric and the original harmony.',
      },
    ],
    related: ['upper-structure-triads', 'secondary-dominants', 'lydian-dominant', 'song-forms'],
  },
  {
    slug: 'blues-forms',
    title: 'The blues: jazz blues, minor blues, Bird blues',
    category: 'Repertoire',
    summary: 'Four twelve-bar forms, from the three-chord original to the one with a ii–V in every bar, and the quick IV and turnaround the regimen names.',
    inPlainTerms:
      'The blues is twelve bars long and has three chords in it, and everything jazz has done to it since is a way of adding chords between those three without losing the shape. Knowing the four standard versions means you can hear which one the band is playing and follow it.',
    blocks: [
      {
        kind: 'changes',
        label: 'The basic blues in F, with the quick IV',
        bars: [
          'F7', 'B♭7', 'F7', 'F7',
          'B♭7', 'B♭7', 'F7', 'F7',
          'C7', 'B♭7', 'F7', 'C7',
        ],
        note: 'Three chords. The B♭7 in bar 2 is the quick IV; without it, bars 1 to 4 are four bars of F7. Bars 11 and 12 are the turnaround, here in its simplest form.',
      },
      {
        kind: 'changes',
        label: 'The jazz blues in F',
        bars: [
          'F7', 'B♭7', 'F7', 'Cm7 F7',
          'B♭7', 'Bdim7', 'F7', 'Am7 D7',
          'Gm7', 'C7', 'F7 D7', 'Gm7 C7',
        ],
        note: 'The same three chords with a ii–V into the IV in bar 4, a passing diminished in bar 6, a ii–V into the ii in bar 8, and a full I–VI–ii–V turnaround. This is what a jazz musician means by a blues.',
      },
      {
        kind: 'changes',
        label: 'The minor blues in C',
        bars: [
          'Cm7', 'Cm7', 'Cm7', 'Cm7',
          'Fm7', 'Fm7', 'Cm7', 'Cm7',
          'A♭7', 'G7', 'Cm7', 'Dm7♭5 G7',
        ],
        note: 'The A♭7 in bar 9 is the ♭VI, a tritone sub for the D7 that would be the V of V. Every dominant is altered, because everything resolves to minor.',
      },
      {
        kind: 'changes',
        label: 'The Bird blues in F — Blues for Alice',
        bars: [
          'Fmaj7', 'Em7♭5 A7', 'Dm7 G7', 'Cm7 F7',
          'B♭7', 'B♭m7 E♭7', 'Am7 D7', 'A♭m7 D♭7',
          'Gm7', 'C7', 'F7 D7', 'Gm7 C7',
        ],
        note: 'Charlie Parker’s version: a ii–V in nearly every bar, falling by fourths and then by half steps until it reaches the ii in bar 9. Still a blues, because bars 1, 5 and 9 are still I, IV and V.',
      },
      {
        kind: 'table',
        head: ['The regimen says', 'Which means'],
        rows: [
          ['The quick IV in bar 2', 'The IV7 for one bar before returning to the I'],
          ['The turnaround in 11 and 12', 'I–VI–ii–V, two beats each, back to the top'],
          ['Tritone subs through the last four bars', 'Bars 9 to 12 as D♭7 · C7 · F7 A♭7 · D♭7 C7, or any dominant replaced by the one a tritone away'],
          ['Twelve choruses, one idea', 'The motivic development page'],
        ],
      },
      {
        kind: 'callout',
        title: 'Which one to learn',
        text: 'The jazz blues, first and in all twelve keys, because it is what will be called on a gig. The basic blues is inside it. The minor blues is unit 5’s progression stretched to twelve bars. The Bird blues is a reward for having learned the other three.',
      },
    ],
    related: ['turnarounds', 'blues-language', 'diminished-and-blues', 'tritone-substitution'],
  },
  {
    slug: 'someday-my-prince-will-come',
    title: 'Someday My Prince Will Come',
    category: 'Repertoire',
    summary: 'Frank Churchill, 1937. A jazz waltz in B♭ with an augmented dominant in every other bar of the A section, and the tune unit 9 arranges.',
    inPlainTerms:
      'A waltz from a cartoon that jazz musicians adopted for its harmony: the first eight bars alternate the home chord with dominants that have a raised fifth, which gives the melody a lift every two bars. It is in three, it is slow, and it is the tune for a full solo arrangement.',
    blocks: [
      {
        kind: 'changes',
        label: 'Someday My Prince Will Come in B♭ — 32 bars, in three-four',
        bars: [
          'B♭maj7', 'D7♯5', 'E♭maj7', 'G7♯5', 'Cm7', 'G7♯5', 'C7', 'F7',
          'Dm7', 'C♯dim7', 'Cm7', 'F7', 'Dm7', 'D♭dim7', 'Cm7', 'F7',
          'B♭maj7', 'D7♯5', 'E♭maj7', 'G7♯5', 'Cm7', 'G7♯5', 'C7', 'F7',
          'Fm7', 'B♭7', 'E♭maj7', 'Edim7', 'B♭maj7', 'B♭7sus4', 'B♭maj7', 'B♭maj7',
        ],
        sections: [
          { name: 'A', at: 1 },
          { name: '1st end', at: 9 },
          { name: 'A', at: 17 },
          { name: '2nd end', at: 25 },
        ],
        note: 'Bars 1 to 8 repeat; the first ending turns around through the diminished chords and the second ending finishes the tune. Some charts write a B7♯11 in the last bar as a pickup back to the top.',
      },
      {
        kind: 'worked',
        label: 'The chords that give the tune its lift',
        rows: [
          { symbol: 'D7♯5, bar 2', means: 'the V of the relative minor, with the 5th raised — a whole tone scale chord', gives: 'D F♯ A♯ C' },
          { symbol: 'Where it goes', means: 'not to G minor but to E♭maj7, the IV — a deceptive resolution', gives: 'D7♯5 → E♭maj7' },
          { symbol: 'G7♯5, bar 4', means: 'the V of ii, also augmented, resolving properly to Cm7', gives: 'G B D♯ F' },
          { symbol: 'C♯dim7, bar 10', means: 'a passing diminished between Dm7 and Cm7 — an A7♭9 without its root', gives: 'C♯ E G B♭' },
        ],
        note: 'The raised 5th in each dominant is in the melody: the A♯ in bar 2, the D♯ in bar 4. Whole tone scale over both.',
      },
      {
        kind: 'table',
        head: ['The regimen says', 'Which means'],
        rows: [
          ['A full arrangement: intro, head, one chorus, ending', 'The arranging a tune page, using this form'],
          ['Block chords under the melody', 'The A section melody moves by step, which is what the four-way close is for'],
          ['The bridge', 'None; the regimen means bars 9 to 16, the first ending'],
          ['A fourth up', 'E♭, in three'],
        ],
      },
      {
        kind: 'callout',
        title: 'Listen to',
        text: 'Miles Davis, 1961, with Wynton Kelly: the version the jazz changes come from, with the F pedal under the first eight bars. Bill Evans on Portrait in Jazz for the trio in three. Dave Brubeck’s 1957 version for the first jazz recording of it.',
      },
    ],
    related: ['whole-tone-scale', 'block-chords', 'arranging-a-tune', 'secondary-dominants'],
  },
  {
    slug: 'arranging-a-tune',
    title: 'Arranging a tune for solo piano',
    category: 'Repertoire',
    summary: 'Intro, head, chorus, ending: what each part is for, the standard choices for each, and how to make them sound decided.',
    inPlainTerms:
      'Playing a tune alone means deciding everything a band would decide together: how it starts, how the melody is dressed, what happens after the melody, and how it stops. An arrangement is those four decisions made in advance, so that the performance is a plan rather than a hope.',
    blocks: [
      {
        kind: 'table',
        head: ['Part', 'Length', 'Standard choices'],
        rows: [
          ['Intro', '4 or 8 bars', 'The last four bars of the tune. A vamp on the first two chords. A pedal point under the turnaround. Rubato over the first chord'],
          ['Head', 'One chorus', 'Melody with shells; melody with spread voicings; block chords in the busy phrases; the bass walking under the bridge'],
          ['Chorus', 'One or two', 'A solo built as the building a solo page describes, with the left hand walking or comping'],
          ['Head out', 'The last A, or the whole form', 'Bigger than the first head: block chords or two-handed voicings, and the melody an octave up'],
          ['Ending', '2 to 8 bars', 'A tag: the last four bars three times. A rallentando on the turnaround. A held 6/9 chord, arpeggiated'],
        ],
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Decide the intro last. It is the part people remember first, and you cannot know what it should set up until the rest exists.',
          'Vary the voicing type by section, not by bar. A section is eight bars of one idea: shells for the first A, spread voicings for the second, block chords for the bridge. The regimen’s unit 10 voicing ladder is a list of sections waiting to happen.',
          'The left hand changes job at the chorus. Under the head it holds chords; under the solo it walks. That change of texture is what tells the listener the solo has started.',
          'Write the ending down. An improvised ending is the same ending every time, and it is usually the weakest one.',
          'Record the arrangement and listen for the seams. Where the texture changes, does it sound like a decision or like an accident? The decisions are the arrangement.',
        ],
      },
      {
        kind: 'prose',
        text: 'Unit 9 asks for Someday My Prince Will Come this way: intro, head, one chorus, ending. That tune suits it because the A section melody moves by step, which block chords want; the bridge sits still, which spread voicings want; and it is a waltz, which forgives a left hand that cannot yet walk in four. The same plan fits any tune in the repertoire pages.',
      },
      {
        kind: 'callout',
        title: 'The one thing that makes it sound like an arrangement',
        text: 'Contrast. A performance in which every section is voiced the same way, at the same volume, with the same left hand, is a lead sheet read aloud. Two textures, clearly different, changed at a section boundary, and the listener hears a shape. The pedalling and touch pages are about the same thing at a smaller scale.',
      },
    ],
    related: ['block-chords', 'spread-voicings', 'someday-my-prince-will-come', 'building-a-solo'],
  },
  {
    slug: 'all-the-things-you-are',
    title: 'All the Things You Are',
    category: 'Repertoire',
    summary: 'Jerome Kern, 1939. Thirty-six bars through five keys, the tune players use to prove they know the cycle of fourths.',
    inPlainTerms:
      'The tune that goes everywhere: its melody rides a chain of chords falling in fourths through nearly half the keys before coming home, so that playing it in any key means playing in several. It is the final tune because it is the cycle of fourths as a piece of music.',
    blocks: [
      {
        kind: 'changes',
        label: 'All the Things You Are in A♭ — 36 bars',
        bars: [
          'Fm7', 'B♭m7', 'E♭7', 'A♭maj7', 'D♭maj7', 'G7', 'Cmaj7', 'Cmaj7',
          'Cm7', 'Fm7', 'B♭7', 'E♭maj7', 'A♭maj7', 'D7', 'Gmaj7', 'Gmaj7',
          'Am7', 'D7', 'Gmaj7', 'Gmaj7', 'F♯m7', 'B7', 'Emaj7', 'C7♯5',
          'Fm7', 'B♭m7', 'E♭7', 'A♭maj7', 'D♭maj7', 'D♭m7', 'Cm7', 'Bdim7', 'B♭m7', 'E♭7', 'A♭maj7', 'Gm7♭5 C7',
        ],
        sections: [
          { name: 'A', at: 1 },
          { name: 'A', at: 9 },
          { name: 'B', at: 17 },
          { name: 'A', at: 25 },
        ],
        note: 'The last A is twelve bars, which is why the tune is thirty-six. Bar 30 is D♭m7 in most charts, G♭7 in some; both are the backdoor into the Cm7. The last bar is a turnaround to Fm7.',
      },
      {
        kind: 'worked',
        label: 'The keys it passes through',
        rows: [
          { symbol: 'Bars 1 – 5', means: 'a vi–ii–V–I in A♭, then the IV: five roots falling in fourths', gives: 'F B♭ E♭ A♭ D♭' },
          { symbol: 'Bars 6 – 8', means: 'a V–I into C, a major third up — the surprise', gives: 'G7 · Cmaj7' },
          { symbol: 'Bars 9 – 13', means: 'the same shape a fourth up, in E♭', gives: 'C F B♭ E♭ A♭' },
          { symbol: 'Bars 14 – 16', means: 'a V–I into G, again a major third up', gives: 'D7 · Gmaj7' },
          { symbol: 'Bars 17 – 24', means: 'the bridge: ii–V–I in G, ii–V–I in E, and a C7♯5 that leads back to F minor', gives: 'G · E · C7♯5' },
          { symbol: 'Bars 25 – 36', means: 'the first A again, then the backdoor and a diminished passing chord bring it home', gives: 'A♭' },
        ],
        note: 'Five key centres: A♭, C, E♭, G, E. Each arrival is a major seventh chord, which is why the tune feels like it keeps landing somewhere new.',
      },
      {
        kind: 'table',
        head: ['The regimen says', 'Which means'],
        rows: [
          ['The head in two more keys by ear', 'The transpose step, twice; the tune modulates so much that a new key is five new keys'],
          ['The bridge', 'Bars 17 to 24'],
          ['Solo piano', 'The arranging a tune page; the walking bass through all five keys is the unit 10 drill'],
          ['Every ii–V–I', 'Bars 2 to 4, 6 to 7, 10 to 12, 14 to 15, 17 to 19, 21 to 23, 26 to 28, 33 to 35'],
        ],
      },
      {
        kind: 'callout',
        title: 'Listen to',
        text: 'Charlie Parker and Dizzy Gillespie, 1945, with the intro every band still plays. Keith Jarrett’s Standards trio for how it opens up. Ella Fitzgerald for the verse nobody else sings, and the melody as written.',
      },
    ],
    related: ['cycle-of-fourths', 'major-two-five-one', 'reharmonisation', 'walking-bass'],
  },
  {
    slug: 'rhythm-changes',
    title: 'Rhythm changes',
    category: 'Repertoire',
    summary: 'The chords of I Got Rhythm: the second most common form in jazz, a turnaround stretched over thirty-two bars with a bridge of dominants.',
    inPlainTerms:
      'Hundreds of bebop tunes were written on the chords of one Gershwin song, and those chords are the turnaround loop played four times with a bridge that circles through dominant chords back home. Know it and a large part of the fast repertoire is one tune with different melodies.',
    blocks: [
      {
        kind: 'changes',
        label: 'Rhythm changes in B♭ — 32 bars, AABA',
        bars: [
          'B♭6 G7', 'Cm7 F7', 'B♭6 G7', 'Cm7 F7', 'Fm7 B♭7', 'E♭6 Edim7', 'Dm7 G7', 'Cm7 F7',
          'B♭6 G7', 'Cm7 F7', 'B♭6 G7', 'Cm7 F7', 'Fm7 B♭7', 'E♭6 Edim7', 'Cm7 F7', 'B♭6',
          'D7', 'D7', 'G7', 'G7', 'C7', 'C7', 'F7', 'F7',
          'B♭6 G7', 'Cm7 F7', 'B♭6 G7', 'Cm7 F7', 'Fm7 B♭7', 'E♭6 Edim7', 'Cm7 F7', 'B♭6',
        ],
        sections: [
          { name: 'A', at: 1 },
          { name: 'A', at: 9 },
          { name: 'B', at: 17 },
          { name: 'A', at: 25 },
        ],
        note: 'Two chords a bar throughout the A sections. The Edim7 in bar 6 is often E♭m6; the G7 in bar 1 is often Gm7 or B♭7 going to E♭. Nobody plays it the same way twice, and the form survives all of it.',
      },
      {
        kind: 'worked',
        label: 'What the A section is',
        rows: [
          { symbol: 'Bars 1 – 4', means: 'the I–VI–ii–V turnaround, twice', gives: 'B♭6 G7 Cm7 F7' },
          { symbol: 'Bars 5 – 6', means: 'a ii–V into the IV, then the IV and a passing diminished back up', gives: 'Fm7 B♭7 · E♭6 Edim7' },
          { symbol: 'Bars 7 – 8', means: 'a iii–VI–ii–V turnaround to the top, or to the bridge', gives: 'Dm7 G7 Cm7 F7' },
          { symbol: 'The bridge', means: 'four dominants, two bars each, falling in fourths: the V of V of V of V, then home', gives: 'D7 · G7 · C7 · F7' },
        ],
        note: 'The bridge is the cycle of fourths starting three steps from home and walking back. The A section is the turnarounds page. There is nothing in this form that is not on another page of this wiki.',
      },
      {
        kind: 'table',
        head: ['Tunes on these changes', 'Composer', 'Tempo'],
        rows: [
          ['Oleo', 'Sonny Rollins', 'Fast'],
          ['Anthropology', 'Charlie Parker', 'Fast'],
          ['Rhythm-a-ning', 'Thelonious Monk', 'Medium up'],
          ['Cotton Tail', 'Duke Ellington', 'Fast'],
          ['The Theme', 'Miles Davis', 'Whatever is left'],
        ],
      },
      {
        kind: 'callout',
        title: 'Why it is unit 10',
        text: 'Two chords a bar at a fast tempo is the test of whether the turnaround, the rootless voicings and the bebop scale have become reflexes. If they have, the A section plays itself and the bridge is four bars of the cycle. If they have not, this is the tune that finds out.',
      },
    ],
    related: ['turnarounds', 'song-forms', 'cycle-of-fourths', 'secondary-dominants'],
  },
  {
    slug: 'who-to-listen-to',
    title: 'Who to listen to, unit by unit',
    category: 'Repertoire',
    summary: 'The player behind each unit’s material, and the one record to hear it on.',
    inPlainTerms:
      'Every technique in this wiki has a name attached to it somewhere in the history, and hearing that player use it is worth more than any page about it. This is a short list: one player and one record for each unit, chosen because the material is audible rather than because the record is important.',
    blocks: [
      {
        kind: 'table',
        head: ['Unit', 'Listen to', 'On', 'For'],
        rows: [
          ['1', 'Bud Powell', 'The Amazing Bud Powell, Vol. 1', 'Shells in the left hand under a right hand that never stops'],
          ['2', 'Miles Davis', 'Kind of Blue', 'Modes as a way of playing, not a theory'],
          ['3', 'Bill Evans', 'Sunday at the Village Vanguard', 'The rootless voicings, in the hands that made them'],
          ['4', 'Wynton Kelly', 'Kelly Blue', 'Bebop lines that land on chord tones, and comping that swings'],
          ['5', 'Horace Silver', 'Song for My Father', 'Minor ii–V–is as the whole language of a tune'],
          ['6', 'Herbie Hancock', 'Maiden Voyage', 'Altered and lydian dominant sounds used as colour'],
          ['7', 'McCoy Tyner', 'The Real McCoy', 'Upper structures, fourths, and a left hand like a drum'],
          ['8', 'Oscar Peterson', 'Night Train', 'The blues, played by someone who could play anything and chose this'],
          ['9', 'Barry Harris', 'Live in Tokyo', 'Block chords and the 6th-diminished system from the source'],
          ['10', 'Keith Jarrett', 'Standards, Vol. 1', 'All of it, in every key, and the tunes in the repertoire pages'],
        ],
      },
      {
        kind: 'list',
        items: [
          'One record per unit, on repeat, for the ten sessions. Not a playlist. The material has to be heard enough times that you stop noticing it and start expecting it.',
          'Listen with a question. Where is the left hand? What does the comping do under the solo? Where does the solo peak? The recording yourself page asks the same questions of your own take.',
          'The recordings on the tune pages are the same idea for the tune itself: one version to learn the tune from, before you hear the others.',
        ],
      },
      {
        kind: 'callout',
        title: 'The ones not on the list',
        text: 'Thelonious Monk, for what the whole thing is for. Red Garland, for the block chords Miles wanted. Erroll Garner, for a left hand in four that nobody has matched. Chick Corea and Brad Mehldau, for where it went next. They are not attached to a unit because they are attached to all of them.',
      },
    ],
    related: ['transcription', 'learning-a-tune', 'rootless-voicings', 'sixth-diminished'],
  },
]
