import { Link } from 'react-router-dom'
import { parseMarkdown, type Inline } from '../lib/markdown'

/** Renders an assistant answer. Internal links go through the router. */
export default function Markdown({ text }: { text: string }) {
  const blocks = parseMarkdown(text)
  return (
    <div className="md">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'heading': {
            const Tag = b.level <= 2 ? 'h3' : 'h4'
            return <Tag key={i}>{renderInline(b.inline)}</Tag>
          }
          case 'paragraph':
            return <p key={i}>{renderInline(b.inline)}</p>
          case 'list':
            return b.ordered ? (
              <ol key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            ) : (
              <ul key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            )
          case 'code':
            return (
              <pre key={i}>
                <code>{b.text}</code>
              </pre>
            )
        }
      })}
    </div>
  )
}

function renderInline(inline: Inline[]) {
  return inline.map((n, i) => {
    switch (n.kind) {
      case 'text':
        return <span key={i}>{n.text}</span>
      case 'bold':
        return <strong key={i}>{n.text}</strong>
      case 'code':
        return <code key={i}>{n.text}</code>
      case 'link':
        return n.href.startsWith('/') ? (
          <Link key={i} to={n.href}>
            {n.text}
          </Link>
        ) : (
          <a key={i} href={n.href} target="_blank" rel="noreferrer">
            {n.text}
          </a>
        )
    }
  })
}
