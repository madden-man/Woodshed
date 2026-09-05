import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ApiUnavailable, fetchProgress, saveProgress } from '../api/progress'
import { getRegimen, TOTAL_REGIMENS } from '../data/curriculum'
import { ProgressContext, type Entries, type ProgressValue } from './progress-context'

type Write = 'idle' | 'saving' | 'offline' | 'error'

const EMPTY: string[] = []

export function ProgressProvider({ children }: { children: ReactNode }) {
  // null means "not loaded yet" — loading is derived from it, never stored.
  const [entries, setEntries] = useState<Entries | null>(null)
  const [write, setWrite] = useState<Write>('idle')
  const [error, setError] = useState<string | null>(null)
  const latest = useRef<Entries>({})

  useEffect(() => {
    let cancelled = false

    fetchProgress()
      .then((rows) => {
        if (cancelled) return
        const next: Entries = {}
        for (const row of rows) next[row.regimen] = row.completed
        latest.current = next
        setEntries(next)
        setWrite('idle')
      })
      .catch((err: unknown) => {
        if (cancelled) return
        // Show an empty ladder either way — the app stays usable offline.
        latest.current = {}
        setEntries({})
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
  }, [])

  const toggle = useCallback((regimen: number, blockId: string) => {
    const done = latest.current[regimen] ?? EMPTY
    const completed = done.includes(blockId) ? done.filter((id) => id !== blockId) : [...done, blockId]

    latest.current = { ...latest.current, [regimen]: completed }
    setEntries(latest.current)
    setWrite((prev) => (prev === 'offline' ? prev : 'saving'))

    saveProgress({ regimen, completed })
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
  }, [])

  const loaded = entries ?? {}
  const completedBlocks = (regimen: number) => loaded[regimen] ?? EMPTY
  const isComplete = (regimen: number) => completedBlocks(regimen).length >= getRegimen(regimen).blocks.length

  let current = TOTAL_REGIMENS
  for (let n = 1; n <= TOTAL_REGIMENS; n++) {
    if (!isComplete(n)) {
      current = n
      break
    }
  }

  let finishedCount = 0
  for (let n = 1; n <= TOTAL_REGIMENS; n++) if (isComplete(n)) finishedCount++

  const value: ProgressValue = {
    entries: loaded,
    completedBlocks,
    isComplete,
    toggle,
    current,
    finishedCount,
    state: entries === null ? 'loading' : write === 'idle' ? 'synced' : write,
    error,
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
