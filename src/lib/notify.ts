/**
 * Sound and system notifications for the session timer.
 *
 * Both need a user gesture before they'll work: browsers won't start an
 * AudioContext or grant notification permission from a background tick. Call
 * `prime()` from the click that starts the timer, then `chime()`/`notify()`
 * freely afterwards.
 */

let audio: AudioContext | null = null

function context(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audio) {
    const Ctor = window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    audio = new Ctor()
  }
  if (audio.state === 'suspended') void audio.resume()
  return audio
}

export type Permission = NotificationPermission | 'unsupported'

/** Call from the user gesture that starts a session. */
export async function prime(): Promise<Permission> {
  context()
  if (typeof Notification === 'undefined') return 'unsupported'
  if (Notification.permission !== 'default') return Notification.permission
  try {
    return await Notification.requestPermission()
  } catch {
    return 'denied'
  }
}

function tone(ac: AudioContext, freq: number, start: number, length: number, gain: number) {
  const osc = ac.createOscillator()
  const amp = ac.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  amp.gain.setValueAtTime(0.0001, start)
  amp.gain.exponentialRampToValueAtTime(gain, start + 0.01)
  amp.gain.exponentialRampToValueAtTime(0.0001, start + length)
  osc.connect(amp)
  amp.connect(ac.destination)
  osc.start(start)
  osc.stop(start + length + 0.02)
}

/** A fifth for a block change; a rising triad when the session is over. */
export function chime(kind: 'block' | 'done') {
  const ac = context()
  if (!ac) return
  const t = ac.currentTime + 0.02
  if (kind === 'block') {
    tone(ac, 659.25, t, 0.28, 0.28) // E5
    tone(ac, 987.77, t + 0.16, 0.42, 0.22) // B5
  } else {
    tone(ac, 523.25, t, 0.3, 0.26) // C5
    tone(ac, 659.25, t + 0.16, 0.3, 0.26) // E5
    tone(ac, 783.99, t + 0.32, 0.7, 0.3) // G5
  }
}

export function notify(title: string, body: string) {
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return
  try {
    // Same tag replaces the previous one rather than stacking five of them up.
    new Notification(title, { body, tag: 'woodshed-session', icon: '/favicon.svg' })
  } catch {
    // Some browsers only allow notifications from a service worker; the chime
    // and the on-screen timer still carry the transition.
  }
}

export function formatClock(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}
