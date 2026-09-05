import { MongoClient } from 'mongodb'

/**
 * One client per cold start, shared by every invocation of the container.
 * Same pattern as the TommysThoughts functions, but promoted to a module so
 * each function doesn't re-declare it.
 */
let clientPromise

function getClient() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set')
  if (!clientPromise) clientPromise = new MongoClient(uri).connect()
  return clientPromise
}

/** The Woodshed collections live alongside everything else in tommy-data. */
export async function collection(name) {
  const client = await getClient()
  return client.db(process.env.MONGODB_DB || 'tommy-data').collection(name)
}

export const PROGRESS = 'woodshed_progress'
