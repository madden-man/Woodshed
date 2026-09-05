import { createContext, useContext } from 'react'

export type SyncState = 'loading' | 'synced' | 'saving' | 'offline' | 'error'

/** Completed block ids, by regimen number. */
export type Entries = Record<number, string[]>

export interface ProgressValue {
  entries: Entries
  completedBlocks: (regimen: number) => string[]
  isComplete: (regimen: number) => boolean
  toggle: (regimen: number, blockId: string) => void
  /** The lowest-numbered regimen not yet finished — where to pick up. */
  current: number
  finishedCount: number
  state: SyncState
  error: string | null
}

export const ProgressContext = createContext<ProgressValue | null>(null)

export function useProgress(): ProgressValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>')
  return ctx
}
