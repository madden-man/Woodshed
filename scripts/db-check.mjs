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

  if (count > 0) {
    const recent = await col.find({}).sort({ date: -1 }).limit(5).toArray()
    console.log('\nFields present:', [...new Set(recent.flatMap(Object.keys))].join(', '))
    console.log('\nMost recent:')
    for (const doc of recent) {
      const done = Array.isArray(doc.completed) ? doc.completed.length : '?'
      console.log(`  ${doc.date ?? '(no date)'}  key ${doc.key ?? '—'}  ${done} blocks`)
    }
  } else {
    console.log('\nEmpty — tick a block on /regimen and run this again.')
  }
  process.exit(0)
} catch (error) {
  console.error(`Could not reach ${db}.${PROGRESS}:`, error.message)
  process.exit(1)
}
