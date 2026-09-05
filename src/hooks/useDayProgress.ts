import { useCallback, useEffect, useRef, useState } from 'react'
import { ApiUnavailable, fetchDay, saveDay } from '../api/progress'

export type SyncState = 'loading' | 'synced' | 'saving' | 'offline' | 'error'

type Loaded = { date: string; completed: string[] }
type Write = 'idle' | 'saving' | 'offline' | 'error'

/**
 * Check-offs for one practice day. Toggles apply optimistically and write
 * through to Mongo; when the functions aren't running the page still works,
 * it just says so.
 */
export function useDayProgress(date: string, musicKey: string) {
  const [loaded, setLoaded] = useState<Loaded | null>(null)
  const [write, setWrite] = useState<Write>('idle')
  const [error, setError] = useState<string | null>(null)
  // Latest value, so a rapid second toggle doesn't save a stale array.
  const latest = useRef<string[]>([])

  // Loading is derived, not stored: anything we hold for another date is stale.
  const isStale = loaded?.date !== date
  const completed = isStale ? [] : loaded.completed
  const state: SyncState = isStale ? 'loading' : write === 'idle' ? 'synced' : write

  useEffect(() => {
    let cancelled = false

    fetchDay(date)
      .then((day) => {
        if (cancelled) return
        latest.current = day.completed
        setLoaded({ date, completed: day.completed })
        setWrite('idle')
      })
      .catch((err: unknown) => {
        if (cancelled) return
        // Show an empty day either way — the page stays usable.
        latest.current = []
        setLoaded({ date, completed: [] })
        if (err instanceof ApiUnavailable) {
          setWrite('offline')
        } else {
          setError(err instanceof Error ? err.message : String(err))
          setWrite('error')
        }
      })

    return () => {
      cancelled = true
    }
  }, [date])

  const toggle = useCallback(
    (blockId: string) => {
      const next = latest.current.includes(blockId)
        ? latest.current.filter((id) => id !== blockId)
        : [...latest.current, blockId]

      latest.current = next
      setLoaded({ date, completed: next })
      // Nothing to write through to if the API was never there.
      setWrite((prev) => (prev === 'offline' ? prev : 'saving'))

      saveDay({ date, key: musicKey, completed: next })
        .then(() => {
          setWrite('idle')
          setError(null)
        })
        .catch((err: unknown) => {
          if (err instanceof ApiUnavailable) {
            setWrite('offline')
          } else {
            setError(err instanceof Error ? err.message : String(err))
            setWrite('error')
          }
        })
    },
    [date, musicKey],
  )

  return { completed, toggle, state, error }
}
