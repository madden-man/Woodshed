# The Woodshed

A jazz piano theory wiki and daily practice regimen, built around the cycle of fourths.

## Running it

```bash
npm install
npm start        # netlify dev — Vite + functions + Mongo (http://localhost:8888)
npm run dev      # Vite only, no database (http://localhost:5173)
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
  components/
    Layout.tsx        Masthead, session bar, category sidebar, outlet
    Blocks.tsx        Renders the Block union — one case per kind
    SessionBar.tsx    Sticky: current block, next up, clock, controls
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

## Adding a wiki topic

Append a `Topic` to `TOPICS` in `src/data/theory.ts`. The index, sidebar and
routing all read from that array, so nothing else needs touching.

Content is composed of `Block`s — `prose`, `list`, `progression`, `table` and
`callout`. To add a new kind, extend the union in `data/types.ts` and add a case
to `components/Blocks.tsx`; TypeScript will point at the switch if you forget.

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

It lives in a provider above the router, so it keeps running when you click
into a wiki topic mid-session. A bar sticks under the masthead for the whole
session, on every page, carrying the controls with it — pausing never means
navigating back to the session. It shows which block you're on and of how many,
its title, what comes next, elapsed against the block's allotted minutes, and
time left in the session; it re-announces itself at each hand-off. The length
picker locks while a session is being timed.

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
