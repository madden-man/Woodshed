import { createContext, useContext } from 'react'
import type { Permission } from '../lib/notify'

export type TimerStatus = 'idle' | 'running' | 'paused' | 'done'

export interface TimerBlock {
  id: string
  title: string
  ms: number
}

export interface TimerValue {
  status: TimerStatus
  /** Which regimen is being timed, so other pages can tell whose timer this is. */
  regimen: number | null
  blocks: TimerBlock[]
  /** Index into `blocks`; equals blocks.length once the session is over. */
  blockIndex: number
  /** Remaining in the current block. */
  remainingMs: number
  /** Remaining across the whole session. */
  totalRemainingMs: number
  totalMs: number
  permission: Permission
  start: (regimen: number, blocks: TimerBlock[]) => void
  pause: () => void
  resume: () => void
  /** Jump to the start of the next block. */
  skip: () => void
  stop: () => void
}

export const TimerContext = createContext<TimerValue | null>(null)

export function useTimer(): TimerValue {
  const ctx = useContext(TimerContext)
  if (!ctx) throw new Error('useTimer must be used inside <TimerProvider>')
  return ctx
}
