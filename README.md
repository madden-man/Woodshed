# The Woodshed

A jazz piano theory wiki and daily practice regimen, built around the cycle of fourths.

## Running it

```bash
npm install
npm start        # netlify dev — Vite + functions + Mongo (http://localhost:8888)
npm run dev      # Vite only, no database (http://localhost:5173)
npm test         # vitest
npm run build    # typecheck + production build
npm run lint
```

`npm run dev` works fine for wiki work; the regimen page just says it isn't
saving. Use `npm start` when you need the database.

## Layout

```
src/
  data/
    types.ts        Topic and Block types — the wiki's content model
    keys.ts         The twelve keys: ii-V-I, minor ii-V-i, upper structures
    theory.ts       The wiki content itself
    curriculum.ts   The hundred sessions: units, the ten-step arc, getRegimen()
    fingerings.ts   Major scale fingerings, and per-unit fingering guidance
  components/
    Layout.tsx        Masthead, session bar, category sidebar, outlet
    Blocks.tsx        Renders the Block union — one case per kind
    SessionBar.tsx    Sticky: current block, next up, clock, controls
    Fingering.tsx     Scale diagram plus the block's fingering notes
    SessionTimer.tsx  The start affordance on a session page
  hooks/
    progress-context.ts   Context + useProgress()
    ProgressProvider.tsx  Loads progress once, writes through on toggle
    timer-context.ts      Context + useTimer()
    TimerProvider.tsx     Session timer; announces each block hand-off
  lib/
    notify.ts             Chime (Web Audio) + system notifications
    session-clock.ts      Pure clock arithmetic — pause/resume/skip/locate
  pages/
    Home.tsx           Wiki index, filter, what's up next
    TopicPage.tsx      A single wiki topic
    KeysPage.tsx       All twelve keys as a reference table
    CurriculumPage.tsx All hundred sessions, grouped by unit
    RegimenPage.tsx    One session, scaled to the time you have
```

## The curriculum

A hundred sessions in a fixed order — no calendar. `/regimen` opens wherever
you left off (the lowest-numbered session not yet at 5/5 blocks);
`/regimen/42` opens a specific one; `/curriculum` shows the whole ladder.

Ten units of ten. Each unit introduces one body of material, and every unit
walks the same ten-step arc — introduce, hands together, rearrange, first tempo
pass, push, apply, transpose, combine, speed, consolidate. The repetition is
the design: it is the learning cycle, and knowing tomorrow's shape is what
makes a hundred sessions followable.

| Unit | Sessions | Level | Material |
| --- | --- | --- | --- |
| 1 Ground floor | 1–10 | 4.0 | Major scales, shells, the major ii–V–I |
| 2 The parent scale | 11–20 | 4.2 | Modes as degrees, first scales in 3rds |
| 3 Rootless | 21–30 | 4.4 | Bill Evans A and B forms |
| 4 The dominant | 31–40 | 4.6 | Mixolydian, dominant bebop, walking bass |
| 5 Minor territory | 41–50 | 4.8 | The three minors, the minor ii–V–i |
| 6 Altered | 51–60 | 5.0 | Altered scale, lydian dominant, tritone subs |
| 7 Upper structures | 61–70 | 5.2 | Four triads over any dominant, half-whole |
| 8 Blues & symmetry | 71–80 | 5.4 | Blues, pentatonic, whole tone, polyrhythm |
| 9 Solo piano | 81–90 | 5.6 | Block chords, drop 2, Bach, arranging |
| 10 Fluency | 91–100 | 5.8 | Everything, all keys, at tempo |

The key advances one step around the cycle of fourths per session, so each key
comes round eight or nine times paired with different material. Every unit
links to the wiki topics it builds on.

To change the content, edit `UNITS` or `VARIANTS` in `src/data/curriculum.ts`
— the hundred are generated from them, so the sequence stays consistent.

**One rule when editing units:** unit material names *what* to play, never
*how*. Hands together or apart, with or without a metronome, at what tempo —
all of that belongs to the variant, which changes day to day. A unit that says
"hands together" will contradict the Introduce step, which says hands apart.
Where a unit has a standard to hit, put it in `target`; it is shown as context,
not as a daily instruction.

Each block also carries a `purpose` from `BLOCK_PURPOSE` — what that block is
for, stable across all hundred sessions, since a block's role in the hour never
changes even as the material inside it does.

## Adding a wiki topic

Append a `Topic` to `TOPICS` in `src/data/theory.ts`. The index, sidebar and
routing all read from that array, so nothing else needs touching.

Content is composed of `Block`s — `prose`, `list`, `progression`, `table`,
`callout` and `worked`. To add a new kind, extend the union in `data/types.ts`
and add a case to `components/Blocks.tsx`; TypeScript will point at the switch
if you forget.

**House style: never leave a number unexplained.** Chord shorthand like `1-7-3`
is unreadable until someone spells it out, so:

- Every topic opens with `inPlainTerms` — the same idea with the jargon taken
  out. If it can't be written without a number, the topic isn't understood well
  enough to write the rest.
- Any topic leaning on numbers carries a `worked` block: the shorthand, what it
  means in words, and the notes it actually produces, in a real key. `1-7-3` on
  a Dm7 becomes "D, then the ♭7 above it, then the ♭3 above that → D – C – F".

Both are enforced by tests, including a minimum length on a worked row's
explanation — it caught three rows where I'd written "the tritone" and moved on.

## Tests

`npm test` (vitest, `src/**/*.test.ts`). Four files, no DOM and no mocks —
everything worth testing here is pure.

| File | Guards |
| --- | --- |
| `lib/session-clock.test.ts` | Pause continues rather than restarts; repeated cycles neither lose nor double time; seek lands on the first instant of any block in either direction, and skip is provably just seek-to-next |
| `data/keys.test.ts` | The harmony itself — ii/V/I roots, minor ii–V–i roots, chord qualities, and that all 48 upper-structure triads really are ♭II/VI/♭VI/II above their dominant |
| `data/curriculum.test.ts` | All 100 generate; the arc repeats per unit; keys follow the cycle; minutes split exactly at every session length; **unit material never dictates execution** |
| `data/theory.test.ts` | Slugs unique and url-safe, related links resolve, table rows match their headers, no empty content, every topic has a jargon-free opener, and worked rows actually explain themselves |
| `data/fingerings.test.ts` | Every scale spells a real major scale with one letter per degree; no thumb on a black key mid-scale; no finger jumps except across a crossing |

The execution-directive test is the interesting one. Unit material says *what*
to play and the variant says *how*; a unit that bakes in "hands together"
contradicts the Introduce step, which says hands apart. That shipped once and
the test exists so it can't again.

## Fingerings

Two different kinds of thing live in `data/fingerings.ts`, and the distinction
is deliberate:

- **`MAJOR_SCALES`** is the standard fingering from the method books — settled,
  the same in every edition, and shown as a diagram under the warm-up and
  scales blocks with the thumbs marked and black keys inverted.
- **Everything else is convention.** Arpeggio and voicing fingerings vary with
  hand size and with what follows in the phrase, so they read as a starting
  point and say so. Where a scale type genuinely has no standard fingering —
  blues, pentatonic — the guidance says that rather than inventing one.

Most of the per-unit guidance is a derivation rather than a new set of numbers,
because that is what is actually true: a mode uses its parent major scale's
fingering, the altered scale is fingered as the melodic minor it comes from,
and harmonic and melodic minor keep the fingering of the natural minor they sit
next to. Telling you to re-finger from each new tonic would break the very
connection the unit is teaching.

The tests check the data against real principles rather than against itself:
each scale must spell a major scale by interval, use one letter name per
degree, keep the thumb off black keys mid-scale, and never jump fingers except
across a crossing.

G♭ major's left hand ends 4-3-2-1, which puts the thumb on the G♭ at the
octave — the one place the published fingerings appear to break the
thumb-off-black-keys rule. That is the standard and it stays: the hand leaves
the scale at the octave, so the principle has nothing left to protect there.
The test exempts the octave note for that reason and no other.

## Database

Netlify Functions on the `tommy-data` MongoDB, same pattern as TommysThoughts.

| Var | Value |
| --- | --- |
| `MONGODB_URI` | the Atlas connection string |
| `MONGODB_DB` | `tommy-data` (optional — the code defaults to it) |
| `MONGODB_COLLECTION` | `piano-progress` (optional — the code defaults to it) |

Set them on the Netlify site (`netlify env:set`) rather than in a local `.env`;
`netlify dev` injects them. Nothing reads a committed secret.

```
netlify/
  lib/mongo.mjs           shared client, one per cold start
  functions/progress.mjs  GET/POST /api/progress
scripts/
  db-check.mjs            npm run db:check — verifies the connection
```

`piano-progress` holds one document per session, keyed on `regimen`:

```json
{ "regimen": 12, "completed": ["warmup", "scales"], "updatedAt": "..." }
```

Reads filter on `regimen` existing, so documents from the earlier date-keyed
schema are ignored rather than breaking anything.

The client side is `src/api/progress.ts` (typed fetch, raises `ApiUnavailable`
when the functions aren't running) and `src/hooks/ProgressProvider.tsx`, which
loads every session's progress once and applies toggles optimistically.

## The session timer

Each block gets the minutes the length picker gives it (30/45/60/90 split
across the five weights). At every hand-off the timer chimes and raises a
system notification naming the next block.

You do not have to start at the beginning. Every block on a session page has a
**Start here** button, and once a session is running the progress bar becomes a
row of segments — one per block, sized by its minutes — that you can click to
jump to any of them, forwards or back. Arriving somewhere you chose is not
announced; only a boundary the clock crosses on its own is.

It lives in a provider above the router, so it keeps running when you click
into a wiki topic mid-session. A bar sticks under the masthead for the whole
session, on every page, carrying the controls with it — pausing never means
navigating back to the session. It shows which block you're on and of how many,
what comes next, elapsed against the block's allotted minutes, time left in the
session, and the block's full instructions: what it is for, what to play, and
what the unit is aiming at. The detail panel remounts open at each hand-off, so
new work is never hidden behind a collapsed toggle. The length picker locks
while a session is being timed.

`lib/notify.ts` handles both channels. Browsers won't start an AudioContext or
grant notification permission from a background tick, so `prime()` is called
from the click that starts the timer. If notifications are denied the chime
still fires and the page says so.

Elapsed time is one scalar derived from timestamps rather than an accumulating
counter, so backgrounding the tab doesn't cause drift. Pausing banks the
elapsed total and closes the segment; resuming opens a new one, so a pause of
any length continues rather than restarting. That arithmetic lives in
`lib/session-clock.ts` as pure functions, deliberately separate from the
provider so it can be reasoned about without React in the way.

## Next

- Tempo log per key, so unit 10's targets are measurable.
- Metronome with the click on 2 and 4.
- Notes per session — what actually happened, not just whether it happened.
