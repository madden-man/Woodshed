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
    types.ts      Topic and Block types — the wiki's content model
    keys.ts       The twelve keys: ii-V-I, minor ii-V-i, upper structures
    theory.ts     The wiki content itself
    regimen.ts    Daily session builder, weekday focus, drill rotation
  components/
    Layout.tsx    Masthead, category sidebar, outlet
    Blocks.tsx    Renders the Block union — one case per kind
  pages/
    Home.tsx      Index with filter, key of the day
    TopicPage.tsx A single wiki topic
    KeysPage.tsx  All twelve keys as a reference table
    RegimenPage.tsx  Today's five blocks, scaled to session length
```

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

`piano-progress` holds one document per practice day, keyed on `date`:

```json
{ "date": "2026-09-05", "key": "C", "completed": ["warmup", "scales"], "updatedAt": "..." }
```

The client side is `src/api/progress.ts` (typed fetch, raises `ApiUnavailable`
when the functions aren't running) and `src/hooks/useDayProgress.ts`, which
applies toggles optimistically and writes through.

## Next

- Tempo log per key, feeding Saturday's "weak keys" focus.
- Practice history / streak view off `GET /api/progress?days=30`, which already returns it.
- Metronome with the click on 2 and 4.
