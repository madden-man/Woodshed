import type { ClockBlock, ClockState } from './session-clock'

/**
 * Keeps a running session across a refresh.
 *
 * The clock is stored as it is — `runningSince` is a wall-clock timestamp, so a
 * session that was running when you reloaded has genuinely kept running, which
 * is what you want after an accidental refresh. What you do not want is
 * yesterday's session reappearing, so anything older than STALE_AFTER is
 * dropped on the way in.
 *
 * localStorage is per-browser and can throw outright (private windows, blocked
 * site data), so every access is wrapped and failure just means no memory.
 */

const KEY = 'woodshed.timer.v1'
const STALE_AFTER = 12 * 60 * 60 * 1000

export interface PersistedTimer {
  regimen: number
  blocks: ClockBlock[]
  clock: ClockState
  savedAt: number
}

function isBlock(v: unknown): v is ClockBlock {
  if (typeof v !== 'object' || v === null) return false
  const b = v as Record<string, unknown>
  return typeof b.id === 'string' && typeof b.title === 'string' && typeof b.ms === 'number' && b.ms > 0
}

/** Anything can be in localStorage, including a half-written blob from an older build. */
export function parseTimer(raw: string | null, now: number): PersistedTimer | null {
  if (!raw) return null
  let value: unknown
  try {
    value = JSON.parse(raw)
  } catch {
    return null
  }
  if (typeof value !== 'object' || value === null) return null

  const v = value as Record<string, unknown>
  const clock = v.clock as Record<string, unknown> | undefined

  if (typeof v.regimen !== 'number' || !Number.isInteger(v.regimen)) return null
  if (!Array.isArray(v.blocks) || v.blocks.length === 0 || !v.blocks.every(isBlock)) return null
  if (typeof v.savedAt !== 'number') return null
  if (!clock || typeof clock.banked !== 'number') return null
  if (clock.runningSince !== null && typeof clock.runningSince !== 'number') return null

  if (now - v.savedAt > STALE_AFTER) return null
  // A clock saved in the future means the machine's time moved; don't trust it.
  if (v.savedAt - now > 60_000) return null

  return {
    regimen: v.regimen,
    blocks: v.blocks,
    clock: { banked: clock.banked, runningSince: (clock.runningSince as number | null) ?? null },
    savedAt: v.savedAt,
  }
}

export function serializeTimer(timer: PersistedTimer): string {
  return JSON.stringify(timer)
}

// Read once per page load; every later read is this value.
let cached: PersistedTimer | null | undefined

export function loadTimer(): PersistedTimer | null {
  if (cached !== undefined) return cached
  let raw: string | null = null
  try {
    raw = localStorage.getItem(KEY)
  } catch {
    raw = null
  }
  cached = parseTimer(raw, Date.now())
  return cached
}

export function saveTimer(timer: Omit<PersistedTimer, 'savedAt'>): void {
  const full: PersistedTimer = { ...timer, savedAt: Date.now() }
  cached = full
  try {
    localStorage.setItem(KEY, serializeTimer(full))
  } catch {
    // Nothing to do — the session still works, it just won't survive a reload.
  }
}

export function clearTimer(): void {
  cached = null
  try {
    localStorage.removeItem(KEY)
  } catch {
    // As above.
  }
}
