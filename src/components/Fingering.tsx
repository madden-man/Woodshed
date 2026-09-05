import { BLACK_KEYS, MAJOR_SCALES, guidanceFor, showsScale } from '../data/fingerings'
import type { KeyName } from '../data/keys'

interface Props {
  unitId: number
  blockId: string
  scaleKey: KeyName
  /** `bar` is the tighter treatment used inside the sticky session bar. */
  variant?: 'page' | 'bar'
}

export default function Fingering({ unitId, blockId, scaleKey, variant = 'page' }: Props) {
  const guidance = guidanceFor(unitId, blockId)
  const scale = showsScale(blockId) ? MAJOR_SCALES[scaleKey] : null
  if (!scale && guidance.length === 0) return null

  return (
    <div className={variant === 'bar' ? 'fingering is-bar' : 'fingering'}>
      <div className="fingering-label">Fingering</div>

      {scale && (
        <>
          <table className="fingering-grid">
            <tbody>
              <tr className="fingering-row-rh">
                <th scope="row">RH</th>
                {scale.rh.map((f, i) => (
                  <td key={i} className={f === 1 ? 'is-thumb' : undefined}>
                    {f}
                  </td>
                ))}
              </tr>
              <tr className="fingering-row-notes">
                <th scope="row">
                  <span className="sr-only">Notes</span>
                </th>
                {scale.notes.map((n, i) => (
                  <td key={i} className={BLACK_KEYS.has(n) ? 'is-black' : undefined}>
                    {n}
                  </td>
                ))}
              </tr>
              <tr className="fingering-row-lh">
                <th scope="row">LH</th>
                {scale.lh.map((f, i) => (
                  <td key={i} className={f === 1 ? 'is-thumb' : undefined}>
                    {f}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <p className="fingering-caption">
            {scaleKey} major, ascending — reverse it coming down. Thumbs are marked; keeping them off the black
            keys is what makes the turns even.
          </p>
        </>
      )}

      {guidance.map((g) => (
        <p key={g.label} className="fingering-note">
          <span className="fingering-note-label">{g.label}</span>
          {g.text}
        </p>
      ))}
    </div>
  )
}
