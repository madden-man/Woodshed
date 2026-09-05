# ADR 0001: Grow the wiki into a full jazz piano course

- **Status:** Proposed
- **Date:** 2026-09-05
- **Deciders:** Tommy Madden

## Context

The wiki has eleven topics. The curriculum has a hundred sessions. An audit on
2026-09-05 compared the two and found that the sessions assume a great deal the
wiki never explains.

What exists, by category:

| Category | Topics |
| --- | --- |
| Harmony | What the numbers mean · Shell voicings · Rootless voicings · Upper structure triads · The minor ii–V–i |
| Scales | Major scale & modes · The melodic minor family · Bebop scales · Diminished & blues scales |
| Technique | Hand independence |
| Practice | The cycle of fourths · Tempo targets & the two-mistake rule |

Every topic is linked from at least one unit, and a test in
`curriculum.test.ts` holds that to be true in both directions: units link only
to topics that exist, and every topic is linked from some unit. So the wiki is
consistent. It is just small, and skewed: five pages on voicings, one on
technique, none on rhythm, improvisation or repertoire.

The concrete gaps, in the order the curriculum hits them:

| Unit | The session says | The wiki has |
| --- | --- | --- |
| 1 | Arpeggios in every inversion | nothing |
| 2 | Scales in 3rds; shells with the 9 and 13 | one paragraph; nothing on extensions |
| 4 | Walking bass; offbeat comping; ii–V–I straight into the next key | a list item; nothing; nothing |
| 5 | Rootless m7♭5, altered and m6/9 voicings | shells only |
| 5 | The three minors | no scale to play over the ii or the V of a minor key |
| 6 | Lydian dominant; tritone subs; ♭9 and ♭13 on top | a mention; nothing; nothing |
| 7 | Three against two | a list item |
| 8 | Whole tone; the twelve-bar form with the quick IV and turnaround; four against three | nothing; the scale only; a list item |
| 9 | Four-way close, drop 2, 6th-diminished passing chords, a full arrangement, a Bach invention | nothing on any of it |
| 4–10 | Improvise over the tune | nothing on how |
| every tune block | Listen twice, sing the head, enter at the bridge, transpose by ear, record and listen back | the method lives only in the variants |
| every tune block | Nine named standards | no page on any of them, or on song form |

Two constraints shape anything added. `theory.test.ts` requires every topic to
open with a plain-terms paragraph that contains no digit, and requires a
`worked` block wherever a topic leans on numbers. And the README states a rule
that any voicing the wiki teaches must fit one hand; the test behind that rule
is currently scoped to the shell voicings page.

## Decision

### 1. The hundred sessions stay as they are

No new units and no new steps in the arc. The ten-unit ladder and the ten-step
arc are the product's design, and the audit found the *curriculum* is not
short of material; the *wiki* is short of explanation. New topics sit behind
the units that already need them. Where a topic reveals a genuine hole in a
unit's material, the unit's material is edited in place, never extended with
new sessions.

### 2. Three new categories

`Category` in `types.ts` gains `Rhythm`, `Improvisation` and `Repertoire`, in
that order after `Technique`, giving seven sidebar headings:

```
Scales · Harmony · Technique · Rhythm · Improvisation · Practice · Repertoire
```

The sidebar test refuses an empty category, so each new category lands in the
same commit as its first topic.

- **Rhythm** takes what is currently split between the independence drills and
  the hand-independence page: comping patterns, walking bass, polyrhythm,
  swing feel. These are not technique in the finger sense and not harmony.
- **Improvisation** is the largest hole. The curriculum improvises from unit 4
  and says nothing about how.
- **Repertoire** holds song forms and one page per tune the curriculum uses,
  so the tune block has somewhere to link.

### 3. Two new block kinds, and the one-hand rule generalised

Keyboard diagrams cannot show a rhythm or a form, and the new categories need
both.

```ts
| { kind: 'rhythm'; label: string; beats?: number; subdivision?: 2 | 3;
    left?: string; right?: string; note?: string }
| { kind: 'changes'; label: string; bars: string[]; perLine?: number;
    sections?: { name: string; at: number }[]; note?: string }
```

- `rhythm` draws a grid, one row per hand, one cell per subdivision. A hand is
  written as a pattern string, `x` for a strike and `.` for silence, so the
  Charleston is `x...x...` over eighths. Tests: a pattern's length equals
  `beats × subdivision`, and both hands, where given, are the same length.
- `changes` draws a chart, one string per bar, a split bar written as two
  symbols separated by a space, sections labelled by bar number. Tests: bar
  counts are 12, 16 or 32 or a multiple of 4, and every section starts inside
  the chart.

Two-handed voicings are drawn as **two keyboard blocks sharing one `span`**,
one marked `LH` and one `RH`, never as a single diagram. That keeps the
one-hand rule intact. The rule itself moves from the shell-voicings test to a
general one: any keyboard block that names a `hand` must span twelve semitones
or fewer. The existing pages are checked against that before it lands.

### 4. The topics

Sixty-five new topics, bringing the wiki to seventy-six. Each has a unit, because
the coverage test requires one. Phase is explained in section 7.

**Harmony**

| Slug | Title | Unit | Phase |
| --- | --- | --- | --- |
| `major-two-five-one` | The major ii–V–I | 1 | 3 |
| `seventh-chords-and-inversions` | Seventh chords & inversions | 1 | 1 |
| `extensions-and-avoid-notes` | Extensions & avoid notes | 2 | 1 |
| `guide-tone-lines` | Guide-tone lines through a tune | 2 | 2 |
| `turnarounds` | Turnarounds: I–vi–ii–V and its substitutes | 4 | 2 |
| `rootless-minor-voicings` | Rootless minor voicings | 5 | 1 |
| `reading-chord-symbols` | Sus, slash, 6/9 and the other odd symbols | 5 | 3 |
| `tritone-substitution` | Tritone substitution | 6 | 1 |
| `altered-dominant-voicings` | Altered dominant voicings | 6 | 1 |
| `secondary-dominants` | Secondary dominants & the passing diminished | 7 | 2 |
| `block-chords` | Block chords: four-way close & drop 2 | 9 | 1 |
| `sixth-diminished` | The 6th-diminished scale & passing chords | 9 | 1 |
| `quartal-voicings` | Quartal voicings | 9 | 3 |
| `spread-voicings` | Two-handed spread voicings | 9 | 2 |
| `chord-scale-reference` | Which scale over which chord | 10 | 2 |
| `reharmonisation` | Reharmonisation: borrowed chords & modal interchange | 10 | 3 |

**Scales**

| Slug | Title | Unit | Phase |
| --- | --- | --- | --- |
| `scales-in-thirds` | Scales in 3rds and other patterns | 2 | 1 |
| `half-diminished-scale` | The half-diminished scale | 5 | 1 |
| `harmonic-minor-modes` | Harmonic minor & its fifth mode | 5 | 2 |
| `lydian-dominant` | Lydian dominant | 6 | 1 |
| `chromatic-and-enharmonics` | The chromatic scale, and why C♭ is B | 6 | 3 |
| `whole-half-diminished` | Whole-half diminished over dim7 | 7 | 2 |
| `pentatonic-scales` | Major & minor pentatonic | 8 | 2 |
| `whole-tone-scale` | The whole tone scale | 8 | 1 |
| `major-bebop-scale` | The major bebop scale | 9 | 2 |

**Technique**

| Slug | Title | Unit | Phase |
| --- | --- | --- | --- |
| `fingering-principles` | Fingering: thumbs, crossings, borrowed fingerings | 1 | 2 |
| `arpeggios-and-inversions` | Arpeggios in every inversion | 1 | 1 |
| `touch-and-balance` | Touch, tone and balance between the hands | 2 | 3 |
| `left-hand-patterns` | Left-hand patterns: stride, walking, Charleston, bossa | 4 | 2 |
| `bach-inventions` | Bach two-part inventions as jazz technique | 9 | 2 |
| `pedalling` | Pedalling in jazz piano | 9 | 3 |
| `building-speed` | Building speed without building mistakes | 10 | 3 |

**Rhythm** (new category)

| Slug | Title | Unit | Phase |
| --- | --- | --- | --- |
| `swing-feel` | Swing feel & the triplet underneath | 1 | 2 |
| `counting-and-the-click` | Counting, subdivision and the click on 2 and 4 | 1 | 3 |
| `rhythmic-displacement` | Rhythmic displacement | 2 | 2 |
| `comping-rhythms` | Comping rhythms | 4 | 1 |
| `walking-bass` | Walking bass | 4 | 1 |
| `polyrhythms` | Polyrhythms: three against two, four against three | 7 | 1 |

**Improvisation** (new category)

| Slug | Title | Unit | Phase |
| --- | --- | --- | --- |
| `chord-tones-first` | Chord tones first: soloing on 3rds and 7ths | 4 | 1 |
| `approach-notes-and-enclosures` | Approach notes & enclosures | 4 | 2 |
| `constraint-improvising` | Constraint improvising | 6 | 1 |
| `two-five-vocabulary` | Vocabulary over the ii–V | 6 | 2 |
| `playing-outside` | Playing outside | 7 | 3 |
| `motivic-development` | Motivic development | 8 | 2 |
| `blues-language` | Blues language | 8 | 2 |
| `building-a-solo` | Building a solo across choruses | 10 | 3 |

**Practice**

| Slug | Title | Unit | Phase |
| --- | --- | --- | --- |
| `learning-a-tune` | Learning a tune by ear | 1 | 1 |
| `reading-a-lead-sheet` | Reading a lead sheet | 2 | 3 |
| `ear-training` | Ear training | 3 | 2 |
| `recording-yourself` | Recording yourself, and what to listen for | 4 | 2 |
| `transcription` | Transcription, four bars at a time | 7 | 3 |
| `practice-log` | The practice log and the level ladder | 10 | 3 |

**Repertoire** (new category)

| Slug | Title | Unit | Phase |
| --- | --- | --- | --- |
| `song-forms` | Song forms: 12-bar, AABA, ABAC | 1 | 2 |
| `autumn-leaves` | Autumn Leaves | 1, 2 | 2 |
| `blue-bossa` | Blue Bossa | 3 | 2 |
| `take-the-a-train` | Take the A Train | 4 | 2 |
| `beautiful-love` | Beautiful Love | 5 | 2 |
| `solar` | Solar | 6 | 2 |
| `there-will-never-be-another-you` | There Will Never Be Another You | 7 | 2 |
| `blues-forms` | The blues: jazz blues, minor blues, Bird blues | 8 | 1 |
| `someday-my-prince-will-come` | Someday My Prince Will Come | 9 | 2 |
| `arranging-a-tune` | Arranging a tune for solo piano | 9 | 1 |
| `all-the-things-you-are` | All the Things You Are | 10 | 2 |
| `rhythm-changes` | Rhythm changes | 10 | 3 |
| `who-to-listen-to` | Who to listen to, unit by unit | 1, 10 | 3 |

Each tune page carries a `changes` block for the whole form, the key centres
marked, every ii–V named, and the bars the curriculum's tune block refers to
("the bridge", "every minor ii–V–i inside it") made findable.

### 5. Curriculum changes

**Unit `wiki` arrays** grow to include every topic in the tables above. This is
the only change most units need.

**Unit material edits.** Three units name material that the new topics show
to be under-specified:

- Unit 5 scales gain the half-diminished scale on the ii and the fifth mode of
  harmonic minor on the V. Today the unit plays the three minors on the tonic
  and gives the player nothing to run over the first two chords of the
  progression it is teaching.
- Unit 9 voicings name drop 2 and the 6th-diminished scale explicitly. The
  README promises both; the unit currently says "drop the second voice from the
  top" and "6th-diminished passing chords" without naming the technique the
  wiki will teach.
- Unit 4 voicings gain the turnaround: the ii–V–I that runs "straight into the
  next key" is a turnaround by another name and the page will say so.

All three stay inside the *what, not how* rule; none adds a tempo, a hand
instruction or a metronome.

**The tune gets a slug.** `Unit` gains `tuneWiki: string`, the Repertoire page
for that unit's tune, and the tune block links to it above its items. Unit 8,
whose tune is a blues in the day's key, links to `blues-forms`. A new test
requires the slug to resolve to a topic in the Repertoire category.

**Steps link to method.** `Variant` gains `wiki?: string[]`. Introduce, Hands
together, Rearrange and Transpose link to `learning-a-tune`; Apply links to
`constraint-improvising`; Consolidate links to `recording-yourself`. This is
how the tune-learning method, currently the best writing in the curriculum
and visible only one sentence a day, gets a page. The regimen shows a step's
links under the step's name.

**Coverage.** The existing test that every topic is linked from a unit is kept
and widened: a topic counts as covered if it appears in any unit's `wiki`, any
unit's `tuneWiki`, or any variant's `wiki`.

**Unchanged.** `BLOCK_PURPOSE`, the ten variants' instructions, `minutesFor`,
the tempo-targets table, the key rotation, and the per-unit fingering guidance
in `fingerings.ts`. The new `fingering-principles` topic explains the
derivation rule the guidance already follows; it does not duplicate the
numbers.

### 6. Tests

- Every new topic passes the existing gates: unique url-safe slug, digit-free
  plain-terms opener, a worked block wherever numbers appear, resolving
  `related` links.
- The "appear on the topics where the question is which notes" list grows to
  include every new Scales and Harmony topic.
- Every Rhythm topic has at least one `rhythm` block. Every Repertoire tune
  page has exactly one `changes` block covering the full form.
- The one-hand rule applies to every keyboard block with a `hand`.
- `tuneWiki` resolves and is a Repertoire topic; variant `wiki` slugs resolve.
- The curriculum test that no unit material dictates execution is unchanged and
  will catch any of the unit 4, 5 and 9 edits that drift into *how*.

### 7. Sequencing

Three phases, so the curriculum is never linking to a page that does not exist
and the sidebar never shows an empty heading.

- **Phase 1, the curriculum's gaps.** Twenty topics, the ones marked phase 1
  above. These are the pages a session already sends the player to look for.
  This phase also introduces all three categories, since `walking-bass`,
  `chord-tones-first` and `blues-forms` are in it, and lands the `rhythm` block
  because `comping-rhythms` and `polyrhythms` cannot be written without it.
- **Phase 2, the tune pages and the method.** The `changes` block, the eight
  tune pages, `song-forms`, the remaining Improvisation core, and the Practice
  pages behind the variants. This is where `tuneWiki` and variant `wiki` land.
- **Phase 3, the rest.** Reference and depth: chord-scale table, reharm,
  quartal, listening, the practice log.

Each phase is one or more commits; nothing in a later phase is a prerequisite
for an earlier one.

### 8. Alternatives considered

- **Add units 11 and 12 for improvisation and repertoire.** Rejected. It breaks
  the hundred, and the curriculum already improvises from unit 4 and learns a
  tune from unit 1. The material is not missing from the sessions; the
  explanation is missing from the wiki.
- **File rhythm and improvisation under Technique and Harmony.** Rejected.
  Technique would become the junk drawer, and a player looking for "how do I
  solo" will not open Harmony.
- **Link tunes to external lead sheets instead of writing pages.** Rejected. The
  point of a tune page is to mark the bars the curriculum refers to and to
  name the ii–Vs in the language of the other pages, which nothing external
  does.
- **Relax the one-hand rule for spread voicings.** Rejected in favour of two
  diagrams per voicing. The rule has already caught one shipped mistake and
  the two-diagram form is closer to how the hands actually learn the shape.

## Consequences

- The wiki goes from eleven topics to seventy-six. The index filter on the home
  page already exists and becomes the primary way in; the sidebar shows seven
  headings rather than four.
- Every new topic costs the plain-terms opener, the worked block and the
  keyboard diagrams. That is the house style and it is the reason the eleven
  pages are good. Sixty-five pages at that standard is a long piece of writing,
  and the phases exist so the curriculum benefits before it is finished.
- Two new block kinds mean two new renderers in `Blocks.tsx` and new geometry
  for the rhythm grid. Both are small compared to the keyboard.
- `Unit` and `Variant` each gain a field, and `getRegimen()` passes them
  through. Stored progress is unaffected: session numbering and block ids do
  not change.
- The README's "Adding a wiki topic" section gains one rule: a topic must be
  linked from a unit, a tune, or a step, or the coverage test fails.
