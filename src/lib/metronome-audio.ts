/**
 * The metronome's audio shell: a lookahead scheduler that drives the pure
 * engine (metronome.ts) onto the shared AudioContext clock (notify.ts).
 *
 * The pattern is the standard one for glitch-free web audio timing. A coarse
 * setInterval wakes a few times a second and asks the engine for every tick due
 * in the next slice of the *audio* clock, then schedules each precisely with
 * `click(time)`. setInterval on its own drifts and stutters in a background
 * tab; the audio clock does not, so the clicks stay even even when the timer
 * that placed them was late.
 *
 * The scheduling maths lives in metronome.ts and is tested there without audio;
 * this file is only the pump, deliberately thin, the way TimerProvider is thin
 * over session-clock.
 */

import { audioContext, click } from './notify'
import { clampBpm, ticksIn, type ClickMode, type MetronomeSpec } from './metronome'

/** How often the pump wakes. */
const LOOKAHEAD_MS = 25
/** How far ahead of the clock it schedules, comfortably more than the interval. */
const SCHEDULE_AHEAD = 0.1

export class Metronome {
  private spec: MetronomeSpec = { bpm: 80, beatsPerBar: 4, mode: 'backbeat' }
  private timer: ReturnType<typeof setInterval> | null = null
  /** The audio-clock instant the current run treats as t=0 for the engine. */
  private startedAt = 0
  /** How far into the run we have already scheduled, in engine seconds. */
  private scheduledTo = 0

  get running(): boolean {
    return this.timer !== null
  }

  get bpm(): number {
    return this.spec.bpm
  }

  setBpm(bpm: number) {
    this.spec = { ...this.spec, bpm: clampBpm(bpm) }
  }

  setMode(mode: ClickMode) {
    this.spec = { ...this.spec, mode }
  }

  setBeatsPerBar(beats: number) {
    this.spec = { ...this.spec, beatsPerBar: Math.max(1, Math.trunc(beats)) }
  }

  /** Begin clicking. A no-op if there is no audio context (SSR, blocked). */
  start() {
    if (this.timer !== null) return
    const ac = audioContext()
    if (!ac) return
    // Anchor t=0 slightly ahead so the first tick is scheduled, not missed.
    this.startedAt = ac.currentTime + 0.05
    this.scheduledTo = 0
    this.pump()
    this.timer = setInterval(() => this.pump(), LOOKAHEAD_MS)
  }

  stop() {
    if (this.timer === null) return
    clearInterval(this.timer)
    this.timer = null
  }

  /** Restart cleanly with a fresh anchor — used when the tempo changes live. */
  restart() {
    const wasRunning = this.running
    this.stop()
    if (wasRunning) this.start()
  }

  /** Schedule every tick now due within the lookahead horizon. */
  private pump() {
    const ac = audioContext()
    if (!ac) return
    const horizon = ac.currentTime - this.startedAt + SCHEDULE_AHEAD
    for (const tick of ticksIn(this.spec, this.scheduledTo, horizon)) {
      click(this.startedAt + tick.time, tick.accent)
    }
    this.scheduledTo = Math.max(this.scheduledTo, horizon)
  }
}
