/**
 * Pure tick scheduling for the metronome, kept out of the audio shell so it can
 * be reasoned about (and tested) without a sound card in the way — the same
 * split as session-clock.ts against its React provider.
 *
 * Everything the metronome sounds is derived from three numbers: the tempo, the
 * beats in a bar, and which beats click. Given a window of time, `ticksIn`
 * returns exactly the ticks that fall inside it, each with the beat it lands on
 * and whether it is accented. The audio shell asks for the next slice of window
 * a few times a second and schedules whatever comes back on the audio clock.
 *
 * Modes:
 * - 'all'      every beat clicks.
 * - 'backbeat' only 2 and 4 click, the jazz default the method names.
 * - 'bar'      only beat 1 clicks — one click a bar, for holding a form at tempo.
 *
 * The accent (a higher click) lives on beat 1 and nowhere else, so the tone
 * changes once a bar rather than every other beat. In 'backbeat' mode beat 1
 * never sounds, so every click is the plain tone; in 'bar' mode the one click
 * is the accent.
 */

export type ClickMode = 'all' | 'backbeat' | 'bar'

export interface MetronomeSpec {
  bpm: number
  /** Beats in a bar. Four unless a tune says otherwise. */
  beatsPerBar: number
  mode: ClickMode
}

/** A single click. `time` is seconds from t=0; `beat` is 1-based within the bar. */
export interface Tick {
  time: number
  beat: number
  accent: boolean
}

/** Seconds between beats at this tempo. */
export function beatDuration(bpm: number): number {
  return 60 / bpm
}

/** Beat 1 carries the accent, so the tone changes once a bar, not every other beat. */
export function isAccent(beat: number): boolean {
  return beat === 1
}

/** Whether a beat clicks at all in this mode. */
export function beatClicks(beat: number, mode: ClickMode): boolean {
  if (mode === 'backbeat') return beat === 2 || beat === 4
  if (mode === 'bar') return beat === 1
  return true
}

/** The beat a tick index lands on, 1-based, wrapping every `beatsPerBar`. */
function beatOf(index: number, beatsPerBar: number): number {
  return (((index % beatsPerBar) + beatsPerBar) % beatsPerBar) + 1
}

/**
 * Every tick with its start time in [from, until). Half-open so a tick on the
 * boundary belongs to exactly one window and can never be scheduled twice, the
 * same discipline `locate` uses for block boundaries.
 *
 * `from` and `until` are seconds from t=0, the instant the metronome started.
 */
export function ticksIn(spec: MetronomeSpec, from: number, until: number): Tick[] {
  const step = beatDuration(spec.bpm)
  if (step <= 0 || until <= from) return []

  const out: Tick[] = []
  // First tick index at or after `from`, without walking from zero every call.
  let index = Math.max(0, Math.ceil(from / step))
  for (let time = index * step; time < until; index++, time = index * step) {
    if (time < from) continue
    const beat = beatOf(index, spec.beatsPerBar)
    if (!beatClicks(beat, spec.mode)) continue
    out.push({ time, beat, accent: isAccent(beat) })
  }
  return out
}

/** The ticks of one bar starting at t=0 — the shape the tests check. */
export function ticksInBar(spec: MetronomeSpec): Tick[] {
  return ticksIn(spec, 0, spec.beatsPerBar * beatDuration(spec.bpm))
}

/** A bpm is only usable inside a sane range; the UI clamps to this. */
export const MIN_BPM = 30
export const MAX_BPM = 300

export function clampBpm(bpm: number): number {
  if (!Number.isFinite(bpm)) return MIN_BPM
  return Math.min(Math.max(Math.round(bpm), MIN_BPM), MAX_BPM)
}
