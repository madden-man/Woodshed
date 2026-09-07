import { useEffect, useRef, useState } from 'react'
import { Metronome as Engine } from '../lib/metronome-audio'
import { clampBpm, MAX_BPM, MIN_BPM, type ClickMode } from '../lib/metronome'
import { initialBpm, saveBpm } from '../lib/metronome-storage'
import { prime } from '../lib/notify'

/**
 * The metronome control: a play/stop toggle, a tempo, and the click mode. It
 * is on every block of every session — there is always a way to run a click.
 * Where the method practises a step without one (before First tempo pass),
 * that is shown as a note beside the tool rather than by hiding it.
 *
 * The tempo it opens with is the last one used for this block of this regimen
 * (localStorage), falling back to the unit's target minus a margin, then to 80.
 * It is deliberately independent of the session timer: pausing the session does
 * not silence the click, because "stop the clock, keep playing" is a real thing.
 */
export default function Metronome({
  regimen,
  blockId,
  targetBpm,
  stepUsesClick = true,
  variant = 'page',
}: {
  regimen: number
  blockId: string
  /** The unit's standard, shown as context — never as today's setting. */
  targetBpm?: number
  /** False where the step of the arc practises without a click; advisory only. */
  stepUsesClick?: boolean
  variant?: 'page' | 'bar'
}) {
  const engine = useRef<Engine | null>(null)
  if (engine.current === null) engine.current = new Engine()

  const [bpm, setBpm] = useState(() => initialBpm(regimen, blockId, targetBpm))
  const [mode, setMode] = useState<ClickMode>('backbeat')
  const [running, setRunning] = useState(false)

  // Stop the click if the control unmounts (block change, timer stop, nav away).
  // The remembered tempo is per (regimen, block); the call sites key this
  // component on that pair, so a change remounts it and `initialBpm` runs fresh
  // rather than needing an effect to reset state after the fact.
  useEffect(() => {
    const eng = engine.current
    return () => eng?.stop()
  }, [])

  function apply(next: number) {
    const b = clampBpm(next)
    setBpm(b)
    saveBpm(regimen, blockId, b)
    const eng = engine.current
    if (eng) {
      eng.setBpm(b)
      eng.restart() // re-anchor so the new tempo takes hold cleanly
    }
  }

  function toggle() {
    const eng = engine.current
    if (!eng) return
    if (running) {
      eng.stop()
      setRunning(false)
    } else {
      // Same user-gesture unlock the timer uses; nothing sounds before a click.
      void prime()
      eng.setBpm(bpm)
      eng.setMode(mode)
      eng.start()
      setRunning(true)
    }
  }

  function pickMode(next: ClickMode) {
    setMode(next)
    const eng = engine.current
    if (eng) {
      eng.setMode(next)
      if (running) eng.restart()
    }
  }

  return (
    <div className={variant === 'bar' ? 'metronome is-bar' : 'metronome'}>
      <button
        type="button"
        className={running ? 'metronome-toggle is-running' : 'metronome-toggle'}
        aria-pressed={running}
        onClick={toggle}
      >
        {running ? 'Stop' : 'Click'}
      </button>

      <div className="metronome-tempo" role="group" aria-label="Tempo">
        <button type="button" className="metronome-step" aria-label="Slower" onClick={() => apply(bpm - 4)}>
          −
        </button>
        <label className="metronome-bpm">
          <input
            type="number"
            min={MIN_BPM}
            max={MAX_BPM}
            value={bpm}
            aria-label="Beats per minute"
            onChange={(e) => apply(Number(e.target.value))}
          />
          <span className="metronome-unit">bpm</span>
        </label>
        <button type="button" className="metronome-step" aria-label="Faster" onClick={() => apply(bpm + 4)}>
          +
        </button>
      </div>

      <div className="metronome-mode" role="group" aria-label="Click on">
        <button type="button" aria-pressed={mode === 'backbeat'} onClick={() => pickMode('backbeat')}>
          2 &amp; 4
        </button>
        <button type="button" aria-pressed={mode === 'all'} onClick={() => pickMode('all')}>
          All
        </button>
        <button type="button" aria-pressed={mode === 'bar'} onClick={() => pickMode('bar')}>
          1 only
        </button>
      </div>

      {targetBpm !== undefined && (
        <span className="metronome-target">
          target <span className="mono">♩={targetBpm}</span>
        </span>
      )}

      {!stepUsesClick && (
        <span className="metronome-target" title="The metronome joins the arc at First tempo pass; before that the method works without one.">
          the method says no click on this step
        </span>
      )}
    </div>
  )
}
