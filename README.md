# The Woodshed

A jazz piano theory wiki and daily practice regimen, built around the cycle of fourths.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
npm run lint
```

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

## Next

- Persist regimen check-offs (block ids in `data/regimen.ts` are stable enough to key a store off) and keep a practice history.
- Tempo log per key, feeding Saturday's "weak keys" focus.
- Metronome with the click on 2 and 4.
