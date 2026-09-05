import { createContext, useContext } from 'react'
import type { Permission } from '../lib/notify'
import type { ClockBlock } from '../lib/session-clock'

export type TimerStatus = 'idle' | 'running' | 'paused' | 'done'

export type TimerBlock = ClockBlock

export interface TimerValue {
  status: TimerStatus
  /** Which regimen is being timed, so a page can tell whose timer this is. */
  regimen: number | null
  blocks: TimerBlock[]
  /** Index into `blocks`; equals blocks.length once the session is over. */
  blockIndex: number
  /** The block being timed, or null when idle/finished. */
  block: TimerBlock | null
  /** What comes after the current block, or null on the last one. */
  nextBlock: TimerBlock | null
  /** Remaining in the current block. */
  remainingMs: number
  /** Elapsed within the current block. */
  intoBlockMs: number
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
