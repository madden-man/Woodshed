/**
 * Pure clock arithmetic for the session timer, kept out of the provider so it
 * can be reasoned about (and tested) without React in the way.
 *
 * The whole timer is one scalar: `elapsed`. Everything else — which block, how
 * much is left, whether it's over — is derived from it. Pausing banks the
 * elapsed time and stops the segment; resuming opens a new one. Nothing ever
 * accumulates a counter, so a throttled or backgrounded tab can't drift.
 */

export interface ClockBlock {
  id: string
  title: string
  ms: number
}

/** Where the session is at `elapsed`, and where it is inside the current block. */
export interface Position {
  /** Index into blocks; equals blocks.length once the session is over. */
  index: number
  /** Remaining in the current block; 0 when finished. */
  remainingMs: number
  /** Elapsed within the current block. */
  intoBlockMs: number
}

export function locate(blocks: ClockBlock[], elapsed: number): Position {
  let start = 0
  for (let i = 0; i < blocks.length; i++) {
    const end = start + blocks[i].ms
    if (elapsed < end) return { index: i, remainingMs: end - elapsed, intoBlockMs: elapsed - start }
    start = end
  }
  return { index: blocks.length, remainingMs: 0, intoBlockMs: 0 }
}

export function totalOf(blocks: ClockBlock[]): number {
  return blocks.reduce((sum, b) => sum + b.ms, 0)
}

/** Cumulative ms at the start of block `i`. */
export function offsetOf(blocks: ClockBlock[], i: number): number {
  return blocks.slice(0, i).reduce((sum, b) => sum + b.ms, 0)
}

/**
 * The timer's persistent state. `runningSince` is null while paused, which is
 * the only difference between the two states — the banked total is untouched,
 * so resuming continues rather than restarting.
 */
export interface ClockState {
  banked: number
  runningSince: number | null
}

export function elapsedAt(state: ClockState, now: number): number {
  if (state.runningSince === null) return state.banked
  return state.banked + Math.max(0, now - state.runningSince)
}

export function pauseAt(state: ClockState, now: number): ClockState {
  if (state.runningSince === null) return state
  return { banked: elapsedAt(state, now), runningSince: null }
}

export function resumeAt(state: ClockState, now: number): ClockState {
  if (state.runningSince !== null) return state
  return { banked: state.banked, runningSince: now }
}

/**
 * Jump to the start of any block, keeping running/paused as it was. Works in
 * both directions — going back to re-run a block is as valid as skipping on.
 * An index of blocks.length means "past the end", i.e. finished.
 */
export function seekAt(blocks: ClockBlock[], state: ClockState, index: number, now: number): ClockState {
  const target = clampIndex(blocks, index)
  return {
    banked: offsetOf(blocks, target),
    runningSince: state.runningSince === null ? null : now,
  }
}

/** Jump to the start of the next block, keeping running/paused as it was. */
export function skipAt(blocks: ClockBlock[], state: ClockState, now: number): ClockState {
  const { index } = locate(blocks, elapsedAt(state, now))
  return seekAt(blocks, state, index + 1, now)
}

/** Clamp a block index into range; anything past the end is the end. */
export function clampIndex(blocks: ClockBlock[], index: number): number {
  if (!Number.isFinite(index)) return 0
  return Math.min(Math.max(Math.trunc(index), 0), blocks.length)
}
