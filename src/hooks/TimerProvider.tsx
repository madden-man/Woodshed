import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { chime, notify, prime, type Permission } from '../lib/notify'
import {
  elapsedAt,
  locate,
  pauseAt,
  resumeAt,
  skipAt,
  totalOf,
  type ClockState,
} from '../lib/session-clock'
import { TimerContext, type TimerBlock, type TimerValue } from './timer-context'

interface Plan {
  regimen: number
  blocks: TimerBlock[]
}

const NO_BLOCKS: TimerBlock[] = []
const STOPPED: ClockState = { banked: 0, runningSince: null }

export function TimerProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Plan | null>(null)
  const [clock, setClock] = useState<ClockState>(STOPPED)
  // The clock reading is state, not a Date.now() call during render.
  const [now, setNow] = useState(() => Date.now())
  const [permission, setPermission] = useState<Permission>('default')
  // Highest block index already announced, so each boundary fires once.
  const announced = useRef(0)

  const blocks = plan?.blocks ?? NO_BLOCKS
  const totalMs = totalOf(blocks)
  const elapsed = elapsedAt(clock, now)
  const { index: blockIndex, remainingMs, intoBlockMs } = locate(blocks, elapsed)

  // One interval while running: advance the reading and announce boundaries.
  useEffect(() => {
    if (clock.runningSince === null || plan === null) return

    const id = setInterval(() => {
      const t = Date.now()
      const ahead = elapsedAt(clock, t)
      const total = totalOf(plan.blocks)
      const { index } = locate(plan.blocks, ahead)

      if (index > announced.current) {
        announced.current = index
        if (index >= plan.blocks.length) {
          chime('done')
          notify('Session complete', `Regimen ${plan.regimen} — all five blocks done.`)
        } else {
          const block = plan.blocks[index]
          const minutes = Math.round(block.ms / 60_000)
          const left = plan.blocks.length - index - 1
          notify(
            `Block ${index + 1} of ${plan.blocks.length}: ${block.title}`,
            `${minutes} min · regimen ${plan.regimen}` + (left > 0 ? ` · ${left} more after this` : ' · last block'),
          )
          chime('block')
        }
      }

      if (ahead >= total) setClock({ banked: total, runningSince: null })
      else setNow(t)
    }, 250)

    return () => clearInterval(id)
  }, [clock, plan])

  const start = useCallback((regimen: number, next: TimerBlock[]) => {
    void prime().then(setPermission)
    const t = Date.now()
    announced.current = 0
    setPlan({ regimen, blocks: next })
    setClock({ banked: 0, runningSince: t })
    setNow(t)
  }, [])

  const pause = useCallback(() => {
    const t = Date.now()
    setNow(t)
    setClock((c) => pauseAt(c, t))
  }, [])

  const resume = useCallback(() => {
    const t = Date.now()
    setNow(t)
    setClock((c) => resumeAt(c, t))
  }, [])

  const skip = useCallback(() => {
    if (!plan) return
    const t = Date.now()
    const { index } = locate(plan.blocks, elapsedAt(clock, t))
    // The user asked for this transition, so don't announce it back at them.
    announced.current = Math.min(index + 1, plan.blocks.length)
    setNow(t)
    setClock((c) => skipAt(plan.blocks, c, t))
  }, [plan, clock])

  const stop = useCallback(() => {
    announced.current = 0
    setPlan(null)
    setClock(STOPPED)
  }, [])

  let status: TimerValue['status'] = 'idle'
  if (plan) {
    if (blockIndex >= blocks.length) status = 'done'
    else status = clock.runningSince === null ? 'paused' : 'running'
  }

  const value: TimerValue = {
    status,
    regimen: plan?.regimen ?? null,
    blocks,
    blockIndex,
    block: blocks[blockIndex] ?? null,
    nextBlock: blocks[blockIndex + 1] ?? null,
    remainingMs,
    intoBlockMs,
    totalRemainingMs: Math.max(0, totalMs - elapsed),
    totalMs,
    permission,
    start,
    pause,
    resume,
    skip,
    stop,
  }

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}
