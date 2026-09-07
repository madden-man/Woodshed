/**
 * Sounding the keyboard diagrams. The wiki already carries every voicing as
 * absolute pitches — `ascend()` in keyboard.ts resolves them to draw the dots —
 * so the same numbers can be played. No page is re-authored to become audible.
 *
 * The tone is oscillator-built like the chime in notify.ts: it will sound like
 * a cheap electric piano, not a Steinway, which is enough to hear a ♭9 against a
 * 3. A sampled instrument could replace the innards later behind `playNotes`.
 */

import { audioContext, tone } from './notify'

/**
 * Concert pitch. `ascend()` numbers a pitch as octave * 12 + pitchClass, which
 * puts middle C (C4) at 48 and A4 at 57; MIDI puts them at 60 and 69, a fixed
 * octave higher. So MIDI = pitch + 12, and A4 (MIDI 69) is 440 Hz by definition.
 */
const A4_MIDI = 69
const A4_HZ = 440

/** Hz for a pitch as `ascend()` numbers it. A4 = 440, C4 ≈ 261.63. */
export function frequencyOf(pitch: number): number {
  const midi = pitch + 12
  return A4_HZ * 2 ** ((midi - A4_MIDI) / 12)
}

/** Seconds each note gets when a voicing is spelled out one at a time. */
export const NOTE_STEP = 0.32
/** How long the final block chord rings. */
const CHORD_LENGTH = 1.1
const NOTE_LENGTH = 0.42
const GAIN = 0.16

/**
 * Demonstrate a voicing the way a teacher does: each note briefly in sequence,
 * lowest to highest, then the whole shape together as a block. Pitches are as
 * `ascend()` produces them; passing its output straight in is the intended use.
 */
export function playNotes(pitches: number[]) {
  const ac = audioContext()
  if (!ac || pitches.length === 0) return
  const start = ac.currentTime + 0.05
  const ordered = [...pitches].sort((a, b) => a - b)

  // One at a time.
  ordered.forEach((pitch, i) => {
    tone(ac, frequencyOf(pitch), start + i * NOTE_STEP, NOTE_LENGTH, GAIN, 'triangle')
  })

  // Then all together, once the sequence has finished.
  const chordAt = start + ordered.length * NOTE_STEP + 0.1
  for (const pitch of ordered) {
    tone(ac, frequencyOf(pitch), chordAt, CHORD_LENGTH, GAIN * 0.85, 'triangle')
  }
}

/**
 * Play a sequence of voicings as a progression: each chord sounded as a block,
 * in order, spaced so a held guide tone is audible across the change. This is
 * the shells lesson — the guide tone holding, then dropping a half step.
 */
export function playProgression(chords: number[][]) {
  const ac = audioContext()
  if (!ac) return
  const gap = 0.9
  let at = ac.currentTime + 0.05
  for (const chord of chords) {
    if (chord.length === 0) continue
    for (const pitch of chord) {
      tone(ac, frequencyOf(pitch), at, gap * 0.95, GAIN, 'triangle')
    }
    at += gap
  }
}

/**
 * The cell indices a rhythm pattern strikes on — the single source of truth the
 * grid and the playback both read, so the picture and the sound cannot disagree.
 * A strike is an `x`; every other cell is silence. This is deliberately the same
 * `pattern[i] === 'x'` test the RhythmGrid draws with.
 */
export function strikePositions(pattern: string): number[] {
  const out: number[] = []
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === 'x') out.push(i)
  }
  return out
}

/**
 * Play a rhythm grid on the metronome engine's clock: low tone for the left
 * hand, high for the right, one bar looping at `bpm`. Reads the same pattern
 * strings the grid draws (via `strikePositions`), so the two can never diverge.
 *
 * Returns a stop function; the loop runs until it is called.
 */
export function playRhythm(
  opts: { left?: string; right?: string; beats: number; subdivision: number; bpm: number },
): () => void {
  const ac = audioContext()
  if (!ac) return () => {}

  const { left, right, beats, subdivision, bpm } = opts
  const cellSeconds = 60 / bpm / subdivision
  const barSeconds = beats * subdivision * cellSeconds
  const LOW = 180 // left hand
  const HIGH = 720 // right hand

  let stopped = false
  let barStart = ac.currentTime + 0.08

  // Schedule one bar's strikes at `start` (audio-clock seconds).
  const scheduleBar = (start: number) => {
    if (left) for (const cell of strikePositions(left)) tone(ac, LOW, start + cell * cellSeconds, 0.09, 0.22, 'square')
    if (right) for (const cell of strikePositions(right)) tone(ac, HIGH, start + cell * cellSeconds, 0.06, 0.16, 'square')
  }

  scheduleBar(barStart)
  // A coarse pump keeps the next bar scheduled ahead on the audio clock.
  const id = setInterval(() => {
    if (stopped) return
    while (barStart < ac.currentTime + barSeconds) {
      barStart += barSeconds
      scheduleBar(barStart)
    }
  }, 40)

  return () => {
    stopped = true
    clearInterval(id)
  }
}
