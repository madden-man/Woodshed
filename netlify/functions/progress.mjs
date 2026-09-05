import { collection, PROGRESS } from '../lib/mongo.mjs'

const TOTAL_REGIMENS = 100

/**
 * GET  /api/progress                 every regimen with progress on it
 * POST /api/progress  { regimen, completed: string[] }
 *
 * One document per regimen in the curriculum, keyed on its number. There is no
 * date here on purpose — the sequence is a ladder you climb, not a calendar.
 */
export default async (req) => {
  try {
    const col = await collection(PROGRESS)

    if (req.method === 'GET') {
      const docs = await col
        .find({ regimen: { $exists: true } }, { projection: { _id: 0 } })
        .sort({ regimen: 1 })
        .limit(TOTAL_REGIMENS)
        .toArray()
      return Response.json(docs)
    }

    if (req.method === 'POST') {
      const { regimen, completed } = (await req.json()) ?? {}

      if (!Number.isInteger(regimen) || regimen < 1 || regimen > TOTAL_REGIMENS) {
        return Response.json({ error: `regimen must be an integer 1-${TOTAL_REGIMENS}` }, { status: 400 })
      }
      if (!Array.isArray(completed) || completed.some((id) => typeof id !== 'string')) {
        return Response.json({ error: 'completed must be an array of block ids' }, { status: 400 })
      }

      const doc = {
        regimen,
        completed: [...new Set(completed)],
        updatedAt: new Date(),
      }
      await col.updateOne({ regimen }, { $set: doc }, { upsert: true })
      return Response.json(doc)
    }

    return Response.json({ error: 'method not allowed' }, { status: 405 })
  } catch (error) {
    console.error('[progress]', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export const config = { path: '/api/progress' }
