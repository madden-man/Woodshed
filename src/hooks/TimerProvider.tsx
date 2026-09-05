import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { chime, notify, prime, type Permission } from '../lib/notify'
import { TimerContext, type TimerBlock, type TimerValue } from './timer-context'

interface Plan {
  regimen: number
  blocks: TimerBlock[]
}

const NO_BLOCKS: TimerBlock[] = []

/** Where `elapsed` lands: which block, and how much of it is left. */
function locate(blocks: TimerBlock[], elapsed: number) {
  let start = 0
  for (let i = 0; i < blocks.length; i++) {
    const end = start + blocks[i].ms
    if (elapsed < end) return { index: i, remainingMs: end - elapsed }
    start = end
  }
  return { index: blocks.length, remainingMs: 0 }
}

function totalOf(blocks: TimerBlock[]) {
  return blocks.reduce((sum, b) => sum + b.ms, 0)
}

/** Cumulative ms at the start of block `i`. */
function offsetOf(blocks: TimerBlock[], i: number) {
  return blocks.slice(0, i).reduce((sum, b) => sum + b.ms, 0)
}

export function TimerProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Plan | null>(null)
  // Elapsed banked from finished run segments; `runningSince` opens a new one.
  const [banked, setBanked] = useState(0)
  const [runningSince, setRunningSince] = useState<number | null>(null)
  // The clock is state, not a Date.now() call during render, so renders stay pure.
  const [now, setNow] = useState(() => Date.now())
  const [permission, setPermission] = useState<Permission>('default')
  // Highest block index already announced, so each boundary fires once.
  const announced = useRef(0)

  const blocks = plan?.blocks ?? NO_BLOCKS
  const totalMs = totalOf(blocks)
  const elapsed = banked + (runningSince === null ? 0 : Math.max(0, now - runningSince))
  const { index: blockIndex, remainingMs } = locate(blocks, elapsed)

  // One interval while running: advance the clock and announce boundaries.
  useEffect(() => {
    if (runningSince === null || plan === null) return

    const id = setInterval(() => {
      const t = Date.now()
      const ahead = banked + (t - runningSince)
      const total = totalOf(plan.blocks)
      const { index } = locate(plan.blocks, ahead)

      if (index > announced.current) {
        announced.current = index
        if (index >= plan.blocks.length) {
          chime('done')
          notify('Session complete', `Regimen ${plan.regimen} — all five blocks done.`)
        } else {
          const block = plan.blocks[index]
          chime('block')
          notify(
            `Block ${index + 1}: ${block.title}`,
            `${Math.round(block.ms / 60000)} minutes · regimen ${plan.regimen}`,
          )
        }
      }

      if (ahead >= total) {
        setBanked(total)
        setRunningSince(null)
      } else {
        setNow(t)
      }
    }, 250)

    return () => clearInterval(id)
  }, [runningSince, banked, plan])

  const start = useCallback((regimen: number, next: TimerBlock[]) => {
    void prime().then(setPermission)
    const t = Date.now()
    announced.current = 0
    setPlan({ regimen, blocks: next })
    setBanked(0)
    setNow(t)
    setRunningSince(t)
  }, [])

  const pause = useCallback(() => {
    if (runningSince === null) return
    setBanked(banked + (Date.now() - runningSince))
    setRunningSince(null)
  }, [banked, runningSince])

  const resume = useCallback(() => {
    if (runningSince !== null) return
    const t = Date.now()
    setNow(t)
    setRunningSince(t)
  }, [runningSince])

  const skip = useCallback(() => {
    if (!plan) return
    const t = Date.now()
    const at = banked + (runningSince === null ? 0 : t - runningSince)
    const { index } = locate(plan.blocks, at)
    const next = Math.min(index + 1, plan.blocks.length)
    // The user asked for this transition, so don't announce it at them.
    announced.current = next
    setBanked(offsetOf(plan.blocks, next))
    setNow(t)
    setRunningSince(runningSince === null ? null : t)
  }, [plan, banked, runningSince])

  const stop = useCallback(() => {
    announced.current = 0
    setPlan(null)
    setBanked(0)
    setRunningSince(null)
  }, [])

  let status: TimerValue['status'] = 'idle'
  if (plan) {
    if (blockIndex >= blocks.length) status = 'done'
    else status = runningSince === null ? 'paused' : 'running'
  }

  const value: TimerValue = {
    status,
    regimen: plan?.regimen ?? null,
    blocks,
    blockIndex,
    remainingMs,
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
