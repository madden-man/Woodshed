import { afterEach, describe, expect, it, vi } from 'vitest'
import { fallbackBpm, initialBpm, loadBpm, saveBpm } from './metronome-storage'
import { MAX_BPM, MIN_BPM } from './metronome'

/** A minimal in-memory localStorage for the round-trip tests. */
function fakeStorage() {
  const map = new Map<string, string>()
  return {
    getItem: (k: string) => (map.has(k) ? map.get(k)! : null),
    setItem: (k: string, v: string) => void map.set(k, v),
    removeItem: (k: string) => void map.delete(k),
    clear: () => map.clear(),
  }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('bpm persistence', () => {
  it('round-trips a bpm per (regimen, block)', () => {
    vi.stubGlobal('localStorage', fakeStorage())
    saveBpm(4, 'scales', 96)
    expect(loadBpm(4, 'scales')).toBe(96)
    // A different block of the same regimen is a different slot.
    expect(loadBpm(4, 'voicings')).toBeNull()
    // As is the same block of a different regimen.
    expect(loadBpm(5, 'scales')).toBeNull()
  })

  it('clamps whatever it stores and reads into the usable range', () => {
    vi.stubGlobal('localStorage', fakeStorage())
    saveBpm(1, 'scales', 9999)
    expect(loadBpm(1, 'scales')).toBe(MAX_BPM)
    saveBpm(1, 'scales', 1)
    expect(loadBpm(1, 'scales')).toBe(MIN_BPM)
  })

  it('returns null for a slot never written', () => {
    vi.stubGlobal('localStorage', fakeStorage())
    expect(loadBpm(9, 'independence')).toBeNull()
  })

  it('refuses a garbage blob rather than throwing', () => {
    const store = fakeStorage()
    store.setItem('woodshed.metronome.v1.2.scales', 'not-a-number')
    vi.stubGlobal('localStorage', store)
    expect(loadBpm(2, 'scales')).toBeNull()
  })

  it('survives localStorage throwing outright', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked')
      },
      setItem: () => {
        throw new Error('blocked')
      },
    })
    // No throw, and no memory.
    expect(() => saveBpm(1, 'scales', 100)).not.toThrow()
    expect(loadBpm(1, 'scales')).toBeNull()
  })
})

describe('the opening tempo', () => {
  it('falls back to the target minus a margin, then to 80', () => {
    expect(fallbackBpm(120)).toBe(100)
    expect(fallbackBpm(100)).toBe(80)
    expect(fallbackBpm(undefined)).toBe(80)
  })

  it('prefers a remembered tempo over the fallback', () => {
    vi.stubGlobal('localStorage', fakeStorage())
    expect(initialBpm(1, 'scales', 100)).toBe(80) // nothing saved yet -> fallback
    saveBpm(1, 'scales', 92)
    expect(initialBpm(1, 'scales', 100)).toBe(92) // remembered wins
  })
})
