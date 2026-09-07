# ADR 0002: Make the sessions interactive

- **Status:** Proposed
- **Date:** 2026-09-07
- **Deciders:** Tommy Madden

## Context

A session page currently describes three things it could instead help you do:

1. **Listen.** The Introduce step says "two listens before you touch the keys"
   and the tune block links to the tune's wiki page, but finding a recording
   and a lead sheet is left to the player. That is the highest-friction moment
   of the whole session: it happens away from the app, on the first day of
   every unit, before any playing has built momentum.
2. **Keep time.** The method names tempos everywhere: unit targets (♩=100,
   ♩=88, ♩=120), drill introductions (♩=60, ♩=80), and the whole arc from
   First tempo pass onward assumes a metronome clicking on 2 and 4. The player
   has to bring their own. "Metronome with the click on 2 and 4" is already
   on the README's Next list.
3. **Hear the material.** Every voicing is drawn but none can be sounded. A
   shell voicing's whole argument is a sound: the guide tone holding and then
   dropping a half step. The page shows it and stays silent.

Two facts about the codebase shape what is cheap and what is expensive:

- **The content is data, not prose.** Keyboard blocks carry exact pitches
  (`ascend()` in `lib/keyboard.ts` already resolves them to absolute keys).
  Rhythm blocks carry machine-readable pattern strings (`x..x....`). Nothing
  needs to be re-authored to become audible; it needs a way to be played.
- **There is already an audio path.** `lib/notify.ts` owns an AudioContext,
  primed from the gesture that starts a session, and synthesizes the hand-off
  chime with plain oscillators. A metronome and a note player extend that
  file's pattern rather than introducing a new subsystem.

ADR 0001 rejected linking to external lead sheets *instead of* writing tune
pages. That rejection stands and is not what this proposes: the tune pages
mark the bars the curriculum talks about, and nothing external does that. The
lead sheet link is for the melody, which the `changes` block deliberately does
not carry.

## Decision

### 1. Listening and lead sheet links on the tune block

Every tune page gains two structured references, and the regimen's tune block
(the last block of every session, the one the listening instructions live on)
surfaces them next to its existing reading links.

`Topic` gains two optional fields, used only by Repertoire tune pages:

```ts
/** Recordings worth the two listens the Introduce step asks for. */
listening?: { artist: string; album: string; url?: string }[]
/** Where the melody is written down. A citation, with a URL when a legal one exists. */
leadSheet?: { source: string; url?: string }
```

Rules, enforced by tests (section 4):

- Every topic named by some unit's `tuneWiki` must carry both fields. The
  generic pages (`blues-forms`, `song-forms`) are exempt unless a unit points
  its tune block at them, in which case they need them too (unit 8 does, so
  `blues-forms` gets a listening list of great blues choruses).
- `leadSheet.source` is a **citation first**: "The Real Book Vol. 1, 6th ed."
  A book citation cannot rot and most players own the book. The URL, when
  present, points at a legal source (the published Real Book on Sheet Music
  Direct, musicnotes, and so on). We never host or link to a scanned PDF.
- A listening entry always names artist and album, so the line is useful even
  if the URL dies. Two or three entries per tune, drawn from the same taste as
  `who-to-listen-to`, ideally cross-linking it.

Rendering: a "Listen, then read" row on the tune block of the regimen page and
in the session bar's detail panel, above the wiki links, because the method
says listening comes first. On the tune's own wiki page the same data renders
under the changes chart.

These are the app's first outbound links. They open in a new tab: a session in
progress has a timer running, and navigation away is exactly what the sticky
bar exists to survive, but there is no reason to test that with a full page
unload.

### 2. A metronome, on the blocks the method already gives one to

A metronome joins the session UI, and its visibility encodes a rule that today
lives only in prose: "a metronome only joins at step 4 of the unit". Making
the tool appear exactly when the method allows it is the point; a metronome
available on the Introduce step would be an invitation to break the method.

**Engine.** `lib/metronome.ts`, split the way `session-clock.ts` is split:

- Pure scheduling, tested without audio: given a bpm, beats per bar, and a
  click mode, produce the tick times and accents in any window. Modes are
  `'all'` (every beat, 2 and 4 accented) and `'backbeat'` (2 and 4 only,
  the jazz default and the one the method names).
- A thin audio shell using the lookahead-scheduler pattern (a coarse
  `setInterval` that schedules precise ticks ahead on the AudioContext's
  clock). It shares `notify.ts`'s context and priming; `setInterval` alone
  drifts and stutters in background tabs, the audio clock does not.

**Data.** `Variant` gains one field:

```ts
/** Whether this step of the arc practises with a click. */
metronome: boolean
```

Introduce, Hands together and Rearrange are `false`; First tempo pass through
Consolidate are `true`. Whether the *unit* has a bpm in its target changes
nothing about visibility: the variant decides, exactly as the execution-
directive rule requires. Unit targets that name a number (`Unit` gains an
optional `targetBpm?: number` mirroring the prose) are shown beside the
metronome as the standard being aimed at, never as today's setting.

**Behaviour.** The metronome renders on the scales, voicings and independence
blocks (and in the session bar detail) when the step's `metronome` is true.
It starts at the last bpm used for that block of that regimen (localStorage,
same wrap-everything approach as `timer-storage.ts`), falling back to the
unit's `targetBpm` minus a comfortable margin, falling back to 80. It is
independent of the session timer: pausing the session does not silence the
click, because "stop the clock, keep playing" is a real thing that happens.
The Push step's "yesterday plus 4" stays manual until the tempo log (already
on the Next list) exists to feed it; the metronome's job today is to click,
not to know your history.

### 3. Audio demonstrations, synthesized from data the wiki already has

The difficulty question resolves cleanly once it is split:

- **Recorded audio is expensive and stays out.** Recording, editing, hosting
  and maintaining demo takes for seventy-seven topics is a content project
  bigger than the wiki itself, and excerpts of the tunes are copyrighted.
  What a real performance teaches, the listening links now provide.
- **Synthesized audio is nearly free, because the data already exists.**
  `ascend()` turns every keyboard block into absolute pitches today, to draw
  them. The same pitches can be sounded. No page needs re-authoring; every
  existing diagram becomes playable at once, and every future one is playable
  by construction.

Concretely:

- **Keyboard blocks get a play button.** `lib/notify.ts` (or a sibling
  `lib/sound.ts` if it outgrows the file) gains `playNotes(pitches)`: each
  note briefly in sequence, then the shape together as a block, which is how
  a teacher demonstrates a voicing. Tone is oscillator-built like the chime
  (a couple of partials and a decay envelope). It will sound like an electric
  piano, not a Steinway; that is enough to hear a ♭9 against a 3. A sampled
  piano can replace the innards later behind the same function if the tone
  grates.
- **Progressions play as progressions.** Where consecutive keyboard blocks
  share a `span` (the voice-leading arrangement the README describes), the
  figure group gets one play button that sounds the chords in order. Hearing
  the guide tone hold and then drop a half step is the entire lesson of the
  shells page, and this is the feature that teaches it.
- **Rhythm blocks play their grid.** Two tones, low for LH and high for RH,
  looping one bar at an adjustable bpm on the metronome engine. The playback
  reads the same pattern string the grid draws, so the sound and the picture
  cannot disagree.
- **`progression` blocks (chord symbols only) stay silent.** They carry no
  voicing, and guessing one would put the app in the business of choosing
  notes the page did not teach. The keyboard diagrams beside them are the
  playable objects.

### 4. Tests

- Metronome scheduling is pure and tested like the session clock: correct
  tick count for a bar at a given bpm, backbeat mode ticks only on 2 and 4,
  accents land where the mode says, a window query never emits a tick twice.
- Every `tuneWiki` target carries `listening` and `leadSheet`; every URL is
  https; every listening entry names artist and album; `leadSheet.source` is
  non-empty even when a URL exists.
- Pitch-to-frequency spot checks (A4 = 440, C4 ≈ 261.63) against the pitch
  numbers `ascend()` produces.
- Rhythm playback and the rhythm grid are held to a single source: the test
  feeds a pattern to both and requires the strike positions to match.
- The execution-directive test is untouched and keeps guarding the new
  fields: `metronome` lives on the variant and `targetBpm` is display-only,
  so no unit can start dictating *how* through the back door.

### 5. Sequencing

Three phases, independent, in value order:

- **Phase 1, the metronome.** Already promised on the Next list, needs no new
  content, and serves sessions 4 through 100 of every pass through the arc.
  Lands the engine, the variant flag, and the UI in the block body and
  session bar.
- **Phase 2, the links.** The two `Topic` fields, the data for the nine tunes
  plus `blues-forms`, the tests, and the "Listen, then read" row. Mostly an
  afternoon of discography.
- **Phase 3, playable diagrams.** `playNotes`, the keyboard play button, the
  shared-span progression player, rhythm grid playback. The largest phase and
  the least urgent, because the diagrams already work as pictures.

## Alternatives considered

- **Embed players (YouTube, Spotify) instead of linking out.** Rejected.
  Heavy iframes and third-party tracking in an app that currently loads no
  external anything, and an in-page player invites playing along, which the
  Introduce step explicitly forbids ("no playing along"). A link out to
  listen properly *is* the method.
- **Host lead sheet PDFs.** Rejected. Copyright, full stop. Citation plus
  legal URL covers the need.
- **Record demonstration audio.** Deferred, not refused. If a voicing's
  synthesized tone ever proves misleading, a recorded take can replace it
  case by case; nothing in the design blocks that. But it is not the cheap
  path and must not gate the rest.
- **Parse bpm requirements out of the prose with a regex.** Rejected. The
  house rule is fields over parsing; prose is for people. `targetBpm` mirrors
  the number the target already states.
- **A metronome always available on every block.** Rejected. The method says
  no click before step 4, and the wiki's tempo-targets page explains why.
  A tool the method forbids should not be on screen.
- **Pull in a soundfont/metronome library.** Rejected for now. The engine is
  a page of code on an AudioContext the app already owns, and the chime shows
  the pattern works. A sampled instrument may justify a dependency later,
  behind `playNotes()`.

## Consequences

- The app gains its first outbound links. They are data, tested for shape,
  and citation-first so link rot degrades them to a book reference rather
  than a dead end.
- Audio grows from one chime to a metronome and a note player, all on the
  single shared AudioContext, all primed by the same user-gesture rule that
  `prime()` already implements. Nothing plays sound before a click.
- Bundle size is unchanged: no samples ship. If a sampled piano lands later
  it should load lazily behind the first play press.
- Because interactivity is generated from the content model rather than
  authored per page, every future topic gets playable diagrams and every
  future tune page is forced by test to arrive with its listening list.
- The README's Next list loses the metronome item and gains the tempo log's
  first consumer: the Push step is the feature that wants it.
