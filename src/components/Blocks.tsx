import type { Block } from '../data/types'

/** Renders the block union from a topic. One case per Block kind. */
export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'prose':
      return <p className="prose">{block.text}</p>

    case 'list':
      return block.ordered ? (
        <ol className="steps">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="bullets">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )

    case 'progression':
      return (
        <figure className="progression">
          {block.label && <figcaption>{block.label}</figcaption>}
          <div className="chords">
            {block.chords.map((chord, i) => (
              <span key={i}>
                <span className={i === block.highlight ? 'chord is-v' : 'chord'}>{chord}</span>
                {i < block.chords.length - 1 && <span className="arrow">→</span>}
              </span>
            ))}
          </div>
          {block.note && <p className="note">{block.note}</p>}
        </figure>
      )

    case 'table':
      return (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={j === 0 ? 'lead-cell' : undefined}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'callout':
      return (
        <aside className="callout">
          <div className="callout-title">{block.title}</div>
          <p>{block.text}</p>
        </aside>
      )

    case 'worked':
      return (
        <figure className="worked">
          <figcaption>{block.label}</figcaption>
          <div className="worked-rows">
            {block.rows.map((row, i) => (
              <div key={i} className="worked-row">
                <span className="worked-symbol">{row.symbol}</span>
                <span className="worked-means">{row.means}</span>
                <span className="worked-gives">{row.gives}</span>
              </div>
            ))}
          </div>
          {block.note && <p className="note">{block.note}</p>}
        </figure>
      )
  }
}
