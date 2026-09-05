/**
 * Confirms the app can reach piano-progress, and reports what's in there.
 * Reads the same env vars the functions do — run it through Netlify so the
 * credentials come from the linked site rather than a file on disk:
 *
 *   netlify dev:exec node scripts/db-check.mjs      (or: npm run db:check)
 */
import { collection, PROGRESS } from '../netlify/lib/mongo.mjs'

const db = process.env.MONGODB_DB || 'tommy-data'

try {
  const col = await collection(PROGRESS)
  const count = await col.countDocuments()

  console.log(`Connected to ${db}.${PROGRESS}`)
  console.log(`${count} document${count === 1 ? '' : 's'}`)

  const withRegimen = await col.countDocuments({ regimen: { $exists: true } })
  console.log(`${withRegimen} of them are curriculum sessions`)

  if (withRegimen > 0) {
    const rows = await col
      .find({ regimen: { $exists: true } })
      .sort({ regimen: 1 })
      .toArray()

    const finished = rows.filter((r) => (r.completed ?? []).length >= 5).length
    console.log(`${finished} session${finished === 1 ? '' : 's'} finished (5/5 blocks)`)
    console.log('\nFields present:', [...new Set(rows.flatMap(Object.keys))].join(', '))
    console.log('\nMost recently touched:')
    for (const doc of rows.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0)).slice(0, 5)) {
      console.log(`  session ${String(doc.regimen).padStart(3)}  ${(doc.completed ?? []).length}/5 blocks`)
    }
  } else {
    console.log('\nNo session progress yet — tick a block on /regimen and run this again.')
  }

  if (count > withRegimen) {
    console.log(`\nNote: ${count - withRegimen} document(s) here have no 'regimen' field.`)
    console.log("The app ignores those; they're from the earlier date-keyed schema.")
  }
  process.exit(0)
} catch (error) {
  console.error(`Could not reach ${db}.${PROGRESS}:`, error.message)
  process.exit(1)
}
