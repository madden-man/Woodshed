export interface DayProgress {
  date: string
  key: string | null
  completed: string[]
}

/** The API is only there under `netlify dev` / deploy — plain `vite` has no functions. */
export class ApiUnavailable extends Error {
  constructor() {
    super('Practice API unavailable')
    this.name = 'ApiUnavailable'
  }
}

async function request(path: string, init?: RequestInit): Promise<unknown> {
  let res: Response
  try {
    res = await fetch(path, init)
  } catch {
    throw new ApiUnavailable()
  }
  // Vite's SPA fallback answers unknown paths with index.html, so a 404 or an
  // HTML body both mean "no function behind this route".
  if (res.status === 404 || !res.headers.get('content-type')?.includes('application/json')) {
    throw new ApiUnavailable()
  }
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(body?.error ?? `Request failed (${res.status})`)
  }
  return res.json()
}

export function fetchDay(date: string): Promise<DayProgress> {
  return request(`/api/progress?date=${encodeURIComponent(date)}`) as Promise<DayProgress>
}

export function fetchHistory(days = 30): Promise<DayProgress[]> {
  return request(`/api/progress?days=${days}`) as Promise<DayProgress[]>
}

export function saveDay(progress: DayProgress): Promise<DayProgress> {
  return request('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(progress),
  }) as Promise<DayProgress>
}
