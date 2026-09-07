/**
 * Remembers the last bpm used for a given block of a given regimen, so the
 * metronome opens where you left it rather than at a default every time.
 *
 * localStorage is per-browser and can throw outright (private windows, blocked
 * site data), so — exactly as timer-storage does — every access is wrapped and
 * failure just means no memory. Losing a remembered tempo is not worth an
 * unhandled exception.
 */

import { clampBpm } from './metronome'

const PREFIX = 'woodshed.metronome.v1'

function keyFor(regimen: number, blockId: string): string {
  return `${PREFIX}.${regimen}.${blockId}`
}

/** The stored bpm for this block, or null if none was saved (or storage failed). */
export function loadBpm(regimen: number, blockId: string): number | null {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(keyFor(regimen, blockId))
  } catch {
    return null
  }
  if (raw === null) return null
  const n = Number(raw)
  if (!Number.isFinite(n)) return null
  return clampBpm(n)
}

export function saveBpm(regimen: number, blockId: string, bpm: number): void {
  try {
    localStorage.setItem(keyFor(regimen, blockId), String(clampBpm(bpm)))
  } catch {
    // Nothing to do — the metronome still works, it just won't remember.
  }
}

/**
 * Where the metronome starts when nothing is remembered: the unit's target
 * minus a comfortable margin so you build up to it, then a plain 80 when the
 * unit names no number.
 */
const TARGET_MARGIN = 20
const DEFAULT_BPM = 80

export function fallbackBpm(targetBpm?: number): number {
  if (targetBpm !== undefined) return clampBpm(targetBpm - TARGET_MARGIN)
  return DEFAULT_BPM
}

/** The bpm to open with: the remembered one, else the target-based fallback. */
export function initialBpm(regimen: number, blockId: string, targetBpm?: number): number {
  return loadBpm(regimen, blockId) ?? fallbackBpm(targetBpm)
}
