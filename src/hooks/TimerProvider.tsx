import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { chime, notify, prime, type Permission } from '../lib/notify'
import {
  clampIndex,
  elapsedAt,
  locate,
  offsetOf,
  pauseAt,
  resumeAt,
  seekAt,
  skipAt,
  totalOf,
  type ClockState,
} from '../lib/session-clock'
import { clearTimer, loadTimer, saveTimer } from '../lib/timer-storage'
import { TimerContext, type TimerBlock, type TimerValue } from './timer-context'

interface Plan {
  regimen: number
  blocks: TimerBlock[]
}

const NO_BLOCKS: TimerBlock[] = []
const STOPPED: ClockState = { banked: 0, runningSince: null }

export function TimerProvider({ children }: { children: ReactNode }) {
  // A session in progress survives a refresh; see lib/timer-storage.
  const [plan, setPlan] = useState<Plan | null>(() => {
    const saved = loadTimer()
    return saved ? { regimen: saved.regimen, blocks: saved.blocks } : null
  })
  const [clock, setClock] = useState<ClockState>(() => loadTimer()?.clock ?? STOPPED)
  // The clock reading is state, not a Date.now() call during render.
  const [now, setNow] = useState(() => Date.now())
  const [permission, setPermission] = useState<Permission>('default')
  // Highest block index already announced, so each boundary fires once.
  const announced = useRef(0)
  // A restored session may already be several blocks in. The first tick syncs
  // the marker to wherever it actually is rather than chiming its way there.
  const syncOnFirstTick = useRef(loadTimer() !== null)

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

      if (syncOnFirstTick.current) {
        syncOnFirstTick.current = false
        announced.current = index
      }

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

  const start = useCallback((regimen: number, next: TimerBlock[], fromIndex = 0) => {
    void prime().then(setPermission)
    syncOnFirstTick.current = false
    const t = Date.now()
    // Starting at a block is not arriving at it, so don't announce it.
    const target = Math.min(clampIndex(next, fromIndex), Math.max(0, next.length - 1))
    announced.current = target
    setPlan({ regimen, blocks: next })
    setClock({ banked: offsetOf(next, target), runningSince: t })
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

  const goTo = useCallback(
    (index: number) => {
      if (!plan) return
      const t = Date.now()
      // Chosen, not arrived at — and set below the target so a later boundary
      // still announces, including when jumping backwards.
      announced.current = clampIndex(plan.blocks, index)
      setNow(t)
      setClock((c) => seekAt(plan.blocks, c, index, t))
    },
    [plan],
  )

  const stop = useCallback(() => {
    announced.current = 0
    syncOnFirstTick.current = false
    setPlan(null)
    setClock(STOPPED)
  }, [])

  // Persist whenever the session or the clock moves. `now` is deliberately not
  // a dependency: it ticks four times a second and changes nothing worth saving.
  useEffect(() => {
    if (plan === null) clearTimer()
    else saveTimer({ regimen: plan.regimen, blocks: plan.blocks, clock })
  }, [plan, clock])

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
    goTo,
    stop,
  }

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}
