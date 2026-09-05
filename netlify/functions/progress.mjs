import { collection, PROGRESS } from '../lib/mongo.mjs'

/**
 * GET  /api/progress?date=YYYY-MM-DD   one day
 * GET  /api/progress?days=30           the last N days, newest first
 * POST /api/progress  { date, key, completed: string[] }
 *
 * One document per practice day, keyed on the date string.
 */
export default async (req) => {
  try {
    const col = await collection(PROGRESS)

    if (req.method === 'GET') {
      const params = new URL(req.url).searchParams
      const date = params.get('date')

      if (date) {
        const doc = await col.findOne({ date }, { projection: { _id: 0 } })
        return Response.json(doc ?? { date, completed: [] })
      }

      const days = Math.min(Number(params.get('days')) || 30, 365)
      const docs = await col
        .find({}, { projection: { _id: 0 } })
        .sort({ date: -1 })
        .limit(days)
        .toArray()
      return Response.json(docs)
    }

    if (req.method === 'POST') {
      const body = await req.json()
      const { date, key, completed } = body ?? {}

      if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return Response.json({ error: 'date must be YYYY-MM-DD' }, { status: 400 })
      }
      if (!Array.isArray(completed) || completed.some((id) => typeof id !== 'string')) {
        return Response.json({ error: 'completed must be an array of block ids' }, { status: 400 })
      }

      const doc = {
        date,
        key: typeof key === 'string' ? key : null,
        completed: [...new Set(completed)],
        updatedAt: new Date(),
      }
      await col.updateOne({ date }, { $set: doc }, { upsert: true })
      return Response.json(doc)
    }

    return Response.json({ error: 'method not allowed' }, { status: 405 })
  } catch (error) {
    console.error('[progress]', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export const config = { path: '/api/progress' }
