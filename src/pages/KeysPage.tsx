import { CYCLE_OF_FOURTHS, KEYS, UPPER_STRUCTURE_FUNCTIONS, keyForDay } from '../data/keys'

export default function KeysPage() {
  const today = keyForDay()

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Reference</div>
        <h1>All twelve keys</h1>
        <p className="lede">
          Every ii–V–I, its minor counterpart, and the four upper-structure triads over the dominant. Ordered by
          the cycle of fourths, so reading down the table is the same as practising in order.
        </p>
      </div>

      <div className="table-scroll">
        <table className="keys-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Major ii–V–I</th>
              <th>Minor ii–V–i</th>
              <th>Upper structures over the V</th>
            </tr>
          </thead>
          <tbody>
            {CYCLE_OF_FOURTHS.map((k) => {
              const info = KEYS[k]
              return (
                <tr key={k} className={k === today ? 'is-today' : undefined}>
                  <td className="lead-cell key-cell">{k}</td>
                  <td className="mono">
                    {info.ii} · {info.V} · {info.I}
                  </td>
                  <td className="mono">
                    {info.halfDim} · {info.altered} · {info.minorI}
                  </td>
                  <td className="mono us-cell">
                    {info.upperStructures.map((tri, i) => (
                      <span key={tri} className="us-chip">
                        <em>{UPPER_STRUCTURE_FUNCTIONS[i].degree}</em>
                        {tri}
                      </span>
                    ))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <h2 className="section-head">What each upper structure gives you</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Triad</th>
              <th>Extensions</th>
              <th>Colour</th>
            </tr>
          </thead>
          <tbody>
            {UPPER_STRUCTURE_FUNCTIONS.map((u) => (
              <tr key={u.degree}>
                <td className="lead-cell">{u.degree}</td>
                <td className="mono">{u.gives}</td>
                <td>{u.color}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
